import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
@Injectable({
  providedIn: 'root'
})
export class RegisterNewBillerService {

  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private storage: LocalStorageService,) { }

     inputData = {
      [this.constant.key_entityId]: "PSB",
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
     
    }



 

  registerNewBiller(requiredData, platform, formValue ){
    var inputData = {
      [this.constant.key_entityId]: "PSB",
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_service_name]:this.constant.serviceName_CreateBillerAccountWithoutAutopayService,
      'customerId': this.dataService.customerID,
      "short_name": formValue.shortName,
      "billerid": formValue.boardname,
      "consumerIdKey":requiredData.consumerKey,
      "consumerIdValue":formValue.consumerNumber,
      "firstName":this.dataService.userName.split(' ')[0],
      "lastName": this.dataService.userName.split(' ')[this.dataService.userName.split(' ').length - 1],
      "mobile": this.storage.getLocalStorage(this.constant.storage_mobileNo),
      "email":  this.dataService.profileDetails[0].emailId.toLowerCase(),
      "init_channel": platform,
      "deviceIp": this.dataService.ipAddress,
      "mac": "11-AC-58-21-1B-AA"
      
    }
    console.log("getbillerlist ==>" + JSON.stringify(inputData))
    console.log('this.storage.getSessionStorage(this.constant.val_sessionKey)' , this.storage.getSessionStorage(this.constant.val_sessionKey))
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
