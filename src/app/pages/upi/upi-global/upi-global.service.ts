import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { DataService } from '../../../services/data.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { CommonMethods } from '../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class UpiGlobalService {

  inputData: any;
  mobileNumber: any;
  upiReqMobNo: any;
  appVersion: any;
  language: any;
  latitude: any;
  longitude: any;
  userLocationName: any;
  platform: any;
  deviceId: any;
  encryptKey: any;
  
  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private dataService: DataService,
    private localStorageService: LocalStorageService,
    private commonMethods: CommonMethods) { }

  initData() {
    this.deviceId = this.dataService.uuid;
    this.mobileNumber = this.localStorageService.getLocalStorage(this.constant.storage_mobileNo);
    this.upiReqMobNo = this.commonMethods.processPhoneNo(this.localStorageService.getLocalStorage(this.constant.storage_mobileNo));
    this.platform = this.dataService.platform ? this.dataService.platform : "";
    this.language = this.dataService.getSelectedLanguageCodeUPI();
    this.appVersion = this.constant.val_mobileAppVersion;
    this.latitude = this.dataService.latitude ? this.dataService.latitude : "0";
    this.longitude = this.dataService.longitude ? this.dataService.longitude : "0";
    this.userLocationName = this.dataService.userLocationName;
    // this.getUserLocation();
  }  

  getUserLocation() {
    this.dataService.getCurrentLatLong().subscribe((data) => {
      console.log('GLOBAL UPI GeoLocation Plugin => getCurrentLatLong Success => ', data);
      console.log(this.dataService.latitude);
      console.log(this.dataService.longitude);

      this.latitude = this.dataService.latitude ? this.dataService.latitude : "0";
      this.longitude = this.dataService.longitude ? this.dataService.longitude : "0";

      this.dataService.getUserLocationName(this.latitude, this.longitude).subscribe((data) => {
        console.log('GLOBAL UPI data', data);
        console.log("dataservice.userLocationName => ", this.dataService.userLocationName);
        this.userLocationName = this.dataService.userLocationName;
      }, (err) => {
        console.log('err', err);
      });
    }, err => {
      console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
    });
  }

  globalQrActivateDeactivateRequestObject(accountDetails, finalCredResponse, activationFlag) {
    console.log("globalQrActivateDeactivateRequestObject");
    console.log('activationFlag', activationFlag);
    console.log('finalCredResponse', finalCredResponse);
    console.log('accountDetails', accountDetails);
    console.log('globalUpiFormData', this.dataService.globalUpiFormData);
    
    let formattedStartDate = this.dataService.globalUpiFormData.startDate.replaceAll("/","");
    let formattedEndDate = this.dataService.globalUpiFormData.endDate.replaceAll("/","");

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
          [this.constant.key_upi_globalActivationValidityStart] : formattedStartDate, //"23052020"
          [this.constant.key_upi_globalActivationValidityEnd] : formattedEndDate//"23062020"
      }
    };

    console.log('upiReqObj', upiReqObj);
    this.getOmniRequestObject(upiReqObj);
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
    let encryptData = this.encryptDecryptService.encryptText(this.localStorageService.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.inputData));
    return encryptData;
  }
}
