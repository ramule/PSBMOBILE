import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PmjjbyDetailsService {

  constructor(
    private constant: AppConstants,
    private dataService: DataService,
    private storage: LocalStorageService,
    private common: CommonMethods,
    private encryptDecryptService: EncryptDecryptService
  ) { }

  getJBYAccountDetailsCall() {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_accountNo]: "00000000000000",
      [this.constant.key_MobileNoOrg]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
      [this.constant.key_jbyAccountData]:  this.dataService.userDetails.cifNumber+"|"
    }
    console.log('getJBYDetailsParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getJBYPremiumAmountCall(selectedAccount) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_MobileNoOrg]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_accountNo]: "00000000000000",
      [this.constant.key_jbyPremiumAmountData]:  this.dataService.userDetails.cifNumber+"|"+ selectedAccount+"|"
    }

    console.log('getPremiumAmountParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getEnrollmentTransactionCall(selectedAccount, additionalDetailsForm, age, premiumAmount) {
    var address = "";
    console.log('additionalDetailsForm: ', additionalDetailsForm);
    var ageDiff = parseInt(""+moment().diff(additionalDetailsForm.dob,'years',true));

    if(ageDiff < 18) {
      address = additionalDetailsForm.guardianAddress1 + ' , ' + additionalDetailsForm.guardianState + ' , ' + additionalDetailsForm.guardianCity + additionalDetailsForm.guardianPin;
    }
    else {
      address = additionalDetailsForm.nomineeAddress1 + ' , ' + additionalDetailsForm.nomineeState + ' , ' + additionalDetailsForm.nomineeCity + additionalDetailsForm.nomineePin;
    }
    var trimmedAddress = address.substring(0 , 40);

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_accountNo]: selectedAccount,
      [this.constant.key_amount]: premiumAmount,
      [this.constant.key_toAccount]: "90295039200001",
      // ['']:'90295052006001',
      [this.constant.key_jbyEnrollmentData]:  this.dataService.userDetails.cifNumber+"|"+ selectedAccount+"|Y|"+premiumAmount+"|"+additionalDetailsForm.nomineeName+"|"+additionalDetailsForm.relationship+"|"+age+"|"+this.dataService.userDetails?.customerName+"|" + trimmedAddress + "|",
      [this.constant.key_MobileNoOrg]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9)
    }

    console.log('getPremiumAmountParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
