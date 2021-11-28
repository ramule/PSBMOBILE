import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../app.constant';
import { CustomCurrencyPipe } from '../../../../pipes/custom-currency.pipe';
import { FormValidationService } from '../../../../services/form-validation.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { ScanQrPaymentService } from './scan-qr-payment.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { UPIBankAccount } from '../../../../models/account-detail-model';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Subject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var cordova: any;

@Component({
  selector: 'app-scan-qr-payment',
  templateUrl: './scan-qr-payment.component.html',
  styleUrls: ['./scan-qr-payment.component.scss']
})
export class ScanQrPaymentComponent implements OnInit {
  scanQrAmountForm: FormGroup;
  payDate: any;
  payTime: any;
  selectedVpa: any;
  vpaAddressList = [];
  showDetails = false;
  currentDate = moment().format('YYYY-MM-DD');
  currentTime = moment.duration(moment().format('HH:mm'), "minutes");
  NPCICredData: any = [];
  payeeObj: any;
  amtEditable = true;
  qrAmount: any;
  qrMinAmount: any;
  popupData: any;
  QRScanData: any;
  qrGstCheck: any;
  maxAmount: any;
  minAmount: any;
  headerdata = {
    'headerType': 'backUpiIdHeader',
    'titleName': 'SCAN_PAY',
    'footertype': 'none'
  }
  constructor(private router: Router,
    public DataService: DataService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private localStorage: LocalStorageService,
    private formValidation: FormValidationService,
    private commonMethod: CommonMethods,
    private scanQrAmtService: ScanQrPaymentService,
    private translate: TranslatePipe,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private location: Location,
    private ngZone: NgZone,
    private loaderService: pageLoaderService
  ) { }

  ngOnInit(): void {
    // this.DataService.setPageSettings('Collect');
    this.DataService.changeMessage(this.headerdata);
    createGlobalNavMore();
    this.initialize();
  }

  initialize() {
    this.buildForm();
    this.payDate = this.DataService.upiPayRequest.date;
    this.payTime = this.DataService.upiPayRequest.time;
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl('upiDashboard'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    // this.selectedVpa = this.DataService.upiCollectSelectedVpa;
    this.QRScanData = this.DataService.ScanQrCodeData;
    console.log("<==== this.QRScanData ====>");
    console.log(this.QRScanData);
    let vpaAddressList = JSON.parse(JSON.stringify(this.DataService.vpaAddressList));
    console.log(JSON.stringify(vpaAddressList));
    if (this.DataService.upiPayVpaList.length == 0) {
      console.log("selectedVpaDetailsPay", this.DataService.selectedVpaDetailsPay);
      this.DataService.upiPayVpaList = vpaAddressList.map((vpaAddress: any) => {
        vpaAddress.isSelected || vpaAddress.default == "Y" ? vpaAddress.isSelected = true : vpaAddress.isSelected = false;
        vpaAddress.accounts.map((account: any) => {
          account.isSelected || account.isDefaultAccount == "Y" ? account.isSelected = true : account.isSelected = false;
          return account;
        })
        return vpaAddress;
      });
    }
    console.log(JSON.stringify(this.DataService.vpaAddressList));
    this.payeeObj = {}
    if (this.QRScanData.qrMode == "upi") { //UPI QR Condition and validation
      this.qrAmount = this.nullified(this.QRScanData.am ? this.QRScanData.am : '').replace(/[^.0-9]/g, '');
      this.qrMinAmount = this.nullified(this.QRScanData.mam ? this.QRScanData.mam : '').replace(/[^.0-9]/g, '');
      this.qrGstCheck = this.QRScanData.gstIn && this.QRScanData.gstBrkUp ? true : false;
      if (this.qrAmount === this.qrMinAmount && (this.qrAmount > '0' && this.qrMinAmount > '0')) {
        this.scanQrAmountForm.get('amount').setValue(this.qrAmount);
        // this.scanQrAmountForm.controls['amount'].disable();
        this.amtEditable = false;
        this.onInput(this.qrAmount, 'AMT');
      } else if ((this.qrAmount) && (this.qrMinAmount == "0" || this.qrMinAmount == "" || this.qrMinAmount == "null")) {
        this.scanQrAmountForm.get('amount').setValue(this.qrAmount);
        this.formValidation.formatCurrency(this.qrAmount, this.scanQrAmountForm);
        this.amtEditable = false;
        // this.onInput(this.qrAmount, 'AMT');
      } else if (this.qrAmount && this.qrMinAmount) {
        this.scanQrAmountForm.get('amount').setValue(this.qrAmount);
        this.amtEditable = true;
        this.onInput(this.qrAmount, 'AMT');
      } else {
        this.scanQrAmountForm.get('amount').setValue(this.qrAmount);
        this.amtEditable = true;
        this.formValidation.formatCurrency(this.qrAmount, this.scanQrAmountForm);
        // this.onInput(this.qrAmount, 'AMT');
      }
      if (this.QRScanData.tn) {
        this.scanQrAmountForm.get('remarks').setValue(this.QRScanData.tn);
        this.QRScanData.qrRemarkEditable = false;
      } else {
        this.QRScanData.qrRemarkEditable = true;
      }
      this.payeeObj.payeeName = this.DataService.validateAddressResp.MASKNAME ? this.DataService.validateAddressResp.MASKNAME : (this.DataService.ScanQrCodeData.pn || this.DataService.ScanQrCodeData.qrMerchantName);
      this.payeeObj.payeeUpiAddress = this.QRScanData.pa ? this.QRScanData.pa : '';
      this.payeeObj.payeeIfsc = this.DataService.validateAddressResp.IFSC ? this.DataService.validateAddressResp.IFSC : '';
      this.payeeObj.payMode = this.constant.val_upi_PAYMENTADDRESS;
    } else {  //Bharat QR Condition and validation
      this.qrAmount = this.nullified(this.QRScanData.qrAmount ? this.QRScanData.qrAmount : '').replace(/[^.0-9]/g, '');
      this.qrMinAmount = this.nullified(this.QRScanData.qrMinAmount ? this.QRScanData.qrMinAmount : '').replace(/[^.0-9]/g, '');
      this.qrGstCheck = this.QRScanData.gstIn && this.QRScanData.gstBrkUp ? true : false;
      if (this.qrAmount === this.qrMinAmount && (this.qrAmount > '0' && this.qrMinAmount > '0')) {
        this.scanQrAmountForm.get('amount').setValue(this.qrAmount);
        this.formValidation.formatCurrency(this.qrAmount, this.scanQrAmountForm);
        this.amtEditable = false;
        this.onInput(this.qrAmount, 'AMT');
      } else if ((this.qrAmount) && (this.qrMinAmount == "0" || this.qrMinAmount == "" || this.qrMinAmount == "null")) {
        this.scanQrAmountForm.get('amount').setValue(this.qrAmount);
        this.formValidation.formatCurrency(this.qrAmount, this.scanQrAmountForm);
        // this.scanQrAmountForm.controls['amount'].disable();
        this.amtEditable = false;
        // this.onInput(this.qrAmount, 'AMT');
      } else if (this.qrAmount && this.qrMinAmount) {
        this.scanQrAmountForm.get('amount').setValue(this.qrAmount);
        this.amtEditable = true;
        this.onInput(this.qrAmount, 'AMT');
      } else {
        this.scanQrAmountForm.get('amount').setValue(this.qrAmount);
        this.formValidation.formatCurrency(this.qrAmount, this.scanQrAmountForm);
        this.amtEditable = true;
        // this.onInput(this.qrAmount, 'AMT');
      }
      this.payeeObj.payeeName = this.DataService.validateAddressResp.MASKNAME ? this.DataService.validateAddressResp.MASKNAME : (this.DataService.ScanQrCodeData.pn || this.DataService.ScanQrCodeData.qrMerchantName);
      this.payeeObj.payeeUpiAddress = this.QRScanData.qrPaymentAddress ? this.QRScanData.qrPaymentAddress : '';
      this.payeeObj.payeeBankName = this.QRScanData.rrn ? this.QRScanData.rrn : '';
      this.payeeObj.payeeIfsc = this.QRScanData.qrIfsc ? this.QRScanData.qrIfsc : '';
      this.payeeObj.payeeActNo = this.QRScanData.qrAccountNo ? this.QRScanData.qrAccountNo : '';
      this.payeeObj.payMode = this.constant.val_upi_PAYMENTADDRESS;
      if (this.QRScanData.qrRemark) {
        this.scanQrAmountForm.get('remarks').setValue(this.QRScanData.qrRemark);
      }
    }
    if (this.DataService.upiPayRequest.remarks) {
      this.scanQrAmountForm.get('remarks').setValue(this.DataService.upiPayRequest.remarks);
    }
    if (this.DataService.upiPayRequest.amount) {
      this.scanQrAmountForm.get('amount').setValue(this.DataService.upiPayRequest.amount);
    }
    if (this.DataService.upiPayRequest.enTipAmount) {
      this.scanQrAmountForm.get('enTipAmount').setValue(this.DataService.upiPayRequest.enTipAmount);
    }
    if (this.DataService.upiPayRequest.consentFlag) {
      this.scanQrAmountForm.get('consentFlag').setValue(this.DataService.upiPayRequest.consentFlag);
    }
    this.DataService.payeeObj = this.payeeObj;
    this.scanQrAmtService.payeeObj = this.payeeObj;
    console.log(this.DataService.upiPayVpaList);
    this.DataService.selectedVpaDetailsPay = this.getSelectedVpaAccountDetails();
    console.log("selectedVpaDetailsPay", this.DataService.selectedVpaDetailsPay);
    // this.showDetails = true;
  }

  buildForm() {
    this.scanQrAmountForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl('', [Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
      enTipAmount: new FormControl('', [Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      consentFlag: new FormControl('')
    });
  };


  /**
   * set update currency value
   * @param value 
   */
  onInput(value, ctrlName) {
    if (parseFloat(value) >= parseFloat(this.qrMinAmount) && parseFloat(value) >= parseFloat(this.qrAmount)) {
      this.formValidation.formatCurrency(value, this.scanQrAmountForm);
    }
    else {
      // this.formValidation.formatCurrency(value, this.scanQrAmountForm);
      this.showPopup('amountalert', value);
    }
  }

  /**
   * set check minimum and amount validation currency value
   * @param value 
   */
  onAmtMamCheck(value, ctrlName) {
    this.maxAmount = this.qrAmount ? this.qrAmount : "100000";
    this.minAmount = this.qrMinAmount ? this.qrMinAmount : "1";
    if (parseFloat(value) >= parseFloat(this.minAmount) && parseFloat(value) <= parseFloat(this.maxAmount)) {
      this.formValidation.formatCurrency(value, this.scanQrAmountForm);
    } else {
      // this.formValidation.formatCurrency(value, this.scanQrAmountForm);
      this.scanQrAmountForm.get('amount').setValue('');
      this.showPopup('amountalert', value)
    }
  }

  nullified(input) {
    if (null == input || input == '' || input == "null" || input == "0.00" || input == "0" || input == "0.0") {
      // this.showPopup("inValidQrCode", "");
      return "";
    } else {
      return input;
    }
  }

  onFocus(value) {
    this.formValidation.deFormatValue(value, this.scanQrAmountForm);
  }

  /**
   * set update currency value
   * @param value 
   */
  onEnTipAmtInput(value, ctrlName) {
    this.formValidation.formatAmtCurrency(value, this.scanQrAmountForm, ctrlName);
  }

  /**
 * show popup by popupName
 * @param popupName 
 * @param data 
 */
  showPopup(popupName, data?) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
  }

  /**
   * Close popup by popupName
   * @param popupName 
   */
  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  viewInvoice(url) {
    cordova.InAppBrowser.open(url, '_blank', 'location=no');
  }

  /**
   * on pay button click and call NPCI library
   */
  onClickPayAmount() {
    this.formValidation.markFormGroupTouched(this.scanQrAmountForm);
    if (this.scanQrAmountForm.valid) {
      let accountData = this.DataService.selectedVpaDetailsPay.accountDetails;
      var formAmtValue = this.scanQrAmountForm.value.amount.trim().replace(/[^.0-9]+/g, '') ? parseFloat(this.scanQrAmountForm.value.amount.trim().replace(/[^.0-9]+/g, '')) : 0;
      var formEntipValue = this.scanQrAmountForm.value.enTipAmount.trim().replace(/[^.0-9]+/g, '') ? parseFloat(this.scanQrAmountForm.value.enTipAmount.trim().replace(/[^.0-9]+/g, '')) : 0;
      var txnAmount = formAmtValue + formEntipValue;
      this.DataService.validateAddressResp.payAmount = this.scanQrAmountForm.value.amount.trim().replace(/[^.0-9]+/g, '');
      this.DataService.upiPayModelObj.payerAddr = this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress ? this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress : "";
      this.DataService.upiPayModelObj.payeeAddr = this.payeeObj.payeeUpiAddress ? this.payeeObj.payeeUpiAddress : "";
      this.DataService.upiPayModelObj.txnAmount = txnAmount.toFixed(2);
      this.DataService.upiPayModelObj.payeeName = this.payeeObj.payeeName ? this.payeeObj.payeeName : "";
      // this.DataService.upiPayModelObj.payeeMobile = this.DataService.validateAddressResp.mobileNumber ? this.DataService.validateAddressResp.mobileNumber : "";
      // this.DataService.upiPayModelObj.payeeMmid = this.DataService.validateAddressResp.enterMmid ? this.DataService.validateAddressResp.enterMmid : "";
      // this.DataService.upiPayModelObj.payeeAccount = this.payeeObj.payeeActNo ? this.payeeObj.payeeActNo : "";
      this.DataService.upiPayModelObj.payeeIfsc = this.DataService.validateAddressResp.IFSC ? this.payeeObj.payeeIfsc : "";
      this.scanQrAmtService.scanQrFormValues = this.scanQrAmountForm.value;
      this.DataService.upiPayRequest.amount = this.scanQrAmountForm.get('amount').value;
      this.DataService.upiPayRequest.enTipAmount = this.scanQrAmountForm.get('enTipAmount').value;
      this.DataService.upiPayRequest.remarks = this.scanQrAmountForm.get('remarks').value;
      this.DataService.upiPayRequest.consentFlag = this.scanQrAmountForm.get('consentFlag').value;
      if (this.QRScanData.tid) {
        this.npciAndroidService.transactionId = this.QRScanData.tid;
        this.DataService.payReceiptTransId = this.QRScanData.tid;
      } else {
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.DataService.payReceiptTransId = transactionId;
        });
      }
      //check ifsc for pre-approved
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
  }

  callNpciLibrary(accountData: UPIBankAccount, selectedFlow) {
    console.log("calling npci library...");
    this.loaderService.showLoader();
    if (window.hasOwnProperty('cordova')) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        this.npciAndroidService.selectedFlow = selectedFlow;
        var subject = new Subject<any>();
        // if (this.QRScanData.tid || this.QRScanData.qrReferenceNo) {
        //   this.npciAndroidService.transactionId = this.QRScanData.tid ? this.QRScanData.tid : this.QRScanData.qrReferenceNo;
        //   this.DataService.payReceiptTransId = this.QRScanData.tid ? this.QRScanData.tid : this.QRScanData.qrReferenceNo;
        // } else {
        //   this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        //     this.npciAndroidService.transactionId = transactionId;
        //     this.DataService.payReceiptTransId = transactionId;
        //   });
        // }
        this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_android, subject).subscribe((NPCIResponse) => {
          console.log('Android StartCLLibrary Success => ', NPCIResponse);
          this.payAmount(NPCIResponse);
        }, err => {
          console.log('Android StartCLLibrary error => ', err);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        this.npciIosService.selectedFlow = selectedFlow;
        let subject = new Subject<any>();

        if (this.QRScanData.tid) {
          this.npciIosService.txnId = this.QRScanData.tid;
          this.DataService.payReceiptTransId = this.QRScanData.tid;
        } else {
          this.npciIosService.getTransactionId().subscribe((transactionId) => {
            this.npciIosService.txnId = transactionId;
            this.DataService.payReceiptTransId = transactionId;
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
          });
        }

        
      } else {
        showToastMessage("Unsupported Platform Try After Some Time!", "error");
        console.log("unknown platform = ", this.DataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
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
    var reqParams = this.scanQrAmtService.setPaymentRequest(selectedVpa, this.payeeObj, NPCICredData, this.QRScanData);
    this.UpiApiCall(reqParams);
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.DataService.payReceiptObj = response;
            let { remarks, amount } = this.scanQrAmountForm.value;
            this.DataService.payReceiptObj.remarks = remarks;
            this.DataService.payReceiptObj.amount = this.DataService.upiPayModelObj.txnAmount;
            this.DataService.payReceiptObj.payeeName = this.payeeObj.payeeName;
            this.DataService.payReceiptObj.payeeUpiAddress = this.payeeObj.payeeUpiAddress;
            this.DataService.payReceiptObj.payeeBankName = this.payeeObj.payeeBankName;
            this.DataService.payReceiptObj.payeeIfsc = this.payeeObj.payeeIfsc
            this.DataService.payReceiptObj.payeeActNo = this.payeeObj.payeeActNo
            this.DataService.payReceiptObj.selectedVpa = this.DataService.selectedVpaDetailsPay;
            // this.DataService.payReceiptObj.debitFrom = ;
            this.routePage('/scanQRSuccess');
            break;

          default:
            break;
        }
      } else {
        if (response.status == "01") {
          switch (response.subActionId) {
            case this.constant.upiserviceName_FUNDSTRANSFER:
              this.DataService.payReceiptObj = response;
              let { remarks, amount } = this.scanQrAmountForm.value;
              this.DataService.payReceiptObj.remarks = remarks;
              this.DataService.payReceiptObj.amount = this.DataService.upiPayModelObj.txnAmount;
              this.DataService.payReceiptObj.payeeName = this.payeeObj.payeeName;
              this.DataService.payReceiptObj.payeeUpiAddress = this.payeeObj.payeeUpiAddress;
              this.DataService.payReceiptObj.payeeBankName = this.payeeObj.payeeBankName;
              this.DataService.payReceiptObj.payeeIfsc = this.payeeObj.payeeIfsc
              this.DataService.payReceiptObj.payeeActNo = this.payeeObj.payeeActNo
              this.DataService.payReceiptObj.selectedVpa = this.DataService.selectedVpaDetailsPay;
              // this.DataService.payReceiptObj.debitFrom = ;
              this.routePage('/scanQRSuccess');
              break;

            default:
              break;
          }
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }


  routePage(url) {
    this.DataService.upiPayRequest.amount = this.scanQrAmountForm.get('amount').value;
    this.DataService.upiPayRequest.enTipAmount = this.scanQrAmountForm.get('enTipAmount').value;
    this.DataService.upiPayRequest.remarks = this.scanQrAmountForm.get('remarks').value;
    this.DataService.upiPayRequest.consentFlag = this.scanQrAmountForm.get('consentFlag').value;
    this.ngZone.run(() => {
      this.router.navigateByUrl(url);
    })
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

  /**
     * Show Toast message with multilingual
     * @param msgKey 
     * @param toastColor 
     */
  showCommonToastMsgWithKey(msgKey, toastColor) {
    showToastMessage(this.translate.transform(msgKey), toastColor)
  }
}
