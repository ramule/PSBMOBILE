import { Location } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../../app/app.constant';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import { DataService } from '../../../../services/data.service';
import { PayUpiPaymentService } from '../pay-upi-payment/pay-upi-payment.service';
import { UPIBankAccount } from '../../../../../app/models/account-detail-model';
import { Subject, Subscription } from 'rxjs';
import { CommonMethods } from '../../../../../app/utilities/common-methods';
import * as moment from 'moment';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var mandate: any;

@Component({
  selector: 'app-pay-upi-confirmation',
  templateUrl: './pay-upi-confirmation.component.html',
  styleUrls: ['./pay-upi-confirmation.component.scss']
})
export class PayUpiConfirmationComponent implements OnInit {

  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'CONFIRMATION',
    'footertype': 'none'
  }
  VPADetails: any;
  VPAAccountDetails: any;
  defaultVPAAccount: any;
  validityStart: any;
  payeeAmt: any;
  // payeeObj: any;
  payErrorMsg = "";

  constructor(private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private location: Location,
    private payAmtService: PayUpiPaymentService,
    private ngZone: NgZone,
    private loaderService: pageLoaderService,
    private commonMethods: CommonMethods) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'payUpiPayment', this.location.prepareExternalUrl("payUpiPayment"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.payeeAmt = this.DataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g, '');
  }

  /**
 * on pay button click and call NPCI library
 */
  onClickPayAmount() {
    this.payAmtService.payeeObj = this.DataService.payeeObj;
    let accountData = this.DataService.selectedVpaDetailsPay.accountDetails;
    this.DataService.verifyAddressResp.payAmount = this.DataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g, '');
    this.DataService.upiPayModelObj.payerAddr = this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress ? this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress : "";
    this.DataService.upiPayModelObj.payeeAddr = this.DataService.payeeObj.payeeUpiAddress;
    this.DataService.upiPayModelObj.txnAmount = this.DataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g, '');
    this.DataService.upiPayModelObj.payeeName = this.DataService.payeeObj.payeeName ? this.DataService.payeeObj.payeeName : "";
    // this.DataService.upiPayRequest.amount = this.payAmountForm.get('amount').value;
    // this.DataService.upiPayRequest.remarks = this.payAmountForm.get('remarks').value;
    // if(Number(this.DataService.upiPayModelObj.txnAmount) > accountData.currentLimit){
    //   this.ngZone.run(()=>{
    //     this.DataService.information = this.translate.transform('CURRENT_LIMIT_EXCEEDED');
    //     this.DataService.informationLabel = this.translate.transform('INFORMATION');
    //     this.DataService.primaryBtnText = this.translate.transform('OK');
    //     this.commonMethods.openPopup('div.popup-bottom.show-common-info');
    //   })
    //   return;
    // }
    // this.DataService.upiPayModelObj.payeeMobile = this.DataService.verifyAddressResp.mobileNumber ? this.DataService.verifyAddressResp.mobileNumber : "";
    // this.DataService.upiPayModelObj.payeeMmid = this.DataService.verifyAddressResp.enterMmid ? this.DataService.verifyAddressResp.enterMmid : "";
    // this.DataService.upiPayModelObj.payeeAccount = this.DataService.verifyAddressResp.actNo ? this.DataService.verifyAddressResp.actNo : "";
    // this.DataService.upiPayModelObj.payeeIfsc = this.DataService.verifyAddressResp.IFSC ? this.DataService.verifyAddressResp.IFSC : "";
    $('div.popup-bottom.show-common-error').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
    // this.payAmount(accountData);
    //check ifsc for pre-approved
    if (accountData.isSelected && accountData.ifsc.includes("PSIB")) {
      let amount = this.DataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g, '');
      this.DataService.preApprovedBankName = accountData.bankName;
      this.DataService.preApprovedAccNo = accountData.maskedAccountNumber;
      this.DataService.preApprovedAmount = amount;
      this.DataService.preApprovedPreviousPageUrl = this.router.url;
      this.DataService.preApprovedFlowIdentifier = "pay";
      this.router.navigateByUrl('/transactionPin');
    } else {
      this.callNpciLibrary(accountData, this.DataService.selectedFlow);
    }
  }

  /**
   * Call NPCI Library
   * @param accountData 
   */
  callNpciLibrary(accountData: UPIBankAccount, selectedFlow) {
    console.log("calling npci library...");
    this.loaderService.showLoader();
    if (window.hasOwnProperty('cordova')) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        this.npciAndroidService.selectedFlow = selectedFlow;
        let subject = new Subject<any>();
        // this.npciAndroidService.credTypeValue = this.constant.val_npci_credTypeUpiPin;
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.DataService.payReceiptTransId = transactionId;

          this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_android, subject).subscribe((NPCIResponse) => {
            console.log('Android StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              this.commonMethods.closePopup('div.popup-bottom.retryMsg')
              this.payAmtService.fundTransferApiCall(NPCIResponse).subscribe(PayResponse => {
                // this.commonMethods.closePopup('div.popup-bottom.show-common-error')

                console.log('fundTransferApiCall success', PayResponse);
                if (PayResponse.isPaymentSuccessful) {
                  this.DataService.routeWithNgZone("payUpiSuccess");
                } else {
                  this.ngZone.run(() => {
                    // $('div.popup-bottom.show-common-error').removeClass('popup-active');
                    // $('div.ios-nav-overlay').fadeOut(400);
                    this.payErrorMsg = PayResponse.errorMsg;
                    // this.commonMethods.openPopup('div.popup-bottom.retryMsg')
                    this.DataService.routeWithNgZone("payUpiSuccess");
                  })
                }
              });
            }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        this.npciIosService.selectedFlow = selectedFlow;
        let subject = new Subject<any>();
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_ios, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse) {
              if (NPCIResponse && NPCIResponse.credkey) {
                this.commonMethods.closePopup('div.popup-bottom.retryMsg');
                this.payAmtService.fundTransferApiCall(NPCIResponse).subscribe(PayResponse => {
                  this.commonMethods.closePopup('div.popup-bottom.show-common-error')
                  console.log('fundTransferApiCall success', PayResponse);
                  if (PayResponse.isPaymentSuccessful) {
                    this.DataService.routeWithNgZone("payUpiSuccess");
                  } else {
                    this.ngZone.run(() => {
                      this.payErrorMsg = PayResponse.errorMsg;
                      // this.commonMethods.openPopup('div.popup-bottom.retryMsg')
                      this.DataService.routeWithNgZone("payUpiSuccess");
                    });
                  }
                });
              } else {
                console.log("NPCI Flow cancelled...");
              }
            }
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        // showToastMessage("Unsupported Platform Try After Some Time!", "error");
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
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.DataService.payReceiptObj = response;
            this.DataService.payReceiptObj.remarks = this.DataService.upiPayRequest.remarks;
            this.DataService.payReceiptObj.amount = this.DataService.upiPayRequest.amount;
            this.DataService.payReceiptObj.payType = this.DataService.verifyAddressResp.payType;
            this.DataService.payReceiptObj.payeeName = this.DataService.payeeObj.payeeName;
            this.DataService.payReceiptObj.payeeUpiAddress = this.DataService.payeeObj.payeeUpiAddress;
            this.DataService.payReceiptObj.payeeBankName = this.DataService.payeeObj.payeeBankName;
            this.DataService.payReceiptObj.payeeIfsc = this.DataService.payeeObj.payeeIfsc;
            this.DataService.payReceiptObj.payeeActNo = this.DataService.payeeObj.payeeActNo;
            this.DataService.payReceiptObj.selectedVpa = this.DataService.selectedVpaDetailsPay;
            this.DataService.payReceiptObj.payReceiptTransId = this.npciAndroidService.transactionId;
            // this.DataService.payReceiptObj.debitFrom = ;
            this.DataService.routeWithNgZone('payUpiSuccess');
            break;

          default:
            break;
        }
      } else {
        if (response.status == "01") {
          // showToastMessage(response.msg, "error");
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  routePage(url) {
    this.router.navigateByUrl(url);
  }
}
