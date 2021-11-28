import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { DatePipe } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';



@Injectable({
  providedIn: 'root'
})
export class PositivePayService {

  constructor( private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage:LocalStorageService,
    public dataService : DataService,
    public common:CommonMethods,
    public datepipe:DatePipe){}

  getPositivePayParam(formData)
  {
    var inputData = {};
    var datePipe = this.datepipe.transform(formData.datepicker1, 'dd-MMM-yyyy');
    var san = formData.selectAccount.substr(formData.selectAccount.length - 6)
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]:this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      // slice(0,3)
      [this.constant.key_positivePayData]:  this.dataService.userDetails.customerID+"|"+formData.selectAccount+"|"+formData.chequeNumber+"|"+datePipe+"|"+((formData.amount).trim().replace(/[^.0-9]+/g, ''))+"|"+formData.transactionCode+"|PSB|"+formData.micr +"|"+formData.payeeName+"|"+san



    }
    console.log('getPositiveBayParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getSingleChequeInquiryParam(accountNo,chequeNumber){
    var inputData = {};

    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_accountNo]:accountNo,
      [this.constant.key_cheque_Number]:chequeNumber,
      [this.constant.key_RRN]:this.common.genRandomDigit(8),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
