import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { DatePipe } from '@angular/common';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class StandingInstructionAuthService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod : CommonMethods
  ) { }

  getSendOTPSessionReq(otpNo) {
    var reqObj;
    reqObj = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_OTP]: otpNo,
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude,
    }

    console.log("Standing Instruction OTP " , JSON.stringify(reqObj));
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
      [this.constant.key_longitude]:this.constant.val_longitude,
      [this.constant.key_service_Type]: type

    }
    console.log('Standing Instruction resend OTP', JSON.stringify(reqObj));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj));
    // let encryptData = this.encryptDecryptService.encryptText("19816465728282", JSON.stringify(reqObj));
    return encryptData;
  }
}
