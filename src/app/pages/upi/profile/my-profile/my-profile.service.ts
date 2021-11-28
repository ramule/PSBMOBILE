import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
    providedIn: 'root'
})

export class MyProfileService {
    inputData: any;
    mobileNumber: string;
    deviceId: string;
    appVersion: string;
    platform: string;
    encryptKey: string;
    isWeb: boolean = false;
    latitude: any;
    longitude: any;
    userLocationName: any;

    constructor(
        private constant: AppConstants,
        private dataService: DataService,
        private encryptDecryptService: EncryptDecryptService,
        private storage: LocalStorageService,
        private commonMethod: CommonMethods
    ) {}

    initData() {
        this.deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId);
        this.mobileNumber = this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo));
        this.encryptKey = this.storage.getSessionStorage(this.constant.val_sessionKey);
        this.appVersion = this.constant.val_mobileAppVersion; //0.0.1
        
        this.getUserLocation();
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
        this.inputData = {
          [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
          [this.constant.key_cbsType] : this.constant.val_cbsTypeTcs,
          [this.constant.key_mobPlatform]: this.platform,
          [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
          [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
          [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
          [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
        };
        console.log('inputData => ', JSON.stringify(this.inputData));
        return this.getEncryptedOmniRequestObject();
    }

    getEncryptedOmniRequestObject() {
        console.log("encrypt key => ", this.storage.getSessionStorage(this.constant.val_sessionKey));
        let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.inputData));
        return encryptData;
    }

    setDefaultVpaRequestObject(vpaDetails) {
        let upiReqObj = {
          [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_subAction] : this.constant.upiserviceName_SETDEFAULTVPA,
          [this.constant.key_upi_inputParam] : {
            [this.constant.key_upi_language] : this.dataService.getSelectedLanguageCodeUPI(),
            [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
            [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
            [this.constant.key_upi_paymentAddress] : vpaDetails.paymentAddress //"appchange1@psb"
          }
        };
        return this.getOmniRequestObject(upiReqObj);
    }

    getPaymentAddressListRequestObject() {
      let upiReqObj = {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)), //this.localStorage.get('mobileNumber')
        [this.constant.key_upi_subAction] : this.constant.upiserviceName_GETPAYMENTADDRESSLIST,
        [this.constant.key_upi_inputParam]: {
          [this.constant.key_upi_appVersion] : this.constant.val_mobileAppVersion,
          [this.constant.key_upi_language] : this.dataService.getSelectedLanguageCodeUPI(),
          [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_device] : {
            [this.constant.key_upi_app] : this.constant.val_app_pakage_name,
            [this.constant.key_upi_capability] : this.constant.val_upi_capability,
            [this.constant.key_upi_os] : this.platform,
            [this.constant.key_upi_lat] : this.latitude,
            [this.constant.key_upi_lng] : this.longitude,
            [this.constant.key_upi_ip] : this.dataService.ipAddress,
            [this.constant.key_upi_location] : this.userLocationName,
            [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
            [this.constant.key_upi_deviceID] : this.storage.getLocalStorage(this.constant.storage_deviceId)
          }
        }
      }
  
      return this.getOmniRequestObject(upiReqObj);
    }

    deletePaymentAddressRequestObject(paymentAddress) {
      let upiReqObject = {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)), //this.localStorage.get('mobileNumber')
        [this.constant.key_upi_subAction] : this.constant.upiserviceName_DELETEPAYMENTADDRESS,
        [this.constant.key_upi_inputParam] : {
          [this.constant.key_upi_payerAddr] : paymentAddress,
          [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
          [this.constant.key_upi_language] : this.dataService.getSelectedLanguageCodeUPI(),
        }
      };
  
      return this.getOmniRequestObject(upiReqObject);
    }

    getGenSigParam(qrCode) {
      let upiReqObject = {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)), //this.localStorage.get('mobileNumber')
        [this.constant.key_upi_subAction] : this.constant.upiserviceName_GENERATEQRSIGNATURE,
        [this.constant.key_upi_inputParam] : {
          [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)), //this.localStorage.get('mobileNumber')
          [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
          [this.constant.key_upi_language] : this.dataService.getSelectedLanguageCodeUPI(),
          [this.constant.key_upi_qrData] : qrCode,
        }
      };
      return this.getOmniRequestObject(upiReqObject);
    }

    getUpdatePaymentAddressAPICall(paymentAddress, vpaQrFlag) {
      let upiReqObject = {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)), //this.localStorage.get('mobileNumber')
        [this.constant.key_upi_subAction] : this.constant.upicheck_UPDATEPAYMENTADDRESS,
        [this.constant.key_upi_inputParam] : {
          [this.constant.key_upi_appVersion] : this.constant.val_mobileAppVersion,
          [this.constant.key_upi_language] : this.dataService.getSelectedLanguageCodeUPI(),
          [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo] : this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)), //this.localStorage.get('mobileNumber')
          [this.constant.key_upi_payerAddr] : paymentAddress,
          [this.constant.key_upi_vpaQrFlag] : vpaQrFlag == true ? 'N' : 'Y',
        }
      };
      return this.getOmniRequestObject(upiReqObject);
    }
    
}