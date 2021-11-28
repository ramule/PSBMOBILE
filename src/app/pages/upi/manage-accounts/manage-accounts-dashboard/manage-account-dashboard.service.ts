import { Injectable } from '@angular/core';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { PluginService } from '../../../../services/plugin-service';

@Injectable({
  providedIn: 'root'
})

export class ManageAccountDashboardService {

  inputData: any;
  mobileNumber: string;
  upiReqMobNo: string;
  deviceId: string;
  appVersion: string;
  platform: string;
  encryptKey: string;
  isWeb: boolean = false;
  latitude: any;
  longitude: any;
  userLocationName: any;
  language: any;
  profileDetails: any;
  selectedVpa: any;
  debitCardNumber: any;
  debitCardExpiryDate: any;
  txnID: any;
  requestOtpTxnId: any;

  constructor(private constant:AppConstants, private http:HttpRestApiService, private encryptDecryptService: EncryptDecryptService, private storage: LocalStorageService, private commonMethod: CommonMethods, private dataService: DataService, private pluginService: PluginService) { }

  initData() {
    this.deviceId = this.dataService.uuid;
    this.mobileNumber = this.storage.getLocalStorage(this.constant.storage_mobileNo);
    this.upiReqMobNo = this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo));
    this.encryptKey = this.storage.getSessionStorage(this.constant.val_sessionKey) ? this.storage.getSessionStorage(this.constant.val_sessionKey) : "";
    this.appVersion = this.constant.val_mobileAppVersion; //0.0.1
    this.language = this.dataService.getSelectedLanguageCodeUPI();
    this.profileDetails = this.dataService.getUpiUserProfileDetails().value;
    this.platform = this.dataService.platform;
    this.getUserLocation();
    // this.getTransactionId();
  }

  getTransactionId() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      this.txnID = transactionID;
      console.log('this.txnID => ', this.txnID);
    });
  }

  getUserLocation() {
    // this.dataService.getCurrentLatLong().subscribe((data) => {
      // console.log('GeoLocation Plugin => getCurrentLatLong Success => ', data);
      // console.log(this.dataService.latitude);
      // console.log(this.dataService.longitude);

      this.latitude = this.dataService.latitude ? this.dataService.latitude : "0";
      this.longitude = this.dataService.longitude ? this.dataService.longitude : "0";

      // this.dataService.getUserLocationName(this.latitude, this.longitude).subscribe((data) => {
      //   console.log('data', data);
      //   console.log("dataservice.userLocationName => ", this.dataService.userLocationName);
        this.userLocationName = this.dataService.userLocationName;
    //   }, (err) => {
    //     console.log('err', err);
    //   });
    // }, err => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
    // });
  }

  getOmniRequestObject(upiRequestObj) {

    this.inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB), 
      [this.constant.key_cbsType] : this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.platform,
      [this.constant.key_mobileAppVersion]: this.appVersion,
      [this.constant.key_deviceId]: this.deviceId,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
    };

    console.log('inputData => ', JSON.stringify(this.inputData));
    
    this.getEncryptedOmniRequestObject();
  }

  getEncryptedOmniRequestObject() {
    console.log("encrypt key => ", this.encryptKey);
    let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(this.inputData));
    return encryptData;
  }

  changeUPIPINRequestObject(accountDetails,response) {
    let upiReqObject = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.mobileNumber),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_CHANGECREDENTIALS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_newCredKi]: response.credOTPkey,
        [this.constant.key_upi_appVersion]: this.appVersion,
        [this.constant.key_upi_newCredSubType]: response.credOTPSubType,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_credData]: response.credDataForJson,
        [this.constant.key_upi_credCode]: response.credId,
        [this.constant.key_upi_credSubType]: response.credSubType,
        [this.constant.key_upi_payerName]: accountDetails.customerName,
        [this.constant.key_upi_refID]:  response.transactionId,
        [this.constant.key_upi_refUrl]: "http:\/\/www.psb.com",
        [this.constant.key_upi_ifsc]: accountDetails.ifsc,
        [this.constant.key_upi_accType]: accountDetails.accTypeActual,
        [this.constant.key_upi_language]: this.language,
        [this.constant.key_upi_txnID]: response.transactionId,
        [this.constant.key_upi_accNum]: accountDetails.accNum,
        [this.constant.key_upi_addressType]: accountDetails.addressType,
        [this.constant.key_upi_newCredCode]: response.credOTPId,
        [this.constant.key_upi_newCredData]: response.credOTPDataForJson,
        [this.constant.key_upi_credKi]: response.credkey,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.mobileNumber),
        [this.constant.key_upi_newCredType]: response.credType,
        [this.constant.key_upi_payerAddr]: accountDetails.paymentAddress,
        [this.constant.key_upi_credType]: accountDetails.credType,
        [this.constant.key_upi_txnNote]: "",
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
      }
    };

    return this.getOmniRequestObject(upiReqObject);
  }


  balanceEnquiryRequestObject(accountDetails,response) {
    let upiReqObject = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.mobileNumber),
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_BALANCEENQUIRY,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_accNum] : accountDetails.accNum, 
        [this.constant.key_upi_appVersion] : this.appVersion,
        [this.constant.key_upi_addressType] : accountDetails.addressType,
        [this.constant.key_upi_credKi] : response.credkey,
        [this.constant.key_upi_language] : this.language,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.mobileNumber),
        [this.constant.key_upi_credData] : response.credDataForJson,
        [this.constant.key_upi_credCode] : response.credId,
        [this.constant.key_upi_payerAddr] : accountDetails.paymentAddress,
        [this.constant.key_upi_credType] : response.credType,
        [this.constant.key_upi_txnNote] : "",
        [this.constant.key_upi_credSubType] : response.credSubType,
        [this.constant.key_upi_payerName] : accountDetails.customerName,
        [this.constant.key_upi_refUrl] :  "http:\/\/www.psb.com",
        [this.constant.key_upi_refID] : response.transactionId, 
        [this.constant.key_upi_accType] : accountDetails.accTypeActual,
        [this.constant.key_upi_ifsc] : accountDetails.ifsc,
        [this.constant.key_upi_device] : this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnID] : response.transactionId
      }
    };
    this.getOmniRequestObject(upiReqObject);
  }

  deleteAccountToVpaRequestObject(accountDetails) {
    let upiReqObject = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo, 
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_DELETEACCOUNTTOVPA,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_appVersion] : this.appVersion,
        [this.constant.key_upi_accNum] : accountDetails.accNum,
        [this.constant.key_upi_addressType] : accountDetails.addressType,
        [this.constant.key_upi_language] : this.language,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_payerAddr] : this.selectedVpa.paymentAddress,
        [this.constant.key_upi_defaultAccFlag] : accountDetails.isDefaultAccount,
        [this.constant.key_upi_payerName] : accountDetails.customerName,
        [this.constant.key_upi_accType] : accountDetails.accTypeActual,
        [this.constant.key_upi_ifsc] : accountDetails.ifsc,
        [this.constant.key_upi_device] : {
          [this.constant.key_upi_app] : "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability] : "10000000001",
          [this.constant.key_upi_os] : this.platform,
          [this.constant.key_upi_lng] : this.longitude,
          [this.constant.key_upi_ip] : this.dataService.ipAddress,
          [this.constant.key_upi_location] : this.userLocationName,
          [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
          [this.constant.key_upi_deviceID] : this.deviceId,
          [this.constant.key_upi_lat] : this.latitude
        }
      }
    };
    this.getOmniRequestObject(upiReqObject);
  }

  changeDefaultAccMappingRequestObject(accountDetails) {
    let upiReqObject = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_CHANGEDEFAULTACCMAPPING,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_accNum] : accountDetails.accNum,
        [this.constant.key_upi_appVersion] : this.appVersion,
        [this.constant.key_upi_payerAddr] : this.selectedVpa.paymentAddress,
        [this.constant.key_upi_addressType] : accountDetails.addressType,
        [this.constant.key_upi_defaultAccFlag] : accountDetails.isDefaultAccount,
        [this.constant.key_upi_payerName] : accountDetails.customerName,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_language] : this.language,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_accType] : accountDetails.accTypeActual,
        [this.constant.key_upi_ifsc] : accountDetails.ifsc,
        [this.constant.key_upi_device] : {
          [this.constant.key_upi_app] : "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability] : "10000000001",
          [this.constant.key_upi_os] : this.platform,
          [this.constant.key_upi_lng] : this.longitude,
          [this.constant.key_upi_ip] : this.dataService.ipAddress,
          [this.constant.key_upi_location] : this.userLocationName,
          [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
          [this.constant.key_upi_deviceID] : this.deviceId,
          [this.constant.key_upi_lat] : this.latitude
        }
      }
    };
    this.getOmniRequestObject(upiReqObject);
  }

  deletePaymentAddressRequestObject() {
    let upiReqObject = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_DELETEPAYMENTADDRESS,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_paymentAddress] : this.selectedVpa.paymentAddress,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_language] : this.language,
      }
    };

    this.getOmniRequestObject(upiReqObject);
  }

  syncAccountRequestObject(accountDetails) {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_SYNCACCOUNT,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_language] : this.language,
        [this.constant.key_upi_addressType] : accountDetails.addressType,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_linkValue] : this.upiReqMobNo,
        [this.constant.key_upi_payerAddr] : this.selectedVpa.paymentAddress,
        [this.constant.key_upi_txnNote] : "",
        [this.constant.key_upi_linkType] : this.constant.val_upi_MOBILE,
        [this.constant.key_upi_payerName] : accountDetails.customerName,
        [this.constant.key_upi_refID] : this.txnID,
        [this.constant.key_upi_refUrl] : "http:\/\/www.psb.com",
        [this.constant.key_upi_ifsc] : accountDetails.ifsc,
        [this.constant.key_upi_device] : {
          [this.constant.key_upi_app] : "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability] : "5200000200010004000639292929292",
          [this.constant.key_upi_lat] : this.latitude,
          [this.constant.key_upi_lng] : this.longitude,
          [this.constant.key_upi_os] : this.platform,
          [this.constant.key_upi_ip] : this.dataService.ipAddress,
          [this.constant.key_upi_location] : this.userLocationName,
          [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
          [this.constant.key_upi_deviceID] : this.deviceId
        },
        [this.constant.key_upi_txnID] : this.txnID,
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

  setDefaultVpaRequestObject(paymentAddress) {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_SETDEFAULTVPA,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_language] : this.language,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_paymentAddress] : paymentAddress
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

  getPaymentAddressListDetailsRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi()
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

  requestOTPRequestObject(accountDetails) {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_REQUESTOTP,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_txnID] : this.requestOtpTxnId,
        [this.constant.key_upi_txnNote] : "test",
        [this.constant.key_upi_refID] : this.requestOtpTxnId,
        [this.constant.key_upi_refUrl] : "http:\/\/www.psb.com", 
        [this.constant.key_upi_payerAddr] : this.selectedVpa.paymentAddress,
        [this.constant.key_upi_payerName] : accountDetails.customerNamee,
        [this.constant.key_upi_addressType] : accountDetails.addressType,
        [this.constant.key_upi_device] : {
          [this.constant.key_upi_app] : "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability] : "5200000200010004000639292929292",
          [this.constant.key_upi_lat] : this.latitude,
          [this.constant.key_upi_lng] : this.longitude,
          [this.constant.key_upi_os] : this.platform,
          [this.constant.key_upi_ip] : this.dataService.ipAddress,
          [this.constant.key_upi_location] : this.userLocationName,
          [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
          [this.constant.key_upi_deviceID] : this.deviceId,
        },
        [this.constant.key_upi_accType] : accountDetails.accTypeActual,
        [this.constant.key_upi_accNum] : accountDetails.accNum,
        [this.constant.key_upi_ifsc] : accountDetails.ifsc
      }
    };

    this.getOmniRequestObject(upiReqObj);
  }

  regMobileRequestObject(accountDetails, finalCredResponse) {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_REGMOBILE,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_appVersion] : this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language] : this.language,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_refID] : finalCredResponse.transactionId,
        [this.constant.key_upi_refUrl] : "http:\/\/www.psb.com", 
        [this.constant.key_upi_txnID] : finalCredResponse.transactionId,
        [this.constant.key_upi_txnNote] : "test",
        [this.constant.key_upi_addressType] : this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payerAddr] : this.selectedVpa.paymentAddress,
        [this.constant.key_upi_payerName] : accountDetails.customerName,
        [this.constant.key_upi_device] : {
          [this.constant.key_upi_app] : "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability] : "5200000200010004000639292929292",
          [this.constant.key_upi_lat] : this.latitude,
          [this.constant.key_upi_lng] : this.longitude,
          [this.constant.key_upi_os] : this.platform,
          [this.constant.key_upi_ip] : this.dataService.ipAddress,
          [this.constant.key_upi_location] : this.userLocationName,
          [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
          [this.constant.key_upi_deviceID] : this.deviceId
        },
        [this.constant.key_upi_accType] : accountDetails.accTypeActual,
        [this.constant.key_upi_accNum] : accountDetails.accNum,  
        [this.constant.key_upi_ifsc] : accountDetails.ifsc, 
        [this.constant.key_upi_newCredType] : accountDetails.credType,  
        [this.constant.key_upi_newCredSubType] : finalCredResponse?.credSubType ? finalCredResponse.credSubType : "",
        [this.constant.key_upi_newCredCode] : this.constant.val_upi_NPCI,
        [this.constant.key_upi_newCredKi] : finalCredResponse.credkey ? finalCredResponse.credkey : "",
        [this.constant.key_upi_newCredData] : finalCredResponse.credDataForJson ? finalCredResponse.credDataForJson : "",
        [this.constant.key_upi_credType] : finalCredResponse.credOTPType ? finalCredResponse.credOTPType : "",
        [this.constant.key_upi_credSubType] : finalCredResponse.credOTPSubType ? finalCredResponse.credOTPSubType : "",
        [this.constant.key_upi_credCode] : this.constant.val_upi_NPCI,
        [this.constant.key_upi_credKi] : finalCredResponse.credOTPkey ? finalCredResponse.credOTPkey : "",
        [this.constant.key_upi_credData] : finalCredResponse.credOTPDataForJson ? finalCredResponse.credOTPDataForJson : "",
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_cardNum] : this.debitCardNumber, 
        [this.constant.key_upi_expDate] : this.debitCardExpiryDate,
        [this.constant.key_upi_atmCredCode]: finalCredResponse.credATMType ? this.constant.val_upi_NPCI : "",
        [this.constant.key_upi_atmCredSubType]: finalCredResponse.credATMSubType ? finalCredResponse.credATMSubType : "",
        [this.constant.key_upi_atmCredType]: finalCredResponse.credATMType ? finalCredResponse.credATMType : "",
        [this.constant.key_upi_atmCredKi]: finalCredResponse.credATMkey ? finalCredResponse.credATMkey : "",
        [this.constant.key_upi_atmCredData]: finalCredResponse.credATMDataForJson ? finalCredResponse.credATMDataForJson : ""
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

  editAccountCurrentLimitRequestObject(accountDetails,amt,vpaAddress) {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_EDITACCOUNTCURRENTLIMIT,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_appVersion] : this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language] : this.language,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_accNum] : accountDetails.accNum,
        [this.constant.key_upi_ifsc] : accountDetails.ifsc,
        [this.constant.key_upi_accountCurrentLimit] : amt,
        [this.constant.key_upi_paymentAddress]:vpaAddress
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

  globalQrActivateDeactivateRequestObject(accountDetails, finalCredResponse, activationFlag) {
    console.log("globalQrActivateDeactivateRequestObject");
    console.log('activationFlag', activationFlag);
    console.log('finalCredResponse', finalCredResponse);
    console.log('accountDetails', accountDetails);

    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_subAction] : this.constant.upiserviceName_GLOBALQRACTIVATION,
        [this.constant.key_upi_inputParam] : {
          [this.constant.key_upi_payerAddr] : accountDetails.paymentAddress,
          [this.constant.key_upi_appVersion] : this.appVersion,
          [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
          [this.constant.key_upi_language] : this.language, //lang
          [this.constant.key_upi_txnNote] : "Custom",
          [this.constant.key_upi_refID] : finalCredResponse.transactionId,
          [this.constant.key_upi_refUrl] : "http:\/\/www.psb.com",
          [this.constant.key_upi_txnID] : finalCredResponse.transactionId,
          [this.constant.key_upi_payerName] : accountDetails.custName,
          [this.constant.key_upi_addressType] : accountDetails.addressType,
          [this.constant.key_upi_accType] : accountDetails.accTypeActual,
          [this.constant.key_upi_accNum] : accountDetails.accNum,
          [this.constant.key_upi_ifsc] : accountDetails.ifsc,
          [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
          [this.constant.key_upi_device] : {
            [this.constant.key_upi_app] : "com.infrasofttech.psbupiuat",
            [this.constant.key_upi_capability] : "5200000200010004000639292929292",
            [this.constant.key_upi_lat] : this.latitude,
            [this.constant.key_upi_lng] : this.longitude,
            [this.constant.key_upi_location] : this.userLocationName,
            [this.constant.key_upi_os] : this.platform,
            [this.constant.key_upi_ip] : this.dataService.ipAddress,
            [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
            [this.constant.key_upi_deviceID] : this.deviceId
          },
          [this.constant.key_upi_remarks] : "test",
          [this.constant.key_upi_credType] : finalCredResponse.credType ? finalCredResponse.credType : "",
          [this.constant.key_upi_credSubType] : finalCredResponse.credSubType ? finalCredResponse.credSubType : "", 
          [this.constant.key_upi_credCode] : this.constant.val_upi_NPCI,
          [this.constant.key_upi_credKi] : finalCredResponse.credkey ? finalCredResponse.credkey : "",
          [this.constant.key_upi_credData] : finalCredResponse.credDataForJson ? finalCredResponse.credDataForJson : "", 
          [this.constant.key_upi_globalActivationType] : this.constant.val_upi_International,
          [this.constant.key_upi_globalActivationAction] : activationFlag ? this.constant.val_upi_Activation : this.constant.val_upi_Deactivation,
          [this.constant.key_upi_globalActivationValidityStart] : "23052020",
          [this.constant.key_upi_globalActivationValidityEnd] : "23062020"
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }
  
  globalQrQueryRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_GLOBALQRQUERY,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_txnNote] : "Custom",
        [this.constant.key_upi_refUrl] : "http:\/\/www.psb.com",
        [this.constant.key_upi_txnID] : "PSB2d65ee71a7104c95af48e9b197c7f229",
        [this.constant.key_upi_refID] :"PSB2d65ee71a7104c95af48e9b197c7f229",
        [this.constant.key_upi_globalActivationType] : this.constant.val_upi_International,
        [this.constant.key_upi_globalActivationAction] : this.constant.val_upi_Query,
        [this.constant.key_upi_globalActivationValidityStart] : "23052020",
        [this.constant.key_upi_globalActivationValidityEnd] : "23062020",
        [this.constant.key_upi_addressType] : "ACCOUNT",
        [this.constant.key_upi_payerAddr] : "9819436426q",
        [this.constant.key_upi_accType] : "SAVINGS",
        [this.constant.key_upi_accNum] : "80163726381720",
        [this.constant.key_upi_ifsc] : "AABF0009009",
        [this.constant.key_upi_device] : {
          [this.constant.key_upi_app] : "com.infra.psbupiuat",
          [this.constant.key_upi_capability] : "10000000001",
          [this.constant.key_upi_os] : this.platform,
          [this.constant.key_upi_lat] : this.latitude,
          [this.constant.key_upi_lng] : this.longitude,
          [this.constant.key_upi_ip] : this.dataService.ipAddress,
          [this.constant.key_upi_location] : this.userLocationName,
          [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
          [this.constant.key_upi_deviceID] : this.deviceId
        }
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

  validateGlobalQrRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_VALIDATEGLOBALQR,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_txnNote] : "Custom",
        [this.constant.key_upi_refUrl] : "http:\/\/www.psb.com",
        [this.constant.key_upi_txnID] : "PSB2d65ee71a7104c95af48e9b197c7f229",
        [this.constant.key_upi_refID] : "PSB2d65ee71a7104c95af48e9b197c7f229",
        [this.constant.key_upi_purpose] : "11",
        [this.constant.key_upi_initiationMode] : "00",
        [this.constant.key_upi_qrData] : "upiGlobal://pay?purpose=11&param-name=param-value&param-name=paramvalue&... ",
        [this.constant.key_upi_addressType] : "ACCOUNT",
        [this.constant.key_upi_payerAddr] : "bunny@psb",
        [this.constant.key_upi_payerName] :"ABC"
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

}