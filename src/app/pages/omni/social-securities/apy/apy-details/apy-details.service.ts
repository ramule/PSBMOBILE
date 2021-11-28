import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ApyDetailsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private commonMethod:CommonMethods
  ) { }

  apyDetailsParam(enrollmentData, pensionData) {
    var pensionPremium = pensionData.premium * 100;
    var inputData = {
      //[this.constant.key_entityId]: 'RMOB',
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_accountNo]: pensionData.debitAccount,
      [this.constant.key_amount]: pensionPremium,
      [this.constant.key_toAccount]: '90295039200003',
      [this.constant.key_apyEnrollmentData]: enrollmentData
      //['apyEnrollmentData']: '08481000001083|1000|Y|Y|JKLOIP|KUMARI|HJK|MOT|Y|GHJ|JKL|MON'
      //['apyEnrollmentData']: enrollmentData
    }
    console.log(' apyDetailsParam ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  calculatePremium(mobileNo, enrollmentData, debitAccount, investVal) {
    var inputData = {
      //[this.constant.key_entityId]: 'RMOB',
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MobileNoOrg]: mobileNo,
      [this.constant.key_accountNo]: debitAccount,
      [this.constant.key_amount]: investVal,
      [this.constant.key_apyAccountData]: enrollmentData
      //[this.constant.key_toAccount]: '90295039200003',
      //['apyEnrollmentData']: '08481000001083|1000|Y|Y|JKLOIP|KUMARI|HJK|MOT|Y|GHJ|JKL|MON'
      //['apyAccountData']: enrollmentData
    }
    console.log(' calculatePremium ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
