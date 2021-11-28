import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from '../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})

export class UpiDashboardService {
  inputData:any;
  latitude: any;
  longitude: any;
  userLocationName: any;

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService:DataService,
    private commonMethods:CommonMethods,
  ) { }

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
  

getVPAAddressListAPICall() {
  
  var upiRequestObj = {
    [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]:this.commonMethods.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      //[this.constant.key_upi_mobileNo]:this.commonMethods.processPhoneNo("902952210"),
      [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS,
      [this.constant.key_upi_inputParam]:
        {
          [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
          [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(), //this.constant.defaultLanguageCode,
          [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo]:this.commonMethods.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          //[this.constant.key_upi_mobileNo]:this.commonMethods.processPhoneNo("902952210"),
          [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi()
    }
  }
  console.log(' getVPAAddressListAPICall ',JSON.stringify(upiRequestObj));

  
 
   this.inputData = {
    [this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),
    [this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,
    [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
    [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
    [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
    //[this.constant.key_deviceId]:"1615970703585caWkZZLdzb6eQAbcxendfA==",
    [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
    [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
    };
 
    console.log('getVPAAddressListRequest => ', JSON.stringify(this.inputData));

    
    // let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(this.inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey),JSON.stringify(this.inputData));
    console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
    return encryptData; 
  }

   /**
   * request parameter for getNotificationListRequest
   */
    getContactSyncRequest(contactList) {
      var upiRequestObj = {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethods.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_subAction]: this.constant.upiserviceName_CONTACTSYNC,
        [this.constant.key_upi_inputParam]: {
          [this.constant.key_upi_mobileNo]: this.commonMethods.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
          [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
          [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
          [this.constant.key_upi_contactSyncList]: contactList,
          [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi()
        }
      }
      console.log("getContactSyncRequest ", JSON.stringify(upiRequestObj));
  
      return this.getOmniRequestObject(upiRequestObj);
    }

  /**
   * Common omni request
   * @param upiRequestObj 
   */
   getOmniRequestObject(upiRequestObj) {
    var upiRequestObj = upiRequestObj;
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
    };

    console.log('inputData => ', JSON.stringify(inputData));
    return this.getEncryptedOmniRequestObject(inputData);
  }

  /**
   * Common function to encrypt the request
   * @param inputData 
   */
  getEncryptedOmniRequestObject(inputData) {
    console.log('session Key : ', this.storage.getSessionStorage(this.constant.val_sessionKey))
    // let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
    return encryptData;
  }

  getNotificationCountRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.commonMethods.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_GETNOTIFICATIONCOUNT,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.commonMethods.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
      }
    };
    console.log("GetNotificationCount Request ", JSON.stringify(upiReqObj));
    return this.getOmniRequestObject(upiReqObj);
  }
}
