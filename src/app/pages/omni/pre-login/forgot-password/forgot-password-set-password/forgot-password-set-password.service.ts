import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordSetPasswordService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethods: CommonMethods
  ) { }

  getSetForgoatPassword(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]:this.constant.deviceID,
     // [this.constant.key_mobileNumber]:"8249443992",
     // [this.constant.key_MobileNo]:this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_channelType]:this.constant.val_channelValueIB,
      [this.constant.key_UserID]: this.dataService.forgotPassUsername,
      [this.constant.key_password]:this.encryptDecryptService.createMD5Value(formdata.setPassword),
      [this.constant.key_crmReferenceNumber]:this.dataService.crmReferenceNumber,
      [this.constant.key_reqType]:'forgot'
   }

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;
  }
}
