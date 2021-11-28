import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeSettingsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService : DataService
  ) { }


  /**
   * request parameter for updating the themes
   */
  getThemeSettingsParam(obj) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
       [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_loginType]: this.constant.val_loginType,
      [this.constant.key_UserID]: this.localStorage.getLocalStorage(this.constant.storage_username),
      [this.constant.key_themeName]: obj.themeName,
      [this.constant.key_themeSideBarColor]: obj.themeSideBarColor,
      [this.constant.key_themeSideBackground]: obj.themeSideBackground,
      [this.constant.key_themeMenuOption]: obj.themeMenuOption

    }
    console.log('getThemeSettingsParam', inputData);

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
    // return inputData;
  }

  /**
   * request parameter for login update
   */
  getUpdateLoginDetailsParam(formData, channelType) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude, [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_channelType]: channelType,
      [this.constant.key_UserID]: formData.userName,
      [this.constant.key_password]: this.encryptDecryptService.createMD5Value(formData.password)
    }
    console.log('getUpdateLoginDetailsParam', JSON.stringify(inputData));
    // console.log('encrypt key ',this.localStorage.getLocalStorage(this.constant.storage_mobileNo)+this.constant.mapEncryptKey);


    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
    // return inputData;
  }


  /**
   * request parameter for registration update
   */
  getUpdateRegistrationDetailsParam(channelType) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_channelType]: channelType,
      [this.constant.key_statusID]: this.constant.val_statusID
    }
    console.log('getUpdateRegistrationDetailsParam', inputData);

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
    // return inputData;
  }
}
