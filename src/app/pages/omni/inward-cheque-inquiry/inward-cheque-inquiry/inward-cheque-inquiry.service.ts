import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class InwardChequeInquiryService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    public dataService: DataService,
    public common:CommonMethods
  ) { }

  getInwardChequeInquiryParam( inquiryData) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      // [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]: this.common.genRandomDigit(8),
      [this.constant.key_chequeInwardInqDetailsData] : this.getInwardChequeFormatDate(inquiryData)

    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;


  }

  getInwardChequeFormatDate( inquiryData){
    var mobileNumber = this.storage.getLocalStorage(this.constant.storage_mobileNo)
    var inwardEnquiryData = inquiryData['accountNumber'] +"|"+ inquiryData['fromDate'] +"|"+ inquiryData['toDate'];
    console.log("inwardEnquiryData ======>>>> ", inwardEnquiryData);
    return inwardEnquiryData
  }

}
