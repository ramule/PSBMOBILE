import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService:DataService,
    private commonMethod: CommonMethods,
  ) { }
  
  getParamTransactionList() {​​​​​​​​

    let upiRequestObj = {
  
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb, 
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]:this.constant.upiserviceName_TransactionHistory,
      [this.constant.key_upi_inputParam]:
          {
            [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
            [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
            [this.constant.key_upi_entityID]:this.constant.val_upi_psb, 
            [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      }
    }
    
   
     let inputData = {​​​​​​​​
      [this.constant.key_entityId]:this.constant.val_entityId_UMOB,
      [this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
      }​​​​​​​​;
   
      console.log('Request => ', JSON.stringify(inputData));
  
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
      console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
   
      return encryptData;
   
    }
  

}
