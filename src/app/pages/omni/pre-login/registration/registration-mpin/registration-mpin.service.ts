import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationMpinService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService
  ) { }

  /**
   * request parameter validate for debit card number
   */
  getValidateMpinParam(formdata) {
    console.log("set mpin =======>"+ formdata);
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_MPIN]: this.encryptDecryptService.createMD5Value(formdata),
      [this.constant.key_service_Type]: ""
    }


    if(this.constant.getPlatform() != "web"){
      inputData[this.constant.key_deviceId]  = this.localStorage.getLocalStorage(this.constant.storage_deviceId);
    }

    let encryptData = this.encryptDecryptService.encryptText(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey,
      JSON.stringify(inputData)
    );

    console.log("getValidateMpinParam ====>" + JSON.stringify(inputData));
    //let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  /**
   * request parameter for registration update
   */
  getUpdateRegistrationDetailsParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_statusID]: this.constant.val_statusID
    }
    console.log('getUpdateRegistrationDetailsParam', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
    // return inputData;
  }
}
