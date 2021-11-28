import { LocationStrategy } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { filter, pairwise } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constant';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../services/data.service';
import { DashboardService } from '../../omni/dashboard/dashboard.service';
import { BiometricStatus } from 'src/app/utilities/app-enum';
import { FormatDatePipe } from '../../../pipes/date-formatter.pipe';
import * as moment from 'moment';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var showAndHideKeyBoard: any;
declare var cordova: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  commonPageComponent: any;
  selectedMenuIndex = 0;
  selectedSubMenuIndex = -1;
  upiProfileDetails: any;
  isBiometricAvailable = false;
  profileImage: any;
  // activeSideMenu :any = 'dashboard';
  isMobile = false;
  menuLists = [];
  upiMenuLists = [];
  upiLastLogin = "";
  upiUsername = "";
  appVersion = "";
  isBiometricEnabled = false;
  informationLabel = "";
  information = "";
  biometricType = "";
  biometriSelectedOption: any;
  checkLocationPermissions = true;
  showSettingsBtn: boolean = false;

  constructor(
    private router: Router,
    public plugin: PluginService,
    private commonMethod: CommonMethods,
    private encryptDecrypt: EncryptDecryptService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private ngZone: NgZone,
    private domSanitizer: DomSanitizer,
    private http: HttpRestApiService,
    private idle: Idle,
    private dashboardService: DashboardService,
    public DataService: DataService,
    private translatePipe: TranslatePipe,
    private formatDatePipe: FormatDatePipe,
    private loaderService: pageLoaderService,

  ) { }

  ngOnInit(): void {
    console.log("Init Side Menu");
    $('.lst-nav-items li a').addClass('active');
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.appVersion = this.constant.val_mobileAppVersion_android;
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      this.appVersion = this.constant.val_mobileAppVersion_ios;
    } else {
      this.appVersion = "";
    }
    this.menuLists = this.constant.menuLists;
    this.upiMenuLists = this.constant.upiMenuLists;
    this.DataService.currentMessage.subscribe((message) => { this.commonPageComponent = message; this.selectedMenuIndex = 0; });
    this.isMobile = this.DataService.isCordovaAvailable;
    this.formatLastLoginDate();
    // this.checkIfLocationEnabled();
    this.isBiometricEnabled = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y && this.storage.getLocalStorage(this.constant.key_localStorage_biometricChanged) != this.constant.val_localStorage_Y ? true : false;
    console.log("1 isBiometricEnabled ",this.isBiometricEnabled);
    // this.isBiometricAvailable = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y ? true : false;
    if(this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      this.isBiometricAvailable = true;
    }
    console.log("1 this.isBiometricAvailable ", this.isBiometricAvailable);
    // if(!this.isBiometricAvailable) {
      this.checkBiometricAvailable();
    // }
    this.initializeEvents();
    if (this.DataService.isCordovaAvailable) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        if (!this.DataService.isLatLongFetched) {
          this.checkIfLocationEnabled();
        } else if (this.storage.getLocalStorage(this.constant.storage_isCheckBiometric) == "true" && this.DataService.isVpaZero == true) {
          this.showBiometricModal();
        }
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        this.checkLocationPermission();
      } else {
        console.log("Unknown platform...");
      }
    }
    
  }

  getCameraPermissionIos() {
    cordova.plugins.diagnostic.requestCameraAuthorization((status) => {
      console.log('sideNav => iOS requestCameraAuthorization status = ', status);
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
          this.DataService.cameraPermissionGrantedIos = false;
          return;
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            this.DataService.cameraPermissionGrantedIos = true;
            return;
        default:
          console.log("default case..");
          break;
      }
    });
  }

  /**
   * set User details for UPI
   */
  setUserDetails() {
    this.DataService.upiCommonObservable.subscribe((profileDtls: any) => {
      this.profileImage = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + profileDtls.base64Image);
      this.upiUsername = profileDtls.customerName;
      // this.upiUsername = this.DataService.regUPICustData.customerName;
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.upiLastLogin = this.DataService.regUPICustData.lastLogin;
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        this.upiLastLogin = this.formatDatePipe.transformDateForIos(this.DataService.regUPICustData.lastLogin);
      }

      console.log('this.upiLastLogin', this.upiLastLogin);
      console.log('profileDtls nav', JSON.stringify(profileDtls));
    })
  }

  formatLastLoginDate() {
    this.DataService.upiCommonObservable.subscribe((profileDtls: any) => {
      // this.upiLastLogin = moment(this.DataService.regUPICustData.lastLogin).format('dddd MMM yyyy HH:mm');
      this.upiLastLogin = moment(this.DataService.regUPICustData.lastLogin).utcOffset(330).format('DD MMM yyyy, hh:mm:ss a');
      console.log('formatted this.upiLastLogin', this.upiLastLogin);
    })
  }

  gotoPage(routeName, index?: number, type?: string) {
    
    console.log('routename: ', routeName);
    // if(routeName == 'qrPayment'){
    //   // this.DataService.qrScanValue = "aGcRuTp3NY3IAVVg4IGeYKKkQqv5Mgx4N+qmLukEc8psytGL4ruchQ77DFHx/TTtjM++xtcFkC1LrrTFw2p+qkp76eK7mQPRNLCqa4sHscm5EyHzj2U8BZXBbn7WK3xV1VYVFO8G8vYuYlbSa6guFdtG5N7PCD4QebWFie5Wzvs= ~BENQRTEST~7020277287~000123450002~Pending~BEN"
    //   // this.router.navigate(['/qrPayment']);
    //   this.scanSendQrCode();
    //   return;
    // }

    if (type == 'menu' && routeName) {
      this.selectedMenuIndex = index;
      this.selectedSubMenuIndex = -1;
    } else {
      this.selectedSubMenuIndex = index;
      this.selectedMenuIndex = -1;
    }

    if (routeName == '/themeSettings') {
      this.DataService.setShowThemeObservable(true);
    }
    if (routeName == 'privacy') {
      this.ngZone.run(() => {
        if (this.storage.hasKeyLocalStorage(this.constant.storage_language)) {
          var lang = this.storage.getLocalStorage(this.constant.storage_language);
          if (this.storage.hasKeyLocalStorage(this.constant.storage_languageJson)) {
            var langJSON = this.storage.getLocalStorage(this.constant.storage_languageJson);
            var privacyPolicyURL = JSON.parse(langJSON)[lang]?.UPI_PRIVACY_POLICY;
            // this.plugin.openInAppBrowser(privacyPolicyURL);
            let iab = cordova.InAppBrowser.open(privacyPolicyURL, '_blank', 'location=no');
            console.log('iab object 1 =>');
            console.log(iab);
            iab.addEventListener('exit', function (event) {
              console.log('user closed inappbrowser1!');
              iab.hide();
            });
          }
        } else {
          var lang = this.storage.getLocalStorage(this.constant.storage_language);
          if (this.storage.hasKeyLocalStorage(this.constant.storage_languageJson)) {
            var langJSON = this.storage.getLocalStorage(this.constant.storage_languageJson);
            var privacyPolicyURL = JSON.parse(langJSON)['en']?.UPI_PRIVACY_POLICY;
            // this.plugin.openInAppBrowser(privacyPolicyURL);
            let iab = cordova.InAppBrowser.open(privacyPolicyURL, '_blank', 'location=no');
            console.log('iab object 2 =>');
            console.log(iab);
            iab.addEventListener('exit', function (event) {
              console.log('user closed inappbrowser2!');
              iab.hide();
            });
          }
        }
      });
    }
    else if (routeName) {
      this.router.navigateByUrl(routeName);
    }
    this.DataService.fromManagePayee.isfromMangepayee = false;
    this.DataService.isNavFromMyAccounts = false;
  }


  scanSendQrCode() {
    var self = this;
    this.plugin.qrCodeScan().subscribe((result) => {
      //alert(result);
      self.getQrResponse(self.encryptDecrypt.decryptText("919987737714EMVQR", self.commonMethod.removeLineBreaksFromBase64(result.text)));
    });
  }

  getQrResponse(result) {
    console.log(result);
    if (!this.commonMethod.validateEmpty(result)) {
      this.DataService.qrScanValue = result;
      this.router.navigate(['/qrPayment']);
    }
  }

  /**
   * close side nav
   */
  closeSideNAV() {
    if (this.DataService.isUPILogin) {
      this.commonMethod.closeSideNavUPI();
      this.commonMethod.closePopup('div.popup-bottom');
    }
  }

  /**
 * Open logout modal
 */
  openLogoutModal() {
    this.commonMethod.closeSideNavUPI();
    this.ngZone.run(() => {
      this.DataService.informationLabel = this.translatePipe.transform('LOGOUT');
      this.DataService.informationDetails = this.translatePipe.transform('LOGOUT_MSG');
      this.DataService.primaryBtnText = this.translatePipe.transform('YES');
      this.DataService.secondaryBtnText = this.translatePipe.transform('NO');
      this.commonMethod.openPopup('div.popup-bottom.logout1');
    })
  }


  /**
   * check biometric avaialable
   */

  checkBiometricAvailable() {
    this.DataService.upiBiometricCheckObservable.subscribe((checkBiometric: boolean) => {
      this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
        console.log("biometricResult = ");
        console.log(biometricResult);
        // if (biometricResult && biometricResult.available == true) {
        //   this.biometricType = biometricResult.result;
        //   this.isBiometricAvailable = true;
        //   this.isBiometricEnabled = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y && this.storage.getLocalStorage(this.constant.key_localStorage_biometricChanged) != this.constant.val_localStorage_Y ? true : false;
        //   console.log('2 isBiometricEnabled ==> ', this.isBiometricEnabled);
        // } else {
        //   this.isBiometricAvailable = false;
        // }

        

        if(biometricResult) {
          if(biometricResult.available) {
            this.biometricType = biometricResult.result;
            this.isBiometricAvailable = true;
            this.isBiometricEnabled = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y && this.storage.getLocalStorage(this.constant.key_localStorage_biometricChanged) != this.constant.val_localStorage_Y ? true : false;
            console.log('2 isBiometricEnabled ==> ', this.isBiometricEnabled);
          } else {
            console.log(biometricResult.code); //-101
            if(biometricResult.code.toString() == "-101") {
              this.isBiometricAvailable = true;
              this.isBiometricEnabled = false;
            }
          }
        } else {
          if(this.DataService.platform != this.constant.val_ios){
            this.isBiometricAvailable = false;
          } else {
            this.isBiometricAvailable = true;
          }
        }
      });
    })
  }

  showBiometricModal() {
    // showBiometricModal()
    this.ngZone.run(() => {
      this.commonMethod.openPopup('div.popup-bottom.confirmation');
    })
  }

  hideBiometricModal() {
    this.commonMethod.closePopup('div.popup-bottom.confirmation');
    this.DataService.regUPICustData.isBIOMETRICEnable = "N";
    this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric, 'N');
    this.storage.setLocalStorage(this.constant.storage_isCheckBiometric, "false");
  }

  thumbClick() {
    this.biometriSelectedOption = "biometric";
    this.DataService.regUPICustData.isBIOMETRICEnable = "Y";
  }

  faceClick() {
    this.biometriSelectedOption = "faceid";
    this.DataService.regUPICustData.isBIOMETRICEnable = "Y";
  }

  /**
   * This function is called on change event
   */
  enableDisableBiometric(event) {
    this.closeSideNAV();
    this.commonMethod.openPopup('div.popup-bottom.show-biometric-enable-disable-info')
    console.log('this.isBiometricEnabled 1', this.isBiometricEnabled);
  }


  closePopup(popupName) {
    if (popupName == 'div.popup-bottom.show-biometric-enable-disable-info') {
      this.isBiometricEnabled = !this.isBiometricEnabled;
    }
    console.log('this.isBiometricEnabled 2', this.isBiometricEnabled);
    this.commonMethod.closePopup(popupName);
  }


  /**
   * Close biometric popup and logout user.
   */
  closeBiometricInfoPopup() {
    this.information = "";
    this.commonMethod.closeAllPopup();
    // this.router.navigate(['/upiLogin'], { replaceUrl: true });
  }

  /**
   * Register/Deregister Biometric
   */
  registerDegisterBiometric(type) {
    if (this.DataService.isUPILogin) {
      this.informationLabel = this.translatePipe.transform('INFORMATION');
      this.commonMethod.closePopup('div.popup-bottom.show-biometric-enable-disable-info');
      this.commonMethod.closePopup('div.popup-bottom.confirmation');
      this.storage.setLocalStorage(this.constant.storage_isCheckBiometric, "false");
      if ((this.isBiometricEnabled || type == 'BIO') && this.DataService.isCordovaAvailable) {
        this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
          console.log(biometricResult);
          if (biometricResult?.code == BiometricStatus.BIOMETRIC_NOT_ENROLLED) {
            this.isBiometricEnabled = false;
            this.ngZone.run(() => {
              this.DataService.information = this.translatePipe.transform('ENROLL_FINGERPINT_FACEID_MSG');
              this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
              this.DataService.primaryBtnText = this.translatePipe.transform('OK');
              this.commonMethod.openPopup('div.popup-bottom.show-common-info');
            })
          }
          else {
            this.storage.setLocalStorage(this.constant.key_localStorage_biometricRegistered, this.constant.val_localStorage_N);
            this.plugin.authenticateBiometric('Fingerprint/FaceID Authentication').then((result) => {
              console.log("Fingerprint/FaceID Authentication");
              console.log(result);
              if (result == true) {
                this.information = this.translatePipe.transform('FINGERPRINT_FACEID_AUTH_ENABLED');
                this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric, this.constant.val_localStorage_Y);
                this.storage.setLocalStorage(this.constant.key_localStorage_biometricChanged, this.constant.val_localStorage_N);
                this.isBiometricEnabled = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y && this.storage.getLocalStorage(this.constant.key_localStorage_biometricChanged) != this.constant.val_localStorage_Y ? true : false;
                this.showSettingsBtn = false;
                this.showPopup('show-biometric-info-popup');
                //this.logout();
              } else {
                this.isBiometricEnabled = false;
                switch (result.code) {
                  case BiometricStatus.BIOMETRIC_LOCKED_OUT_PERMANENT:
                    this.showSettingsBtn = false;
                    this.information = this.translatePipe.transform("BIOMETRIC_DISABLED");
                    this.showPopup('show-biometric-info-popup');
                    break;
                  case BiometricStatus.BIOMETRIC_LOCKED_OUT:
                    this.showSettingsBtn = false;
                    this.information = this.translatePipe.transform("BIOMETRIC_TOO_MANY_ATTEMPTS");
                    this.showPopup('show-biometric-info-popup');
                    break;
                  case BiometricStatus.BIOMETRIC_AUTHENTICATION_FAILED:
                    console.log(result.code);
                    this.showSettingsBtn = true;
                    // this.information = this.translatePipe.transform("BIOMETRIC_AUTH_FAILED");
                    // this.information = this.translatePipe.transform("BIOMETRIC_AUTH_FAILED") + ". Please grant the biometric permissions from app settings.";
                    this.information = this.translatePipe.transform("BIOMETRIC_AUTH_FAILED") + this.translatePipe.transform("ENABLE_BIOMETRIC_PERMISSION_FROM_SETTINGS");
                    this.showPopup('show-biometric-info-popup');
                    break;
                  case BiometricStatus.BIOMETRIC_PERMISSION_NOT_GRANTED:
                    this.showSettingsBtn = false;
                    this.information = this.translatePipe.transform("BIOMETRIC_PERMISSION_NOT_GRANTED");
                    this.showPopup('show-biometric-info-popup');
                    break;
                  // case BiometricStatus.BIOMETRIC_DISMISSED:
                  //   this.information = this.translatePipe.transform("BIOMETRIC_CANCELED");
                  //   this.showPopup('show-biometric-info-popup');
                  //   break;

                  // case BiometricStatus.BIOMETRIC_UNKNOWN_ERROR:
                  //   this.information = this.translatePipe.transform("BIOMETRIC_CANCELED");
                  //   this.showPopup('show-biometric-info-popup');
                  //   break;
                  default:
                    break;
                }
              }
            });
          }
        });

      } else {
        this.information = this.translatePipe.transform('FINGERPRINT_FACEID_AUTH_DISABLED');
        this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric, this.constant.val_localStorage_N);
        this.showSettingsBtn = false;
        this.showPopup('show-biometric-info-popup');
        //this.logout();
      }
      // this.DataService.invokeLogout(info);
    }
  }

  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  /**
   * Logout api call
   */
  logout() {
    this.commonMethod.closePopup('div.popup-bottom.show-biometric-enable-disable-info');
    let logoutReqParams = this.dashboardService.getLogoutParams();
    this.http.callBankingAPIService(logoutReqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOGOUT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.DataService.isLogOutOmni = true;
        this.commonMethod.closeAnyModal();
        this.commonMethod.closeAllPopup();
        this.idle.stop();
        this.informationLabel = this.translatePipe.transform('INFORMATION');
        if (this.DataService.isUPILogin) {
          this.commonMethod.openPopup('div.popup-bottom.show-biometric-info-popup')
        } else {
          this.DataService.setShowThemeObservable(false);
          this.DataService.showDetails = false;
          if (this.constant.getPlatform() == "web") {
            this.router.navigate(['/login'], { replaceUrl: true });
          }
          else {
            this.router.navigate(['/loginMobile'], { replaceUrl: true });
          }
        }
      }
      else {
        // this.errorCallBack(data.subActionId, resp);
      }
    });
  }




  checkIfLocationEnabled() {
    // this.loader.showLoader();
    console.log("checkIfLocationEnabled");
    cordova.plugins.diagnostic.requestLocationAuthorization((status) => {
      this.checkLocationPermissions = false;
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
          this.proceedToCheckLocationAccurracy()
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
          this.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          console.log("Permission permanently denied");
          this.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          console.log("Permission granted always");
          this.proceedToCheckLocationAccurracy()
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          console.log("Permission granted only when in use");
          this.proceedToCheckLocationAccurracy()
          break;
      }
    }, function (error) {
      console.error(error);
    }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
  }

  proceedToCheckLocationAccurracy() {
    cordova.plugins.locationAccuracy.canRequest((canRequest) => {
      if (canRequest) {
        cordova.plugins.locationAccuracy.request((success) => {
          console.log("Successfully requested accuracy: " + success.message);
          this.loaderService.showLoader();
          this.checkLocationPermission();
        }, (error) => {
          console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
          if (error.code == cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
            //  if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
            // cordova.plugins.diagnostic.switchToLocationSettings();
            //  }
            this.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
          }
        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);

      } else {
        // this.showPopup('location-permission-denied');
        //   
        // request location permission and try again
      }
    });
  }

  requestLocationAuthorizationIos() {
    let self = this;
    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                self.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted always");
                self.getCurrentLocationIos();
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                console.log("Permission granted only when in use");
                self.getCurrentLocationIos();
                break;
        }
    }, function(error){
        console.error(error);
    }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
  }

  checkLocationPermission() {
    console.log('this.DataService.isLatLongFetched', this.DataService.isLatLongFetched);
    let self = this;
    if (!this.DataService.isLatLongFetched) {
      cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                self.requestLocationAuthorizationIos();
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                self.commonMethod.openPopup('div.popup-bottom.location-permission-denied', true)
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted always");
                self.getCurrentLocationIos();
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                console.log("Permission granted only when in use");
                self.getCurrentLocationIos();
                break;
        }
     }, function(error){
         console.error("The following error occurred: "+error);
     });
    } else {
      // if(!this.DataService.cameraPermissionGrantedIos) {
      //   this.getCameraPermissionIos();
      // }
    }
  }

  getCurrentLocationIos() {
    this.DataService.getCurrentLatLong().subscribe((data) => {
        console.log("location success");
        if (data) {
          if (this.isBiometricAvailable && this.DataService.isVpaZero == false) {
            if (this.storage.getLocalStorage(this.constant.storage_isCheckBiometric) == "true") {
              this.showBiometricModal();
            } else {
              this.storage.setLocalStorage(this.constant.storage_isCheckBiometric, "false");
            }
          }
          this.loaderService.hideLoader();
          this.DataService.isLatLongFetched = true;
        }
        else {
          this.loaderService.hideLoader();
        }
      }, err => {
        this.loaderService.hideLoader();
        console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
      });
      // this.getCameraPermissionIos();
  }

  goToSettings() {
    this.checkLocationPermissions = true;
    this.commonMethod.closePopup('div.popup-bottom.location-permission-denied');
    console.log("Opening native settings for location...");
    this.plugin.gotoSetting().subscribe((status) => {
      console.log("gotoSetting=====>", status);
    }, (err) => {
      console.log("gotoSetting error", err);
    });
  }

  goToNativeSettings() {
    this.commonMethod.closePopup('div.popup-bottom.show-biometric-info-popup');
    console.log("Opening native settings for Biometrics...");
    this.plugin.gotoSetting().subscribe((status) => {
      console.log("gotoSetting=====>", status);
    }, (err) => {
      console.log("gotoSetting error", err);
    });
  }

  initializeEvents() {
    document.addEventListener("resume", this.onResume.bind(this), false);
  }

  onResume() {
    console.log("OnResume called...");
    if (this.checkLocationPermissions && !this.DataService.isLatLongFetched) {
      this.commonMethod.closePopup('div.popup-bottom.location-permission-denied')
      this.checkIfLocationEnabled();
    }
    console.log("isBiometricAvailable ",this.isBiometricAvailable);
    console.log("isBiometricEnabled ",this.isBiometricEnabled);
    console.log('this.DataService.cameraPermissionGrantedIos', this.DataService.cameraPermissionGrantedIos);

    // if(!this.DataService.cameraPermissionGrantedIos) {
    //   this.getCameraPermissionIos();
    // }
    
    if(this.DataService.platform.toLowerCase() != this.constant.val_ios) {
      this.isBiometricAvailable = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y ? true : false;
    } else {
      this.isBiometricAvailable = true;
    }

    if(!this.isBiometricAvailable) {
      this.checkBiometricAvailable();
    }

    // if(!this.isBiometricEnabled) {
    //   this.showSettingsBtn = true;
    //   this.information = this.translatePipe.transform("BIOMETRIC_AUTH_FAILED") + ". Please grant the biometric permissions from app settings.";
    //   this.showPopup('show-biometric-info-popup');
    // }
  }
}