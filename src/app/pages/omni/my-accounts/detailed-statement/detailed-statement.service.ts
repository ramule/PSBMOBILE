import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { DatePipe } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailStatementService {
  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    public datePipe: DatePipe
  ) { }


  /**
   * request parameter for transaction
   */
  getTransactionParam(formData) {
    var datePipe = new DatePipe("en-US");

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_accountno]: formData.transferFrom,
      [this.constant.key_remarks]: formData?.remarks,
      [this.constant.key_transType]: formData?.transType,
      [this.constant.key_fromAmount]: formData.hasOwnProperty('fromAmount') ? formData?.fromAmount.replace(/[^0-9]+/g, '') : null,
      [this.constant.key_toAmount]: formData.hasOwnProperty('toAmount') ? formData?.toAmount.replace(/[^0-9]+/g, '') : null,
      [this.constant.key_fromdate]: formData?.fromDate != undefined ? datePipe.transform(formData?.fromDate, 'dd-MMM-yy') : undefined,//dd-MMM-yy
      [this.constant.key_todate]: formData?.toDate != undefined ? datePipe.transform(formData?.toDate, 'dd-MMM-yy') : undefined,//dd-MMM-yy
      [this.constant.key_period]: formData?.selType,
    }
    console.log("detail statement params", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getSelectPeriodParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId)
    }
    console.log("getSelectPeriodParams ", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  /**
  * request parameter for balance enquiry
  */
  getBalEnqParam(customerAccDetails) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_accountno]: customerAccDetails.accountNumber
    }
    console.log(' getBalEnqParam ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getMyAccountList(cifNo) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_omniDashData]: cifNo,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }
    console.log(' getMyAccountParam ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getDetailedStatementParam(customerAccDetails,dtlStatement){
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
        [this.constant.key_RRN] : this.commonMethod.genRandomDigit(9),
        [this.constant.key_accountNo] : customerAccDetails.accountNo,
        [this.constant.key_MobileNo_Org] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_detailedStatementData] : dtlStatement
      }
      console.log("getSelectPeriodParams ", JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;

  }


  getDashboardHeader(customerAccDetails,formData,selectPeriodDtl,type){
    var fromDate="",toDate="";

    if(type == 'period'){
      fromDate = selectPeriodDtl.fromDate;
      toDate = selectPeriodDtl.toDate;
    }
    else if(type == 'dateRange'){
      fromDate = formData.fromDate;
      toDate = formData.toDate;
    }
    else if(type == 'transactionCount'){
      fromDate = selectPeriodDtl.fromDate;
      toDate = ""+new Date()
    }

    var dashboardData = ""+customerAccDetails.accountNo+"|"+this.datePipe.transform(fromDate, 'ddMMyyyy')+"|"+this.datePipe.transform(toDate, 'ddMMyyyy')+"|";
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNo_Org] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_dashboardHeaderData] : dashboardData
    }
    console.log("getSelectPeriodParams ", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

 


  getAssessmentYearCall(type) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_configType]: type,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}

export enum detailStatement {
  START_DATE = 8,
  ENDDATE = 8,
  LOW_AMOUNT = 17,
  HIGH_AMOUNT = 17,
  FIRST_CHEQUE_NO = 8,
  LAST_CHEQUE_NO = 8,
  NO_OF_REQ = 2,
  SORT_CRITERIA = 1,
  CR_DR_FLAG = 1,
  LAST_TRANS_DATE = 8,
  LAST_TRANS_ID = 9,
  LAST_APRT_TRANS_NO = 4,
  LAST_POSTING_DATE = 14,
  LAST_BALANCE = 17
}
