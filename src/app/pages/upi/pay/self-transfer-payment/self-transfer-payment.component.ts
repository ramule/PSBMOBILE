import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { DepositAct, TransferAct } from 'src/app/models/self-transfer-model';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { PluginService } from 'src/app/services/plugin-service';
import { SelfTransferPaymentService } from 'src/app/pages/upi/pay/self-transfer-payment/self-transfer-payment.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { UPIBankAccount } from 'src/app/models/account-detail-model';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import * as moment from 'moment';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var $: any;


@Component({
  selector: 'app-self-transfer-payment',
  templateUrl: './self-transfer-payment.component.html',
  styleUrls: ['./self-transfer-payment.component.scss']
})
export class SelfTransferPaymentComponent implements OnInit {
  selfTransferAmtForm: FormGroup;
  depositAct: any;
  transferAct: any;
  currentDate = moment().format('YYYY-MM-DD');
  currentTime = moment.duration(moment().format('HH:mm'), "minutes");
  mbebaFlag: any;
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Self Transfer',
    'footertype': 'none'
  }

  constructor(public DataService: DataService,
    public router: Router,
    public translate: TranslatePipe,
    private customCurrencyPipe: CustomCurrencyPipe,
    private formValidation: FormValidationService,
    private pluginService: PluginService,
    private selfTransferPaymentService: SelfTransferPaymentService,
    private localStorage: LocalStorageService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private loaderService : pageLoaderService,
    private location: Location) { }

  ngOnInit(): void {
    $('#amt').autoNumeric('init', {aSign: "₹ "});
    history.pushState({}, 'payUpi', this.location.prepareExternalUrl("payUpi"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    createGlobalNavMore();
    this.selfTransferAmtForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl('', [Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
    });
    if (this.DataService.upiPayModelObj.remark) {
      this.selfTransferAmtForm.get('remarks').setValue(this.DataService.upiPayModelObj.remark);
    }
    if (this.DataService.upiPayModelObj.txnAmount) {
      this.selfTransferAmtForm.get('amount').setValue(this.DataService.upiPayModelObj.txnAmount);
      this.formatCurrency(this.DataService.upiPayModelObj.txnAmount)
    }
    this.depositAct = this.DataService.selfTransferActList.depositAct;
    console.log("depositAct => ", this.depositAct);
    this.transferAct = this.DataService.selfTransferActList.transferAct;
    console.log("tansferAct => ", this.transferAct);
    this.mbebaFlag = this.transferAct.mbeba;
  }

  /**
   * set update currency value
   * @param value 
   */
  formatCurrency(value) {
    // this.formValidation.formatCurrency(value, this.selfTransferAmtForm);
    this.formValidation.formatDynamicCurrency('amt',this.selfTransferAmtForm);
  }

  onFocus(value) {
    this.formValidation.deFormatValue(value, this.selfTransferAmtForm);
  }

  onClickTransferNow() {
    this.formValidation.markFormGroupTouched(this.selfTransferAmtForm);
    if (this.selfTransferAmtForm.valid) {
      this.DataService.upiPayModelObj.payerAddr = this.transferAct.paymentAddress;
      this.DataService.upiPayModelObj.payeeAddr = this.depositAct.accNum + "@" + this.depositAct.ifsc + ".ifsc.npci";
      this.DataService.upiPayModelObj.txnAmount = this.selfTransferAmtForm.value.amount.trim().replace(/[^.0-9]+/g, '');
      this.DataService.upiPayModelObj.payeeName = this.depositAct.custName ? this.depositAct.custName : '';
      //             this.DataService.upiPayModelObj.payeeMobile = this.DataService.verifyAddressResp.mobileNumber ? this.DataService.verifyAddressResp.mobileNumber : "";
      //             this.DataService.upiPayModelObj.payeeMmid = this.DataService.verifyAddressResp.enterMmid ? this.DataService.verifyAddressResp.enterMmid : "";
      this.DataService.upiPayModelObj.payeeAccount = this.depositAct.accNum;
      this.DataService.upiPayModelObj.payeeIfsc = this.depositAct.ifsc ? this.depositAct.ifsc : '';
      this.DataService.upiPayModelObj.remark = this.selfTransferAmtForm.value.remarks ? this.selfTransferAmtForm.value.remarks : '';
      this.DataService.selectedFlow = this.constant.val_npci_upiPayVpa;
      this.DataService.upiBenfAccNo = this.depositAct.accNum;
      this.DataService.upiBenfIfsc = this.depositAct.ifsc ? this.depositAct.ifsc : '';
      // this.payAmount(accountData);
      //check ifsc for pre-approved
      if (this.transferAct.ifsc.includes("PSIB")) {
        this.DataService.preApprovedFlowIdentifier = "selfTransfer";
        this.DataService.preApprovedPreviousPageUrl = this.router.url;
        this.DataService.preApprovedBankName = this.transferAct.bankName;
        this.DataService.preApprovedAccNo = this.transferAct.maskedAccountNumber;
        this.DataService.preApprovedAmount = this.DataService.upiPayModelObj.txnAmount;
        this.selfTransferPaymentService.formValues = this.selfTransferAmtForm.value;
        this.selfTransferPaymentService.depositAccount = this.depositAct;
        this.selfTransferPaymentService.transferAccount = this.transferAct;
        this.router.navigateByUrl('/transactionPin');
      }
      else {
        this.callNpciLibrary(this.transferAct, this.DataService.selectedFlow);
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
        });
        this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_sendMoney_android, subject).subscribe((NPCIResponse) => {
          console.log('Android StartCLLibrary Success => ', NPCIResponse);
          // this.selfTransferPaymentService.setSelfTransferRequest(this.selfTransferAmtForm.value, this.depositAct, this.transferAct, NPCIResponse);
          if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
            this.slfTrnsAmount(NPCIResponse);
          }
        }, err => {
          console.log('Android StartCLLibrary error => ', err);
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
              this.slfTrnsAmount(NPCIResponse);
            } else {
              console.log("NPCI Flow cancelled...");
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
 * Self transfer amount
 */
  slfTrnsAmount(NPCIResponse) {
    this.formValidation.markFormGroupTouched(this.selfTransferAmtForm);
    if (this.selfTransferAmtForm.valid) {
      var currentDate = moment().format('YYYY-MM-DD');
      var currentTime = moment.duration(moment().format('HH:mm'), "minutes");
      var time = moment.duration(moment(this.DataService.selfTransferRequest.time).format('HH:mm'), "minutes");
      var expiryDate = moment(this.DataService.selfTransferRequest.date).format('YYYY-MM-DD');
      var actualExpDateDiffInMins = moment(expiryDate).diff(currentDate, 'minutes');
      var expiryTime = moment.duration(time, "minutes");
      var actualTimeDiffInMins = expiryTime.subtract(currentTime).minutes();
      var expirationMin = actualExpDateDiffInMins + actualTimeDiffInMins;
      this.DataService.selfTransferRequest.expiryTime = expirationMin.toString();
      // let selectedVpa = this.getSelectedVpaAccountDetails();

      console.log('this.transferAct => ', this.transferAct);

      // if (this.transferAct.ifsc.includes("PSIB")) {
      //   //Pre-Approved Flow
      //   this.DataService.preApprovedFlowIdentifier = "selfTransfer";
      //   this.router.navigateByUrl('/transactionPin');

      // } else {
      //Call NPCI Library
      // this.pluginService.getTransactionId().subscribe((transactionID) => {
      var reqParams = this.selfTransferPaymentService.setSelfTransferRequest(this.selfTransferAmtForm.value, this.depositAct, this.transferAct, NPCIResponse);
      this.UpiApiCall(reqParams);
      // });
      // }
    }
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.upiCallTransactionHistoryApi = true;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.setDetails(response);
            this.DataService.routeWithNgZone('selfTransferSuccess');
            break;

          default:
            break;
        }
      } else {
        this.setDetails(response);
        this.DataService.routeWithNgZone('selfTransferSuccess');
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  setDetails(response) {
    this.DataService.selfTransReceiptObj = response;
    let { remarks, amount } = this.selfTransferAmtForm.value;
    this.DataService.selfTransReceiptObj.remarks = remarks;
    this.DataService.selfTransReceiptObj.amount = amount;
    this.DataService.selfTransReceiptObj.payerName = this.transferAct.custName;
    this.DataService.selfTransReceiptObj.payeeName = this.depositAct.custName;
    this.DataService.selfTransReceiptObj.payeeAccType = this.depositAct.accType;
    this.DataService.selfTransReceiptObj.payeeMaskedAccountNumber = this.depositAct.maskedAccountNumber;
    this.DataService.selfTransReceiptObj.payeePaymentAddress = this.depositAct.paymentAddress ? this.depositAct.paymentAddress : '';
    this.DataService.selfTransReceiptObj.payeeBankName = this.depositAct.bankName;
    this.DataService.selfTransReceiptObj.payeeIfsc = this.depositAct.ifsc;
    this.DataService.selfTransReceiptObj.payeeActNo = this.depositAct.accNum;
    this.DataService.selfTransReceiptObj.payerPaymentAddress = this.transferAct.paymentAddress ? this.transferAct.paymentAddress : '';
    this.DataService.selfTransReceiptObj.payReceiptTransId = this.DataService.payReceiptTransId;
    this.DataService.selfTransReceiptObj.payerAccType = this.transferAct.accType;
    this.DataService.selfTransReceiptObj.payerMaskedAccountNumber = this.transferAct.maskedAccountNumber;
  }

  /**
 * Get Selected Vpa Adress/Account Details
 */
  getSelectedVpaAccountDetails() {
    let defaultVpaAccountArr = this.transferAct.PaymentAddress.find((vpaAddress) => { return vpaAddress.isDefaultVpa == 'Y'; });
    if (defaultVpaAccountArr) {
      return defaultVpaAccountArr;
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

  onTransferClick() {
    this.router.navigateByUrl('/payUpiSuccess');
  }

}
