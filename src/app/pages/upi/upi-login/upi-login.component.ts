import { Component, OnInit, NgZone, Self, HostListener, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { pageLoaderService } from '../../../services/pageloader.service';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { AppConstants } from '../../../app.constant';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { PluginService } from '../../../services/plugin-service';
import { FormValidationService } from '../../../services/form-validation.service';
import { UpiLoginService } from './upi-login.service';
import { Idle } from '@ng-idle/core';
import { BiometricStatus, RegistrationStatus } from 'src/app/utilities/app-enum';
import { Observable, Subject } from 'rxjs';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import * as moment from 'moment';
import { UpiDashboardService } from '../dashboard/upi-dashboard.service';
import { RegistrationMobCheckService } from '../../omni/pre-login/registration/registration-mob-check/registration-mob-check.service';

declare var showToastMessage: any;
declare var boxCarousel: any;
declare var showLoginModal: any;
declare var hideLoginModal: any;
declare var showMpinModel: any;
declare var hideMpinModel: any;
declare var cordova: any;
declare var device: any;

@Component({
  selector: 'app-upi-login',
  templateUrl: './upi-login.component.html',
  styleUrls: ['./upi-login.component.scss']
})

export class UpiLoginComponent implements OnInit {
  MPINForm: FormGroup;
  otpForm: FormGroup;
  sessionDecryptKey: any;
  public innerWidth: any;
  isBiometricAvailable = false;
  isBiometicChanges = true;
  fingerPrint: any;
  formInput = ['mpinInput1', 'mpinInput2', 'mpinInput3', 'mpinInput4', 'mpinInput5', 'mpinInput6'];
  otpFormInput = ['otpInput1', 'otpInput2', 'otpInput3', 'otpInput4', 'otpInput5', 'otpInput6'];
  biometricType = "";
  @ViewChildren('mPINformRow') mPinRows: any;
  @ViewChildren('OTPformRow') otpPinRows: any;

  headerdata = {
    'headerType': 'none',
    'sidebarNAv': 'none',
    // 'footertype': 'upiLoginFooter'
    'footertype': 'none'

  };

  collectAmountForm: FormGroup;
  unmaskedSubAccountNo: any = "";
  maxLengthOfAccount: any;
  information = "";
  userMailId: any;
  otpSendInterval
  otpSendTime = 90;
  showOtpTimer = false;
  showResendBtn = false;
  otpMaxReachedFlag = false;
  forgotMPINCount = 0;
  emailOtp: any;
  accountValidError: any;
  showActOtpScreen: any;
  userMobNo: any;
  otpResendCompleted: any;
  otpMaxAllowed: any;
  otpAttemptRemain: any;
  minimizedTime: any;
  calTimeDiff = false;
  minimizedOtpSendTime = 0;

  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private EncrDecr: EncryptDecryptService,
    public commonMethod: CommonMethods,
    private constant: AppConstants,
    private upiLoginService: UpiLoginService,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    public plugin: PluginService,
    private ngZone: NgZone,
    private idle: Idle,
    private formValidation: FormValidationService,
    private upiDashboardService: UpiDashboardService,
    private registrationService : RegistrationMobCheckService,
    private translate: TranslatePipe) { }

  public formErrorsMPIN = {
    mpin: ''
  };

  public formErrors = {
    mpinsValue: ''
  };

  ngOnInit(): void {
    this.ngZone.run(() => {
      if(this.DataService.bezellessIphone) {
        $("#mainDiv").addClass("pre-login");
      }
    });
    this.DataService.omniUPIFlow = false;
    this.DataService.fromOmniLogin = false;

    this.DataService.changeMessage(this.headerdata);
    this.MPINForm = this.toFormGroup(this.formInput);
    this.otpForm = this.toFormGroupOTP(this.otpFormInput);
    this.DataService.isUPILogin = false;
    this.DataService.isUPILoginFlow = false

    // boxCarousel();
    // this.buildForm();
    this.commonMethod.closeAllPopup();
    this.idle.stop();
    this.isBiometicChanges = true;
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.registerSIMChangeEvent();
    }
    
    // static data for testing start
    // console.log("setting static data for testing...");
    // this.storage.setLocalStorage("mobileNo", "9004432367");
    // this.storage.setLocalStorage("deviceId", "1632316211103pIJH4cmhEhKr9hHSQCcXNQ==");
    // this.DataService.uuid = this.plugin.getDeviceUUID();
    // this.DataService.platform = this.plugin.getDevicePlatform();
    // this.DataService.devicemodel = this.plugin.getDeviceModel();
    // this.DataService.osversion = this.plugin.getDeviceOsversion();
    // this.DataService.imei = this.plugin.getDeviceIMEI();
    // console.log("My Device Details =>");
    // console.log("IMEI = ", this.DataService.imei, " UUID = ", this.DataService.uuid, " Platform = ",this.DataService.platform, " Model = ", this.DataService.devicemodel, " OS Version = ", this.DataService.osversion);
    // console.log(this.storage.getLocalStorage("mobileNo"));
    // console.log(this.storage.getLocalStorage(this.constant.storage_deviceId));
    // console.log("DEVICE => ");
    // console.log(device);
    // static data for testing end
    this.checkRegisteredUserFlow();
    setTimeout(() => {
      this.checkBiometricAvailable();
    }, 500);
    this.initializeEvents();
  }

  initializeEvents() {
    document.addEventListener("resume", this.onResume.bind(this), false);
    document.addEventListener("pause", this.onPause.bind(this), false);
  }

  onResume() {
    this.ngZone.run(() => {
      if (this.calTimeDiff == true) {
        var diff = new Date().getTime() - this.minimizedTime.getTime()
        var secondsDiff = Math.floor(diff / 1000);
        if (secondsDiff < 90) {
          this.otpSendTime = this.minimizedOtpSendTime - secondsDiff;
        }
      }
    })
  }
  onPause() {
    this.ngZone.run(() => {
      if (this.calTimeDiff == true) {
        this.minimizedTime = new Date();
        this.minimizedOtpSendTime = this.otpSendTime
      }
    })
  }

  toFormGroup(elements) {
    const group: any = {};
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  toFormGroupOTP(elements) {
    const group: any = {
      accountNo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      // otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
    };
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  routeTo(location) {
    console.log('location', location);
    this.router.navigateByUrl(location);
  }

  closeForgotMpinPopup() {
    this.otpForm.reset();
    $('.mpin-info').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  }

  buildForm() {
    this.otpForm = new FormGroup({
      accountNo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/(^[a-z0-9A-Z]*$)/)]),
      // otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  /**
    * function to called on unsuccessfull responce
    * @subActionId
    * @resp
    */
  errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
    this.ngZone.run(() => {
      this.DataService.information = resp.Result;
      this.DataService.informationLabel = this.translate.transform('INFORMATION');
      this.DataService.primaryBtnText = this.translate.transform('OK');
      this.commonMethod.openPopup('div.popup-bottom.show-common-info');
    })
    this.MPINForm.reset();
    this.mPinRows._results[0].nativeElement.focus();
  }

  /**
   * common function to validate form 
   * @formname 
   */
  validateForm(formname) {
    if (formname == "mpin" && this.MPINForm.invalid) {
      // this.MPINForm.get('mobNumber').markAsTouched();
      this.MPINForm.markAllAsTouched();
      // this.formErrorsMPIN = this.formValidation.validateForm(this.MPINForm, this.formErrorsMPIN, true);
      return;
    }
  }

  /**
   * Login submit using mobile number
   */
  loginWithMPIN(mpin) {
    this.validateForm('mpin')
    //console.log(this.MPINForm)
    if (this.MPINForm.valid) {
      if (!this.DataService.isCordovaAvailable) {
        this.DataService.mpin = mpin;
      }
      var param = this.upiLoginService.getParamForLoginMPIN(mpin);
      this.sessionDecryptKey = this.encryptDecryptService.createMD5Value(mpin) + this.constant.sessionEncryptKey + this.storage.getLocalStorage(this.constant.storage_mobileNo);
      let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
      this.loginMPINApiCall(param, deviceID, 'mpin');
    }
  }


  checkIfLocationEnabled(mpin?: any) {
    // this.loader.showLoader();
    console.log("checkIfLocationEnabled");
    cordova.plugins.diagnostic.requestLocationAuthorization((status) => {
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
          this.proceedToCheckLocationAccurracy(mpin)
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
          this.MPINForm.reset();
          this.commonMethod.openPopup('div.popup-bottom.location-permission')
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          console.log("Permission permanently denied");
          this.MPINForm.reset();
          this.commonMethod.openPopup('div.popup-bottom.location-permission-deniedAlways')
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          console.log("Permission granted always");
          this.proceedToCheckLocationAccurracy(mpin)
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          console.log("Permission granted only when in use");
          this.proceedToCheckLocationAccurracy(mpin)
          break;
      }
    }, function (error) {
      console.error(error);
    }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);

    // this.plugin.isLocationEnabled().subscribe((data) => {
    //   console.log("location enabled data",data);
    //   if(data){
    //     this.checkLocationPermission(mpin);
    //   }
    //   else{
    //     this.loader.hideLoader();
    //     this.MPINForm.reset();
    //     this.mPinRows._results[0].nativeElement.focus();
    //     this.showPopup('enable-gps');
    //   }
    // }, err => {
    //   this.loader.hideLoader();
    //   this.MPINForm.reset();
    //   this.mPinRows._results[0].nativeElement.focus();
    //   this.showPopup('enable-gps');
    // });
  }

  proceedToCheckLocationAccurracy(mpin) {
    cordova.plugins.locationAccuracy.canRequest((canRequest) => {
      if (canRequest) {

        cordova.plugins.locationAccuracy.request((success) => {
          console.log("Successfully requested accuracy: " + success.message);
          this.loader.showLoader();
          this.checkLocationPermission(mpin);
        }, (error) => {
          console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
          if (error.code == cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
            this.MPINForm.reset();
            this.mPinRows._results[0].nativeElement.focus();
            //  if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
            cordova.plugins.diagnostic.switchToLocationSettings();
            //  }
          }
        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);

      } else {
        this.showPopup('enable-gps');
        //   
        // request location permission and try again
      }
    });
  }

  checkLocationPermission(mpin?: any) {
    this.DataService.getCurrentLatLong().subscribe((data) => {
      if (data) {
        mpin ? this.checkSimAvailable(mpin) : this.checkSimAvailable();
      } else {
        this.loader.hideLoader();
        this.MPINForm.reset();
        this.mPinRows._results[0].nativeElement.focus();
        this.showPopup('enable-location-permission');
      }
    }, err => {
      this.loader.hideLoader();
      this.MPINForm.reset();
      this.mPinRows._results[0].nativeElement.focus();
      this.showPopup('enable-location-permission');
      console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);

    });
  }

  checkSimAvailable(mpin?: any) {
    console.log("checkSimAvailable ====>" + mpin);
    this.plugin.checkSIMAvailable().subscribe((response) => {
      this.loader.hideLoader();
      this.ngZone.run(() => {
        console.log("checkSIMAvailable Success => ", response);
        if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
          if (response.isSimActive) {
            if (mpin) {
              console.log("checkSimAvailable ====> loginMPINApiCall");
              this.DataService.mpin = mpin;
              var param = this.upiLoginService.getParamForLoginMPIN(mpin);
              this.sessionDecryptKey = this.encryptDecryptService.createMD5Value(mpin) + this.constant.sessionEncryptKey + this.storage.getLocalStorage(this.constant.storage_mobileNo);
              let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
              this.loginMPINApiCall(param, deviceID, 'mpin');
            } else {
              console.log("checkSimAvailable ====> upiLoginBiometric/upiLoginFaceId");
              if (this.fingerPrint) {
                this.upiLoginBiometric();
              } else {
                this.upiLoginFaceId();
              }
            }
          } else {
            this.MPINForm.reset();
            this.mPinRows._results[0].nativeElement.focus();
            this.commonMethod.closeAllPopup();
            this.DataService.informationLabel = this.translate.transform('INFORMATION');
            this.DataService.informationDetails = this.translate.transform('NO_SIM_AVAILABLE');
            this.DataService.primaryBtnText = this.translate.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.no-sim-available');
            return;
          }

        } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
          //iOS handling - check for true & false
          if (response == true || response == "true") {

            if (mpin) {
              console.log("checkSimAvailable ====> loginMPINApiCall");
              this.DataService.mpin = mpin;
              var param = this.upiLoginService.getParamForLoginMPIN(mpin);
              this.sessionDecryptKey = this.encryptDecryptService.createMD5Value(mpin) + this.constant.sessionEncryptKey + this.storage.getLocalStorage(this.constant.storage_mobileNo);
              let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
              this.loginMPINApiCall(param, deviceID, 'mpin');
            }
            else {
              console.log("checkSimAvailable ====> upiLoginBiometric/upiLoginFaceId");
              if (this.fingerPrint) {
                this.upiLoginBiometric();
              } else {
                this.upiLoginFaceId();
              }
            }

          } else {
            this.MPINForm.reset();
            this.mPinRows._results[0].nativeElement.focus();
            this.commonMethod.closeAllPopup();
            this.DataService.informationLabel = this.translate.transform('INFORMATION');
            this.DataService.informationDetails = this.translate.transform('NO_SIM_AVAILABLE');
            this.DataService.primaryBtnText = this.translate.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.no-sim-available-ios');
            return;
          }
        } else {
          console.log("Unknown platform");
        }
      });
    });
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  getMPINValue() {
    var mpin = "";
    //console.log(this.MPINForm.controls);
    for (const field in this.MPINForm.controls) { // 'field' is a string
      const control = this.MPINForm.get(field); // 'control' is a FormControl  
      //console.log("value", control.value);
      if (!control.hasError('required')) {
        mpin += control.value;
        //console.log(mpin);
      }
    }
    return mpin;
  }

  getOTPValue() {
    var otp = "";
    //console.log(this.MPINForm.controls);
    for (const field in this.otpForm.controls) { // 'field' is a string
      const control = this.otpForm.get(field); // 'control' is a FormControl  
      //console.log("value", control.value);
      if (!control.hasError('required') && field != 'accountNo') {
        otp += control.value;
        //console.log(mpin);
      }
    }
    return otp;
  }

  clearAllInputs() {
    this.MPINForm.reset();
    this.otpForm.reset();
  }

  getSpasswordElement(index, type) {
    //console.log(this.mPinRows);
    if (index <= 5)
      if (type == 'spassword') {
        return this.mPinRows._results[index]?.nativeElement;
      } else {
        return this.otpPinRows._results[index]?.nativeElement;
      }
  }

  onKeyUpEvent(index, event, type) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, type)?.value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, type)?.focus();
      } else {
        this.getSpasswordElement(index, type)?.blur();
        // Submit code
        console.log('submit code ');
        ////console.log(this.getMPINValue());
        if (type == 'spassword') {
          let mpin = this.getMPINValue();
          this.loginWithMPIN(mpin);
        } else {
          this.emailOtp = this.getOTPValue();
        }
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type)?.focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        this.MPINForm.get(this.formInput[index]).setValue("");
        this.getSpasswordElement(index - 1, type)?.focus();
      }
    }
  }

  onFocusEvent(index, type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  /**
* api call for login
* @Param get request in encrypted format
* @loginType
*/
  loginMPINApiCall(param, deviceID, loginType) {
    this.http.callBankingAPIService(param, deviceID, this.constant.upiserviceName_UPILOGIN, true).subscribe(data => {
      console.log("Success Received from Service ...");
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        console.log('resp.Session', resp.Session);
        // alert("Response session key = "+ resp.Session);
        console.log('2 this.sessionDecryptKey', this.sessionDecryptKey);
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
        // alert('Decrypted sessionKey = ' +sessionKey);
        //handle null or empty session
        if (this.commonMethod.validateEmpty(sessionKey)) {
          this.ngZone.run(() => {
            this.DataService.information = "Invalid Credentials.";
            this.DataService.informationLabel = this.translate.transform('INFORMATION');
            this.DataService.primaryBtnText = this.translate.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.show-common-info');
          })
          this.MPINForm.reset();
          this.mPinRows._results[0].nativeElement.focus();
          return;
        }
        this.storage.setSessionStorage(this.constant.val_sessionKey, sessionKey);
        this.storage.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
        this.storage.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
        this.storage.setLocalStorage(this.constant.storage_isMPINEnable, resp.isMPINEnable);
        this.storage.setLocalStorage(this.constant.storage_isUPIUser, resp.isUPIUser);
        this.DataService.regUPICustData.customerName = resp.name;
        this.DataService.userName = resp.name;
        // this.DataService.regUPICustData.lastLogin = resp.LastLoginTime;
        this.DataService.regUPICustData.lastLogin = moment(resp.LastLoginTime).utcOffset(330).format('DD MMM yyyy, hh:mm:ss a');
        console.log('lastLogin DateTime => ', this.DataService.regUPICustData.lastLogin);

        // this.DataService.setUPIDetails(resp);
        // this.DataService.invokeBiometricCheck();
        this.DataService.mobStaticEncKey = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey
        this.idle.watch();
        this.DataService.isUPILogin = true;
        this.DataService.vpaAddressList = [];
        this.DataService.isLogOut = false;
        this.fetchVPAAdressList();
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  /**
   * Fetch VPA Address List
   */
  fetchVPAAdressList() {
    if (this.DataService.vpaAddressList.length == 0) {
      this.upiDashboardService.getUserLocation();
      var param = this.upiDashboardService.getVPAAddressListAPICall();
      let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId)
      this.UpiApiCall(param, deviceId)
    }
  }


  /**
     * called for biometric authrntication
     */

  upiLoginWithBioMetric(fingerPrint) {
    console.log("upiLoginWithBioMetric ====>");

    this.plugin.authenticateBiometric('Login to Punjab & Sind Bank').then((result) => {
      this.hideBiometricLoginModal();
      console.log("upiLoginWithBioMetric ====>" + result);
      if (result == true) {
        this.loader.showLoader();
        this.fingerPrint = fingerPrint;
        if (fingerPrint) {
          this.upiLoginBiometric();
        } else {
          this.upiLoginFaceId();
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
            this.isBiometicChanges = false;
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
          //   this.information = "BIOMETRIC_CANCELED";
          //   this.showPopup('show-biometric-info');
          // break;
          default:
            break;
        }
      }
    });
  }

  closePopup(popupName) {
    this.commonMethod.closePopup(popupName);
    if(popupName == 'div.popup-bottom.non-psb'){
      this.DataService.routeWithNgZone('LandingPage');
    }
  }

  openPopup(popupName) {
    this.commonMethod.openPopup(popupName);
  }



  /**
   * check biometric avaialable
   */

  checkBiometricAvailable() {
    // this.DataService.upiLogoutObservable.subscribe((msg:any)=>{
    //   if(msg){
    //     this.information = msg;
    //     this.openPopup('div.popup-bottom.show-biometric-info');
    //   }
    // });
    console.log("checkIfBiometricAvailable =====>");
    this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
      console.log("checkIfBiometricAvailable =====>" + biometricResult);
      if (biometricResult.available == true) {
        // TODO : get biometric already set or not
        this.isBiometricAvailable = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y ? true : false;
        // alert("Login - isBiometricAvailable = " + this.isBiometricAvailable);
        this.biometricType = biometricResult.result;
        console.log("biometricType =====>" + this.biometricType);

        if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
          if (this.isBiometricAvailable) {
            (this.biometricType == 'finger' || this.biometricType == 'biometric') ? this.showBiometricLoginModal(true) : this.showBiometricLoginModal(false);
          }
        }
        else {
          if (!this.DataService.isLogOut && this.isBiometricAvailable) {
            setTimeout(() => {
              (this.biometricType == 'finger' || this.biometricType == 'biometric') ? this.showBiometricLoginModal(true) : this.showBiometricLoginModal(false);
            }, 200);
          }
        }
      }
    });
  }



  /**
   * Login submit using Biometric
   */

  upiLoginBiometric() {
    var param = this.upiLoginService.getParamForLoginBiometric();
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    console.log('deviceID', deviceID);
    console.log('this.constant.sessionEncryptKey', this.constant.sessionEncryptKey);
    console.log('this.DataService.uuid', this.DataService.uuid);
    this.sessionDecryptKey = deviceID + this.constant.sessionEncryptKey + this.DataService.uuid + this.storage.getLocalStorage(this.constant.storage_mobileNo);
    console.log('1 this.sessionDecryptKey', this.sessionDecryptKey);
    // alert("static key = " + this.sessionDecryptKey);
    if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.loginMPINApiCall(param, deviceID, 'bioMetric');
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      setTimeout(() => {
        this.loginMPINApiCall(param, deviceID, 'bioMetric');
      }, 100);
    } else {
      console.log("Unknown platform...");
    }
  }

  /**
   * Login submit using FaceId
   */

  upiLoginFaceId() {
    console.log("login with face id ================>");
    var param = this.upiLoginService.getParamForLoginFaceId();
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.sessionDecryptKey = deviceID + this.constant.sessionEncryptKey + this.DataService.uuid + this.storage.getLocalStorage(this.constant.storage_mobileNo);
    console.log("this.sessionDecryptKey");
    console.log(deviceID);
    console.log(this.constant.sessionEncryptKey);
    console.log(this.DataService.uuid);
    console.log(this.storage.getLocalStorage(this.constant.storage_mobileNo));
    if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.loginMPINApiCall(param, deviceID, 'faceId');
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      setTimeout(() => {
        this.loginMPINApiCall(param, deviceID, 'faceId');
      }, 100);
    } else {
      console.log("Unknown platform...");
    }
  }


  showBiometricLoginModal(fingerPrint) {
    if (fingerPrint) { }
    this.upiLoginWithBioMetric(fingerPrint)
  }

  hideBiometricLoginModal() {
    hideLoginModal()
  }


  getParamForgotMPINAccountBankingService(otpFlag) {
    // var param = this.upiLoginService.getAccountDetailsForForgotMPINParam();
    var param = this.upiLoginService.getForgotMpinOtpParam(otpFlag)
    let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId);
    //this.UpiApiCall(param, deviceId);
    this.forgotMpinOtpApiCall(param, deviceId);
    //this.routeTo("/setNewMpin");
    // this.callAccountDetailsForForgotMPINBankingService(param);
  }


  submitOTP(otpFlag) {
    console.log("Inside Submit OTP")
    this.showActOtpScreen = otpFlag == 'N' ? 'ACT' : 'OTP';
    this.formValidation.markFormGroupTouched(this.otpForm);
    // if (this.otpForm.valid) {
    this.validateOtpNAccount(this.emailOtp, otpFlag);
    // }
  }

  processMaskedAccount(inputText) {
    var output = [];
    var json = inputText.split(' ');
    json.forEach(function (item) {
      output.push(item.replace(/\'/g, '').split(/(\d+)/).filter(Boolean));
    });
    return output;
  }

  validateOtpNAccount(emailOtp, otpFlag) {
    // var param = this.upiLoginService.getOtpValidationForForgotMPINParam(this.otpForm.value, this.unmaskedSubAccountNo)
    // let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId);
    // // this.callGetVPAListBankingService(param);
    // this.UpiApiCall(param, deviceId);

    var param = this.upiLoginService.getForgotMpinValidateOtpParam(this.otpForm.value, this.unmaskedSubAccountNo, emailOtp, otpFlag)
    let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.forgotMpinValidateOtpApiCall(param, deviceId);
  }



  UpiApiCall(request, deviceId) {
    this.http.callBankingAPIService(request, deviceId, this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log("UPI Login API Success");
      let response = data.responseParameter.upiResponse;
      console.log(response);
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEFORGOTMPINDETAILS:
            console.log(response);
            this.otpForm.reset();
            this.closeForgotMpinPopup();
            this.routeTo("/setNewMpin");
            break;
          case this.constant.upiserviceName_GETFORGOTMPINDEFAULTACCOUNT:
            console.log(response);
            let output = response.responseParameter.MASKED_ACCNUMBER;
            // this.maxLengthOfAccount = output.slice(output.length - 4).length;
            this.maxLengthOfAccount = output.substring(1, output.length - 4).length + 1;
            //this.unmaskedSubAccountNo = output.substring(0, output.length - 4);
            this.userMailId = this.commonMethod.maskEmailId(data.responseParameter.email_id);
            this.unmaskedSubAccountNo = output.substr(output.length - 4);
            showMpinModel();

            break;
          case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
            console.log("GETPAYMENTADDRESSLISTDETAILS => ", response);
            this.DataService.vpaAddressList = this.DataService.processVPAlist(response.responseParameter.addresslist);
            console.log('this.DataService.vpaAddressList', JSON.stringify(this.DataService.vpaAddressList));
            this.DataService.routeWithNgZone('upiDashboard');
            break;
          default:
            break;
        }
      } else {
        if (response.subActionId == this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS) {
          this.DataService.routeWithNgZone('upiDashboard');
        } else {
          showToastMessage(response.msg, "error");
          this.otpForm.reset();
          this.closeForgotMpinPopup();
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  checkRegisteredUserFlow(){
    if(this.storage.getLocalStorage(this.constant.storage_omniRegisteredUser)){
      this.DataService.omniUPIFlow = true;
    }else{
      this.DataService.isUPILoginFlow = true;
      this.DataService.omniUPIFlow = false;
    }
  }

  /**
   * api call to get transaction history
   * @param
   */
  forgotMpinOtpApiCall(request, deviceId) {
    this.http.callBankingAPIService(request, deviceId, this.constant.upiserviceName_UPIFORGOTMPINSENDOTP, true).subscribe(data => {
      console.log(data);
      let response = data.responseParameter.upiResponse ? data.responseParameter.upiResponse : data.responseParameter;
      let toastMsg = response.msg ? response.msg : response.Result;
      if (response.status == "00") {
        let response = data.responseParameter.upiResponse;
        let output = response.responseParameter.MASKED_ACCNUMBER;
        // this.maxLengthOfAccount = output.slice(output.length - 4).length;
        this.maxLengthOfAccount = output.substring(1, output.length - 4).length + 1;
        //this.unmaskedSubAccountNo = output.substring(0, output.length - 4);
        this.userMailId = this.commonMethod.maskEmailId(data.responseParameter.email_id);
        this.unmaskedSubAccountNo = output.substr(output.length - 4);
        showMpinModel();
      } else if (response.status == "02") {
        this.forgotMPINFlow('Y');
      } else if (response.opstatus == "00") {
        let response = data.responseParameter;
        this.userMailId = this.commonMethod.maskEmailId(response.email_id);
        this.userMobNo = this.commonMethod.maskNumber(this.storage.getLocalStorage(this.constant.storage_mobileNo))
        showMpinModel();
        this.otpAttemptRemain = (parseInt(response.otpMaxAllowed) - parseInt(response.otpResendCompleted)) == 0 ? "NO" : (parseInt(response.otpMaxAllowed) - parseInt(response.otpResendCompleted));
        showToastMessage(this.translate.transform("OTP_SEND_MSG") + '</br>' + this.translate.transform(this.otpAttemptRemain) + ' ' + this.translate.transform("OTP_ATTEMPT_REMAIN"), "success");
        this.otpResendCompleted = response.otpResendCompleted;
        this.otpMaxAllowed = response.otpMaxAllowed;
        if (response.otpResendCompleted < response.otpMaxAllowed) {
          // this.getParamForgotMPINAccountBankingService(otpFlag);
          this.otpMaxReachedFlag = false;
          this.processOtpSendTimer();
        } else {
          this.showResendBtn = false;
          this.otpMaxReachedFlag = true;
          // this.showActOtpScreen = otpFlag == 'N' ? 'ACT' : 'OTP';
        }
      } else if (response.opstatus == "02" && (this.otpResendCompleted == this.otpMaxAllowed)) {
        showToastMessage(this.translate.transform("OTP_LIMIT_EXCEED"), "error");
        this.closeForgotMpinPopup();
      } else if (response.opstatus == "02") {
        showToastMessage(this.translate.transform(toastMsg), "error");
      } else {
        showToastMessage(this.translate.transform(toastMsg), "error");
      }
    });
  }

  /**
   * api call to validate otp for forgot mpin 
   * @request
   * @deviceId
   */
  forgotMpinValidateOtpApiCall(request, deviceId) {
    this.http.callBankingAPIService(request, deviceId, this.constant.upiserviceName_UPIFORGOTMPINVALIDATEOTP, true).subscribe(data => {
      let response = data.responseParameter.upiResponse ? data.responseParameter.upiResponse : data.responseParameter;
      let toastMsg = response.msg ? response.msg : response.Result;
      if (response.status == "00") {
        this.showActOtpScreen = 'OTP';
        this.forgotMPINFlow('Y');
        // this.routeTo("/setNewMpin");
        // else if (response.status == "01") {
        //   this.accountValidError = response.msg
        //   this.showPopup('enable-location-permission');
        // }
      } else if (response.opstatus == "00") {
        this.closeForgotMpinPopup();
        this.routeTo("/setNewMpin");
      } else if (response.opstatus == "04") {
        showToastMessage(this.translate.transform(toastMsg), "error");
        this.otpForm.reset();
      } else {
        showToastMessage(this.translate.transform(toastMsg), "error");
        this.otpForm.reset();
        // this.closeForgotMpinPopup();
      }
    });
  }

  closeInvalidAccPopup() {
    this.closePopup('div.popup-bottom.show-forgotMpin-error');
    this.forgotMPINFlow('N');
  }

  openMpinMode() {
    showMpinModel();
  }


  forgotMPINFlow(otpFlag) {
    this.isBiometricAvailable = false;
    this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric, this.constant.val_localStorage_N); // reset fingure print option
    // this.otpForm.reset();
    this.emailOtp = '';
    this.showActOtpScreen = otpFlag == 'N' ? 'ACT' : 'OTP';
    clearInterval(this.DataService.otpSendInterval);
    if (this.unmaskedSubAccountNo.length == 4 && otpFlag == 'N') {
      showMpinModel();
      // this.processOtpSendTimer();
    } else if (this.unmaskedSubAccountNo.length == 4 && otpFlag == 'Y') {
      // this.forgotMPINCount = this.forgotMPINCount + 1;
      // if (this.forgotMPINCount < 3) {
      this.getParamForgotMPINAccountBankingService(otpFlag);
      //   this.processOtpSendTimer();
      // } else {

      // }
    } else {
      this.getParamForgotMPINAccountBankingService(otpFlag);
    }
  }

  processOtpSendTimer() {
    // showToastMessage(this.translate.transform("OTP_SEND_MSG"), "success");
    console.log('otpSend Start')
    this.otpSendTime = 90;
    this.DataService.otpSendInterval = undefined;
    this.showResendBtn = false;
    this.setTimer();
  }

  setTimer() {
    this.DataService.otpSendInterval = setInterval(() => {
      if (this.otpSendTime > 0) {
        this.otpSendTime = this.otpSendTime - 1;
        this.calTimeDiff = true;
      } else {
        this.otpSendTime = 90;
        this.showResendBtn = true;
        this.calTimeDiff = false;
        this.ngZone.run(() => {
          this.showOtpTimer = false;
        });
        clearInterval(this.DataService.otpSendInterval);
      }
    }, 1000);
  }

  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }


  canDeactivate(): Observable<boolean> | boolean {
    if (this.DataService.disableBack) {
      return false;
    }
    else return true;
  }

  enableGPS() {
    this.closePopup('div.popup-bottom.enable-gps');
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.MPINForm.reset();
      this.mPinRows._results[0].nativeElement.focus();
      this.plugin.switchOnLocation();
    }
    else {
      this.checkAuthorization();
    }
  }


  enableLocation() {
    this.closePopup('div.popup-bottom.enable-location-permission');
    console.log("Opening native settings for login -> location...");
    this.plugin.gotoSetting().subscribe((status) => {
      console.log("gotoSetting=====>", status);
    }, (err) => {
      console.log("gotoSetting error", err);
    });
  }

  checkAuthorization() {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(this.evaluateAuthorizationStatus, this.onError);
  }

  evaluateAuthorizationStatus(status) {
    switch (status) {
      case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
        console.log("Permission not requested");
        this.requestAuthorization();
        break;
      case cordova.plugins.diagnostic.permissionStatus.DENIED:
        console.log("Permission denied");
        break;
      case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
        this.commonMethod.openPopup('div.popup-bottom.location-permission')
        break;
      case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
        console.log("Permission permanently denied");
        // cordova.plugins.diagnostic.switchToSettings();
        this.commonMethod.openPopup('div.popup-bottom.location-permission-deniedAlways')
        break;
      case cordova.plugins.diagnostic.permissionStatus.GRANTED:
        console.log("Permission granted always");
        break;
    }
  }

  onError(error) {
    console.error("The following error occurred: " + error);
  }



  requestAuthorization() {
    cordova.plugins.diagnostic.requestLocationAuthorization(this.evaluateAuthorizationStatus, this.onError);
  }

  registerSIMChangeEvent() {
    this.plugin.registerSIMChangeEvent().subscribe((response) => {
      console.log('registerSIMChangeEvent ', JSON.stringify(response))
    })
  }


  goToSettings() {
    this.closePopup('div.popup-bottom.location-permission-deniedAlways')
    cordova.plugins.diagnostic.switchToSettings(function () {
      console.log("Successfully switched to Settings app");
    }, function (error) {
      console.error("The following error occurred: " + error);
    });
  }
  
   /**
   * This function will validate if sim binding is done or not
   */
    gotoRegister(): void {
      // this.router.navigateByUrl('/upiRegistration');
      this.DataService.omniRegistrationFlow = true;
      this.DataService.upiRegistrationFlow = false;
      if (!this.storage.hasKeyLocalStorage(this.constant.storage_simBindingSuccess)) {
        //this.router.navigateByUrl('/smsVerification');
        this.DataService.routeWithNgZone(["/smsVerification"]);
      } else {
        let mobileNo = this.storage.getLocalStorage(this.constant.storage_mobileNo);
        var param = this.registrationService.getmobileNoCheckParam({ 'mobNumber': mobileNo });
        this.mobileNoCheckApiCall(param, mobileNo)
      }
    }
   /**
  * api call to validate mobile number
  * @param
  */
    mobileNoCheckApiCall(param, mobileNo) {
      this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_MOBILENOCHECK).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.DataService.registrationData = data.responseParameter;
          this.DataService.registrationSecQue = data.set != undefined ? data.set?.records[0] : '';
          //TODO: binding records is not required now
          // back button is hidden for onmi channel
          //this.bindExistingRecord(this.DataService.registrationData,JSON.stringify(this.DataService.registrationSecQue));
          this.storage.setLocalStorage(this.constant.storage_simBindingSuccess, "true")
          this.storage.setLocalStorage(this.constant.storage_mobileNo, mobileNo);
          this.storage.setLocalStorage(this.constant.storage_deviceId, resp.deviceId);
          this.storage.setLocalStorage(this.constant.storage_isTpinAvl, resp.isTpinAvl);
          this.storage.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
          this.storage.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
          this.storage.setLocalStorage(this.constant.storage_isBiomertric, resp.isBiomertric);
          this.DataService.mobStaticEncKey = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey; 
          this.DataService.userRegStaus = this.DataService.registrationData.RegistrationSuccess;
          console.log("storage_MPIN =====>"+this.storage.getLocalStorage(this.constant.storage_isMBUser));
          var nextPageURL: string = '';
          if (resp.ISCBS == 'N') {
            this.commonMethod.openPopup('div.popup-bottom.non-psb');
            // nextPageURL = "/LandingPage";
            // this.showCommonToastMsgWithKey("MOBILE_NOT_REG_BANK", "error");
          } else {
            if(resp.omniRegistrationStatus.toUpperCase() == 'Y'){
              this.storage.setLocalStorage(this.constant.storage_omniRegisteredUser, "true");
              if (this.constant.getPlatform() == "web") {
                nextPageURL = "/login";
              }
              else {
                nextPageURL = "/loginMobile";
              }
            }
            else{
              this.DataService.regType = 'retail';
              //If not omni registered will go to omni registration
              nextPageURL = "/registration";
            }
          }
  
          if (nextPageURL != "") {
            this.DataService.routeWithNgZone([nextPageURL])
          }
        }else if (resp.opstatus == "01") {
          this.commonMethod.openPopup('div.popup-bottom.non-psb')
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
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