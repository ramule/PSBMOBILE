import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private common : CommonMethods,
    private datepipe: DatePipe
  ) { }


  /**
   * request parameter for transaction
   */
  getTransactionParam(accountNumber?: any) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
       [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_accountno]: "",
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId)
    }
    console.log("getTransactionParam", JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  /**
   * request parameter for side menu
   */
  getCustomizeMenuParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId)
    }

    console.log('getCustomizeMenuParam ',JSON.stringify(inputData));

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


  /**
   * request parameter for accountLists
   */
  // getAccountListParam() {
  //   var inputData = {
  //     [this.constant.key_entityId]: this.constant.getEntityId(),
  //     [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
  //     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
  //     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
  //     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
  //     [this.constant.key_latitude]: this.dataService.latitude,
  //     [this.constant.key_longitude]: this.dataService.longitude,
  //      [this.constant.key_loginType]: this.constant.val_loginType,
  //     [this.constant.key_loginip]: this.constant.val_loginip,
  //     [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
  //     [this.constant.key_isCorporate]: this.constant.val_isCorporate,
  //     [this.constant.key_mpin]: "1111"
  //   }

  //   //let encryptData = this.encryptDecryptService.encryptText("919987737714" + this.constant.mapEncryptKey, JSON.stringify(inputData));
  //   return inputData;
  // }


  /**
   * request parameter to get frequent transaction
   */
  getFrequentTransacParam(mpin?: any) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    if (mpin) {
      inputData[this.constant.key_loginType] = this.constant.val_loginTypeMPIN;
      inputData[this.constant.key_MobileNo] = this.storage.getLocalStorage(this.constant.storage_mobileNo);
      inputData[this.constant.key_MPIN] = this.encryptDecryptService.createMD5Value(this.dataService.mpin);
    } else {
      inputData[this.constant.key_loginType] = this.constant.val_loginType;
      inputData[this.constant.key_UserID] =  this.storage.getLocalStorage(this.constant.storage_username);
    }
    console.log("FREQUENTTRANS Paramas  ====== > " + JSON.stringify(inputData))
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage("sessionKey"), JSON.stringify(inputData));
    return encryptData;
  }


  /**
  * request parameter for getting card list
  */
  getRequestForCardList(mpin?: any,isBiometric?:any) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    if (mpin) {
      inputData[this.constant.key_loginType] = this.constant.val_loginTypeMPIN;
      inputData[this.constant.key_MobileNo] = this.storage.getLocalStorage(this.constant.storage_mobileNo);
      inputData[this.constant.key_MPIN] = this.encryptDecryptService.createMD5Value(this.dataService.mpin);;
    }else if (isBiometric) {
      inputData[this.constant.key_loginType] = this.constant.val_bioMetric;
      inputData[this.constant.key_MobileNo] = this.storage.getLocalStorage(this.constant.storage_mobileNo);
    } else {
      inputData[this.constant.key_loginType] = this.constant.val_loginType;
      inputData[this.constant.key_UserID] = this.storage.getLocalStorage(this.constant.storage_username);
    }
    console.log("getRequestForCardList", JSON.stringify(inputData));
    console.log('session key ',this.storage.getSessionStorage(this.constant.val_sessionKey));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  /**
  * request parameter for getting card list in mobile using mpin
  */
  // getRequestForCardListMobile(formData) {
  //   var inputData = {
  //     [this.constant.key_entityId]: this.constant.getEntityId(),
  //     [this.constant.key_cbsType]: this.constant.val_cbsType,
  //     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
  //     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
  //     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
  //     [this.constant.key_latitude]: this.dataService.latitude,
  //     [this.constant.key_longitude]: this.dataService.longitude,
  //     [this.constant.key_loginType]: this.constant.val_loginTypeMPIN,
  //     [this.constant.key_MobileNo]: formData.mobNumber,
  //     [this.constant.key_MPIN]: formData.mpin
  //   }

  //   let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  //   return encryptData;
  // }


  /**
  * request parameter for getting card list in desktop using credentials
  */
  getRequestForCardListDesktop(formData) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_loginType]: this.constant.val_loginType,
      [this.constant.key_UserID]: formData.username
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
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
      [this.constant.key_CountryCode]: "1" //Country code 1 is for india
    }
    console.log("getStateListParams ",JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }

  /**
   * Get logout request parameter
   */
  getLogoutParams(){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),  //getEntityId(this.constant.val_entityId_UMOB),  ---- Ideally it should be dynamic
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  /**
   * Get Extend Session Request
   */
  getExtendSessionReqParams(){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo)
    }

    console.log('getExtendSessionReqParams ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  /**
   * Get recommended card request Request
   */
  getRecommendedCard(){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo)
    }

    console.log('get recommended card ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

   /**
   * Get Invest with us Request
   */
  getInvestWithUsparam(){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude
    }

    console.log('get recommended card ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


   /**
   * Get Invest with us Request
   */
    getOfferCradsparam(type){
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_ServiceTypeOffer]:type
      }

      console.log('get offer card ', JSON.stringify(inputData));

      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

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
        [this.constant.key_ifsc_code]: formData.IFSCCode,
        [this.constant.key_accountNo] : accountNo,
        [this.constant.key_payerName] : "ABCD",
        [this.constant.key_payerMobile] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_payerAccount] : accountNo,
        [this.constant.key_payeeIfsc] : formData.IFSCCode,
        [this.constant.key_payeeAccount] : formData.accNumber
      }

      console.log('AccountIFSC', JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }


    getIFSCFundTransferParam(formData1, formData2, toUserAccount) {

      if(formData2.remark == null || formData2.remark == ''){
        formData2.remark = "-"
      }
      //TODO: need to discuss later about parameter repetaion and
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_ifsc_code]: formData1.IFSCCode,
        [this.constant.key_remarks]: formData2.remark,
        [this.constant.key_txnAmt]: formData2.amount.trim().replace(/[^.0-9]+/g, ''),
        [this.constant.key_payerName]: "A",
        [this.constant.key_payeeName]: "",
        [this.constant.key_payerMobile]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_payerAccount]: formData2.chooseAccount,
        [this.constant.key_payeeIfsc]: formData1.IFSCCode,
        [this.constant.key_accountNo]: formData2.chooseAccount,
        [this.constant.key_payeeAccount]: toUserAccount,
        [this.constant.key_amount]: formData2.amount.trim().replace(/[^0-9]+/g, ''), //need to ask
      }
      
      this.dataService.setOmniChannelReqParam(this.constant.key_omni_mmidTransfer, JSON.stringify(inputData));//set omni channel req
      console.log('getMMIDFundTransferParam', JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    getFundTransferParam(formData1, formData2, type){
      if(formData2.remark == null || formData2.remark == ''){
        formData2.remark = "-"
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
        [this.constant.key_accountNo]: formData2.chooseAccount,
        [this.constant.key_creditBranchCode]: '0000',
        [this.constant.key_toAccount]: formData1.accNumber,
        [this.constant.key_donationId]: '12',
        [this.constant.key_TransactionType]: type,
        [this.constant.key_amount]: formData2.amount.trim().replace(/[^0-9]+/g, ''),
        [this.constant.key_RRN] : this.common.genRandomDigit(9),
        [this.constant.key_remarks] : formData2.remark ,
        [this.constant.key_TransactionDate]: this.datepipe.transform(new Date().toISOString(), 'dd-MM-yyyy hh:mm:ss'),
        [this.constant.key_actionType]:'Quick'
      }

      console.log(inputData);
  
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }
}
