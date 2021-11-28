import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from '../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class SelectSimService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private dataService:DataService
  ) { }

  getParamForSimAppData() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_verificationCode]: this.dataService.uniqueVerificationCode,
      [this.constant.key_mobileDeviceId]: this.dataService.uniqueMobDeviceID, 
      [this.constant.key_deviceModel]:this.dataService.devicemodel,
      [this.constant.key_imei]: this.dataService.uuid, 
      [this.constant.key_imsi]:"",
      [this.constant.key_OSVERSION]:this.dataService.osversion,
      [this.constant.key_OS]:this.dataService.platform,
      [this.constant.key_MACADDRESS]:this.dataService.macAddress,
      [this.constant.key_latitude]:this.dataService.latitude,
      [this.constant.key_longitude]:this.dataService.longitude,
      [this.constant.key_pushNotificationToken]: this.dataService.fcmToken
    }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }



  getParamForSimAppDataTemp() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      // [this.constant.key_verificatioCode]: this.commonMethods.genRandomDigit(7).toString(), // change later for Dynamic  
      [this.constant.key_verificationCode]: this.dataService.uniqueVerificationCode ,
      [this.constant.key_mobileDeviceId]: this.dataService.uuid,
      [this.constant.key_imei]: this.dataService.uuid, // for now static 
      "deviceModel": this.dataService.devicemodel,
      "imei" : this.dataService.imei,
      "imsi" : "",
      "OSVERSION" : this.dataService.osversion,
      "OS" : this.dataService.osversion,
      "MACADDRESS" :this.dataService.macAddress,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude
    }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }
}
