import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
import { TPINService } from './tpin.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { FormValidationService } from '../../../services/form-validation.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { DatePipe } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { Location } from '@angular/common';
import { DetailStatementService } from '../my-accounts/detailed-statement/detailed-statement.service';
import { AccountType } from '../../../utilities/app-enum';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare var showToastMessage: any;

@Component({
  selector: 'app-tpin-validation',
  templateUrl: './tpin.component.html',
  styleUrls: ['./tpin.component.scss'],
})
export class TPINComponent implements OnInit, OnDestroy {
  tpinForm: FormGroup;
  mobNumber: any;
  receiptResp: any;
  tempDecryptedReq: any;
  addPayeeObj: any;
  positivePayObj: any;
  freezeReceiptObj: any;
  donationReceiptObj: any;
  hotlistCardObj: any;
  countDown: Subscription;
  reissueCardObj: any;
  invalidTpin: boolean = false;
  emailId: any;
  message: any = ''
  counter = 120;
  tick = 1000;
  type: any = "";
  physicalCardObj: any;
  errorMsg:any=""
  public formErrors = {
    otp: '',
  };
  otpRequired = false;
  //listner for all focusout event
  @HostListener('focusout')
  onBlur() {
    //call form validarion on focus out
    this.formErrors = this.formValidation.validateForm(
      this.tpinForm,
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
    private constant: AppConstants,
    private storage: LocalStorageService,
    private tpinService: TPINService,
    private commonMethod: CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private datepipe: DatePipe,
    private location: Location,
    private detailStatementService: DetailStatementService,
    private translatePipe : TranslatePipe
  ) { }

  ngOnInit() {
    this.dataService.setPageSettings('AUTHORIZATION');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    // this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('AUTHORIZATION', this.router.url)
    this.initialization();
    history.pushState(
      {},
      this.dataService.previousPageUrl,
      this.location.prepareExternalUrl(this.dataService.previousPageUrl)
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
    if (this.dataService.profileEmailEdit != '') this.emailId = this.dataService.profileEmailEdit;
    console.log('this.emailId', this.emailId);
    console.log('this.dataService.profileEmailEdit', this.dataService.profileEmailEdit);
    console.log('this.dataService.screenType' + this.dataService.screenType);
    console.log("screenType ======>" + this.dataService.screenType);

    this.receiptResp = this.dataService.transactionReceiptObj;




    this.addPayeeObj = this.dataService.addPayeeObj; 
    this.positivePayObj = this.dataService.positivePayReceiptObj;
    this.freezeReceiptObj = this.dataService.freezeReceiptObj;
    this.donationReceiptObj = this.dataService.donationReceiptObj;
    this.physicalCardObj = this.dataService.physicalCardObj;
    this.reissueCardObj = this.dataService.reissuedCardObj
    this.hotlistCardObj = this.dataService.hotlistCardObj;

    this.buildForm();
    this.getServiceTypeVal();
    // this.resendOTP(1);
    // this.omniChannelCall();
  }

  /**
   * OTP form build
   */
  buildForm() {
    if (this.dataService.tpinlength == 4) {
      this.tpinForm = new FormGroup({
        tpin1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      });
    } else {
      this.tpinForm = new FormGroup({
        tpin1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin5: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin6: new FormControl('', [
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
    this.errorMsg =""
    if (this.tpinForm.invalid) {
      this.tpinForm.get('tpin1').markAsTouched();
      this.tpinForm.get('tpin2').markAsTouched();
      this.tpinForm.get('tpin3').markAsTouched();
      this.tpinForm.get('tpin4').markAsTouched();
      if (this.dataService.tpinlength == 6) {
        this.tpinForm.get('tpin5').markAsTouched();
        this.tpinForm.get('tpin6').markAsTouched();
      }
      this.formErrors = this.formValidation.validateForm(
        this.tpinForm,
        this.formErrors,
        true
      );
      return;
    }
  }

  /**
   * On Otp confirmation this fucntion called
   */
  confirmTPINClick() {
    var tpinValue;
    this.validateForm();
    console.log(this.tpinForm.value);
    if (this.tpinForm.valid) {
      if (this.dataService.tpinlength == 4) {
        tpinValue =
          this.tpinForm.value.tpin1 +
          this.tpinForm.value.tpin2 +
          this.tpinForm.value.tpin3 +
          this.tpinForm.value.tpin4;
      } else {
        tpinValue =
          this.tpinForm.value.tpin1 +
          this.tpinForm.value.tpin2 +
          this.tpinForm.value.tpin3 +
          this.tpinForm.value.tpin4 +
          this.tpinForm.value.tpin5 +
          this.tpinForm.value.tpin6;
      }

      var param = this.tpinService.getVerifyTPINReq(tpinValue);
      this.validateTPIN(param)
      // this.router.navigateByUrl('/otpSession')

    }
  }

  validateTPIN(param) {
    // this.initiateFlow();
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_VERIFYPIN).subscribe((data) => {
      console.log('=====validate otp=====', data);
      var resp = data.responseParameter;
      if (resp.opstatus == '00') {
        this.tpinForm.reset();
        if(this.otpRequired){
          this.router.navigateByUrl('/otpSession')
        }else{
          this.initiateFlow();
        }
        console.log(data.responseParameter);
      } else {
        this.tpinForm.reset();
        this.errorCallBack(data.subActionId, resp);
      }
    });
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
        this.dataService.endPoint,
        false,
        {showErrorPopup:false}
      )
      .subscribe((resp) => {
        console.log(
          'this.dataService.screenType' + this.dataService.screenType
        );
        this.tpinForm.reset();
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
            this.invalidTpin = true;
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
            } else if (this.dataService.screenType == 'fundTransfer') {
              this.fundTransfer(resp);// dashboard
            } else if (this.dataService.screenType == 'schedule') {
              this.scheduleTransfer(resp);// dashboard
            } else if (this.dataService.screenType == 'stopCheque') {
              this.stopCheque(resp);
            } else if (this.dataService.screenType == 'chequeBookRequest') {
              this.chequeBookRequest(resp);
            } else if (this.dataService.screenType == 'DTHBillPay') {
              this.DTHBillPay(resp);
            } else if (
              this.dataService.screenType == 'waterBillPay' ||
              this.dataService.screenType == 'gasBillPay'
            ) {
              this.WaterBillPay(resp);
            } else if (this.dataService.screenType == 'mobileRecharge') {
              this.mobileBillPayment(resp);
            } else if (this.dataService.screenType == 'electricityBillPay') {
              this.ElectricityBillPay(resp);
            } else if (this.dataService.screenType == 'landlineBillPay') {
              //TODO : change this function later after getting banking api
              this.ElectricityBillPay(resp);
            } else if (this.dataService.screenType == 'taxBillPay') {
              //TODO : change this function later after getting banking api
              this.ElectricityBillPay(resp);
            } else if (this.dataService.screenType == 'donationBillPay') {
              //TODO : change this function later after getting banking api
              this.ElectricityBillPay(resp);
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
            } else if (this.dataService.screenType == 'profileDetails') {
              this.profileEdit(resp);
            } else if (this.dataService.screenType == 'donationTransfer') {
              this.donationTransfer(resp);
            } else if (this.dataService.screenType == 'profileUpdate') {
              this.profileUpdate(resp);
            } else if (this.dataService.screenType == 'CardDetails') {
              this.CardDetails(resp);
            } else if (this.dataService.screenType == 'getPhysicalCard') {
              this.getPhysicalCard(resp);
            } else if (this.dataService.screenType == 'reissuecard') {
              this.getRessiueCard(resp);
            } else if (this.dataService.screenType == 'blockCard') {
              this.getBlockCard(resp);
            } else if (this.dataService.screenType == "debitCard") {
              this.getDebitCard(resp);
            } else if (this.dataService.screenType == "payemi") {
              this.payEmi(resp);
            } else {
              this.errorCallBack(resp.subActionId, resp.responseParameter);
            }
        }
      });
  }


  payEmi(resp) {
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

  getServiceTypeVal() {
    if (this.dataService.screenType == 'addPayee') {
      this.type = this.constant.val_ADDPAYEE;
    } else if (this.dataService.screenType == 'deletePayee') {
      this.type = this.constant.val_DELETEPAYEE;
    } else if (this.dataService.screenType == 'fundTransfer') {
      this.type = this.constant.val_FUNDTRANSFER;
    } else if (this.dataService.screenType == 'schedule') {
      this.type = this.constant.val_SCHEDULARTRANSMASTER;
    } else if (this.dataService.screenType == 'stopCheque') {
      this.type = this.constant.val_STOPCHEQUE;
    } else if (this.dataService.screenType == 'chequeBookRequest') {
      this.type = this.constant.val_CHEQUEBOOKREQUEST;
    } else if (this.dataService.screenType == 'DTHBillPay') {
      this.type = this.constant.val_DTHBILLPAY;
    } else if (this.dataService.screenType == 'waterBillPay') {
      this.constant.val_WATERBILLPAY;
    } else if (this.dataService.screenType == 'gasBillPay') {
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
    } else if (this.dataService.screenType == 'profileDetails') {
      this.type = this.constant.val_PROFILEDETAILS;
    } else if (this.dataService.screenType == 'donationTransfer') {
      this.type = this.constant.val_DONATIONTRANSFER;
    } else if (this.dataService.screenType == 'profileUpdate') {
      this.type = this.constant.val_PROFILEUPDATE;
    } else if (this.dataService.screenType == 'CardDetails') {
      this.type = this.constant.val_CARDDETAILS;
    }
  }

  getDebitCard(resp) {
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

  getBlockCard(resp) {
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

  getRessiueCard(resp) {
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

  getPhysicalCard(resp) {
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

  CardDetails(resp) {
    if (resp.responseParameter.opstatus == '00') {
      this.router.navigateByUrl('/debitCards');
      showToastMessage("Your virtual card is generated Successfully.Please visit home branch to collect your debit card after 7-8 days", 'success');

    }
    else {
      showToastMessage(resp.responseParameter.Result);
    }
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
      showToastMessage(resp.responseParameter.Result, 'success');
      this.dataService.userDetails.customerName =
        this.tempDecryptedReq.customerName;
      this.router.navigateByUrl('/profileDetails');
    } else {
      //this.dataService.receiptType = this.constant.val_Failure;
      showToastMessage(resp.responseParameter.Result);
      this.router.navigateByUrl('/profileDetails');
    }
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

  scheduleTransfer(resp) {

    if (resp.responseParameter.opstatus == '00') {
      this.dataService.receiptType = this.constant.val_Successful;
    } else {
      this.dataService.receiptType = this.constant.val_Failure;
    }
    this.dataService.transactionReceiptObj.redirectUrl = '/sendMoney';
    this.dataService.receiptmsg = resp.responseParameter.Result //resp.set.records[0].responseCode != '000' ? resp.set.records[0].CBS_RES_FAIL_MSG : 'Transaction Successful';
    this.dataService.receipdRefID = resp.responseParameter.TransactionId;
    if (resp.hasOwnProperty('set')) {

    }
    this.dataService.transactionReceiptObj.date = this.datepipe.transform(
      new Date().toISOString(),
      this.dataService.dateFormat
    );
    this.getAccountList();
    // this.setOmniChannelFinalReq(this.dataService.transactionReceiptObj.receiptType);
    this.router.navigate(['/receipt']);

  }

  fundTransfer(resp) {
    console.log(resp);
    if (resp.responseParameter.hasOwnProperty('upiResponse')) {
      var upiResponse = resp.responseParameter.upiResponse
      this.dataService.receipdRefID = upiResponse.responseParameter.rrn;
      this.dataService.transactionReceiptObj.rrn = upiResponse.responseParameter.rrn;
      if (upiResponse.status == '00') {
        this.dataService.receiptType = this.constant.val_Successful;
      } else {
        this.dataService.receiptType = this.constant.val_Failure;
      }
      this.dataService.receiptmsg = upiResponse.msg;
    } else {
      if (resp.responseParameter.opstatus == '00') {
        this.dataService.receiptType = this.constant.val_Successful;
      } else {
        this.dataService.receiptType = this.constant.val_Failure;
      }
      this.dataService.receiptmsg = resp.responseParameter.Result //resp.set.records[0].responseCode != '000' ? resp.set.records[0].CBS_RES_FAIL_MSG : 'Transaction Successful';
      if (resp.hasOwnProperty('set')) {
        this.dataService.receipdRefID = resp.set.records[0].referenceNumber;
      }
    }
    this.dataService.transactionReceiptObj.date =  new Date();
    this.dataService.transactionReceiptObj.redirectUrl = '/sendMoney';
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
    this.dataService.transactionReceiptObj.date = new Date();
    // this.setOmniChannelFinalReq(this.dataService.transactionReceiptObj.receiptType);
    this.router.navigate(['/receipt']);
  }

  deletePayee(resp) {

    this.message = resp.responseParameter.Result;
    this.commonMethod.openPopup('div.popup-bottom.show-link-account-failure');

  }

  positivePay(resp) {
    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.dataService.transactionReceiptObj.response = this.constant.val_Successful;
      this.dataService.receiptmsg = 'Your request has been submitted successfully';
    } else {
      this.dataService.transactionReceiptObj.response = this.constant.val_Failure;
      this.dataService.receiptmsg = 'Your submitted request has failed';
    }

    console.log('respresp' + resp);
    this.dataService.transactionReceiptObj.msg = resp.responseParameter.Result;
    this.dataService.transactionReceiptObj.rrn = resp.RRN;
    this.dataService.receipdRefID = resp.RRN;
    this.getAccountList();
    this.router.navigate(['/positivePaySuccess']);
  }

  stopCheque(resp) {
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.transactionReceiptObj.receiptType = 'success';
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
    }

    console.log(resp);
    this.dataService.transactionReceiptObj.msg = resp.responseParameter?.Result;
    this.dataService.transactionReceiptObj.RRN = resp.responseParameter?.RRN;
    this.dataService.receipdRefID = resp.RRN;
    this.router.navigate(['/receipt']);
  }

  chequeBookRequest(resp) {
    if (resp.responseParameter.opstatus == '00') {
      this.dataService.transactionReceiptObj.receiptType = 'success';
    } else {
      this.dataService.transactionReceiptObj.receiptType = 'failure';
    }

    console.log(resp);
    this.dataService.transactionReceiptObj.msg = resp.responseParameter?.Result;
    this.dataService.transactionReceiptObj.RRN = resp.responseParameter?.RRN;
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
    this.router.navigateByUrl(this.dataService.previousPageUrl);
  }


  /**
   * function called on otp submit
   */
  initiateFlow() {
    this.dataService.profileEmailEdit = "";
    console.log('this.dataService.request' + this.dataService.request);

    this.tempDecryptedReq = JSON.parse(
      this.encryptDecryptService.decryptText(
        this.storage.getSessionStorage(this.constant.val_sessionKey),
        this.dataService.request
      )
    );
    console.log(this.tempDecryptedReq);

    if (
      this.dataService.screenType == 'fundTransfer' ||
      this.dataService.screenType == 'addPayee' ||
      this.dataService.screenType == 'deletePayee' ||
      this.dataService.screenType == 'freezeAccount' ||
      this.dataService.screenType == 'positivePay' ||
      this.dataService.screenType == 'profileDetails' ||
      this.dataService.screenType == 'donationTransfer' ||
      this.dataService.screenType == 'profileUpdate' ||
      this.dataService.screenType == 'stopCheque' ||
      this.dataService.screenType == 'CardDetails' ||
      this.dataService.screenType == 'linkAccount' ||
      this.dataService.screenType == 'delinkAccount' ||
      this.dataService.screenType == 'reissuecard' ||
      this.dataService.screenType == 'debitCard' ||
      this.dataService.screenType == 'schedule'
    ) {
      this.tempDecryptedReq.methodName =
        this.dataService.endPoint.split('/')[1];
      this.tempDecryptedReq.value =
        this.tpinForm.value.tpin1 +
        this.tpinForm.value.tpin2 +
        this.tpinForm.value.tpin3 +
        this.tpinForm.value.tpin4 +
        this.tpinForm.value.tpin5 +
        this.tpinForm.value.tpin6;
      this.tempDecryptedReq.customerID =
        this.dataService.userDetails.customerId;
    }

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(
      this.storage.getSessionStorage(this.constant.val_sessionKey),
      JSON.stringify(this.tempDecryptedReq)
    );
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
    this.errorMsg = resp.Result;
    if(this.dataService.isCordovaAvailable){
      this.dataService.information = this.errorMsg;
      this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
      this.dataService.primaryBtnText = this.translatePipe.transform('OK');
      if(this.errorMsg){
        this.commonMethod.openPopup('div.popup-bottom.show-common-info');
      }
    }
    //showToastMessage(resp.Result, 'error');
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
      var param = this.tpinService.getAddOmniChannelParam(
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
    var param = this.tpinService.getOmniChannelParam(type);
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



  onSearchChange(value, inputPlace) {

    this.invalidTpin = false;
    console.log(value);
    if (inputPlace == 1) {
      if (value.length == 1)
        document.getElementById("spassword2").focus();
    }
    else if (inputPlace == 2) {
      if (value.length == 1)
        document.getElementById("spassword3").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword1").focus();
    }
    else if (inputPlace == 3) {
      if (value.length == 1)
        document.getElementById("spassword4").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword2").focus();

    }
    else if (inputPlace == 4) {
      if (value.length == 1)
        document.getElementById("spassword5").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword3").focus();

    }
    else if (inputPlace == 5) {
      if (value.length == 1)
        document.getElementById("spassword6").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword4").focus();

    }
    else if (inputPlace == 6) {
      if (value.length == 0)
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

  closePopup(popup) {

    this.commonMethod.closePopup(popup);
    if (this.dataService.screenType == 'addPayee' || this.dataService.screenType == 'deletePayee') {
      this.router.navigateByUrl('/managePayee');
    } else if (this.dataService.screenType == 'fundTransfer' || this.dataService.screenType == 'schedule') {
      this.router.navigateByUrl('/sendMoney');
    } else {
      this.router.navigateByUrl("/" + this.dataService.screenType);
    }

  }


  getAccountList() {
    let param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.customerAccountList = data.set.records;
        this.dataService.isOmniLogin = true; // handel page navigation after session timeout


        //filltered account list of saving Account, deposit Account , overDraftAccount
        //Accounts filtered will be used in dashbord and other module
        this.dataService.customerCanTransferAccountList = [];
        this.dataService.customerMyDepostie = [];
        this.dataService.customerLoanAccountList = [];


        /* clearing all the arrays and resetting balances */

        this.dataService.customerMyDepostie = [];
        this.dataService.customerOperativeAccList = [];
        this.dataService.customerBorrowingsList = [];

        this.dataService.totalMyDepositBalance = 0;
        this.dataService.totalMyOperativeBalance = 0;
        this.dataService.totalMyBorrowingsBalance = 0;

        data.set.records.forEach(el => {
          if (el.accountType != 'CAPPI') {
            if (el.accountFlag == "P") this.dataService.primaryAccountDtl = el;
            if (el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT) {
              this.dataService.customerMyDepostie.push(el);
              this.dataService.totalMyDepositBalance = this.dataService.totalMyDepositBalance + parseFloat(el.acctBalance);
            }
            else if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
              // el.AGSStatus = el["AGS Status"];
              this.dataService.customerOperativeAccList.push(el);
              this.dataService.totalMyOperativeBalance = this.dataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
              console.log("customerOperativeAccList =====>", this.dataService.customerOperativeAccList);
            }
            else if (el.SchemeCode == AccountType.LOAN_ACCOUNT) {
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
  validateAadhaarOtp(otp) {
    var param = this.tpinService.getAadhaarValOtp(this.dataService.profile.aadhaarNumber, otp, this.dataService.profile.transactionId);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_UIDAIKYCDETAILS).subscribe(data => {
      console.log("=====validateAadharNo=====", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


}
