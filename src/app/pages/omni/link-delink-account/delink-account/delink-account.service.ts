import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../../app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class DelinkAccountService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private commonMethod : CommonMethods
  ) { }

  /**
   * request parameter for Delink accounts
   */
   delinkAccountParam(linkDelikItem) {
    var linkData = "~" +  linkDelikItem.accountNo + "|" + this.storage.getLocalStorage(this.constant.storage_mobileNo) + "|" + "D" + "|~";
    console.log("linkData" + linkData);

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_accountNo]: linkDelikItem.accountNo,
      [this.constant.key_requestType]:'DELINK',
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
      [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_linkDelinkData]:linkData
    }

    console.log("linkAccountParam", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
