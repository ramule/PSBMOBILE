import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ResistrationMpinValidateUserService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService
  ) { }


  getValidateUserParam(formData){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_loginType]: this.constant.val_loginType,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_isCorporate]: this.constant.val_isCorporate,
      [this.constant.key_MobileNo]: formData.mobNumber == undefined ? "" : formData.mobNumber,
      [this.constant.key_UserID]: formData.username == undefined ? "" : formData.username,
      [this.constant.key_password]: formData.password == undefined ? "" : this.encryptDecryptService.createMD5Value(formData.password),
    }


    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return inputData;
  }
}
