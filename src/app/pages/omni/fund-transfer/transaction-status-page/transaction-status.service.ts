import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class TransactionStatusService {

  constructor( private constant: AppConstants,
    private dataService: DataService,
    private storage: LocalStorageService,
    private encryptDecryptService: EncryptDecryptService,
    public common:CommonMethods) { }

  getScheduledTransParamasCall(){
    var inputData = {};
    inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    //[this.constant.key_deviceId]:"123718515270372"
    }
    console.log("getScheduledTransParamasCall schedular requrest=====>"+JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
  deleteSchParam(item){
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
      [this.constant.Key_SISETID]: item,
      
    }
    console.log("delete schedular requrest=====>"+JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
}

updateSiParam(item, amt){

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
    [this.constant.Key_SISETID]: item,
    [this.constant.key_amount]: amt.trim().replace(/[^0-9.]+/g, ''),
    
  }
  console.log("update schedular requrest=====>"+JSON.stringify(inputData));
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
}


  getCompletedTransParamasCall(accountNo){
    var inputData = {};
    inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
   
    // ['SISetId']:"130"
  }
  console.log("getCompletedTransParamasCall requrest=====>"+JSON.stringify(inputData));
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }

  getAccountBalanceParam(selectAccount)
  {
    console.log(selectAccount)
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.constant.deviceID,
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_branchCode]: "0181",
      [this.constant.key_accountNo]:selectAccount,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),

    }
    console.log("Get Balance params =====>" + JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
