import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class AddPayeeService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private CommonMethod: CommonMethods,
  ) { }

  /**
   * Creating request for search ifsc code
   */
  getIFSCCodeParams(formData) {
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
      [this.constant.key_bankName]: formData.enterBank,
      [this.constant.key_branch_name]: formData.enterBranch

    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getBranchFromIFSC(value){
        var inputData = {};
        inputData = {
          [this.constant.key_entityId]: this.constant.getEntityId(),
          [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
          [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
          [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
          [this.constant.key_latitude]: this.dataService.latitude,
          [this.constant.key_longitude]: this.dataService.longitude,
          [this.constant.key_ifsc_code]: value
        }

        let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
        return encryptData;
  }


  /**
   * Creating request for search ifsc code
   */
  getInfoByIfscParams(formData) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]:'9',
      [this.constant.key_ifsc_code]: formData.ifscCode
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }




  /**
   * Creating request for search swift code
   */
  getInfoBySwiftParams(formData) {
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
      [this.constant.key_swiftCode]: formData.swiftCode
    }

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
      [this.constant.key_RRN]: this.CommonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.CommonMethod.genRandomDigit(9),
      [this.constant.key_accountNo] : formDtl.confirmaccountNumber
    }

    console.log("validatepayee", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  /**
  * Creating request for add benificiary
  */
  getAddBenficiaryParams(formData, benificiaryType, amountLimit) {
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
      [this.constant.key_benificiaryType]: benificiaryType,
      [this.constant.key_benficiaryBankName]: benificiaryType == '1' ? 'PSB' : formData.bankName,
      [this.constant.key_benefName]: formData.accName,
      [this.constant.key_beneficiary_account_no]: formData.ConfAccNumber,
      [this.constant.key_benificiaryNickName]: formData.nickName,
      [this.constant.key_coolingPeriodCheck]: this.constant.val_coolingPeriodCheckN,
      [this.constant.key_branch_name]: benificiaryType == '1' ? '' : formData.branchName,
      [this.constant.key_city]: benificiaryType == '1' ? '' : formData.city,
      [this.constant.key_amount]: amountLimit,
    }
    /**code 1 is for own bank, code 2 is for donation ,code 3 is for other bank,code 4 is for internal bank, */
    if (benificiaryType == '1') {
      inputData[this.constant.key_ifsc_code] = '';
    }
    else if (benificiaryType == '3') {
      inputData[this.constant.key_ifsc_code] = formData.ifscCode;
    } else if (benificiaryType == '4') {
      inputData[this.constant.key_swiftCode] = formData.swiftCode;
    }

    console.log('add benf ', JSON.stringify(inputData));

    this.dataService.setOmniChannelReqParam(this.constant.key_omni_addPayee, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  //new
  _getAddBenficiaryParams(formData, benificiaryType){

    var inputData = {};
    /**code 1 is for own bank, code 2 is for donation ,code 3 is for other bank,code 4 is for internal bank, */
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_benificiaryType]: benificiaryType,
      [this.constant.key_benficiaryBankName]: benificiaryType == '1' ? 'PNS Bank' : formData.bankName, //TODO: need to discuss
      [this.constant.key_bankCode]:'PNS', //TODO: need to discuss
      [this.constant.key_benefName]: formData.payeeName,
      [this.constant.key_beneficiary_account_no]: formData.payeeAccNo,
      [this.constant.key_benificiaryNickName]: formData.payeeNickName,
      [this.constant.key_beneficiaryMobileNo ] : "", //TODO: Need to discuss
      [this.constant.key_currency] : "INR", //TODO: Need to discuss
      [this.constant.key_branch_name]: benificiaryType == '1' ? '' : formData.branchName, //TODO: Need to discuss
      [this.constant.key_city]: benificiaryType == '1' ? '' : formData.city, //TODO: Need to discuss
      [this.constant.key_amount] : "", //TODO: Need to discuss
      [this.constant.key_MMID] : "", //TODO: Is it optional
      [this.constant.key_maxAmount] : "", //TODO: Need to discuss
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }
    //set ifsc code
    if (benificiaryType == '1') {
      inputData[this.constant.key_ifsc_code] = '';
    }
    else{
      inputData[this.constant.key_ifsc_code] = formData.ifscCode;
    }


    console.log('add benf ', JSON.stringify(inputData));
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_addPayee, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  // getVpa() {
  //   var inputData = {};
  //   inputData = {
  //     [this.constant.key_entityId]: this.constant.getEntityId(),
  //     [this.constant.key_cbsType]: this.constant.val_cbsType,
  //     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
  //     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
  //     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
  //     [this.constant.key_latitude]: this.dataService.latitude,
  //     [this.constant.key_longitude]: this.dataService.longitude,
  //     [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
  //     [this.constant.key_inputParam]:  this.constant.val_inputParam,


  //   }

  //   let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  //   return encryptData;
  // }


  _getAddBenficiaryParamss(formData, benificiaryType, bankDtl){
    console.log(benificiaryType);
    var inputData = {};
    /**code 1 is for own bank, code 2 is for donation ,code 3 is for other bank,code 4 is for internal bank, */
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_benificiaryType]: benificiaryType,
      [this.constant.key_benficiaryBankName]: benificiaryType == '1' ? 'PSB' : bankDtl?.bank , //TODO: need to discuss
      [this.constant.key_bankCode]:'', //TODO: need to discuss
      [this.constant.key_benefName]: benificiaryType == '4' ? formData.payeenickName : formData.payeeName,
      [this.constant.key_beneficiary_account_no]: formData.confirmaccountNumber,
      [this.constant.key_benificiaryNickName]: formData.payeenickName,
      [this.constant.key_beneficiaryMobileNo ] : formData.mobileNumber, //TODO: Need to discuss
      [this.constant.key_currency] : "INR", //TODO: Need to discuss
      [this.constant.key_branch_name]: bankDtl?.branch, //TODO: Need to discuss
      // [this.constant.key_city]: benificiaryType == '1' ? '' : formData.city, //TODO: Need to discuss
      [this.constant.key_MMID] : formData.mmid, //TODO: Is it optional
      // [this.constant.key_beneficiary_account_type] : formData.payeeaccountType,
      [this.constant.key_maxAmount] : formData.transactionLimit.trim().replace(/[^.0-9]+/g, ''), //TODO: Need to discuss
      [this.constant.key_ifsc_code]:  benificiaryType == '4' ? this.dataService.validateAddressResp.IFSC : formData.ifsc,
      [this.constant.key_VPA]:  benificiaryType == '4' ?  this.dataService.validateAddressResp.validatedVpa :formData.vpa,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,

    }
    //set ifsc code
    // if (benificiaryType == '1') {
    //   inputData[this.constant.key_ifsc_code] = '';
    // }
    // else{
    //   inputData[this.constant.key_ifsc_code] = formData.ifscCode;
    // }


    console.log('add benf ', JSON.stringify(inputData));
    // this.dataService.setOmniChannelReqParam(this.constant.key_omni_addPayee, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  // checkUpiAddress(inputUpiId){
  //   let upiReqObj = {
  //     [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
  //     [this.constant.key_upi_mobileNo]: this.CommonMethod.processPhoneNo(this.dataService.accountOpenFldData.MobileNoOrg),
  //     [this.constant.key_upi_subAction]: this.constant.upiserviceName_VERIFYPAYMENTADDRESS,
  //     [this.constant.key_upi_inputParam]: {
  //       [this.constant.key_upi_paymentAddress]: inputUpiId,
  //       [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
  //       [this.constant.key_upi_language]: this.storage.hasKeyLocalStorage(this.constant.storage_language) ? this.storage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
  //       [this.constant.key_upi_mobileNo]: this.CommonMethod.processPhoneNo(this.dataService.accountOpenFldData.MobileNoOrg)
  //     }
  //   };

  //   let inputData = {
  //     [this.constant.key_entityId]: this.constant.val_upi_psb,
  //     [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
  //     [this.constant.key_mobPlatform]: "",
  //     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
  //     [this.constant.key_deviceId]: this.constant.deviceID,
  //     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
  //     [this.constant.key_upiRequest]: JSON.stringify(upiReqObj)
  //   };

  //   let encryptData = this.encryptDecryptService.encryptText(this.dataService.accountOpenFldData.MobileNoOrg + this.constant.mapEncryptKey, JSON.stringify(inputData));
  //   //return inputData;
  //   return inputData;
  // }

  checkUpiAddress(inputUpiId){
    let upiReqObj = {
      [this.constant.key_upi_paymentAddress]: inputUpiId+"@psb",
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.storage.hasKeyLocalStorage(this.constant.storage_language) ? this.storage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
        [this.constant.key_upi_mobileNo]: this.CommonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
    };

    let inputData = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
      [this.constant.key_upi_mobileNo]: this.CommonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VERIFYPAYMENTADDRESS,
      [this.constant.key_upi_inputParam]: JSON.stringify(upiReqObj)
    };

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  fetchAccountListParam(){
    let upiReqObj = {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.storage.hasKeyLocalStorage(this.constant.storage_language) ? this.storage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
        [this.constant.key_upi_mobileNo]: this.CommonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
    };

    let inputData = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.key_deviceId),
      [this.constant.key_upi_mobileNo]: this.CommonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FETCHDISTINCTACCOUNTLIST,
      [this.constant.key_upi_inputParam]: JSON.stringify(upiReqObj)
    };

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }


  updateBenificairy(id){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.Key_ID]: id,
    }
    
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  editPayeeParam(id,transactionLimit){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.Key_ID]: id,
      [this.constant.key_transactionLimit]:transactionLimit.trim().replace(/[^.0-9]+/g, '')
      
    }
    
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getOutsidePayeeSIParam(payeeDtl){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_toAccountNo]: payeeDtl.beneficiary_account_no,
      [this.constant.Key_customerId]: payeeDtl.ID,
      
    }
    
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }




}
