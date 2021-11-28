import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CollectSetValidityService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService
  ) { }


  /**
   * request parameter for getSetValidityUpdateReq
   */
  getSetValidityUpdateReq() {
    var inputData = {
      [this.constant.key_entityId]:  this.constant.getEntityId(this.constant.val_entityId_UMOB),
      // [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      // [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      // [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      // [this.constant.key_latitude]: this.dataService.latitude,
      // [this.constant.key_longitude]: this.dataService.longitude,
      //  [this.constant.key_MobileNo]: this.storage.getLocalStorage('mobileNo'),
      // [this.constant.key_deviceId]: this.storage.getLocalStorage('deviceId')
    }
    console.log("getSetValidityUpdateReq", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }



}
