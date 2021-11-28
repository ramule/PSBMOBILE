import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
@Injectable({
  providedIn: 'root'
})
export class RechargeBillpayService {

  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private storage: LocalStorageService,) { 
    

  }

  getBillDetails(){
    var inputData = {
      [this.constant.key_entityId]: "PSB",
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_service_name]: this.constant.serviceName_RetrieveOneViewService,
      'customerId':this.dataService.customerID ,
      
    }
    console.log("getbillerlist ==>" + JSON.stringify(inputData))
     let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getTransactionHistoryParam(){
    var inputData = {
      [this.constant.key_entityId]: "PSB",
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_service_name]: this.constant.serviceName_RetrieveRecentTransactions,
      'customerId':this.dataService.customerID ,
      
    }
    console.log("getbillerlist ==>" + JSON.stringify(inputData))
     let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getServiceProviderName(value){
    var inputData = {
      [this.constant.key_entityId]: "PSB",
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_service_name]: this.constant.serviceName_SearchBillerListService,
      "billerName" :  value
      
    }
    console.log("getbillerlist ==>" + JSON.stringify(inputData))
     let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getLogoDetials(idList){
    var inputData = {
      [this.constant.key_entityId]: "PSB",
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_service_name]:this.constant.serviceName_GetBillersByIdsService,
      'billerIds':idList,
      
    }
    console.log("getbillerlist ==>" + JSON.stringify(inputData))
    console.log('this.storage.getSessionStorage(this.constant.val_sessionKey)' , this.storage.getSessionStorage(this.constant.val_sessionKey))
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
