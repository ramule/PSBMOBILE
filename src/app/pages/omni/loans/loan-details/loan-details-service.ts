import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoanDetailsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private common : CommonMethods,
    private datepipe : DatePipe
  ) { }


  /**
   * 
   * 
   * getRecommendedOffersReq
   * 
   */
  getRecommendedOffersReq() {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
    }

    console.log('Recommended offers Req',JSON.stringify(inputData));
    

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  // getprovisionalCertificate() {
  //   var inputData = {};
  //   inputData = {
  //     [this.constant.key_entityId]: this.constant.getEntityId(),
  //     [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
  //     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
  //     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
  //     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
  //     [this.constant.key_latitude]: this.dataService.latitude,
  //     [this.constant.key_longitude]: this.dataService.longitude,
  //     [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
  //   }

  //   console.log('Recommended offers Req',JSON.stringify(inputData));
    

  //   let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  //   return encryptData;
  // }



  getRepaymentStatusParam(loanAccNo){
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_loanAccountNumber]: loanAccNo,
    }
    console.log('Repayment status',JSON.stringify(inputData));
    
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getStandingInstructionService(formData){
  //   "entityId": "RMOB",
  //   "cbsType": "TCS",
  //   "mobPlatform": "android",
  //   "mobileAppVersion": "1.0.0",
  //   "deviceId": "9",
  //   "clientAppVer": "1.0.0",
  //  "MobileNoOrg": "9818107758",
  //   "RRN":"12312321",
  //  "referenceNumber":"111878875656",
  //   "accountNo":"15081100000073",
  // "standingInstructionData":"07901000093437|06061300068176|100|Q|2|4|13-06-2022|Standing Instruction Tested"
    var date = this.datepipe.transform(new Date().toISOString(), "dd-MM-yyyy");
    var standingInstructionData = formData.debitAccount+"|"+formData.creditAccount+"|"+formData.amount+"|"+formData.paymentFrequency+"|5|"+formData.installmentNumber+"|"+date+"|"+ formData.remarks;

    var inputData = {};
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
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      //[this.constant.key_accountNo] : formData.debitAccount,
      [this.constant.key_standingInstructionData] : standingInstructionData

    }
    console.log("neft requrest=====>" + JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }

  getprovisionalCertificate(Account,cif){
    //   "entityId": "RMOB",
    //   "cbsType": "TCS",
    //   "mobPlatform": "android",
    //   "mobileAppVersion": "1.0.0",
    //   "deviceId": "9",
    //   "clientAppVer": "1.0.0",
    //  "MobileNoOrg": "9818107758",
    //   "RRN":"12312321",
    //  "referenceNumber":"111878875656",
    //   "accountNo":"15081100000073",
    // "standingInstructionData":"07901000093437|06061300068176|100|Q|2|4|13-06-2022|Standing Instruction Tested"
       var date = this.datepipe.transform(new Date().toISOString(), "dd-MM-yyyy");
       var year = this.datepipe.transform(new Date().toISOString(), "yyyy");
       console.log("year",year)
      var provisionalIntrestcertData =cif+"|"+"01-04-"+year+"|"+date+"|"+Account;
  
      var inputData = {};
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
        [this.constant.key_RRN]: this.common.genRandomDigit(9),
        [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
        //[this.constant.key_accountNo] : formData.debitAccount,
        [this.constant.key_provisionalIntrestcertData] : provisionalIntrestcertData
  
      }
      console.log("Provisional requrest=====>" + JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
  
    }
  

  modifyStandingInstructionService(formData){
    //   "entityId": "RMOB",
    //   "cbsType": "TCS",
    //   "mobPlatform": "android",
    //   "mobileAppVersion": "1.0.0",
    //   "deviceId": "9",
    //   "clientAppVer": "1.0.0",
    //  "MobileNoOrg": "9818107758",
    //   "RRN":"12312321",
    //  "referenceNumber":"111878875656",
    //   "accountNo":"15081100000073",
    // "standingInstructionData":"07901000093437|06061300068176|100|Q|2|4|13-06-2022|Standing Instruction Tested"
      var date = this.datepipe.transform(new Date().toISOString(), "dd-MM-yyyy");
      //var modifyStandingInstructionData = formData.debitAccount+"|"+formData.creditAccount+"|"+formData.amount+"|"+formData.paymentFrequency+"|5|"+formData.installmentNumber+"|"+date+"|"+ formData.remarks;
      var modifyStandingInstructionData = "DL183016|07901000093437|06061300068176|122|Q|2|4|13-06-2022|Standing instruction Tested";
  
      var inputData = {};
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
        [this.constant.key_RRN]: this.common.genRandomDigit(9),
        [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
        //[this.constant.key_accountNo] : formData.debitAccount,
        [this.constant.key_standingInstructionData] : modifyStandingInstructionData
  
      }
      console.log("modify requrest=====>" + JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
  
    }
  
    deleteStandingInstructionService(formData){
        var date = this.datepipe.transform(new Date().toISOString(), "dd-MM-yyyy");
        var deleteSIData = "DL183016|06061000068235";
    
        var inputData = {};
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
          [this.constant.key_RRN]: this.common.genRandomDigit(9),
          [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
          [this.constant.key_deleteSIData] : deleteSIData
    
        }
        console.log("delete requrest=====>" + JSON.stringify(inputData));
        let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
        return encryptData;
    
      }

  getAssessmentYearCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_configType]: this.constant.val_assessmentYear,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  
  getInterestCertificateParamSecond(formData,accDtl){
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
    [this.constant.key_referenceNumber] : this.common.genRandomDigit(9),
    [this.constant.key_RRN]: this.common.genRandomDigit(9),    
  }
  console.log('InterestCertificateParamMoreDetails ', JSON.stringify(inputData));
  console.log(this.storage.getSessionStorage(this.constant.val_sessionKey));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }

 getInterestCertificateParamlatra(accountNumber){
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
    [this.constant.key_accountNo]:accountNumber ,//15081000001825 customerAccDetails.accountNo
    [this.constant.key_referenceNumber] : this.common.genRandomDigit(9),
    [this.constant.key_RRN]: this.common.genRandomDigit(9),    
  }
  console.log('InterestCertificateParamMoreDetails ', JSON.stringify(inputData));
  console.log(this.storage.getSessionStorage(this.constant.val_sessionKey));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
 }

}
