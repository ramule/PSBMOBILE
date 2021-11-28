import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationService } from '../../../services/form-validation.service';
import { DataService } from '../../../services/data.service'
import { RegistrationMobCheckService } from '../../omni/pre-login/registration/registration-mob-check/registration-mob-check.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { AppConstants } from '../../../app.constant';
import { pageLoaderService } from '../../../services/pageloader.service';
import { SelectSimService } from '../select-sim/select-sim.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { RegistrationStatus } from 'src/app/utilities/app-enum';


declare var $: any;
declare var navigator: any;
declare var showTermcondition: any;
declare var hideTermcondition: any;
declare var showNoSimModal: any;
declare var hideNoSimModal: any;
declare var sms;
declare var showToastMessage: any;
declare var showWifiModal: any;
declare var hideWifiModal: any;

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss']
})

export class SmsVerificationComponent implements OnInit {
  headerdata = {
    'headerType': 'preloginHeaderomni',  //Options: TitleHeader , preloginHeader
    'titleName': '',            // Note : add titlename if headerType = TitleHeader
    'footertype': 'none' //Options: upiFooter , none
  }

  sendSmsForm: FormGroup;
  public formErrors = {
    accept: ''
  };
  accepted: Boolean = false;
  popupMessage:string;
  subId: any;
  activeSimCount: any;
  // plugins: any;
  // permissions: any;
  internetConnectionType: any;
  availableSimListIos: any;
  disableProceedBtn: boolean = false;
  simBindingTime: any;
  showSMSLoader: boolean = false;
  simBindingObservable: any;
  errorMessage:any;

  constructor(
    private router: Router,
    public dataService: DataService,
    private formValidationService: FormValidationService,
    private plugin: PluginService,
    private commonMethods : CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private constants: AppConstants,
    private loader: pageLoaderService,
    private ngZone: NgZone,
    private selectSimService: SelectSimService,
    private http: HttpRestApiService,
    private localStorage: LocalStorageService,
    private constant: AppConstants,
    private registrationService: RegistrationMobCheckService
  ) {
    // this.plugins = window['plugins'];
    // // this.permissions = window['cordova']['plugins']['permissions'];
    // if(window && window['plugins'] && window['cordova']) {
    //   this.plugins = window['plugins'];
    //   this.permissions = window['cordova']['plugins']['permissions'];
    // }
  }

  ngOnInit(): void {
    // this.dataService.removePreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.dataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });
    if (this.dataService.upiRegistrationFlow) {
      this.headerdata = {
        'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
        'titleName': '',            // Note : add titlename if headerType = TitleHeader
        'footertype': 'none' //Options: upiFooter , none
      }
      this.dataService.changeMessage(this.headerdata);
    } else {
      this.dataService.changeMessage(this.headerdata);
    }

    this.activeSimCount = this.dataService.activeSimCount;
    console.log('this.activeSimCount', this.activeSimCount);
    this.buildForm();
    // this.resetSIMBindingStatus();
  }

  checkForEsimIos() {
    console.log("Checking for Dual Sim on iPhone...");
    let self = this;
    sms.checkForEsim(function (isEsimFound) {
      console.log("checkForEsim success");
      console.log(isEsimFound);
      if(isEsimFound) {
        //show popup
        self.dataService.activeSimCount = 2;
        self.activeSimCount = 2;
        self.commonMethods.openPopup("div.popup-bottom.esim-ios-popup");
      } else {
        //proceed
        self.dataService.activeSimCount = 1;
        self.activeSimCount = 1;
        self.commonMethods.openPopup("div.popup-bottom.send-sms-ios-popup");
      }
    }, function(error) {
      console.log("checkForEsim error");
      console.log(error);
    });
  }


  resetSIMBindingStatus(){
    // this.plugin.setSharedPreferences({ isMinimizedCheck: false, isAppMinimised: false }).subscribe((response) => {
    //     console.log('simbinding sharedPref data ', JSON.stringify(response))
    // })
  }

  generateUniqueValue(){
    this.dataService.uniqueVerificationCode = this.encryptDecryptService.createMD5Value(this.commonMethods.genRandomDigit(5).toString());
    this.dataService.uniqueMobDeviceID =this.commonMethods.genRandomDigit(14).toString();

    console.log('uniqueVerificationCode ',this.dataService.uniqueVerificationCode);
    console.log('uniqueMobDeviceID ', this.dataService.uniqueMobDeviceID);
    //alert("uniqueVerificationCode "+this.dataService.uniqueVerificationCode + " uniqueMobDeviceID "+ this.dataService.uniqueMobDeviceID)
  }

  simverify() {
    this.router.navigate(['/upiRegistration/PersonalInfo']);
  }

  buildForm() {
    this.sendSmsForm = new FormGroup({
      accept: new FormControl(false, [Validators.requiredTrue])
    });

    this.sendSmsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidationService.validateForm(
        this.sendSmsForm,
        this.formErrors,
        true
      );
    });
  }

  validateForm() {
    if (this.sendSmsForm.invalid) {
      this.sendSmsForm.get('accept').markAsTouched();
      return;
    }
  }

  goToSelectSimPage() {
    this.dataService.routeWithNgZone('/selectSim');
  }

  submitForm() {
    this.sendSmsForm.get('accept').markAsTouched();
    console.log('this.sendSmsForm =>', this.sendSmsForm);
    if (this.sendSmsForm.valid) {
      console.log("Form Valid...");
      // comment this line after testing
      if(!this.dataService.isCordovaAvailable) {
        this.goToSelectSimPage();
      }
      if(this.activeSimCount == 0) {
        this.showNoSimModal();
      } else {
        if (this.dataService.platform.toLowerCase() == this.constants.val_android) {
          this.goToSelectSimPage();
        } else if (this.dataService.platform.toLowerCase() == this.constants.val_ios) {
          // this.commonMethods.openPopup("div.popup-bottom.send-sms-ios-popup");
          this.checkForEsimIos();
        } else {
          console.log("Unknown platform");
        }
      }
    } else {
      console.log("Form invalid...");
      this.popupMessage = "Please accept the terms and conditions to proceed with registration."
      this.showModal();
      this.formErrors = this.formValidationService.validateForm(this.sendSmsForm, this.formErrors, true);
    }
  }

  proceedSmsFlowIos() {
    this.closePopup('send-sms-ios-popup');
    this.generateUniqueValue();
    this.iosInitDataForSendSms();
  }

  cancelSmsFlowIos() {
    this.closePopup('send-sms-ios-popup');
    this.dataService.routeWithNgZone('LandingPage');
  }

  hideModal() {
    // $('#termsModal').modal('hide');
    hideTermcondition();
  }

  showModal() {
    // $('#termsModal').modal('show');
    showTermcondition();
  }
  showNoSimModal() {
    // $('#termsModal').modal('show');
    showNoSimModal();
  }

  hideNoSimModal() {
    // $('#termsModal').modal('show');
    hideNoSimModal();
    if(this.dataService.platform.toLowerCase() == this.constants.val_android) {
      navigator.app.exitApp();
    }
  }

  close(){
    this.dataService.routeWithNgZone('LandingPage');
  }

  openLink() {
    // this.plugin.openInAppBrowser("https://punjabandsindbank.co.in/content/deposit-policy");
      if (this.localStorage.hasKeyLocalStorage(this.constants.storage_language)) {
        var lang = this.localStorage.getLocalStorage(this.constants.storage_language);
        if (this.localStorage.hasKeyLocalStorage(this.constants.storage_languageJson)) {
          var langJSON = this.localStorage.getLocalStorage(this.constants.storage_languageJson);
          var privacyPolicyURL = JSON.parse(langJSON)[lang]?.UPI_TNC;
          this.plugin.openInAppBrowser(privacyPolicyURL)
        }
      } else {
        var lang = this.localStorage.getLocalStorage(this.constants.storage_language);
        if (this.localStorage.hasKeyLocalStorage(this.constants.storage_languageJson)) {
          var langJSON = this.localStorage.getLocalStorage(this.constants.storage_languageJson);
          var privacyPolicyURL = JSON.parse(langJSON)['en']?.UPI_TNC;
          this.plugin.openInAppBrowser(privacyPolicyURL)
        }
      }
  }

  iosInitDataForSendSms() {
    this.availableSimListIos = [{
      carrierName: "",
      countryCode: "",
      deviceId: "",
      displayName: "",
      isDataRoaming: false,
      isNetworkRoaming: false,
      mcc: 0,
      mnc: 0,
      phoneNumber: "",
      simSerialNumber: "",
      simSlotIndex: 0,
      subscriptionId: 3
    }];

    this.internetConnectionType = this.plugin.checkConnection();

     if (this.internetConnectionType == "WiFi") {
      this.loader.hideLoader();
      this.showWifiModal();
      // this.disableProceedBtn = false;
      return;
    } else if (this.internetConnectionType == "Nonetwork") {
      // this.disableProceedBtn = false;
      this.loader.hideLoader();
    } else {
      //send SMS functionality goes here
      this.sendSMSForiOS();
    }
  }

  showWifiModal() {
    showWifiModal();
  }

  hideWifiModal() {
    hideWifiModal();
  }

  sendSMSForiOS() {
    let _this = this;
    var msg = "";
    this.dataService.selectedSim = this.availableSimListIos[0];
    msg = "DO NOT SHARE THIS MESSAGE UNDER ANY CIRCUMSTANCE \n" +this.dataService.uniqueMobDeviceID + "~" + this.dataService.uniqueVerificationCode;
    //msg = this.dataService.uniqueMobDeviceID + "~" + this.dataService.uniqueVerificationCode;
    console.log(msg);

    sms.send(this.constants.val_clientNoForSms, msg, this.dataService.selectedSim.subscriptionId, {
      replaceLineBreaks: false
    }, (d) => {
      console.log('SMS SUCCESS => d');
      console.log(d);
      // alert("Plugin Result = "+ d);
      if (d == 'Error' || d == 'Dismissed') {
        showToastMessage("Error while sending message . Please try again", "error");
        _this.disableProceedBtn = false;
      } else {
          this.ngZone.run(() => {
            console.log('SimBinding Start');
            this.plugin.checkConnection() == "4G" ? this.simBindingTime = 30 : this.simBindingTime = 45;
            this.showSMSLoader = true;
            this.dataService.simBindingInterval = undefined;
            this.ngZone.run(() => {
              $('#sendsmsModal').modal({
                backdrop: 'static',
                keyboard: false,
                show: true
              });
            });

            this.dataService.simBindingInterval = setInterval(() => {
              if (this.simBindingTime > 0) {
                this.simBindingTime = this.simBindingTime - 1;
              } else {
                this.plugin.checkConnection() == "4G" ? this.simBindingTime = 30 : this.simBindingTime = 45;
                this.disableProceedBtn = false;
                this.ngZone.run(() => {
                  this.showSMSLoader = false;
                  $('#sendsmsModal').modal('hide');
                  console.log('SimBinding End')
                });
                clearInterval(this.dataService.simBindingInterval);
                if(!this.commonMethods.hadClassActive("div.popup-bottom")){
                  this.commonMethods.openPopup("div.popup-bottom.sim-binding-failed");
                }
              }
            }, 1000);
            this.callCheckSimBindingApi(0);
          })
      }
    }, (e) => {
      console.log('SMS ERROR => e');
      console.log(e);
      _this.disableProceedBtn = false;
      showToastMessage("Message sending failed " + e, "error");
    });
  }

    callCheckSimBindingApi(maxCounter) {
    var param = this.selectSimService.getParamForSimAppData();
    console.log('param', param);
    // alert("Calling API");
    this.simBindingObservable = this.http.callBankingAPIService(param, this.constants.deviceID, this.constants.upiserviceName_CHECKSIMBINDINGSTATUS, true).subscribe(data => {
      console.log('CheckSIMBINDING REsponse ====> ', JSON.stringify(data));
      console.log(data);
      let resp = data.responseParameter;
      // alert(JSON.stringify(resp));
      // alert(resp.opstatus);
      if (resp.opstatus == "00" || resp.opstatus == "02") {
        $("#sendsmsModal").removeClass("in");
        $(".modal-backdrop").remove();
        $("#sendsmsModal").hide();
        clearInterval(this.dataService.simBindingInterval);
        this.dataService.registrationUpiData = data.responseParameter;
        this.localStorage.setLocalStorage(this.constants.storage_simBindingSuccess, "true");
        this.localStorage.setLocalStorage(this.constants.storage_mobileNo, resp.MobileNo);
        //this.localStorage.setLocalStorage(this.constant.storage_mobileNo, "9415340153");
        this.localStorage.setLocalStorage(this.constants.storage_deviceId, resp.deviceId);
        this.localStorage.setLocalStorage(this.constants.storage_isIBUser, resp.isIBUser);
        this.localStorage.setLocalStorage(this.constants.storage_isMBUser, resp.isMBUser);
        this.localStorage.setLocalStorage(this.constants.storage_isUPIUser, resp.isUPIUser);
        this.localStorage.setLocalStorage(this.constants.storage_isMPINEnable, resp.isMPINEnable);
        this.localStorage.setLocalStorage(this.constant.storage_isCheckBiometric, "true");
        //this.dataService.upiRegistrationFlow = true;
        this.dataService.mobStaticEncKey = this.localStorage.getLocalStorage(this.constants.storage_mobileNo) + this.constants.mapEncryptKey;
        if (resp.hasOwnProperty('email_id') || resp.hasOwnProperty('name')) {
          this.dataService.regUPICustData.customerName = resp.name;
          this.dataService.regUPICustData.email_id = resp.email_id;
          this.dataService.regUPICustData.isLocalOrApiData = "apidata";
        } else {
          this.dataService.regUPICustData.isLocalOrApiData = "localdata";
        }

        this.resetSimBindingDetails();
        // if (this.dataService.upiRegistrationFlow) {
        //   this.dataService.userUpiRegStaus = this.dataService.registrationUpiData.UpiRegistrationSuccess;
        //   if (resp.isMPINEnable == "Y" && resp.isUPIUser.toUpperCase() == 'Y') {
        //     this.showSMSLoader = false;
        //     clearInterval(this.dataService.simBindingInterval);
        //     this.localStorage.setLocalStorage(this.constants.storage_isUpiRegistrationSuccess, "true");
        //     this.commonMethods.openPopup('div.popup-bottom.user-verification');
        //   } else {
        //       this.dataService.regUPICustData.email_id = "";
        //       this.dataService.regUPICustData.customerName = "";
        //       this.dataService.routeWithNgZone('/personalInfo');
        //   }
        // }
        // else if(this.dataService.omniRegistrationFlow){
        //   console.log("mobileNoCheck");
          this.mobileNoCheck();
        // }

      } else if (resp.opstatus == "03" || resp.opstatus == "04") {
        this.resetSimBindingDetails();
      } else {
        if (maxCounter < 20) {
          var cnt = maxCounter + 1;
          setTimeout(() => {
            this.callCheckSimBindingApi(cnt);
          }, 100);
        } else {
          this.resetSimBindingDetails();
          this.commonMethods.openPopup("div.popup-bottom.sim-binding-failed");
        }
      }
    }, (error) => {
      console.log("Sim binding failed", error);
      this.resetSimBindingDetails();
    });
  }

  resetSimBindingDetails() {
    // this.isSimBindingStarted = false;
    this.loader.hideLoader();
    this.disableProceedBtn = false;
    this.ngZone.run(() => {
      this.showSMSLoader = false;
      $('#sendsmsModal').modal('hide');
      clearInterval(this.dataService.simBindingInterval);
    });
    // this.simBindingTime = 45;
    this.plugin.checkConnection() == "4G" ? this.simBindingTime = 30 : this.simBindingTime = 45;
  }

  closePopup(popupName){
    this.commonMethods.closePopup("div.popup-bottom."+popupName);
    if(popupName == 'non-psb'){
      this.dataService.routeWithNgZone('LandingPage');
    }
  }

  closeWelcomeBackPopup() {
    this.commonMethods.closePopup("div.popup-bottom.user-verification");
    this.dataService.routeWithNgZone('upiLogin');
  }

  mobileNoCheck() {
    //alert(this.localStorage.getLocalStorage(this.constant.storage_mobileNo))
    let mobileNo = this.localStorage.getLocalStorage(this.constant.storage_mobileNo);;
    //TODO : For temporary purpose using sim data after bank service integration this will be removed.
    //mobileNo = "22005008";
    // mobileNo = "8286363809";
    // mobileNo = "8908978315";
    //mobileNo = "8584212365";
    var param = this.registrationService.getmobileNoCheckParam({ 'mobNumber': mobileNo });
    this.mobileNoCheckApiCall(param, mobileNo);
  }

  /**
  * api call to validate mobile number
  * @param
  */
   mobileNoCheckApiCall(param, mobileNo) {
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_MOBILENOCHECK).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.dataService.registrationData = data.responseParameter;
        this.dataService.registrationSecQue = data.set != undefined ? data.set?.records[0] : '';
        //TODO: binding records is not required now
        // back button is hidden for onmi channel
        //this.bindExistingRecord(this.DataService.registrationData,JSON.stringify(this.DataService.registrationSecQue));
        this.localStorage.setLocalStorage(this.constant.storage_simBindingSuccess, "true")
        this.localStorage.setLocalStorage(this.constant.storage_mobileNo, mobileNo);
        this.localStorage.setLocalStorage(this.constant.storage_deviceId, resp.deviceId);
        this.localStorage.setLocalStorage(this.constant.storage_isTpinAvl, resp.isTpinAvl);
        this.localStorage.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
        this.localStorage.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
        this.localStorage.setLocalStorage(this.constant.storage_isBiomertric, resp.isBiomertric);
        this.localStorage.setLocalStorage(this.constant.storage_username, resp.userName);
        this.dataService.mobStaticEncKey = this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
        this.localStorage.setLocalStorage(this.constant.storage_mobileStaticEncrypyKey, this.dataService.mobStaticEncKey);

        /***** get pending state and naviagte to respective page  ******/
        /* If a user left registration in middile then when return,
            will navigate to the screen he left
            @IBRegistrationSuccess :- status for internet banking
            @MOBRegistrationSuccess :- status for mobile banking
        */
        //TODO : Change this later
        /*
        this.constant.getEntityId() == this.constant.val_entityIDMob ? this.DataService.registrationData.MOBRegistrationSuccess : this.DataService.registrationData.RegistrationSuccess
        */
        this.dataService.userRegStaus = this.dataService.registrationData.RegistrationSuccess;
        var nextPageURL: string = '';
        if (this.dataService.upiRegistrationFlow) {
          this.dataService.userUpiRegStaus = this.dataService.registrationUpiData.UpiRegistrationSuccess;
          var nextPageURL: string = '';
          if (resp?.isUPIUser.toUpperCase() == 'Y') {
            this.localStorage.setLocalStorage(this.constant.storage_isUpiRegistrationSuccess, "true");
            this.showSMSLoader = false;
            if(this.dataService.platform.toLowerCase() == this.constant.val_android) this.plugin.enableSmartIntent(true);

            clearInterval(this.dataService.simBindingInterval);
            this.commonMethods.openPopup('div.popup-bottom.user-verification');
          }
          else {
            this.dataService.regUPICustData.email_id = "";
            this.dataService.regUPICustData.customerName = "";
            this.dataService.routeWithNgZone('/personalInfo');
          }
        } else{
          if (resp.ISCBS == 'N') {
            this.commonMethods.openPopup('div.popup-bottom.non-psb')
            // nextPageURL = "/LandingPage";
            // this.errorMessage = "mobile number is not register with bank";
            // this.commonMethods.openPopup('div.popup-bottom.error-msg-show')
          } else {
  
            if(this.dataService.userRegStaus == RegistrationStatus.USER_BLOCKED){
              this.commonMethods.openPopup('div.popup-bottom.blocked-user');
              nextPageURL = "";
            }
            else{
              if(resp.omniRegistrationStatus.toUpperCase() == 'Y'){
                this.localStorage.setLocalStorage(this.constant.storage_omniRegisteredUser, "true");
                if (this.constant.getPlatform() == "web") {
                  nextPageURL = "/login";
                }
                else {
                  nextPageURL = "/loginMobile";
                }
              }
              else{
                //If not omni registered will go to omni registration
                nextPageURL = "/registration";
              }
            }
          }
          this.dataService.routeWithNgZone([nextPageURL]);
        }
      }else if (resp.opstatus == "01") {
        if(this.dataService.upiRegistrationFlow){
          this.commonMethods.closeAllPopup();
          this.localStorage.setLocalStorage(this.constant.storage_simBindingSuccess, "true")
          this.localStorage.setLocalStorage(this.constant.storage_mobileNo, mobileNo);
          this.localStorage.setLocalStorage(this.constant.storage_deviceId, resp.deviceId);
          this.localStorage.setLocalStorage(this.constant.storage_isTpinAvl, resp.isTpinAvl);
          this.localStorage.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
          this.localStorage.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
          this.localStorage.setLocalStorage(this.constant.storage_isBiomertric, resp.isBiomertric);
          this.localStorage.setLocalStorage(this.constant.storage_username, resp.userName);
          this.dataService.mobStaticEncKey = this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
          this.localStorage.setLocalStorage(this.constant.storage_mobileStaticEncrypyKey, this.dataService.mobStaticEncKey);
          this.dataService.regUPICustData.email_id = "";
          this.dataService.regUPICustData.customerName = "";
          this.dataService.routeWithNgZone('/personalInfo');
        }else{
          this.commonMethods.openPopup('div.popup-bottom.non-psb')
        }
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
    this.errorMessage = resp.Result;
    this.commonMethods.openPopup('div.popup-bottom.error-msg-show')
    //showToastMessage(resp.Result, "error");
  }

  proceedEsimFlowIos() {
    this.closePopup('esim-ios-popup');
    this.commonMethods.openPopup("div.popup-bottom.send-sms-ios-popup");
  }

  cancelEsimFlowIos() {
    this.closePopup('esim-ios-popup');
  }
}
