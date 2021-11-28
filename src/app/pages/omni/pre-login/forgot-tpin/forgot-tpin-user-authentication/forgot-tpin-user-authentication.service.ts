import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotTpinUserAuthenticationService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService
  ) { }

  getForgotTPINAuthforCardPram(formData,cardNumber,cardPin,expDate)
  {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_DEBITCARDNUMBER]:cardNumber,
      [this.constant.key_cardPin]:cardPin,
      [this.constant.key_ExpiryDate]:expDate,
      [this.constant.key_deviceId]:this.constant.deviceID,
     // [this.constant.key_mobileNumber]:"8249443992",
      [this.constant.key_credentialType]:this.constant.val_debitCard,
      [this.constant.key_channelType]:this.constant.val_channelValueIB,

    }
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;
  }

  getForgotTPINAuthforBankTokenPram(formData)
  { var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_MobileNo]:this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_credentialType]:this.constant.val_bankToken,
    [this.constant.key_channelType]:this.constant.val_channelValueIB,
  }
  let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
 return encryptData;

  }

    getChannelLeadOtpParam(mobileOtp, emailOtp, refNo)
 {
   var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsType,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_emailOtp] : emailOtp,
    [this.constant.key_mobileOtp] : mobileOtp,
    [this.constant.key_referenceNumber] : refNo


 }
   console.log(JSON.stringify(inputData));
   let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;

 }



}
