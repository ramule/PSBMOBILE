import { Component, OnInit, NgZone, Self, HostListener, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { pageLoaderService } from '../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { LoginService } from './login.service';
import { AppConstants } from '../../../../app.constant';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { PluginService } from '../../../../services/plugin-service';
import { FormValidationService } from '../../../../services/form-validation.service';
import { AccountType } from '../../../../utilities/app-enum';
import { NotificationService } from '../../notification/notification.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { environment } from '../../../../../environments/environment.prod';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
// import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';
import { OtpAPIService } from '../otp/otp.service';
import { Subscription, timer } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

declare var $: any;

declare var showToastMessage: any;
declare var showToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  captchaStatus:any = '';
  captchaExpire:boolean=false;
  captchaError=''
  // captchaConfig:any = {
  //   type:2,
  //   length:6,
  //   cssClass:'custom',
  //   back: {
  //    stroke:"#2F9688",
  //    solid:"#f2efd2"
  //   } ,
  //   font:{
  //     color:"#000000",
  //     size:"35px"
  //   }
  // };

  @ViewChildren('otpRow') otpRow: any;
  otpInput = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];
  updateValue: any;
  maskedMobileNo: any;
  otpfailMsg: any;
  LoginForm: FormGroup;
  MPINForm: FormGroup;
  otpFormLimit: FormGroup;
  mobileNumber: null;
  activetab: string;
  sessionDecryptKey: any;
  isBiometricAvailable: boolean = false;
  isBiomertric: any = false;
  isMPINSet: any = false;
  isTPINSet: any = false;
  platform: string = '';
  data: any = {};
  langData: any = {};
  loginAttemptCount:any;
  incorrectLogin:boolean = false;
  attempRemaining:any;
  attemptedTime:any;
  submitDisabled:boolean = false;
  code:any="";
  showCapcha:boolean = false;
  countDown: Subscription;
  counter = 120 ;
  capCounter = 180;
  tick = 1000;
  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/login'
  }
  public innerWidth: any;
  public formErrors = {
    username: '',
    password: '',
    captcha: ''
  };
  config:any = {
    type:1,
    length:6,
    cssClass:'custom',
    back: {
     stroke:"#007c3d",
     solid:"#007c3d"
    } ,
    font:{
      color:"#000000",
      size:"35px"
    }
  };
  today:number;
  information:any;
  warningResp:any;

  public formErrorsMPIN = {
    mpin: ''
  };

  //listner for all focusout event
  @HostListener("focusout")

  onBlur() {
    //call form validate on focus out
    this.formErrors = this.formValidation.validateForm(this.LoginForm, this.formErrors, true);
    this.formErrorsMPIN = this.formValidation.validateForm(this.MPINForm, this.formErrorsMPIN, true);

  }

  customers$: any;

  constructor(
    private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private EncrDecr: EncryptDecryptService,
    public commonMethod: CommonMethods,
    private loginService: LoginService,
    public constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    public plugin: PluginService,
    private ngZone: NgZone,
    private formValidation: FormValidationService,
    private notificationServicemob: NotificationService,
    public customCurrencyPipe: CustomCurrencyPipe,
    // private captchaService:NgxCaptchaService,
    private otpService: OtpAPIService,
    private domSanitizer: DomSanitizer,
    private datepipe: DatePipe
  )
  {

    // this.captchaService.captchStatus.subscribe((status)=>{
    //   this.captchaStatus = status;
    //   if (status == false) {
    //       alert("Opps!\nCaptcha mismatch")
    //   } else if (status == true)  {
    //       alert("Success!\nYou are right")
    //   }
    // });
    /**
   * For disabling cut copy and paste and auto fill / Omni
   */
    this.DataService.omniUPIFlow = true;
    this.DataService.fromOmniLogin = true;
    if (environment.production) {
        $(document).ready(function(){
          var username = document.getElementById('userNameTxt');
          var pwdTxt = document.getElementById('pwdTxt');
          $(username).bind("cut copy paste",function(e) {
          e.preventDefault();
        });
        $(username).attr("autocomplete", "off");

        /////////

        $(pwdTxt).bind("cut copy paste",function(e) {
          e.preventDefault();
        });
        $(pwdTxt).attr("autocomplete", "off");
        });
    }
  }
  playCaptcha() {
    var msg = new SpeechSynthesisUtterance(this.code.split('').join(' '));
    msg.pitch = 0.1;
    window.speechSynthesis.speak(msg);
  }
  buildForm() { 

    this.DataService.vpaAddressList = [];
    this.LoginForm = new FormGroup({
      //username: new FormControl('', { validators: Validators.required, }),
      //password: new FormControl('', { validators: Validators.required, }),
       username: new FormControl('', { validators: Validators.required, }),
       password: new FormControl('', { validators: Validators.required, }),
       
      captcha: new FormControl(''),
    });

    this.MPINForm = new FormGroup({
      // mobNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
      mpin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.minLength(4)]),
    });

    this.otpFormLimit = new FormGroup({
      otp1: new FormControl('', [Validators.required]),
      otp2: new FormControl('', [Validators.required]),
      otp3: new FormControl('', [Validators.required]),
      otp4: new FormControl('', [Validators.required]),
      otp5: new FormControl('', [Validators.required]),
      otp6: new FormControl('', [Validators.required]),
    });

    if(this.showCapcha){
    this.LoginForm.get('captcha')?.setValidators([Validators.required]);
    this.LoginForm.get('captcha').updateValueAndValidity();
    }else{
      this.LoginForm.get('captcha').clearValidators();
      this.LoginForm.get('captcha').updateValueAndValidity();
    }
    //Keyboard on change and before visible event is called when typing using virtual keyboard
    $('#userName').bind('keyboardChange', this.updateUsername.bind(this));
    // $('#userName').bind('show', this.resetUserName.bind(this));
    $('#pwd').bind('keyboardChange', this.updatePwd.bind(this));
    $("#userName").bind('beforeVisible', this.resetUserName.bind(this));
    $("#pwd").bind('beforeVisible', this.resetPwd.bind(this));


    this.LoginForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.LoginForm, this.formErrors, true);
    });
    this.MPINForm.valueChanges.subscribe((data) => {
      this.formErrorsMPIN = this.formValidation.validateForm(this.MPINForm, this.formErrorsMPIN, true);
    });
  }


  resetUserName() {
    $("#userName").val("")
    this.LoginForm.patchValue({ username: "" });

  }

  resetPwd() {
    $("#pwd").val("");
    this.LoginForm.patchValue({ password: "" })
  }

  /**
   * Below function is called for updating the input value of username &password using virtual keyboard
   * @param e
   * @param keyboard
   * @param el
   */
  updateUsername(e, keyboard, el) {
    console.log(e.target.value);
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9_.]/g,'')
    if(e.action == "bksp"){
      let userdata = this.reverse(e.target.value)
      var data = userdata.substring(0, userdata.length - 1)
      this.ngZone.run(() => {
        this.LoginForm.patchValue({ username: data });
        e.target.value = this.reverse(data);
      })
    }
    else if(e.action){
      this.ngZone.run(() => {
        this.LoginForm.patchValue({ username: this.reverse(e.target.value) });
      })
    }else{
      this.LoginForm.patchValue({ username: "" });
      $("#userName").val("")
    }
  }

  reverse(s) {
    // return s;
    return s.split("").reverse().join("");
  }

  updatePwd(e, keyboard, el) {
    if(e.action == "bksp"){
      let userdata = this.reverse(e.target.value)
      var data = userdata.substring(0, userdata.length - 1)
      this.ngZone.run(() => {
        this.LoginForm.patchValue({ password: data });
        e.target.value = this.reverse(data);
      })
    }
    else{
      this.ngZone.run(() => {
        this.LoginForm.patchValue({ password: this.reverse(e.target.value) });
      })
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
  }

  ngOnInit(): void {
    // this.createCaptcha();

    if (environment.production) {
      this.showCapcha = true
    }
    if(this.showCapcha){
         this.createCaptcha();
    }

    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 767) {

      this.commonPageComponent = {
        'headerType': 'preloginHeaderomni',
        'sidebarNAv': false,
        'footer': 'none',
        'currentpageRoute': '/login'
      }
    }
    this.initialization();
    console.log(this.commonMethod.maskNumber("8908978315"));
    var keyAvailable = this.storage.hasKeyLocalStorage("logAttempt");
    if(!keyAvailable){
      var num = 0;
      this.storage.setLocalStorage("logAttempt", num);
    }
    this.captchaCounter();

    this.DataService.isLoanAccount  = false;
    this.DataService.isNRENRO  = false;

    //this.storage.removeFromLocalStorage("logAttempt");
    //this.storage.removeFromLocalStorage("attemptedDateTime");

    console.log(this.router.url);

  }

  /**
   * This function is called for intitialization purpose
   */
  initialization() {
    this.DataService.isOmniLogin = false;
    this.DataService.changeMessage(this.commonPageComponent);
    this.buildForm();
    //window.onbeforeunload = function() { window.history.forward(); };
    // this.showAutoCompleteUserName();
    // this.storage.clearLocalStorage();
    this.storage.clearSessionStorage();
    this.handleNativeActivity();
    this.activetab = this.DataService.loginData.tab
    this.platform = this.constant.getPlatform();
    this.DataService.isFromMpinLogin = false;
    if(this.constant.getEntityId() == this.constant.val_entityIDMob){
      let mobEncryptKey =  this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
      this.storage.setLocalStorage('mobileStaticEncrypyKey',mobEncryptKey);
    }

  }

  showAutoCompleteUserName(){
    if(this.storage.hasKeyLocalStorage('username')){
      let userName = this.storage.getLocalStorage(this.constant.storage_username);
      // this.commonMethod.autocomplete(document.getElementById('userNameTxt'),[userName]);
    }
  }


  /**
   * called on form change
   */

  changeForm() {
    this.LoginForm.reset();
    this.MPINForm.reset();
  }


  /**
   * called for biometirc authrntication
   */

  loginWithBioMetric() {
    this.plugin.authenticateBiometric('Login to Punjab & Sind Bank').then((available) => {
      if (available) {
        this.loginBiometric();
      }
    });
  }

  /**
   * common function to validate form
   * @formname
   */
  validateForm(formname) {
    if (formname == "usernamelogin" && this.LoginForm.invalid )  {
      if( this.showCapcha) {
        this.LoginForm.get('username').markAsTouched();
        this.LoginForm.get('password').markAsTouched();
        this.LoginForm.get('captcha').markAsTouched();

        return;
      } else{
        this.LoginForm.get('username').markAsTouched();
        this.LoginForm.get('password').markAsTouched();
        return;
      }
    } else if (formname == "mpin" && this.MPINForm.invalid) {
      // this.MPINForm.get('mobNumber').markAsTouched();
      this.MPINForm.get('mpin').markAsTouched();
      this.formErrorsMPIN = this.formValidation.validateForm(this.MPINForm, this.formErrorsMPIN, true);
      return;
    }
  }

  /**
   * Login submit using Biometric
   */

  loginBiometric() {
    var param = this.loginService.getParamForLoginBiometric();
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.sessionDecryptKey = this.storage.getLocalStorage(this.constant.storage_deviceId) + this.constant.sessionEncryptKey + this.DataService.uuid + this.storage.getLocalStorage(this.constant.storage_mobileNo);
    this.loginApiCall(param,deviceID, 'bioMetric');
  }

  /**
   * Login submit using FaceId
   */

  loginFaceId() {
    var param = this.loginService.getParamForLoginFaceId();
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.sessionDecryptKey = deviceID + this.constant.sessionEncryptKey + this.storage.getLocalStorage(this.constant.storage_mobileNo);
    this.loginApiCall(param,deviceID, 'faceId');
  }

  /**
   * Login submit using mobile number
   */
  loginWithMPIN() {
    this.validateForm('mpin')
    console.log(this.MPINForm)
    if (this.MPINForm.valid) {
      this.DataService.mpin = this.LoginForm.value.mpin;
      var param = this.loginService.getParamForLoginMPIN(this.MPINForm.value);
      this.sessionDecryptKey = this.encryptDecryptService.createMD5Value(this.MPINForm.value.mpin) + this.constant.sessionEncryptKey + this.storage.getLocalStorage(this.constant.storage_mobileNo);
      let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
      this.loginApiCall(param, deviceID,'mpin');
    } else {
      this.formErrorsMPIN = this.formValidation.validateForm(this.MPINForm, this.formErrorsMPIN, true);
    }
  }

  /**
  * Login submit using username and password
  */
  loginUsername() {

    this.validateForm('usernamelogin')
    if (!this.LoginForm.invalid) {
      // this.loader.showLoader();
      console.log(this.LoginForm.value);
      this.LoginForm.value.username = this.LoginForm.value.username.toLowerCase();
      this.sessionDecryptKey = this.LoginForm.value.username.toLowerCase() + this.constant.sessionEncryptKey + this.encryptDecryptService.createMD5Value(this.LoginForm.value.password);

      console.log("sessionDecryptKey =====> " + this.sessionDecryptKey);

      var param = this.loginService.getParamForLogin(this.LoginForm.value);
      let deviceID = this.constant.deviceID;
      this.loginApiCall(param,deviceID, 'credentials');
      this.DataService.LoginForm = this.LoginForm.value;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.LoginForm, this.formErrors, true);
    }
  }

  closePopup(popUp){
    this.commonMethod.closePopup(popUp);
  }

  routeTo(location){
    console.log('location', location);
    this.router.navigateByUrl(location);
  }

  /**
  * api call for login
  * @Param get request in encrypted format
  * @loginType
  */
  loginApiCall(param,deviceID, loginType) {
    // this.finalLogin();
    this.warningResp = "";
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_Login).subscribe(data => {
      console.log(data);
      if(data.responseParameter.invalidAttempts == 1 || data.responseParameter.invalidAttempts == 2 ){
        this.warningResp = 'You are left with '+ (3 - data.responseParameter.invalidAttempts)+' attempts, Kindly enter correct password'
        //  showToast( 'You have already used 2 incorrect login attenpts out of 4', 'error2', true );
      }
      if(data.responseParameter.invalidAttempts == 3){
        this.warningResp = 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours';
         // showToast( 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours', 'error2', true );
      }

      var resp = data.responseParameter;
      console.log("response :" + data.responseParameter);
      if (resp.opstatus == "00") {
        this.storage.removeFromLocalStorage("logAttempt");
        this.storage.removeFromLocalStorage("attemptedDateTime");
        this.DataService.lastLoginDate =  Date.now();
        this.loader.hideLoader();
        console.log( data.responseParameter);
        this.DataService.otplength = resp.OtpLength;
        this.DataService.customerID = resp.customerId;
        this.DataService.tpinlength = '6';
        this.DataService.dateFormat = resp.dateFormat;
        console.log('otp length:', this.DataService.otplength);
        this.DataService.amountFormat = resp.amountFormat
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
        //handel null or empty session
        if(sessionKey == undefined || sessionKey == null || sessionKey == ""){
          // showToastMessage("Invalid Credentials.", "error");
          this.information = "Invalid Credentials";
          this.commonMethod.openPopup('div.popup-bottom.show-common-info-login');
          return;
        }
        this.storage.setSessionStorage(this.constant.val_sessionKey, sessionKey);
        console.log("resp.deviceId" + resp.deviceId);
        this.storage.setLocalStorage(this.constant.storage_deviceId, resp.deviceId);
        this.storage.setLocalStorage(this.constant.storage_mobileNo, resp.MobileNo);
        //set authentication type
        if(resp.authFlag == "T"){
          this.DataService.otpName = 'TPIN'
        }
        else if(resp.authFlag == "S"){
          this.DataService.otpName = 'SOFT_TOKEN'
        }
        else if(resp.authFlag == "H"){
          this.DataService.otpName = 'HARD_TOKEN'
        }
        else{
          this.DataService.otpName = 'OTP'
        }

        this.maskedMobileNo = this.maskCharacter(resp.MobileNo, 4);
        this.DataService.mobStaticEncKey = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey
        if (data.hasOwnProperty('set')) {
          this.DataService.customerAccountList = data.set.records;
          this.DataService.isOmniLogin = true; // handel page navigation after session timeout


          //filltered account list of saving Account, deposit Account , overDraftAccount
          //Accounts filtered will be used in dashbord and other module
          this.DataService.customerCanTransferAccountList =[];
          this.DataService.customerMyDepostie =[];
          this.DataService.customerLoanAccountList =[];


          /* clearing all the arrays and resetting balances */

          this.DataService.customerMyDepostie = [];
          this.DataService.customerOperativeAccList = [];
          this.DataService.customerBorrowingsList = [];

          this.DataService.totalMyDepositBalance = 0;
          this.DataService.totalMyOperativeBalance = 0;
          this.DataService.totalMyBorrowingsBalance = 0;

          data.set.records.forEach(el => {
            if(el.accountType != 'CAPPI'){
              if(el.accountFlag == "P") this.DataService.primaryAccountDtl = el;
              if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
                this.DataService.customerMyDepostie.push(el);
                this.DataService.totalMyDepositBalance = this.DataService.totalMyDepositBalance + parseFloat(el.acctBalance);
              }
              else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
                // el.AGSStatus = el["AGS Status"];
                this.DataService.customerOperativeAccList.push(el);
                this.DataService.totalMyOperativeBalance = this.DataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
                console.log("customerOperativeAccList =====>",this.DataService.customerOperativeAccList);
              }
              else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
                this.DataService.customerBorrowingsList.push(el);
                this.DataService.totalMyBorrowingsBalance = this.DataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
              }
            }

            if(this.DataService.customerMyDepostie.length < 1 && this.DataService.customerOperativeAccList.length < 1 && this.DataService.customerBorrowingsList.length != 0  ){

              this.DataService.isLoanAccount  = true;
            }else{
              this.DataService.isLoanAccount  = false;
            }

            if( (el.accountFlag == "P") && (el.accountType == "SBNRO" || el.accountType == "SBNRE" || el.accountType == "CANRO" || el.accountType == "CANRE")){
              this.DataService.isNRENRO  = true;
            }
            else{
              this.DataService.isNRENRO  = false;
            }
          });

          //setting data for onRefreshed date
          //in case of balance enquiry or fundtransfer this value will be update
          //On cases where we need to display last refresh date this date will be used
          this.DataService.onRefreshDate = new Date();
        }
        this.storage.setLocalStorage(this.constant.storage_username, this.LoginForm.get('username').value);
        this.DataService.loginType = loginType;
        this.DataService.isOmniLogin = true;
        /*
        **** below condition will check internet banking with otp
        **** is required or not
        **** if require then navigate to dashboard else otp page
        */
        //TODO:need to add condition for internet banking only
        if (resp.IBLoginOtpRequired == 'N') {
          this.DataService.userDetails = resp;
          console.log("userDetails", this.DataService.userDetails);
          let userProfile = 'data:image/png;base64,'+ resp?.custProfileImage;
          this.DataService.setDetails(userProfile);
          this.storage.setSessionStorage("isLoggedIn", "true");
          this.DataService.loginData.mobnumber = resp.MobileNo;
          // this.DataService.routeWithNgZone('dashboard');
          // this.DataService.routeWithNgZone('dashboardMobile');

          // this.DataService.routeWithNgZone('dashboard');

          if( this.DataService.gotpage){
            this.DataService.routeWithNgZone(this.DataService.gotpage);
          }else{
            this.DataService.routeWithNgZone('dashboard');
          }
          // this.DataService.routeWithNgZone('dashboard');
        }
        else {

          if(environment.production) {
            /* this condition is called when IBLoginOtpRequired == 'Y' */
            this.DataService.otpPreviousPage = "/login";
            this.DataService.otpNextPage = "/dashboard";

            this.DataService.userDetails = resp;
            console.log("userDetails", this.DataService.userDetails);
            let userProfile = 'data:image/png;base64,'+ resp?.custProfileImage;
            this.DataService.setDetails(userProfile);
            this.DataService.loginData.mobnumber = resp.MobileNo;

            this.commonMethod.openPopup('div.otp-popuplimit');
            this.counter = 120;
            this.tick = 1000;
            this.startCounter();
            this.resendOtp('send');
          }
          else {
            this.DataService.userDetails = resp;
            console.log("userDetails", this.DataService.userDetails);
            let userProfile = 'data:image/png;base64,'+ resp?.custProfileImage;
            this.DataService.setDetails(userProfile);
            this.storage.setSessionStorage("isLoggedIn", "true");
            this.DataService.loginData.mobnumber = resp.MobileNo;
            if( this.DataService.gotpage){
              this.DataService.routeWithNgZone(this.DataService.gotpage);
            }else{
              // this.DataService.routeWithNgZone('dashboard');
              this.DataService.routeWithNgZone('dashboard');

            }
          }
        }
        this.getProfileDtl();
      }else if(resp.opstatus == "92"){
        this.DataService.timeoutHeader = "Service Unavailable"
        this.DataService.timeoutMsg = "Service is temporally down, please try after some time"
        this.DataService.routeWithNgZone('/temporaryServiceOut');
      }
      else {
        this.createCaptcha();
        this.errorCallBack(resp);
      }
    });
  }


  calculateDiff(){
    var data = JSON.parse(this.storage.getLocalStorage("attemptedDateTime"));
    let date = new Date(data);
    //let date = new Date("Thu Aug 04 2021 10:25:10 GMT+0530 (India Standard Time)");
    let currentDate = new Date();
    //let currentDate = new Date("Thu Aug 05 2021 10:24:10 GMT+0530 (India Standard Time)");
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  /** Get Notification Data */
  getNotification()
  {
    var param=this.notificationServicemob.getNotificationParam();
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.getNotificationApiCall(param,deviceID)
  }

  getNotificationApiCall(param,deviceID)
  {
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_NOTIFICATIONS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter

        if (resp.opstatus == "00") {
          this.DataService.notificationArray = data.set.records;
        }
     });
 }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(resp) {
    this.LoginForm.reset();
   // this.errorCallBack(data.subActionId, resp);
    this.incorrectLogin = true;
    //console.log(this.storage.getLocalStorage("logAttempt"));
    var attempNo = Number(this.storage.getLocalStorage("logAttempt"));
    //attempNo = Number(attempNo);
    console.log(attempNo);
    //console.log(attempNo + 1);
    // var newNo:number;
    var newNo = attempNo + 1;
    console.log(newNo);
    this.storage.setLocalStorage("logAttempt", JSON.stringify(newNo));
    this.loginAttemptCount = JSON.parse(this.storage.getLocalStorage("logAttempt"));
    console.log(this.loginAttemptCount);
    this.attempRemaining = 3 - this.loginAttemptCount;
    console.log(this.attempRemaining);
    if(this.loginAttemptCount >= 3){
      this.storage.setLocalStorage("attemptedDateTime", JSON.stringify(new Date()));
      var diff = this.calculateDiff();
      console.log(diff);
      if(diff == 0){
        this.warningResp = 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours';
        //sshowToast( 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours', 'error2', true );
      }else{

        this.storage.removeFromLocalStorage("logAttempt");
        this.storage.removeFromLocalStorage("attemptedDateTime");
        //this.submitDisabled = false;
      }
    }

    this.information = resp.Result;
    this.commonMethod.openPopup('div.popup-bottom.show-common-info-login');
  }


  ngOnDestroy() {
    this.DataService.loginData.mobnumber = this.mobileNumber;
    this.DataService.loginData.tab = this.activetab;
  }


  /**
  * handel event of biometric activity
  */
  handleNativeActivity() {
    if (this.constant.getPlatform() != "web") {
      this.isBiomertric = this.storage.getLocalStorage('isBiomertric') == 'Y' ? true : false;
      this.isMPINSet = this.storage.getLocalStorage('isMBUser') == 'Y' ? true : false;
      this.isBiometricAvailable = this.DataService.isBiometric == 'Y'? true : false
      //TODO:need to remove just for testing
      // this.plugin.checkBiometricAvailable().subscribe((status) => {
      //   // alert("isBiometricAvailable status ==>"+status);
      //   this.isBiometricAvailable = status;
      // });
      // alert("isBiometricAvailable ==>"+this.isBiometricAvailable);
      // alert("isBiomertric ==>"+this.isBiomertric);
      // alert("isMPINSet ==>"+this.isMPINSet);
    }
  }

  goToRegistration(){
    if (this.constant.getPlatform() == "web") {
      this.DataService.regIsAtStep = 1;
      this.DataService.regFeildData.custId = "";
      this.DataService.regFeildData.accNo = "";
    }
    this.routeTo('/registration');
  }

  comingSoon(){
    showToastMessage("Coming Soon");
  }

  createCaptcha() {
    //clear the contents of captcha div first
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 200;
    canv.height = 50;

    var ctx = canv.getContext("2d");

    ctx.font = "35px Georgia";
    ctx.fillStyle = '#007c3d';
    canv.style.letterSpacing = 25 + "px";

    ctx.fillText(captcha.join(""), 40 , 40);

    if (this.config.back.stroke) {
      ctx.strokeStyle = this.config.back.stroke;
      for (var i = 0; i < 100; i++) {
        ctx.moveTo(Math.random() * 300, Math.random() * 300);
        ctx.lineTo(Math.random() * 300, Math.random() * 300);
      }
      ctx.stroke();
    }
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
  }
  closeCaptchaPopup(){

    this.captchaExpire=true;

    this.LoginForm.controls.username.reset()
    this.LoginForm.controls.password.reset()
    this.LoginForm.controls.captcha.reset()
    this.createCaptcha();
    this.captchaCounter();
    // this.captchaError="";
    this.commonMethod.closePopup('div.popup-bottom');
  // this.captchaError="";
  }


  finalLogin(){
    // this.captchaTimeout();
     this.validateCaptcha();

  }

  validateCaptcha() {

    // this.captchaTimeout();
    this.validateForm('usernamelogin')
    if(this.showCapcha) {
      if(this.LoginForm.value.captcha == this.code) {

        this.loginUsername();

      }
      else {
        if(this.LoginForm.value.captcha !='') {
          this.LoginForm.controls.captcha.reset()
          this.createCaptcha();
        }
      }
    } else{
      this.loginUsername();
    }
  }

  resendOtp(type){
    //api call to get otp
    var otpParam =  this.otpService.getResendOTPReq();
    this.http.callBankingAPIService(otpParam, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_RESENDOTP).subscribe(data => {
      var _resp = data.responseParameter
      if (_resp.opstatus == "00") {
        if(type == 'resend') {
          showToastMessage(_resp.Result, "success");
        }
        this.counter = 120;
        this.tick = 1000;
        this.startCounter();
      }
      this.otpfailMsg = "";
      this.otpFormLimit.reset();
    })
  }

  startCounter(){
    this.counter = 120;
    if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
    this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
  }
  captchaCounter(){
    this.capCounter = 180;
    if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
    this.countDown = timer(0, this.tick).subscribe(() => { if(this.capCounter == 1) this.countDown.unsubscribe(); --this.capCounter
      if(this.capCounter == 0){
      this.LoginForm.controls.username.reset()
      this.LoginForm.controls.password.reset()
      this.LoginForm.controls.captcha.reset()
      this.createCaptcha();
    }
    });
  }
  onKeyUpEventOtp(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

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
        if (type == 'otp') {
          this.otpFormLimit.get(this.otpInput[index])?.setValue("");
        }
        this.getSpasswordElementOtp(index - 1, type).focus();
      }
    }
  }

  getSpasswordElementOtp(index: any, type: any) {
    if(type == 'otp'){
      return this.otpRow._results[index].nativeElement;
    }
  }

  onFocusEvent(index, type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElementOtp(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  closeOtpPopup() {
    this.commonMethod.closePopup('div.popup-bottom');
    this.otpFormLimit.reset();
    this.counter = 120;
    this.otpfailMsg = "";
  }

  validateOtpAddlimit(){
    if(this.otpFormLimit.valid){
    var mobileOtp =
      this.otpFormLimit.value.otp1 +
      this.otpFormLimit.value.otp2 +
      this.otpFormLimit.value.otp3 +
      this.otpFormLimit.value.otp4 +
      this.otpFormLimit.value.otp5 +
      this.otpFormLimit.value.otp6;
      var param = this.otpService.getSendOTPReq(mobileOtp);
      this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_VALIDATEOTP).subscribe((data) => {
        console.log('=====validate otp=====', data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
          this.storage.setSessionStorage("isLoggedIn", "true");
          this.otpfailMsg = "";
          this.closeOtpPopup();
          this.commonMethod.showLoader();
          // this.DataService.routeWithNgZone('dashboard');


          if( this.DataService.gotpage){
            this.DataService.routeWithNgZone(this.DataService.gotpage);
            this.commonMethod.showLoader();
          }else{
            this.DataService.routeWithNgZone('dashboard');
            this.commonMethod.showLoader();
          }
        }
         else {
          // this.errorCallBack(data.subActionId, resp);
            this.otpfailMsg = resp.Result
            this.otpFormLimit.reset();
        }
      });
    }
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    return ('' + str).slice(0, -n).replace(/./g, '*') + ('' + str).slice(-n);
  }


  // Profile Data
  getProfileDtl(){
    let param = this.loginService.getProfileDetailsParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEDETAILS).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        var responseData = data.listofDataset[0].records;
        console.log("response data :: ", responseData)
        this.DataService.profiledateDetails= responseData;
        this.DataService.profileDetails = responseData;
        this.DataService.userName = resp.userName;
        if (resp?.base64Image != "")
          this.DataService.profileImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + resp?.base64Image);
        else {
          this.DataService.profileImage = ''
          this.DataService.profileName = responseData[0].custName;
        }
        // this.profileName = responseData[0].custName;
        console.log('tttettetetetetetet : ', this.DataService.profileName)
      }


      else {

      }
    });
  }

  guideLinesPopUp(){
    this.commonMethod.openPopup('div.guidelines-popup') ;
  }

  clossGuidelinesPopup(){
    this.commonMethod.closeAllPopup() ;
  }
}

