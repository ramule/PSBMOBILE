import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { AppConstants } from '../../../app.constant';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { DashboardService } from '../../omni/dashboard/dashboard.service';
import { LoginComponent } from '../../omni/pre-login/login/login.component';
import { DashboardPageComponent } from '../../omni/dashboard/dashboard-page/dashboard-page.component';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { CreateUpiService } from '../../upi/create-upi/create-upi.service';
import { PluginService } from 'src/app/services/plugin-service';
import { ProfileUpdateService } from '../../omni/profile/profile-update/profile-update.service';
import { ProfileDetailsService } from '../../omni/profile/profile-details/profile-details.service';
import { NotificationService } from '../../omni/notification/notification.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

declare var showToastMessage: any;
declare var $: any;
declare var navigator: any;
declare var createGlobalNavMore: any;
declare var showFilterModal: any;
declare var upiDashboard: any;
declare var cordova: any;
declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sessionDecryptKey: any;
  notificationList: any = [];
  commonPageComponent: any;
  lastLogin: any;
  profileImage: any = "./assets/images/svg/user-profile-w.svg";
  emailId = "";
  userName: any;
  previousUrl = [];
  croppedImageBase64 = "";
  information = "";
  // transactionNotificationCount: any;
  allPendingNotificationCount: any;
  informationLabel = "";
  informationDetails = "";
  isIntentCallbackReceived = false;
  notificationArray: any = "";
  rows: any = []
  changeType = "";
  saveProfileImg="";
  profileName = '' ;

  constructor(private router: Router,
    public DataService: DataService,
    private idle: Idle,
    private domSanitizer: DomSanitizer,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private location: Location,
    private commonMethods: CommonMethods,
    private dashboardService: DashboardService,
    private storage: LocalStorageService,
    private pluginService: PluginService,
    private profileService: ProfileUpdateService,
    private profileDtlsService: ProfileDetailsService,
    private notificationServicemob: NotificationService,
    private ngZone: NgZone,
    private translatePipe: TranslatePipe,
    public createUpiService: CreateUpiService,
    private encryptDecryptService: EncryptDecryptService,
    public commonMethod: CommonMethods
  ) { }

  ngOnInit(): void {
    //this.getProfileDtl() ;
    this.setHeaderDetails();
    this.setUserDetails();
    this.initialization() ;
    console.log("Notification List=====", this.notificationList);
    console.log("Header Init => linkAccountFlow == ", this.DataService.isLinkAccountFlow);
    this.updateIcons();
    console.log(this.constant.storage_profImgUploadFlag, this.storage.getLocalStorage(this.constant.storage_profImgUploadFlag));

  }

  initialization(){
    console.log(" isOmniLogin  ======> "+ this.DataService.isOmniLogin );
    //this.getProfileDtl() ;
  }

  routeTo(location) {
    // this.router.navigate([location]);
    this.DataService.routeWithNgZone(location);
  }

  updateIcons() {
    this.DataService.updateIconsObservable.subscribe((notificationCountObj: any) => {
      console.log("INSIDE HEADER");
      console.log(notificationCountObj);
      if (notificationCountObj) {
        this.allPendingNotificationCount = parseInt(notificationCountObj.allPendingNotificationCount);
      }
    });
  }

  /**
   * set User details for UPI and omni
   */
  setUserDetails() {
    this.DataService.upiCommonObservable.subscribe((profileDtls: any) => {
      if (profileDtls.hasOwnProperty('base64Image') && !this.commonMethods.validateEmpty(profileDtls.base64Image)) {
        this.DataService.fetchUPIProfileDetails = false;
        this.DataService.profileImage = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + profileDtls.base64Image);
      } else {
        this.DataService.profileImage = '';
      }
      console.log('profileImage Header ', this.DataService.profileImage);
      this.emailId = profileDtls.email_id;
      this.DataService.userName = profileDtls.customerName;
      console.log('username ',this.DataService.userName);
      console.log('profileDtls ', JSON.stringify(profileDtls));
    });
    if (this.storage.getLocalStorage(this.constant.storage_profImgUploadFlag) == 'N') {
      this.croppedImageBase64 = this.storage.getLocalStorage(this.constant.storage_profileImage);
      this.DataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + this.storage.getLocalStorage(this.constant.storage_profileImage));
      // this.setUpdateProfile();
    } else {

    }
  }

  setHeaderDetails() {
    this.DataService.currentMessage.subscribe(message => (this.commonPageComponent = message))

    if (this.constant.getEntityId() == this.constant.val_entityIDMob) {
      this.lastLogin = this.DataService.userDetails?.mobileLastLogin
    }
    else {
      this.lastLogin = this.DataService.userDetails?.webLastLogin
    }

    this.DataService.commonBehaviorObservable.subscribe((profileDtls: any) => {
      if (profileDtls.hasOwnProperty('base64Image') && !this.commonMethods.validateEmpty(profileDtls.base64Image)) {
        this.profileImage = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + profileDtls.profileImg);
      }
      else {
        this.profileImage = '';
      }
      this.userName = profileDtls.username;
      console.log('profileDtls.profileImg: ', profileDtls.profileImg);
      console.log('profileImage ', this.profileImage);
    })

    this.userName = this.DataService.userDetails?.FirstName + ' ' + this.DataService.userDetails?.LastName
    console.log("userDetails ======> " + this.DataService.userDetails);
  }



  logoutapp() {
    // need to change after some time
    let logoutReqParams = this.dashboardService.getLogoutParams();
    this.http.callBankingAPIService(logoutReqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOGOUT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.DataService.setShowThemeObservable(false);
        this.DataService.isLogOutOmni = true;
        this.idle.stop();
        this.commonMethods.closePopup('div.popup-bottom.timeout1')
        if (this.DataService.isUPILogin) {
          this.router.navigate(['/upiLogin'], { replaceUrl: true });
        } else {
          this.DataService.isLoggedIn = false;
          this.DataService.showDetails = false;
          this.DataService.gotpage ="";
          if (this.constant.getPlatform() == "web") {
            showToastMessage(resp.Result, 'success')
            
            this.router.navigate(['/login'], { replaceUrl: true });
          }
          else {
            this.router.navigate(['/loginMobile'], { replaceUrl: true });
          }
        }


        this.storage.clearSessionStorage();
        this.storage.clearOmniStorageAndVariable();
        this.DataService.clearVariable()

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * Open logout modal
   */
  openLogoutModal() {
    this.ngZone.run(() => {
      this.DataService.informationLabel = this.translatePipe.transform('LOGOUT');
      this.DataService.informationDetails = this.translatePipe.transform('LOGOUT_MSG');
      this.DataService.primaryBtnText = this.translatePipe.transform('YES');
      this.DataService.secondaryBtnText = this.translatePipe.transform('NO');
      this.commonMethods.openPopup('div.popup-bottom.logout1');
    })
  }
  menuClick() {
    this.DataService.getAccountCarouselOptions();
    this.DataService.getCustomizeMenuCarouselOptions();
    this.DataService.getinvestCarouselOptions();

  }


  openProfile() {
    this.router.navigateByUrl("/profileDetails");
  }

  notification() {
    this.router.navigateByUrl("/omniNotification");
  }
  // openProfilePopUp(){
  //   this.commonMethods.openPopup('div.popup-bottom profile1');
  // }

  backbtnClick() {
    let url = this.router.url;
    if (this.DataService.isDeepLinkIntentCalled && this.DataService.platform.toLowerCase() == this.constant.val_android) {
      // var paramObj = {
      //   txnId: this.DataService.payReceiptTransId,
      //   responseCode: this.DataService.payReceiptObj?.responseParameter?.responseCode ? this.DataService.payReceiptObj?.responseParameter?.responseCode : '',
      //   rrnValue: this.DataService.payReceiptObj?.responseParameter ? this.DataService.payReceiptObj.responseParameter.rrn : '',
      //   status: this.DataService.payReceiptObj?.responseParameter.status ? 'SUCCESS' : 'FAILED',
      //   refId: self.DataService.payReceiptObj?.responseParameter ? self.DataService.payReceiptObj.responseParameter.rrn : '',
      //   appId: this.constant.val_app_pakage_name
      // }
      // window.plugins.launchmyapp.setIntent(paramObj, (d) => {
      //   console.log('setIntent Success => ', d);
      // }, (e) => {
      //   console.log('setIntent Error => ', e);
      this.ngZone.run(() => {
        this.informationLabel = this.translatePipe.transform('INFORMATION');
        this.informationDetails = this.translatePipe.transform('PAYMENT_CANCEL_MSG');
        this.commonMethods.openPopup('div.popup-bottom.show-intent-message');
        // return;
      })
      // });
    } else {
      // if current page is not in whitelistPages
      // then back to home or login page first
      if (url == '/login' || url == '/upiLogin' || url == '/loginMobile') {
        navigator.app.exitApp();
      } else {
        if(url == '/upiDashboard' && this.DataService.omniUPIFlow){
          if(this.DataService.fromOmniLogin){
            this.router.navigateByUrl('/dashboardMobile')
          }
        }else{
          console.log("======> back click");
          this.location.back()
        }
        // this.location.replaceState
      }
    }

  }

  handleIntentCallback() {
    var self = this;
    if (self.isIntentCallbackReceived || self.DataService.isDeepLinkIntentCalled) {
      var paramObj = {
        txnId: self.DataService?.payReceiptTransId ? self.DataService?.payReceiptTransId : '',
        responseCode: self.DataService.payReceiptObj?.responseParameter?.responseCode ? self.DataService.payReceiptObj?.responseParameter?.responseCode : '',
        rrnValue: self.DataService.payReceiptObj?.responseParameter ? self.DataService.payReceiptObj.responseParameter.rrn : '',
        status: self.DataService.payReceiptObj?.responseParameter.status ? 'SUCCESS' : 'FAILURE',
        refId: self.DataService.payReceiptObj?.responseParameter ? self.DataService.payReceiptObj.responseParameter.rrn : '',
        appId: this.constant.val_app_pakage_name
      }

      window.plugins.launchmyapp.setIntent(paramObj, (d) => {
        console.log('setIntent Success => ', d);
      }, (e) => {
        console.log('setIntent Error => ', e);
      });
    }
  }

  openThemePanel() {
    this.DataService.setShowThemeObservable(true);

    $('body').find('.main').addClass('themebaractive')
  }

  /**
 * function to called on unsuccessfull responce
 * @subActionId
 * @resp
 */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  filterHeader() {
    // createGlobalNavMore();
    showFilterModal()
  }

  close() {
    this.location.back();
  }

  showInfoPopup() {
    this.createUpiService.openInformationPopup();
  }

  openProfilePopUp() {
    // upiDashboard();
    this.commonMethods.openPopup('div.popup-bottom.profile1');
  }

  closeProfilePopUp() {
    this.closePopup('div.popup-bottom.profile1');
  }

  removeProfilePopUp() {
    this.closeProfilePopUp();
    this.commonMethods.openPopup('div.popup-bottom.delete-profile-pic');
  }

  closeRemoveProfilePopUp() {
    this.closePopup('div.popup-bottom.delete-profile-pic');
  }

  closePopup(popupName) {
    this.commonMethods.closePopup(popupName);
  }

  /**
   * Remove profile picture in UPI
   */
  removeProfilePicture(changeType) {
    this.changeType = changeType;
    this.croppedImageBase64 = "";
    this.closeRemoveProfilePopUp();
    this.setUpdateProfile();
  }

  closePopups() {
    this.commonMethods.closeAllPopup();
  }

  /**
   * Select image from gallery and crop image in UPI for profile image upload
   */
  selectImageFromGallery(changeType) {
    console.log("selectImageFromGallery");
    this.changeType = changeType;
    var self = this;
    self.closePopup('div.popup-bottom.profile1');

    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      cordova.plugins.diagnostic.requestExternalStorageAuthorization(function (status) {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            self.pluginService.checkImagePickerReadPermission().subscribe((isPermissionAvailable) => {
              if (isPermissionAvailable) {
                self.pluginService.pickImage().subscribe((filePath) => {
                  self.pluginService.cropImage(filePath).then((fileUri) => {
                    console.log("fileUri", fileUri);
                    if (fileUri) {
                      self.commonMethods._getResizeBase64(fileUri).then((base64Image) => {
                        var filterBase64Img = '';
                        if (base64Image.split(",")[1] != null) filterBase64Img = base64Image.split(",")[1];
                        self.storage.setLocalStorage(self.constant.storage_profileImage, filterBase64Img);
                        self.storage.setLocalStorage(self.constant.storage_profImgUploadFlag, 'N');
                        self.saveProfileImg = self.DataService.profileImage;
                        self.DataService.profileImage = self.croppedImageBase64 = base64Image;
                        console.log('selectImageFromGallery base64 ', base64Image);
                        self.setUpdateProfile();
                      });
                    }
                  }, (err) => {
                    console.log(err);
                  });
                });
              }
            });
            break;
          // case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
          //   window['imagePicker'].requestReadPermission();
          //   break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            self.ngZone.run(() => {
              self.information = 'ENABLE_STORAGE_PERMISSION_MSG';
              self.commonMethods.openPopup('div.popup-bottom.header-info');
            })
            // case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
            //   window['imagePicker'].requestReadPermission();
            //   break; self.commonMethods.openPopup('div.popup-bottom.header-info');
            break;
          default:
            break;
        }
      }, function (error) {
        console.error(error);
      });
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      console.log("requesting gallery access...")
      this.getGalleryAccessStatusIos();
    } else {
      console.log("unknown platform..");
    }
  }

  getGalleryAccessStatusIos() {
    let self = this;
    cordova.plugins.diagnostic.getCameraRollAuthorizationStatus(function(status){
      console.log('getCameraRollAuthorizationStatus = ', status);
      switch(status){
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
          console.log("Permission not requested");
          self.requestCameraRollAccessIos();
        break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          console.log("Permission denied");
          //TODO: go to settings
          self.ngZone.run(() => {
            self.information = 'ENABLE_PHOTOS_PERMISSION_MSG';
            self.commonMethod.openPopup('div.popup-bottom.header-info');
          });
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          console.log("Permission granted, opening gallery");
          self.openGalleryIos();
        break;
        default:
          console.log("Default => ", status);
        break;
      }
    }, function(error){
        console.error("The following error occurred: "+error);
    });
  }

  requestCameraRollAccessIos() {
    let self = this;
    cordova.plugins.diagnostic.requestCameraRollAuthorization(function(status){
      console.log("Authorization request for camera roll was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
      if(status == cordova.plugins.diagnostic.permissionStatus.GRANTED) {
        self.openGalleryIos();
      } else {
        self.getGalleryAccessStatusIos();
      }
    }, function(error){
        console.error(error);
    });
  }

  openGalleryIos() {
    console.log("Opening gallery 2...");
    let self = this;
    self.pluginService.openCameraGallery().then((fileUri) => {
      self.DataService.imageUploadSelected = true;
      // self.DataService.removePreLoginFooterCss();
      this.ngZone.run(() => {
        if(this.DataService.bezellessIphone) {
          $("#mainDiv").removeClass("pre-login");
        }
      });
      console.log("ios fileUri");
      self.pluginService.cropImage(fileUri).then((fileUri) => {
        if (fileUri) {
          self.commonMethod._getResizeBase64(fileUri).then((base64Image) => {
            console.log('base64Image', base64Image);
            var filterBase64Img = '';
            if (base64Image.split(",")[1] != null) filterBase64Img = base64Image.split(",")[1];
            self.storage.setLocalStorage(self.constant.storage_profileImage, filterBase64Img);
            self.storage.setLocalStorage(self.constant.storage_profImgUploadFlag, 'N');
            self.saveProfileImg = self.DataService.profileImage;
            self.DataService.profileImage = self.croppedImageBase64 = base64Image;
            console.log('selectImageFromGallery base64 ', base64Image);
            self.setUpdateProfile();
          });
        }
      }, (err) => {
        console.log(err);
        this.DataService.imageUploadSelected = true;
        // self.DataService.removePreLoginFooterCss();
        this.ngZone.run(() => {
          if(this.DataService.bezellessIphone) {
            $("#mainDiv").removeClass("pre-login");
          }
        });
      });
    }, (err) => {
      console.log(err);
      this.DataService.imageUploadSelected = true;
      // self.DataService.removePreLoginFooterCss();
      this.ngZone.run(() => {
        if(this.DataService.bezellessIphone) {
          $("#mainDiv").removeClass("pre-login");
        }
      });
    });
  }

  /**
   * Take photo from camera and crop image and update profile picture in UPI
   */
  takePhoto(changeType) {
    this.changeType = changeType;
    var self = this;
    self.closePopup('div.popup-bottom.profile1');
    cordova.plugins.diagnostic.requestCameraAuthorization(function (status) {
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          self.pluginService.openCamera().then((result) => {
            console.log(result);
            self.DataService.imageUploadSelected = true;
            // self.DataService.removePreLoginFooterCss();
            this.ngZone.run(() => {
              if(this.DataService.bezellessIphone) {
                $("#mainDiv").removeClass("pre-login");
              }
            });
            self.pluginService.cropImage(result).then((fileUri) => {
              if (fileUri) {
                console.log("fileUri 2 ==>" + fileUri);
                self.commonMethods._getResizeBase64(fileUri).then((base64Image) => {
                  var filterBase64Img = '';
                  if (base64Image.split(",")[1] != null) filterBase64Img = base64Image.split(",")[1];
                  self.storage.setLocalStorage(self.constant.storage_profileImage, filterBase64Img);
                  self.storage.setLocalStorage(self.constant.storage_profImgUploadFlag, 'N');
                  self.saveProfileImg = self.DataService.profileImage;
                  self.DataService.profileImage = self.croppedImageBase64 = base64Image;
                  console.log('takePhoto base64 ', base64Image);
                  self.setUpdateProfile();
                });
              }
            }, (err) => {
              console.log(err);
              self.DataService.imageUploadSelected = true;
              // self.DataService.removePreLoginFooterCss();
              this.ngZone.run(() => {
                if(this.DataService.bezellessIphone) {
                  $("#mainDiv").removeClass("pre-login");
                }
              });
            });
          }, (error) => {
            console.error('camera ', error);
            self.DataService.imageUploadSelected = true;
            // self.DataService.removePreLoginFooterCss();
            this.ngZone.run(() => {
              if(this.DataService.bezellessIphone) {
                $("#mainDiv").removeClass("pre-login");
              }
            });
          });
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          self.ngZone.run(() => {
            self.information = 'ENABLE_CAMERA_PERMISSION_MSG';
            self.commonMethods.openPopup('div.popup-bottom.header-info');
          });
          return;
        default:
          break;
      }
    }, function (error) {
      console.error(error);
    });

  }

  /**
   * Common Profile Update Api call
   */
  setUpdateProfile() {
    var profileDetails, self = this;
    this.DataService.upiCommonObservable.subscribe((profileDtls: any) => {
      this.emailId = profileDtls.email_id;
      console.log(this.emailId);
    })

    if (this.DataService.isUPILogin) {
      profileDetails = { address: '', email: this.emailId ? this.emailId : '', changeType: this.changeType };
    } else {
      // profileDetails = this.profileForm.value;
    }
    var param = this.profileService.getProfileUpdateParam(profileDetails, this.DataService.userName, this.croppedImageBase64, true);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEUPDATE).subscribe(data => {
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.information = resp.Result;
        this.DataService.fetchUPIProfileDetails = true;
        this.storage.setLocalStorage(this.constant.storage_profImgUploadFlag, 'Y');
        this.getProfileDetails();
        console.log(data);
      } else {
        this.ngZone.run(() => {
          this.DataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + this.storage.getLocalStorage(this.constant.storage_profileImage));
          this.information = resp.Result;
          this.commonMethods.openPopup('div.popup-bottom.header-info');
        });
      }
    });
  }

  /**
   * function to get profile details and display
   * api call for frofile
   */
  getProfileDetails() {
    let param = this.profileDtlsService.getProfileDetailsParam(true);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEDETAILS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.ngZone.run(() => {
          this.commonMethods.openPopup('div.popup-bottom.header-info');
          this.DataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + resp.base64Image);
          this.DataService.setUPIDetails(resp);
        });
      }
      // else {
      //   this.errorCallBack(data.subActionId, resp);
      // }
    });
  }

  getNotification() {
    if(this.DataService.isCordovaAvailable && this.DataService.omniUPIFlow){
      this.router.navigateByUrl('/commonNotification')
    }else{
      var param = this.notificationServicemob.getNotificationParam();
      let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
      this.getNotificationApiCall(param, deviceID)
    }

  }

  getNotificationApiCall(param, deviceID) {
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_NOTIFICATIONS).subscribe(data => {
      console.log(data);

      var resp = data.responseParameter

      console.log("Notification List=====", this.notificationList);
      if (resp.opstatus == "00") {
        this.notificationList = data.set.records;
        this.DataService.notificationArray = data.set.records
        console.log(data.responseParameter);
        this.notificationList = data.set.records;
        this.DataService.sendNotification(this.notificationList.toString());
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
      }
    });
  }
  share(notification) {
    var details = this.getSelectedValues(notification);
    if (this.constant.getPlatform() != "web") {
      window.plugins.socialsharing.share(details);
    }
    else {
      window.open('mailto:?subject=Account Details&body=' + details);
    }
  }
  goTodownload() {
    showToastMessage("Coming Soon", 'error');
  }

  goToPage(routeName) {
    this.DataService.routefrom = 'dashboard';
    this.router.navigateByUrl(routeName);
  }

  shareNotification() {
    showToastMessage("Coming Soon", 'error');
  }

  /**
   * Get selected values from notification details
   */
  getSelectedValues(notification) {
    let selectedFields = "";
    selectedFields += 'Header' + " : " + notification.header + ", ";
    selectedFields += 'Remark' + " : " + notification.remarks + ", ";
    selectedFields += 'Date' + " : " + notification.TransactionDate + ", ";
    console.log(selectedFields)
    return selectedFields.replace(/,\s*$/, "");
  }


  goToFilter() {
    showToastMessage("Coming Soon", 'error');
  }

  filter() {
    showToastMessage("Coming Soon", 'error');
  }


  /**
  *
  * @param print
  */
  generatePDF(print?: any) {
    var pdfsize = 'a4';
    var doc = new jsPDF();
    doc.setFontSize(11);
    // doc.text(this.accountNo?.accountHolderName, 10, 70);
    doc.setFontSize(11);
    doc.setFontSize(11);
    doc.text("NOTIFICATION", 10, 25);
    this.rows = []
    var data = []
    var data1 = []
    var columns = ["REFERENCE NO", "HEADER", "TRANSACTION DATE", "AMOUNT", "REMARK"];
    this.DataService.notificationArray.forEach(element => {


      var ref = element.cbsRefNo
      var header = element.header
      var date = element.TransactionDate
      var amt = element.txn_amount
      var remark = element.remarks



      data.push(ref)
      data.push(header)
      data.push(date)
      data.push(amt)
      data.push(remark)

      this.rows.push(data)

    });
    doc.autoTable(columns, this.rows, {
      theme: 'striped', // 'striped', 'grid' or 'plain',
      margin: { top: 30 },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        fontSize: '8'
      },
      columnStyles: {
        1: { cellWidth: 'auto' }
      }
    });


    if (print) {
      doc.autoPrint();
      window.open(doc.output('bloburl'));
    }
    else {
      this.commonMethod.downloadPDF(doc, 'notification');
    }
  }

  goToDashboard(){
    this.router.navigateByUrl('/dashboardMobile')
  }

}
