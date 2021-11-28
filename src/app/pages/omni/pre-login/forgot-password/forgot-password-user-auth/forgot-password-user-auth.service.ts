import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordUserAuthService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethods: CommonMethods
  ) { }
  getForgotPassowrdAuthforCard(formdata,forgotPassDtl)
  {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_debitCardNo]: ''+formdata.cardNumber1+''+formdata.cardNumber2+''+formdata.cardNumber3+''+formdata.cardNumber4,//"5085521509000206"
      [this.constant.key_ExpiryDate]: formdata.expDate3+''+formdata.expDate4+''+formdata.expDate1+''+formdata.expDate2,//"2605"
      [this.constant.key_credentialType]: this.constant.val_debitCard,
      [this.constant.key_cvv]: formdata.cvvPin1+''+formdata.cvvPin2+''+formdata.cvvPin3,//662
      [this.constant.key_UserID]: this.dataService.forgotPassUsername,
      [this.constant.key_RequestID]: this.commonMethods.genRandomDigit(9),
      [this.constant.key_accountNo]: forgotPassDtl.accNo,
      [this.constant.key_cifNumber]: forgotPassDtl.custId
     }
    console.log("getValidateDebitCardParam",inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
}

getForgotPassowrdAuthforDebitCard(debitCardNo,CardPIN,expiryDate,forgotPassDtl)
  {

    var a= expiryDate.substring(0, 2) + "," + expiryDate.substring(2);
    var s= a.split(',');
    var updatedValue =s[1] + s[0]
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_RequestID]: this.commonMethods.genRandomDigit(9),
      [this.constant.key_debitCardNo]: debitCardNo,
      [this.constant.key_accountNo]: forgotPassDtl.accNo,
      [this.constant.key_cardPin1]:CardPIN,
      [this.constant.key_expirtDate]: updatedValue,
     }
    console.log("getForgotPassowrdAuthforDebitCard",inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
}

getMaskDetailsParams()
 {
   var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_deviceId]: this.constant.deviceID,
     [this.constant.Key_username]: this.dataService.forgotPassUsername,
}
   console.log(JSON.stringify(inputData));
   let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;
}

 getChannelLeadOtpParam(mobileOtp, emailOtp, mobileNo, emailId) {
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
    [this.constant.key_mobileNumber]: mobileNo,
    [this.constant.key_omni_emailId] : emailId,
    [this.constant.key_referenceNumber]: this.dataService.referenceNo,
  }
   console.log(JSON.stringify(inputData));
   let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
   return encryptData;
 }

  getResendLeadOtpParam(mobileNo, emailId) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: mobileNo,
      [this.constant.key_omni_emailId] : emailId,
      [this.constant.key_referenceNumber] : this.commonMethods.genRandomDigit(7).toString(),
      [this.constant.key_service_Type]: this.constant.val_FORGOTPASSWORD
    }
    console.log("getValidateLeadOtpParam", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }

}
