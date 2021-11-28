import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from '../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class UpiLoginService {
  latitude: any;
  longitude: any;
  userLocationName: any;

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService:DataService,
    private commonMethod:CommonMethods
  ) { }

  getUserLocation() {   
    // this.dataService.getCurrentLatLong().subscribe((data) => {
      // console.log('GeoLocation Plugin => getCurrentLatLong Success => ', data);
      // console.log(this.dataService.latitude);
      // console.log(this.dataService.longitude);

      this.latitude = this.dataService.latitude ? this.dataService.latitude : "0";
      this.longitude = this.dataService.longitude ? this.dataService.longitude : "0";

      // this.dataService.getUserLocationName(this.latitude, this.longitude).subscribe((data) => {
      //   console.log('data', data);
      //   console.log("dataservice.userLocationName => ", this.dataService.userLocationName);
        this.userLocationName = this.dataService.userLocationName;
    //   }, (err) => {
    //     console.log('err', err);
    //   });
    // }, err => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
    // });
  }


/**
   * request parameter for param for MPIN
   */

  getParamForLoginMPIN(mpin) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      // [this.constant.key_MobileNo]: formData.mobNumber,
      [this.constant.key_loginType]: this.constant.val_loginTypeMPIN,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_MPIN]: this.encryptDecryptService.createMD5Value(mpin),
    }
    console.log(JSON.stringify(inputData));
    return this.encryptDataForMobile(inputData);
  }

  encryptDataForMobile(inputData){
    console.log("storage_mobileStaticEncrypyKey",this.storage.getLocalStorage(this.constant.storage_mobileStaticEncrypyKey));
    // let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileStaticEncrypyKey), JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  getParamForLoginBiometric() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_loginType]: this.constant.val_bioMetric,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo)
    }

    console.log(JSON.stringify(inputData));
    return this.encryptDataForMobile(inputData);

  }

  getParamForLoginFaceId() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      // [this.constant.key_MobileNo]: formData.mobNumber,
      [this.constant.key_loginType]: this.constant.val_faceId,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo)
    }
    console.log(JSON.stringify(inputData));
    return this.encryptDataForMobile(inputData);
  }


  getAddressListAPICall() {

    var upiRequestObj = {

      [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS,
        [this.constant.key_upi_inputParam]:
          {
            [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
            [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),//this.constant.defaultLanguageCode,
            [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
            [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
            [this.constant.key_upi_device]:
              { 
                [this.constant.key_upi_app]:this.constant.val_app_pakage_name,
                [this.constant.key_upi_capability]:this.constant.val_upi_capability,
                [this.constant.key_upi_os]:this.dataService.platform,
                [this.constant.key_upi_lng]:this.longitude,
                [this.constant.key_upi_ip]:this.dataService.ipAddress,
                [this.constant.key_upi_location]: this.userLocationName,
                [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
                [this.constant.key_upi_deviceID]:this.storage.getLocalStorage(this.constant.storage_deviceId),
                [this.constant.key_upi_lat]:this.latitude
        }
      }
    }
    
    console.log("LOGIN VPAList Request => ", upiRequestObj);
    
   
     let inputData = {
      [this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
      };
   
      console.log('setVerifyRequest => ', JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
      console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
   
      return encryptData;
   
    }

    // Get default vpa
    getAccountDetailsForForgotMPINParam() {
      
      var upiRequestObj = {

        [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
          // [this.constant.key_upi_subAction]:this.constant.upiserviceName_GetDefaultVpa,
          [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETFORGOTMPINDEFAULTACCOUNT,
          [this.constant.key_upi_inputParam]:
            {
              [this.constant.key_upi_beneMobileNo]:"",
              [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
              [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
              [this.constant.key_upi_mobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
              [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
            }
      }
      
      let inputData = {
        [this.constant.key_entityId]:this.constant.val_entityId_UMOB,
        [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
        [this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,
        [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
        [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
        };
     
        console.log('Reuest Data => ', JSON.stringify(inputData));
    
        let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
        console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
     
        return encryptData;

      
    }

    getOtpValidationForForgotMPINParam(formData,unmaskedSubAccountNo) {
      
      var upiRequestObj = {

        [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_subAction]:this.constant.upiserviceName_VALIDATEFORGOTMPINDETAILS,
          [this.constant.key_upi_inputParam]:
            {
              [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
              [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
              [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
              [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
              [this.constant.key_upi_accNum]:unmaskedSubAccountNo+formData.accountNo
            }
      }
      
      let inputData = {
        [this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),
        [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
        [this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,
        [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
        [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_otpCode]:formData.otp,
        [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
        };
     
        console.log('Reuest Data => ', JSON.stringify(inputData));
    
        let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
        console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
     
        return encryptData;

      
    }



    getForgotMpinOtpParam(otpFlag){
      // var upiRequestObj = {
      //   [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      //   [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      //   [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETFAQ,
      //   [this.constant.key_upi_inputParam]:
      //     {
      //       [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      //       [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
      //       [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
      //     }
      // }


      var upiRequestObj = {

        [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETFORGOTMPINDEFAULTACCOUNT,
        [this.constant.key_upi_inputParam]:
            {
              [this.constant.key_upi_beneMobileNo]:"",
              [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
              [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
              [this.constant.key_upi_mobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
              [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
            }
      }
      
      let inputData = {
        [this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),
        [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
        [this.constant.key_upi_otpFlag]:otpFlag,
        [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
        };
        console.log('Request Data => ', JSON.stringify(inputData));

        let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
        console.log('getForgotMpinOtpParam => ', JSON.stringify(encryptData));
        return encryptData;
    }



    getForgotMpinValidateOtpParam(formData, unmaskedSubAccountNo, emailOtp, otpFlag){
      // var upiRequestObj = {
      //   [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      //   [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      //   [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETFAQ,
      //   [this.constant.key_upi_inputParam]:
      //     {
      //       [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      //       [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
      //       [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
      //     }
      // }


      var upiRequestObj = {

        [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_subAction]:this.constant.upiserviceName_VALIDATEFORGOTMPINDETAILS,
          [this.constant.key_upi_inputParam]:
            {
              [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
              [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
              [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
              [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
              [this.constant.key_upi_accNum]:formData.accountNo+unmaskedSubAccountNo
            }
      }
      
      let inputData = {
        [this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),
        [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
        [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_OTP] : emailOtp,
        [this.constant.key_upi_otpFlag]:otpFlag,
        [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
        };

        console.log('Reuest Data => ', JSON.stringify(inputData));

        let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
        console.log('getForgotMpinValidateOtpParam => ', JSON.stringify(encryptData));
        return encryptData;
    }
  

}
