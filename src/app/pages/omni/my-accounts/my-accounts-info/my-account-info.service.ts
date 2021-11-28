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
export class MyAccountInfoService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod : CommonMethods
  ) { }


  /**
  * request parameter for mini statement
  */
 getMiniStatementParam(customerAccDetails) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_accountNo]: customerAccDetails.accountNo,//"08341000012950" customerAccDetails.accountNo
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_branchCode]: customerAccDetails.branchCode,//G1509
    }
    console.log(' getMiniStatementParam ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getCashCreditHistory(accno){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_subCode]: "01",
      [this.constant.key_accountNo]: accno ,//08341000012950 customerAccDetails.accountNo
      [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9)
    }
    console.log(' getBalEnqParam ', JSON.stringify(inputData));

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
    [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_accountNo]: customerAccDetails.accountNo ,//08341000012950 customerAccDetails.accountNo
    [this.constant.key_branchCode]: customerAccDetails.branchCode,//G1509
    [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9)
  }
  console.log(' getBalEnqParam ', JSON.stringify(inputData));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
}

 getMyAccountList(cifNo){
  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_RRN] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_omniDashData] : cifNo,
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
  }
  console.log(' getMyAccountParam ', JSON.stringify(inputData));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }

 getAccountEnquiryParam(customerAccDetails){

  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_accountNo]: customerAccDetails.accountNo ,//15081000001825 customerAccDetails.accountNo
    [this.constant.key_branchCode]: customerAccDetails.branchCode,//G1509
    // [this.constant.key_accountNo]:15081000001825 ,
    // [this.constant.key_branchCode]:"G1509",
    [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9)
  }
  console.log(' getAccountEnquiryParam ', JSON.stringify(inputData));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }


 getAccountEnquiryParams(donationReceiptObjssss,branchcode){

  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_accountNo]: donationReceiptObjssss ,//15081000001825 customerAccDetails.accountNo
    [this.constant.key_branchCode]: branchcode,//G1509
    // [this.constant.key_accountNo]:15081000001825 ,
    // [this.constant.key_branchCode]:"G1509",
    [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9)
  }
  console.log(' getAccountEnquiryParam ', JSON.stringify(inputData));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }

 getLienAccountParam(customerAccDetails){
  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_accountNo]: customerAccDetails.accountNo ,//15081000001825 customerAccDetails.accountNo
    [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
    [this.constant.key_lienInquiryData] : this.constant.val_upi_ALL
  }
  console.log(' getAccountEnquiryParam ', JSON.stringify(inputData));
  console.log(this.storage.getSessionStorage(this.constant.val_sessionKey));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }


 getInterestCertificateParam(formData,accDtl){
  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_localStorage_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_accountNo]: formData.accNo ,//15081000001825 customerAccDetails.accountNo
    [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
    ["depositDetailsData"] : this.getInterstData(formData)//"011928043|01-01-2020|01-01-2021|00001200000057"
  }
  console.log(' getInterestCertificateParam ', JSON.stringify(inputData));
  console.log(this.storage.getSessionStorage(this.constant.val_sessionKey));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }


 getInterstData(formData){
   var toDate = "01-01-"+(+formData.period.split('-')[0] + 1);
   var fromDate = "01-01-"+formData.period.split('-')[0];
   console.log(toDate);
   console.log(fromDate);
  //  var interestData = ""+this.dataService.userDetails.cifNumber+"|"+toDate+"|"+fromDate+"|"+formData.accNo;
   var interestData = this.dataService.userDetails.cifNumber+"|"+fromDate+"|"+toDate+"|"+formData.accNo;

   return interestData
 }


 getBalanceCertificateParam(accDtl){
   console.log(accDtl);
  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_accountNo]: accDtl[0].accountNo ,//15081000001825 customerAccDetails.accountNo
    [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
    [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
    [this.constant.key_branchCode] : accDtl[0].branchCode,
    [this.constant.key_mobileNumber] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
  }
  console.log(' getBalanceCertificateParam ', JSON.stringify(inputData));
  console.log(this.storage.getSessionStorage(this.constant.val_sessionKey));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }

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


 delinkAccountParam(linkDelikItem) {
  var linkData = "~" +  linkDelikItem + "|" + this.storage.getLocalStorage(this.constant.storage_mobileNo) + "|" + "D" + "|~";
  console.log("linkData" + linkData);

  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_latitude]: this.dataService.latitude,
    [this.constant.key_longitude]: this.dataService.longitude,
    [this.constant.key_accountNo]: linkDelikItem,
    [this.constant.key_requestType]:'DELINK',
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
    [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
    [this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),
    [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_linkDelinkData]:linkData
  }

  console.log("linkAccountParam", JSON.stringify(inputData));
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
}

getGenerateMMID(accno, ifscCode, payerName){
  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_ifsc_code]: ifscCode,
    [this.constant.key_accountNo]: accno,
    [this.constant.key_payerName]: payerName,
    [this.constant.key_payerAccount]: accno,
    [this.constant.key_payerMobile]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
  }

  console.log("generateMMID", JSON.stringify(inputData));
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
}

getCancelMMID(accno, ifscCode, payerName){
  var inputData = {
    [this.constant.key_entityId]: this.constant.getEntityId(),
    [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    [this.constant.key_ifsc_code]: ifscCode,
    [this.constant.key_accountNo]: accno,
    [this.constant.key_txn_amount]: 0,

    [this.constant.key_payerName]: payerName,
    [this.constant.key_payerAccount]: accno,
    [this.constant.key_payerMobile]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
    [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
  }

  console.log("cancelMMID", JSON.stringify(inputData));
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
}
}
