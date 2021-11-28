import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from '../../../utilities/common-methods';


@Injectable({
  providedIn: 'root'
})
export class SetMpinService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService:DataService,
    private commonMethods: CommonMethods
  ) { }


  /**
   * UPI SetMPIN API
   */
  getSetMPINParam(mpin) {
    var inputData = {

      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.Key_customerName]: this.dataService.regUPICustData.customerName,
      [this.constant.key_MPIN]: this.encryptDecryptService.createMD5Value(mpin),
      [this.constant.key_emailId]: this.dataService.regUPICustData.email_id,
      // [this.constant.key_dateOfBirth]: this.dataService.regUPICustData.dateOfBirth,
      [this.constant.key_dateOfBirth]: "02-25-1252",
      [this.constant.key_gender]: "M", // for NOw Static 
      // [this.constant.key_gender]: formdata.gender, // later Use formdata.gender
      // [this.constant.key_isBIOMETRICEnable]: this.dataService.regUPICustData.isBIOMETRICEnable,
      // [this.constant.key_isBIOMETRICEnable]: this.storage.getLocalStorage(this.constant.storage_isBiomertric),
      [this.constant.key_isBIOMETRICEnable]: this.dataService.regUPICustData.isBIOMETRICEnable,
      [this.constant.key_prefered_Language]:this.storage.hasKeyLocalStorage(this.constant.storage_language) ? this.storage.getLocalStorage(this.constant.storage_language) : "en",
    }

    // let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    // return encryptData;

    console.log('UPI SetMPIN API', JSON.stringify(inputData));
    console.log('Mobile No', this.storage.getLocalStorage(this.constant.storage_mobileNo));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  getParamForLoginMPIN(mpin) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      // [this.constant.key_MobileNo]: formData.mobNumber,
      [this.constant.key_loginType]: this.constant.val_loginTypeMPIN,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_MPIN]: this.encryptDecryptService.createMD5Value(mpin),
    }
    console.log(JSON.stringify(inputData));
    return this.encryptDataForMobile(inputData);
  }

  encryptDataForMobile(inputData){
    console.log("storage_mobileStaticEncrypyKey",this.storage.getLocalStorage(this.constant.storage_mobileStaticEncrypyKey));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }

  // // Customet details while regisration 
  // regUPICustData: any = {
  //   customerName:"",
  //   email_id:"",
  //   dateOfBirth:"",
  //   gender:"",
  //   isBIOMETRICEnable:"", 
  // };

  getVPAListRequestObject() {​​​​​​
    let upiRequestObj = {
      [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]:this.commonMethods.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]:this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]:this.constant.val_upi_app_version,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]:this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]:this.commonMethods.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi()
      }
    }
    console.log('getVPAListRequestObject 1 => ',JSON.stringify(upiRequestObj)); 
   
    let inputData = {​​​​​​
      [this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType]:this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]:this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]:this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]:this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]:JSON.stringify(upiRequestObj)
      }​​​​​​;
   
      console.log('getVPAListRequestObject 2 => ', JSON.stringify(inputData));
  
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
      
      console.log('encryptData getOmniRequestObject => ', JSON.stringify(encryptData));
      return encryptData; 
    }
}
