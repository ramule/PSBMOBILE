import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../../app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ProfileDetailsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    public common : CommonMethods
  ) { }


  /**
   * request parameter for profile details
   */
  getProfileDetailsParam(isUPI?:boolean) {
    var inputData = {
      [this.constant.key_entityId]: isUPI ? this.constant.getEntityId(this.constant.val_entityId_UMOB) :this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
    }

    console.log("getProfileDetailsParam", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

   /**
  * request parameter for update profile
  */
    getProfileImageParam(emailId,userName,permanentAdd,profileImg?) {

      var base64Img = '';
      if(profileImg.split(",")[1] != null) base64Img = profileImg.split(",")[1];

      var inputData = {
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
        // [this.constant.Key_customerName]: userName ? userName : 'GURPREET SINGH STAFF',
        // [this.constant.key_emailId]: emailId ? emailId : '-',
        // [this.constant.key_address]: permanentAdd,
        // [this.constant.key_omni_methodName]:this.constant.serviceName_CUSTPROFILEUPDATEKEY,
        // [this.constant.key_omni_value]:'111111',
        // [this.constant.key_omni_customerID]: this.dataService.userDetails.customerId,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_base64Image]: base64Img,
      }

      console.log('getProfileUpdateParam',JSON.stringify(inputData));
      // let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    limitsView() {
      var inputData = {
        [this.constant.key_entityId]:this.constant.getEntityId(),
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_typeOfRequest]:"view",

      }

      console.log("LimitsView", JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    // addLimit(ibLimits,mbLimits,upiLimits,wbLimits){

    //   var inputData = {
    //     [this.constant.key_entityId]:this.constant.getEntityId(),
    //     [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    //     [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    //     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    //     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    //     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    //     [this.constant.key_limitName]:"IBLIMIT",
    //     // [this.constant.key_activityId]:"3437",
    //      [this.constant.key_frequency]:"D",
    //     // [this.constant.key_minValue]:"2000",
    //     //  [this.constant.key_maxValue]:ibLimits,
    //      [this.constant.key_maxValue]:ibLimits,
    //     //  [this.constant.key_LIMITTYPE_G_C]:"c",
    //     // [this.constant.key_type]:"C",
    //     // [this.constant.key_customerID]:"100004",


    //   }

    //   console.log("LimitsAdd", JSON.stringify(inputData));
    //   let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    //   return encryptData;
    // }


    // addLimitsss(ibLimits,mbLimits,upiLimits,wbLimits){
    //   var i;
    //   for (i = 0; i < 2; i++) {
    //   this.addLimits(ibLimits);
    //   this.addLimits1(mbLimits);
    //   }
    //  }

  addLimits1(ibLimits){

      var inputData = {
        [this.constant.key_entityId]:this.constant.getEntityId(),
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_limitName]:"IBLIMIT",

         [this.constant.key_frequency]:"D",

         [this.constant.key_maxValue]:ibLimits,



      }




      console.log("LimitsAdd", JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;




  }

  addLimits2(mbLimits){

    var inputData = {
      [this.constant.key_entityId]:this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,

      [this.constant.key_limitName]:"MOBILELIMIT",

       [this.constant.key_frequency]:"D",

       [this.constant.key_maxValue]:mbLimits,



    }




    console.log("LimitsAdd", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;




}

addLimits3(upiLimits){

  var inputData = {
    [this.constant.key_entityId]:this.constant.getEntityId(),
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_limitName]:"UPILIMIT",
     [this.constant.key_frequency]:"D",
      [this.constant.key_maxValue]:upiLimits,



  }




  console.log("LimitsAdd", JSON.stringify(inputData));
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;




}
  addLimits4(wbLimits){
    var inputData = {
      [this.constant.key_entityId]:this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_limitName]:"WATCHLIMIT",
      [this.constant.key_frequency]:"D",
      [this.constant.key_maxValue]:wbLimits,
    }
    console.log("LimitsAdd", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getEmailIdUpdateParam(emailId) {
      var inputData = {
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_entityId]: 'RMOB',
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      // [this.constant.key_UserID]: this.storage.getLocalStorage(this.constant.storage_username),
      [this.constant.key_UserID]: this.dataService.userName,
      [this.constant.key_Email]: emailId,
      [this.constant.key_referenceNumber]:this.dataService.profileDetails[0].referenceNumber
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getChannelLeadOtpParam(otp)
  {
    var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
     [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
     //[this.constant.key_latitude]: this.dataService.latitude,
     //[this.constant.key_longitude]: this.dataService.longitude,
     [this.constant.key_OTP]:otp,
     [this.constant.key_service_Type]: this.constant.val_REGISTRATION
     //[this.constant.key_mobileOtp] : mobileOtp,
     //[this.constant.key_referenceNumber]: this.dataService.referenceNo,

  }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }
  getChannelLeadOtpParamlimit(otp)
  {
    var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
     [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
     //[this.constant.key_latitude]: this.dataService.latitude,
     //[this.constant.key_longitude]: this.dataService.longitude,
     [this.constant.key_OTP]:otp,
     [this.constant.key_service_Type]: this.constant.val_REGISTRATION
     //[this.constant.key_mobileOtp] : mobileOtp,
     //[this.constant.key_referenceNumber]: this.dataService.referenceNo,

  }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }

  getResendOTPSessionParam(type)
  {
   var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
     [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
     [this.constant.key_service_Type]: type
  }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;


  }

  getSendOTPSessionReq(otpNo) {
    var reqObj;
    reqObj = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_OTP]: otpNo,
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude,
    }

    console.log(reqObj);
    return this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj))
  }

  getResendOTPSessionReq(type) {
    var reqObj;
    reqObj = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_MobileNo]:  this.storage.getLocalStorage(this.constant.storage_mobileNo), // "8249443992", // this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]: this.constant.val_longitude,
      [this.constant.key_service_Type]: type
    }
    console.log('resend OTP', JSON.stringify(reqObj));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj));
    // let encryptData = this.encryptDecryptService.encryptText("19816465728282", JSON.stringify(reqObj));
    return encryptData;
  }

  addLimitsNew(ibLimits,mbLimits,upiLimits,wbLimits){
    var inputData = {
      [this.constant.key_entityId]:this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_UPILIMIT]:"UPILIMIT~"+upiLimits,
      [this.constant.key_WATCHLIMIT]:"WATCHLIMIT~"+wbLimits,
      [this.constant.key_MOBILELIMIT]:"MOBILELIMIT~"+mbLimits,
      [this.constant.key_IBLIMIT]:"IBLIMIT~"+ibLimits,
      [this.constant.key_LIMITTYPE_G_C]:"C",
      [this.constant.Key_type]:"C",
      [this.constant.key_frequency]:"D",
      // [this.constant.key_OTP]: mobileOtp,

    }
    console.log("LimitsAdd", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getSaveAuthenticationMode(authMode){
    var inputData = {
      [this.constant.key_entityId]:this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_authFlag]: authMode
    }

    console.log("getSaveAuthenticationMode", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }




}
