import { Location } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { PendingByPayer, PendingRequest, PendingWithMe } from '../../../../../models/pending-request.model';
import { Mandate, MandateList } from 'src/app/models/mandate-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { NpciAndroidService } from 'src/app/services/npci-android.service';
import { NpciIosService } from 'src/app/services/npci-ios.service';
import { DataService } from '../../../../../services/data.service';
import { ApproveMandateService } from '../approve-mandate/approve-mandate.service';
import { Subject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var mandate: any;

@Component({
  selector: 'app-approve-mandate-confirmation',
  templateUrl: './approve-mandate-confirmation.component.html',
  styleUrls: ['./approve-mandate-confirmation.component.scss']
})
export class ApproveMandateConfirmationComponent implements OnInit {

  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'CONFIRMATION',
    'footertype': 'none'
  }
  VPADetails: any;
  VPAAccountDetails: any;
  defaultVPAAccount: any;
  approveMandateDetail: Mandate;
  validityStart:any;
  validityEnd:any;
  constructor(private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private approveMandateService: ApproveMandateService,
    private loaderService: pageLoaderService,
    private location: Location) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'approveMandateViewDetails', this.location.prepareExternalUrl("approveMandateViewDetails"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.approveMandateDetail = this.DataService.approveMandateDetail;
    // this.validityStart = moment(this.approveMandateDetail.validityStart).format('DD/MM/yyyy');
    // this.validityEnd = moment(this.approveMandateDetail.validityEnd).format('DD/MM/yyyy');
    this.getLinkedAccount();
  }

  /**
   * Approve Mandate
   */
  approveMandate() {
    let accountDetails = this.VPAAccountDetails;
    console.log('APPROVE => accountDetails', accountDetails);
    this.DataService.upiPayModelObj.payerAddr = this.approveMandateDetail.payerAddress
    this.DataService.upiPayModelObj.payeeAddr = this.approveMandateDetail.payeeAddress
    this.DataService.upiPayModelObj.txnAmount = this.approveMandateDetail.amount.trim().replace(/[^.0-9]+/g, '');
    this.DataService.upiPayModelObj.payeeName = this.approveMandateDetail.payeeName;
    // this.DataService.upiPayModelObj.payeeMobile = accountDetails.
    // this.DataService.upiPayModelObj.payeeMmid = accountDetails.
    // this.DataService.upiPayModelObj.payeeAccount = accountDetails.
    // this.DataService.upiPayModelObj.payeeIfs = accountDetails.

    //check ifsc
    if (accountDetails.ifsc.includes("PSIB")) {
      this.DataService.preApprovedFlowIdentifier = "approveMandate";
      this.DataService.preApprovedBankName = accountDetails.bankName;
      this.DataService.preApprovedAccNo = accountDetails.maskedAccountNumber;
      this.DataService.preApprovedAmount = this.DataService.upiPayModelObj.txnAmount;
      this.DataService.preApprovedPreviousPageUrl = this.router.url;
      this.router.navigateByUrl('/transactionPin');
    } else {
      this.callNpciLibrary(accountDetails, this.DataService.selectedFlow);
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  /**
   * Call NPCI Library
   * @param accountData 
   */
  callNpciLibrary(accountData, selectedFlow) {
    console.log("calling npci library...");
    console.log('accountData', accountData);
    this.loaderService.showLoader();

    if (window.hasOwnProperty('cordova')) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        this.npciAndroidService.selectedFlow = selectedFlow;
        let subject = new Subject<any>();
        this.npciAndroidService.transactionId = this.approveMandateDetail.txnId;
        this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_acceptMandate_android, subject).subscribe((NPCIResponse) => {
          console.log('Android StartCLLibrary Success => ', NPCIResponse);
          /**
          * set cred data in api
          */
          if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
            let reqParams = this.approveMandateService.approveMandateRequest(this.approveMandateDetail, NPCIResponse);
            this.UpiApiCall(reqParams);
          }
        }, err => {
          console.log('Android StartCLLibrary error => ', err);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        console.log('selectedFlow', selectedFlow);
        this.npciIosService.selectedFlow = selectedFlow;
        let subject = new Subject<any>();
        this.npciIosService.txnId = this.approveMandateDetail.txnId;
        this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_acceptMandate, subject).subscribe((NPCIResponse) => {
          console.log('iOS StartCLLibrary Success => ', NPCIResponse);
          let reqParams = this.approveMandateService.approveMandateRequest(this.approveMandateDetail, NPCIResponse);
          if (NPCIResponse && NPCIResponse.credkey) {
            this.UpiApiCall(reqParams);
          } else {
            console.log("NPCI flow cancelled...");
          }
        }, err => {
          console.log('iOS StartCLLibrary error => ', err);
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
      this.DataService.approveMandateResp = response;
      this.DataService.upiCallTransactionHistoryApi = true;

      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ACCEPTMANDATE:
            console.log('upiserviceName_ACCEPTMANDATE ', JSON.stringify(response));
            this.DataService.routeWithNgZone('approveMandateSuccess');
            break;
          default:
            break;
        }
      } else {
        this.goToPage('upiMandate');
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  getLinkedAccount() {
    if (this.DataService.vpaAddressList.length > 0) {
      if (this.DataService.checkIfUPIIdExists(this.approveMandateDetail.payerAddress)) {
        this.VPADetails = this.DataService.vpaAddressList.find(vpa => vpa.paymentAddress == this.approveMandateDetail.payerAddress);
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      } else {
        this.VPADetails = this.DataService.vpaAddressList.find(vpa => vpa.default == 'Y');
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      }
    }
  }
}
