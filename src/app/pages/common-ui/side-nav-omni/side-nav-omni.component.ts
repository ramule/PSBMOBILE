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
declare var showAndHideKeyBoard: any;
declare var $:any;
@Component({
  selector: 'app-side-nav-omni',
  templateUrl: './side-nav-omni.component.html',
  styleUrls: ['./side-nav-omni.component.scss']
})
export class SideNavOmniComponent implements OnInit {
  commonPageComponent: any;
  selectedMenuIndex = 0;
  selectedSubMenuIndex = -1;
  upiProfileDetails: any;
  isBiometricAvailable = false;
  profileImage: any;
  // activeSideMenu :any = 'dashboard';
  isMobile = false;
  menuLists = [];
  menuListsloan = [];
  menuListsNri = [];
  upiMenuLists = [];
  menuListsMobile=[];
  upiLastLogin = "";
  upiUsername = "";
  appVersion = "";
  isBiometricEnabled = false;
  informationLabel = "";
  information = "";
  biometricType = "";
  userName: any;
  constructor(
    private router: Router,
    public plugin: PluginService,
    private commonMethod: CommonMethods,
    private encryptDecrypt: EncryptDecryptService,
    private storage: LocalStorageService,
    public constant: AppConstants,
    private ngZone: NgZone,
    private domSanitizer: DomSanitizer,
    private http: HttpRestApiService,
    private idle: Idle,
    private dashboardService: DashboardService,
    public DataService: DataService,
    private translatePipe: TranslatePipe,
    private formatDatePipe: FormatDatePipe
  ) { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
    this.userName = this.DataService.userDetails?.customerName;
    
 
    console.log("Init Side Menu");
    // this.activeSideMenu = 'dashboard';
    var self = this;
    $('.lst-nav-items li a').addClass('active');
    // $("div.ios-nav-overlay").click(function (e) {
    //   event.stopPropagation();
    //   // console.log('working');
    //   // $('div.popup-bottom.show-biometric-enable-disable-info').removeClass('popup-active');
    //   // $('div.ios-nav-overlay').fadeOut(400);
    //     self.isBiometricEnabled = !self.isBiometricEnabled;
    // });
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.appVersion = this.constant.val_mobileAppVersion_android;
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      this.appVersion = this.constant.val_mobileAppVersion_ios;
    } else {
      this.appVersion = this.constant.val_mobileAppVersion_android;
    }
    this.menuLists = this.constant.getPlatform() == 'web' ? this.constant.menuLists : this.constant.menuListsMobile;
    this.menuListsloan = this.constant.getPlatform() == 'web' ? this.constant.menuListsloans : this.constant.menuListsloans;
    this.menuListsNri = this.constant.menuListsNri
    this.upiMenuLists = this.constant.upiMenuLists;
    this.menuListsMobile = this.constant.menuListsMobile;
    this.DataService.currentMessage.subscribe((message) => { this.commonPageComponent = message; this.selectedMenuIndex = 0; });
  
    this.isMobile = this.DataService.isCordovaAvailable;
    // this.setUserDetails();

    this.formatLastLoginDate();
    this.checkBiometricAvailable();
  }

  formatLastLoginDate() {
      this.DataService.upiCommonObservable.subscribe((profileDtls: any) => {
        // this.upiLastLogin = moment(this.DataService.regUPICustData.lastLogin).format('dddd MMM yyyy HH:mm');
      this.upiLastLogin = moment(this.DataService.regUPICustData.lastLogin).utcOffset(330).format('DD MMM yyyy, HH:mm:ss');
      console.log('formatted this.upiLastLogin', this.upiLastLogin);
    })
  }

  gotoPage(routeName, index?: number, type?: string) {
    if(routeName == 'instantPay'){
      this.DataService.fromInstaPay = true;
    }else{
      this.DataService.fromInstaPay = false;
    }
    this.DataService.socialSecFromDashboard = false;
    this.DataService.currentMessage.subscribe((message) => { this.commonPageComponent = message; this.selectedMenuIndex = 0; });
    this.DataService.fundTransferTabType = 'self';

    this.DataService.getBreadcrumb('sidenav' , routeName)
  
    //  alert(" this.commonPageComponent " +  JSON.stringify(this.commonPageComponent ))
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
    if(routeName == '/sendMoney'){
      this.DataService.managePayeeToSend = "";
    }
    if(routeName == '/linkAccount'){
      this.DataService.previousPageUrl = "dashboard"
    }
    if (routeName == 'privacy') {
      if (this.storage.hasKeyLocalStorage(this.constant.storage_language)) {
        var lang = this.storage.getLocalStorage(this.constant.storage_language);
        if (this.storage.hasKeyLocalStorage(this.constant.storage_languageJson)) {
          var langJSON = this.storage.getLocalStorage(this.constant.storage_languageJson);
          var privacyPolicyURL = JSON.parse(langJSON)[lang]?.UPI_PRIVACY_POLICY;
          this.plugin.openInAppBrowser(privacyPolicyURL)
        }
      } else {
        var lang = this.storage.getLocalStorage(this.constant.storage_language);
        if (this.storage.hasKeyLocalStorage(this.constant.storage_languageJson)) {
          var langJSON = this.storage.getLocalStorage(this.constant.storage_languageJson);
          var privacyPolicyURL = JSON.parse(langJSON)['en']?.UPI_PRIVACY_POLICY;
          this.plugin.openInAppBrowser(privacyPolicyURL)
        }
      }
    }
    else if (routeName) {
      this.router.navigateByUrl(routeName);
    }
    this.DataService.fromManagePayee.isfromMangepayee = false;
    this.DataService.isNavFromMyAccounts = false;
  }





  /**
   * close side nav
   */
  closeSideNAV() {
      this.commonMethod.closeSideNavOmni();
  }
  gotoMyprofile(){
        this.router.navigateByUrl("/profileDetails");
  }

  /**
 * Open logout modal
 */



  /**
   * check biometric avaialable
   */



  /**
   * This function is called on change event
   */






  /**
   * Close biometric popup and logout user.
   */


  /**


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
      }
      else {
        // this.errorCallBack(data.subActionId, resp);
      }
      
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

    });
  }

  /**
   * This function is called on change event
   */
   enableDisableBiometric(event) {
    this.commonMethod.openPopup('div.popup-bottom.show-biometric-enable-disable-info')
  }


  closePopup(popupName) {
    if (popupName == 'div.popup-bottom.show-biometric-enable-disable-info') {
      this.isBiometricEnabled = !this.isBiometricEnabled;
    }
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
    console.log("registerDegisterBiometric");
    this.informationLabel = this.translatePipe.transform('INFORMATION');
      this.commonMethod.closeAllPopup();
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
              console.log('div.popup-bottom.show-common-info-sim');
              this.commonMethod.openPopup('div.popup-bottom.show-common-info-sim');
            })
          }
          else {
            this.storage.setLocalStorage(this.constant.key_localStorage_biometricRegistered, this.constant.val_localStorage_N);
            this.plugin.authenticateBiometric('Fingerprint/FaceID Authentication').then((result) => {
              console.log("Fingerprint/FaceID Authentication" + result);
              if (result == true) {
                this.information = this.translatePipe.transform('FINGERPRINT_FACEID_AUTH_ENABLED');
                this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric, this.constant.val_localStorage_Y);
                this.storage.setLocalStorage(this.constant.key_localStorage_biometricChanged, this.constant.val_localStorage_N);
                this.isBiometricEnabled = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y && this.storage.getLocalStorage(this.constant.key_localStorage_biometricChanged) != this.constant.val_localStorage_Y ? true : false;
                this.showPopup('show-biometric-info-popup');
                //this.logout();
              } else {
                this.isBiometricEnabled = false;
                switch (result.code) {
                  case BiometricStatus.BIOMETRIC_LOCKED_OUT_PERMANENT:
                    this.information = this.translatePipe.transform("BIOMETRIC_DISABLED");
                    this.showPopup('show-biometric-info-popup');
                    break;
                  case BiometricStatus.BIOMETRIC_LOCKED_OUT:
                    this.information = this.translatePipe.transform("BIOMETRIC_TOO_MANY_ATTEMPTS");
                    this.showPopup('show-biometric-info-popup');
                    break;
                  case BiometricStatus.BIOMETRIC_AUTHENTICATION_FAILED:
                    this.information = this.translatePipe.transform("BIOMETRIC_AUTH_FAILED");
                    this.showPopup('show-biometric-info-popup');
                    break;
                  case BiometricStatus.BIOMETRIC_PERMISSION_NOT_GRANTED:
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
        this.showPopup('show-biometric-info-popup');
        //this.logout();
      }
  }

  closeAllPopUp(){
    this.commonMethod.closeAllPopup();
  }

  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  /**
   * check biometric avaialable
   */

   checkBiometricAvailable() {
    this.DataService.upiBiometricCheckObservable.subscribe((checkBiometric: boolean) => {
      this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
        console.log(biometricResult);
        if (biometricResult && biometricResult.available == true) {
          this.biometricType = biometricResult.result;
          this.isBiometricAvailable = true;
          this.isBiometricEnabled = this.storage.getLocalStorage(this.constant.key_localStorage_isBiometric) == this.constant.val_localStorage_Y && this.storage.getLocalStorage(this.constant.key_localStorage_biometricChanged) != this.constant.val_localStorage_Y ? true : false;
          console.log('isBiometricEnabled ==> ', this.isBiometricEnabled)

        } else {
          this.isBiometricAvailable = false;
        }
      });
    })
  }


  openLogoutModal() {
    this.closeSideNAV();
    this.ngZone.run(() => {
      this.DataService.informationLabel = this.translatePipe.transform('LOGOUT');
      this.DataService.informationDetails = this.translatePipe.transform('LOGOUT_MSG');
      this.DataService.primaryBtnText = this.translatePipe.transform('YES');
      this.DataService.secondaryBtnText = this.translatePipe.transform('NO');
      this.commonMethod.openPopup('div.popup-bottom.logout1');
    })
  }



}
