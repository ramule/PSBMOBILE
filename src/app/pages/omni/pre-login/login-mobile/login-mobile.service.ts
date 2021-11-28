import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class LoginMobileService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private common: CommonMethods
  ) { }

  /**
   * request parameter for language json
   */
  getLangObjectParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }


  /**
   * request parameter for param for MPIN
   */

  getParamForLoginMPIN(mpin) {
    console.log("mpin value ======>"+ mpin);
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      // [this.constant.key_MobileNo]: formData.mobNumber,
      [this.constant.key_loginType]: this.constant.val_loginTypeMPIN,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_isCorporate]: this.constant.val_isCorporate,
      [this.constant.key_MobileNo]: this.localStorage.getLocalStorage("mobileNo"),
      [this.constant.key_MPIN]: this.encryptDecryptService.createMD5Value(mpin),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_RRN]:this.common.genRandomDigit(9)
    }

    console.log(JSON.stringify(inputData));
    return this.encryptDataForMobile(inputData);
  }


  /**
   * request parameter for login general
   * @formData
   */
  //TODO:need to add current location
  getParamForLogin(formData) {
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
      [this.constant.key_UserID]: formData.username == undefined ? "" : formData.username.toLowerCase(),
      [this.constant.key_password]: formData.password == undefined ? "" : this.encryptDecryptService.createMD5Value(formData.password),
      [this.constant.key_RRN] : this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9)
    }


    console.log(JSON.stringify(inputData));
    
    // let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    // return encryptData;
    return this.encryptDataForMobile(inputData);
  }


  /**
   * request parameter for login biometric
   * @formData
   */
  getParamForLoginBiometric() {
    console.log(this.localStorage.getLocalStorage('mobileNo'));
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_loginType]: this.constant.val_bioMetric,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_isCorporate]: this.constant.val_isCorporate,
      [this.constant.key_MobileNo]: this.localStorage.getLocalStorage("mobileNo"),
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9)
    }

    console.log(JSON.stringify(inputData));

    return this.encryptDataForMobile(inputData);
  }


  /**
   * request parameter for login usinf faceId
   * @formData
   */
  getParamForLoginFaceId() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_loginType]: this.constant.val_faceId,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_isCorporate]: this.constant.val_isCorporate,
      [this.constant.key_MobileNo]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_RRN]: this.common.genRandomDigit(9)
    }

    console.log(JSON.stringify(inputData));
    return this.encryptDataForMobile(inputData);
  }



  getActivitySettingParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }

  encryptDataForMobile(inputData){
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage('mobileStaticEncrypyKey'), JSON.stringify(inputData));
    return encryptData;
  }


}
