import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ng-idle/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class InstantPayService {

  constructor(
    private constant:AppConstants,
    private storage:LocalStorageService,
    private dataService:DataService,
    private encryptDecryptService:EncryptDecryptService,
    private common: CommonMethods,
    private datepipe: DatePipe
  ) { }



  getNameInquiryAccountIFSC(formData , accountNo){

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_ifsc_code]: formData.ifsc,
      [this.constant.key_accountNo] : accountNo,
      [this.constant.key_payerName] : "ABCD",
      [this.constant.key_payerMobile] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_payerAccount] : accountNo,
      [this.constant.key_payeeIfsc] : formData.ifsc,
      [this.constant.key_payeeAccount] : formData.accountNumber,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
    }

    console.log('AccountIFSC', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }

  getNameInquiryMMID(formData , accountNo){

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_accountNo]: accountNo,
      [this.constant.key_payerName] : "ABCD",
      [this.constant.key_payerMobile] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_payerAccount] : accountNo,
      [this.constant.key_payeeMobile] : formData.mobileNumber,
      [this.constant.key_payeeMMID] : formData.mmid,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
    }
    console.log('InquiryMMID', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }

  getMMIDFundTransferParam(formData, selectedAccount, payeeName) {

    console.log("benifiicary name===>");
    if(formData.mmidRemark == null || formData.mmidRemark == ''){
      formData.mmidRemark = "-"
    }

    //TODO: need to discuss later about parameter repetaion and
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_ifsc_code]: "",
      [this.constant.key_remarks]: formData.mmidRemark,
      [this.constant.key_txnAmt]: formData.amount.trim().replace(/[^.0-9]+/g, ''),
      [this.constant.key_payerName]: "",
      [this.constant.key_payerMobile]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_payerAccount]: selectedAccount,
      [this.constant.key_payeeIfsc]: "",
      [this.constant.key_accountNo]: selectedAccount,
      [this.constant.key_payeeAccount]: "",
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''), //need to ask
      [this.constant.key_payeeMMID]: formData.mmid,
      [this.constant.key_payeeName]:formData.payeeName,
      [this.constant.key_payeeMobile] : formData.confirmMobileNumber,
      [this.constant.key_payerMMID]:"",
      [this.constant.key_actionType]:'Quick',
      [this.constant.key_senderName]: this.dataService.userDetails?.customerName,
      [this.constant.key_receiverName]: payeeName,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
    }
    // this.dataService.setOmniChannelReqParam(this.constant.key_omni_mmidTransfer, JSON.stringify(inputData));//set omni channel req
    console.log('getMMIDFundTransferParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getIFSCFundTransferParam(formData, selectedAccount,payeeName) {

    console.log("benifiicary name===>");
    if(formData.remark == null || formData.remark == ''){
      formData.remark = "-"
    }


    //TODO: need to discuss later about parameter repetaion and
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_ifsc_code]: formData.payeeName,
      [this.constant.key_remarks]: formData.remark,
      [this.constant.key_txnAmt]: formData.amount.trim().replace(/[^.0-9]+/g, ''),
      [this.constant.key_payerName]: "A",
      [this.constant.key_payeeName]: formData.payeeName,
      [this.constant.key_payerMobile]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_payerAccount]: selectedAccount,
      [this.constant.key_payeeIfsc]: formData.ifsc,
      [this.constant.key_accountNo]: selectedAccount,
      [this.constant.key_payeeAccount]: formData.confirmAccountNumber,
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_actionType]:'Quick', //need to ask,
      [this.constant.key_senderName]: this.dataService.userDetails?.customerName,
      [this.constant.key_receiverName]: payeeName,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
    }
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_mmidTransfer, JSON.stringify(inputData));//set omni channel req
    console.log('getMMIDFundTransferParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getAccountBalanceParam(selectAccount) {
    console.log(selectAccount)
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.constant.deviceID,
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_branchCode]: "0181",
      [this.constant.key_accountNo]:selectAccount,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),

    }
    console.log("Get Balance params =====>" + JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getFundTransferParam(formData, selectedAccount, type, payeeName){
    console.log("benifiicary name===>");

    if(formData.remark == null || formData.remark == ''){
      formData.remark = "-"
    }


    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_customerID] : '',
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_debitBranchCode]: '0000',
      [this.constant.key_accountNo]: selectedAccount,
      [this.constant.key_creditBranchCode]: '0000',
      [this.constant.key_toAccount]: formData.accountNumber,
      [this.constant.key_donationId]: '12',
      [this.constant.key_TransactionType]: type,
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_RRN] : this.common.genRandomDigit(9),
      [this.constant.key_remarks] : formData.remark ,
      [this.constant.key_TransactionDate]: this.datepipe.transform(new Date().toISOString(), 'dd-MM-yyyy hh:mm:ss'),
      [this.constant.key_actionType]:'Quick',
      [this.constant.key_senderName]: this.dataService.userDetails?.customerName,
      [this.constant.key_receiverName]: payeeName,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
    }
    console.log(inputData);

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
  validatePayee(formDtl) {

   
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_accountNo] : formDtl.confirmAccountNumber
    }

    console.log("validatepayee", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }



  validatemmidPayee(formDtl, ifsc ,selectedAccount) {
    var inputData = {};
    inputData = {
      "entityId": this.constant.getEntityId(),
      "ifsc_code" :ifsc,
      "accountNo":selectedAccount,
      "payerAccount":selectedAccount,
      "payerMobile":this.storage.getLocalStorage(this.constant.storage_mobileNo),
      "payerName":this.dataService.userDetails?.customerName,
      "mmidForm":formDtl.mmid,
      "payeeAccount":formDtl.confirmAccountNumber,
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      
    }

    console.log("validateOutsidePayee", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  validateOutsidePayee(formDtl, ifsc ,selectedAccount) {
    console.log("====>"+this.storage.getLocalStorage(this.constant.storage_mobileNo));
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_ifsc_code] :ifsc,
      [this.constant.key_accountNo]:selectedAccount,
      [this.constant.key_payerAccount]:selectedAccount,
      [this.constant.key_payerMobile]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_payerName]:this.dataService.userDetails?.customerName,
      [this.constant.key_payeeIfsc]:formDtl.ifsc,
      [this.constant.key_payeeAccount]:formDtl.confirmAccountNumber,
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      
    }

    console.log("validateOutsidePayee", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
