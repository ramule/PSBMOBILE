import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class DebitCardsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private commonMethod:CommonMethods
  ) { }

  getDebitCardListParam(customerAccDetails) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      //[this.constant.key_omniDashData]: cifNo,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      //[this.constant.key_accountNo]: customerAccDetails.accountNo,
      [this.constant.key_accountNo]: customerAccDetails,
      //[this.constant.key_accountNo]: 'AC000001,01811000084278',
      [this.constant.key_requestID]: this.commonMethod.genRandomDigit(9)
    }
    console.log(' getDebitCardList ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getChannelLeadOtpParamlimit(otp)
  {
    var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
     [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
     //[this.constant.key_latitude]: this.dataService.latitude,
     //[this.constant.key_longitude]: this.dataService.longitude,
     [this.constant.key_OTP]:otp,
     [this.constant.key_service_Type]: this.constant.val_REGISTRATION
     //[this.constant.key_mobileOtp] : mobileOtp,
     //[this.constant.key_referenceNumber]: this.dataService.referenceNo,

  }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }

  getResendOTPSessionParam(type)
  {
   var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
     [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
     [this.constant.key_service_Type]: type
  }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;


  }
  postDomLimitParam(param1:any, param2:any, param3:any, card:any) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
       [this.constant.key_debitCardNo]: card.CardNo,
      //[this.constant.key_debitCardNo]: '5085520606000176',
      [this.constant.key_requestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_atmdom]: param1,
      [this.constant.key_poscontdom]: param2,
      [this.constant.key_ecmdom]: param3,
      [this.constant.key_atmint]: '',
      [this.constant.key_poscontint]: '',
      [this.constant.key_ecmint]: '',
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
    }
    console.log(' postDomLimitParam ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  postLimitParam(domesticData, internationalData, card:any,type,updateType,isVirtual) {
    console.log(domesticData, internationalData);
    if(isVirtual){
      domesticData.atm_dom_val = 0;
      domesticData.pos_dom_val = 0; 
      internationalData.atm_int_val = 0;
      internationalData.pos_int_val = 0;
    }
    // if(updateType == "international" && isVirtual){
    //   internationalData.atm_int_val = 0;
    //   internationalData.pos_int_val = 0;
    // }


    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_debitCardNo]: card.CardNo,
      //[this.constant.key_debitCardNo]: '5085520606000176',
      [this.constant.key_requestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_atmdom]: domesticData.atm_dom_val,
      [this.constant.key_poscontdom]: domesticData.pos_dom_val,
      [this.constant.key_ecmdom]: domesticData.ecom_dom_val,
      [this.constant.key_atmint]: internationalData.atm_int_val,
      [this.constant.key_poscontint]: internationalData.pos_int_val,
      [this.constant.key_ecmint]: internationalData.ecom_int_val,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_service_Type]: type,
    }
    console.log(' postLimitParam ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getCvvParam(data){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      //[this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      //[this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      //[this.constant.key_omniDashData]: cifNo,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      //[this.constant.key_accountNo]: customerAccDetails.accountNo,
      //[this.constant.key_debitCardNo]: '5085521509000065',
      //[this.constant.key_expiryDate]: '2605',
      [this.constant.key_debitCardNo]: data.CardNo,
      [this.constant.key_expiryDate]: data.ExpiryDate,
      [this.constant.key_requestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
    }
    console.log(' getCVV ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  cardServiceOnOffParamDomestic(data, card){

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      //[this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      //[this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      //[this.constant.key_omniDashData]: cifNo,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      //[this.constant.key_accountNo]: customerAccDetails.accountNo,
      //[this.constant.key_debitCardNo]: '5085521509000065',
      //[this.constant.key_expiryDate]: '2605',
      [this.constant.key_debitCardNo]: card.CardNo,
      //[this.constant.key_debitCardNo]: '5085520606000176',
      [this.constant.key_atmdom]: data.atm == true ? 'Y' : 'N' ,
      [this.constant.key_ecmdom]: data.ecom == true ? 'Y' : 'N' ,
      [this.constant.key_poscontdom]: data.pos == true ? 'Y' : 'N' ,
      [this.constant.key_atmint]: '',
      [this.constant.key_ecmint]: '',
      [this.constant.key_poscontint]: '',
      [this.constant.key_contactless]: data.contactLess == true ? 'Y' : 'N' ,
      [this.constant.key_crdtype]: 'CardService',
      [this.constant.key_requestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
    }
    console.log(' cardServiceOnOffParamDomestic ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  cardServiceOnOffParamInternational(data,data1, card,isOtpReq,type){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_debitCardNo]: card.CardNo,
      [this.constant.key_atmdom]: data1.atm ? 'Y' : 'N',
      [this.constant.key_ecmdom]: data1.ecom ? 'Y' : 'N',
      [this.constant.key_poscontdom]: data1.pos ? 'Y' : 'N',
      [this.constant.key_atmint]: data.atm1 ? 'Y': 'N',
      [this.constant.key_ecmint]: data.ecom1 ? 'Y': 'N',
      [this.constant.key_poscontint]: data.pos1 ? 'Y' : 'N',
      [this.constant.key_cont_cw_dom_da]: data1.contactLess ? 'Y': 'N',
      [this.constant.key_cont_cw_int_da]: data.contactLess1 ? 'Y': 'N',
      [this.constant.key_crdtype]: 'CardService',
      [this.constant.key_requestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_otpRequired]: isOtpReq,
      [this.constant.key_service_Type]: type,
    }

    if(isOtpReq == 'N'){
      inputData[this.constant.key_omni_value] = this.commonMethod.genRandomDigit(6);
      inputData[this.constant.key_omni_customerID] = this.dataService.userDetails.customerId;
    }
    console.log(' cardServiceOnOffParamInternational ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  

  lockParam(data, cardStatus,type){
    var userdetails = this.dataService.userDetails;
    console.log(userdetails);
    var custId = userdetails.customerId;
    console.log(custId);
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_debitCardNo]: data.CardNo,
      [this.constant.key_cardStatus]: cardStatus,
      [this.constant.key_methodName]: 'BLOCKCARD',
      [this.constant.key_requestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_service_Type]: type,
      [this.constant.key_accountNo]: data.AccountNo,
    }
    console.log(' lockParam ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
