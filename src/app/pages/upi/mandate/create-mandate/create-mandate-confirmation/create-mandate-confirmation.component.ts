import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { MandatePayment } from '../../../../../models/mandate-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CreateMandateService } from '../create-mandate/create-mandate-service';
import { PluginService } from 'src/app/services/plugin-service';
import { Location } from '@angular/common';
import { UPIBankAccount } from 'src/app/models/account-detail-model';
import { NpciIosService } from 'src/app/services/npci-ios.service';
import { NpciAndroidService } from 'src/app/services/npci-android.service';
import { Subject } from 'rxjs';
import { pageLoaderService } from 'src/app/services/pageloader.service';
@Component({
  selector: 'app-create-mandate-confirmation',
  templateUrl: './create-mandate-confirmation.component.html',
  styleUrls: ['./create-mandate-confirmation.component.scss']
})
export class CreateMandateConfirmationComponent implements OnInit {
  createMandatePayment: MandatePayment;
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'CONFIRMATION',
    'footertype': 'none'
  };
  defaultVPA: any;
  defaultVPAAccount: any;
  QRScanData: any;
  createMandateTxnId: any = "";

  constructor(private router: Router, public DataService: DataService, private http: HttpRestApiService, private constant: AppConstants, private localStorage: LocalStorageService, private createMandateService: CreateMandateService, private pluginService: PluginService, private location: Location, private npciIosService: NpciIosService, private npciAndroidService: NpciAndroidService, private ngZone: NgZone, private loaderService: pageLoaderService) { }

  ngOnInit(): void {
    history.pushState({}, 'createMandatePayment', this.location.prepareExternalUrl("createMandatePayment"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    this.createMandatePayment = this.DataService.createMandatePayment;
    this.getSelectedVpaAccountDetails();
    this.npciAndroidService.upiCreateMandateModel = { txnId: '', payerVPA: '', payeeVPA: '', txnAmount: '', payeeName: '' };
    this.npciIosService.upiCreateMandateModel = { txnId: '', payerVPA: '', payeeVPA: '', txnAmount: '', payeeName: '' };
    this.QRScanData = this.DataService.ScanQrCodeData;
  }

  goToPage(routeName) {
    this.DataService.routeWithNgZone(routeName);
  }

  /**
   * create Mandate
   */
  createMandate() {
    let accountDetails = this.defaultVPAAccount;
    console.log('Create Mandate accountDetails => ', accountDetails);
    // if (this.QRScanData.tid || this.QRScanData.qrReferenceNo) {
    //   if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
    //     this.npciAndroidService.transactionId = this.QRScanData.tid ? this.QRScanData.tid : this.QRScanData.qrReferenceNo;
    //   } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
    //     this.npciIosService.txnId =  this.QRScanData.tid ? this.QRScanData.tid : this.QRScanData.qrReferenceNo;
    //   } else {
    //     console.log("Unknown platform");
    //   }
    // } else {
    //   this.ngZone.run(() => {
    //     if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
    //       this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
    //         this.npciAndroidService.transactionId = transactionId;
    //       });
    //     } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
    //       this.npciIosService.getTransactionId().subscribe((transactionId) => {
    //         this.npciIosService.txnId = transactionId;
    //         console.log('this.npciIosService.txnId', this.npciIosService.txnId);
    //       });
    //     } else {
    //       console.log("Unknown platform");
    //     }
    //   });
    // }
    if (this.QRScanData.tid || this.QRScanData.qrReferenceNo) {
      this.createMandateTxnId = this.QRScanData.tid ? this.QRScanData.tid : this.QRScanData.qrReferenceNo;
    } else {
      this.createMandateTxnId = "";
    }
    //check ifsc for pre-approved flow
    if(accountDetails.ifsc.includes("PSIB")) {
      this.DataService.createMandateTxnId = this.createMandateTxnId;
      this.DataService.preApprovedFlowIdentifier = "createMandate";
      this.DataService.preApprovedBankName = accountDetails.bankName;
      this.DataService.preApprovedAccNo = accountDetails.maskedAccountNumber;
      this.DataService.preApprovedAmount =  this.createMandatePayment.amount;
      this.DataService.preApprovedPreviousPageUrl = this.router.url;
      this.DataService.routeWithNgZone('transactionPin');
    } else {
      this.callNpciLibrary(accountDetails);
    }
  }

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
          if(this.createMandateTxnId) {
            this.npciAndroidService.transactionId = this.createMandateTxnId;
          } else {
            this.npciAndroidService.transactionId = transactionId;
          }
          this.npciAndroidService.upiCreateMandateModel.payerVPA = this.createMandatePayment.fromUPIId;
          this.npciAndroidService.upiCreateMandateModel.payeeVPA = this.createMandatePayment.toPayee;
          this.npciAndroidService.upiCreateMandateModel.txnAmount = this.createMandatePayment.amount;
          this.npciAndroidService.upiCreateMandateModel.payeeName = this.createMandatePayment.payeeName;

          this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_createMandate_android, subject).subscribe((NPCIResponse) => {
            console.log('Android StartCLLibrary Success => ', NPCIResponse);
            /**
            * set cred data in api
            */
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              let req = this.createMandateService.createMandateReq(NPCIResponse);
              this.UpiApiCall(req);
            } else { }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        let subject = new Subject<any>();
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          if(this.createMandateTxnId) {
            this.npciIosService.txnId = this.createMandateTxnId;
          } else {
            this.npciIosService.txnId = transactionId;
          }
          this.npciIosService.upiCreateMandateModel.payerVPA = this.createMandatePayment.fromUPIId;
          this.npciIosService.upiCreateMandateModel.payeeVPA = this.createMandatePayment.toPayee;
          this.npciIosService.upiCreateMandateModel.txnAmount = this.createMandatePayment.amount;
          this.npciIosService.upiCreateMandateModel.payeeName = this.createMandatePayment.payeeName;
          this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_createMandate_ios, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ');
            console.log(NPCIResponse);
            if(NPCIResponse && NPCIResponse.credkey) {
              /**
              * set cred data in api
              */
              let req = this.createMandateService.createMandateReq(NPCIResponse);
              this.UpiApiCall(req);
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
  * Common Api Call for create mandate 
  * @param request 
  */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.createMandateResp = response;
      this.DataService.upiCallTransactionHistoryApi = true;

      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_PAYMANDATE:
            this.ngZone.run(() => {
              this.goToPage('/createMandateSuccess');
            })
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
  /**
   * Get Selected Vpa Adress/Account Details
   */
  getSelectedVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.upiMandateVpaList.find((vpaAddress) => { return vpaAddress?.isSelected == true });
    if (defaultVpaAccountArr) {
     this.defaultVPAAccount = this.DataService.getSelectedAccountNoByVpa(defaultVpaAccountArr.accounts);
    }
  }
}
