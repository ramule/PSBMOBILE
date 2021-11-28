import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { state } from '@angular/animations';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountOpeningStepsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private storage: LocalStorageService,
    private datePipe: DatePipe
  ) { }

  /**
   * request parameter for language json
   */
  getSaveaAccOpenParam(pageName,Id,type?:any) { //state,city,dateofbirth,nomineeDob,category

    var aadhaarDBT = 'N';
    if(this.dataService.accountOpenFldData.aadharLinkDBT1 == true) {
      aadhaarDBT = 'N'
    }else if(this.dataService.accountOpenFldData.aadharLinkDBT2 == true){
      aadhaarDBT = 'Y'
    }

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_omni_pageName]: pageName,
      // [this.constant.key_omni_FirstName]: "FirstName",
      // [this.constant.key_omni_LastName]: "LastName",
      // [this.constant.key_MobileNo_Org]: "",
      // [this.constant.key_emailId]: "",
      [this.constant.key_omni_termsCondition]: "N",
      [this.constant.key_omni_authbankToComm]: "N",
      [this.constant.key_omni_aadharBasedAcc]: "N",
      [this.constant.key_omni_dbtBenefitNew]: "N",
      [this.constant.key_omni_dbtBenefitAcc]: "N",
      [this.constant.key_omni_dbtBenefitAccReplace]: "N",
      [this.constant.Key_ID]: Id,
      [this.constant.key_omni_FirstName]: this.dataService.accountOpenFldData.FirstName.toUpperCase(),
      [this.constant.key_omni_LastName]: this.dataService.accountOpenFldData.LastName.toUpperCase(),
      [this.constant.key_MobileNo_Org]: this.dataService.accountOpenFldData.MobileNoOrg,
      [this.constant.key_emailId]: this.dataService.accountOpenFldData.emailId,
      [this.constant.key_omni_PanNumber]: this.dataService.accountOpenFldData.panNumber,
      [this.constant.key_omni_AADHAARNUMBER]: this.dataService.accountOpenFldData.aadharNumber,
      [this.constant.key_gender]: this.dataService.accountOpenFldData.gender,
      [this.constant.key_omni_permanentAddrL1]: this.dataService.accountOpenFldData.permanentAddrL1,
      [this.constant.key_omni_permanentAddrL2]: this.dataService.accountOpenFldData.permanentAddrL2,
      [this.constant.key_omni_permanentAddrState]: this.dataService.accountOpenFldData.permanentAddrState,
      [this.constant.key_omni_permanentAddrCity]: this.dataService.accountOpenFldData.permanentAddrCity != null ? this.dataService.accountOpenFldData.permanentAddrCity : '',
      [this.constant.key_omni_permanentAddrPin]: this.dataService.accountOpenFldData.permanentAddrPin,
      [this.constant.key_omni_nationality]: this.dataService.accountOpenFldData.nationality,
      [this.constant.key_omni_maritalStatus]: this.dataService.accountOpenFldData.maritalStatus,
      [this.constant.key_omni_community]: this.dataService.accountOpenFldData.community,
      [this.constant.key_category]: this.dataService.accountOpenFldData.category,
      [this.constant.key_omni_fatherName]: this.dataService.accountOpenFldData.fatherName,
      [this.constant.key_omni_motherName]: this.dataService.accountOpenFldData.motherName,
      [this.constant.key_omni_communicationAddrL1]: this.dataService.accountOpenFldData.communicationAddrL1,
      [this.constant.key_omni_communicationAddrL2]: this.dataService.accountOpenFldData.communicationAddrL2,
      [this.constant.key_omni_communicationAddrCity]: this.dataService.accountOpenFldData.communicationAddrCity,
      [this.constant.key_omni_communicationAddrState]: this.dataService.accountOpenFldData.communicationAddrState,
      [this.constant.key_omni_communicationAddrPin]: this.dataService.accountOpenFldData.communicationAddrPin,
      [this.constant.key_omni_occupation]: this.dataService.accountOpenFldData.occupation,
      [this.constant.key_omni_annualIncome]: this.dataService.accountOpenFldData.annualIncome,
      [this.constant.key_branchCode]: this.dataService.accountOpenFldData.branchCode,
      [this.constant.key_omni_nomineeName]: this.dataService.accountOpenFldData.nomineeName,
      [this.constant.key_omni_nomineeAddrL1]: this.dataService.accountOpenFldData.nomineeAddrL1,
      [this.constant.key_omni_nomineeAddrL2]: this.dataService.accountOpenFldData.nomineeAddrL2,
      [this.constant.key_omni_nomineeAddrCity]: this.dataService.accountOpenFldData.nomineeAddrCity,
      [this.constant.key_omni_nomineeAddrState]: this.dataService.accountOpenFldData.nomineeAddrState,
      [this.constant.key_omni_nomineeAddrPin]: this.dataService.accountOpenFldData.nomineeAddrPin,
      [this.constant.key_omni_nomineeDOB]: this.dataService.accountOpenFldData.nomineeDOB,
      [this.constant.key_omni_nomineeRelationship]: this.dataService.accountOpenFldData.nomineeRelationship,
      [this.constant.key_omni_guardianAddrL1]: this.dataService.accountOpenFldData.guardianAddrL1,
      [this.constant.key_omni_guardianAddrL2]: this.dataService.accountOpenFldData.guardianAddrL2,
      [this.constant.key_omni_guardianAddrCity]: this.dataService.accountOpenFldData.guardianAddrCity,
      [this.constant.key_omni_guardianAddrState]: this.dataService.accountOpenFldData.guardianAddrState,
      [this.constant.key_omni_guardianAddrPin]: this.dataService.accountOpenFldData.guardianAddrPin,
      [this.constant.key_omni_guardian]: this.dataService.accountOpenFldData.guardian,
      [this.constant.key_omni_guardianType]: this.dataService.accountOpenFldData.guardianType,
      [this.constant.key_omni_UPI_ADDRESS]: this.dataService.accountOpenFldData.UPI_ADDRESS,
      [this.constant.key_omni_ACCOUNTTYPE]: this.dataService.accountOpenFldData.ACCOUNTTYPE,
      [this.constant.key_omni_lastDraftPage]: pageName,
      [this.constant.key_dateOfBirth]: this.dataService.accountOpenFldData.dob,
      [this.constant.key_accountNumber]: "",
      [this.constant.key_omni_cif]: this.dataService.accountOpenFldData.cif,
      [this.constant.key_omni_amountPaid]: this.dataService.accountOpenFldData.amountPaid,
      [this.constant.key_omni_videoKYCFlag]: 'N',//this.dataService.accountOpenFldData.videoKYCFlag,
      [this.constant.key_omni_action]: type ? type : 'POST',
      [this.constant.key_omni_branchState] : this.dataService.accountOpenFldData.branchState,
      [this.constant.key_omni_donNotWantNominee]: this.dataService.accountOpenFldData.donNotWantNominee == true ? 'Yes' : 'No',
      [this.constant.key_omni_smsEmailPermission]: this.dataService.accountOpenFldData.smsEmailPermission,
      [this.constant.key_omni_bankTearmCondition]: this.dataService.accountOpenFldData.bankTearmCondition,
      [this.constant.key_omni_fatcaDeclaration]: this.dataService.accountOpenFldData.isFatcaDeclaration,
      [this.constant.key_omni_nomineeAddSameAsPermanent]: this.dataService.accountOpenFldData.isNomineeAddSameAsPermanent == true ? 'Y' : 'N',
      [this.constant.key_omni_commAddSameAsPermanent]: this.dataService.accountOpenFldData.isCommunAdrSameAsPermanent == true ? 'Y' : 'N',
      [this.constant.key_omni_branchPinCode]: this.dataService.accountOpenFldData.branchPinCode,
      [this.constant.key_omni_branchSearchType]: this.dataService.accountOpenFldData.branchSearchType,
      [this.constant.key_omni_accountType]:this.dataService.accountOpenFldData.accountType,
      [this.constant.key_omni_addharLinkDBT1]: aadhaarDBT,
      [this.constant.key_omni_addharLinkDBT2]: this.dataService.accountOpenFldData.aadharLinkDBT2 == true ? 'Y' : 'N',
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_acntTypeFlag]: this.dataService.accountOpenFldData.nomineeNotMinor == true ? 'Y' : 'N'

//       "entityId":"RMOB", key_entityId
// "mobPlatform":"android", key_mobPlatform
// "mobileAppVersion":"0.1.0", key_mobileAppVersion
// "clientAppVer":"1.0.0", key_clientAppVersion
// "latitude":"125.88",
// "longitute":"125.88",
// "pageName":"ACCOUNT_SELECTION", key_omni_pageName
// "termsCondition":"N", key_omni_termsCondition
// "authbankToComm":"N", key_omni_authbankToComm
// "aadharBasedAcc":"N", key_omni_aadharBasedAcc
// "dbtBenefitNew":"N", key_omni_dbtBenefitNew
// "dbtBenefitAcc":"N", key_omni_dbtBenefitAcc
// "dbtBenefitAccReplace":"N", key_omni_dbtBenefitAccReplace
// "ID":0, Key_ID
// "FirstName":"Shubham", key_omni_FirstName
// "LastName":"Lokhande", key_omni_LastName
// "MobileNoOrg":"75454545", key_MobileNo_Org
// "email_id":"aa@aa.com", key_emailId
// "PanNumber":"AAIPM3854E", key_omni_PanNumber
// "gender":"male", key_gender
// "permanentAddrL1":"Pune", key_omni_permanentAddrL1
// "permanentAddrL2":"PUNE", key_omni_permanentAddrL2
// "permanentAddrState":"PUNE", key_omni_permanentAddrState
// "permanentAddrCity":"PUNE", key_omni_permanentAddrCity
// "permanentAddrPin":"78954", key_omni_permanentAddrPin
// "nationality":"iNDIAN", key_omni_nationality
// "maritalStatus":"002", key_omni_maritalStatus
// "community":"2", key_omni_community
// "category":"2", key_category
// "fatherName":"father", key_omni_fatherName
// "motherName":"mother",key_omni_motherName
// "communicationAddrL1":"address1", key_omni_communicationAddrL1
// "communicationAddrL2":"address2", key_omni_communicationAddrL2
// "communicationAddrCity":"3359", key_omni_communicationAddrCity
// "communicationAddrState":"5018", key_omni_communicationAddrState
// "communicationAddrPin":"400004", key_omni_communicationAddrPin
// "occupation":"31", key_omni_occupation
// "annualIncome":"875555", key_omni_annualIncome
// "branchCode":"0117", key_branchCode
// "nomineeName":"nomninee", key_omni_nomineeName
// "nomineeAddrL1":"address1", key_omni_nomineeAddrL1
// "nomineeAddrL2":"address2", key_omni_nomineeAddrL2
// "nomineeAddrCity":"3191", key_omni_nomineeAddrCity
// "nomineeAddrState":"5003", key_omni_nomineeAddrState
// "nomineeAddrPin":"40004", key_omni_nomineeAddrPin
// "nomineeDOB":"1897-11-16", key_omni_nomineeDOB
// "nomineeRelationship":"2", key_omni_nomineeRelationship
// "guardianAddrL1":"PUNE", key_omni_guardianAddrL1
// "guardianAddrL2":"PUNE", key_omni_guardianAddrL2
// "guardianAddrCity":"PUNE", key_omni_guardianAddrCity
// "guardianAddrState":"PUNE", key_omni_guardianAddrState
// "guardianAddrPin":"78455", key_omni_guardianAddrPin
// "guardian":"nAVIN", key_omni_guardian
// "guardianType":"FFF", key_omni_guardianType
// "UPI_ADDRESS":"sarfaraj@psb", key_omni_UPI_ADDRESS
// "ACCOUNTTYPE":"SAVING", key_omni_ACCOUNTTYPE
// "lastDraftPage":"", key_omni_lastDraftPage
// "dateOfBirth":"", key_dateOfBirth
// "accountNumber":"85754545", key_accountNumber
// "cif":"45454", key_omni_cif
// "amountPaid":"454545", key_omni_amountPaid
// "videoKYCFlag":"Y", key_omni_videoKYCFlag
// "action":"post", key_omni_action
// "branchState":"mAHARASHTRA", key_omni_branchState
// "donNotWantNominee":"No", key_omni_donNotWantNominee
// "smsEmailPermission":"N", key_omni_smsEmailPermission
// "bankTearmCondition":"N", key_omni_bankTearmCondition
// "fatcaDeclaration":"N", key_omni_fatcaDeclaration
// "nomineeAddSameAsPermanent":"N", key_omni_nomineeAddSameAsPermanent
// "commAddSameAsPermanent":"Y", key_omni_commAddSameAsPermanent
// "branchPinCode":"400004", key_omni_branchPinCode
// "branchSearchType":"hggg", key_omni_branchSearchType
// "accountType":"sAVING", key_omni_accountType
// "addharLinkDBT1":"N", key_omni_addharLinkDBT1
// "addharLinkDBT2":"N", key_omni_addharLinkDBT2
// "AADHAARNUMBER":"8795465665" key_omni_AADHAARNUMBER

    }

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }



  getApplyCardAccOpenParam(){
    var acctype = 10; // for saving account by defalut 10
    var date = new Date();

    // var dateOfBirth = this.dataService.profileDetails[0].custBirthDate;
    // dateOfBirth = dateOfBirth.split("-").join('/')

    // this.dataService.isCardUpgrade ? 'U' : 'P'
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_BinPrefix]: "508552", //RUPDO bin
      //[this.constant.key_CifId]:"008168899",
       //[this.constant.key_CifId]: "PSBI"+this.commonMethod.genRandomDigit(10),
      [this.constant.key_CardProgram]: "RuPay Domestic" , //RUPDO cardType
      [this.constant.key_PinMailer]: "V",//P or V
      [this.constant.key_CardType]: "P",//P or A//formData.ecom ? "P" : "A"
      [this.constant.key_CustomerName]: this.dataService.accountOpenFldData.FirstName.toUpperCase() + " " + this.dataService.accountOpenFldData.LastName.toUpperCase(), //
      [this.constant.key_NameOnCard]: this.dataService.accountOpenFldData.FirstName.toUpperCase() + " " + this.dataService.accountOpenFldData.LastName.toUpperCase(),
      [this.constant.key_CifCreationDate]:"",
      [this.constant.key_AccountType]:acctype,
      [this.constant.key_AccountNo]: this.dataService.accountDtls.accountNo,
      [this.constant.key_accountOpeningDate]: this.datePipe.transform(date,"dd/MM/yyyy"),
      [this.constant.key_Address1]: this.dataService.accountOpenFldData.permanentAddrL1,
      [this.constant.key_Address2]: this.dataService.accountOpenFldData.permanentAddrL2,
      [this.constant.key_City]: this.dataService.accountOpenFldData.permanentAddrCity != null ? this.dataService.accountOpenFldData.permanentAddrCity.substring(0, 5) : "     ",
      [this.constant.key_City1]: this.dataService.accountOpenFldData.permanentAddrCity != null ? this.dataService.accountOpenFldData.permanentAddrCity.substring(0, 5) : "     ",
      [this.constant.key_State]: this.dataService.accountOpenFldData.permanentAddrState,
      [this.constant.key_Pincode]: this.dataService.accountOpenFldData.permanentAddrPin,
      [this.constant.key_Country]:this.constant.val_Country,
      [this.constant.key_MothersMaidenName]:"-", //
      [this.constant.key_DateOfBirth]: this.dataService.accountOpenFldData.dob,
      [this.constant.key_CountryCode1]:"91",
      [this.constant.key_MobileNo]:this.dataService.accountOpenFldData.MobileNoOrg,
      [this.constant.key_EmailID]: this.dataService.accountOpenFldData.emailId, //
      [this.constant.key_BranchCode]: this.dataService.accountDtls.branch_name,
      [this.constant.key_PanNumber]: this.dataService.accountOpenFldData.panNumber ,
      [this.constant.key_aadharNumber]: this.dataService.accountOpenFldData.aadharNumber

  }

   console.log(inputData);
  //this.dataService.setOmniChannelReqParam(this.constant.key_omni_ownTransfer,JSON.stringify(inputData));//set omni channel req
  let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
  return encryptData;
  }


  getApplyCardAccOpenCbsParam(_debitCardIssuedData){
    var debitCardIssuedData = "Account number|card type|EcommFlag|DisplayName|CardNum|Personilzedcard(P/V)|"
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MobileNo_Org]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_debitCardIssuedData]: _debitCardIssuedData,//// Account number|card type|EcommFlag|DisplayName|CardNum|Personilzedcard(VP/V)|
    }
    console.log("aadhar request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }


  getDropDownMasterParam(resType) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_omni_refRecType]: resType
    }
    console.log("request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData
  }

  getSchemeDetails(type ){

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      ['productFetchDetailsData']:  type + "|"  + this.dataService.userDetails.cifNumber + "|"
    }
    console.log("request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData


  }


  getKycDropDownMasterParam(resType){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_omni_refCode]: resType
    }
    console.log("request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData
  }


  getPanValidationParam(mobileNo, panNo) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.constant.val_DeviceID, //need to ask
      [this.constant.key_MobileNo_Org]: mobileNo,
      [this.constant.key_RRN]: this.dataService.accountOpenRRN,
      [this.constant.key_panNumber]: panNo,
      [this.constant.key_referenceNumber]: this.dataService.accountOpenRRN
    }
    console.log("pan request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }

  getAadharOtpValidation(aadharNo, transactionId ?:any) {
    ///////////////////// Aadhar validation /////////////////////////////
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_aadharNumber]: aadharNo,
      [this.constant.key_npci_txnId] : transactionId,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9)
    }
    console.log("aadhar request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }


  getAadharValidationFromCbs(mobileNo, aadharNo) {

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.constant.val_DeviceID, //need to ask
      [this.constant.key_MobileNo_Org]: mobileNo,
      [this.constant.key_RRN]: this.dataService.accountOpenRRN,
      [this.constant.key_aadharNumber]: aadharNo,
      [this.constant.key_referenceNumber]: this.dataService.accountOpenRRN
    }
    console.log("aadhar request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }


  getAadhaarValOtp(aadharNo,otp, transactionId){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_aadharNumber]: aadharNo,
      [this.constant.val_npci_credTypeOnlyOtp] :otp,
      [this.constant.key_npci_txnId] : transactionId,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9)
    }
    console.log("aadhar request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }


  getBankDetailsFromPincode(pincode){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.constant.deviceID,
      [this.constant.key_upi_pincode]: pincode,
      [this.constant.key_prefered_Language]:this.storage.hasKeyLocalStorage(this.constant.storage_language) ? this.storage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
    }
    console.log("request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }

  getValidateLeadOtpParam(mobileOtp,emailOtp,refNo){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.dataService.accountOpenFldData.MobileNoOrg,
      [this.constant.key_emailOtp] : emailOtp,
      [this.constant.key_mobileOtp] : mobileOtp,
      [this.constant.key_referenceNumber] : refNo,
      [this.constant.key_service_Type]: this.constant.val_ACCOUNTOPENING

    }
    console.log("getValidateLeadOtpParam", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }


  getResendLeadOtpParam(refNo){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.dataService.accountOpenFldData.MobileNoOrg,
      [this.constant.key_omni_emailId] : this.dataService.accountOpenFldData.emailId,
      [this.constant.key_referenceNumber] : refNo,
      [this.constant.key_service_Type]: this.constant.val_ACCOUNTOPENING
    }
    console.log("getValidateLeadOtpParam", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }

  getUserAccLeadDtlParam(){

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.dataService.accountOpenFldData.MobileNoOrg,
      [this.constant.key_omni_FirstName]: this.dataService.accountOpenFldData.FirstName,
      [this.constant.key_omni_LastName]: this.dataService.accountOpenFldData.LastName,
      [this.constant.key_omni_MiddleName]: this.dataService.accountOpenFldData.middlename,
      [this.constant.key_omni_emailId]: this.dataService.accountOpenFldData.emailId,
      [this.constant.key_omni_fatherName]: "0",
      [this.constant.key_omni_adharAddress]: "0",
      [this.constant.key_omni_occupation]: "0",
      [this.constant.key_gender]: "0",
      [this.constant.key_omni_maritialStatus]: "0",
      [this.constant.key_omni_defaultVpayn]: "0",
      [this.constant.key_omni_grossIncome]: "0",
      [this.constant.key_omni_cbsResonseStatus]: "0",
      [this.constant.key_omni_relationshipName]: "0",
      [this.constant.key_omni_confirmationAddharAccountyn]: "0",
      [this.constant.key_omni_termsCondition]: "0",
      [this.constant.key_omni_paymentOn]: "0",
      [this.constant.key_omni_amountPaid]: "0",
      [this.constant.key_omni_aadhaarcard]: "0",
      [this.constant.key_omni_panStatusId]: "0",
      [this.constant.key_branch_name]: "0",
      [this.constant.key_omni_nomineeUpdated]: "0",
      [this.constant.key_omni_state]: "0",
      [this.constant.key_omni_fatcaCompliance]: "0",
      [this.constant.key_omni_paymentStatus]: "0",
      [this.constant.key_omni_aadharStatusId]: "0",
      [this.constant.key_omni_vpaAddress]: "0",
      [this.constant.key_customerAddress]: "0",
      [this.constant.key_omni_motherName]: "0",
      [this.constant.key_dateOfBirth]: "0",
      [this.constant.key_omni_nomineeName]: "0",
      [this.constant.key_omni_primaryAccount]: "0",
      [this.constant.key_omni_communicationAddress]: "0",
      [this.constant.key_accountno]: "0",
      [this.constant.key_omni_district]: "0",
      [this.constant.key_omni_cbsPanAadharStatus]: "0",
      [this.constant.key_omni_PAN]: "0",
      [this.constant.key_category]: "0",
      [this.constant.key_upi_accountType]:"0",
      [this.constant.key_omni_cbsRefNumAccope]:"0",
      [this.constant.key_statusID]:"0"
    }
    console.log("getValidateLeadOtpParam", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
    //TODO: remove once encryption works
  }

  /**
   * Get statelist request
   */
   getStateListParams() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_CountryCode]: "1", //Country code 1 is for india
      [this.constant.Key_type]: 'ACCOPEN'
    }
    console.log("getStateListParams ",JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;

  }

  /**
   * Get CityList by stateId
   * @param stateId
   */
   getCityListParams(stateId) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_StateId]: stateId,
      [this.constant.key_type]: 'ACCOPEN'
    }

    console.log('city Params ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    ///return inputData;
    return encryptData;
  }

  getBranchListParams(cityId,stateId) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: '0.0',
      [this.constant.key_longitude]: '0.0',
      [this.constant.key_deviceId]: this.constant.val_DeviceID,
      [this.constant.key_CityId]: cityId,
      [this.constant.key_stateId]: stateId,

    }

    console.log('branch Params ', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }


  checkUpiAddress(inputUpiId){
    let upiReqObj = {
      [this.constant.key_upi_paymentAddress]: inputUpiId+"@psb",
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.localStorage.hasKeyLocalStorage(this.constant.storage_language) ? this.localStorage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.dataService.accountOpenFldData.MobileNoOrg)
    };

    let inputData = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.key_deviceId),
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.dataService.accountOpenFldData.MobileNoOrg),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VERIFYPAYMENTADDRESS,
      [this.constant.key_upi_inputParam]: JSON.stringify(upiReqObj)
    };

    console.log("checkUpiAddress ======>"+JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }

  getmobileNoCheckParam(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: formdata.mobile,
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_deviceModel]: this.dataService.devicemodel,
      [this.constant.key_isBiometric]: this.dataService.isBiometric,
      [this.constant.key_imei]: this.dataService.uuid,
      [this.constant.key_imsi]: "",
      ['requestType']:'verify',
      [this.constant.key_OSVERSION]: this.dataService.osversion,
      [this.constant.key_OS]: this.dataService.platform,
      [this.constant.key_MACADDRESS]: this.dataService.macAddress,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9)

    }

    if(this.constant.getPlatform() != "web"){
      inputData[this.constant.key_pushNotificationToken]= this.dataService.fcmToken
    }



    console.log("check sim binding",JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }



}
