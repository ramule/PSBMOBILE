import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { PluginService } from '../../../services/plugin-service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { ProfileDetailsService } from '../../omni/profile/profile-details/profile-details.service';
import { MyProfileService } from '../profile/my-profile/my-profile.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { ProfileUpdateService } from '../../omni/profile/profile-update/profile-update.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var personalDetails : any ;
declare var cordova:any;
declare var navigator: any;
declare var window: any;

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})

export class PersonalDetailsComponent implements OnInit {
  mobileNumber= "NA";
  changeType = "";
  saveProfileImg = "";
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'PERSONAL_DETAILS',
    'footertype':'none'
  }

  croppedImageBase64 = "";
  information = "";

  constructor(
    private router:Router,
    public dataService: DataService,
    private translate: TranslatePipe,
    private localStorageService: LocalStorageService,
    private constant: AppConstants,
    private ngZone:NgZone,
    private pluginService: PluginService,
    private profileDtlsService :ProfileDetailsService,
    private profileService : ProfileUpdateService,
    private http: HttpRestApiService,
    private domSanitizer : DomSanitizer,
    public commonMethod: CommonMethods, ) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    personalDetails();
    this.mobileNumber =  this.commonMethod.processPhoneNo(this.localStorageService.getLocalStorage(this.constant.storage_mobileNo))
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  /**
   * Select image from gallery and crop image in UPI for profile image upload
   */
  selectImageFromGallery(changeType) {
    console.log("selectImageFromGallery");
    console.log('changeType', changeType);
    this.changeType = changeType;
    var self = this;
    self.closePopup('div.popup-bottom.profile1');

    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      cordova.plugins.diagnostic.requestExternalStorageAuthorization(function (status) {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            self.pluginService.checkImagePickerReadPermission().subscribe((isPermissionAvailable) => {
              if (isPermissionAvailable) {
                self.pluginService.pickImage().subscribe((filePath) => {
                  self.pluginService.cropImage(filePath).then((fileUri) => {
                    console.log("fileUri", fileUri);
                    if (fileUri) {
                      self.commonMethod._getResizeBase64(fileUri).then((base64Image) => {
                        var filterBase64Img = '';
                        if (base64Image.split(",")[1] != null) filterBase64Img = base64Image.split(",")[1];
                        self.localStorageService.setLocalStorage(self.constant.storage_profileImage, filterBase64Img);
                        self.localStorageService.setLocalStorage(self.constant.storage_profImgUploadFlag, 'N');
                        self.saveProfileImg = self.dataService.profileImage;
                        self.dataService.profileImage = self.croppedImageBase64 = base64Image;
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
              self.commonMethod.openPopup('div.popup-bottom.header-info');
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
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
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
      self.dataService.imageUploadSelected = true;
      // self.dataService.removePreLoginFooterCss();
      console.log("ios fileUri");
      self.pluginService.cropImage(fileUri).then((fileUri) => {
        if (fileUri) {
          self.commonMethod._getResizeBase64(fileUri).then((base64Image) => {
            console.log('base64Image', base64Image);
            var filterBase64Img = '';
            if (base64Image.split(",")[1] != null) filterBase64Img = base64Image.split(",")[1];
            self.localStorageService.setLocalStorage(self.constant.storage_profileImage, filterBase64Img);
            self.localStorageService.setLocalStorage(self.constant.storage_profImgUploadFlag, 'N');
            self.saveProfileImg = self.dataService.profileImage;
            self.dataService.profileImage = self.croppedImageBase64 = base64Image;
            console.log('selectImageFromGallery base64 ', base64Image);
            self.setUpdateProfile();
          });
        }
      }, (err) => {
        console.log(err);
        this.dataService.imageUploadSelected = true;
        // self.dataService.removePreLoginFooterCss();
      });
    }, (err) => {
      console.log(err);
      this.dataService.imageUploadSelected = true;
      // self.dataService.removePreLoginFooterCss();
    });
  }

  /**
   * Common Profile Update Api call
   */
   setUpdateProfile() {
    var profileDetails, self = this;
    if (this.dataService.isUPILogin) {
      profileDetails = { address: '', email: this.dataService.upiUserEmailAdress, changeType: this.changeType };
    } else {
      // profileDetails = this.profileForm.value;
    }
    var param = this.profileService.getProfileUpdateParam(profileDetails, this.dataService.regUPICustData.customerName, this.croppedImageBase64, true);
    this.http.callBankingAPIService(param, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEUPDATE).subscribe(data => {
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.information = resp.Result;
        this.dataService.fetchUPIProfileDetails = true;
        this.localStorageService.setLocalStorage(this.constant.storage_profImgUploadFlag, 'Y');
        this.getProfileDetails();
        console.log(data);
      } else {
        this.ngZone.run(() => {
          this.dataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + this.localStorageService.getLocalStorage(this.constant.storage_profileImage));
          this.information = resp.Result;
          this.commonMethod.openPopup('div.popup-bottom.header-info');
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
    this.http.callBankingAPIService(param, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEDETAILS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.ngZone.run(() => {
          this.commonMethod.openPopup('div.popup-bottom.header-info');
          this.dataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + resp.base64Image);
          this.dataService.setUPIDetails(resp);
        });
      }
      // else {
      //   this.errorCallBack(data.subActionId, resp);
      // }
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
      console.log("takePhoto => requestCameraAuthorization = ", status);
      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          self.pluginService.openCamera().then((result) => {
            self.dataService.imageUploadSelected = true;
            // self.dataService.removePreLoginFooterCss();
            console.log("open camera");
            console.log(result);
            self.pluginService.cropImage(result).then((fileUri) => {
              if (fileUri) {
                console.log("fileUri 2 ==>" + fileUri);
                self.commonMethod._getResizeBase64(fileUri).then((base64Image) => {
                  var filterBase64Img = '';
                  if (base64Image.split(",")[1] != null) filterBase64Img = base64Image.split(",")[1];
                  self.localStorageService.setLocalStorage(self.constant.storage_profileImage, filterBase64Img);
                  self.localStorageService.setLocalStorage(self.constant.storage_profImgUploadFlag, 'N');
                  self.saveProfileImg = self.dataService.profileImage;
                  self.dataService.profileImage = self.croppedImageBase64 = base64Image;
                  console.log('takePhoto base64 ', base64Image);
                  self.setUpdateProfile();
                });
              }
            }, (err) => {
              console.log(err);
              self.dataService.imageUploadSelected = true;
              // self.dataService.removePreLoginFooterCss();
            });
          }, (error) => {
            console.error('camera ', error);
            self.dataService.imageUploadSelected = true;
            // self.dataService.removePreLoginFooterCss();
          });
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          self.ngZone.run(() => {
            self.information = 'ENABLE_CAMERA_PERMISSION_MSG';
            self.commonMethod.openPopup('div.popup-bottom.header-info');
          });
          return;
        default:
          break;
      }
    }, function (error) {
      console.error(error);
    });

  }


  closeProfilePopUp() {
    this.closePopup('div.popup-bottom.profile1');
  }

  removeProfilePopUp() {
    var self = this;
    self.closeProfilePopUp();
    console.log("delete-profile-pic");
    self.commonMethod.openPopup('div.popup-bottom.delete-profile-pic-1');
  }

  closePopup(popupName) {
    this.commonMethod.closePopup(popupName);
  }

  closeRemoveProfilePopUp() {
    this.closePopup('div.popup-bottom.delete-profile-pic-1');
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


  selectProfile(){
    // alert("inside alert");
  }

}
