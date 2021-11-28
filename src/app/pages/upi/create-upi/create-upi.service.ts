import { Injectable } from '@angular/core';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from '../../../app.constant';
import { DataService } from '../../../services/data.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { PluginService } from '../../../services/plugin-service';

@Injectable({
  providedIn: 'root'
})

export class CreateUpiService {

  inputData: any;
  mobileNumber: string;
  deviceId: string;
  encryptKey: string;
  upiReqMobNo: string;
  omniApiName: string;
  platform: string;
  latitude: any;
  longitude: any;
  userLocationName: any;
  language: any;
  paymentAddress: any;
  selectedAccountDetails: any;
  debitCardNumber: any;
  debitCardExpiryDate: any;
  userDetails: any;
  selectedBankIfsc: any;
  payerName: any;
  bankName: any;
  txnID: any;
  isDefaultVpa: any;
  requestOtpTxnId: any;

  constructor(private constant: AppConstants, private http: HttpRestApiService, private encryptDecryptService: EncryptDecryptService, private dataService: DataService, private storage: LocalStorageService, private commonMethod: CommonMethods, private pluginService: PluginService) { }

  initData() {
    console.log("initData coming From => ", this.dataService.previousPageUrl);
    this.deviceId = this.dataService.uuid;
    this.mobileNumber = this.storage.getLocalStorage(this.constant.storage_mobileNo);
    this.upiReqMobNo = this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo));
    this.platform = this.dataService.platform ? this.dataService.platform : "";
    this.language = this.dataService.getSelectedLanguageCodeUPI();
    this.payerName = this.dataService.regUPICustData.customerName;

    if (this.dataService.previousPageUrl == "manageAccounts") {
      this.omniApiName = this.constant.upiserviceName_PROCESSUPISERVICESESSION;
      this.encryptKey = this.storage.getSessionStorage(this.constant.val_sessionKey) ? this.storage.getSessionStorage(this.constant.val_sessionKey) : "";
      this.userDetails = this.dataService.getUpiUserProfileDetails().value;
    } else {
      this.omniApiName = this.constant.upiserviceName_PROCESSUPISERVICE;
      this.encryptKey = this.mobileNumber + this.constant.mapEncryptKey;
      this.userDetails = this.dataService.regUPICustData;
    }
    console.log('this.omniApiName => ', this.omniApiName);
    console.log('this.encryptKey =>', this.encryptKey);
    this.getUserLocation();
    this.getTransactionId();
  }

  getTransactionId() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      this.txnID = transactionID;
      console.log('this.txnID => ', this.txnID);
    });
  }

  getUserLocation() {
    // this.dataService.getCurrentLatLong().subscribe((data) => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Success => ', data);
    //   console.log(this.dataService.latitude);
    //   console.log(this.dataService.longitude);

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
    console.log("upiReqObj =>  ", upiRequestObj);

    this.inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.platform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
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

  getPaymentAddressRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETPAYMENTADDRESS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
        [this.constant.key_upi_language]: this.language,
        [this.constant.key_upi_paymentAddress]: this.paymentAddress
      }
    };

    this.getOmniRequestObject(upiReqObj);
  }

  verifyPaymentAddressRequestObject(inputUpiId) {
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VERIFYPAYMENTADDRESS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_paymentAddress]: inputUpiId,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.language,
        [this.constant.key_upi_mobileNo]: this.upiReqMobNo
      }
    };

    this.getOmniRequestObject(upiReqObj);
  }

  getAccountProviderListRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETACCOUNTPROVIDERLIST,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_language]: this.language,
        [this.constant.key_upi_mobileNo]: this.upiReqMobNo
      }
    };

    this.getOmniRequestObject(upiReqObj);
  }

  getAccountListRequestObject() {
    this.getTransactionId();
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETACCOUNTLIST,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_language]: this.language,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
        [this.constant.key_upi_linkValue]: this.upiReqMobNo,
        [this.constant.key_upi_payerAddr]: this.paymentAddress,
        [this.constant.key_upi_txnNote]: "",
        [this.constant.key_upi_linkType]: this.constant.val_upi_MOBILE,
        [this.constant.key_upi_payerName]: this.payerName,
        [this.constant.key_upi_refID]: this.txnID,
        [this.constant.key_upi_refUrl]: "http:\/\/www.psb.com",
        [this.constant.key_upi_ifsc]: this.bankName,
        [this.constant.key_upi_device]: {
          [this.constant.key_upi_app]: "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability]: "5200000200010004000639292929292",
          [this.constant.key_upi_lat]: this.latitude,
          [this.constant.key_upi_lng]: this.longitude,
          [this.constant.key_upi_os]: this.platform,
          [this.constant.key_upi_ip]: this.dataService.ipAddress,
          [this.constant.key_upi_location]: this.userLocationName,
          [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
          [this.constant.key_upi_deviceID]: this.deviceId,
        },
        [this.constant.key_upi_txnID]: this.txnID
      }
    };

    this.getOmniRequestObject(upiReqObj);
  }

  getBankDetailListRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETBANKDETAILLIST,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb
      }
    };

    this.getOmniRequestObject(upiReqObj);
  }

  addPaymentAddressRequestObject(upiId,isMbeba) {
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_ADDPAYMENTADDRESS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
        [this.constant.key_upi_payerAddr]: upiId,
        [this.constant.key_upi_accNum]: this.selectedAccountDetails.accNum,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_atmCredType]: this.selectedAccountDetails.atmCredType,
        [this.constant.key_upi_atmDType]: this.selectedAccountDetails.atmDType,
        [this.constant.key_upi_atmCredSubType]: this.selectedAccountDetails.atmCredSubType,
        [this.constant.key_upi_atmDLength]: this.selectedAccountDetails.atmDLength,
        [this.constant.key_upi_credType]: this.selectedAccountDetails.credType,
        [this.constant.key_upi_credDType]: this.selectedAccountDetails.credDType,
        [this.constant.key_upi_credSubType]: this.selectedAccountDetails.credSubType,
        [this.constant.key_upi_credDLength]: this.selectedAccountDetails.credDLength, 
        [this.constant.key_upi_payerName]: this.selectedAccountDetails.custName,
        [this.constant.key_upi_defaultVpaFlag]: this.isDefaultVpa,
        [this.constant.key_upi_ifsc]: this.selectedAccountDetails.ifsc,
        [this.constant.key_upi_isValid]: "Y",  
        [this.constant.key_upi_isOneTime]: "N",
        [this.constant.key_upi_mmid]: "",
        [this.constant.key_upi_mbeba]: this.selectedAccountDetails.mbeba,//isMbeba,
        [this.constant.key_upi_accType]: this.selectedAccountDetails.accType,
        [this.constant.key_upi_language]: this.language,
        [this.constant.key_upi_frequency]: "10",
        [this.constant.key_upi_isWithFrequency]: "Y",
        [this.constant.key_upi_amountLimit]: "1000000" //current limit input (manage accounts)
      }
    };

    this.getOmniRequestObject(upiReqObj);
  }

  
  addAccountToVpaRequestObject(accountDetails) {
    // console.log('addAccountToVpaRequestObject => accountDetails', accountDetails);
    let upiReqObject = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo, 
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_ADDACCOUNTTOVPA,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_appVersion] : this.constant.val_upi_app_version,
        [this.constant.key_upi_accNum] : accountDetails.accNum,
        [this.constant.key_upi_addressType] : this.constant.val_upi_ACCOUNT, //accountDetails.addressType,
        [this.constant.key_upi_language] : this.language,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo, 
        [this.constant.key_upi_payerAddr] : this.paymentAddress,
        [this.constant.key_upi_credType] : accountDetails.credType,
        [this.constant.key_upi_credSubType] : accountDetails.credSubType,
        [this.constant.key_upi_credDType] : this.constant.val_upi_NUM,
        [this.constant.key_upi_credDLength] : accountDetails.credDLength,
        [this.constant.key_upi_otpCredType] : accountDetails.otpCredType,
        [this.constant.key_upi_otpCredSubType] : accountDetails.otpCredSubType,
        [this.constant.key_upi_otpCredDType] : accountDetails.otpCredDType,
        [this.constant.key_upi_otpCredDLength] : accountDetails.otpCredDLength,
        [this.constant.key_upi_atmCredType] : accountDetails.atmCredType,
        [this.constant.key_upi_atmCredSubType] : accountDetails.atmCredSubType,
        [this.constant.key_upi_atmDType] : accountDetails.atmDType,
        [this.constant.key_upi_atmDLength] : accountDetails.atmDLength,
        [this.constant.key_upi_defaultAccFlag] : accountDetails.isDefaultAccount,
        [this.constant.key_upi_payerName] : accountDetails.custName,
        [this.constant.key_upi_accType] : accountDetails.accType,
        [this.constant.key_upi_ifsc] : accountDetails.ifsc,
        [this.constant.key_upi_device] : this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_accountCurrentLimit] : accountDetails.currentLimit,
        [this.constant.key_upi_mbeba]: accountDetails.mbeba
      }
    };
    // console.log('upiReqObject', upiReqObject);
    this.getOmniRequestObject(upiReqObject);
  }

  regMobileRequestObject(finalCredResponse) {
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_REGMOBILE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language]: this.language,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
        [this.constant.key_upi_refID]: finalCredResponse.transactionId,
        [this.constant.key_upi_refUrl]: "http:\/\/www.psb.com",
        [this.constant.key_upi_txnID]: finalCredResponse.transactionId,
        [this.constant.key_upi_txnNote]: "test",
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payerAddr]: this.paymentAddress,
        [this.constant.key_upi_payerName]: this.selectedAccountDetails.custName,
        [this.constant.key_upi_device]: {
          [this.constant.key_upi_app]: "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability]: "5200000200010004000639292929292",
          [this.constant.key_upi_lat]: this.latitude,
          [this.constant.key_upi_lng]: this.longitude,
          [this.constant.key_upi_os]: this.platform,
          [this.constant.key_upi_ip]: this.dataService.ipAddress,
          [this.constant.key_upi_location]: this.userLocationName,
          [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
          [this.constant.key_upi_deviceID]: this.deviceId
        },
        [this.constant.key_upi_accType]: this.selectedAccountDetails.accType,
        [this.constant.key_upi_accNum]: this.selectedAccountDetails.accNum,
        [this.constant.key_upi_ifsc]: this.selectedAccountDetails.ifsc,
        [this.constant.key_upi_newCredType] : this.selectedAccountDetails.credType,  
        [this.constant.key_upi_newCredSubType] : finalCredResponse?.credSubType ? finalCredResponse.credSubType : "",
        [this.constant.key_upi_newCredCode] : this.constant.val_upi_NPCI,
        [this.constant.key_upi_newCredKi] : finalCredResponse.credkey ? finalCredResponse.credkey : "",
        [this.constant.key_upi_newCredData] : finalCredResponse.credDataForJson ? finalCredResponse.credDataForJson : "",
        [this.constant.key_upi_credType] : finalCredResponse.credOTPType ? finalCredResponse.credOTPType : "",
        [this.constant.key_upi_credSubType] : finalCredResponse.credOTPSubType ? finalCredResponse.credOTPSubType : "",
        [this.constant.key_upi_credCode] : this.constant.val_upi_NPCI,
        [this.constant.key_upi_credKi] : finalCredResponse.credOTPkey ? finalCredResponse.credOTPkey : "",
        [this.constant.key_upi_credData] : finalCredResponse.credOTPDataForJson ? finalCredResponse.credOTPDataForJson : "",
        [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
        [this.constant.key_upi_cardNum]: this.debitCardNumber,
        [this.constant.key_upi_expDate]: this.debitCardExpiryDate,
        [this.constant.key_upi_atmCredCode]: finalCredResponse.credATMType ? this.constant.val_upi_NPCI : "",
        [this.constant.key_upi_atmCredSubType]: finalCredResponse.credATMSubType ? finalCredResponse.credATMSubType : "",
        [this.constant.key_upi_atmCredType]: finalCredResponse.credATMType ? finalCredResponse.credATMType : "",
        [this.constant.key_upi_atmCredKi]: finalCredResponse.credATMkey ? finalCredResponse.credATMkey : "",
        [this.constant.key_upi_atmCredData]: finalCredResponse.credATMDataForJson ? finalCredResponse.credATMDataForJson : ""
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

  requestOTPRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_REQUESTOTP,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
        [this.constant.key_upi_txnID]: this.requestOtpTxnId,
        [this.constant.key_upi_txnNote]: "",
        [this.constant.key_upi_refID]: this.requestOtpTxnId,
        [this.constant.key_upi_refUrl]: "http:\/\/www.psb.com",
        [this.constant.key_upi_payerAddr]: this.paymentAddress,
        [this.constant.key_upi_payerName]: this.selectedAccountDetails.custName,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_device]: {
          [this.constant.key_upi_app]: "com.infrasofttech.psbupiuat",
          [this.constant.key_upi_capability]: "5200000200010004000639292929292",
          [this.constant.key_upi_lat]: this.latitude,
          [this.constant.key_upi_lng]: this.longitude,
          [this.constant.key_upi_os]: this.platform,
          [this.constant.key_upi_ip]: this.dataService.ipAddress,
          [this.constant.key_upi_location]: this.userLocationName,
          [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
          [this.constant.key_upi_deviceID]: this.deviceId,
        },
        [this.constant.key_upi_accType]: this.selectedAccountDetails.accType,
        [this.constant.key_upi_accNum]: this.selectedAccountDetails.accNum,
        [this.constant.key_upi_ifsc]: this.selectedAccountDetails.ifsc
      }
    };
    this.getOmniRequestObject(upiReqObj);
  }

  openInformationPopup() {
    this.commonMethod.openPopup('div.popup-bottom.informationPopup');
  }
}
