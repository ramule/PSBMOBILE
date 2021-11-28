import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { DataService } from '../../../../../services/data.service';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';


@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService

  ) { }

  getForgotPassowrd(formData)
  {
    var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.Key_username]:formData.username.toLowerCase(),
     [this.constant.key_accountNo] : formData.accNo ,
     [this.constant.key_cifNumber] : formData.custId
     //[this.constant.Key_username]:this.localStorage.getLocalStorage("username"),
    }
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;
  }

}
