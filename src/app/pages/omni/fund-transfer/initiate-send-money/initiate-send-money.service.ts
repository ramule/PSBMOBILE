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
export class InitiateSendMoneyService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage:LocalStorageService,
    public dataService : DataService,
    public common: CommonMethods,
    public datepipe : DatePipe
  ) { }

  getFundTransferParam(formData,benificiaryDtl,fromAccount,type ,payeeAccountNo){
    console.log("<===========  getOwnFundTransferParam  ===============>");
    var _userAccountDtl = this.dataService.customerOperativeAccList.filter(obj => obj.accountNo == fromAccount);
    console.log(formData,benificiaryDtl,_userAccountDtl);
    console.log("formData.remark" + formData.remark)

    var transactType = type;
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_customerID] : benificiaryDtl?.ID,
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_debitBranchCode]: '0000',
      [this.constant.key_accountNo]: fromAccount,
      [this.constant.key_creditBranchCode]: '0000',
      [this.constant.key_toAccount]: payeeAccountNo,
      [this.constant.key_donationId]: '12',
      [this.constant.key_TransactionType]: transactType,
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_RRN] : this.common.genRandomDigit(9),
      [this.constant.key_remarks] : formData?.remark ? formData.remark : "-",
      [this.constant.key_TransactionDate]: this.datepipe.transform(new Date().toISOString(), 'dd-MM-yyyy hh:mm:ss'),
      [this.constant.key_senderName]: this.dataService.userDetails?.customerName,
      [this.constant.key_receiverName]: type == "self" ? this.dataService.userDetails?.customerName : benificiaryDtl?.benefName
    }

    if(transactType == "NEFT" || transactType == "RTGS" ){
      //sender dtl
      inputData[this.constant.key_branch_name] = _userAccountDtl[0]?.branch_name;
      inputData[this.constant.key_bankName] = 'PSB';
      inputData[this.constant.key_sender_ifsc_code] = _userAccountDtl[0]?.ifscCode;
      //reciver dtl
      inputData[this.constant.key_benefName] = benificiaryDtl.benefName;
      inputData[this.constant.key_benficiaryBankName] = benificiaryDtl.beneficiary_bank_name;
      inputData[this.constant.key_benificiaryNickName] = benificiaryDtl.branch_name;
      inputData[this.constant.key_ifsc_code] = benificiaryDtl.ifsc_code;
    }

  console.log("inputData is " + JSON.stringify(inputData));

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }

  getNEFTFundTransferParam(formData, benificiaryDtl , payeeAccountNo) {
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
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_benefName]: benificiaryDtl.benefName,
      [this.constant.key_accountno]: formData.transferFrom,
      [this.constant.key_beneficiary_account_no]: benificiaryDtl.beneficiary_account_no,
      [this.constant.key_ifsc_code]: benificiaryDtl.IFSC,
      [this.constant.key_remarks]: formData?.remark ? formData.remark : '-',
      [this.constant.key_beneficiaryMobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo), //need to change later
      [this.constant.key_paymentMode]: "JIO", //need to change later
      [this.constant.key_txnAmt]: formData.amount.trim().replace(/[^0-9]+/g, ''), //need to change later
      [this.constant.key_branch_name]: benificiaryDtl?.branch_name,
      [this.constant.key_bankName]: benificiaryDtl.beneficiary_bank_name

    }
    console.log("neft requrest=====>" + JSON.stringify(inputData));
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_neftTransfer, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getRTGSFundTransferParam(formData, benificiaryDtl, accountDetail , payeeAccountNo) {

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_sender]: accountDetail.shortName,
      [this.constant.key_receiver]: benificiaryDtl.benefName,
      [this.constant.key_senderAccount]: formData.transferFrom,
      [this.constant.key_beneficiaryAccount]: benificiaryDtl.beneficiary_account_no,
      [this.constant.key_ifsc_code]: benificiaryDtl.IFSC,
      [this.constant.key_remarks]: formData?.remark ? formData.remark : "-",
      //TODO:new parameters added for sms send [25-09-2020] need to modify later
      [this.constant.key_referenceNumber] : this.common.genRandomDigit(9),
      [this.constant.key_date] : "2020-09-25",
      [this.constant.key_langCode]:"en",
      [this.constant.key_beneficiaryMobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo), //need to change later
      [this.constant.key_paymentMode]: "JIO", //need to change later
      [this.constant.key_txnAmt]: formData.amount.trim().replace(/[^0-9]+/g, '') //need to change later
    }
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_rtgsTransfer, JSON.stringify(inputData));//set omni channel req
    console.log('getRTGSFundTransferParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getMMIDFundTransferParam(formData, benificiaryDtl, accountDetail , payeeAccountNo) {
    console.log('From account details: ', accountDetail);
    console.log('To account details: ', benificiaryDtl);
    console.log(formData , benificiaryDtl , accountDetail);
    //TODO: need to discuss later about parameter repetaion and

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_ifsc_code]: "-",
      [this.constant.key_remarks]:formData?.mmidRemark ? formData.mmidRemark : '-',
      [this.constant.key_txnAmt]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_payerName]: "-",
      [this.constant.key_payerMobile]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_payerAccount]: accountDetail,
      [this.constant.key_payeeIfsc]: benificiaryDtl.ifsc_code,
      [this.constant.key_accountNo]: accountDetail,
      [this.constant.key_payeeAccount]: benificiaryDtl.beneficiary_account_no,
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''), //need to ask
      [this.constant.key_payeeMMID]: benificiaryDtl.MMID,
      [this.constant.key_payeeName]:benificiaryDtl.beneficiary_nick_name,
      [this.constant.key_payeeMobile] : benificiaryDtl.beneficiaryMobileNo,
      [this.constant.key_payerMMID]:""
    }
    // this.dataService.setOmniChannelReqParam(this.constant.key_omni_mmidTransfer, JSON.stringify(inputData));//set omni channel req
    console.log('getMMIDFundTransferParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getIFSCFundTransferParam(formData, benificiaryDtl, accountDetail , payeeAccountNo , remark , from?) {
    console.log('From account details: ', accountDetail);
    console.log('To account details: ', benificiaryDtl);
    console.log(formData , benificiaryDtl , accountDetail);

    var ifsc;
    var benefAccNo;

    if(from == 'fromFav'){
      ifsc = benificiaryDtl.ifscCode
      benefAccNo = benificiaryDtl.accountNo
    }else{
      ifsc = benificiaryDtl.ifsc_code
      benefAccNo = benificiaryDtl.beneficiary_account_no
    }

    var slicedRemark = '';
    if(remark!="" && remark!=undefined)
    {
      if(remark.length >= 10){
        slicedRemark = remark.slice(0,10);
      }else{
        slicedRemark = remark;
      }
    }
  
    //TODO: need to discuss later about parameter repetaion and
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_ifsc_code]: ifsc,
      [this.constant.key_remarks]: slicedRemark ? slicedRemark : "-",
      [this.constant.key_txnAmt]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_payerName]: "-",
      [this.constant.key_payerMobile]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_payerAccount]: accountDetail,
      [this.constant.key_payeeIfsc]: ifsc,
      [this.constant.key_accountNo]: accountDetail,
      [this.constant.key_payeeAccount]: benefAccNo,
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''), //need to ask
    }
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_mmidTransfer, JSON.stringify(inputData));//set omni channel req
    console.log('getMMIDFundTransferParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  schedulePaymentListParam(formData,benificiaryDtl,fromAccount,type ,payeeAccountNo,toDate){

    var date = new Date();
    console.log("<===========  getOwnFundTransferParam  ===============>");
    var _userAccountDtl = this.dataService.customerOperativeAccList.filter(obj => obj.accountNo == fromAccount);
    console.log(formData,benificiaryDtl,_userAccountDtl);
    var transactType = type;

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_customerID] : benificiaryDtl?.ID,
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_debitBranchCode]: '0000',
      [this.constant.key_accountNo]: fromAccount,
      [this.constant.key_creditBranchCode]: '0000',
      [this.constant.key_toAccount]: payeeAccountNo,
      [this.constant.key_donationId]: '12',
      [this.constant.key_TransactionType]: transactType,
      [this.constant.key_standingInstructionType]:'TRANSFERTRANSACTION', // RTGS , NEFT
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_paymentStartDate]: this.datepipe.transform(formData.datepicker1, 'dd-MM-yyyy'),
      [this.constant.key_paymentEndDate]: this.datepipe.transform(toDate, 'dd-MM-yyyy'),
      [this.constant.key_numOfInstallment]:formData?.installmentNumber ? formData.installmentNumber : '1',
      [this.constant.key_paymentFrequency]:formData?.frequencyType ? formData.frequencyType : '1',
      [this.constant.key_paymentFreqType]: formData?.paymentType ? formData.paymentType : '',
      [this.constant.key_RRN] : this.common.genRandomDigit(9),
      [this.constant.key_remarks] : formData?.remark ? formData.remark : "-",
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_year]:date.getFullYear(),
      [this.constant.key_month]:date.getMonth(),
      [this.constant.key_date]:date.getDate(),
      [this.constant.key_TransactionDate]: this.datepipe.transform(new Date().toISOString(), 'dd-MM-yyyy')
    }

    if(transactType == "NEFT" || transactType == "RTGS" ){
      //sender dtl
      inputData[this.constant.key_branch_name] = _userAccountDtl[0].branch_name;
      inputData[this.constant.key_bankName] = 'PSB';
      inputData[this.constant.key_sender_ifsc_code] = _userAccountDtl[0].ifscCode;
      //reciver dtl
      inputData[this.constant.key_benefName] = benificiaryDtl.benefName;
      inputData[this.constant.key_benficiaryBankName] = benificiaryDtl.beneficiary_bank_name;
      inputData[this.constant.key_benificiaryNickName] = benificiaryDtl.branch_name;
      inputData[this.constant.key_ifsc_code] = benificiaryDtl.ifsc_code;
    }

  console.log(inputData);

  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }


  getScheduleParam(){

    var date = new Date();
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_year]:date.getFullYear(),
      [this.constant.key_month]:date.getMonth(),
      [this.constant.key_date]:date.getDate()
      }

    console.log('getScheduleParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  paymentMethodsListParam(){
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId)

    }
    console.log("payment methods =====>" + JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  offerOnCardListParam(){
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
      [this.constant.key_cardtype]: "CREDIT"

    }
    console.log("payment methods =====>" + JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getAllAccountsParam()
  {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.constant.deviceID,
      [this.constant.key_MobileNo_Org]: "9818107758",
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_accountNo]: "123456",
      [this.constant.key_linkDelinkData]: "02021000015484|9888214125|P|~07901000093437|9956063543|L|~",
      [this.constant.key_requestType]: "LINK",

    }
    console.log("payment methods =====>" + JSON.stringify(inputData));
   // let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return inputData;
  }

  getBenificiaryListOnAccountParam()
  {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),


    }
    console.log("payment methods =====>" + JSON.stringify(inputData));
   // let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return inputData;
  }

  getAccountBalanceParam(selectAccount)
  {
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


  getFrequencyParam(type)
  {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_configType]:type
    }
    console.log('getFrequencyParamParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getMMIDScheduleParam()
  {
    var date = new Date()
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_year]:date.getFullYear(),
      [this.constant.key_month]:date.getMonth(),
      [this.constant.key_date]:date.getDate()
    }
    console.log('', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getWithinScheduleParam()
  {
    var date = new Date()
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
      [this.constant.key_year]:date.getFullYear(),
      [this.constant.key_month]:date.getMonth(),
      [this.constant.key_date]:date.getDate()
    }
    console.log('', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }





}
