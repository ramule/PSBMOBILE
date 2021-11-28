import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class PmsbyDetailsService {

  constructor(
    private constant: AppConstants,
    private dataService: DataService,
    private storage: LocalStorageService,
    private common: CommonMethods,
    private encryptDecryptService: EncryptDecryptService
  ) { }

  getSBYAccountEnquiryCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_sbyAccountInquiryData]:  this.dataService.userDetails.cifNumber+"|"
    }

    console.log('getSBYAccountEnquiryParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getEnrollmentTransactionCall(selectedAccount, additionalDetailsForm, age) {

    var address = additionalDetailsForm.nomineeAddress1 + ' , ' + additionalDetailsForm.nomineeState + ' , ' + additionalDetailsForm.nomineeCity+additionalDetailsForm.nomineePin;
    var trimmedAddress = address.substring(0 , 40)

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_accountNo]: selectedAccount,
      [this.constant.key_amount]: "12",
      [this.constant.key_toAccount]: "90295039200002",
      [this.constant.key_sbyEnrollmentData]: "A|"+this.dataService.userDetails.cifNumber+"|"+ selectedAccount+"|Y|"+additionalDetailsForm.nomineeName+"|"+additionalDetailsForm.gender+"|"+ trimmedAddress +"|"+additionalDetailsForm.relationship+"|"+age+"|12"
    }

    console.log('getSBYAccountEnquiryParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
