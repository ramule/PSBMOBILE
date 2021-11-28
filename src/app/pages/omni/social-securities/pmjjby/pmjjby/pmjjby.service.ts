import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class PmjjbyService {

  constructor(
    private constant:AppConstants,
    private common:CommonMethods,
    private storage:LocalStorageService,
    private dataService:DataService,
    private encryptDecryptService:EncryptDecryptService
  ) { }


  getJBYAccountDetailsCall() {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_accountNo]: "00000000000000",
      [this.constant.key_MobileNoOrg]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
      [this.constant.key_jbyAccountData]:  this.dataService.userDetails.cifNumber+"|"
    }
    console.log('getJBYDetailsParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
