import { Location } from '@angular/common';
import { flatten } from '@angular/compiler';
import { Component, OnInit, ViewChildren, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../services/data.service';
import { SetMpinService } from './set-mpin.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { BiometricStatus } from 'src/app/utilities/app-enum';
// declare var moboVerification: any;
// declare var showBiometricModal: any;
// declare var hideBiometricModal: any;
declare var showToastMessage: any;
declare var window:any;

@Component({
  selector: 'app-set-mpin',
  templateUrl: './set-mpin.component.html',
  styleUrls: ['./set-mpin.component.scss']
})

export class SetMpinComponent implements OnInit {

  // form: FormGroup;
  mpinForm: FormGroup;
  oldMpinValues: any = [];
  validMpin: boolean = false;
  validConfirmMpin: boolean = false;
  mpinMatch: boolean = true;
  isBiometricAvailable = false;
  biometricType = "";
  informationLabel = "";
  information = "";

  formInput = ['mpinInput1', 'mpinInput2', 'mpinInput3', 'mpinInput4', 'mpinInput5', 'mpinInput6', 'confirmMpinInput1', 'confirmMpinInput2', 'confirmMpinInput3', 'confirmMpinInput4', 'confirmMpinInput5', 'confirmMpinInput6'];
  biometriSelectedOption: any;
  sessionDecryptKey: any;


  @ViewChildren('mPINformRow') mPinRows: any;
  @ViewChildren('confirmMPINformRow') confirmMPinRows: any;

  public confMpinError = "";
  public mpinError = ""
  // repeatedDigits: boolean = false;
  // consecutiveDigits: boolean = false;


  headerdata = {
    'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
    'titleName': '',            // Note : add titlename if headerType = TitleHeader
    'footertype': 'none' //Options: upiFooter , none
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dataService: DataService,
    private formValidation: FormValidationService,
    private localStorageService: LocalStorageService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private setMpinService: SetMpinService,
    private location: Location,
    private commonMethod: CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private plugin: PluginService,
    private translate: TranslatePipe,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // this.dataService.removePreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.dataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });
    history.pushState({}, 'personalInfo', this.location.prepareExternalUrl("personalInfo"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.mpinForm = this.toFormGroup(this.formInput);
    this.dataService.changeMessage(this.headerdata);
    // moboVerification();
    this.buildForm();
    this.callMpinAPI();
    // this.checkBiometricAvailable();
    // this.biometriSelectedOption = "nooption";
    this.dataService.isFromMpinPage = false;
  }

  showBiometricModal() {
    // showBiometricModal()
    this.commonMethod.openPopup('div.popup-bottom.confirmation');
  }

  hideBiometricModal() {
    this.dataService.regUPICustData.isBIOMETRICEnable = "N";
    this.localStorageService.setLocalStorage(this.constant.key_localStorage_isBiometric, 'N');
    this.localStorageService.setLocalStorage(this.constant.storage_isCheckBiometric, "false");
    this.commonMethod.closePopup('div.popup-bottom.confirmation');
    this.callBankingService();
  }

  buildForm() {
    // this.mpinForm = new FormGroup({
    //   mpin: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   confirmpin: new FormControl('', [Validators.required,  Validators.minLength(6)]),
    // },{
    //     validators: [this.checkMpinMatch.bind(this)]
    //   });
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

  callMpinAPI() {
    //to check last 3 MPINs
    // this.oldMpinValues = response array
  }

  validateForm() {
    //check form validity
    if (this.mpinForm.invalid) {
      this.mpinError = "";
      this.confMpinError = "";
      this.formValidation.markFormGroupTouched(this.mpinForm);
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

  // checkMpinMatch(formGroup: FormGroup) {
  //   const { value: mpin } = formGroup.get('mpin');
  //   const { value: confirmpin } = formGroup.get('confirmpin');
  //   return mpin === confirmpin ? null : { passwordNotMatch: true };
  // }

  checkMpinMatch(mpinVal, confirmMpinVal) {
    if (mpinVal === confirmMpinVal) {
      return true;
    } else {
      return false;
    }
  }

  submitForm() {
    this.validateForm();
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
        // if(this.dataService.upiRegistrationFlow) {
        if (this.dataService.isCordovaAvailable) {
          this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
            if (biometricResult && biometricResult.available == true) {
              this.biometricType = biometricResult.result;
              this.dataService.upiRegistrationFlow = true;
              this.dataService.isFromMpinPage = true;
              // this.biometriSelectedOption = "nooption";
              // if (this.isBiometricAvailable) {
              this.showBiometricModal();
              // } else {
              //   this.commonMethod.closePopup('div.popup-bottom.confirmation');
              //   this.callBankingService();
              // }
            } else {
              this.hideBiometricModal();
            }
          })
        } else {
          //this is just for testing purpose on the browser
          this.commonMethod.closePopup('div.popup-bottom.confirmation');
          this.callBankingService();
        }
        // if (this.dataService.isBiometric == 'Y') {
        //   this.dataService.upiRegistrationFlow = true;
        //   // this.biometriSelectedOption = "nooption";
        //   if (this.isBiometricAvailable) {
        //     this.showBiometricModal();
        //   } else {
        //     this.commonMethod.closePopup('div.popup-bottom.confirmation');
        //     this.callBankingService();
        //   }
        //   // this.router.navigate(['/upiRegistrationSuccess']);
        // } else {
        //   this.biometricCheck()
        // }
      }
      // else {

      //   this.dataService.omniRegistrationFlow = true;
      //   //Omni flow
      // }
    }
  }

  thumbClick() {
    this.biometriSelectedOption = "biometric";
    this.dataService.regUPICustData.isBIOMETRICEnable = "Y";
  }

  faceClick() {
    this.biometriSelectedOption = "faceid";
    this.dataService.regUPICustData.isBIOMETRICEnable = "Y";
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  toFormGroup(elements) {
    const group: any = {};
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
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
    for (const field in this.mpinForm.controls) { // 'field' is a string
      const control = this.mpinForm.get(field); // 'control' is a FormControl
      if (field.includes('confirmMpin') && !control.hasError('required')) {
        confirmMPIN += control.value;
      }
    }
    return confirmMPIN;
  }

  keyUpEvent(type, event, index) {
    let pos = index;
    var key = event.keyCode || event.which;
    // if (event.keyCode === 8 && event.which === 8 ) {
    if (key === 8) {
      // pos = index - 1;
      pos = 0;
      if (type == 'mpin') {
        this.mpinForm.patchValue({
          mpinInput1: "",
          mpinInput2: "",
          mpinInput3: "",
          mpinInput4: "",
          mpinInput5: "",
          mpinInput6: "",
        })
        this.mPinRows._results[0].nativeElement.focus();
      } else {
        this.mpinForm.patchValue({
          confirmMpinInput1: "",
          confirmMpinInput2: "",
          confirmMpinInput3: "",
          confirmMpinInput4: "",
          confirmMpinInput5: "",
          confirmMpinInput6: "",
        })
        this.confirmMPinRows._results[0].nativeElement.focus();
      }

    } else {
      pos = index + 1;
    }
    if (type == 'mpin') {
      if (pos > -1 && pos < 6) {
        this.mPinRows._results[pos].nativeElement.focus();
      }
    } else {
      if (pos > -1 && pos < 6) {
        this.confirmMPinRows._results[pos].nativeElement.focus();
      }
    }
  }

  /**
  * function to set mpin
  * @param
  */
  setUPIMpinAPIcall(param) {
    this.http.callBankingAPIService(param, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_UPIREG, true).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if(this.dataService.platform.toLowerCase() == this.constant.val_android) this.plugin.enableSmartIntent(true);
        this.dataService.userUpiRegStaus = resp.Result;
        this.dataService.mpin = this.getMPINValue();
        this.getParamForSoftLogin()
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
    if (resp.opstatus == "02" || resp.opstatus == "03") {
      showToastMessage(resp.Result, "error");
    }
  }

  checkFlow() {
    if (this.dataService.upiRegistrationFlow) {
      this.dataService.upiRegistrationFlow = true;
      this.localStorageService.setLocalStorage(this.constant.storage_isUpiRegistrationSuccess, "true");
      this.checkForExistingVPA();
    } else {
      this.dataService.omniRegistrationFlow = true;
      //Omni flow
    }
  }

  biometricCheck() {
    this.commonMethod.closePopup('div.popup-bottom.confirmation');
    this.localStorageService.setLocalStorage(this.constant.storage_isCheckBiometric, "false");
    this.plugin.authenticateBiometric('Fingerprint/FaceID Authentication').then((result) => {
      console.log(result);
      if (result == true) {
        this.information = this.translate.transform('FINGERPRINT_FACEID_AUTH_ENABLED');
        this.dataService.regUPICustData.isBIOMETRICEnable = "Y";
        this.localStorageService.setLocalStorage(this.constant.key_localStorage_isBiometric, 'Y');
        this.callBankingService();
      }
      else {
        this.informationLabel = this.translate.transform('INFORMATION');
        switch (result.code) {
          case BiometricStatus.BIOMETRIC_LOCKED_OUT_PERMANENT:
            this.information = this.translate.transform("BIOMETRIC_DISABLED");
            this.showPopup('show-biometric-info-popup');
            break;
          case BiometricStatus.BIOMETRIC_LOCKED_OUT:
            this.information = this.translate.transform("BIOMETRIC_TOO_MANY_ATTEMPTS");
            this.showPopup('show-biometric-info-popup');
            break;
          case BiometricStatus.BIOMETRIC_AUTHENTICATION_FAILED:
            this.information = this.translate.transform("BIOMETRIC_AUTH_FAILED");
            this.showPopup('show-biometric-info-popup');
            break;
          case BiometricStatus.BIOMETRIC_PERMISSION_NOT_GRANTED:
            this.information = this.translate.transform("BIOMETRIC_PERMISSION_NOT_GRANTED");
            this.showPopup('show-biometric-info-popup');
            break;
          // case BiometricStatus.BIOMETRIC_DISMISSED:
          //   this.information = this.translate.transform("BIOMETRIC_CANCELED");
          //   this.showPopup('show-biometric-info-popup');
          //   break;

          // case BiometricStatus.BIOMETRIC_UNKNOWN_ERROR:
          //   this.information = this.translate.transform("BIOMETRIC_CANCELED");
          //   this.showPopup('show-biometric-info-popup');
          //   break;
          default:
            break;
        }
      }
    });

    //need to handel later when both faceId and biometric is avaiable
    // if (this.biometriSelectedOption == 'faceid' || this.biometriSelectedOption == 'biometric') {
    //   this.commonMethod.closePopup('div.popup-bottom.confirmation');
    //   this.plugin.authenticateBiometric('Fingerprint/FaceID Authentication').then((result) => {
    //     console.log(result);
    //     if (result == true) {
    //       this.dataService.regUPICustData.isBIOMETRICEnable = "Y";
    //       this.localStorageService.setLocalStorage(this.constant.key_localStorage_isBiometric, 'Y');
    //     }
    //     this.callBankingService();
    //   });

    // } else {
    //   this.biometriSelectedOption = "nooption";
    //   this.commonMethod.closePopup('div.popup-bottom.confirmation');
    //   this.callBankingService();
    // }
  }


  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  /**
  * Close biometric popup and logout user.
  */
  closeBiometricInfoPopup() {
    this.information = "";
    this.commonMethod.closeAllPopup();
  }

  callBankingService() {
    var param = this.setMpinService.getSetMPINParam(this.getMPINValue());
    this.setUPIMpinAPIcall(param);
  }


  backClick() {
    this.location.back();
  }

  getParamForSoftLogin() {
    let mpin = this.dataService.mpin
    var param = this.setMpinService.getParamForLoginMPIN(mpin);
    this.sessionDecryptKey = this.encryptDecryptService.createMD5Value(mpin) + this.constant.sessionEncryptKey + this.localStorageService.getLocalStorage(this.constant.storage_mobileNo);
    let deviceID = this.localStorageService.getLocalStorage(this.constant.storage_deviceId);
    this.loginMPINApiCall(param, deviceID, 'mpin');
  }

  /**
 * api call for login
 * @Param get request in encrypted format
 * @loginType
 */
  loginMPINApiCall(param, deviceID, loginType) {
    this.http.callBankingAPIService(param, deviceID, this.constant.upiserviceName_UPILOGIN, true).subscribe(data => {
      console.log("Implicit UpiLogin API Response => ", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
        //handel null or empty session
        if (this.commonMethod.validateEmpty(sessionKey)) {
          // showToastMessage("Invalid Credentials.", "error");
          console.log("Invalid Credentials.");
          return;
        }
        //TODO: Set all required data from Upilogin success (refer UPI Login Component => LoginWithMpinApiCall() success block)
        this.localStorageService.setSessionStorage(this.constant.val_sessionKey, sessionKey);
        this.localStorageService.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
        this.localStorageService.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
        this.localStorageService.setLocalStorage(this.constant.storage_isMPINEnable, resp.isMPINEnable);
        this.localStorageService.setLocalStorage(this.constant.storage_isUPIUser, resp.isUPIUser);
        this.dataService.regUPICustData.customerName = resp.name;
        this.dataService.regUPICustData.lastLogin = resp.LastLoginTime;
        this.dataService.mobStaticEncKey = this.localStorageService.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey
        // this.idle.watch();
        this.dataService.isUPILogin = true;
        this.dataService.isUPILoginFlow = true;
        this.dataService.vpaAddressList = [];
        this.checkFlow();
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
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
      }
    });
  }

  checkForExistingVPA() {
    let requestObj = this.setMpinService.getVPAListRequestObject();
    this.http.callBankingAPIService(requestObj, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICE, true).subscribe((response) => {
      let upiResponse = response.responseParameter.upiResponse;
      let vpaAddressList = upiResponse.responseParameter?.addresslist ? this.dataService.processVPAlist(upiResponse.responseParameter.addresslist) : [];

      if (vpaAddressList.length > 0) {
        //User has existing VPAs, check length & default VPA
        if (upiResponse.responseParameter.hasOwnProperty('migratedUser') && upiResponse.responseParameter.migratedUser == 'Y' && upiResponse.responseParameter.activeUser == 'Y') {
          if(this.dataService.platform.toLowerCase() == this.constant.val_android) this.plugin.enableSmartIntent(true);
          this.commonMethod.openPopup('div.popup-bottom.user-verification');
        } else if (upiResponse.responseParameter.hasOwnProperty('migratedUser') && upiResponse.responseParameter.migratedUser == 'Y' && upiResponse.responseParameter.activeUser == 'N') {
          this.dataService.migratedVPAList = vpaAddressList;
          this.commonMethod.openPopup('div.popup-bottom.user-profile-inactive');
        } else {
          if (vpaAddressList.length == 3) {
            //Max Limit reached, navigate to upiRegSuccess
            this.router.navigate(['/upiRegSuccess']);
          } else {
            this.dataService.prevUrlForCreateVpaSuccess = "upiRegSuccess";
            if (vpaAddressList.some(vpaDetails => vpaDetails.default === 'Y')) {
              //navigate to createUPI with defaultVPAflag set to no
              this.dataService.createDefaultVPAFlag = false;
              this.router.navigate(['/createUpi']);
            } else {
              //navigate to createUPI with defaultVPAflag set to yes
              this.dataService.createDefaultVPAFlag = true;
              this.router.navigate(['/createUpi']);
            }
          }
        }
      } else {
        //user has no VPAs, navigate to createUPI with defaultVPAflag set to yes
        this.dataService.createDefaultVPAFlag = true;
        this.dataService.prevUrlForCreateVpaSuccess = "upiRegSuccess";
        this.router.navigate(['/createUpi']);
      }

    }, (err) => {
      console.log('Omni API err => ', err);
    });
  }

  closePopup(type) {
    this.commonMethod.closePopup(type);
    if (type == "div.popup-bottom.user-verification") {
      // this.router.navigate(['/upiLogin']);
      this.dataService.routeWithNgZone('upiDashboard');
    } else if (type == 'div.popup-bottom.user-profile-inactive') {
      this.dataService.routeWithNgZone('migratedUserVerification');
    }
  }
}

