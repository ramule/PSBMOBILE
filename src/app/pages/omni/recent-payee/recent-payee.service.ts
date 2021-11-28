import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class RecentPayeeService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage:LocalStorageService,
    public dataService : DataService,
    public common: CommonMethods,
    public datepipe : DatePipe
  ) { }

  getFavouritePayee(){
    var inputData = {};
    inputData ={
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

  console.log("get manage requrest=====>"+JSON.stringify(inputData));
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }

  getFrequentTransacParam(mpin?: any) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    if (mpin) {
      inputData[this.constant.key_loginType] = this.constant.val_loginTypeMPIN;
      inputData[this.constant.key_MobileNo] = this.storage.getLocalStorage(this.constant.storage_mobileNo);
      inputData[this.constant.key_MPIN] = this.encryptDecryptService.createMD5Value(this.dataService.mpin);
    } else {
      inputData[this.constant.key_loginType] = this.constant.val_loginType;
      inputData[this.constant.key_UserID] =  this.storage.getLocalStorage(this.constant.storage_username);
    }
    console.log("get recent trans requrest=====>"+JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage("sessionKey"), JSON.stringify(inputData));
    return encryptData;
  }

}
