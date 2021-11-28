import { Component, OnInit, NgZone, Self, HostListener, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { pageLoaderService } from '../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { LoginMobileService } from './login-mobile.service';
import { AppConstants } from '../../../../app.constant';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { PluginService } from '../../../../services/plugin-service';
import { FormValidationService } from '../../../../services/form-validation.service';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { BiometricStatus,AccountType } from 'src/app/utilities/app-enum';
import { UpiDashboardService } from 'src/app/pages/upi/dashboard/upi-dashboard.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare var $: any;

declare var showToastMessage: any;
declare var hideLoginModal: any;
declare var showToast:any;

@Component({
  selector: 'app-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.scss']
})
export class LoginMobileComponent implements OnInit {
  updateValue: any;
  LoginForm: FormGroup;
  MPINForm: FormGroup;
  mobileNumber: null;
  activetab: string;
  sessionDecryptKey: any;
  isBiometricAvailable: boolean = false;
  loginCarouselOptions: OwlOptions;
  activeSlides: SlidesOutputData;
  isBiomertric: any = false;
  isMpinChecked: boolean = false;
  isMPINSet: any = false;
  isTPINSet: any = false;
  platform: string = '';
  data: any = {};
  information = "";
  langData: any = {};
  incorrectLogin:boolean = false;
  commonPageComponent = {
    'headerType': 'none',
    'sidebarNAv': false,
    'footer': 'none',
    'currentpageRoute': '/loginMobile'
  }
  public innerWidth: any;
  public formErrors = {
    username: '',
    password: ''
  };

  biometricType = "";
  loginAttemptCount:any;
  attempRemaining:any;
  warningResp:any;

  otpFormInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6'] ;
  otpForm : FormGroup ;

  @ViewChildren('mPinLogin') mPinLogin: any;
  @ViewChildren('OTPFormRow') otpPinRows: any;





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

  constructor(
    private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private EncrDecr: EncryptDecryptService,
    public commonMethod: CommonMethods,
    private loginService: LoginMobileService,
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    public plugin: PluginService,
    private ngZone: NgZone,
    private upiDashboardService : UpiDashboardService,
    private formValidation: FormValidationService,
    private translatePipe : TranslatePipe
  ) {}

  buildForm() {
    this.DataService.vpaAddressList = [];
    this.DataService.omniUPIFlow = true;
    this.DataService.fromOmniLogin = true;
    this.LoginForm = new FormGroup({
      username: new FormControl('', { validators: Validators.required, }),
      password: new FormControl('', { validators: Validators.required, }),

    });
    this.MPINForm = new FormGroup({
      // mobNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
      mpin1: new FormControl('', [Validators.required]),
      mpin2: new FormControl('', [Validators.required]),
      mpin3: new FormControl('', [Validators.required]),
      mpin4: new FormControl('', [Validators.required]),
      mpin5: new FormControl('', [Validators.required]),
      mpin6: new FormControl('', [Validators.required]),
    });

    this.otpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    });
    //Keyboard on change and before visible event is called when typing using virtual keyboard
    $('#userName').bind('keyboardChange', this.updateUsername.bind(this));
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


  resetUserName(e, keyboard, el) {
    $("#userName").val("")
    this.LoginForm.patchValue({ username: "" });
  }

  resetPwd(e, keyboard, el) {
    $("#pwd").val("");
    this.LoginForm.patchValue({ password: "" })
  }

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  /**
   * Below function is called for updating the input value of username &password using virtual keyboard
   * @param e
   * @param keyboard
   * @param el
   */
  updateUsername(e, keyboard, el) {
    this.ngZone.run(() => {
      this.LoginForm.patchValue({ username: this.reverse(e.target.value) });
    })
  }

  reverse(s) {
    // return s;
    return s.split("").reverse().join("");
  }

  updatePwd(e, keyboard, el) {
    this.ngZone.run(() => {
      this.LoginForm.patchValue({ password: this.reverse(e.target.value) });
    })
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
  }

  ngOnInit(): void {

    this.ngZone.run(() => {
      if(this.DataService.bezellessIphone) {
        $("#mainDiv").addClass("pre-login");
      }
    });

    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 767) {

      this.commonPageComponent = {
        'headerType': 'none',
        'sidebarNAv': false,
        'footer': 'innerFooter',
        'currentpageRoute': '/loginMobile'
      }
    }
    this.initialization();
  }

  /**
   * This function is called for intitialization purpose
   */
  initialization() {
    this.loginCarouselOptions = this.DataService.getAccountCarouselOptions();

    this.DataService.changeMessage(this.commonPageComponent);

    this.buildForm();
    // this.showAutoCompleteUserName();
    // this.storage.clearLocalStorage();
    this.storage.clearSessionStorage();
    this.handleNativeActivity();
    this.activetab = this.DataService.loginData.tab;
    this.platform = this.constant.getPlatform();
    this.DataService.isFromMpinLogin = false;
    if(this.constant.getEntityId() == this.constant.val_entityIDMob){
      let mobEncryptKey =  this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
      this.storage.setLocalStorage('mobileStaticEncrypyKey',mobEncryptKey);
    }

  }

  //selected form type
  checkedType(){
    this.isMpinChecked = !this.isMpinChecked;
    this.storage.setLocalStorage("loginSelType", this.isMpinChecked ? 'Y' : 'N');
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
    if (formname == "usernamelogin" && this.LoginForm.invalid) {
      this.LoginForm.get('username').markAsTouched();
      this.LoginForm.get('password').markAsTouched();
      this.formErrors = this.formValidation.validateForm(this.LoginForm, this.formErrors, true);
      return;
    }
    else if (formname == "mpin" && this.MPINForm.invalid) {
      // this.MPINForm.get('mobNumber').markAsTouched();
      this.MPINForm.get('mpin1').markAsTouched();
      this.MPINForm.get('mpin2').markAsTouched();
      this.MPINForm.get('mpin3').markAsTouched();
      this.MPINForm.get('mpin4').markAsTouched();
      this.MPINForm.get('mpin5').markAsTouched();
      this.MPINForm.get('mpin6').markAsTouched();
      this.formErrorsMPIN = this.formValidation.validateForm(this.MPINForm, this.formErrorsMPIN, true);
      return;
    } else if(formname == "otpForm" && this.otpForm.invalid){
      this.otpForm.get('otp1').markAsTouched();
      this.otpForm.get('otp2').markAsTouched();
      this.otpForm.get('otp3').markAsTouched();
      this.otpForm.get('otp4').markAsTouched();
      this.otpForm.get('otp5').markAsTouched();
      this.otpForm.get('otp6').markAsTouched();
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
    setTimeout(() => {
      this.loginApiCall(param,deviceID, 'bioMetric');
    }, 100);
  }

  
  checkDeviceSimStatus(simInfo?) {
   
  }

  /**
   * Login submit using FaceId
   */

  loginFaceId() {
    var param = this.loginService.getParamForLoginFaceId();
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.sessionDecryptKey = deviceID + this.constant.sessionEncryptKey + this.storage.getLocalStorage(this.constant.storage_mobileNo);
    setTimeout(() => {
      this.loginApiCall(param,deviceID, 'faceId');
    }, 400);
  }

  /**
   * Login submit using mobile number
   */
  loginWithMPIN() {
    this.validateForm('mpin')
    console.log(this.MPINForm)
    if (this.MPINForm.valid) {
      this.DataService.mpin = this.MPINForm.value.mpin1+this.MPINForm.value.mpin2+this.MPINForm.value.mpin3+this.MPINForm.value.mpin4+this.MPINForm.value.mpin5+this.MPINForm.value.mpin6;
      var param = this.loginService.getParamForLoginMPIN(this.DataService.mpin);
      this.sessionDecryptKey = this.encryptDecryptService.createMD5Value(this.DataService.mpin) + this.constant.sessionEncryptKey + this.storage.getLocalStorage(this.constant.storage_mobileNo);
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
      //this.loader.showLoader();
      console.log(this.LoginForm.value);
      this.LoginForm.value.username = this.LoginForm.value.username.toLowerCase();
      this.sessionDecryptKey = this.LoginForm.value.username.toLowerCase() + this.constant.sessionEncryptKey + this.encryptDecryptService.createMD5Value(this.LoginForm.value.password);

      console.log("sessionDecryptKey =====> " + this.sessionDecryptKey);
      var param = this.loginService.getParamForLogin(this.LoginForm.value);
      let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
      this.loginApiCall(param,deviceID, 'credentials');
      this.DataService.LoginForm = this.LoginForm.value
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.LoginForm, this.formErrors, true);
    }
  }



  /**
  * api call for login
  * @Param get request in encrypted format
  * @loginType
  */
  loginApiCall(param,deviceID, loginType) {
    this.warningResp = "";
    if (this.DataService.platform.toLowerCase() == this.constant.val_android && this.DataService.isCordovaAvailable) {
    this.plugin.getSIMInfo().subscribe((data) => {
      //Success => Check Sim Status
      console.log("getSIMInfo Success"+ data);
      var simInfo;
      if (this.DataService.simData) {
        simInfo = this.DataService.simData;
      } else {
        simInfo = data;
      }

      let isDualSim = simInfo.activeSubscriptionInfoCountMax > 0 ? true : false;
      var simOne = this.storage.getLocalStorage("SimOneId") != '' && this.storage.getLocalStorage("SimOneId") != undefined ? this.storage.getLocalStorage("SimOneId") : 'blank';
      var simTwo = this.storage.getLocalStorage("SimTwoId") != '' && this.storage.getLocalStorage("SimTwoId") != undefined ? this.storage.getLocalStorage("SimTwoId") : 'blank';
      console.log('checkDeviceSimStatus SimeOne '+ simOne)
      console.log('checkDeviceSimStatus simTwo '+ simTwo)
    this.plugin.checkSimStatusAndroid(simOne, simTwo, isDualSim).subscribe((response) => {
      console.log("Sim Detect Success => "+ response);

      if (response.status == "00") {
      } else if (response.status == "01") {
        if (response.validSimFound) {
          this.loginUser(param,deviceID,loginType)
          //continue execution
        } else {
          //registeredSimNotFound - show popup & exit app
          console.log("Registered sim not found...")
          // this.dataService.clearAppInfo();
          this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.DataService.simInfoDetails = this.translatePipe.transform('REGISTERED_SIM_NOT_FOUND');
          this.DataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.registered-sim-not-found');
        }
      } else if (response.status == "02") {
        // noSimAvailableForApp - show popup & exit app
        console.log("No sim available for app...");
        this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
        this.DataService.simInfoDetails = this.translatePipe.transform('NO_SIM_AVAILABLE');
        this.DataService.primaryBtnText = this.translatePipe.transform('OK');
        this.commonMethod.openPopup('div.popup-bottom.no-sim-available');
      } else {
        //exit App
      }
    }, (err) => {
      console.log("Sim Detect Error => "+ err);
    });
  });
  }else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
    this.plugin.checkSIMAvailable().subscribe((response) => {
      this.loader.hideLoader();
      this.ngZone.run(() => {
        if (response == true || response == "true") {
          this.loginUser(param,deviceID,loginType)
        }else {
            this.MPINForm.reset();
            this.commonMethod.closeAllPopup();
            this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.DataService.informationDetails = this.translatePipe.transform('NO_SIM_AVAILABLE');
            this.DataService.primaryBtnText = this.translatePipe.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.no-sim-available-ios');
            return;
          }
      });
    });
  }else{
    this.loginUser(param,deviceID,loginType)
  }
  }


  loginUser(param,deviceID,loginType){
    
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_Login).subscribe(data => {
      console.log(data);
      if(data.responseParameter.invalidAttempts == 1 || data.responseParameter.invalidAttempts == 2 ){
        this.warningResp = 'You have already used '+data.responseParameter.invalidAttempts+' incorrect login attenpts out of 3'
        //  showToast( 'You have already used 2 incorrect login attenpts out of 4', 'error2', true );
      }
      if(data.responseParameter.invalidAttempts == 3){
        this.warningResp = 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours';
         // showToast( 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours', 'error2', true );
      }

      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if(this.storage.getLocalStorage(this.constant.storage_mobileNo) != resp.MobileNo){
          this.information = "Invalid Credentials";
          this.commonMethod.openPopup('div.popup-bottom.show-common-info-login');
          return;
        }
        this.storage.removeFromLocalStorage("logAttempt");
        this.storage.removeFromLocalStorage("attemptedDateTime");
        this.DataService.lastLoginDate =  Date.now();
        this.loader.hideLoader();
        console.log( data.responseParameter);
        this.DataService.otplength = resp.OtpLength;
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
          this.DataService.otpName = 'TPIN'
        }

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

        this.DataService.userDetails = resp;
        let userProfile = 'data:image/png;base64,'+ resp?.custProfileImage;
        this.DataService.setDetails(userProfile);
        this.storage.setSessionStorage("isLoggedIn", "true");
        this.DataService.vpaAddressList = [];
        this.DataService.loginData.mobnumber = resp.MobileNo;
        this.DataService.fistTimeLoad = false;
        this.DataService.isLogOutOmni = false;
        this.DataService.routeWithNgZone('dashboardMobile');
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    this.LoginForm.reset();
    this.MPINForm.reset();
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

  calculateDiff(){
    var data = JSON.parse(this.storage.getLocalStorage("attemptedDateTime"));
    let date = new Date(data);
    //let date = new Date("Thu Aug 04 2021 10:25:10 GMT+0530 (India Standard Time)");
    let currentDate = new Date();
    //let currentDate = new Date("Thu Aug 05 2021 10:24:10 GMT+0530 (India Standard Time)");
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }


  ngOnDestroy() {
    this.DataService.loginData.mobnumber = this.mobileNumber;
    this.DataService.loginData.tab = this.activetab;
  }


  handleNativeActivity() {
    this.isBiomertric = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == 'Y' ? true : false;
    this.isMPINSet = this.storage.getLocalStorage(this.constant.storage_isMBUser) == 'Y' ? true : false;
    setTimeout(() => {
      this.checkBiometricAvailable();
    }, 500);
    if(this.isMPINSet && this.storage.hasKeyLocalStorage("loginSelType")) {this.isMpinChecked = this.storage.getLocalStorage("loginSelType") == 'Y' ? true : false};
    console.log("storage_MPIN====>",this.storage.getLocalStorage(this.constant.storage_isMBUser));
    //this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric,'Y')
    //this.isBiometricAvailable = this.DataService.isBiometric == 'Y'? true : false
  }


  routeTo(location){
    console.log('location', location);
    this.router.navigateByUrl(location);
  }

  setUpiFlag() {
    this.DataService.upiRegistrationFlow = true;
  }

  checkFlow() {
    // let isUPIRegistered = this.storage.getLocalStorage(this.constant.storage_isUpiRegistrationSuccess);
    let isOmniRegistered = this.storage.getLocalStorage(this.constant.storage_omniRegisteredUser);
    if(isOmniRegistered) {
      this.routeTo("/upiLogin");
    } else {
      this.routeTo("/smsVerification");
    }
  }


  /**
     * check biometric avaialable
     */

   checkBiometricAvailable() {
    this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
      console.log(biometricResult);
      if (biometricResult.available == true) {
        this.isBiometricAvailable = true;
        this.biometricType = biometricResult.result;
        if(this.isBiometricAvailable && this.isBiomertric && !this.DataService.isLogOutOmni ){
          setTimeout(() => {
            this.bioMetricAuth(this.biometricType)
          }, 200);
        }
      }
    });
  }

  bioMetricAuthClick(type){
    setTimeout(() => {
      this.bioMetricAuth(type);
    }, 400);
  }


  bioMetricAuth(fingerPrint) {
    this.plugin.authenticateBiometric('Login to Punjab & Sind Bank').then((result) => {
      this.hideBiometricLoginModal();
      console.log(result);
      if (result == true) {
        if (fingerPrint) {
          this.loginBiometric();
        } else {
          this.loginFaceId();
        }
      } else {
        switch (result.code) {
          case BiometricStatus.BIOMETRIC_LOCKED_OUT_PERMANENT:
            this.information = "BIOMETRIC_DISABLED";
            this.showPopup('show-biometric-info');
            break;
          case BiometricStatus.BIOMETRIC_SECRET_NOT_FOUND:
            this.information = "BIOMETRIC_CHANGED";
            this.showPopup('show-biometric-info');
            break;
          case BiometricStatus.BIOMETRIC_LOCKED_OUT:
            this.information = "BIOMETRIC_TOO_MANY_ATTEMPTS";
            this.showPopup('show-biometric-info');
            break;
          case BiometricStatus.BIOMETRIC_AUTHENTICATION_FAILED:
            this.information = "BIOMETRIC_AUTH_FAILED";
            this.showPopup('show-biometric-info');
            break;
          case BiometricStatus.BIOMETRIC_PERMISSION_NOT_GRANTED:
            this.information = "BIOMETRIC_PERMISSION_NOT_GRANTED";
            this.showPopup('show-biometric-info');
            break;
          // case BiometricStatus.BIOMETRIC_DISMISSED:
            // this.information = "BIOMETRIC_CANCELED";
            // this.showPopup('show-biometric-info');
            break;
          default:
            break;
        }
      }
    });
  }


  hideBiometricLoginModal() {
    hideLoginModal()
  }



  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName) {
    this.commonMethod.closePopup(popupName);
  }
  closeAllPopup() {
    this.commonMethod.closeAllPopup();
  }
  openPopup(popupName) {
    this.commonMethod.openPopup(popupName);
  }

  onKeyUpEvent(index, event, type) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index,type).value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, type).focus();
      } else {
        this.getSpasswordElement(index,type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }
    if (eventCode === 8 || eventCode === 299) {
      // this.MPINForm.get('cpassword1').reset();
      // this.MPINForm.get('cpassword2').reset();
      // this.MPINForm.get('cpassword3').reset();
      // this.MPINForm.get('cpassword4').reset();
      // this.MPINForm.get('cpassword5').reset();
      // this.MPINForm.get('cpassword6').reset();
      // this.mPinCRows._results[0].nativeElement.focus();
      if (event.key != "Unidentified") {
        if (type == 'otp') {
          this.otpForm.get(this.otpFormInput[index])?.setValue("");
        }else   if (type == 'mpin') {
          this.MPINForm.get(this.MPINForm[index])?.setValue("");
        }

        this.getSpasswordElement(index - 1, type).focus();
      }


      // this.MPINForm.get(this.MPINForm[index]).setValue("");
      // this.getSpasswordElement(index - 1).focus();
    }
  }

  onFocusEvents(index,type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item,type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  getSpasswordElement(index, type) {
    // if (index <= 5)
    //     return this.mPinLogin._results[index].nativeElement;

        if (type == 'otp' ) {
          return this.otpPinRows._results[index].nativeElement;
        } else  if (type == 'mpin' ) {
          return this.mPinLogin._results[index].nativeElement;

        }
  }

  forgotMpin(){
    this.DataService.fromForgotMPIN = true;
    // this.commonMethod.openPopup('div.mpin-info') ;
    this.router.navigateByUrl('/forgotMpinMob');
  }

  otpSubmit(){
    if(this.otpForm.valid){
        //TODO
    } else{
      this.validateForm('otpForm')
    }
  }

  forgotFlow(routeName){
    if(routeName == 'ForgotPassword'){
      this.DataService.fromForgotMPIN = false;
      // this.router.navigateByUrl(routeName);
    }else if(routeName == 'forgotMpinMob'){
      this.DataService.fromForgotMPIN = true;
      // this.router.navigateByUrl(routeName);
    }
    this.router.navigateByUrl('/ForgotPassword')
  }

  

}

