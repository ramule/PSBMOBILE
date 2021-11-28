import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PayUpiPaymentService } from './pay-upi-payment.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { UPIBankAccount } from 'src/app/models/account-detail-model';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { pageLoaderService } from 'src/app/services/pageloader.service';

declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-pay-upi-payment',
  templateUrl: './pay-upi-payment.component.html',
  styleUrls: ['./pay-upi-payment.component.scss']
})
export class PayUpiPaymentComponent implements OnInit, OnDestroy {
  payAmountForm: FormGroup;
  payDate: any;
  payTime: any;
  selectedVpa: any;
  vpaAddressList = [];
  showDetails = false;
  currentDate = moment().format('YYYY-MM-DD');
  currentTime = moment.duration(moment().format('HH:mm'), "minutes");
  NPCICredData: any = [];
  payeeObj: any;
  mbebaFlag: any;
  prevPageUrl: any;
  payErrorMsg = "";
  paymentRupees = "";
  headerdata = {
    'headerType': 'backUpiIdHeader',
    'titleName': 'PAY',
    'footertype': 'none'
  }
  constructor(private router: Router,
    public DataService: DataService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private localStorage: LocalStorageService,
    private formValidation: FormValidationService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private payAmtService: PayUpiPaymentService,
    private translate: TranslatePipe,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private location: Location,
    private ngZone: NgZone,
    private loaderService: pageLoaderService,
    private commonMethods: CommonMethods
  ) { }

  ngOnInit(): void {
    $('#amt').autoNumeric('init', {aSign: "₹ "});
    // this.DataService.setPageSettings('Collect');
    this.DataService.changeMessage(this.headerdata);
    createGlobalNavMore();
    this.initialize();
  }

  initialize() {
    this.buildForm();
    this.payDate = this.DataService.upiPayRequest.date;
    this.payTime = this.DataService.upiPayRequest.time;
    if (this.DataService.previousPageUrl == "payUpiSuccess" || this.DataService.previousPageUrl == "payUpiIdList" || this.DataService.previousPageUrl == "transactionPin" || this.DataService.previousPageUrl == "payUpiConfirm") {
      this.prevPageUrl = 'payUpi';
    } else if (this.DataService.previousPageUrl == 'transactionDetails' && this.DataService.baseStartUrl == 'recentTransaction') {
      this.prevPageUrl = 'recentTransaction';
    } else if (this.DataService.previousPageUrl == "transactionDetails") {
      this.prevPageUrl = 'upiDashboard';
    } else if (this.DataService.previousPageUrl == "recentTransaction") {
      this.prevPageUrl = 'recentTransaction';
    } else {
      this.prevPageUrl = 'payUpi';
    }
    history.pushState({}, this.prevPageUrl, this.location.prepareExternalUrl(this.prevPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    // this.selectedVpa = this.DataService.upiCollectSelectedVpa;
    let vpaAddressList = JSON.parse(JSON.stringify(this.DataService.vpaAddressList));
    console.log("vpaAddressList");
    console.log(vpaAddressList)
    console.log("this.DataService.upiPayVpaList");
    console.log(this.DataService.upiPayVpaList);
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
    this.payeeObj = {}
    if (this.DataService.verifyAddressResp.payType == "BNK_ACT" || this.DataService.verifyAddressResp.payType == "ACCOUNT") {
      this.payeeObj.payeeName = this.DataService.verifyAddressResp.bankPayeeName ? this.DataService.verifyAddressResp.bankPayeeName : '';
      this.payeeObj.payeeUpiAddress = this.DataService.verifyAddressResp.acctNum + "@" + this.DataService.verifyAddressResp.bankIfsc + ".ifsc.npci";
      this.payeeObj.payeeBankName = this.DataService.verifyAddressResp.bankName ? this.DataService.verifyAddressResp.bankName : '';
      this.payeeObj.payeeIfsc = this.DataService.verifyAddressResp.bankIfsc ? this.DataService.verifyAddressResp.bankIfsc : '';
      this.payeeObj.payeeActNo = this.DataService.verifyAddressResp.acctNum ? this.DataService.verifyAddressResp.acctNum : '';
      this.payeeObj.payMode = this.constant.val_upi_ACCOUNT;
      this.DataService.upiBenfAccNo = this.payeeObj.payeeActNo;
      this.DataService.upiBenfIfsc = this.payeeObj.payeeIfsc;
      this.DataService.selectedFlow = this.constant.val_npci_upiPayIfsc;
    } else if (this.DataService.verifyAddressResp.payType == "MMID") {
      this.payeeObj.payeeName = this.DataService.verifyAddressResp.mmidPayeeName ? this.DataService.verifyAddressResp.mmidPayeeName : '';
      this.payeeObj.payeeUpiAddress = this.DataService.verifyAddressResp.mobileNumber + "@" + this.DataService.verifyAddressResp.enterMmid + ".mmid.npci";
      this.payeeObj.payeeBankName = this.DataService.verifyAddressResp.bankName ? this.DataService.verifyAddressResp.bankName : '';
      this.payeeObj.payeeIfsc = this.DataService.verifyAddressResp.bankIfsc ? this.DataService.verifyAddressResp.bankIfsc : '';
      this.payeeObj.payeeActNo = this.DataService.verifyAddressResp.mobileNumber ? this.DataService.verifyAddressResp.mobileNumber : '';
      this.payeeObj.payMode = this.constant.val_upi_MOBILE;
      this.DataService.upiBenfMMId = this.payeeObj.payeeName;
      this.DataService.selectedFlow = this.constant.val_npci_upiPayMmid;
    } else {
      this.payeeObj.payeeName = this.DataService.verifyAddressResp.MASKNAME ? this.DataService.verifyAddressResp.MASKNAME : '';
      this.payeeObj.payeeUpiAddress = this.DataService.verifyAddressResp.validatedVpa ? this.DataService.verifyAddressResp.validatedVpa : '';
      this.payeeObj.payeeBankName = this.DataService.verifyAddressResp.rrn ? this.DataService.verifyAddressResp.rrn : '';
      this.payeeObj.payeeIfsc = this.DataService.verifyAddressResp.IFSC ? this.DataService.verifyAddressResp.IFSC : '';
      this.payeeObj.payeeActNo = this.DataService.verifyAddressResp.actNo ? this.DataService.verifyAddressResp.actNo : '';
      this.payeeObj.payMode = this.constant.val_upi_PAYMENTADDRESS;
      this.DataService.selectedFlow = this.constant.val_npci_upiPayVpa;
    }
    console.log("DataService.verifyAddressResp => ", this.DataService.verifyAddressResp);


    this.DataService.payeeObj = this.payeeObj;
    console.log("this.DataService.upiPayVpaList");
    console.log(this.DataService.upiPayVpaList);
    this.DataService.selectedVpaDetailsPay = this.getSelectedVpaAccountDetails();
    this.mbebaFlag = this.DataService.selectedVpaDetailsPay.accountDetails.mbeba;
    // console.log("selectedVpaDetailsPay", this.DataService.selectedVpaDetailsPay);
    // this.showDetails = true;
    if (this.DataService.upiPayRequest.remarks) {
      this.payAmountForm.get('remarks').setValue(this.DataService.upiPayRequest.remarks);
    }
    if (this.DataService.upiPayRequest.amount) {
      this.payAmountForm.get('amount').setValue(this.DataService.upiPayRequest.amount);
    }
    if (this.DataService.fromRecentTransaction && this.DataService.upiTransactionSelected) {
      this.payAmountForm.get('amount').setValue(this.DataService.upiTransactionSelected.AMOUNT);
    }
  }

  buildForm() {
    this.payAmountForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl('', [Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)])
    });
  };

  /**
   * set update currency value
   * @param value 
   */
   formatCurrency(value) {
    this.formValidation.formatDynamicCurrency('amt',this.payAmountForm);
  }

  onFocus(value) {
    this.formValidation.deFormatValue(value, this.payAmountForm);
  }


  /**
   * on pay button click and call NPCI library
   */
  onClickPayAmount() {
    this.formValidation.markFormGroupTouched(this.payAmountForm);
    console.log("OnClickPayamount => ", this.payAmountForm.value);
    this.payAmtService.payAmtFormValues = this.payAmountForm.value;
    this.payAmtService.payeeObj = this.payeeObj;
    if (this.payAmountForm.valid) {
      let accountData = this.DataService.selectedVpaDetailsPay.accountDetails;
      this.DataService.verifyAddressResp.payAmount = this.payAmountForm.value.amount.trim().replace(/[^.0-9]+/g, '');
      this.DataService.upiPayModelObj.payerAddr = this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress ? this.DataService.selectedVpaDetailsPay.vpaDetails.paymentAddress : "";
      this.DataService.upiPayModelObj.payeeAddr = this.payeeObj.payeeUpiAddress;
      this.DataService.upiPayModelObj.txnAmount = this.payAmountForm.value.amount.trim().replace(/[^.0-9]+/g, '');
      this.DataService.upiPayModelObj.payeeName = this.payeeObj.payeeName ? this.payeeObj.payeeName : "";
      this.DataService.upiPayRequest.amount = this.payAmountForm.get('amount').value;
      this.DataService.upiPayRequest.remarks = this.payAmountForm.get('remarks').value;
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
        let amount = this.payAmountForm.value.amount.trim().replace(/[^.0-9]+/g, '');
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
  }

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
              // this.commonMethods.closePopup('div.popup-bottom.retryMsg')
              this.payAmtService.fundTransferApiCall(NPCIResponse).subscribe(PayResponse => {
                // this.commonMethods.closePopup('div.popup-bottom.show-common-error')

                console.log('fundTransferApiCall success', PayResponse);
                // if(PayResponse.isPaymentSuccessful) {
                this.DataService.routeWithNgZone("payUpiSuccess");
                // } else {
                //   this.ngZone.run(()=>{
                //     $('div.popup-bottom.show-common-error').removeClass('popup-active');
                //     $('div.ios-nav-overlay').fadeOut(400);
                //     this.payErrorMsg = PayResponse.errorMsg;
                //     this.commonMethods.openPopup('div.popup-bottom.retryMsg')
                //   })
                // }
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
            if (NPCIResponse && NPCIResponse.credkey) {
              this.payAmtService.fundTransferApiCall(NPCIResponse).subscribe(PayResponse => {
                console.log('fundTransferApiCall success', PayResponse);
                this.DataService.routeWithNgZone("payUpiSuccess");
              });
            } else {
              console.log("NPCI flow cancelled...");
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

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:

            this.DataService.payReceiptObj = response;
            console.log("this.payAmountForm.value => ", this.payAmountForm.value);
            let { remarks, amount } = this.payAmountForm.value;
            this.DataService.payReceiptObj.remarks = remarks;
            this.DataService.payReceiptObj.amount = amount;
            this.DataService.payReceiptObj.payType = this.DataService.verifyAddressResp.payType;
            this.DataService.payReceiptObj.payeeName = this.payeeObj.payeeName;
            this.DataService.payReceiptObj.payeeUpiAddress = this.payeeObj.payeeUpiAddress;
            this.DataService.payReceiptObj.payeeBankName = this.payeeObj.payeeBankName;
            this.DataService.payReceiptObj.payeeIfsc = this.payeeObj.payeeIfsc;
            this.DataService.payReceiptObj.payeeActNo = this.payeeObj.payeeActNo;
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
    this.DataService.upiPayRequest.amount = this.payAmountForm.get('amount').value;
    this.DataService.upiPayRequest.remarks = this.payAmountForm.get('remarks').value;
    this.router.navigateByUrl(url);
  }

  /**
   * Get Selected Vpa Adress/Account Details
   */
  getSelectedVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.upiPayVpaList.find((vpaAddress) => { return vpaAddress.isSelected == true });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getSelectedAccountNoByVpa(defaultVpaAccountArr.accounts);
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


  onClickAccChng() {
    this.router.navigateByUrl('/payUpiIdList')
  }

  closePopup(popupName) {
    this.commonMethods.closePopup('div.popup-bottom.show-common-error')
    this.commonMethods.closePopup('div.popup-bottom.' + popupName)
  }

  ngOnDestroy() {
    this.DataService.fromRecentTransaction = false;
  }
}
