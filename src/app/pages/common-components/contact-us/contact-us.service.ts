import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService:DataService
  ) { }

  /**
   * request parameter validate mobile number
   */
  getcontactUsParam() {
    var inputData = {

      [this.constant.key_cbsType]: this.constant.val_cbsTypeFinacle,
      [this.constant.key_deviceId]: this.constant.deviceID,
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude
    }

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }


  callbackParam(value){
    var inputData ={
      "MobileNo":value.mobNumber,
      "PreferredLang":value.language,
      "PreferredTime":value.timeSlot,
    }
    console.log('callback Request pamas ====>' + JSON.stringify(inputData))
    let encryptData = this.encryptDecryptService.encryptText(this.constant.crmKey, JSON.stringify(inputData));
    console.log('callback Request encryptData ====>' + JSON.stringify(encryptData))
    return encryptData;
  }
}
