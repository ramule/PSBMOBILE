import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../../app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class LinkAccountService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private commonMethod : CommonMethods
  ) { }

  /**
   * request parameter for Link accounts
   */
   linkAccountParam(linkDelikItem) {
    var linkData = "~" + linkDelikItem.accountNo + "|" + this.storage.getLocalStorage(this.constant.storage_mobileNo) + "|" + "L" + "|~";
    console.log("linkData" + linkData);

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_accountNo]: linkDelikItem.accountNo,
      [this.constant.key_requestType]:'LINK',
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
      [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_linkDelinkData]:linkData
    }

    console.log("linkAccountParam", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getResendLeadOtpParam(linkingMobileNumber){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_omni_emailId] : this.dataService.accountOpenFldData.email,
      [this.constant.key_existingMobileNumber] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_linkingMobileNumber] : linkingMobileNumber,
      [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_service_Type]: this.constant.val_LINK
    }
    console.log("getValidateLeadOtpParam", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }

  getValidateLeadOtpParam(existingMobileOTP,linkingMobileOTP){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_existingMobileNumber] : existingMobileOTP,
      [this.constant.key_linkingMobileNumber] : linkingMobileOTP,
      [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_service_Type]: this.constant.val_LINK,
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
    }
    console.log("getValidateLeadOtpParam", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }

  linkDelinkFetchAccountsList() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
      [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
      [this.constant.key_omni_customerID]: this.dataService.userDetails.cifNumber,
      [this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      // ['linkDelinkFetchData']:'AB'
  }
    console.log("linkAccountParam", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
    //return inputData;
  }

}
