import { Injectable } from '@angular/core';
import { LocalStorage } from '@ng-idle/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class FreezeAccountService {

  constructor(
    private constant:AppConstants,
    private dataService:DataService,
    public storage:LocalStorageService,
    private encryptDecryptService:EncryptDecryptService,
    private commonMethod: CommonMethods
  ) { }

   /**
   * request parameter for Freeze accounts
   */
    freezeAccountParam(formData) {

      var inputData = {
          [this.constant.key_entityId]: this.constant.getEntityId(),
          [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
          [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
          [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
          [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
          [this.constant.key_latitude]: this.dataService.latitude,
          [this.constant.key_longitude]: this.dataService.longitude,
          [this.constant.key_accountNo]: formData.accountNumber,
          [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
          [this.constant.key_RRN]:'12312321',
          [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.key_deviceId),
          // ['freezeAcctData']:formData.typeoffreeze + "|" + formData.remarks,
          ['freezeAcctData']: 'D' + "|" + formData.remarks,
          [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
      }

      console.log("freezeAccountParam", JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    freezeAccountParamCIF(formData) {

      var inputData = {
          [this.constant.key_entityId]: this.constant.getEntityId(),
          [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
          [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
          [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
          [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
          [this.constant.key_latitude]: this.dataService.latitude,
          [this.constant.key_longitude]: this.dataService.longitude,
          [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
          [this.constant.key_RRN]:'12312321',
          [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.key_deviceId),
          // ['freezeAcctCIFData']:this.dataService.userDetails.cifNumber + "|" + formData.typeoffreeze + "|" + formData.remarks,
          ['freezeAcctCIFData']:this.dataService.userDetails.cifNumber + "|" + 'D' + "|" + formData.remarks,
          [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
      }

      console.log("freezeAccountParamCIF", JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    getAccountEnquiryParam(customerAccDetails){
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_accountNo]: customerAccDetails[0].accountNo ,//15081000001825 customerAccDetails.accountNo
        [this.constant.key_branchCode]: customerAccDetails[0].branchCode,//G1509
        // [this.constant.key_accountNo]:15081000001825 ,
        // [this.constant.key_branchCode]:"G1509",
        [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
        [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9)
      }
      console.log(' getAccountEnquiryParam ', JSON.stringify(inputData));

      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
     }


}
