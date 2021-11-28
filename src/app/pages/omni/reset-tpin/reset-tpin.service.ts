import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app/app.constant';
import { DataService } from '../../../services/data.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { CommonMethods } from '../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class resetTpinService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    public common : CommonMethods
  ) { }


    getResetTpinAuthforDebitCard(debitCardNo,CardPIN,expiryDate,accNo)
      {
        var inputData = {
          [this.constant.key_entityId]: this.constant.getEntityId(),
          [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
          [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
          [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
          [this.constant.key_latitude]: this.dataService.latitude,
          [this.constant.key_longitude]: this.dataService.longitude,
          [this.constant.key_RequestID]: this.common.genRandomDigit(9),
          [this.constant.key_debitCardNo]: debitCardNo,
          [this.constant.key_accountNo]: accNo,
          [this.constant.key_cardPin1]:CardPIN,
          [this.constant.key_expirtDate]: expiryDate,
        }
        console.log("getForgotPassowrdAuthforDebitCard",inputData);
        let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
        return encryptData;
    }



    getTokenExistsParam() {
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_mobileNumber]:
          this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_channelType]: this.dataService.getChannelType()
      };
  
      console.log(inputData);
      console.log( this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey);
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
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
          this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_channelType]: this.dataService.getChannelType(),
        [this.constant.key_credentialType]: this.constant.val_bankToken,
      };
  
      console.log(JSON.stringify(inputData));
      console.log(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey);
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey,JSON.stringify(inputData) );
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
        this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_token]: formdata.bankToken,
      [this.constant.key_deviceId]:
        this.storage.getLocalStorage(this.constant.storage_deviceId),
    };

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey,JSON.stringify(inputData));
    return encryptData;
  }



}

