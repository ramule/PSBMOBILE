import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
@Injectable({
  providedIn: 'root'
})
export class BillPaymnetService {

  constructor( private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private storage: LocalStorageService,) { }

   
    
    fetchbill(location , type) {
      var inputData = {
        [this.constant.key_entityId]: "PSB",
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage("deviceId"),
        [this.constant.key_service_name]:"RetrieveBillService",
        
      }
      console.log("getbillerlist ==>" + JSON.stringify(inputData))
      console.log('this.storage.getSessionStorage(this.constant.val_sessionKey)' , this.storage.getSessionStorage(this.constant.val_sessionKey))
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    getBillDetails(consumerNum , billerId, serviceName){
      var inputData = {
        [this.constant.key_entityId]: "PSB",
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage("deviceId"),
        [this.constant.key_service_name]:serviceName,
        [this.constant.key_biller_customerid]:consumerNum,
        [this.constant.key_billerid] :billerId,
        
      }
      console.log("getbillerlist ==>" + JSON.stringify(inputData))
      console.log('this.storage.getSessionStorage(this.constant.val_sessionKey)' , this.storage.getSessionStorage(this.constant.val_sessionKey))
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

  }