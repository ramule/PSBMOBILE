import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppConstants } from 'src/app/app.constant';
import { UPIBankAccount } from 'src/app/models/account-detail-model';
import { Mandate } from 'src/app/models/mandate-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { NpciAndroidService } from 'src/app/services/npci-android.service';
import { NpciIosService } from 'src/app/services/npci-ios.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { DataService } from '../../../../../services/data.service';
import { ModifyMandateService } from '../modify-mandate/modify-mandate.service';
declare var mandate: any;

@Component({
  selector: 'app-modify-mandate-confirmation',
  templateUrl: './modify-mandate-confirmation.component.html',
  styleUrls: ['./modify-mandate-confirmation.component.scss']
})
export class ModifyMandateConfirmationComponent implements OnInit {
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'CONFIRMATION',
    'footertype': 'none'
  }
  mandateDetails: Mandate;
  VPADetails: any;
  VPAAccountDetails: any;
  constructor(private router: Router, public DataService: DataService, private location: Location, private http: HttpRestApiService, private npciAndroidService: NpciAndroidService, private npciIosService: NpciIosService, private constant: AppConstants, private localStorage: LocalStorageService, private modifyMandateService: ModifyMandateService,private loaderService: pageLoaderService) { }

  ngOnInit(): void {
    this.mandateDetails = this.DataService.pendingMandateWithPayer;
    history.pushState({}, 'modifyMandate', this.location.prepareExternalUrl("modifyMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    this.getVPADetails();
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }


  getVPADetails() {
    if (this.DataService.vpaAddressList.length > 0) {
      if (this.DataService.checkIfUPIIdExists(this.mandateDetails.payerAddress)) {
        this.VPADetails = this.DataService.vpaAddressList.find(vpa => vpa.paymentAddress == this.mandateDetails.payerAddress);
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      } else {
        this.VPADetails = this.DataService.vpaAddressList.find(vpa => vpa.default == 'Y');
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      }
    }
    this.DataService.VPAAccountDetails = this.VPAAccountDetails;
  }
  /**
   * Modify Mandate 
   */
  modifyMandate() {

    //check accountDetails.payerIfsc


    if (this.DataService.getMandateInciatedBy(this.mandateDetails) == 'PAYEE') {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.DataService.payeeRevokeTransId = transactionId;
          let reqParams = this.modifyMandateService.modifyMandateRequest(null, this.mandateDetails, this.DataService.modifyMandateDetails);
          this.UpiApiCall(reqParams);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          this.DataService.payeeRevokeTransId = transactionId;
          let reqParams = this.modifyMandateService.modifyMandateRequest(null, this.mandateDetails, this.DataService.modifyMandateDetails);
          this.UpiApiCall(reqParams);
        });
      }

    } else {
      let accountDetails = new UPIBankAccount().deserialize(this.mandateDetails);
      console.log('MODIFY => this.mandateDetails', this.mandateDetails)
      console.log('accountDetails', accountDetails)
      this.npciAndroidService.upiCreateMandateModel.txnId = this.mandateDetails.txnId;
      if (this.mandateDetails.payerIfsc.includes("PSIB")) {
        this.DataService.preApprovedFlowIdentifier = "modifyMandate";
        this.DataService.preApprovedPreviousPageUrl = this.router.url;
        this.DataService.preApprovedBankName = this.VPAAccountDetails.bankName;
        this.DataService.preApprovedAccNo = this.VPAAccountDetails.maskedAccountNumber;
        this.DataService.preApprovedAmount = this.DataService.modifyMandateDetails.amount.trim().replace(/[^.0-9]+/g, '');
        this.router.navigateByUrl('/transactionPin');
      } else {
        this.callNpciLibrary(accountDetails);
      }
    }
  }


  /**
   * Call NPCI Library
   * @param accountData 
   */
  callNpciLibrary(accountData) {
    console.log("calling npci library...");
    console.log('accountData', accountData);
    this.loaderService.showLoader();
    if (window.hasOwnProperty('cordova')) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        let subject = new Subject<any>();
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.npciAndroidService.upiCreateMandateModel.payerVPA = this.mandateDetails.payerAddress;
          this.npciAndroidService.upiCreateMandateModel.payeeVPA = this.mandateDetails.payeeAddress;
          this.npciAndroidService.upiCreateMandateModel.txnAmount = this.DataService.modifyMandateDetails.amount;
          this.npciAndroidService.upiCreateMandateModel.payeeName = this.mandateDetails.payeeName;
          // this.npciAndroidService.selectedFlow = this.constant.val_npci_approveMandate;
          //this.constant.val_npci_flow_acceptPendingRequest
          this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_modifyMandate_android, subject).subscribe((NPCIResponse) => {
            console.log('Android StartCLLibrary Success => ', NPCIResponse);
            /**
            * set cred data in api
            */
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              let reqParams = this.modifyMandateService.modifyMandateRequest(NPCIResponse, this.mandateDetails, this.DataService.modifyMandateDetails);
              this.UpiApiCall(reqParams);
            } else {

            }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        let subject = new Subject<any>();
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          this.npciIosService.upiCreateMandateModel.payerVPA = this.mandateDetails.payerAddress;
          this.npciIosService.upiCreateMandateModel.payeeVPA = this.mandateDetails.payeeAddress;
          this.npciIosService.upiCreateMandateModel.txnAmount = this.DataService.modifyMandateDetails.amount;
          this.npciIosService.upiCreateMandateModel.payeeName = this.mandateDetails.payeeName;
          this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_modifyMandate_ios, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse && NPCIResponse.credkey) {
              /**
               * set cred data in api
               */
              let reqParams = this.modifyMandateService.modifyMandateRequest(NPCIResponse, this.mandateDetails, this.DataService.modifyMandateDetails);
              this.UpiApiCall(reqParams);
            } else {
              console.log("NPCI flow cancelled...");
            }
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        console.log("unknown platform = ", this.DataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
  }

  /**
 * Common Api Call for pending request 
 * @param request 
 */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.modifyMandateResp = response;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_EDITMANDATE:
            console.log('upiserviceName_EDITMANDATE ', JSON.stringify(response));
            this.DataService.routeWithNgZone('modifyMandateSuccess');
            break;

          default:
            break;
        }
      } else {

      }
    }, error => {
      console.log("ERROR!", error);
    });
  }
}
