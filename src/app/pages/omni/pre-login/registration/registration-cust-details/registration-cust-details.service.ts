import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

declare var device: any;

@Injectable({
  providedIn: 'root'
})
export class RegistrationCustDetailsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods
  ) { }


  /**
   * request parameter validate mobile number
   */
  getUpdateCustDtlParam(custId,accNo) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.Key_customerName]: "",
      [this.constant.key_omni_accountNo]: accNo,
      [this.constant.Key_customerId]: custId,
      [this.constant.key_channelType]: this.dataService.getChannelType()
    }

    console.log(inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  getValidateCustDtlParam(custId,accNo,emailId,deviceID){
    let custAccData =  this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + "|" + custId + "|" + accNo;
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType] : this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: deviceID,
      [this.constant.key_MobileNo_Org]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_MobileNo]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_omni_customerID] : custId,
      [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_omni_accountNo]: accNo,
      [this.constant.key_omni_custAccountData]: custAccData,
      [this.constant.key_omni_emailId] : emailId.toLowerCase()
    }
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }


  getValidateCustDtlMobParam(custId,accNo,emailId,deviceID){
    let custAccData =  this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + "|" + custId + "|" + accNo;
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType] : this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: deviceID,
      [this.constant.key_MobileNo_Org]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_MobileNo]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_omni_customerID] : custId,
      [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_omni_accountNo]: accNo,
      [this.constant.key_omni_custAccountData]: custAccData,
      [this.constant.key_omni_emailId] : emailId.toLowerCase()
    }
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }


  checkUpiAddress(inputUpiId){
    let upiReqObj = {
      [this.constant.key_upi_paymentAddress]: inputUpiId+"@psb",
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.localStorage.hasKeyLocalStorage(this.constant.storage_language) ? this.localStorage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo))
    };

    let inputData = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.key_deviceId),
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VERIFYPAYMENTADDRESS,
      [this.constant.key_upi_inputParam]: JSON.stringify(upiReqObj)
    };

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  fetchAccountListParam(){
    let upiReqObj = {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.localStorage.hasKeyLocalStorage(this.constant.storage_language) ? this.localStorage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo))
    };

    let inputData = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.key_deviceId),
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FETCHDISTINCTACCOUNTLIST,
      [this.constant.key_upi_inputParam]: JSON.stringify(upiReqObj)
    };

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  getAccountListParam(payeeAddress){

    var txnId = this.commonMethod.randomString(32,'PSB');
    let platform = this.dataService.platform ? this.dataService.platform : "";
    let upiReqObj = {
        [this.constant.key_upi_language]:this.localStorage.hasKeyLocalStorage(this.constant.storage_language) ? this.localStorage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
        [this.constant.key_upi_addressType]: 'ACCOUNT',
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_linkValue]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_payerAddr]: payeeAddress,
        [this.constant.key_upi_txnNote] : "Custom",
        [this.constant.key_upi_linkType]: "MOBILE",
        [this.constant.key_upi_payerName]: "",
        [this.constant.key_upi_refID]: txnId, //need to ask
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_ifsc]: "Punjab & Sind Bank",
        [this.constant.key_upi_device]: {
          [this.constant.key_upi_app]: "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability]: "5200000200010004000639292929292",
          [this.constant.key_upi_lat]: this.dataService.latitude,
          [this.constant.key_upi_lng]: this.dataService.longitude,
          [this.constant.key_upi_os]: platform,
          [this.constant.key_upi_ip]: this.dataService.ipAddress,
          [this.constant.key_upi_location]: this.localStorage.getLocalStorage(this.constant.key_deviceId),
          [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_deviceID]: this.dataService.uuid != undefined ? this.dataService.uuid : "",
        },
        [this.constant.key_upi_txnID]: txnId, //need to ask
    };
    // var deviceInput = {
    //   [this.constant.key_upi_app]:,
    //   [this.constant.key_upi_capability]:,
    //   [this.constant.key_upi_lat]:,
    //   [this.constant.key_upi_os]:,
    //   [this.constant.key_upi_ip]:,
    //   [this.constant.key_upi_location]:,
    //   [this.constant.key_upi_mobileNo]:,
    //   [this.constant.key_upi_deviceID]:,
    //   [this.constant.key_upi_lng]:,
    //   [this.constant.key_upi_txnID]:,

    // }

    let inputData = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETACCOUNTLIST,
      [this.constant.key_upi_inputParam]: JSON.stringify(upiReqObj)
    };

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  addPaymentAddressParam(apiDtl,inputUpiId){

    let upiReqObj = {
      [this.constant.key_upi_atmDLength]: apiDtl?.accounts[0].atmDLength,
      [this.constant.key_upi_accNum]: apiDtl?.accounts[0].accNum,
      [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
      [this.constant.key_upi_atmCredType]: apiDtl?.accounts[0].atmCredType,
      [this.constant.key_upi_credDLength]:apiDtl?.accounts[0].credDLength,
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_credDType]: apiDtl?.accounts[0].credDType,
      [this.constant.key_upi_atmDType]: apiDtl?.accounts[0].atmDType,
      [this.constant.key_npci_payerAddr]: inputUpiId+"@psb",
      [this.constant.key_upi_credType] : apiDtl?.accounts[0].credType,
      [this.constant.key_upi_credSubType]:apiDtl?.accounts[0].credSubType,
      [this.constant.key_npci_payerName] : "",
      [this.constant.key_upi_defaultVpaFlag] : "Y",
      [this.constant.key_upi_atmCredSubType] : "",
      [this.constant.key_upi_ifsc] : apiDtl?.accounts[0].ifsc,
      [this.constant.key_upi_isValid] : "Y",
      [this.constant.key_upi_isOneTime] : "N",
      [this.constant.key_upi_mmid]:"",
      [this.constant.key_upi_accType]: apiDtl?.accounts[0].accType ,
      [this.constant.key_upi_language]: this.localStorage.hasKeyLocalStorage(this.constant.storage_language) ? this.localStorage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
      [this.constant.key_upi_frequency]:"10",
      [this.constant.key_upi_isWithFrequency]:"Y",
      [this.constant.key_upi_amountLimit]:"1000000",


      // {\"atmDLength\": \"\",\"accNum\": \"857679479890335\",\"addressType\": \"ACCOUNT\",\"atmCredType\": \"\",
      // \"credDLength\": \"6\",\"entityID\": \"psb\",\"mobileNo\": \"917977361002\",
      // \"credDType\": \"NUM\",\"atmDType\": \"\",\"payerAddr\": \"appTest123@psb\",
      // \"credType\"\"OTP\",\"credSubType\": \"SMS\",\"payerName\": \"ABC\",\"defaultVpaFlag\": \"Y\",
      // \"atmCredSubType\": \"\",\"ifsc\": \"AABF0009009\",\"isValid\": \"Y\",\"isOneTime\": \"N\",
      // \"mmid\": \"\",\"accType\": \"SAVINGS\",\"language\": \"en_US\",\"frequency\": \"10\",
      // \"isWithFrequency\": \"Y\",\"amountLimit\": \"1000000 \"}
  };


  console.log("upiReqObj addPaymentAddressParam ====>",upiReqObj);


  let inputData = {
    [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
    [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
    [this.constant.key_upi_subAction]: this.constant.upiserviceName_ADDPAYMENTADDRESS,
    [this.constant.key_upi_inputParam]: JSON.stringify(upiReqObj)
  };

  let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
  return encryptData;

    // {
    //   "entityID": "psb",
    //   "mobileNo": "918651125953",
    //   "subAction": "AddPaymentAddress",

    //   inputParam:"{
    //     \"atmDLength\": \"\",
    //     \"accNum\": \"857679479890335\",
    //     \"addressType\": \"ACCOUNT\",
    //     \"atmCredType\": \"\",
    //     \"credDLength\": \"6\",
    //     \"entityID\": \"psb\",
    //     \"mobileNo\": \"918651125953\",
    //     \"credDType\": \"NUM\",
    //     \"atmDType\": \"\",
    //     \"payerAddr\": \"appTest123@psb\",
    //     \"credType\": \"OTP\",
    //     \"credSubType\": \"SMS\",
    //     \"payerName\": \"ABC\",
    //     \"defaultVpaFlag\": \"Y\",
    //     \"atmCredSubType\": \"\",
    //     \"ifsc\": \"AABF0009009\",
    //     \"isValid\": \"Y\",
    //     \"isOneTime\": \"N\",
    //     \"mmid\": \"\",
    //     \"accType\": \"SAVINGS\",
    //     \"language\": \"en_US\",
    //     \"frequency\": \"10\",
    //     \"isWithFrequency\": \"Y\",
    //     \"amountLimit \": \"1000000 \"
    //   }"
    // }
  }


  _addPaymentAddressParam(apiDtl,inputUpiId){

    let upiReqObj = {
      [this.constant.key_upi_atmDLength]: " ",
      [this.constant.key_upi_accNum]: apiDtl[0].ACCNUMBER,
      [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
      [this.constant.key_upi_atmCredType]: " ",
      [this.constant.key_upi_credDLength]:apiDtl[0].CRED_DLENGTH,
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_credDType]: apiDtl[0].CRED_DTYPE,
      [this.constant.key_upi_atmDType]: " ",
      [this.constant.key_npci_payerAddr]: inputUpiId+"@psb",
      [this.constant.key_upi_credType] : apiDtl[0].CRED_DTYPE,
      [this.constant.key_upi_credSubType]:apiDtl[0].CRED_SUB_TYPE,
      [this.constant.key_npci_payerName] : apiDtl[0]?.NAME ? apiDtl[0].NAME: '',
      [this.constant.key_upi_defaultVpaFlag] : "Y",
      [this.constant.key_upi_atmCredSubType] : " ",
      [this.constant.key_upi_ifsc] : apiDtl[0].ifsc,
      [this.constant.key_upi_isValid] : "Y",
      [this.constant.key_upi_isOneTime] : "N",
      [this.constant.key_upi_mmid]:" ",
      [this.constant.key_upi_accType]: apiDtl[0].accType ,
      [this.constant.key_upi_language]: this.localStorage.hasKeyLocalStorage(this.constant.storage_language) ? this.localStorage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
      [this.constant.key_upi_frequency]:"10",
      [this.constant.key_upi_isWithFrequency]:"Y",
      [this.constant.key_upi_amountLimit]:"1000000",


      // {\"atmDLength\": \"\",\"accNum\": \"857679479890335\",\"addressType\": \"ACCOUNT\",\"atmCredType\": \"\",
      // \"credDLength\": \"6\",\"entityID\": \"psb\",\"mobileNo\": \"917977361002\",
      // \"credDType\": \"NUM\",\"atmDType\": \"\",\"payerAddr\": \"appTest123@psb\",
      // \"credType\"\"OTP\",\"credSubType\": \"SMS\",\"payerName\": \"ABC\",\"defaultVpaFlag\": \"Y\",
      // \"atmCredSubType\": \"\",\"ifsc\": \"AABF0009009\",\"isValid\": \"Y\",\"isOneTime\": \"N\",
      // \"mmid\": \"\",\"accType\": \"SAVINGS\",\"language\": \"en_US\",\"frequency\": \"10\",
      // \"isWithFrequency\": \"Y\",\"amountLimit\": \"1000000 \"}
  };


  console.log("upiReqObj====>",upiReqObj);


  let inputData = {
    [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
    [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
    [this.constant.key_upi_subAction]: this.constant.upiserviceName_ADDPAYMENTADDRESS,
    [this.constant.key_upi_inputParam]: JSON.stringify(upiReqObj)
  };

  let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
  return encryptData;

    // {
    //   "entityID": "psb",
    //   "mobileNo": "918651125953",
    //   "subAction": "AddPaymentAddress",

    //   inputParam:"{
    //     \"atmDLength\": \"\",
    //     \"accNum\": \"857679479890335\",
    //     \"addressType\": \"ACCOUNT\",
    //     \"atmCredType\": \"\",
    //     \"credDLength\": \"6\",
    //     \"entityID\": \"psb\",
    //     \"mobileNo\": \"918651125953\",
    //     \"credDType\": \"NUM\",
    //     \"atmDType\": \"\",
    //     \"payerAddr\": \"appTest123@psb\",
    //     \"credType\": \"OTP\",
    //     \"credSubType\": \"SMS\",
    //     \"payerName\": \"ABC\",
    //     \"defaultVpaFlag\": \"Y\",
    //     \"atmCredSubType\": \"\",
    //     \"ifsc\": \"AABF0009009\",
    //     \"isValid\": \"Y\",
    //     \"isOneTime\": \"N\",
    //     \"mmid\": \"\",
    //     \"accType\": \"SAVINGS\",
    //     \"language\": \"en_US\",
    //     \"frequency\": \"10\",
    //     \"isWithFrequency\": \"Y\",
    //     \"amountLimit \": \"1000000 \"
    //   }"
    // }
  }


  getVPAListRequestObject() {​​​​​​
    let inputParam = {
      [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
      [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
      [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_device]: this.getDeviceObjectForUpi()
    }

    let upiRequestObj = {
      [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS,
      [this.constant.key_upi_inputParam]: JSON.stringify(inputParam)
    }
    console.log('getVPAListRequestObject 1 => ',JSON.stringify(upiRequestObj));

    // let inputData = {​​​​​​
    //   [this.constant.key_entityId]:this.constant.getEntityId(),
    //   [this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,
    //   [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
    //   [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
    //   [this.constant.key_deviceId]:this.localStorage.getLocalStorage(this.constant.storage_deviceId),
    //   [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
    //   [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
    //   }​​​​​​;

      console.log('getVPAListRequestObject 2 => ', JSON.stringify(upiRequestObj));

      let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(upiRequestObj));

      console.log('encryptData getOmniRequestObject => ', JSON.stringify(encryptData));
      return encryptData;
    }

    getDeviceObjectForUpi() {
      let deviceDetails = {
        [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
        [this.constant.key_upi_capability]: this.constant.val_upi_capability,
        [this.constant.key_upi_os]: this.dataService.platform,
        [this.constant.key_upi_lat]: this.dataService.latitude,
        [this.constant.key_upi_lng]: this.dataService.longitude,
        [this.constant.key_upi_ip]: this.dataService.ipAddress,
        [this.constant.key_upi_location]: this.dataService.userLocationName,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_deviceID]: this.dataService.isCordovaAvailable ? device.uuid : this.localStorage.getLocalStorage(this.constant.storage_deviceId) // condition added just for testing this will not impact any issue for android/ios build
      };
      return deviceDetails;
    }


    addAccountAddress(paymentAddress,accountDetails){
      var dtl = {
        [this.constant.key_upi_accNum] : accountDetails.ACCNUMBER,
        [this.constant.key_upi_accType] : accountDetails.ACCTYPE,
        [this.constant.key_upi_accountCurrentLimit] : "50000",
        [this.constant.key_upi_addressType] : this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_appVersion] : this.constant.val_upi_app_version,
        [this.constant.key_upi_atmCredSubType] : "",
        [this.constant.key_upi_atmCredType] : "",
        [this.constant.key_upi_atmDType] : "",
        [this.constant.key_upi_atmDLength] : "",
        [this.constant.key_upi_credDLength] : accountDetails.CRED_DLENGTH,
        [this.constant.key_upi_credDType] : this.constant.val_upi_NUM,
        [this.constant.key_upi_credSubType] : accountDetails.CRED_SUB_TYPE,
        [this.constant.key_upi_credType] : accountDetails.CRED_TYPE,
        [this.constant.key_upi_defaultAccFlag] : "Y",
        [this.constant.key_upi_device] : this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_ifsc] : accountDetails.ifsc,
        [this.constant.key_upi_language] : this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_otpCredDLength] : accountDetails.OTP_CRED_DLENGTH,
        [this.constant.key_upi_otpCredDType] : "",
        [this.constant.key_upi_otpCredSubType] : "",
        [this.constant.key_upi_otpCredType] : "",
        [this.constant.key_upi_payerAddr] : paymentAddress+"@psb",
        [this.constant.key_upi_payerName] : accountDetails.custName,
        [this.constant.key_upi_mbeba]: "Y"
      }
      let upiReqObject = {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.localStorage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_subAction] : this.constant.upiserviceName_ADDACCOUNTTOVPA,
        [this.constant.key_upi_inputParam] : JSON.stringify(dtl)
      };


      // accNum: "15091000001302"
      // accType: "CURRENT"
      // accountCurrentLimit: "50000"
      // addressType: "ACCOUNT"
      // appVersion: "2.0.42"
      // atmCredSubType: ""
      // atmCredType: ""
      // atmDLength: ""
      // atmDType: ""
      // credDLength: "6"
      // credDType: ""
      // credSubType: "MPIN"
      // credType: "PIN"
      // defaultAccFlag: "Y"
      // device: {app: 'com.infra.psbupiuat', capability: '10000000001', os: 'iOS', lng: '19.14', ip: '', …}
      // entityID: "psb"
      // ifsc: "PSB00876543"
      // language: "en_US"
      // mobileNo: "919988600012"
      // otpCredDLength: "6"
      // otpCredDType: ""
      // otpCredSubType: ""
      // otpCredType: ""
      // payerAddr: "psp12@psb"
      // payerName: "Neha Divekar"


      let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(upiReqObject));

      console.log('encryptData getOmniRequestObject => ', JSON.stringify(encryptData));
      return encryptData;
    }


    getMobileList(){

      let inputParam = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
        [this.constant.key_RRN] : this.commonMethod.genRandomDigit(9),
        [this.constant.key_MobileNo_Org] : this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_MobileNo] : this.localStorage.getLocalStorage(this.constant.storage_mobileNo)
      }

      let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputParam));
      console.log('getMobileList ======> ', JSON.stringify(encryptData));
      return encryptData;
    }

}
