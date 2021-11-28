import { Injectable } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { CommonMethods } from '../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class DeregisterService {
  deviceId: string;;
  mobileNumber: string;
  upiReqMobNo: string;
  encryptKey: string;
  inputData: any;
  platform: string;
  latitude: any;
  longitude: any;
  userLocationName: any;

  constructor(private dataService: DataService, private storage: LocalStorageService, private constant: AppConstants, private encryptDecryptService: EncryptDecryptService, private commonMethod: CommonMethods) { }

  initData() {
    this.deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId) ? this.storage.getLocalStorage(this.constant.storage_deviceId) : "16115505318289004432367";
    this.mobileNumber = this.storage.getLocalStorage(this.constant.storage_mobileNo) ? this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)) : "9004432367";
    // this.upiReqMobNo = "91" + this.mobileNumber;
    this.upiReqMobNo = this.storage.getLocalStorage(this.constant.storage_mobileNo) ? this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)) : "91" + this.mobileNumber;
    this.encryptKey = this.storage.getSessionStorage(this.constant.val_sessionKey) ? this.storage.getSessionStorage(this.constant.val_sessionKey) : "";
    console.log('this.encryptKey =>', this.encryptKey);
    this.platform = this.dataService.platform ? this.dataService.platform : "Android";
    // this.latitude = this.dataService.latitude ? this.dataService.latitude : "0";
    // this.longitude = this.dataService.longitude ? this.dataService.longitude : "0";

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
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.deviceId,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
    };

    console.log('inputData => ', JSON.stringify(this.inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(this.inputData));
    return encryptData;
    //this.getEncryptedOmniRequestObject(this.inputData);
  }

  getEncryptedOmniRequestObject(inputData) {
    console.log("encrypt key => ", this.encryptKey);
    let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(this.inputData));

    return encryptData;
  }

  omniUpiValidateMpinRequestObject(mpin) {
  //API => /UPI/UPIVALIDATEMPIN
    let request = {
      [this.constant.key_entityId] : this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_mobPlatform] : this.platform,
      [this.constant.key_mobileAppVersion] : this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion] : this.constant.val_clientAppVersion,
      [this.constant.key_mobileNumber] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_MPIN] : this.encryptDecryptService.createMD5Value(mpin)
    };
    console.log("UPI/UPIVALIDATEMPIN ====>"+JSON.stringify(request));
    let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(request));
    return encryptData;
  }

  deregisterUpiRequestObject() {
    let upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : this.upiReqMobNo, 
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_DEREGISTERMOBILE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion] : this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language] : this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo] : this.upiReqMobNo,
        [this.constant.key_upi_device] : {
          [this.constant.key_upi_app] : "com.infra.psbupiuat",
          [this.constant.key_upi_capability] : "10000000001",
          [this.constant.key_upi_os] : this.platform,
          [this.constant.key_upi_lat] : this.latitude,
          [this.constant.key_upi_lng] : this.longitude,
          [this.constant.key_upi_ip] : this.dataService.ipAddress,
          [this.constant.key_upi_location] : this.userLocationName,
          [this.constant.key_upi_mobileNo]: this.upiReqMobNo,
          [this.constant.key_upi_deviceID] : this.deviceId
        }
      }
    }

    //this.getOmniRequestObject(upiReqObj);
    this.inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType] : this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.deviceId,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiReqObj)
    };

    console.log('inputData => ', JSON.stringify(this.inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(this.inputData));
    return encryptData;
  } 

  omniUpiDeactivateRequestObject () {
    // API => /UPI/UPIDEACTIVATE
    let request = {
      [this.constant.key_entityId] : "UPIDESKTOP",
      [this.constant.key_mobPlatform] : this.platform,
      [this.constant.key_mobileAppVersion] : this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion] : this.constant.val_clientAppVersion,
      [this.constant.key_mobileNumber] : this.mobileNumber
    }

    this.getEncryptedOmniRequestObject(request);
  }
}
