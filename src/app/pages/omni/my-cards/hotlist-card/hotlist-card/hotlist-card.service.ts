import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';


@Injectable({
  providedIn: 'root'
})
export class HotlistCardService {

  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private commonMethod:CommonMethods) { }

// getDebitcardNoPram(accountNumber)
// {
//   var inputData = {
//     [this.constant.key_entityId]: this.constant.getEntityId(),
//     [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
//     [this.constant.key_RequestID]:this.commonMethod.genRandomDigit(9),
//     [this.constant.key_accountNo]:accountNumber
//     }

// console.log(inputData);
// let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
// return encryptData;
// }

getHotlistDebitCard(cardDetails,accNo,type)
{
  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_RequestID]:this.commonMethod.genRandomDigit(9),
    [this.constant.key_debitCardNo]: cardDetails,
    [this.constant.key_methodName]: 'BLOCKCARD',
    [this.constant.key_cardStatus]:"9",
    [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
    [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
    [this.constant.key_service_Type]: type,
    [this.constant.key_accountNo]: accNo,
}
 console.log(inputData);
 let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
 return encryptData;
}
}
