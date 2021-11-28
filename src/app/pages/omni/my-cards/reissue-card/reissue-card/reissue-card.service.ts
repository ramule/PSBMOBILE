import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ReissueCardService {

  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods) { }

  getHotlistDebitCard(cardNo) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_debitCardNo]: cardNo,
      [this.constant.key_cardStatus]: "9",
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),

    }
    console.log(inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getBlockReissueCardParam(selectedDataCard, getPhysical,type) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_debitCardNo]: selectedDataCard.CardNo,
      [this.constant.key_cardStatus]: "9",
      [this.constant.key_methodName]: "BLOCKCARDANDREISSUE",
      [this.constant.key_BinPrefix]: selectedDataCard.BinPrefix, ///
      [this.constant.key_RequestFor]: "R",
      [this.constant.key_CardProgram]: selectedDataCard.CardProgram, ///
      [this.constant.key_PinMailer]: getPhysical ? "G" : "V",
      [this.constant.key_CifId]: selectedDataCard.Cifid,
      [this.constant.key_BranchCode]: selectedDataCard.BranchCode,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_accountNo]: selectedDataCard.AccountNo,
      [this.constant.key_service_Type]: type,
      // [this.constant.key_BinPrefix]:"652283",
      // [this.constant.key_RequestFor]:"R",
      // [this.constant.key_CardProgram]:"DEFCL",
      // [this.constant.key_PinMailer]:"P",
      // [this.constant.key_debitCardNo]:debitCardNumber,
      // [this.constant.key_CifId]:"PSBOMNI001059",
      // [this.constant.key_BranchCode]:"5735",
    }

    console.log(inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }


  getReissueCard(selectedDataCard, getPhysical,type) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_debitCardNo]: selectedDataCard.CardNo,
      [this.constant.key_methodName]: "REISSUEDEBITCARD",
      [this.constant.key_BinPrefix]: selectedDataCard.BinPrefix, ///
      [this.constant.key_RequestFor]: "R",
      [this.constant.key_CardProgram]: selectedDataCard.CardProgram, ///
      [this.constant.key_PinMailer]: getPhysical ? "G" : "V",
      [this.constant.key_CifId]: selectedDataCard.Cifid,
      [this.constant.key_BranchCode]: selectedDataCard.BranchCode,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_accountNo]: selectedDataCard.AccountNo,
      [this.constant.key_service_Type]: type,
    }

    console.log(inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }
}
