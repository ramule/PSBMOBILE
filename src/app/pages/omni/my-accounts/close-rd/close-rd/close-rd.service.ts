import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class CloseRdService {

  constructor(
    private constant: AppConstants,
    private dataService: DataService,
    private storage: LocalStorageService,
    private common: CommonMethods,
    private encryptDecryptService: EncryptDecryptService
  ) { }

  getCloseRDCall(selectedAccount) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_MobileNoOrg]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_rdClosureValidationData]: this.storage.getLocalStorage(this.constant.storage_mobileNo) +'|'+ this.dataService.userDetails.cifNumber+"|"+ selectedAccount
    }

    console.log('getCloseFD params: ', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
