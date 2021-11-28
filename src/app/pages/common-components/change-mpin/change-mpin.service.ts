import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ChangeMpinService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService:DataService,
    private commonMethod:CommonMethods
  ) { }


  /**
   * request parameter validate mobile number
   */
  getChangeMpinParam(oldMpin,newMpin) {
//     var inputData = {

//       [this.constant.key_cbsType]: this.constant.val_cbsTypeFinacle,
//       [this.constant.key_deviceId]: this.constant.deviceID,
//       [this.constant.key_entityId]: this.constant.getEntityId(),
//       [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
//       [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
//       [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
//       [this.constant.key_latitude]: this.constant.val_latitude,
//       [this.constant.key_longitude]:this.constant.val_longitude
//     }


// //     "entityId": "UPIMOBILE",
// //   "deviceId": "9",
// //   "prefered_Language":"en",
// //    "sourceIp":"172.25.1.133",
// //   "map": {
// //     "entityId": "UPIMOBILE",
// //     "mobPlatform": "android",
// //     "mobileAppVersion": "1.0.4",
// //     "clientAppVer": "1.0.4",
// //     "MobileNo": "9423235999",
// //     "OLD_MPIN":"2222",
// //     "NEW_MPIN" :"1111"

//     let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
//     return encryptData;
      
      let inputData = {
        [this.constant.key_upi_entityID]:this.constant.getEntityId(this.constant.val_entityId_UMOB),
        [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
        [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
        [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
        [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_upi_oldMpin] : this.encryptDecryptService.createMD5Value(oldMpin),
        [this.constant.key_upi_newMpin] : this.encryptDecryptService.createMD5Value(newMpin)
        };
     
        console.log('Reuest Data => ', JSON.stringify(inputData));
    
        let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
        console.log('encryptchnagempin => ', JSON.stringify(encryptData));
     
        return encryptData;
  }
}