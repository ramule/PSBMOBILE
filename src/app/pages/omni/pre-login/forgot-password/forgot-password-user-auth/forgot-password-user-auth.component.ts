import { Component, OnInit, ViewChildren } from '@angular/core';
import { timer, Subscription } from "rxjs";
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { ForgotPasswordUserAuthService } from '../forgot-password-user-auth/forgot-password-user-auth.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { AppConstants } from '../../../../../app.constant';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

declare var showToastMessage: any;
import * as moment from 'moment';
@Component({
  selector: 'app-forgot-password-user-auth',
  templateUrl: './forgot-password-user-auth.component.html',
  styleUrls: ['./forgot-password-user-auth.component.scss'],
})
export class ForgotPasswordUserAuthComponent implements OnInit {

  @Output() nextEvent2 = new EventEmitter<number>();
  @Output() prevEvent = new EventEmitter<number>();
  @ViewChildren('cardPinRow') cardPinRows: any;
  @ViewChildren('expdateRow') expdateRows: any;
  @ViewChildren('debitcardRow') debitcardRows: any;

  @ViewChildren('mobileOTPRow') mobileOTPRows: any;
  @ViewChildren('emailOTPRow') emailOTPRows: any;

  carpinInput = ['cvvPin1', 'cvvPin2', 'cvvPin3', 'cvvPin4'];
  expdateInput = ['expDate1', 'expDate2', 'expDate3', 'expDate4'];
  debitCardInput = ['cardNumber1', 'cardNumber2', 'cardNumber3', 'cardNumber4']

  mobileInput = ['mobile1', 'mobile2', 'mobile3', 'mobile4', 'mobile5', 'mobile6'];
  emailInput = ['email1', 'email2', 'email3', 'email4', 'email5', 'email6']
  invalidCard: boolean = false;

  forgotpasswordauthForm: FormGroup;
  otpForm: FormGroup;
  sessionDecryptKey: any;
  debitCardError: any;
  selectedtab = 'card';
  maskedEmail: any = '';
  maskedMobile: any = '';
  resendOtpLinkMobNumber: any = "";
  resendOtpLinkEmail: any = "";
  countDown: Subscription;
  mobileCountDown: Subscription;
  counter = 120;
  mobileCounter = 120;
  tick = 2000;
  crmReferenceNumber: any;
  currentDate: any = moment().toDate();
  updatedDate: any;
  today: any;
  difference: any;
  errormsg = "";

  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter'
  }


  constructor(
    private router: Router,
    public commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    public translate: TranslatePipe,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private encryptDecryptService: EncryptDecryptService,
    private forgotPasswordUserAuthService: ForgotPasswordUserAuthService,
    private localStorage: LocalStorageService,
    public location: Location,
  ) { }

  ngOnInit(): void {
    var route = this.constant.getPlatform() == 'web' ? "login" : "loginMobile"
    history.pushState({}, this.dataService.previousPageUrl, this.location.prepareExternalUrl(this.dataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.dataService.changeMessage(this.commonPageComponent);


    console.log("----->", this.dataService.forgotPassDtl);

    this.buildForm();
    //this.bindform()
    this.countDown = timer(0, this.tick)
      .subscribe(() => --this.counter)
    this.mobileCountDown = timer(0, this.tick)
      .subscribe(() => --this.mobileCounter)
  }

  ngOnDestroy() {
    this.countDown = null;
    this.mobileCountDown = null;
  }

  changeTab(type) {
    this.selectedtab = type;
    console.log('type: ', type);
    if (this.selectedtab == 'otp') {
      this.forgotpasswordauthForm.get('email').reset();
      this.forgotpasswordauthForm.get('mobile').reset();
      var param = this.forgotPasswordUserAuthService.getMaskDetailsParams();
      let deviceID = this.constant.deviceID;
      this.getMaskedDetailsApiCall(param, deviceID);
    }
    else {
      this.forgotpasswordauthForm.get('cardNumber1').reset();
      this.forgotpasswordauthForm.get('cardNumber2').reset();
      this.forgotpasswordauthForm.get('cardNumber3').reset();
      this.forgotpasswordauthForm.get('cardNumber4').reset();
      this.forgotpasswordauthForm.get('expDate1').reset();
      this.forgotpasswordauthForm.get('expDate2').reset();
      this.forgotpasswordauthForm.get('expDate3').reset();
      this.forgotpasswordauthForm.get('expDate4').reset();
      this.forgotpasswordauthForm.get('cvvPin1').reset();
      this.forgotpasswordauthForm.get('cvvPin2').reset();
      this.forgotpasswordauthForm.get('cvvPin3').reset();
      this.forgotpasswordauthForm.get('cvvPin4').reset();
    }
  }

  submitForm() {
    this.customValidation();
    console.log('selected tab====', this.selectedtab);
    console.log('Formdata=========', this.forgotpasswordauthForm.value);
    if (this.forgotpasswordauthForm.valid) {
      console.log('selected tab====', this.selectedtab);
      if (this.selectedtab == 'card') {
        var card = '' + this.forgotpasswordauthForm.value.cardNumber1 + '' + this.forgotpasswordauthForm.value.cardNumber2 + '' + this.forgotpasswordauthForm.value.cardNumber3 + '' + this.forgotpasswordauthForm.value.cardNumber4
        var validCard = card.match("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$");
        // if (validCard == null || validCard == undefined) {
        //   this.invalidCard = true;
        // } else {
          this.forgotPasswordUsingDebitcard();
        // }
      } else {
        this.resendLeadOTP(this.forgotpasswordauthForm.get('mobile').value, this.forgotpasswordauthForm.get('email').value);
      }
    }
    else {
      this.validateForm();
    }
  }
  buildForm() {
    this.forgotpasswordauthForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.min(1)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")]),
      cardNumber1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
      cardNumber2: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
      cardNumber3: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
      cardNumber4: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
      expDate1: new FormControl('', [Validators.required]),
      expDate2: new FormControl('', [Validators.required]),
      expDate3: new FormControl('', [Validators.required]),
      expDate4: new FormControl('', [Validators.required]),
      cvvPin1: new FormControl('', [Validators.required]),
      cvvPin2: new FormControl('', [Validators.required]),
      cvvPin3: new FormControl('', [Validators.required]),
      cvvPin4: new FormControl('', [Validators.required])

    });

    this.otpForm = new FormGroup({
      mobile1: new FormControl('', [Validators.required]),
      mobile2: new FormControl('', [Validators.required]),
      mobile3: new FormControl('', [Validators.required]),
      mobile4: new FormControl('', [Validators.required]),
      mobile5: new FormControl('', [Validators.required]),
      mobile6: new FormControl('', [Validators.required]),
      email1: new FormControl('', [Validators.required]),
      email2: new FormControl('', [Validators.required]),
      email3: new FormControl('', [Validators.required]),
      email4: new FormControl('', [Validators.required]),
      email5: new FormControl('', [Validators.required]),
      email6: new FormControl('', [Validators.required]),
    });
    this.customValidation();
  }

  customValidation() {
    if (this.selectedtab == 'card') {
      this.forgotpasswordauthForm.controls['cardNumber1'].setValidators([
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4)
      ]);
      this.forgotpasswordauthForm.controls['cardNumber2'].setValidators([
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4)
      ]);
      this.forgotpasswordauthForm.controls['cardNumber3'].setValidators([
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4)
      ]);
      this.forgotpasswordauthForm.controls['cardNumber4'].setValidators([
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4)
      ]);
      this.forgotpasswordauthForm.controls['expDate1'].setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]);
      this.forgotpasswordauthForm.controls['expDate2'].setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]);
      this.forgotpasswordauthForm.controls['expDate3'].setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]);
      this.forgotpasswordauthForm.controls['expDate4'].setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]);
      this.forgotpasswordauthForm.controls['cvvPin1'].setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]);
      this.forgotpasswordauthForm.controls['cvvPin2'].setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]);
      this.forgotpasswordauthForm.controls['cvvPin3'].setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]);
      this.forgotpasswordauthForm.controls['cvvPin4'].setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]);
      this.forgotpasswordauthForm.controls['mobile'].setValidators([]);
      this.forgotpasswordauthForm.controls['email'].setValidators([]);
    } else {
      this.forgotpasswordauthForm.controls['mobile'].setValidators([
        Validators.required, Validators.minLength(10), Validators.min(1)
      ]);
      this.forgotpasswordauthForm.controls['email'].setValidators([
        Validators.required, Validators.pattern(this.constant.email_regex)
      ]);

      this.forgotpasswordauthForm.controls['cardNumber1'].setValidators([]);
      this.forgotpasswordauthForm.controls['cardNumber2'].setValidators([]);
      this.forgotpasswordauthForm.controls['cardNumber3'].setValidators([]);
      this.forgotpasswordauthForm.controls['cardNumber4'].setValidators([]);
      this.forgotpasswordauthForm.controls['expDate1'].setValidators([]);
      this.forgotpasswordauthForm.controls['expDate2'].setValidators([]);
      this.forgotpasswordauthForm.controls['expDate3'].setValidators([]);
      this.forgotpasswordauthForm.controls['expDate4'].setValidators([]);
      this.forgotpasswordauthForm.controls['cvvPin1'].setValidators([]);
      this.forgotpasswordauthForm.controls['cvvPin2'].setValidators([]);
      this.forgotpasswordauthForm.controls['cvvPin3'].setValidators([]);
      this.forgotpasswordauthForm.controls['cvvPin4'].setValidators([]);

    }

    this.forgotpasswordauthForm.controls['mobile'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['email'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls[
      'cardNumber1'
    ].updateValueAndValidity();
    this.forgotpasswordauthForm.controls[
      'cardNumber2'
    ].updateValueAndValidity();
    this.forgotpasswordauthForm.controls[
      'cardNumber3'
    ].updateValueAndValidity();
    this.forgotpasswordauthForm.controls[
      'cardNumber4'
    ].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['expDate1'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['expDate2'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['expDate3'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['expDate4'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['cvvPin1'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['cvvPin2'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['cvvPin3'].updateValueAndValidity();
    this.forgotpasswordauthForm.controls['cvvPin4'].updateValueAndValidity();
  }

  prevstep() {
    this.router.navigateByUrl('/ForgotPassword');
  }

  validateForm() {
    if (this.selectedtab == 'card') {
      if (this.forgotpasswordauthForm.invalid) {
        this.forgotpasswordauthForm.get('cardNumber1').markAsTouched();
        this.forgotpasswordauthForm.get('cardNumber2').markAsTouched();
        this.forgotpasswordauthForm.get('cardNumber3').markAsTouched();
        this.forgotpasswordauthForm.get('cardNumber4').markAsTouched();
        this.forgotpasswordauthForm.get('expDate1').markAsTouched();
        this.forgotpasswordauthForm.get('expDate2').markAsTouched();
        this.forgotpasswordauthForm.get('expDate3').markAsTouched();
        this.forgotpasswordauthForm.get('expDate4').markAsTouched();
        this.forgotpasswordauthForm.get('cvvPin1').markAsTouched();
        this.forgotpasswordauthForm.get('cvvPin2').markAsTouched();
        this.forgotpasswordauthForm.get('cvvPin3').markAsTouched();
        this.forgotpasswordauthForm.get('cvvPin4').markAsTouched();
      }
    } else {
      if (this.forgotpasswordauthForm.invalid) {
        this.forgotpasswordauthForm.get('mobile').markAsTouched();
        this.forgotpasswordauthForm.get('email').markAsTouched();
        return;
      }
    }
  }

  goToLogin() {
    var route = this.constant.getPlatform() == 'web' ? "login" : "loginMobile"
    this.router.navigateByUrl('/' + route);
  }

  forgotPasswordUsingDebitcard() {
    var param = this.forgotPasswordUserAuthService.getForgotPassowrdAuthforDebitCard(this.getDebitCardFormValue(), this.getCVVPINValue(), this.getDebitCardExpiryValue(), this.dataService.forgotPassDtl);
    let deviceID = this.constant.deviceID;
    this.forgotPasswordforDebitcardApiCall(param, deviceID);
  }


  forgotPasswordforDebitcardApiCall(param, deviceID) {
    this.http
      .callBankingAPIService(
        param,
        deviceID,
        this.constant.serviceName_VALIDATEDEBITCARD
        // this.constant.serviceName_VERFYCREDNTIALS
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
          this.dataService.crmReferenceNumber = resp.crmReferenceNumber;
          console.log("crmReferenceNumber::", this.dataService.crmReferenceNumber);
          var sessionKey = this.encryptDecryptService.decryptText(
            this.sessionDecryptKey,
            resp.Session
          );
          console.log('sessionKey', sessionKey);
          this.router.navigateByUrl('/setPassword');
        }
      });
  }



  getSpasswordElement(index, type) {
    if (index <= 3)
      if (type == 'cardpin') {
        return this.cardPinRows._results[index].nativeElement;
      }
      else if (type == 'card') {
        return this.debitcardRows._results[index].nativeElement;
      } else {
        return this.expdateRows._results[index].nativeElement;
      }
  }

  expDate(formGroup: FormGroup) {
    let validDate = true;
    const { value: expDate } = formGroup.get('expDate');
    if (expDate.length < 5) {
      validDate = false;
    }
    else {
      let _expDate = expDate;
      if (parseInt("20" + _expDate.split("/")[1]) < new Date().getFullYear()) {
        validDate = false;
      }
      else if (parseInt("20" + _expDate.split("/")[1]) == new Date().getFullYear() && parseInt(_expDate.split("/")[0]) < new Date().getMonth() + 1) {
        validDate = false;
      }
      else {
        validDate = true;
      }
    }
    console.log(validDate);
    return validDate ? null : { invalidExpdate: true };
  }

  onKeyUpEvent(index, event, type) {
    this.invalidCard = false;
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);
    this.updatedDates()

    var textlength = type == 'card' ? 4 : 1;
    if (this.getSpasswordElement(index, type).value.length >= textlength) {
      if (index !== 3) {
        if (type == 'expdate' && index == 1) {
          var month = this.getSpasswordElement(0, type).value + this.getSpasswordElement(1, type).value;
          if (month > 12) {
            this.forgotpasswordauthForm.get(this.expdateInput[0]).setValue("");
            this.forgotpasswordauthForm.get(this.expdateInput[1]).setValue("");
            this.getSpasswordElement(0, type).focus();
          }
          else if (month == 0) {
            this.forgotpasswordauthForm.get(this.expdateInput[0]).setValue("");
            this.forgotpasswordauthForm.get(this.expdateInput[1]).setValue("");
            this.getSpasswordElement(0, type).focus();
          }

          else {
            this.getSpasswordElement(index + 1, type).focus();
          }
        }
        else {
          this.getSpasswordElement(index + 1, type).focus();
        }
      }
      else {
        if (type == 'expdate' && index == 3) {
          var year = this.getSpasswordElement(2, type).value + this.getSpasswordElement(3, type).value;
          var currentYear = new Date().getFullYear().toString().slice(2, 4);
          var currentMonth: any = new Date().getMonth() + 1;
          var _month = this.getSpasswordElement(0, type).value + this.getSpasswordElement(1, type).value;
          if (year == 0) {
            this.forgotpasswordauthForm.get(this.expdateInput[2]).setValue("");
            this.forgotpasswordauthForm.get(this.expdateInput[3]).setValue("");
            this.getSpasswordElement(2, type).focus();
          }
          else if (year < currentYear) {
            this.forgotpasswordauthForm.get(this.expdateInput[2]).setValue("");
            this.forgotpasswordauthForm.get(this.expdateInput[3]).setValue("");
            this.getSpasswordElement(2, type).focus();
          }
          else if (year == currentYear && _month < currentMonth) {
            this.forgotpasswordauthForm.get(this.expdateInput[2]).setValue("");
            this.forgotpasswordauthForm.get(this.expdateInput[3]).setValue("");
            this.getSpasswordElement(2, type).focus();
          }
        }
        this.getSpasswordElement(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }

    if (this.getSpasswordElement(index, type).value.length >= textlength) {
      if (type == 'card' && index == 0) {
        var cardno = this.getSpasswordElement(0, type).value;
        if (cardno === '0000') {
          this.forgotpasswordauthForm.get(this.debitCardInput[0]).setValue("");
          this.getSpasswordElement(0, type).focus();
        }
        else {
          this.getSpasswordElement(index + 1, type).focus();
        }
      }
      // else{
      //   this.getSpasswordElement(index + 1, type).focus();
      // }
    }

    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }

    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'card') {
          this.forgotpasswordauthForm.get(this.debitCardInput[index]).setValue("");
        }
        else if (type == 'cardpin') {
          this.forgotpasswordauthForm.get(this.carpinInput[index]).setValue("");
        }
        else {
          this.forgotpasswordauthForm.get(this.expdateInput[index]).setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }
  }

  onFocusEvent(index, type) {
    if (type != 'email' && type != 'mobile') {
      for (let item = 1; item < index; item++) {
        const currentElement = this.getSpasswordElement(item, type);
        if (!currentElement.value) {
          currentElement.focus();
          break;
        }
      }
    } else {
      for (let item = 1; item < index; item++) {
        const currentElement = this.getSpasswordElementOtp(item, type);
        if (!currentElement.value) {
          currentElement.focus();
          break;
        }
      }
    }

  }

  getMaskedDetailsApiCall(param, deviceID) {
    this.http
      .callBankingAPIService(
        param,
        deviceID,
        this.constant.serviceName_GETMASKFORMATTEDDETAILS
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          if (resp.mobileNumber != null && resp.mobileNumber != "" && resp.mobileNumber != undefined) {
            this.maskedMobile = this.maskCharacter(resp.mobileNumber, 4);
          }
          else {
            this.maskedMobile = '';
          }

          if (resp.emailId != null && resp.emailId != "" && resp.emailId != undefined) {
            this.maskedEmail = this.maskCharacter(resp.emailId, 12);
          }
          else {
            this.maskedEmail = '';
          }
        }
      });
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    return ('' + str).slice(0, -n).replace(/./g, '*') + ('' + str).slice(-n);
  }

  validateOtp() {
    if (this.otpForm.valid) {
      var mobileOtp =
        this.otpForm.value.mobile1 +
        this.otpForm.value.mobile2 +
        this.otpForm.value.mobile3 +
        this.otpForm.value.mobile4 +
        this.otpForm.value.mobile5 +
        this.otpForm.value.mobile6;
      var emailOtp =
        this.otpForm.value.email1 +
        this.otpForm.value.email2 +
        this.otpForm.value.email3 +
        this.otpForm.value.email4 +
        this.otpForm.value.email5 +
        this.otpForm.value.email6;
      var refNo = '"1626100763609"';
      let deviceID = this.constant.deviceID;
      var param = this.forgotPasswordUserAuthService.getChannelLeadOtpParam(mobileOtp, emailOtp, this.resendOtpLinkMobNumber, this.resendOtpLinkEmail);

      this.http.callBankingAPIService(
        param,
        deviceID,
        this.constant.serviceName_VALIDATECHANNELSPRELOGINOTP
      ).subscribe((data) => {
        console.log('=====validate otp=====', data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
          this.closePopup('otp-popup');
          this.router.navigateByUrl('/setPassword');
        }
        else {
          this.errormsg = data.responseParameter.Result;
          this.otpForm.reset();
        }
      });
    }
  }

  openPopup(popupName) {
    this.commonMethods.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName) {
    // this.commonMethods.closePopup('div.popup-bottom.' + popupName);
    this.commonMethods.closeAllPopup();
    this.otpForm.reset();
    this.errormsg = "";
    this.counter = 120;
    this.mobileCounter = 120;
  }

  onSearchChange(value, inputPlace) {

    if (inputPlace == 1) {
      if (value.length == 4)
        document.getElementById("spassword2").focus();
    }
    else if (inputPlace == 2) {
      if (value.length == 4)
        document.getElementById("spassword3").focus();
      else if (value.length == 0)
        document.getElementById("spassword1").focus();
    }
    else if (inputPlace == 3) {
      if (value.length == 4)
        document.getElementById("spassword4").focus();
      else if (value.length == 0)
        document.getElementById("spassword2").focus();

    }
    else if (inputPlace == 4) {
      if (value.length == 0)
        document.getElementById("spassword3").focus();

    }
  }

  resendLeadOTP(mobileNo, emailId) {
    var resendOTPReq = this.forgotPasswordUserAuthService.getResendLeadOtpParam(mobileNo, emailId);
    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.constant.deviceID,
        this.constant.serviceName_RESENDLEADSOTP
      )
      .subscribe((data) => {
        var resp = data.responseParameter;
        this.tick = 1000;
        this.counter = 120;
        this.mobileCounter = 120;
        if (data.responseParameter.opstatus == '00') {
          this.dataService.crmReferenceNumber = resp.crmReferenceNumber;
          this.startCounter();
          this.startMobileCounter();
          this.resendOtpLinkMobNumber = mobileNo;
          this.resendOtpLinkEmail = emailId;
          this.openPopup('otp-popup');
        }
        else {
          /*****modified by USER PSB1*****/
          //showToastMessage(data.responseParameter.Result, 'error');
          /*****modified by USER PSB1 Ends****/
        }
      });
  }

  resendOTPLink(type) {

    var resendOTPReq = this.forgotPasswordUserAuthService.getResendLeadOtpParam(this.resendOtpLinkMobNumber, this.resendOtpLinkEmail);
    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.constant.deviceID,
        this.constant.serviceName_RESENDLEADSOTP
      )
      .subscribe((data) => {
        var resp = data.responseParameter;
        if (data.responseParameter.opstatus == '00') {

          if (type == 'email') {
            this.counter = 120;
            this.startCounter();
            this.otpForm.get('email1').reset();
            this.otpForm.get('email2').reset();
            this.otpForm.get('email3').reset();
            this.otpForm.get('email4').reset();
            this.otpForm.get('email5').reset();
            this.otpForm.get('email6').reset();
          }
          else if (type == 'mobile') {
            this.mobileCounter = 120;
            this.startMobileCounter();
            this.otpForm.get('mobile1').reset();
            this.otpForm.get('mobile2').reset();
            this.otpForm.get('mobile3').reset();
            this.otpForm.get('mobile4').reset();
            this.otpForm.get('mobile5').reset();
            this.otpForm.get('mobile6').reset();
          }
        }
        else {
        }
      });
  }


  startCounter() {
    this.counter = 120;
    if (this.countDown && !this.countDown.closed) { this.countDown.unsubscribe(); }
    this.countDown = timer(0, this.tick).subscribe(() => { if (this.counter == 1) this.countDown.unsubscribe(); --this.counter });
  }

  startMobileCounter() {
    this.mobileCounter = 120;
    if (this.mobileCountDown && !this.mobileCountDown.closed) { this.mobileCountDown.unsubscribe(); }
    this.mobileCountDown = timer(0, this.tick).subscribe(() => { if (this.mobileCounter == 1) this.mobileCountDown.unsubscribe(); --this.mobileCounter });
  }

  //   ToDateChange(event){
  // console.log("eventsssssssssssssssss",event);

  // var diff = Math.floor(this.inwardChequeInquiryForm.value.fromDate - this.inwardChequeInquiryForm.value.toDate);
  // var day = 1000 * 60 * 60 * 24;

  // var days = Math.floor(diff / day);
  // var months = Math.floor(days / 31);
  // this.toDate = Math.floor(months / 12);

  // console.log("this.toDate: " + this.toDate)
  // // if(this.toDate==0)
  // // {
  // //  alert("please selet right date")
  // // }
  // }

  updatedDates() {
    this.updatedDate = this.forgotpasswordauthForm.value.expDate1 + this.forgotpasswordauthForm.value.expDate2 + this.forgotpasswordauthForm.value.expDate3 + this.forgotpasswordauthForm.value.expDate4
    console.log("Selected date::::::::::", this.updatedDate);
    var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = today.getFullYear().toString().substr(-2);

    this.today = mm + yy;
    console.log("today date:::::::::::", this.today)


    // console.log("currentdate::::::",this.currentDate);
    this.difference = this.today - this.updatedDate;
    console.log("difference", this.difference);

    // var day = 1000 * 60 * 60 * 24;

    // var days = Math.floor(diff / day);
    // var months = Math.floor(days / 31);
    // this.currentDate = Math.floor(months / 12);

    // console.log("this.toDate: " + this.currentDate)
  }

  onKeyUpEventOtp(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;
    this.errormsg = "";

    if (this.getSpasswordElementOtp(index, type).value.length === 1) {
      if (index !== 6) {
        this.getSpasswordElementOtp(index + 1, type).focus();
      } else {
        this.getSpasswordElementOtp(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElementOtp(index - 1, type).focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'mobile') {
          this.otpForm.get(this.mobileInput[index])?.setValue("");
        } else if (type == 'email') {
          this.otpForm.get(this.emailInput[index])?.setValue("");
        }
        this.getSpasswordElementOtp(index - 1, type).focus();
      }
    }

  }

  getSpasswordElementOtp(index: any, type: any) {
    if (type == 'mobile') {
      return this.mobileOTPRows._results[index].nativeElement;
    } else {
      return this.emailOTPRows._results[index].nativeElement;
    }
  }

  backToPrevPage(){
    this.location.back() ;
  }
  getDebitCardFormValue() {
    var mpin = "";
    for (const field in this.forgotpasswordauthForm.controls) { // 'field' is a string
      const control = this.forgotpasswordauthForm.get(field); // 'control' is a FormControl
      if (field.includes('cardNumber') && !control.hasError('required')) {
        mpin += control.value;
      }
    }
    return mpin;
  }


  getDebitCardExpiryValue() {
    var mpin = "";
    for (const field in this.forgotpasswordauthForm.controls) { // 'field' is a string
      const control = this.forgotpasswordauthForm.get(field); // 'control' is a FormControl
      if (field.includes('expDate') && !control.hasError('required')) {
        mpin += control.value;
      }
    }
    return mpin;
  }

  getCVVPINValue() {
    var mpin = "";
    for (const field in this.forgotpasswordauthForm.controls) { // 'field' is a string
      const control = this.forgotpasswordauthForm.get(field); // 'control' is a FormControl
      if (field.includes('cvvPin') && !control.hasError('required')) {
        mpin += control.value;
      }
    }
    return mpin;
  }

}

