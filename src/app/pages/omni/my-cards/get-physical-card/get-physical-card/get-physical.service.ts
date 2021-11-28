import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class GetPhysicalService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private commonMethod:CommonMethods
  ) { }

  getPhysicalCardParam(debitCardNo,Cifid,type) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_debitCardNo] : debitCardNo,
      [this.constant.key_mobileNumber] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_PinMailer] : "G",
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_CifId]: Cifid,
      [this.constant.key_service_Type]: type,
    }
    console.log(' getDebitCardList ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
