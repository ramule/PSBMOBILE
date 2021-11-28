import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestService {

  constructor(private constant: AppConstants, private encryptService: EncryptDecryptService, private constants: AppConstants, private localStorage: LocalStorageService, private dataService: DataService, private encryptDecryptService: EncryptDecryptService) { }
  /**
   * To set resend OTP request request
   */
  getOmniChannelReq() {
    var reqObj;
    reqObj = {
      [this.constants.key_entityId]: this.constant.getEntityId(),
      [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
      [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
      [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage("deviceId"),
      [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
      [this.constant.key_MobileNo]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude,
      [this.constant.key_thirdPartyRefNo]: this.localStorage.getLocalStorage('mobileNo')+Math.random().toString(36).slice(2),
    }

    console.log('resend OTP', JSON.stringify(reqObj));
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj));
    return encryptData;
  }


  getPendingRequestMapParam(reqObj){
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj));
    return encryptData;
  }
}
