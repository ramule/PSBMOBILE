import { Component, OnInit, OnDestroy, HostListener, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationStart,
} from '@angular/router';
import { DataService } from '../../../../app/services/data.service';
import { HttpRestApiService } from '../../../../app/services/http-rest-api.service';
import { AppConstants } from '../../../../app/app.constant';
import { LocalStorageService } from '../../../../app/services/local-storage-service.service';
import { OtpSessionService } from './otp-session.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { FormValidationService } from '../../../services/form-validation.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { Location } from '@angular/common';
import { DetailStatementService } from '../my-accounts/detailed-statement/detailed-statement.service';
import { AccountType } from '../../../utilities/app-enum';
import { DashboardService } from '../../omni/dashboard/dashboard.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare var showToastMessage: any;

@Component({
  selector: 'app-otp-session',
  templateUrl: './otp-session.component.html',
  styleUrls: ['./otp-session.component.scss'],
})
export class OTPSessionComponent implements OnInit, OnDestroy {
  otpSessionForm: FormGroup;
  mobNumber: any;
  receiptResp: any;
  tempDecryptedReq: any;
  addPayeeObj: any;
  positivePayObj: any;
  freezeReceiptObj: any;
  donationReceiptObj: any;
  hotlistCardObj:any;
  todayDateTimedisplay:any;
  apyDataObj:any;
  countDown: Subscription;
  reissueCardObj:any;
  invalidOtp: boolean = false;
  emailId:any;
  message:any = ''
  counter = 120;
  tick = 1000;
  type: any = "";
  userName:any;
  newcheckbook:any;
  reqcheckbook:any;
  editeduser:any;
  delinkdata:any;
  physicalCardObj :any;
  platform:any;
  public formErrors = {
    otp: '',
  };


  otpFormInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6'] ;

  @ViewChildren('OTPFormRow') otpPinRows: any;

  //listner for all focusout event
  @HostListener('focusout')
  onBlur() {
    //call form validarion on focus out
    this.formErrors = this.formValidation.validateForm(
      this.otpSessionForm,
      this.formErrors,
      true
    );
  }

  constructor(
    private router: Router,
    private formValidation: FormValidationService,
    private form: FormBuilder,
    public dataService: DataService,
    private http: HttpRestApiService,
    public constant: AppConstants,
    private storage: LocalStorageService,
    private otpSessionService: OtpSessionService,
    public commonMethod: CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private datepipe: DatePipe,
    private location: Location,
    private detailStatementService : DetailStatementService,
    private dashboardService: DashboardService,
    private idle: Idle,
    private translatePipe: TranslatePipe,
  ) {
    // if(this.dataService.endPoint == this.constant.serviceName_TRANSFERTRANSACTION){
    //   this.dataService.otpName = 'TPIN';
    // }
    // else{
      this.dataService.otpName = 'OTP';
    // }
  }

  ngOnInit() {
    console.log("=========");
    this.platform = this.constant.getPlatform();
    this.dataService.setPageSettings('AUTHORIZATION');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
    this.initialization();
    // this.dataService.postivePayData
    this.delinkdata=this.dataService.dellinkAccountnumber

    history.pushState(
      {},
      this.dataService.otpSessionPreviousPage,
      this.location.prepareExternalUrl(this.dataService.otpSessionPreviousPage)
    );
    history.pushState(
      {},
      'self',
      this.location.prepareExternalUrl(this.router.url)
    );


  }

  /**
   * For intialization this function is called
   */
  initialization() {

    // this.mobNumber = this.commonMethod.maskNumber(this.storage.getLocalStorage("mobileNo"));

    this.mobNumber = this.storage.getLocalStorage(this.constant.storage_mobileNo);
    // this.mobNumber = this.commonMethod.maskMobileNumber(
    //   this.storage.getLocalStorage('mobileNo')
    // );
    if(this.dataService.profileEmailEdit != '') this.emailId = this.dataService.profileEmailEdit;
    //this.todayDateTimedisplay = this.datepipe.transform(new Date(), 'dd MMM yyyy, hh:mm a');
    this.todayDateTimedisplay = this.datepipe.transform(new Date(), 'dd MMM yyyy');


    this.editeduser=this.dataService.editusername

    this.userName = this.storage.getLocalStorage(this.constant.storage_username);
    this.receiptResp = this.dataService.transactionReceiptObj;
    console.log('receiptResp',this.receiptResp);





    this.addPayeeObj = this.dataService.addPayeeObj; //done
    this.positivePayObj = this.dataService.positivePayReceiptObj; //done
    this.freezeReceiptObj = this.dataService.freezeReceiptObj; //done
    this.donationReceiptObj = this.dataService.donationReceiptObj; // done
    this.physicalCardObj = this.dataService.physicalCardObj; // done
    this.reissueCardObj = this.dataService.reissuedCardObj  // done
    this.hotlistCardObj = this.dataService.hotlistCardObj; // done
    this.apyDataObj = this.dataService.apyObj; // done
    this.newcheckbook=this.dataService.transactionReceiptObj
    this.reqcheckbook=this.dataService.reqcheqbookObj




    this.buildForm();
    this.getServiceTypeVal();
    if(this.dataService.otpName == 'OTP')
    {
      if(this.dataService.endPoint != this.constant.serviceName_UIDAIKYCDETAILS){
        this.resendOTP(1);
      }
    }

    // this.omniChannelCall();
  }

  /**
   * OTP form build
   */
  buildForm() {
    if (this.dataService.otplength == 4) {
      this.otpSessionForm = new FormGroup({
        otp1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      });
    } else {
      this.otpSessionForm = new FormGroup({
        otp1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp5: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp6: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      });
    }
  }

  /**
   * Validate Form
   */
  validateForm() {
    if (this.otpSessionForm.invalid) {
      this.otpSessionForm.get('otp1').markAsTouched();
      this.otpSessionForm.get('otp2').markAsTouched();
      this.otpSessionForm.get('otp3').markAsTouched();
      this.otpSessionForm.get('otp4').markAsTouched();
      if (this.dataService.otplength == 6) {
        this.otpSessionForm.get('otp5').markAsTouched();
        this.otpSessionForm.get('otp6').markAsTouched();
      }
      this.formErrors = this.formValidation.validateForm(
        this.otpSessionForm,
        this.formErrors,
        true
      );
      return;
    }
  }

  /**
   * On Otp confirmation this fucntion called
   */
  confirmOtpClick() {
    var otpValue;
    this.validateForm();
    console.log(this.otpSessionForm.value);
    if (this.otpSessionForm.valid) {
      if (this.dataService.otplength == 4) {
        otpValue =
          this.otpSessionForm.value.otp1 +
          this.otpSessionForm.value.otp2 +
          this.otpSessionForm.value.otp3 +
          this.otpSessionForm.value.otp4;
      } else {
        otpValue =
          this.otpSessionForm.value.otp1 +
          this.otpSessionForm.value.otp2 +
          this.otpSessionForm.value.otp3 +
          this.otpSessionForm.value.otp4 +
          this.otpSessionForm.value.otp5 +
          this.otpSessionForm.value.otp6;
      }
      var param = this.otpSessionService.getSendOTPSessionReq(otpValue);
      this.submitOtpSession(param);
    }
  }

  /**
   *
   * If otp is valid this function is called
   */
  submitReq() {
    this.http
      .callBankingAPIService(
        this.dataService.request,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.dataService.endPoint
      )
      .subscribe((resp) => {
        console.log(
          'this.dataService.screenType' + this.dataService.screenType
        );
          this.otpSessionForm.reset();
        switch (resp.responseParameter.opstatus) {
          // case this.constant.val_InvalidOTP:
          //   break;
          case this.constant.val_InvalidCredentials:
            break;
          case "03":
            this.dataService.isOTPMaxAttempts = true;
            break;
          case "11":
            //invaild otp
            this.invalidOtp = true;
            break;
          case "12":
            //otp attempt expired
            this.dataService.isOTPMaxAttempts = true;
            this.commonMethod.openPopup('div.popup-bottom.otp-attempt-expired');
            break;
          default:
            if (this.dataService.screenType == 'addPayee') {
              this.addPayee(resp);
            } else if (this.dataService.screenType == 'deletePayee') {
              this.deletePayee(resp);
            }else if (this.dataService.screenType == 'fundTransfer') {
              this.fundTransfer(resp);// dashboard
            } else if (this.dataService.screenType == 'instaPay') {
              this.fundTransfer(resp);// dashboard
            } else if (this.dataService.screenType == 'schedule') {
              this.scheduleTransfer(resp);// dashboard
            }else if (this.dataService.screenType == 'stopCheque') {
              this.stopCheque(resp);
            } else if (this.dataService.screenType == 'chequeBookRequest') {
              this.chequeBookRequest(resp);
            } else if (this.dataService.screenType == 'addBiller') {
              this.addBiller(resp);
            } else if (this.dataService.screenType == 'positivePay') {
              this.positivePay(resp);// dashboard
            } else if (this.dataService.screenType == 'freezeAccount') {
              this.freezeAccount(resp);// dashboard
            } else if (this.dataService.screenType == 'linkAccount') {
              this.linkAccount(resp);// dashboard
            } else if (this.dataService.screenType == 'delinkAccount') {
              this.delinkAccount(resp);// dashboard
            }  else if (this.dataService.screenType == 'myAccountsInfo') {
              this.delinkAccount(resp);// dashboard
            } else if (this.dataService.screenType == 'profileDetails') {
              this.profileEdit(resp);
            } else if (this.dataService.screenType == 'donationTransfer') {
              this.donationTransfer(resp);
            }else if (this.dataService.screenType == 'bbpsTransfer') {
              this.bbpsTransfer(resp);
            }
             else if (this.dataService.screenType == 'profileUpdate') {
              this.profileUpdate(resp);
            } else if(this.dataService.screenType == 'CardDetails'){
              this.CardDetails(resp);
            } else if(this.dataService.screenType == 'getPhysicalCard'){
              this.getPhysicalCard(resp);
            } else if(this.dataService.screenType == 'reissuecard'){
              this.getRessiueCard(resp);
            }else if(this.dataService.screenType == 'blockCard'){
              this.getBlockCard(resp);
            }else if(this.dataService.screenType == "debitCard"){
              this.getDebitCard(resp);
            }else if(this.dataService.screenType == "generatePin"){
              this.generatePin(resp);
            }else if(this.dataService.screenType == "payemi"){
              this.payEmi(resp);



            }else if(this.dataService.screenType == "apyOtpAuth"){
              this.getApyOtpAuth(resp);
            }else {
              this.errorCallBack(resp.subActionId, resp.responseParameter);
            }
        }
      });
  }


  generatePin(resp){
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }

    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    this.dataService.receiptmsg = resp.responseParameter.Result;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(
      new Date().toISOString(),
      this.dataService.dateFormat
    );
    this.router.navigate(['/receipt']);
  }


  payEmi(resp){
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }

    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    this.dataService.receiptmsg = resp.responseParameter.Result;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(
      new Date().toISOString(),
      this.dataService.dateFormat
    );
    this.router.navigate(['/receipt']);
  }

  getApyOtpAuth(resp){
    console.log(resp);
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }

     this.dataService.transactionReceiptObj.RRN = resp.RRN;
     this.dataService.receiptmsg = resp.responseParameter.Result;
     this.dataService.receipdRefID = resp.RRN;
     //this.dataService.screenType = 'apyOtpAuth';
     this.dataService.transactionReceiptObj.pranNo = resp.set.records[0].pranNo;
    // this.dataService.donationReceiptObj.date = this.datepipe.transform(
    //   new Date().toISOString(),
    //   this.dataService.dateFormat
    // );
    this.router.navigate(['/receipt']);
  }

  getServiceTypeVal() {
    if (this.dataService.screenType == 'addPayee') {
      this.type = this.constant.val_ADDPAYEE;
    } else if (this.dataService.screenType == 'deletePayee') {
      this.type = this.constant.val_DELETEPAYEE;
    }else if (this.dataService.screenType == 'fundTransfer') {
      this.type = this.constant.val_FUNDTRANSFER;
    } else if (this.dataService.screenType == 'instaPay') {
      this.type = this.constant.val_FUNDTRANSFER;
    }else if (this.dataService.screenType == 'schedule') {
      this.type = this.constant.val_SCHEDULARTRANSMASTER;
    } else if (this.dataService.screenType == 'stopCheque') {
      this.type = this.constant.val_STOPCHEQUE;
    } else if (this.dataService.screenType == 'chequeBookRequest') {
      this.type = this.constant.val_CHEQUEBOOKREQUEST;
    } else if (this.dataService.screenType == 'DTHBillPay') {
      this.type = this.constant.val_DTHBILLPAY;
    } else if(this.dataService.screenType == 'waterBillPay') {
      this.constant.val_WATERBILLPAY;
    } else if(this.dataService.screenType == 'gasBillPay') {
      this.constant.val_GASBILLPAY;
    } else if (this.dataService.screenType == 'mobileRecharge') {
      this.type = this.constant.val_MOBILERECHARGE;
    } else if (this.dataService.screenType == 'electricityBillPay') {
      this.type = this.constant.val_ELECTRICITYBILLPAY;
    } else if (this.dataService.screenType == 'landlineBillPay') {
      this.type = this.constant.val_LANDLINEBILLPAY;
    } else if (this.dataService.screenType == 'taxBillPay') {
      this.type = this.constant.val_TAXBILLPAY;
    } else if (this.dataService.screenType == 'donationBillPay') {
      this.type = this.constant.val_DONATIONBILLPAY;
    } else if (this.dataService.screenType == 'addBiller') {
      this.type = this.constant.val_ADDBILLER;
    } else if (this.dataService.screenType == 'positivePay') {
      this.type = this.constant.val_POSITIVEPAY;
    } else if (this.dataService.screenType == 'freezeAccount') {
      this.type = this.constant.val_FREEZEACCOUNT;
    } else if (this.dataService.screenType == 'linkAccount') {
      this.type = this.constant.val_LINK;
    } else if (this.dataService.screenType == 'delinkAccount') {
      this.type = this.constant.val_DELINK;
    } else if (this.dataService.screenType == 'myAccountsInfo') {
      this.type = this.constant.val_DELINK;
    }else if (this.dataService.screenType == 'profileDetails') {
      this.type = this.constant.val_PROFILEDETAILS;
    } else if (this.dataService.screenType == 'donationTransfer') {
      this.type = this.constant.val_DONATIONTRANSFER;
    } else if (this.dataService.screenType == 'bbpsTransfer') {
      this.type = this.constant.val_BILLPAYMENT;
    }

    else if (this.dataService.screenType == 'profileUpdate') {
      this.type = this.constant.val_PROFILEUPDATE;
    } else if(this.dataService.screenType == 'CardDetails'){
      this.type = this.constant.val_CARDDETAILS;
    }
    else if(this.dataService.screenType == 'apyOtpAuth'){
      this.type = 'APY Enrollment'
  }
  }

  getDebitCard(resp){
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
      if(this.dataService.transactionReceiptObj.cardOnOffType != "" ) this.dataService.receiptmsg = this.dataService.transactionReceiptObj.cardOnOffType == "domestic" ? (this.dataService.transactionReceiptObj.cardOperationType == 'active' ? this.translatePipe.transform('DOMESTIC_TRANSACTION_ENABLED_SUCCESSFULLY') : this.translatePipe.transform('DOMESTIC_TRANSACTION_DISABLED_SUCCESSFULLY')) : (this.dataService.transactionReceiptObj.cardOperationType == 'active' ? this.translatePipe.transform('INTERNATIONAL_TRANSACTION_ENABLED_SUCCESSFULLY') : this.translatePipe.transform('INTERNATIONAL_TRANSACTION_DISABLED_SUCCESSFULLY'));
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
      if(this.dataService.transactionReceiptObj.cardOnOffType != "" ) this.dataService.receiptmsg = resp.responseParameter.Result;
    }

    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    if(this.dataService.transactionReceiptObj.cardOnOffType == "" ) this.dataService.receiptmsg = resp.responseParameter.Result;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(
      new Date().toISOString(),
      this.dataService.dateFormat
    );
    this.router.navigate(['/receipt']);
  }

  getBlockCard(resp){
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }

    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    this.dataService.receiptmsg = resp.responseParameter.Result;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(
      new Date().toISOString(),
      this.dataService.dateFormat
    );
    this.router.navigate(['/receipt']);
  }

  getRessiueCard(resp){
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
      var cbsCode = this.dataService.cardDetailsNOffer.filter(obj => obj.cbsVarient == this.dataService.selectedDataCard.CardProgram)[0].cbsCode;
      this.dataService.debitCardIssuedData = this.dataService.selectedDataCard.AccountNo +"|"+ JSON.parse(resp.responseParameter.responseMsg)[0].CardNumber +"|"+ cbsCode +"|"+this.dataService.physicalCard+"|"; //account number|card number|card type|
      this.dataService.transactionReceiptObj.newCardNo = JSON.parse(resp.responseParameter.responseMsg)[0].CardNumber;
      this.debitCardsReIssueCbs();
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
      this.dataService.transactionReceiptObj.newCardNo = "-";
    }


    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    this.dataService.receiptmsg = resp.responseParameter.Result;
    this.dataService.receipdRefID = resp.RRN;
    // this.dataService.transactionReceiptObj.cardMode = this.dataService.physicalCard == "VP" ? "Physical" : "Virtual";
    this.dataService.transactionReceiptObj.date = this.datepipe.transform( new Date().toISOString(),this.dataService.dateFormat);
    this.router.navigate(['/receipt']);
  }


  debitCardsIssue(){
    var param = this.otpSessionService.getDebitCardIssue();
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_DEBITCARDISSUE)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  debitCardsReIssueCbs(){
    var param = this.otpSessionService.getDebitCardsReIssueCbs();
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_DEBITCARDREISSUE)
      .subscribe((resp) => {
        console.log(resp);
      });
  }


  debitCardModifyCbs(){
    var param = this.otpSessionService.getDebitCardModifyCbs();
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_DEBITCARDMODIFY)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  getPhysicalCard(resp){
    if (resp.responseParameter.opstatus == '00') {
      this.debitCardModifyCbs();
      this.dataService.receiptType = this.constant.val_Successful;
      this.dataService.receiptmsg = this.translatePipe.transform('PHYSICAL_CARD_APPLIED_VISIT_BANK_IN_SEVEN_DAYS');
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
      this.dataService.receiptmsg = resp.responseParameter.Result;
    }

    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(
      new Date().toISOString(),
      this.dataService.dateFormat
    );
    this.router.navigate(['/receipt']);
  }

  CardDetails(resp){
    if(resp.responseParameter.opstatus == '00'){
      var cardType = this.dataService.transactionReceiptObj.isPhysicalApplied == 'P' ? 'VP' : 'V';
      if(this.dataService.isCardUpgrade){
        var cbsCode = this.dataService.transactionReceiptObj.cbsCode;
        this.dataService.debitCardIssuedData = this.dataService.transactionReceiptObj.accountNumber +"|"+ JSON.parse(resp.responseParameter.responseMsg)[0].CardNumber +"|"+ cbsCode +"|"+cardType+"|";
        this.debitCardsReIssueCbs();
      }
      else{
        this.dataService.debitCardIssuedData = this.dataService.debitCardIssuedData + JSON.parse(resp.responseParameter.CardDetails)[0].CardNumber +"|" + cardType +"|" ;
        console.log("=====>"+this.dataService.debitCardIssuedData);
        this.debitCardsIssue();
      }

      //Account number|card type|EcommFlag|DisplayName|CardNum|Personilzedcard(P/V)|

      this.dataService.receiptType = this.constant.val_Successful;
      if(this.dataService.transactionReceiptObj.isPhysicalApplied == 'P'){
        this.dataService.receiptmsg = "Virtual Debit Card generated successfully. To collect Physical Debit Card, kindly visit your branch in next 7-8 days";
      }
      else{
        this.dataService.receiptmsg = "Virtual Debit Card generated successfully";
      }
      // this.router.navigateByUrl('/debitCards');
      // showToastMessage("Your virtual card is generated Successfully.Please visit home branch to collect your debit card after 7-8 days" ,'success');

    }
    else{
      this.dataService.receiptType = this.constant.val_Failure;
      this.dataService.receiptmsg = resp.responseParameter.Result;
    }

    this.router.navigate(['/receipt']);
  }

  donationTransfer(resp) {
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }

    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    this.dataService.receiptmsg = resp.responseParameter.Result;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.receiptTransactionDate = resp.responseParameter?.TransactionDate;
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(
      new Date().toISOString(),
      this.dataService.dateFormat
    );
    this.router.navigate(['/receipt']);
  }
  bbpsTransfer(resp) {
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }

    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    this.dataService.receiptmsg = resp.responseParameter.Result;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.receiptTransactionDate = resp.responseParameter?.TransactionDate;
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(
      new Date().toISOString(),
      this.dataService.dateFormat
    );
    this.router.navigate(['/receipt']);
  }

  profileEdit(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(this.tempDecryptedReq);
      //this.dataService.receiptType = this.constant.val_Successful;
      // showToastMessage(resp.responseParameter.Result, 'success');
      this.dataService.userDetails.customerName = this.tempDecryptedReq.customerName;
      if(this.dataService.isUsernameChanged) {
        this.openPopup('success1');
        // this.router.navigateByUrl('/login');
      }
      else {
        this.router.navigateByUrl('/profileDetails');
      }
    } else {
      //this.dataService.receiptType = this.constant.val_Failure;
      showToastMessage(resp.responseParameter.Result);
      this.router.navigateByUrl('/profileDetails');
    }
  }

  openPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  profileUpdate(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(this.tempDecryptedReq);
      //this.dataService.receiptType = this.constant.val_Successful;
      showToastMessage(resp.responseParameter.Result, 'success');
      //this.dataService.profileImage = this.tempDecryptedReq.customerName
      this.router.navigateByUrl('/profileDetails');
    } else {
      //this.dataService.receiptType = this.constant.val_Failure;
      //showToastMessage(resp.responseParameter.Result);
      this.router.navigateByUrl('/profileDetails');
    }
  }

  linkAccount(resp) {
    this.getAccountList();
    if (resp.responseParameter.opstatus == '00') {
      this.message = resp.responseParameter.Result;
      this.commonMethod.openPopup('div.popup-bottom.show-link-account-success');
    }

    // showToastMessage(resp.responseParameter.Result, 'success');

    // if (resp.responseParameter.opstatus == '00') {
    //   console.log(resp);
    //   this.dataService.receiptType = this.constant.val_Successful;
    // } else {
    //   this.dataService.receiptType = this.constant.val_Failure;
    // }

    // this.dataService.freezeReceiptObj.RRN = resp.RRN;
    // this.dataService.receiptmsg = resp.responseParameter.Result;
    // this.dataService.receipdRefID = resp.RRN;
    // this.dataService.freezeReceiptObj.date = this.datepipe.transform(
    //   new Date().toISOString(),
    //   this.dataService.dateFormat
    // );
    // this.router.navigate(['/receipt']);
  }

  delinkAccount(resp) {

    // this.router.navigateByUrl('/delinkAccount');

    if (resp.responseParameter.opstatus == '00') {
      this.getAccountList();
      this.message = resp.responseParameter.Result;
      this.commonMethod.openPopup('div.popup-bottom.show-link-account-success');
    }

    // this.dataService.donationReceiptObj.RRN = resp.RRN;
    // this.dataService.receiptmsg = resp.responseParameter.Result;
    // this.dataService.receipdRefID = resp.RRN;
    // this.dataService.donationReceiptObj.date = this.datepipe.transform(
    //   new Date().toISOString(),
    //   this.dataService.dateFormat
    // );
    // this.router.navigate(['/receipt']);
  }

  freezeAccount(resp) {
    this.getAccountList();
    if (resp.responseParameter.opstatus == '00') {
      this.message = "Account Freezed Successfully";
      this.commonMethod.openPopup('div.popup-bottom.show-freeze-account');
    }

    // if (resp.responseParameter.opstatus == '00') {
    //   console.log(resp);
    //   this.dataService.receiptType = this.constant.val_Successful;
    // } else {
    //   this.dataService.receiptType = this.constant.val_Failure;
    // }

    // // this.dataService.leaveFeedbackObj.transactionId = resp.responseParameter.Result;
    // this.dataService.freezeReceiptObj.RRN = resp.RRN;
    // this.dataService.receiptmsg = resp.responseParameter.Result;
    // this.dataService.receipdRefID = resp.RRN;
    // this.dataService.freezeReceiptObj.date = this.datepipe.transform(
    //   new Date().toISOString(),
    //   this.dataService.dateFormat
    // );
    // this.router.navigate(['/receipt']);
  }

  scheduleTransfer(resp){

    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }
    this.dataService.transactionReceiptObj.redirectUrl = '/sendMoney';
    this.dataService.receiptmsg = resp.responseParameter.Result //resp.set.records[0].responseCode != '000' ? resp.set.records[0].CBS_RES_FAIL_MSG : 'Transaction Successful';
    this.dataService.receipdRefID = resp.responseParameter.TransactionId;
    if(resp.hasOwnProperty('set')){
      this.dataService.receiptTransactionDate = resp.responseParameter?.TransactionDate;
    }
    // this.dataService.transactionReceiptObj.date = this.datepipe.transform(
    //   new Date().toISOString(),
    //   this.dataService.dateFormat
    // );
    this.getAccountList();
    // this.setOmniChannelFinalReq(this.dataService.transactionReceiptObj.receiptType);
    this.router.navigate(['/receipt']);

  }

  fundTransfer(resp) {
    console.log(resp);
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }
    this.dataService.transactionReceiptObj.redirectUrl = '/sendMoney';
    this.dataService.receiptmsg = resp.responseParameter.Result //resp.set.records[0].responseCode != '000' ? resp.set.records[0].CBS_RES_FAIL_MSG : 'Transaction Successful';
    if(resp.hasOwnProperty('set')){
      this.dataService.receipdRefID = resp.set.records[0].referenceNumber;
      this.dataService.receiptTransactionDate = resp.responseParameter?.TransactionDate;
    }
    // this.dataService.transactionReceiptObj.date = this.datepipe.transform(
    //   new Date().toISOString(),
    //   this.dataService.dateFormat
    // );
    this.getAccountList();
    // this.setOmniChannelFinalReq(this.dataService.transactionReceiptObj.receiptType);
    this.router.navigate(['/receipt']);
  }

  instaTransfer(resp) {
    console.log(resp);
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }
    this.dataService.transactionReceiptObj.redirectUrl = '/sendMoney';
    this.dataService.receiptmsg = resp.responseParameter.Result //resp.set.records[0].responseCode != '000' ? resp.set.records[0].CBS_RES_FAIL_MSG : 'Transaction Successful';
    if(resp.hasOwnProperty('set')){
      this.dataService.receipdRefID = resp.set.records[0].referenceNumber;
      this.dataService.receiptTransactionDate = resp.responseParameter?.TransactionDate;
    }
    // this.dataService.transactionReceiptObj.date = this.datepipe.transform(
    //   new Date().toISOString(),
    //   this.dataService.dateFormat
    // );
    this.getAccountList();
    // this.setOmniChannelFinalReq(this.dataService.transactionReceiptObj.receiptType);
    this.router.navigate(['/receipt']);
  }

  addPayee(resp) {

    this.message = resp.responseParameter.Result;
    // this.commonMethod.openPopup('div.popup-bottom.show-link-account-success');
    // showToastMessage(resp.responseParameter.Result, 'success');

    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }

    // this.dataService.transactionReceiptObj.msg = resp.responseParameter.Result;
    this.dataService.receiptmsg = resp.responseParameter.Result;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.transactionReceiptObj.RRN = resp.RRN;
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(new Date().toISOString(), this.dataService.dateFormat);
    // this.setOmniChannelFinalReq(this.dataService.transactionReceiptObj.receiptType);
    this.router.navigate(['/receipt']);
  }

  deletePayee(resp){

    this.message = resp.responseParameter.Result;
    this.commonMethod.openPopup('div.popup-bottom.show-link-account-failure');

  }

  positivePay(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.dataService.transactionReceiptObj.response = this.constant.val_Successful;
      this.dataService.receiptType = this.constant.val_Successful;
      this.dataService.receiptmsg = 'Your request has been submitted successfully';
    } else {
      this.dataService.transactionReceiptObj.response = this.constant.val_Failure;
      this.dataService.receiptType = this.constant.val_Failure;
      this.dataService.receiptmsg = 'Your submitted request has failed';
    }

    console.log('respresp' + resp);
    this.dataService.transactionReceiptObj.msg = resp.responseParameter.Result;
    this.dataService.transactionReceiptObj.rrn = resp.RRN;
    this.dataService.receipdRefID = resp.RRN;
    this.dataService.receiptTransactionDate = resp.responseParameter?.TransactionDate;
    this.getAccountList();
    //this.router.navigate(['/positivePaySuccess']);
    this.router.navigate(['/receipt']);
  }

  stopCheque(resp) {
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.transactionReceiptObj.receiptType = 'success';
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
      this.dataService.receiptType = this.constant.val_Failure;
    }

    console.log(resp);
    this.dataService.receiptmsg = resp.responseParameter?.Result;
    this.dataService.transactionReceiptObj.msg = resp.responseParameter?.Result;
    this.dataService.transactionReceiptObj.RRN = resp.responseParameter?.RRN;
    this.dataService.receipdRefID = resp.RRN;
    this.router.navigate(['/receipt']);
  }

  chequeBookRequest(resp) {
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.transactionReceiptObj.receiptType = 'success';
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
      this.dataService.receiptType = this.constant.val_Failure;
    }

    console.log(resp);
    this.dataService.receiptmsg = resp.set.records[0].chequeReqId;
    this.dataService.transactionReceiptObj.msg = resp.set.records[0].chequeReqId;
    this.dataService.transactionReceiptObj.RRN = resp.responseParameter?.RRN;
    this.dataService.receipdRefID = resp.RRN;
    // this.setOmniChannelFinalReq(
    //   this.dataService.transactionReceiptObj.receiptType
    // );
    this.router.navigate(['/receipt']);
  }

  /**
   * This function is called for DTH pill pay when form is submitted
   * @param resp
   */
  DTHBillPay(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.dataService.transactionReceiptObj.receiptType = 'success';
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
    }

    this.dataService.transactionReceiptObj.msg = resp.responseParameter.DESC;
    this.dataService.transactionReceiptObj.RRN = new Date()
      .getTime()
      .toString(); //TODO : currently setting to timestamp later will change to RRN/TransactionId if getting from db.
    this.dataService.billPayObj.date = new Date().toISOString();
    this.setOmniChannelFinalReq(
      this.dataService.transactionReceiptObj.receiptType
    );
    this.router.navigate(['/receipt']);
  }

  /**
   * * This function is called for Water pill pay when form is submitted
   * @param resp
   */
  WaterBillPay(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.dataService.transactionReceiptObj.receiptType = 'success';
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
    }

    this.dataService.transactionReceiptObj.msg = resp.responseParameter.Result;
    this.dataService.transactionReceiptObj.RRN = new Date()
      .getTime()
      .toString(); //TODO : currently setting to timestamp later will change to RRN/TransactionId if getting from db.
    this.dataService.billPayObj.date = new Date().toISOString();
    this.setOmniChannelFinalReq(
      this.dataService.transactionReceiptObj.receiptType
    );
    this.router.navigate(['/receipt']);
  }

  /**
   * * This function is called for Water pill pay when form is submitted
   * @param resp
   */
  ElectricityBillPay(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.dataService.transactionReceiptObj.receiptType = 'success';
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
    }

    this.dataService.transactionReceiptObj.msg = resp.responseParameter.Result;
    this.dataService.transactionReceiptObj.RRN = new Date()
      .getTime()
      .toString(); //TODO : currently setting to timestamp later will change to RRN/TransactionId if getting from db.
    this.dataService.billPayObj.date = new Date().toISOString();
    //TODO: Uncomment below type when electricity api is implemented
    // this.setOmniChannelFinalReq(this.dataService.transactionReceiptObj.receiptType);
    this.router.navigate(['/receipt']);
  }

  /**
   * function to be called when form for recharge is submitted
   * @param
   */
  mobileBillPayment(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.dataService.transactionReceiptObj.receiptType = 'success';
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
    }

    this.dataService.transactionReceiptObj.msg = resp.responseParameter.Result;
    this.dataService.transactionReceiptObj.RRN = new Date()
      .getTime()
      .toString(); //TODO : currently setting to timestamp later will change to RRN/TransactionId if getting from db.
    this.dataService.billPayObj.date = new Date().toISOString();
    this.setOmniChannelFinalReq(
      this.dataService.transactionReceiptObj.receiptType
    );
    this.router.navigate(['/receipt']);
  }

  /**
   * * This function is called for Water pill pay when form is submitted
   * @param resp
   */
  addBiller(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.dataService.transactionReceiptObj.receiptType = 'success';
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
    }

    this.dataService.transactionReceiptObj.msg = resp.responseParameter.Result;
    this.dataService.transactionReceiptObj.RRN = new Date()
      .getTime()
      .toString(); //TODO : currently setting to timestamp later will change to RRN/TransactionId if getting from db.
    this.dataService.billPayObj.date = new Date().toISOString();
    //TODO: Uncomment below type when electricity api is implemented
    // this.setOmniChannelFinalReq(this.dataService.transactionReceiptObj.receiptType);
    this.router.navigate(['/receipt']);
  }

  /**
   * on bread crum call
   */
  prevOtpSessionPage() {
    this.router.navigateByUrl(this.dataService.otpSessionPreviousPage);
  }

  /**
   * on cancel click this function is invoked
   */
  cancel() {
    this.dataService.profileEmailEdit = "";
    this.dataService.isUsernameChanged = false;
    this.router.navigateByUrl(this.dataService.previousPageUrl);
  }

  /**
   * call function for resend function
   */
  resendOTP(numCount?: any) {
    var otpUrl = "";
    this.invalidOtp = false;
    this.otpSessionForm.reset();
    var resendOTPReq = this.otpSessionService.getResendOTPSessionReq(this.type);

    // DEBITCARDPINCHANGE   ====== serviceName_DEBITCARDPINCHANGE (done)
    // HOTLISTBLOCKCARD   ==== serviceName_BLOCKCARD
    // TEMPORARYBLOCKCARD ==== serviceName_BLOCKCARD
    // UPGRADEREISSUEDEBITCARD  ===== serviceName_REISSUEDEBITCARD ====== serviceName_BLOCKCARDANDREISSUE
    // REISSUEDEBITCARD   ======= serviceName_REISSUEDEBITCARD  =======  serviceName_BLOCKCARDANDREISSUE
    // ISSUEDEBITCARD  ===== serviceName_ISSUEDEBITCARD
    // SETDEBITCARDLIMIT =====  serviceName_DOMINTLIMIT
    // CARDSERVICEONOFF ====  serviceName_CARDSERVICEONOFF

    if( this.dataService.endPoint == this.constant.serviceName_DOMINTLIMIT ||
      this.dataService.endPoint == this.constant.serviceName_CARDSERVICEONOFF ||
      this.dataService.endPoint == this.constant.serviceName_BLOCKCARD ||
      this.dataService.endPoint == this.constant.serviceName_DEBITCARDPINCHANGE ||
      this.dataService.endPoint == this.constant.serviceName_CHANGECARDSTATE ||
      this.dataService.endPoint == this.constant.serviceName_REISSUEDEBITCARD ||
      this.dataService.endPoint == this.constant.serviceName_BLOCKCARDANDREISSUE ||
      this.dataService.endPoint == this.constant.serviceName_ISSUEDEBITCARD ){
        otpUrl = this.constant.serviceName_RESENDOTPSESSIONFORCARD;
        this.type = this.dataService.cardServiceType;
        resendOTPReq = this.otpSessionService.getResendOTPSessionReqForCard(this.type);
      }
    else{
      otpUrl = this.constant.serviceName_RESENDOTPSESSION;
      resendOTPReq = this.otpSessionService.getResendOTPSessionReq(this.type);
    }


    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        otpUrl
      )
      .subscribe((data) => {
        if (data.responseParameter.opstatus == '00') {
          this.startCounter();
          if (numCount == 2)
            showToastMessage(data.responseParameter.Result, 'success');
        }
      });
  }

  /**
   * function called on otp submit
   */
  submitOtpSession(param) {
    this.dataService.profileEmailEdit = "";
    console.log('this.dataService.request' + this.dataService.request);

    var encryptionKey = this.dataService.endPoint == this.constant.serviceName_UIDAIKYCDETAILS ? this.constant.staticKey : this.storage.getSessionStorage(this.constant.val_sessionKey);
    this.tempDecryptedReq = JSON.parse(
      this.encryptDecryptService.decryptText(
        encryptionKey,
        this.dataService.request,

      )


    );

    console.log(this.tempDecryptedReq);

    if(this.dataService.screenType == 'profileDetails' && this.dataService.endPoint == this.constant.serviceName_UIDAIKYCDETAILS){
      //for aadhar otp validation
      this.tempDecryptedReq.OTP =
        this.otpSessionForm.value.otp1 +
        this.otpSessionForm.value.otp2 +
        this.otpSessionForm.value.otp3 +
        this.otpSessionForm.value.otp4 +
        this.otpSessionForm.value.otp5 +
        this.otpSessionForm.value.otp6;
    }else if (
      this.dataService.screenType == 'fundTransfer' ||
      this.dataService.screenType == 'instaPay' ||
      this.dataService.screenType == 'addPayee' ||
      this.dataService.screenType == 'deletePayee' ||
      this.dataService.screenType == 'freezeAccount' ||
      this.dataService.screenType == 'positivePay' ||
      this.dataService.screenType == 'profileDetails' ||
      this.dataService.screenType == 'donationTransfer' ||
      this.dataService.screenType == 'profileUpdate' ||
      this.dataService.screenType == 'stopCheque' ||
      this.dataService.screenType == 'linkAccount' ||
      this.dataService.screenType == 'delinkAccount' ||
      this.dataService.screenType == 'myAccountsInfo' ||
      this.dataService.screenType == 'schedule' ||
      this.dataService.screenType == 'apyOtpAuth' ||
      this.dataService.screenType ==  'blockCard' ||
      this.dataService.screenType == 'chequeBookRequest' ||
      this.dataService.screenType == 'CardDetails' ||
      this.dataService.screenType ==  'getPhysicalCard' ||
      this.dataService.screenType == 'reissuecard' ||
      this.dataService.screenType == 'debitCard' ||
      this.dataService.screenType == 'bbpsTransfer' ||
      this.dataService.screenType == 'generatePin'

    ) {
      this.tempDecryptedReq.methodName = this.dataService.endPoint.split('/')[1];
      if(this.dataService.otpName == 'OTP')
      this.tempDecryptedReq.value =this.otpSessionForm.value.otp1 +this.otpSessionForm.value.otp2 +this.otpSessionForm.value.otp3 +this.otpSessionForm.value.otp4 +this.otpSessionForm.value.otp5 +this.otpSessionForm.value.otp6;


      else
      this.tempDecryptedReq.value = this.encryptDecryptService.createMD5Value(this.otpSessionForm.value.otp1 +this.otpSessionForm.value.otp2 +this.otpSessionForm.value.otp3 +this.otpSessionForm.value.otp4 +this.otpSessionForm.value.otp5 +this.otpSessionForm.value.otp6)
      this.tempDecryptedReq.customerID =this.dataService.userDetails.customerId;
    }
    // else if( this.dataService.screenType == 'bbpsTransfer'){

    //   this.tempDecryptedReq.methodName = this.dataService.billerdata.billCategory + "Bill Payment"
    //   if(this.dataService.otpName == 'OTP')
    //   this.tempDecryptedReq.value =this.otpSessionForm.value.otp1 +this.otpSessionForm.value.otp2 +this.otpSessionForm.value.otp3 +this.otpSessionForm.value.otp4 +this.otpSessionForm.value.otp5 +this.otpSessionForm.value.otp6;


    //   else
    //   this.tempDecryptedReq.value = this.encryptDecryptService.createMD5Value(this.otpSessionForm.value.otp1 +this.otpSessionForm.value.otp2 +this.otpSessionForm.value.otp3 +this.otpSessionForm.value.otp4 +this.otpSessionForm.value.otp5 +this.otpSessionForm.value.otp6)
    //   this.tempDecryptedReq.customerID =this.dataService.userDetails.customerId;
    // }

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(encryptionKey,JSON.stringify(this.tempDecryptedReq));
    this.dataService.request = encryptData;
    console.log(this.dataService.request);
    this.submitReq();
  }

  /**
   * function to called on unSuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    // if (resp.opstatus == "01"){
    //   showToastMessage("Invalid OTP Please try again", 'error');
    // }else if (resp.opstatus == "02" || resp.opstatus == "03"){
    //   showToastMessage("Maximum failed attemps", 'error');
    //   if (this.dataService.screenType == 'fundTransfer') {
    //     this.router.navigateByUrl("/sendMoney");
    //   } else if (this.dataService.screenType == 'stopCheque') {
    //     this.router.navigateByUrl("/stopCheques");
    //   } else  {
    //     this.router.navigateByUrl("/" + this.dataService.screenType);
    //   }
    // }
    // showToastMessage(resp.Result, 'error');
  }

  ngOnDestroy() {
    //this.dataService.screenType = '';
  }

  /**
   * function to be called for omnichannel
   */
  omniChannelCall() {
    if (
      this.dataService.otpSessionPreviousPage != '/pendingRequest' &&
      this.dataService.otpSessionPreviousPage != '/addBiller'
    ) {
      var param = this.otpSessionService.getAddOmniChannelParam(
        this.dataService.endPoint
      );
      this.omniChannelApiCall(param);
    }
  }

  omniChannelApiCall(param) {
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_ADDOMNICHANNELREQ
      )
      .subscribe((data) => {
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.dataService.referenceNo = resp.RRN;
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  setOmniChannelFinalReq(type) {
    var param = this.otpSessionService.getOmniChannelParam(type);
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_GETOMNICHANNELREQ
      )
      .subscribe((data) => {
        console.log('setOmniChannelFinalReq======>', data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }



  onSearchChange(value,inputPlace)
  {

    this.invalidOtp = false;
    console.log(value);
    if(inputPlace == 1)
    {
       if(value.length == 1)
       document.getElementById("spassword2").focus();
    }
    else if(inputPlace == 2)
    {
      if(value.length == 1)
      document.getElementById("spassword3").focus();
      // else if(value.length == 0)
      else
      document.getElementById("spassword1").focus();
    }
    else if(inputPlace == 3)
    {
      if(value.length == 1)
      document.getElementById("spassword4").focus();
      // else if(value.length == 0)
      else
      document.getElementById("spassword2").focus();

    }
    else if(inputPlace == 4)
    {
      if(value.length == 1)
      document.getElementById("spassword5").focus();
      // else if(value.length == 0)
      else
      document.getElementById("spassword3").focus();

    }
    else if(inputPlace == 5)
    {
      if(value.length == 1)
      document.getElementById("spassword6").focus();
      // else if(value.length == 0)
      else
      document.getElementById("spassword4").focus();

    }
    else if(inputPlace == 6)
    {
      if(value.length == 0)
      document.getElementById("spassword5").focus();

    }
  }


  startCounter() {
    this.tick = 1000;
    this.counter = 120;
    if (this.countDown && !this.countDown.closed) {
      this.countDown.unsubscribe();
    }
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter == 1) this.countDown.unsubscribe();
      --this.counter;
    });
  }

  closePopup(popup){

    this.commonMethod.closePopup(popup);
    if (this.dataService.screenType == 'addPayee' || this.dataService.screenType == 'deletePayee' ) {
      this.router.navigateByUrl('/managePayee');
    } else if(this.dataService.screenType == 'fundTransfer' || this.dataService.screenType == 'schedule'){
      this.router.navigateByUrl('/sendMoney');
    }else if(this.dataService.screenType == 'instaPay' || this.dataService.screenType == 'schedule'){
      this.router.navigateByUrl('/instantPay');
    }else  if (this.dataService.screenType == 'myAccountsInfo'){
      this.router.navigateByUrl("/" + 'myAccount');
    }
    // instantPay
    else {
      if(this.dataService.screenType == "" || this.dataService.screenType == undefined || this.dataService.screenType == null){
        var url = this.constant.getPlatform() == "web" ? "/login" : "/loginMobile"
        this.router.navigateByUrl(url);
      }
      else{
        this.router.navigateByUrl(this.dataService.previousPageUrl);
        //this.router.navigateByUrl("/" + this.dataService.screenType);
      }
    }

  }

  closeUsernamePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
    // this.openPopup('success12');
    if(popupName == 'success1') {
      // var url = this.constant.getPlatform() == "web" ? "/login" : "/loginMobile"
      // this.router.navigateByUrl(url);
      this.logoutapp();
    }
  }

  logoutapp() {
    // need to change after some time
    let logoutReqParams = this.dashboardService.getLogoutParams();
    this.http.callBankingAPIService(logoutReqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOGOUT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.isLogOutOmni = true;
        this.idle.stop();
        this.commonMethod.closePopup('div.popup-bottom.timeout1')
        if (this.dataService.isUPILogin) {
          this.router.navigate(['/upiLogin'], { replaceUrl: true });
          this.storage.clearSessionStorage();
        } else {
          this.dataService.isLoggedIn = false;
          this.dataService.setShowThemeObservable(false);
          this.dataService.showDetails = false;
          if (this.constant.getPlatform() == "web") {
            showToastMessage(resp.Result, 'success')
            this.router.navigate(['/login'], { replaceUrl: true });
          }
          else {
            this.router.navigate(['/loginMobile'], { replaceUrl: true });
          }
        }

      }
      else {
        // this.errorCallBack(data.subActionId, resp);
      }
    });
  }
  LoginAgain(){

    // var url = this.constant.getPlatform() == "web" ? "/login" : "/loginMobile"
    // this.router.navigateByUrl(url);
    this.logoutapp();
  }


  getAccountList(){
    let param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.customerAccountList = data.set.records;
        this.dataService.isOmniLogin = true; // handel page navigation after session timeout

        //filltered account list of saving Account, deposit Account , overDraftAccount
        //Accounts filtered will be used in dashbord and other module
        this.dataService.customerCanTransferAccountList =[];
        this.dataService.customerMyDepostie =[];
        this.dataService.customerLoanAccountList =[];


        /* clearing all the arrays and resetting balances */

        this.dataService.customerMyDepostie = [];
        this.dataService.customerOperativeAccList = [];
        this.dataService.customerBorrowingsList = [];

        this.dataService.totalMyDepositBalance = 0;
        this.dataService.totalMyOperativeBalance = 0;
        this.dataService.totalMyBorrowingsBalance = 0;

        data.set.records.forEach(el => {
          if(el.accountType != 'CAPPI'){
            if(el.accountFlag == "P") this.dataService.primaryAccountDtl = el;
            if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
              this.dataService.customerMyDepostie.push(el);
              this.dataService.totalMyDepositBalance = this.dataService.totalMyDepositBalance + parseFloat(el.acctBalance);
            }
            else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
              // el.AGSStatus = el["AGS Status"];
              this.dataService.customerOperativeAccList.push(el);
              this.dataService.totalMyOperativeBalance = this.dataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
              console.log("customerOperativeAccList =====>",this.dataService.customerOperativeAccList);
            }
            else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
              this.dataService.customerBorrowingsList.push(el);
              this.dataService.totalMyBorrowingsBalance = this.dataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
            }
          }
        });
      }
      else {

      }
    });
  }


  //validate Aadhar Otp
  validateAadhaarOtp(otp){
    var param = this.otpSessionService.getAadhaarValOtp(this.dataService.profile.aadhaarNumber,otp,this.dataService.profile.transactionId);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId) , this.constant.serviceName_UIDAIKYCDETAILS).subscribe(data => {
      console.log("=====validateAadharNo=====", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  // OTP auto focus and auto move
  onKeyUpEvent(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 7) {
        this.getSpasswordElement(index + 1, type).focus();
      } else {
        this.getSpasswordElement(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }


    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'otp') {
          this.otpSessionForm.get(this.otpFormInput[index])?.setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }

  }

  onFocusEvent(index: any, type: any) {

    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index: any, type: any) {
    if (type == 'otp') {
      return this.otpPinRows._results[index].nativeElement;
    }
  }

}
