import { Component, NgZone, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { LocalStorageService } from '../../../../services/local-storage-service.service'
import { Location } from '@angular/common'
import { AppConstants } from 'src/app/app.constant';
import { ForgotPasswordUserAuthService } from '../forgot-password/forgot-password-user-auth/forgot-password-user-auth.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { ForgotMpinUserAuthenticationService } from '../forgot-mpin/forgot-mpin-user-authentication/forgot-mpin-user-authentication.service';
import { timer, Subscription } from 'rxjs';
import { RegistrationMpinService } from '../registration/registration-mpin/registration-mpin.service';
import { RegistrationValidateRegService } from '../registration/registration-validate-reg-details/registration-validate-reg-details.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare var showToastMessage :any;
@Component({
  selector: 'app-forgot-mpin-mob',
  templateUrl: './forgot-mpin-mob.component.html',
  styleUrls: ['./forgot-mpin-mob.component.scss']
})
export class ForgotMpinMobComponent implements OnInit {
  mobNumber = "";

  public confMpinError = "";
  public mpinError = "";
  validMpin: boolean = false;

  constructor(
    private router: Router,
    private ngZone : NgZone,
    private translatePipe : TranslatePipe,
    public DataService: DataService,
    private storage: LocalStorageService,
    private location: Location,
    private constant: AppConstants,
    private forgotMPINService: ForgotMpinUserAuthenticationService,
    private forgotPassword : ForgotPasswordUserAuthService,
    private http: HttpRestApiService,
    private regservice: RegistrationMpinService,
    private validateUserService: RegistrationValidateRegService,
    private forgotPasswordUserAuthService: ForgotPasswordUserAuthService,
    public commonMethod: CommonMethods) { }
  errormsg = "";
  public innerWidth: any;
  curentTabIndex = 1;
  activeTab = "step1";
  entermpin: boolean = false;
  enterConfrmmpin: boolean = false;
  mpinNotMatched: boolean = false;
  isFormValid: boolean = false;
  mpinValue: any = "";
  resendOtpLinkMobNumber: any = "";
  resendOtpLinkEmail: any = "";
  countDown: Subscription;
  mobileCountDown: Subscription;
  counter = 120;
  mobileCounter = 120;
  tick = 2000;
  internetForm: FormGroup;
  otpForm: FormGroup;
  emailForm: FormGroup;
  mpinForm: FormGroup;
  reMpinForm: FormGroup;
  mobOtpForm: FormGroup;
  mpinRepeatError: boolean = false;
  mpinConsecutiveError: boolean = false;
  validConfirmMpin: boolean = false;
  mpinMatch: boolean = true;

  maskedEmail: any = '';
  maskedMobile: any = '';
  @ViewChildren('mpinRow') mpinRows: any;
  @ViewChildren('reMpinRow') reMpinRows: any;
  @ViewChildren('otpRow') OTPRows: any;
  @ViewChildren('emailRow') emailRows: any;

  mpinInput = ['mpin1', 'mpin2', 'mpin3', 'mpin4', 'mpin5', 'mpin6',]
  reMpinInput = ['reMpin1', 'reMpin2', 'reMpin3', 'reMpin4', 'reMpin5', 'reMpin6',]
  otpInput = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']
  emailInput = ['email1', 'email2', 'email3', 'email4', 'email5', 'email6']


  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
  }

  typeSelection = 'internet'

  forgotMpinDetails = [{
    "stepIndex": 1,
    "stepName": "User Authentication",
    "stepActive": true,
    "stepStatus": "inprogress",
    "tabName": "userAuthentication"
  },
  {
    "stepIndex": 2,
    "stepName": "Set MPIN",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "setMpin"
  }
  ]

  ngOnInit(): void {
    this.buildForm();
    if (this.innerWidth < 767) {
      this.commonPageComponent = {
        'headerType': 'preloginHeaderomni',
        'sidebarNAv': false,
        'footer': 'none',
      }
    }
    this.mobNumber = this.storage.getLocalStorage(this.constant.storage_mobileNo);
    this.DataService.changeMessage(this.commonPageComponent);
  }

  buildForm() {
    this.internetForm = new FormGroup({
      userName: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required]),
    })

    this.otpForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required, Validators.min(1)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
    })

    this.mpinForm = new FormGroup({
      mpin1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    })

    this.reMpinForm = new FormGroup({
      reMpin1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    })

    this.mobOtpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });

    this.emailForm = new FormGroup({
      email1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      email2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      email3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      email4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      email5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      email6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });
  }

  validateForm(e) {
    switch (e) {
      case 'internet':
        if (this.internetForm.invalid) {
          this.internetForm.get('userName').markAsTouched();
          this.internetForm.get('password').markAsTouched();
        }
        break;

      case 'otp':
        if (this.otpForm.invalid) {
          this.otpForm.get('mobileNumber').markAsTouched();
          this.otpForm.get('email').markAsTouched();
        }
        break;
    }

    if (this.mobOtpForm.invalid) {
      this.mobOtpForm.get('otp1').markAsTouched();
      this.mobOtpForm.get('otp2').markAsTouched();
      this.mobOtpForm.get('otp3').markAsTouched();
      this.mobOtpForm.get('otp4').markAsTouched();
      this.mobOtpForm.get('otp5').markAsTouched();
      this.mobOtpForm.get('otp6').markAsTouched();
      return;
    }

    if (this.emailForm.invalid) {
      this.emailForm.get('email1').markAsTouched();
      this.emailForm.get('email2').markAsTouched();
      this.emailForm.get('email3').markAsTouched();
      this.emailForm.get('email4').markAsTouched();
      this.emailForm.get('email5').markAsTouched();
      this.emailForm.get('email6').markAsTouched();
      return;
    }

    if (this.mpinForm.invalid) {
      this.mpinForm.get('mpin1').markAsTouched();
      this.mpinForm.get('mpin2').markAsTouched();
      this.mpinForm.get('mpin3').markAsTouched();
      this.mpinForm.get('mpin4').markAsTouched();
      this.mpinForm.get('mpin5').markAsTouched();
      this.mpinForm.get('mpin6').markAsTouched();
      return;
    }

    if (this.reMpinForm.invalid) {
      this.reMpinForm.get('reMpin1').markAsTouched();
      this.reMpinForm.get('reMpin2').markAsTouched();
      this.reMpinForm.get('reMpin3').markAsTouched();
      this.reMpinForm.get('reMpin4').markAsTouched();
      this.reMpinForm.get('reMpin5').markAsTouched();
      this.reMpinForm.get('reMpin6').markAsTouched();
      return;
    }

  }

  afterSelectionValidation() {
    switch (this.typeSelection) {
      case 'internet':
        this.internetForm.get('userName').setValidators([Validators.required]);
        this.internetForm.get('password').setValidators([Validators.required,]);
        this.otpForm.get('mobileNumber').clearValidators();
        this.otpForm.get('email').clearValidators();

        this.mobOtpForm.get('otp1').clearValidators();
        this.mobOtpForm.get('otp2').clearValidators();
        this.mobOtpForm.get('otp3').clearValidators();
        this.mobOtpForm.get('otp4').clearValidators();
        this.mobOtpForm.get('otp5').clearValidators();
        this.mobOtpForm.get('otp6').clearValidators();

        this.emailForm.get('email1').clearValidators();
        this.emailForm.get('email2').clearValidators();
        this.emailForm.get('email3').clearValidators();
        this.emailForm.get('email4').clearValidators();
        this.emailForm.get('email5').clearValidators();
        this.emailForm.get('email6').clearValidators();

        this.otpForm.get('mobileNumber').updateValueAndValidity();
        this.otpForm.get('email').updateValueAndValidity();
        this.internetForm.get('userName').updateValueAndValidity();
        this.internetForm.get('password').updateValueAndValidity();

        this.mobOtpForm.get('otp1').updateValueAndValidity();
        this.mobOtpForm.get('otp2').updateValueAndValidity();
        this.mobOtpForm.get('otp3').updateValueAndValidity();
        this.mobOtpForm.get('otp4').updateValueAndValidity();
        this.mobOtpForm.get('otp5').updateValueAndValidity();
        this.mobOtpForm.get('otp6').updateValueAndValidity();

        this.emailForm.get('email1').updateValueAndValidity();
        this.emailForm.get('email2').updateValueAndValidity();
        this.emailForm.get('email3').updateValueAndValidity();
        this.emailForm.get('email4').updateValueAndValidity();
        this.emailForm.get('email5').updateValueAndValidity();
        this.emailForm.get('email6').updateValueAndValidity();

        break;

      case 'otp':
        this.otpForm.get('mobileNumber').setValidators([Validators.required, Validators.min(1)]);
        this.otpForm.get('email').setValidators([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]);

        this.mobOtpForm.get('otp1').setValidators([Validators.required, Validators.maxLength(1)]);
        this.mobOtpForm.get('otp2').setValidators([Validators.required, Validators.maxLength(1)]);
        this.mobOtpForm.get('otp3').setValidators([Validators.required, Validators.maxLength(1)]);
        this.mobOtpForm.get('otp4').setValidators([Validators.required, Validators.maxLength(1)]);
        this.mobOtpForm.get('otp5').setValidators([Validators.required, Validators.maxLength(1)]);
        this.mobOtpForm.get('otp6').setValidators([Validators.required, Validators.maxLength(1)]);

        this.emailForm.get('email1').setValidators([Validators.required, Validators.maxLength(1)]);
        this.emailForm.get('email2').setValidators([Validators.required, Validators.maxLength(1)]);
        this.emailForm.get('email3').setValidators([Validators.required, Validators.maxLength(1)]);
        this.emailForm.get('email4').setValidators([Validators.required, Validators.maxLength(1)]);
        this.emailForm.get('email5').setValidators([Validators.required, Validators.maxLength(1)]);
        this.emailForm.get('email6').setValidators([Validators.required, Validators.maxLength(1)]);


        this.internetForm.get('userName').clearValidators();
        this.internetForm.get('password').clearValidators();

        this.otpForm.get('mobileNumber').updateValueAndValidity();
        this.otpForm.get('email').updateValueAndValidity();
        this.internetForm.get('userName').updateValueAndValidity();
        this.internetForm.get('password').updateValueAndValidity();

        this.mobOtpForm.get('otp1').updateValueAndValidity();
        this.mobOtpForm.get('otp2').updateValueAndValidity();
        this.mobOtpForm.get('otp3').updateValueAndValidity();
        this.mobOtpForm.get('otp4').updateValueAndValidity();
        this.mobOtpForm.get('otp5').updateValueAndValidity();
        this.mobOtpForm.get('otp6').updateValueAndValidity();

        this.emailForm.get('email1').updateValueAndValidity();
        this.emailForm.get('email2').updateValueAndValidity();
        this.emailForm.get('email3').updateValueAndValidity();
        this.emailForm.get('email4').updateValueAndValidity();
        this.emailForm.get('email5').updateValueAndValidity();
        this.emailForm.get('email6').updateValueAndValidity();

        break;
    }
  }

  authTypeSelection(value) {
    this.typeSelection = value;
    if (this.typeSelection == 'otp') {
      this.internetForm.reset();
      var param = this.forgotPassword.getMaskDetailsParams();
      let deviceID = this.constant.deviceID;
      this.getMaskedDetailsApiCall(param, deviceID);
    }
    else {
      this.otpForm.reset();
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

  onstepChange(stepname, stepindex) {
    console.log(stepname, stepindex);
    this.activeTab = "step" + (stepindex)

    for (let i = 0; i < this.forgotMpinDetails.length; i++) {
      this.forgotMpinDetails[i].stepActive = false;
    }
    this.forgotMpinDetails[stepindex - 1].stepActive = true;
  }

  nextstep(step) {
    console.log("Step: ", step);
    let stepindex = step - 1
    console.log("Step index", stepindex)
    this.forgotMpinDetails[stepindex].stepStatus = "completed"
    this.forgotMpinDetails[stepindex].stepActive = false
    this.forgotMpinDetails[stepindex + 1].stepActive = true
    if (this.forgotMpinDetails[stepindex + 1].stepStatus != "completed") {
      this.forgotMpinDetails[stepindex + 1].stepStatus = "inprogress"
    }
    this.activeTab = "step" + (step + 1)
    this.curentTabIndex = step + 1
  }

  prevstep(step) {
    let stepindex = step - 2
    console.log(stepindex)
    this.forgotMpinDetails[stepindex].stepActive = true
    this.forgotMpinDetails[stepindex + 1].stepActive = false
    this.activeTab = "step" + (step - 1)
    console.log(step)
    this.curentTabIndex = step - 1
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  mpinStepSubmit() {
    if (this.activeTab == 'step1') {
      this.afterSelectionValidation()
      switch (this.typeSelection) {
        case 'internet':
          if (this.internetForm.valid) {
            // this.nextstep(1)
            let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId)
            var param = this.validateUserService.getValidateCredentialsParam({ userName: this.internetForm.value.userName.toLowerCase() , password: this.internetForm.value.password });
            this.validateUserDetails(param, deviceId);
          } else {
            this.validateForm(this.typeSelection)
          }
          break;

        case 'otp':
          if (this.otpForm.valid) {
            //  this.commonMethod.openPopup('div.otp-popup') ;
            // this.nextstep(1)
            this.resendLeadOTP(this.otpForm.get('mobileNumber').value, this.otpForm.get('email').value);
          } else {
            this.validateForm(this.typeSelection)
          }
          break;
      }
    }

    else {
      this.validationForm();
      if (this.mpinForm.valid) {
        console.log('mpin ', this.getMPINValue());
        console.log('confirm mpin ', this.getConfirmMPINValue());

        let validMpin1 = this.checkConsecutiveDigits(this.getMPINValue());
        console.log('validMpin1', validMpin1);
        let validMpin2 = this.checkRepeatedDigits(this.getMPINValue());
        console.log('validMpin2', validMpin2);

        this.validMpin = validMpin1 || validMpin2;
        console.log('this.validMpin', this.validMpin);


        let validConfirmMpin1 = this.checkConsecutiveDigits(this.getConfirmMPINValue());
        let validConfirmMpin2 = this.checkRepeatedDigits(this.getConfirmMPINValue());

        this.validConfirmMpin = validConfirmMpin1 || validConfirmMpin2;
        console.log('this.validConfirmMpin', this.validConfirmMpin);

        this.mpinMatch = this.checkMpinMatch(this.getMPINValue(), this.getConfirmMPINValue());
        console.log('this.mpinMatch', this.mpinMatch);
        if (!this.confMpinError && this.mpinMatch && !this.validConfirmMpin && !this.mpinError && !this.validMpin) {
          var mpin = this.getMPINValue();
          var param1 = this.regservice.getValidateMpinParam(mpin);
          this.setMpin(param1);
        }
        // else {

        //   this.dataService.omniRegistrationFlow = true;
        //   //Omni flow
        // }
      }
    }

  }



  validateUserDetails(param, deviceId) {
    this.http.callBankingAPIService(param, deviceId, this.constant.serviceName_VERFYCREDNTIALS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.nextstep(1)
      }
      else if(resp.opstatus == '02') {
        this.ngZone.run(() => {
          this.DataService.information = 'Invalid Details';
          this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.DataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-info')
        // this.errorCallBack(data.subActionId, resp);
      });
    }
    
  });
}



  checkMpinMatch(mpinVal, confirmMpinVal) {
    if (mpinVal === confirmMpinVal) {
      return true;
    } else {
      return false;
    }
  }

  validationForm() {
    //check form validity
    if (this.mpinForm.invalid) {
      this.mpinError = "";
      this.confMpinError = "";
      for (const field in this.mpinForm.controls) { // 'field' is a string
        const control = this.mpinForm.get(field); // 'control' is a FormControl
        if (field.includes('mpin') && control.hasError('required')) {
          this.mpinError = '* This field is required';
        } else if (field.includes('confirmMpin') && control.hasError('required')) {
          this.confMpinError = '* This field is required';
        }
      }
      return;
    } else {
      this.mpinError = '';
      this.confMpinError = '';
    }
  }


  validateMPINForm() {
    //check form validity
    if (this.mpinForm.invalid) {
      this.mpinError = "";
      this.confMpinError = "";
      // this.formValidation.markFormGroupTouched(this.mpinForm);
      for (const field in this.mpinForm.controls) { // 'field' is a string
        const control = this.mpinForm.get(field); // 'control' is a FormControl
        if (field.includes('mpin') && control.hasError('required')) {
          this.mpinError = '* This field is required';
        } else if (field.includes('confirmMpin') && control.hasError('required')) {
          this.confMpinError = '* This field is required';
        }
      }
      return;
    } else {
      this.mpinError = '';
      this.confMpinError = '';
    }
  }



  checkRepeatedDigits(val) {
    console.log('checkRepeatedDigits val', val);
    let regex1 = /^([0-9])\1{5}$/;
    if (regex1.test(val)) {
      console.log("repeated true");
      // this.repeatedDigits = true;
      return true;
    } else {
      console.log("repeated false");
      // this.repeatedDigits = false;
      return false;
    }
  }

  checkConsecutiveDigits(val) {
    console.log('checkConsecutiveDigits val === ', val);

    if (val == "012345" || val == "123456" || val == "234567" || val == "345678" || val == "456789" || val == "567890") {
      console.log("consecutive true");
      // this.consecutiveDigits = true;
      return true;
    } else if (val == "987654" || val == "876543" || val == "765432" || val == "654321" || val == "543210" || val == "098765") {
      console.log("consecutive true");
      // this.consecutiveDigits = true;
      return true;
    } else {
      console.log("consecutive false");
      // this.consecutiveDigits = false;
      return false;
    }
  }




  getMPINValue() {
    var mpin = "";
    for (const field in this.mpinForm.controls) { // 'field' is a string
      const control = this.mpinForm.get(field); // 'control' is a FormControl
      if (field.includes('mpin') && !control.hasError('required')) {
        mpin += control.value;
      }
    }
    return mpin;
  }

  getConfirmMPINValue() {
    var confirmMPIN = "";
    for (const field in this.reMpinForm.controls) { // 'field' is a string
      const control = this.reMpinForm.get(field); // 'control' is a FormControl
      if (field.includes('reMpin') && !control.hasError('required')) {
        confirmMPIN += control.value;
      }
    }
    return confirmMPIN;
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
          this.DataService.crmReferenceNumber = resp.crmReferenceNumber;
          this.startCounter();
          this.startMobileCounter();
          this.resendOtpLinkMobNumber = mobileNo;
          this.resendOtpLinkEmail = emailId;
          this.openPopup('otp-popup');
        }
      
        else  {
          this.ngZone.run(() => {
            this.DataService.information = resp.Result;
            this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.DataService.primaryBtnText = this.translatePipe.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.show-common-info')
          // this.errorCallBack(data.subActionId, resp);
        });
      }
      });
  }


  openPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
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


  // mpin, otp

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
        if (type == 'mpassword') {
          this.mpinForm.get(this.mpinInput[index])?.setValue("");
        } else if (type == 'rmpassword') {
          this.reMpinForm.get(this.reMpinInput[index])?.setValue("");
        } else if (type == 'otp') {
          this.mobOtpForm.get(this.otpInput[index])?.setValue("");
        } else if (type == 'email') {
          this.emailForm.get(this.emailInput[index])?.setValue("");
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
    if (type == 'mpassword') {
      return this.mpinRows._results[index].nativeElement;
    } else if (type == 'rmpassword') {
      return this.reMpinRows._results[index].nativeElement;
    } else if (type == 'otp') {
      return this.OTPRows._results[index].nativeElement;
    } else if (type == 'email') {
      return this.emailRows._results[index].nativeElement;
    }
  }

  verifyOtpSubmit() {
    if (this.otpForm.valid && this.emailForm.valid) {
      this.commonMethod.closeAllPopup();
      this.validateOtp();   
    } else {
      this.validateForm('');
    }

  }




  setMpin(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SETUPDATEPIN).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.goToPage('forgotMpinSuccess')
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  cancel() {
    this.location.back();
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

          this.emailForm.reset();
          this.mobOtpForm.reset();
        }
        else {
        }
      });
  }


  validateOtp() {
    if (this.mobOtpForm.valid && this.emailForm.valid) {
      var mobileOtp =
        this.mobOtpForm.value.otp1 +
        this.mobOtpForm.value.otp2+
        this.mobOtpForm.value.otp3 +
        this.mobOtpForm.value.otp4 +
        this.mobOtpForm.value.otp5 +
        this.mobOtpForm.value.otp6;
      var emailOtp =
        this.emailForm.value.email1 +
        this.emailForm.value.email2 +
        this.emailForm.value.email3 +
        this.emailForm.value.email4 +
        this.emailForm.value.email5 +
        this.emailForm.value.email6;
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
        this.otpForm.reset();
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
          this.closePopupByName('otp-popup');
          this.nextstep(1);
          // this.router.navigateByUrl('/setPassword');
        }
        else {
          this.errormsg = data.responseParameter.Result;
          this.otpForm.reset();
          this.mobOtpForm.reset();
          this.emailForm.reset();
        }
      });
    }
  }


  closePopupByName(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
    this.otpForm.reset();
    this.counter = 120;
    this.mobileCounter = 120;
  }

  close() {
    this.location.back()
  }

  /**
    * function to called on unsuccessfull responce
    * @subActionId
    * @resp
    */
   errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result,"error");
}
}
