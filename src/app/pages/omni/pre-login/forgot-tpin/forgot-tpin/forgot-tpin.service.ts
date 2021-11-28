import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotTpinService {

  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService) { }



    getProfileUpdateChangeTPINParam(formData)
    {
      var inputData =
      {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_deviceId]:this.localStorage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_OLDPIN]:this.encryptDecryptService.createMD5Value(formData.oldpassword),
        [this.constant.key_NEWPIN]:this.encryptDecryptService.createMD5Value(formData.newpassword),
        [this.constant.key_typeOfPin]:this.constant.val_TPIN,
   }
      console.log('getProfileUpdateChangeTPINParam',JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
   }
  }
