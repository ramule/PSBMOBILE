import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class EMasService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService
  ) { }

  getGenerateTokenCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_UserID]: this.storage.getLocalStorage(this.constant.storage_username),
      [this.constant.key_category]: this.constant.val_Retail
    }

    console.log("getProfileDetailsParam", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
