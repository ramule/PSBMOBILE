import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';


@Injectable({
  providedIn: 'root'
})
export class StopChequesService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    public dataService: DataService,
    public common:CommonMethods
  ) { }

  getSingleChequeInquiryParam(formData , screen) {
    var inputData = {};

    var chqNumber;
    if(screen == "fromStop"){
      chqNumber = formData.frmChequeNumber
    }else{
      chqNumber = formData.chequeNumber
    }

    console.log("chqNumber" + chqNumber);
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_accountNo]:formData.account,
      [this.constant.key_cheque_Number]:chqNumber,
      [this.constant.key_RRN]:this.common.genRandomDigit(8),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getBulkChequeInquiryParam(formData) {
    var inputData = {};
    var noOfLeaves = +formData.toChequeNumber - +formData.fromChequeNumber + 1
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_bulkChequeInquiryData]:formData.account + "|" + parseInt(formData.fromChequeNumber) + "|" + noOfLeaves,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_accountNo]:formData.account,
      [this.constant.key_RRN]:this.common.genRandomDigit(9)
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getReasonChequeParam() {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_productType]:this.constant.val_StopCheque
    }

    console.log('stop cheque reason list', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getSingleStopChequeParam(formData) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_RRN]: this.common.genRandomDigit(8),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_accountNo]:formData.account,
      [this.constant.key_cheque_Number]:formData.chequeNumber
    }

    console.log('stop cheques param', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getBulkStopChequeParam(formData) {
    var inputData = {};
    var noOfLeaves = +formData.toChequeNumber - +formData.frmChequeNumber
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_accountNo]:formData.account,
      [this.constant.key_RRN]:this.common.genRandomDigit(8),
      [this.constant.key_cheque_Number]:formData.frmChequeNumber,
      [this.constant.key_noOfLeaves]:noOfLeaves,
      [this.constant.key_reasonCode]:formData.reason,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      ["referenceNumber"]:this.common.genRandomDigit(9)
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }



}
