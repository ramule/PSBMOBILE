import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root',
})
export class RegistrationValidateRegService {
  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private storage: LocalStorageService,
    private commonMethod: CommonMethods
  ) {}


  getValidateDebitCardParam(formdata)
  {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_debitCardNo]: '' + formdata.cardNumber1 + '' + formdata.cardNumber2 + '' + formdata.cardNumber3 + '' + formdata.cardNumber4,
      [this.constant.key_accountNo]: this.dataService.regFeildData.accNo,
      [this.constant.key_cardPin1]: '' + formdata.cvvPin1 + '' + formdata.cvvPin2 + '' + formdata.cvvPin3 + '' + formdata.cvvPin4,
      [this.constant.key_expirtDate]:  '' + formdata.expDate3 + '' + formdata.expDate4 + '' + formdata.expDate1 + '' + formdata.expDate2,
     }

    console.log("getForgotPassowrdAuthforDebitCard",inputData);
    let encryptData = this.encryptDecryptService.encryptText( this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
}

  /**
   * request parameter validate for debit card number
   */
  // getValidateDebitCardParam(formdata) {
  //   var inputData = {
  //     [this.constant.key_entityId]: this.constant.getEntityId(),
  //     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
  //     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
  //     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
  //     [this.constant.key_latitude]: this.dataService.latitude,
  //     [this.constant.key_longitude]: this.dataService.longitude,
  //     [this.constant.key_mobileNumber]:
  //       this.localStorage.getLocalStorage('mobileNo'),
  //     [this.constant.key_channelType]: this.dataService.getChannelType(),
  //     [this.constant.key_debitCardNo]:
  //       '' +
  //       formdata.cardNumber1 +
  //       '' +
  //       formdata.cardNumber2 +
  //       '' +
  //       formdata.cardNumber3 +
  //       '' +
  //       formdata.cardNumber4,
  //     [this.constant.key_ExpiryDate]:
  //       formdata.expDate3 +
  //       '' +
  //       formdata.expDate4 +
  //       '' +
  //       formdata.expDate1 +
  //       '' +
  //       formdata.expDate2,
  //     [this.constant.key_credentialType]: this.constant.val_debitCard,
  //     [this.constant.key_cvv]:
  //       formdata.cvvPin1 + '' + formdata.cvvPin2 + '' + formdata.cvvPin3,
  //     [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
  //     [this.constant.key_accountNo]: this.dataService.regFeildData.accNo,
  //     [this.constant.key_cifNumber]: this.dataService.regFeildData.custId,
  //   };

  //   console.log('getValidateDebitCardParam', inputData);
  //   let encryptData = this.encryptDecryptService.encryptText(
  //     this.localStorage.getLocalStorage('mobileNo') +
  //       this.constant.mapEncryptKey,
  //     JSON.stringify(inputData)
  //   );
  //   return encryptData;
  // }

  getValidateCredentailParam(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_UserID]: formdata.username,
      [this.constant.key_password]: formdata.password,
      [this.constant.key_corporateId]: formdata.username,
      [this.constant.Key_customerId]: formdata.username,
      [this.constant.key_loginType]: this.constant.val_PROFILE,
      [this.constant.key_credentialType]: this.constant.val_legacySystem,
    };

    let encryptData = this.encryptDecryptService.encryptText( this.constant.staticKey,
      JSON.stringify(inputData)
    );
    return encryptData;
  }

  /**
   * request parameter to validate bank token
   */
  getValidateTokenParam(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:
        this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_token]: formdata.bankToken,
      [this.constant.key_deviceId]:
        this.localStorage.getLocalStorage('deviceId'),
      [this.constant.key_cifNumber]: this.dataService.regFeildData.custId
    };

    console.log(inputData);
    console.log(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey
    );
    let encryptData = this.encryptDecryptService.encryptText(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey,
      JSON.stringify(inputData)
    );
    return encryptData;
  }

  /**
   * request parameter to generate bank token
   */

  getTokenExistsParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:
        this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage("deviceId"),
      [this.constant.key_cifNumber]: this.dataService.regFeildData.custId
    };

    console.log(inputData);
    console.log(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey
    );
    let encryptData = this.encryptDecryptService.encryptText(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey,
      JSON.stringify(inputData)
    );
    return encryptData;
  }

  getGenerateTokenParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:
        this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_credentialType]: this.constant.val_bankToken,
      [this.constant.key_cifNumber]: this.dataService.regFeildData.custId
    };

    console.log(inputData);
    console.log(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey
    );
    let encryptData = this.encryptDecryptService.encryptText(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey,
      JSON.stringify(inputData)
    );
    return encryptData;
  }

  /**
   * request parameter to validate MPIN
   */
  getValidateMpinParam(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:
        this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_MPIN]: this.encryptDecryptService.createMD5Value(
        formdata.mpin
      ),
      [this.constant.key_credentialType]: this.constant.key_MPIN,
    };

    console.log(inputData);
    let encryptData = this.encryptDecryptService.encryptText(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey,
      JSON.stringify(inputData)
    );
    return encryptData;
  }

  /**
   * request parameter to validate Internet banking credential
   */
  getValidateIBParam(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:
        this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_credentialType]: this.constant.val_credentialType,
      [this.constant.key_UserID]: formdata.userName,
      [this.constant.key_password]: this.encryptDecryptService.createMD5Value(
        formdata.password
      ),
    };

    console.log(inputData);
    let encryptData = this.encryptDecryptService.encryptText(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey,
      JSON.stringify(inputData)
    );
    return encryptData;
  }

  getValidateCredentialsParam(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:
        this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_credentialType]: this.constant.val_credentialType,
      [this.constant.key_UserID]: formdata.userName,
      [this.constant.key_type]: this.constant.val_afterLoginPinSet,
      [this.constant.key_password]: this.encryptDecryptService.createMD5Value(
        formdata.password
      ),
    };

    let encryptData = this.encryptDecryptService.encryptText(
      this.localStorage.getLocalStorage('mobileNo') +
        this.constant.mapEncryptKey,
      JSON.stringify(inputData)
    );
    console.log('getValidateCredentialsParam :', JSON.stringify(inputData));
    return encryptData;
    //return this.encryptDataForMobile(inputData);
  }

  encryptDataForMobile(inputData) {
    let encryptData = this.encryptDecryptService.encryptText(
      this.localStorage.getLocalStorage('mobileStaticEncrypyKey'),
      JSON.stringify(inputData)
    );
    return encryptData;
  }

  getCvvParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(
        this.constant.storage_deviceId
      ),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_debitCardNo]: '5085521509000065',
      [this.constant.key_expiryDate]: '2605',
      [this.constant.key_requestID]: '2666359',
    };
    console.log(' getCVV ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(
      this.storage.getSessionStorage(this.constant.val_sessionKey),
      JSON.stringify(inputData)
    );
    return encryptData;
  }
}
