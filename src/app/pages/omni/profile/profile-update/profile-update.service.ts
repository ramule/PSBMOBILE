import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService
  ) { }


  /**
  * request parameter for update profile
  */
  getProfileUpdateParam(profileDetails,username,profileImg?,isUPI?) {

    var base64Img = '';
    if(profileImg.split(",")[1] != null) base64Img = profileImg.split(",")[1];

    var inputData = {
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_entityId]: isUPI ? this.constant.getEntityId(this.constant.val_entityId_UMOB) : this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.Key_customerName]: username,
      [this.constant.key_emailId]: profileDetails.email.toLowerCase(),
      [this.constant.key_address]: profileDetails.address,
      [this.constant.key_base64Image]:  base64Img,
      [this.constant.key_changeType]:  profileDetails.changeType,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    console.log('getProfileUpdateParam',JSON.stringify(inputData));
    // let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getProfileUpdatePasswordChangeParam(formData) {
    var inputData =
    {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]:this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_loginType]:this.constant.val_loginType,
      [this.constant.key_UserID]:this.localStorage.getLocalStorage(this.constant.Key_username),
      [this.constant.key_oldPassword]:this.encryptDecryptService.createMD5Value(formData.oldPassword),
      [this.constant.key_newPassword]:this.encryptDecryptService.createMD5Value(formData.newPassword),
    }
    console.log('getProfileUpdatePasswordChangeParam',JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getProfileUpdateChangeMPINParam(formData) {
    var oldMpin = formData.oldMpin1+formData.oldMpin2+formData.oldMpin3+formData.oldMpin4+formData.oldMpin5+formData.oldMpin6;
    console.log('oldMpin:',oldMpin);
    var newMpin = formData.newpMpin1+formData.newpMpin2+formData.newpMpin3+formData.newpMpin4+formData.newpMpin5+formData.newpMpin6;
    console.log('newMpin:',newMpin);
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]:this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_OLDPIN]:this.encryptDecryptService.createMD5Value(oldMpin),
      [this.constant.key_NEWPIN]:this.encryptDecryptService.createMD5Value(newMpin),
      [this.constant.key_typeOfPin]:this.constant.val_MPIN,
    }
    console.log('getProfileUpdateChangeMPINParam',JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getProfileUpdateChangeTPINParam(formData) {
    var oldTpin = formData.oldTpin1+formData.oldTpin2+formData.oldTpin3+formData.oldTpin4+formData.oldTpin5+formData.oldTpin6;
    console.log('oldTpin:',oldTpin);
    var newTpin = formData.newTpin1+formData.newTpin2+formData.newTpin3+formData.newTpin4+formData.newTpin5+formData.newTpin6;
    console.log('newTpin:',newTpin);
    var inputData =
    {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]:this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_OLDPIN]:this.encryptDecryptService.createMD5Value(oldTpin),
      [this.constant.key_NEWPIN]:this.encryptDecryptService.createMD5Value(newTpin),
      [this.constant.key_typeOfPin]:this.constant.val_TPIN,
 }
    console.log('getProfileUpdateChangeTPINParam',JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
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
    [this.constant.key_deviceId]:this.localStorage.getLocalStorage("deviceId"),
    [this.constant.key_MobileNo]:this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
    //[this.constant.key_latitude]: this.dataService.latitude,
    //[this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_OTP]:otp,
    [this.constant.key_service_Type]: this.constant.val_REGISTRATION
    //[this.constant.key_mobileOtp] : mobileOtp,
    //[this.constant.key_referenceNumber]: this.dataService.referenceNo,

 }
   console.log(JSON.stringify(inputData));
   let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
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
    [this.constant.key_deviceId]:this.localStorage.getLocalStorage("deviceId"),
    [this.constant.key_MobileNo]:this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_service_Type]: type
 }
   console.log(JSON.stringify(inputData));
   let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
   return encryptData;


 }
}
