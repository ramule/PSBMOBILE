import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { DatePipe } from '@angular/common';
import { CommonMethods } from '../../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class NomineeOverviewService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod : CommonMethods
  ) { } 

  getNomineeData(selectedAccountNo, cifNumber){
    var inquiryNomineeData = cifNumber + "|" + selectedAccountNo
    var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_inquiryNomineeData] :  inquiryNomineeData,
 
  }
  console.log(' Nominee Data :: =>  ', JSON.stringify(inputData));
  console.log(this.storage.getSessionStorage(this.constant.val_sessionKey));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }

}
