import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
@Injectable({
  providedIn: 'root'
})
export class StopChequeAuthorizationService {

  constructor(
    private constant: AppConstants, private encryptService: EncryptDecryptService, private constants: AppConstants, private localStorage: LocalStorageService, private dataService: DataService, private encryptDecryptService: EncryptDecryptService
  ) { }

    /**
   * To get send otp request this function is invoked
   * @param otpFormData
   */
     getSendOTPSessionReq(otpNo) {
      var reqObj;
      reqObj = {
        [this.constants.key_entityId]: this.constant.getEntityId(),
        [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
        [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
        [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
        [this.constant.key_MobileNo]:this.localStorage.getLocalStorage('mobileNo'),
        [this.constant.key_OTP]: otpNo,
        [this.constant.key_latitude]: this.constant.val_latitude,
        [this.constant.key_longitude]:this.constant.val_longitude,
      }

      console.log(reqObj);
      return this.encryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj))
    }

     /**
   * To set resend OTP request request
   */
  getResendOTPSessionReq(type) {
    var reqObj;
    reqObj = {
      [this.constants.key_entityId]: this.constant.getEntityId(),
      [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
      [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
      [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
      [this.constant.key_MobileNo]:  this.localStorage.getLocalStorage('mobileNo'), // "8249443992", // this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude,
      [this.constant.key_service_Type]: type,
      [this.constant.key_methodName]: type,
    }
    console.log('resend OTP', JSON.stringify(reqObj));
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj));
    // let encryptData = this.encryptDecryptService.encryptText("19816465728282", JSON.stringify(reqObj));
    return encryptData;
  }


}
