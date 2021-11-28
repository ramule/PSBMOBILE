import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from '../../../services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { ScanQrService } from '../../../services/ScanQr.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { ScanQrRequestService } from '../../upi/scan-qr/scan-qr-code/scan-qr-request.service';
import { MandateList, Mandate } from '../../../models/mandate-model';

declare var cordova: any;
declare var dashBoardFooterActive: any;
declare var navigator: any;
declare var window: any;

import * as moment from 'moment';
import { RegistrationMobCheckService } from '../../omni/pre-login/registration/registration-mob-check/registration-mob-check.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  commonPageComponent: any;
  languageList: any;
  currentRouteUrl: any;
  popupData: any = {};
  qrModel: any = {};
  FinalQR: any;
  BharatQRAryList = [];
  innerArray: any;
  addKeyArray: any[];
  addLengthArray: any[];
  addValueArray: any[];
  qrImage: any = "";
  croppedImageBase64 = "";
  information = "";
  defaultVPAAccountDetails: any;
  scanQrText: any;
  createdByMeList: MandateList[] = [];
  acceptedByMeList: MandateList[] = [];
  pendingWithPayerList: MandateList[] = [];
  pendingWithMeList: MandateList[] = [];
  completedList: MandateList[] = [];
  mandateNotificationCount: any;

  constructor(private router: Router,
    public DataService: DataService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private pluginService: PluginService,
    private commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private translate: TranslatePipe,
    private location: Location,
    private scanQrService: ScanQrService,
    private localStorage: LocalStorageService,
    private scanQrRequestService: ScanQrRequestService,
    private ngZone: NgZone,
    public plugin: PluginService,
    private registrationService : RegistrationMobCheckService
  ) { }

  ngOnInit(): void {
    // dashBoardFooterActive();
    this.DataService.currentMessage.subscribe(message => (this.commonPageComponent = message))
    console.log('commonPageComponent ', JSON.stringify(this.commonPageComponent));
    this.DataService.selectedVpaDetailsPay = this.defaultVPAAccountDetails;
    this.currentRouteUrl = this.router.url;
    this.DataService.resetUpiPayData();
    // history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    // history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    //Intent Callback condition
    this.updateIcons();
    this.DataService.intentCallbackObservable.subscribe((QRDetals) => {
      if (!(Object.keys(QRDetals).length === 0)) {
        this.DataService.isDeepLinkIntentCalled = true;
        if (this.DataService.vpaAddressList.length > 0) {
          this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
          this.DataService.intentCallbackSource.complete();
          this.scanQrText = QRDetals;
          this.validateQR();
        }
      }
    })

    console.log(this.DataService?.currentPageUrl);
  }

  updateIcons() {
    this.DataService.updateIconsObservable.subscribe((notificationCountObj: any) => {
      console.log("INSIDE FOOTER");
      console.log(notificationCountObj);
      if (notificationCountObj) {
        this.mandateNotificationCount = parseInt(notificationCountObj.mandateNotificationCount);
      }
      console.log("this.mandateNotificationCount = ", this.mandateNotificationCount);
    });
  }

  scanQRCode() {
    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    this.DataService.resetCreateMandateData();
    this.DataService.resetUpiPayData();
    if (this.defaultVPAAccountDetails) {
      var self = this;
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        cordova.plugins.diagnostic.requestCameraAuthorization((status) => {
          console.log("Scan QR requestCameraAuthorization status => ");
          console.log(status);
          switch (status) {
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
              console.log("Other data =>", JSON.stringify({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }));

              cordova.plugins.QRCodeScannerPlugin.scan({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }, (QRDetals) => {
                console.log('QRDetals Success => ', QRDetals);
                // ScanQR check condition
                this.scanQrText = JSON.parse(QRDetals.text);
                if (this.scanQrText.isValidQR == 'Y') {
                  this.validateQR();
                } else {
                  self.showPopup("inValidQrCode", this.scanQrText);
                }
              }, (e) => {
                console.log("QRDetals Error => ", e)
              });
              break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
              this.DataService.cameraPermissionGrantedIos = false;
              this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
              return;
            default:
              console.log("Default => ", status);
              break;
          }
        }, function (error) {
          console.error(error);
        });
      } if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        window['plugins'].qrscan.startCamera((data) => {
          this.DataService.cameraPermissionGrantedIos = true;
          console.log('qrscan success', data);
          console.log("Other data => ", JSON.stringify({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }));
          if (data != "Cancelled") {
            //success handler
            if (data == "DENIED" || data == "Not Authorized") {
              //show popup to user to go to settings
              this.DataService.cameraPermissionGrantedIos = false;
              this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
            } else {
              this.scanQrText = data;
              this.validateQR();
            }
          } else {
            //failure handler
          }
        }, (error) => {
          console.log('qrscan error ', error);
        });
      }
    } else {
      if(this.DataService.omniUPIFlow){
        this.showPopup("voVPAFound", "");
      }else{
        this.showPopup("noAccountLinkAlert", "");
      }
    }
  }

  enableCameraPermission() {
    console.log("Opening native settings for Camera permission...");
    this.closePopup('div.popup-bottom.enable-camera-permission');
    cordova.plugins.diagnostic.switchToSettings(function () {
      console.log("Successfully switched to Settings app");
    }, function (error) {
      console.error("The following error occurred: " + error);
    });
  }

  // checkQrValidityIos(qrUriString) {
  //   if (qrUriString.startsWith("upi://pay")) {
  //     return true;
  //   } else if (qrUriString.startsWith("upi://collect")) {
  //     return true;
  //   } else if (qrUriString.startsWith("upi://mandate")) {
  //     return true;
  //   } else if (qrUriString.startsWith("000201")) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // {"umn":"fc40af801c3d4b06a3b11d6226e9d1a7@unionbank","am":"9.00","tn":"yog","validitystart":"23042021","validityend":"23042021","amrule":"EXACT","pa":"9959190477@upi","orgid":"159026","mode":"13","recur":"ONETIME","purpose":"08","sign":"MEQCIHALgMyWcRRkD4vE1YqAIWsqvxZ1Pd1WulwjjziS3ujEAiBcd2lp+u52RnvOtJ+dHJpbF+6GqE8PeXS10DRxuoh/tw","qrType":"collect","qrMode":"upi"}

  validateQR() {
    var self = this;
    let qrScanResult
    if (self.DataService.platform.toLowerCase() == self.constant.val_android) {
      qrScanResult = self.scanQrService.getQrResponse(self.scanQrText.response, self.scanQrText.fromGallery);
    } else if (self.DataService.platform.toLowerCase() == self.constant.val_ios) {
      qrScanResult = self.scanQrService.getQrResponse(self.scanQrText, false); //TODO : From Gallery implementation pending in ios
    } else {
      console.log("Unknown platform...");
    }

    console.log("RETURNED qrScanResult => ");
    console.log(qrScanResult);

    if (!qrScanResult) {
      self.showPopup("inValidQrCode", "");
    } else {
      if (qrScanResult.qrMode == 'upi' || qrScanResult.qrMode == 'upiGlobal') {
        self.DataService.ScanQrCodeData = qrScanResult;
        self.DataService.ScanQrCodeData.payType = 'UPI_ID';
        console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
        if (qrScanResult.qrMode == 'upiGlobal') {
          // Condition to check user enablement for UPI global
          self.validateGlobalQr();
        }
        else if (self.DataService.ScanQrCodeData.qrType == 'GST') {
          console.log("qrType=>", self.DataService.ScanQrCodeData.qrType);
          if (self.DataService.ScanQrCodeData.sign) {
            self.validateQrSign();
          }
          else {
            self.validateQrGST();
          }
        } else if (self.DataService.ScanQrCodeData.qrType == 'pay' || self.DataService.ScanQrCodeData.qrType == 'mandate' || self.DataService.ScanQrCodeData.qrType == 'collect') {
          if (self.DataService.ScanQrCodeData.sign) {
            if (self.DataService.ScanQrCodeData.pa) {
              self.validateQrSign();
            } else {
              self.showPopup("inValidQrCode", "");
            }
          }
          else {
            self.showPopup("insecure-qrcode", "");
          }
        } else {
          console.log("qrType not found");
        }
      } else if (qrScanResult.qrMode == 'BHARAT_QR') {
        self.DataService.ScanQrCodeData = qrScanResult;
        if (qrScanResult.qrPaymentAddress) {
            self.DataService.ScanQrCodeData.payType = 'UPI_ID';
            self.validateVpa();
        } else if (qrScanResult.qrIfsc && qrScanResult.qrAccountNo) {
          if (qrScanResult.qrMerchantCode == '0000') {
            this.popupData.error = 'Merchant details are incorrect'
            self.showPopup("inValidQrCode", this.popupData);
          } else if (qrScanResult.qrMerchantCode != '0000' && (!qrScanResult.qrReferenceNo || qrScanResult.qrReferenceNo == '')) {
            this.popupData.error = 'Incomplete transaction details'
            self.showPopup("inValidQrCode", this.popupData);
          } else {
            self.DataService.ScanQrCodeData.payType = 'BNK_ACT';
            qrScanResult.qrPaymentAddress = qrScanResult.qrAccountNo + "@" + qrScanResult.qrIfsc + ".ifsc.npci";
            self.validateVpa();
          }
        } else {
          self.showPopup("inValidQrCode", "");
        }
      }
    }
  }

  calCurToInr() {
    var FX = 54.00;
    var MarkUp = 2.5;
    var currScanAmount = 25;
    let inrAmount = (currScanAmount * FX) + (currScanAmount * FX) * ((currScanAmount / 100) * MarkUp); //(in percentage)
    console.log(inrAmount);
  }

  /**
   * Get Default Vpa Adress/Account Details
   */
  getDefaultVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.vpaAddressList.find((vpaAddress) => { return vpaAddress.default == "Y" });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    } else {
      if (this.DataService.vpaAddressList.length > 0) {
        let vpaAddressListCopy = this.DataService.vpaAddressList
        vpaAddressListCopy.map((vpaAddress: any, index) => {
          if (index == 0) {
            vpaAddress.default = "Y";
          } else {
            vpaAddress.default = "N";
          }
        });
        let defaultVpaAccountArr = vpaAddressListCopy.find((vpaAddress) => { return vpaAddress.default == "Y" });
        if (defaultVpaAccountArr) {
          let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
          return {
            vpaDetails: defaultVpaAccountArr,
            accountDetails: accountDetails
          }
        }
      } else {
        this.showPopup("noAccountAvailable", "");
      }
    }
  }

  /**
   * Get Default Vpa AccountNo Details
   * @param array 
   */
  getDefaultAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isDefaultAccount == "Y" });
    }
  }

  /**
 * To check if User UPI Id or Mobile number is valid 
 */
  validateVpa() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.scanQrRequestService.getUserLocation();
      var req = this.scanQrRequestService.setValidateVpaRequest(this.DataService.ScanQrCodeData, this.defaultVPAAccountDetails, transactionID);
      this.UpiApiCall(req);
    });
  }

  /**
  * To check if User UPI Id or Mobile number is valid 
  */
  validateQrGST() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.scanQrRequestService.getUserLocation();
      var req = this.scanQrRequestService.setValidateQrRequest(this.DataService.ScanQrCodeData, this.defaultVPAAccountDetails, transactionID);
      this.UpiApiCall(req);
    });
  }

  validateQrSign() {
    var req = this.scanQrRequestService.setValidateQrSignRequest(this.scanQrText);
    this.UpiApiCall(req);
  }

  validateGlobalQr() {
    var req = this.scanQrRequestService.setValidateGlobalQrRequest(this.scanQrText, this.DataService.ScanQrCodeData, this.defaultVPAAccountDetails);
    this.UpiApiCall(req);
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log(data);
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          // case this.constant.upiserviceName_GETMANDATETXNDETAIL:
          //   this.filterRecords(response);
          //   break;
          case this.constant.upiserviceName_VALIDATEMANDATE:
            this.ngZone.run(() => {
              this.DataService.acceptedMandate = new Mandate().deserialize(response.responseParameter.MANDATE_DETAILS);
              this.DataService.acceptedMandate.createdTime = moment(this.DataService.acceptedMandate.createdTime).format('DD/MM/yyyy hh:mm A')
              this.DataService.acceptedMandate.frequency = this.DataService.acceptedMandate.recurrencePattern;
              this.routeTo('/upiMandateRevokeViewDetails');
            })
            break;
          case this.constant.upiserviceName_VALIDATEADDRESS:
            this.DataService.validateAddressResp = response.responseParameter;
            this.DataService.selectedFlow = this.constant.val_npci_upiPayVpa;
            if (this.DataService.ScanQrCodeData.qrType == 'upiGlobal') {
              this.routeTo("/internationalPaymentConfirmation");
            } else if (this.DataService.ScanQrCodeData.qrType == 'collect') {
              this.pluginService.getTransactionId().subscribe((transactionID) => {
                var req = this.scanQrRequestService.setValidateMandateRequest(transactionID);
                this.UpiApiCall(req);
              });
            } else if (this.DataService.ScanQrCodeData.qrType == 'mandate') {
              this.DataService.createMandateObj.frequency = this.DataService.ScanQrCodeData.recur
              this.DataService.createMandateObj.startDate = this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validitystart);
              this.DataService.createMandateObj.endDate = this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validityend)
              this.DataService.createMandateObj.amount = this.DataService.ScanQrCodeData.am
              this.DataService.createMandateObj.validatedVpaAdress = this.DataService.ScanQrCodeData.pa;
              this.routeTo('/createMandatePayment');
            } else {
              this.routeTo("/scanQRPayment");
            }
            break;
          case this.constant.upiserviceName_VALIDATEQRSIGNATURE:
            this.DataService.selectedFlow = this.constant.val_npci_upiPayVpa;
            if (this.DataService.ScanQrCodeData.qrType == 'GST') {
              this.validateQrGST();
            } else {
              this.validateVpa();
            }
            // this.routeTo("/scanQRPayment");
            break;
          case this.constant.upiserviceName_VALIDATEQR:
            this.DataService.selectedFlow = this.constant.val_npci_upiPayVpa;
            this.DataService.validateAddressResp = response.responseParameter;
            if (this.DataService.ScanQrCodeData.qrType == 'GST') {
              this.routeTo("/scanQRPayment");
            } else {
              this.validateVpa();
            }
            break;
          case this.constant.upiserviceName_VALIDATEGLOBALQR:
            this.validateQrSign();
            break;
          default:
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            // this.showPopup("inValidQrCode", "");
            break;
          case this.constant.upiserviceName_VALIDATEQRSIGNATURE:
            let response = data.responseParameter.upiResponse;
            this.showPopup("inValidSignature", response);
            // this.validateVpa();
            break;
          case this.constant.upiserviceName_VALIDATEQR:
            // this.showPopup("inValidQrCode", "");
            // this.validateQrSign();
            break;
          case this.constant.upiserviceName_VALIDATEGLOBALQR:
            // this.showPopup("inValidQrCode", "");
            // this.validateQrSign();
            break;
          default:
            break;
        }
      }
    }, error => {
      this.showPopup("inValidQrCode", "");
      console.log("ERROR!", error);
    });
  }

  /**
   * show popup by popupName
   * @param popupName 
   * @param data 
   */
  showPopup(popupName, data?) {
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  /**
   * Close popup by popupName
   * @param popupName 
   */
  closePopup(popupName, exitApp?) {
    if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
      if (exitApp && this.DataService.isDeepLinkIntentCalled) {
        navigator.app.exitApp();
      }
    }
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  routeTo(location) {
    console.log('location', location);
    if(location == '/mobQuickAccessLanding'){
      this.DataService.quickAccessFromDashboard = true;
    }
    if(this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      this.plugin.checkSIMAvailable().subscribe((response) => {
        if (response == "true" || response == true) {
          this.DataService.routeWithNgZone(location);
        } else {
          this.DataService.informationLabel = this.translate.transform('INFORMATION');
          this.DataService.simInfoDetails = this.translate.transform('NO_SIM_AVAILABLE');
          this.DataService.primaryBtnText = this.translate.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.no-sim-available-ios');
        }
      });
    } else {
      this.DataService.routeWithNgZone(location);
    }
  }

  onClickYes() {
    this.closePopup('inValidSignature');
    if (this.DataService.ScanQrCodeData.qrType == 'GST') {
      this.validateQrGST();
    } else {
      this.validateVpa();
    }
  }

  checkFlow() {
    if (this.DataService.isCordovaAvailable) {
      console.log('Footer => this.DataService.platform = ', this.DataService.platform);
      if(this.storage.getLocalStorage(this.constant.storage_omniRegisteredUser)){
        this.router.navigateByUrl('/upiLogin')
      }else{
        if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
          // this.proceedToUPIFlow(); //uncomment for testing only
          this.getSMSPerms();
        } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
          this.isIphoneAndIosCompatible();
          // this.proceedToUPIFlow(); //uncomment for testing only
        }
      }
    } else {
      this.proceedToUPIFlow(); //uncomment for testing only
    }
  }

  proceedToUPIFlow() {
    this.DataService.upiRegistrationFlow = true;
    let isUPIRegistered = this.storage.getLocalStorage(this.constant.storage_isUpiRegistrationSuccess);
    // let isUPIRegistered =  true; //uncomment for testing only
    console.log('isUPIRegistered = ', isUPIRegistered);
    if (isUPIRegistered) {
      this.DataService.mobStaticEncKey = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
      this.routeTo("/upiLogin");
    }
    else if (!this.localStorage.hasKeyLocalStorage(this.constant.storage_simBindingSuccess)) {
      this.routeTo("/smsVerification");
    }else{
      this.mobileNoCheck();
    }

    // if (isUPIRegistered) {
    //   this.DataService.mobStaticEncKey = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
    //   this.routeTo("/upiLogin");
    // } else {
    //   if (!this.localStorage.hasKeyLocalStorage(this.constant.storage_simBindingSuccess)) {
    //     this.routeTo("/smsVerification");
    //   }
    //   else{
    //     this.DataService.mobStaticEncKey = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
    //     this.routeTo("/personalInfo");
    //   }
    // }
  }


  /**
   * Get Sim settings 
   */
  getSMSPerms() {
    /**
     * ask for sim permission
     */
    this.plugin.hasReadPermission().subscribe((status) => {
      console.log("checkSMSPermission", status);
      if (status) {
        this.DataService.upiRegistrationFlow = true;
        this.proceedToUPIFlow();
      }
      else {
        console.log("request denied");
        this.commonMethod.openPopup('div.popup-bottom.permission-not-granted');
      }
    })
  }

  isIphoneAndIosCompatible() {
    /* 
    Allow UPI only on iPhone 6S & iOS 13.4 onwards 
    Device models to check for:
    iPhone5,1 : iPhone 5 (GSM)
    iPhone5,2 : iPhone 5 (GSM+CDMA)
    iPhone5,3 : iPhone 5C (GSM)
    iPhone5,4 : iPhone 5C (Global)
    iPhone6,1 : iPhone 5S (GSM)
    iPhone6,2 : iPhone 5S (Global)
    iPhone7,1 : iPhone 6 Plus
    iPhone7,2 : iPhone 6
    */

    console.log("iPhone model = ", this.DataService.devicemodel);
    let iOSVersion = parseFloat(this.DataService.osversion);
    console.log("iOS Version = ", iOSVersion);

    if ((this.DataService.devicemodel == "iPhone5,1" || this.DataService.devicemodel == "iPhone5,2" || this.DataService.devicemodel == "iPhone5,3" || this.DataService.devicemodel == "iPhone5,4" || this.DataService.devicemodel == "iPhone6,1" || this.DataService.devicemodel == "iPhone6,2" || this.DataService.devicemodel == "iPhone7,1" || this.DataService.devicemodel == "iPhone7,2") || this.DataService.osversion < 13.4) {
      //show popup & block user flow
      console.log("iPhone & iOS are NOT compatible with UPI... ");
      this.commonMethod.openPopup('div.popup-bottom.upi-incompatible-device');
    } else {
      this.plugin.checkSIMAvailable().subscribe((response) => {
        if (response == true || response == "true") {
          this.proceedToUPIFlow();
        }
        else {
          this.commonMethod.closeAllPopup();
          this.commonMethod.openPopup('div.popup-bottom.no-sim-available-ios');
        }
      });
    }
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
        this.DataService.registrationData = data.responseParameter;
        this.DataService.registrationSecQue = data.set != undefined ? data.set?.records[0] : '';
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
        this.DataService.mobStaticEncKey = this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
        this.localStorage.setLocalStorage(this.constant.storage_mobileStaticEncrypyKey, this.DataService.mobStaticEncKey);

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
          this.DataService.userUpiRegStaus = this.DataService.registrationUpiData.UpiRegistrationSuccess;
          var nextPageURL: string = '';
          if (resp?.isUPIUser.toUpperCase() == 'Y') {
            this.localStorage.setLocalStorage(this.constant.storage_isUpiRegistrationSuccess, "true");
            if(this.DataService.platform.toLowerCase() == this.constant.val_android) this.plugin.enableSmartIntent(true);
            // clearInterval(this.DataService.simBindingInterval);
            this.DataService.routeWithNgZone('/upiLogin');
            // this.commonMethod.openPopup('div.popup-bottom.user-verification');
          }
          else {
            this.DataService.regUPICustData.email_id = "";
            this.DataService.regUPICustData.customerName = "";
            this.DataService.routeWithNgZone('/personalInfo');
          }
      }
      else if (resp.opstatus == "01") {
          // this.commonMethod.openPopup('div.popup-bottom.non-psb')
          this.commonMethod.closeAllPopup();
            this.localStorage.setLocalStorage(this.constant.storage_simBindingSuccess, "true")
            this.localStorage.setLocalStorage(this.constant.storage_mobileNo, mobileNo);
            this.localStorage.setLocalStorage(this.constant.storage_deviceId, resp.deviceId);
            this.localStorage.setLocalStorage(this.constant.storage_isTpinAvl, resp.isTpinAvl);
            this.localStorage.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
            this.localStorage.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
            this.localStorage.setLocalStorage(this.constant.storage_isBiomertric, resp.isBiomertric);
            this.localStorage.setLocalStorage(this.constant.storage_username, resp.userName);
            this.DataService.mobStaticEncKey = this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
            this.localStorage.setLocalStorage(this.constant.storage_mobileStaticEncrypyKey, this.DataService.mobStaticEncKey);
            this.DataService.regUPICustData.email_id = "";
            this.DataService.regUPICustData.customerName = "";
            this.DataService.routeWithNgZone('/personalInfo');
      }
      else {
        // this.errorCallBack(data.subActionId, resp);
      }
    });
  }
}