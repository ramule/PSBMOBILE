import { AfterContentInit, AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service'
import { Router } from '@angular/router';
import { AppConstants } from '../../../app.constant';
import { FormValidationService } from '../../../services/form-validation.service';
import { PluginService } from '../../../services/plugin-service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { RegistrationStatus } from 'src/app/utilities/app-enum';
import { RegistrationMobCheckService } from '../../omni/pre-login/registration/registration-mob-check/registration-mob-check.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { SelectSimService } from './select-sim.service';
import { Location } from '@angular/common';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Observable } from 'rxjs';

declare var sms;
declare var showToastMessage: any;
declare var showWifiModal: any;
declare var hideWifiModal: any;
declare var $;
declare var cordova: any;
declare var window:any;
@Component({
  selector: 'app-select-sim',
  templateUrl: './select-sim.component.html',
  styleUrls: ['./select-sim.component.scss']
})

export class SelectSimComponent implements OnInit,OnDestroy {

  headerdata = {
    'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
    'titleName': '',            // Note : add titlename if headerType = TitleHeader
    'footertype': 'none' //Options: upiFooter , none
  };

  selectSimForm: FormGroup;
  availableSimList: any = {};
  selectSimFormSubmitted: boolean = false;
  errorMsgShow: boolean = false;
  singleSimShow: boolean = false;
  subIdForSendSms: any;
  sessionDecryptKey: any;
  simBindingObservable: any;
  disableProceedBtn: boolean = false;
  isSimBindingStarted: boolean = false;
  availablesim = {
    "sim1": "Vodafone",
    "sim2": "JIO"
  }

  public formErrors = {
    sendSmsPermission: '',
    simName: ''
  };
  simBindingInterval;
  simBindingTime = 30;
  simSelectedIndex;

  isOnlineDtl: boolean;
  internetConnectionTypeDtl: any;
  showloader = false;
  showSMSLoader = false;
  errorMessage:any;
  constructor(
    private form: FormBuilder,
    private router: Router,
    private formValidationService: FormValidationService,
    private constants: AppConstants,
    public dataService: DataService,
    private plugin: PluginService,
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private http: HttpRestApiService,
    private registrationService: RegistrationMobCheckService,
    private selectSimService: SelectSimService,
    private encryptDecryptService: EncryptDecryptService,
    private translate: TranslatePipe,
    private location: Location,
    private loader: pageLoaderService,
    private commonMethods: CommonMethods,
    private ngZone: NgZone
  ) {
    //this.loader.showLoader();
    // console.log(this.dataService.platform);
    if (this.dataService.isCordovaAvailable) {
      if(this.dataService.platform.toLowerCase() == this.constant.val_android) {
        if (this.dataService.simData) {
          this.availableSimList = this.dataService.simData.cards;
          console.log('availableSimList android =>');
          console.log(this.availableSimList);
        }
      }
      // else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      //   this.availableSimList = [{
      //     carrierName: "",
      //     countryCode: "",
      //     deviceId: "",
      //     displayName: "",
      //     isDataRoaming: false,
      //     isNetworkRoaming: false,
      //     mcc: 0,
      //     mnc: 0,
      //     phoneNumber: "",
      //     simSerialNumber: "",
      //     simSlotIndex: 0,
      //     subscriptionId: 3
      //   }];
      // }
    } else {
      this.availableSimList = [{
        carrierName: "Jio 4G",
        countryCode: "",
        deviceId: "b8082ebaaca7d10a",
        displayName: "Jio 4G",
        isDataRoaming: false,
        isNetworkRoaming: false,
        mcc: 405,
        mnc: 874,
        phoneNumber: "919773080463",
        simSerialNumber: "89918740500030509203",
        simSlotIndex: 1,
        subscriptionId: 3,
      }, {
        carrierName: "Vi 4G",
        countryCode: "",
        deviceId: "c4c7bfda90307b12eb314824498f644784b35de4",
        displayName: "Vi 4G",
        isDataRoaming: false,
        isNetworkRoaming: false,
        mcc: 405,
        mnc: 874,
        phoneNumber: "8286363809",
        simSerialNumber: "89918740500030509203",
        simSlotIndex: 1,
        subscriptionId: 3,
      }];
    }

    console.log('availableSimList =>');
    console.log(this.availableSimList);

    this.dataService.isOnlineObservable.subscribe(isOnlineDtl => {
      this.isOnlineDtl = isOnlineDtl
    });
  }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    this.buildForm();
    if (this.isOnlineDtl) {
      if (this.dataService.isCordovaAvailable) {
        this.internetConnectionTypeDtl = this.plugin.checkConnection();
      }
      this.checkOfflineActivity();
      this.registerSIMChangeEvent();
      // this.cancelSIMBinding();
      // else {
      //   this.internetConnectionTypeDtl = "4G"
      // }
    }

    //actual code
    if (!this.dataService.isCordovaAvailable) {
      this.dataService.bypassSmsSelectSim = true;
    }

    //for testing, comment otherwise
    //this.dataService.bypassSmsSelectSim = true;
    console.log('bypassSmsSelectSim => ', this.dataService.bypassSmsSelectSim);
  }

  checkOfflineActivity(){
    document.addEventListener("offline", this.onOffline.bind(this), false);
  }

  onOffline(){
    this.resetSIMBindingDetails();
  }

  buildForm() {

    this.selectSimForm = this.form.group({
      simName: ['', Validators.required]
    });

    this.selectSimForm.get('simName').valueChanges.subscribe((data) => {
      console.log('Sim Name => ', data);
      this.dataService.selectedSim = this.availableSimList[data];
      this.subIdForSendSms = this.dataService.selectedSim.subscriptionId;
    });

    if (this.availableSimList.length == 1) {
      this.dataService.selectedSim = this.availableSimList[0];
      console.log("subscription Id====>"+this.dataService.selectedSim.subscriptionId);
      this.subIdForSendSms = this.dataService.selectedSim.subscriptionId;
      this.singleSimShow = true;
    } else {
      this.singleSimShow = false;
      this.loader.hideLoader();
    }
  }

  submitForm(isSimBindingStarted) {
    this.disableProceedBtn = true;
    this.isSimBindingStarted = isSimBindingStarted;
    console.log(this.selectSimForm.value);
    this.errorMsgShow = true;

    if (this.selectSimForm.value.simName) {
      if (this.dataService.isCordovaAvailable) {
        if(this.dataService.platform.toLowerCase() == this.constant.val_android) {
          this.getSMSPerms();
        } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
          this.sendSmsToNo();
        } else {
          console.log("Unknown platform...");
        }
      } else {
        this.nextFlowCall();
      }
      this.errorMsgShow = false;
    }
  }

  handleChange(e, index) {
    console.log(e);
    console.log("handleChange", index);
    this.simSelectedIndex = index;
    console.log(this.selectSimForm.value.simName);
    this.errorMsgShow = false;
    this.disableProceedBtn = false;
  }

  /**
   * Get Sim settings
   */
  getSMSPerms() {
    /**
     * ask for sim permission
     */
    this.plugin.checkSMSPermission().subscribe((status) => {
      console.log("checkSMSPermission", status);
      if (status) {
        if (this.dataService.bypassSmsSelectSim) {
          this.nextFlowCall();
        } else {
          this.sendSmsToNo();
        }
      }
      else {
        this.plugin.requestSMSPermission().subscribe((status) => {
          if (status) {
            if (this.dataService.bypassSmsSelectSim) {
              this.nextFlowCall()
            } else {
              this.sendSmsToNo();
            }
            this.hideNotGrantedModal();
          }
          else {
            console.log("request denied");
            this.showNotGrantedModel();
          }
        });
      }
    })
  }

  gotoSetting() {
    this.hideNotGrantedModal();
    this.plugin.gotoSetting().subscribe((status) => {
      console.log("gotoSetting=====>", status);
    }, (err) => {
      console.log("gotoSetting error", err);
    });
  }

  generateUniqueValue(){
    this.dataService.uniqueVerificationCode = this.encryptDecryptService.createMD5Value(this.commonMethods.genRandomDigit(5).toString());
    this.dataService.uniqueMobDeviceID =this.commonMethods.genRandomDigit(14).toString();

    console.log('uniqueVerificationCode ',this.dataService.uniqueVerificationCode);
    console.log('uniqueMobDeviceID ', this.dataService.uniqueMobDeviceID);
    //alert("uniqueVerificationCode "+this.dataService.uniqueVerificationCode + " uniqueMobDeviceID "+ this.dataService.uniqueMobDeviceID)
  }

  sendSmsToNo() {
    this.generateUniqueValue();
    if (this.dataService.isCordovaAvailable) {
      this.internetConnectionTypeDtl = this.plugin.checkConnection();
    }
    if (this.internetConnectionTypeDtl == "WiFi") {
      this.loader.hideLoader();
      this.showDisableWifiModel();
      this.disableProceedBtn = false;
      return;
    } else if (this.internetConnectionTypeDtl == "Nonetwork") {
      this.disableProceedBtn = false;
      this.loader.hideLoader();
    } else {
      let _this = this;
      var msg = "";
      // this.loader.showLoader();
      // msg = this.dataService.uniqueMobDeviceID + "~" + this.dataService.uniqueVerificationCode;
      msg = "DO NOT SHARE THIS MESSAGE UNDER ANY CIRCUMSTANCE \n" +this.dataService.uniqueMobDeviceID + "~" + this.dataService.uniqueVerificationCode;
      console.log(this.dataService.uniqueMobDeviceID + "~" + this.dataService.uniqueVerificationCode);
      sms.send(this.constant.val_clientNoForSms, msg, this.subIdForSendSms,
        {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            // intent: 'INTENT'  // send SMS with the native android SMS messaging
            intent: '' // send SMS without opening any other app
          }
        }, (d) => {
          // this.loader.hideLoader();
          //showToastMessage("Message sent " + d, "success");
          if (d == 'Error') {
            this.errorMessage = "Error while sending message . Please try again";
            this.commonMethods.openPopup('div.popup-bottom.sending-sms-failed');
            _this.disableProceedBtn = false;
          } else {
            // _this.getSimApiData();
            _this.nextFlowCall()
            //_this.getSimDataTemp(0); //TODO:for 2 way simbinding test
          }

        }, (e) => {
          this.loader.hideLoader();
          _this.disableProceedBtn = false;
          this.errorMessage = "Message sending failed " + e;
          this.commonMethods.openPopup('div.popup-bottom.sending-sms-failed');
      });
    }
  }

  nextFlowCall() {
    if(!this.dataService.upiStandAlone && this.dataService.omniByPassSim){
      var simDtl = this.availableSimList[this.selectSimForm.value.simName]
      console.log(simDtl);
      if(simDtl.phoneNumber != ""){
        let mobileNo = simDtl.phoneNumber;
        mobileNo = mobileNo.replace("91", "");
        mobileNo = mobileNo.replace("+", "");
        //this.localStorage.setLocalStorage(this.constant.storage_mobileNo,simDtl.phoneNumber)
        //this.localStorage.setLocalStorage(this.constant.storage_mobileNo,"9888214125")//9415340153,9818107758,"9888214125"
        this.localStorage.setLocalStorage(this.constant.storage_mobileNo,mobileNo)
        this.mobileNoCheck();
      }
      else{
        this.commonMethods.openPopup("div.popup-bottom.sim-binding-failed");
      }
    }
    else{
      this.ngZone.run(() => {
        this.processSimBindingTimer();
        this.getSimApiData(0);
      });
    }
  }
  
  processSimBindingTimer() {
    console.log('SimBinding Start');
    console.log(this.plugin.checkConnection());
    this.plugin.checkConnection() == "4G" ? this.simBindingTime = 30 : this.simBindingTime = 45;
    this.showSMSLoader = true;
    this.dataService.simBindingInterval = undefined;
    this.smsLoader(true);
    this.setTimer();
  }

  setTimer() {
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
  }

  showNotGrantedModel() {
    $('#notgrantedsmspermodel').modal('show');
  }

  hideNotGrantedModal() {
    $('#notgrantedsmspermodel').modal('hide');
  }

  showDisableWifiModel() {
    // $('#disablewifimodel').modal('show');
    showWifiModal()
  }

  hideDisableWifiModal() {
    // $('#disablewifimodel').modal('hide');
    hideWifiModal()
  }

  mobileNoCheck() {
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
      console.log(JSON.stringify(data));
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
        this.constant.getEntityId() == this.constant.val_entityIDMob ? this.DataService.registrationData.MOBRegistrationSuccess : this.DataService.registrationData.IBRegistrationSuccess
        */
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
        } 
        else if(this.dataService.omniRegistrationFlow){
          if (resp.ISCBS == 'N') {
            // nextPageURL = "/LandingPage";
            this.commonMethods.openPopup('div.popup-bottom.non-psb')
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

  cancelSIMBinding() {
    document.addEventListener("pause", this.onPause.bind(this), false);
  }

  onPause() {
    // Handle the resume event
    if (this.router.url == '/selectSim') {
      this.plugin.checkSIMBinding().subscribe((response) => {
        if (response.isAppMinimised) {
          this.isSimBindingStarted = false;
          this.loader.hideLoader();
          this.disableProceedBtn = false;
          this.ngZone.run(() => {
            this.showSMSLoader = false;
            $('#sendsmsModal').modal('hide');
            console.log('SimBinding End')
          });
          clearInterval(this.dataService.simBindingInterval);
          this.ngZone.run(() => {
            this.dataService.informationLabel = this.translate.transform('INFORMATION');
            this.dataService.primaryBtnText = this.translate.transform('RESTART');
            this.dataService.secondaryBtnText = this.translate.transform('EXIT');
            this.dataService.informationDetails = this.translate.transform('SECURITY_REASONS_MSG');
            this.commonMethods.openPopup('div.popup-bottom.show-appminimized-message', true)
          })
          // this.simBindingObservable.unsubsribe();
        }
      });
    }
  }

  /**
   * API for sim data to get device id
   */
  getSimApiData(maxCounter?: any) {
    var param = this.selectSimService.getParamForSimAppData();
    console.log('param', param);
    this.sessionDecryptKey = this.constant.sessionEncryptKey + this.localStorage.getLocalStorage(this.constant.storage_mobileNo);
    console.log('sessionDecryptKey', this.sessionDecryptKey);
    let deviceID = this.constant.deviceID;
    console.log('deviceID', deviceID);
    // this.plugin.checkSIMBinding().subscribe((response) => {
    // if (!response.isAppMinimised) {
    this.simBindingObservable = this.http.callBankingAPIService(param, deviceID, this.constant.upiserviceName_CHECKSIMBINDINGSTATUS, true).subscribe(data => {
      console.log('CheckSIMBINDING REsponse ====> ', JSON.stringify(data))
      // this.plugin.checkSIMBinding().subscribe((response) => {
      // if (!response.isAppMinimised) {
      // if (this.isSimBindingStarted) {
        console.log(data);
        var resp = data.responseParameter;
        // data.responseParameter.ISCBS == "N" // use later
        if (resp.opstatus == "00" || resp.opstatus == "02") {
          // this.loader.hideLoader();
            $("#sendsmsModal").removeClass("in");
            $(".modal-backdrop").remove();
            $("#sendsmsModal").hide();

          clearInterval(this.dataService.simBindingInterval);
          // this.ngZone.run(() => {
            // this.showSMSLoader = false;
            // $('#sendsmsModal').modal('hide');
          // });


          console.log(data.responseParameter);
          this.dataService.registrationUpiData = data.responseParameter;
          this.localStorage.setLocalStorage(this.constant.storage_simBindingSuccess, "true");
          //this.localStorage.setLocalStorage(this.constant.storage_mobileNo, "9870876248"); //"9936868123"[nikita] //9415340153[sarfarajTestP] //9888214125[gurpreet]
          this.localStorage.setLocalStorage(this.constant.storage_mobileNo, resp.MobileNo);
          console.log("MN", this.localStorage.getLocalStorage(this.constant.storage_mobileNo));
          this.localStorage.setLocalStorage(this.constant.storage_deviceId, resp.deviceId);
          this.localStorage.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
          this.localStorage.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
          this.localStorage.setLocalStorage(this.constant.storage_isUPIUser, resp.isUPIUser);
          this.localStorage.setLocalStorage(this.constant.storage_isMPINEnable, resp.isMPINEnable);
          this.localStorage.setLocalStorage(this.constant.storage_isCheckBiometric, "true");
          //this.dataService.upiRegistrationFlow = true;
          this.dataService.mobStaticEncKey = this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
          if (resp.hasOwnProperty('email_id') || resp.hasOwnProperty('name')) {
            this.dataService.regUPICustData.customerName = resp.name;
            this.dataService.regUPICustData.email_id = resp.email_id;
            this.dataService.regUPICustData.isLocalOrApiData = "apidata";
          } else {
            this.dataService.regUPICustData.isLocalOrApiData = "localdata";
          }

          if(this.dataService.platform.toLowerCase() == this.constant.val_android) this.storeSimData(this.simSelectedIndex);

          this.resetSIMBindingDetails();
          // else if(this.dataService.omniRegistrationFlow){
            this.mobileNoCheck();
          // }

          // this.mobileNoCheck();

        }
        else if (resp.opstatus == "03" || resp.opstatus == "04") {
          this.resetSIMBindingDetails();
        }
        else {
          if (maxCounter < 20) {
            // setTimeout(() => {
            var cnt = maxCounter + 1;
            this.getSimApiData(cnt);
            // }, 5000);
          }
          else {
            this.resetSIMBindingDetails();
            this.commonMethods.openPopup("div.popup-bottom.sim-binding-failed");
            // showToastMessage("Sim binding failed", "error");
          }

        }
      // }
      // }
    }, (error) => {
      this.resetSIMBindingDetails();
      // showToastMessage("Sim binding failed", "error");
    });
    // }, (error) => {
    //   this.disableProceedBtn = false;
    //   $('#sendsmsModal').modal('hide');
    //   clearInterval(this.dataService.simBindingInterval);
    //   this.commonMethods.closePopup('div.popup-bottom.show-common-info');
    //   showToastMessage("Sim binding failed", "error");
    // });
    // }
    // }, (error) => {
    //   this.loader.hideLoader();
    //   this.disableProceedBtn = false;
    //   $('#sendsmsModal').modal('hide');
    //   clearInterval(this.dataService.simBindingInterval);
    //   this.commonMethods.closePopup('div.popup-bottom.show-common-info');
    // });


  }

  resetSIMBindingDetails() {
    this.isSimBindingStarted = false;
    this.loader.hideLoader();
    this.disableProceedBtn = false;
    this.ngZone.run(() => {
      this.showSMSLoader = false;
      $('#sendsmsModal').modal('hide');
      clearInterval(this.dataService.simBindingInterval);
    });
    this.plugin.checkConnection() == "4G" ? this.simBindingTime = 30 : this.simBindingTime = 45;
  }

  /**
   * Show Toast message with multilingual
   * @param msgKey
   * @param toastColor
   */
  showCommonToastMsgWithKey(msgKey, toastColor) {
    showToastMessage(this.translate.transform(msgKey), toastColor)
  }

  routeBack() {
    this.location.back();
  }

  close() {
    // this.router.navigate(['/LandingPage']);
    this.dataService.routeWithNgZone('LandingPage');
  }


  /**
   * API for sim data to get device id
   * add temporary
   */

  getSimDataTemp(maxCounter?: any) {
    var param = this.selectSimService.getParamForSimAppDataTemp();
    console.log('param', param);
    this.sessionDecryptKey = this.constant.sessionEncryptKey + this.localStorage.getLocalStorage(this.constant.storage_mobileNo);
    console.log('sessionDecryptKey', this.sessionDecryptKey);
    let deviceID = this.constant.deviceID;
    console.log('deviceID', deviceID);
    this.http.callBankingAPIService(param, deviceID, this.constant.upiserviceName_CHECKSIMBINDINGSTATUS, true).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00" || resp.opstatus == "02") {
        alert(JSON.stringify(resp));
      }
      else {
        if (maxCounter < 20) {
          setTimeout(() => {
            var cnt = maxCounter + 1;
            this.getSimDataTemp(cnt);
          }, 5000);
        }
        else {
          alert("sim binding failed");
        }

      }
    });
  }


  closePopup(type) {
    this.commonMethods.closePopup(type);
    if (type == "div.popup-bottom.user-verification") {
      // this.router.navigate(['/upiLogin']);
      this.dataService.routeWithNgZone('upiLogin');
    }else if(type == 'div.popup-bottom.non-psb'){
      this.dataService.routeWithNgZone('LandingPage');
    }
  }


  smsLoader(showLoader) {
    this.ngZone.run(() => {
    $('#sendsmsModal').modal({
      backdrop: 'static',
      keyboard: false,
      show: showLoader
    });
  });
  }


  storeSimData(index) {
    console.log("inside storeSimData");
    this.dataService.simData
    let isDualSim = this.dataService.simData.activeSubscriptionInfoCountMax > 0 ? true : false;
    let simOne;
    let simTwo;

    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      simOne = "blank";
      simTwo = "blank";

      this.plugin.checkSimStatusAndroid(simOne, simTwo, isDualSim).subscribe((response) => {
        console.log("Sim Detect Success => ", response);

        if (response.status == "00") {
          index == 0 ? this.localStorage.setLocalStorage("SimOneId", response.simOneInfo) : this.localStorage.setLocalStorage("SimTwoId", response.simTwoInfo);

        } else {
          console.log("Sim Ids not found...");
        }
      }, (err) => {
        console.log("Sim Detect Error => ", err);
      });
    } else {
      console.log("ELSE Platform => ", this.dataService.platform);
    }
  }

  ngOnDestroy(){
    this.showSMSLoader = false;
    $('#sendsmsModal').modal('hide');
    clearInterval(this.dataService.simBindingInterval);
  }


  registerSIMChangeEvent(){
    this.plugin.registerSIMChangeEvent().subscribe((response) => {
      console.log('registerSIMChangeEvent ',JSON.stringify(response))
    })
  }
}
