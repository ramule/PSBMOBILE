import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { DatePipe } from '@angular/common';
import { CommonMethods } from '../../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class LienEnquiryService {


  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod : CommonMethods
  ) { }

  getLienEnquiry(account) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.constant.val_DeviceID,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_accountNo]: account,
    }
    console.log(' lienEnquiry ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getLienAccountParam(customerAccDetails){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_accountNo]: customerAccDetails.accountNo ,//15081000001825 customerAccDetails.accountNo
      [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_lienInquiryData] : this.constant.val_upi_ALL
    }
    console.log(' getAccountEnquiryParam ', JSON.stringify(inputData));
    console.log(this.storage.getSessionStorage(this.constant.val_sessionKey));
  
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
   }


}
