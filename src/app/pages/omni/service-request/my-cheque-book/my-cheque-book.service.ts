import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { DatePipe } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
@Injectable({
  providedIn: 'root'
})
export class MyChequeBookService {
  cifNo:any;
  accNo:any;

  constructor( private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    public datePipe: DatePipe) { }


  getchekbookList(cifNo,accNo,formData){

    var toFormDate=this.datePipe.transform(formData.fromDate,'dd-MM-yyyy');
    var toDate=this.datePipe.transform(formData.toDate, 'dd-MM-yyyy');
    var chequeHistory = this.storage.getLocalStorage(this.constant.storage_mobileNo) +"|"+cifNo+"|"+accNo+"|"+ toFormDate +"|"+toDate;
    //var chequeHistory = "9956063543"+"|"+"008168874"+"|"+"07901000093437"+"|"+"01-01-2014|04-08-2021";
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      //[this.constant.key_MobileNo]:"9956063543",
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_accountNo]: accNo,
      //[this.constant.key_accountNo]: "07901000093437",
      [this.constant.key_chequeHistoryData]: chequeHistory,
      
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;



  }
}
