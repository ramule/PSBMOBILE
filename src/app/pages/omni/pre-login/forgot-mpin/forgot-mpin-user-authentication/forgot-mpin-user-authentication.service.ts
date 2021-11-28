import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotMpinUserAuthenticationService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService

  ) { }


  getMaskDetailsParams()
 {
   var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_deviceId]:this.constant.deviceID,
     [this.constant.Key_username]:this.localStorage.getLocalStorage(this.constant.Key_username),
 }
   console.log(JSON.stringify(inputData));
   let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;

 }


 getValidateUserPwdParams(formData)
 {
   var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_langCode]:"en",
     [this.constant.key_password]:this.encryptDecryptService.createMD5Value(formData.password),
     [this.constant.Key_username]:formData.username,

 }
   console.log(JSON.stringify(inputData));
   let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;

 }


 getChannelLeadOtpParam(mobileOtp, emailOtp, refNo)
 {
   var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsType,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_emailOtp] : emailOtp,
    [this.constant.key_mobileOtp] : mobileOtp,
    [this.constant.key_referenceNumber] : refNo


 }
   console.log(JSON.stringify(inputData));
   let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;

 }

 getResendOTPParams(type)
 {
  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsType,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_MobileNo]:this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_service_Type]: type
}
 console.log(JSON.stringify(inputData));
 let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
  return encryptData;

 }

}
