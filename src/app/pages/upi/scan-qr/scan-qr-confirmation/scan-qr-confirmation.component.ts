import { Location } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../../app/app.constant';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import { DataService } from '../../../../services/data.service';
import { ScanQrPaymentService } from '../scan-qr-payment/scan-qr-payment.service';
import { UPIBankAccount } from '../../../../../app/models/account-detail-model';
import { Subject, Subscription, Observable } from 'rxjs';
import { CommonMethods } from '../../../../../app/utilities/common-methods';
import * as moment from 'moment';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
declare var showToastMessage: any;

@Component({
  selector: 'app-scan-Qr-confirmation',
  templateUrl: './scan-Qr-confirmation.component.html',
  styleUrls: ['./scan-Qr-confirmation.component.scss']
})
export class ScanQrConfirmationComponent implements OnInit {

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
  QRScanData: any;

  constructor(private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private location: Location,
    private scanQrAmtService: ScanQrPaymentService,
    private ngZone: NgZone,
    private loaderService: pageLoaderService,
    private commonMethods: CommonMethods) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'scanQRPayment', this.location.prepareExternalUrl("scanQRPayment"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.payeeAmt = this.DataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g, '');
    this.QRScanData = this.DataService.ScanQrCodeData;
  }

  /**
   * on pay button click and call NPCI library
   */
  onClickPayAmount() {
    let accountData = this.DataService.selectedVpaDetailsPay.accountDetails;
    var formAmtValue = this.DataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g, '') ? parseFloat(this.DataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g, '')) : 0;
    var formEntipValue = this.DataService.upiPayRequest.enTipAmount.trim().replace(/[^.0-9]+/g, '') ? parseFloat(this.DataService.upiPayRequest.enTipAmount.trim().replace(/[^.0-9]+/g, '')) : 0;
    var txnAmount = formAmtValue + formEntipValue;
    this.DataService.validateAddressResp.payAmount = this.DataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g, '');
    this.DataService.upiPayModelObj.payerAddr = this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress ? this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress : "";
    this.DataService.upiPayModelObj.payeeAddr = this.DataService.payeeObj.payeeUpiAddress ? this.DataService.payeeObj.payeeUpiAddress : "";
    this.DataService.upiPayModelObj.txnAmount = txnAmount.toFixed(2);
    this.DataService.upiPayModelObj.payeeName = this.DataService.payeeObj.payeeName ? this.DataService.payeeObj.payeeName : "";
    // this.DataService.upiPayModelObj.payeeMobile = this.DataService.validateAddressResp.mobileNumber ? this.DataService.validateAddressResp.mobileNumber : "";
    // this.DataService.upiPayModelObj.payeeMmid = this.DataService.validateAddressResp.enterMmid ? this.DataService.validateAddressResp.enterMmid : "";
    // this.DataService.upiPayModelObj.payeeAccount = this.DataService.payeeObj.payeeActNo ? this.DataService.payeeObj.payeeActNo : "";
    this.DataService.upiPayModelObj.payeeIfsc = this.DataService.validateAddressResp.IFSC ? this.DataService.payeeObj.payeeIfsc : "";
    // this.scanQrAmtService.scanQrFormValues = this.scanQrAmountForm.value;
    // this.DataService.upiPayRequest.amount = this.scanQrAmountForm.get('amount').value;
    // this.DataService.upiPayRequest.enTipAmount = this.scanQrAmountForm.get('enTipAmount').value;
    // this.DataService.upiPayRequest.remarks = this.scanQrAmountForm.get('remarks').value;
    // this.DataService.upiPayRequest.consentFlag = this.scanQrAmountForm.get('consentFlag').value;
    //check ifsc for pre-approved
    console.log("this.QRScanData");
    console.log(this.QRScanData);
    if (this.QRScanData.tid) {
      this.npciAndroidService.transactionId = this.QRScanData.tid;
      this.npciIosService.txnId = this.QRScanData.tid;
      this.DataService.payReceiptTransId = this.QRScanData.tid;
    } else {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.npciAndroidService.transactionId = transactionId;
        this.npciIosService.txnId = transactionId;
        this.DataService.payReceiptTransId = transactionId;
      });
    }
    
    if (accountData.isSelected && accountData.ifsc.includes("PSIB")) {
      this.DataService.preApprovedFlowIdentifier = "scanQr";
      this.DataService.preApprovedBankName = accountData.bankName;
      this.DataService.preApprovedAccNo = accountData.maskedAccountNumber;
      this.DataService.preApprovedAmount = this.DataService.upiPayModelObj.txnAmount;
      this.DataService.preApprovedPreviousPageUrl = this.router.url;
      this.router.navigateByUrl('/transactionPin');
    } else {
      console.log("SCAN QR PAYMENT => this.DataService.selectedFlow = ", this.DataService.selectedFlow);
      this.callNpciLibrary(accountData, this.DataService.selectedFlow);
    }
  }

  checkTransactionId(): Observable<any> {
    var subject = new Subject<any>();
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      if (this.QRScanData.tid) {
        this.npciAndroidService.transactionId = this.QRScanData.tid;
        this.DataService.payReceiptTransId = this.QRScanData.tid;
        subject.next(true);
        subject.complete();
      } else { 
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.DataService.payReceiptTransId = transactionId;
          subject.next(true);
          subject.complete();
        }, (err) => {
          subject.next(false);
          subject.complete();
        });
      }
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      if (this.QRScanData.tid) {
        this.npciIosService.txnId = this.QRScanData.tid;
        this.DataService.payReceiptTransId = this.QRScanData.tid;
        subject.next(true);
        subject.complete();
      } else {
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          this.npciIosService.txnId = transactionId;
          this.DataService.payReceiptTransId = transactionId;
          subject.next(true);
          subject.complete();
        }, (err) => {
          subject.next(false);
          subject.complete();
        });
      } 
    } else {
      console.log("Unknown platform...");
    }
    return subject.asObservable();
  }

  callNpciLibrary(accountData: UPIBankAccount, selectedFlow) {
    // this.checkTransactionId().subscribe((success) => {
    //   if(success) {
        console.log("calling npci library...");
        this.loaderService.showLoader();
        if (window.hasOwnProperty('cordova')) {
          if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
            console.log("Calling NPCI Android service...");
            this.npciAndroidService.initData();
            this.npciAndroidService.selectedFlow = selectedFlow;
            var subject = new Subject<any>();
               
            this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_android, subject).subscribe((NPCIResponse) => {
              console.log('Android StartCLLibrary Success => ', NPCIResponse);
              if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
                this.payAmount(NPCIResponse);
              }
            }, err => {
              console.log('Android StartCLLibrary error => ', err);
            });
          } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
            console.log("Calling NPCI iOS service...");
            this.npciIosService.initData();
            this.npciIosService.selectedFlow = selectedFlow;
            let subject = new Subject<any>();
    
            this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_ios, subject).subscribe((NPCIResponse) => {
              console.log('iOS StartCLLibrary Success => ', NPCIResponse);
              if (NPCIResponse && NPCIResponse.credkey) {
                this.payAmount(NPCIResponse);
              } else {
                console.log("NPCI flow cancelled...");
              }
            }, err => {
              console.log('iOS StartCLLibrary error => ', err);
            });
          } else {
            showToastMessage("Unsupported Platform Try After Some Time!", "error");
            console.log("unknown platform = ", this.DataService.platform);
          }
        } else {
          console.log("Cordova not available... unable to start NPCI Library on web");
        }
    //   }
    // });
  }

  /**
   * collect amount
   */
  payAmount(NPCICredData) {
    var currentDate = moment().format('YYYY-MM-DD');
    var currentTime = moment.duration(moment().format('HH:mm'), "minutes");
    var time = moment.duration(moment(this.DataService.upiPayRequest.time).format('HH:mm'), "minutes");
    var expiryDate = moment(this.DataService.upiPayRequest.date).format('YYYY-MM-DD');
    var actualExpDateDiffInMins = moment(expiryDate).diff(currentDate, 'minutes');
    var expiryTime = moment.duration(time, "minutes");
    var actualTimeDiffInMins = expiryTime.subtract(currentTime).minutes();
    var expirationMin = actualExpDateDiffInMins + actualTimeDiffInMins;
    this.DataService.upiPayRequest.expiryTime = expirationMin.toString();
    let selectedVpa = this.getSelectedVpaAccountDetails();
    var reqParams = this.scanQrAmtService.setPaymentRequest(selectedVpa, this.DataService.payeeObj, NPCICredData, this.QRScanData);
    this.UpiApiCall(reqParams, NPCICredData);
  }

  UpiApiCall(request, NPCICredData) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.upiCallTransactionHistoryApi = true;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.setDetails(response, NPCICredData);
            this.DataService.routeWithNgZone('scanQRSuccess');
            break;

          default:
            break;
        }
      } else {
        this.setDetails(response, NPCICredData);
        this.DataService.routeWithNgZone('scanQRSuccess');
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  setDetails(response, NPCICredData) {
    this.DataService.payReceiptObj = response;
    // let { remarks, amount } = this.scanQrAmountForm.value;
    this.DataService.payReceiptObj.remarks = this.DataService.upiPayRequest.remarks;
    this.DataService.payReceiptObj.amount = this.DataService.upiPayModelObj.txnAmount;
    this.DataService.payReceiptObj.payeeName = this.DataService.payeeObj.payeeName;
    this.DataService.payReceiptObj.payeeUpiAddress = this.DataService.payeeObj.payeeUpiAddress;
    this.DataService.payReceiptObj.payeeBankName = this.DataService.payeeObj.payeeBankName;
    this.DataService.payReceiptObj.payeeIfsc = this.DataService.payeeObj.payeeIfsc;
    this.DataService.payReceiptObj.payeeActNo = this.DataService.payeeObj.payeeActNo;
    this.DataService.payReceiptObj.selectedVpa = this.DataService.selectedVpaDetailsPay;
    this.DataService.payReceiptObj.refURL = this.DataService.ScanQrCodeData.url;
  }

  /**
 * Get Selected Vpa Adress/Account Details
 */
  getSelectedVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.upiPayVpaList.find((vpaAddress) => { return vpaAddress.isSelected == true });

    if (defaultVpaAccountArr) {
      let accountDetails = this.getSelectedAccountNoByVpa(defaultVpaAccountArr.accounts);
      this.scanQrAmtService.selectedVpa = {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    }
  }

  /**
   * Get Selected Vpa AccountNo Details
   * @param array 
   */
  getSelectedAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isSelected == true });
    }
  }

  routePage(url) {
    this.router.navigateByUrl(url);
  }
}
