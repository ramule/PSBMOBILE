import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class RegistrationUsernameService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods
  ) { }


  /**
   * request parameter for update TPIN
   */
  getTPINUpdateParam(formData) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_TPIN]: this.encryptDecryptService.createMD5Value(formData),
      [this.constant.key_ServiceType]: ""
    }
    console.log('getTPINUpdateParam', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  /**
   * request parameter for login update
   */
  getUpdateLoginDetailsParam(formData) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_UserID]: formData.username.toLowerCase(),
      [this.constant.key_password]: this.encryptDecryptService.createMD5Value(formData.password),
      [this.constant.key_crmReferenceNumber] : this.commonMethod.genRandomDigit(9)

    }
    console.log('getUpdateLoginDetailsParam', JSON.stringify(inputData));
    // console.log('encrypt key ',this.localStorage.getLocalStorage('mobileNo')+this.constant.mapEncryptKey);
    let key = this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey;
    console.log("key ", key);

    let encryptData = this.encryptDecryptService.encryptText(key, JSON.stringify(inputData));
    return encryptData;
  }

  /**
   * request parameter for login update
   */
   getCheckAvaiablityParam(username) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,

      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_UserID]: username.toLowerCase()

    }
    console.log('getCheckAvaiablityParam', JSON.stringify(inputData));
    // console.log('encrypt key ',this.localStorage.getLocalStorage('mobileNo')+this.constant.mapEncryptKey);
    let key = this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey;
    console.log("key ", key);

    let encryptData = this.encryptDecryptService.encryptText(key, JSON.stringify(inputData));
    return encryptData;
  }

  /**
   * get security question list
   */
  getSecurityQuestionList() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage("deviceId"),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude, [this.constant.key_statusID]: this.constant.val_statusID,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_AppID]: this.constant.val_AppID,
      [this.constant.key_channelType]: this.dataService.getChannelType()
    }
    console.log('getSecurityQuestionListParam', JSON.stringify(inputData));
    // console.log('encrypt key ',this.localStorage.getLocalStorage('mobileNo')+this.constant.mapEncryptKey);
    let key = this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey;
    console.log("key ", key);

    let encryptData = this.encryptDecryptService.encryptText(key, JSON.stringify(inputData));
    return encryptData;

  }


  /**
  * set security question list param
  */
  setSecurityQuestionList(formData) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_secQuesId1]: formData.quest1,
      [this.constant.key_secQuesAns1]: formData.ans1,
      [this.constant.key_secQuesId2]: formData.quest2,
      [this.constant.key_secQuesAns2]: formData.ans2,
      [this.constant.key_secQuesId3]: formData.quest3,
      [this.constant.key_secQuesAns3]: formData.ans3
    }
    console.log('setSecurityQuestionList Param', JSON.stringify(inputData));
    // console.log('encrypt key ',this.localStorage.getLocalStorage('mobileNo')+this.constant.mapEncryptKey);
    let key = this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey;
    console.log("key ", key);

    let encryptData = this.encryptDecryptService.encryptText(key, JSON.stringify(inputData));
    return encryptData;
  }



}
