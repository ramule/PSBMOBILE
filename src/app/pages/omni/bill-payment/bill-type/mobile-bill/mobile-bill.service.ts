import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class MobileBillService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService
  ) { }


  /**
   * function to receive all the past transaction
   * @param
   */
  getAllPastParam(){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobileNumber]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  /**
   * param to get biller information
   */
  getBillerInformationParam(){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_category]: this.constant.val_telecom,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
  
  /**
   * param to pay mobile bill
   * @param
   */
  payMobileBillParam(formData,type,operator){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_requestType]: type == "prepaid" ? "PREPAIDMOBILE ": "POSTPAIDMOBILE",
      [this.constant.key_accountno]: type == "prepaid" ? formData.accountNoPrepaid : formData.accountNoPostPaid ,
      [this.constant.key_numberToPayBill]: type == "prepaid" ? formData.mobileNoPrepaid : formData.mobileNoPostPaid,
      [this.constant.key_amount]: type == "prepaid" ? formData.amountPrepaid.trim().replace(/[^0-9]+/g,'') : formData.amountPostPaid.trim().replace(/[^0-9]+/g,'') ,
      [this.constant.key_operator]: operator,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    console.log("inputdata====>",inputData);
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_mobileBillPay, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

    // "entityId": "MOBILE",
    // "cbsType": "FLEXCUBE",
    // "MobileNo":"22345322",
    // "accountno":"123456",
    // "mobPlatform": "android",
    // "mobileAppVersion": "1.0.0",
    // "deviceId": "9",
    // "clientAppVer": "1.0.0",
    // "numberToPayBill":"123456788",
    // "requestType":"POSTPAIDMOBILE",
    // "amount":"40000"
  }


   /**
   * param to delete biller information
   * @billerData
   */
  getDeleteBillerInformationParam(billerData){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_accountno]: billerData.accNo,
      [this.constant.key_billerName]: billerData.name,
      [this.constant.key_billerNickName]: billerData.nickname,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;



    // "entityId": "MOBILE",
    // "cbsType": "FLEXCUBE",
    // "MobileNo":"22345322",
    // "accountno":"123456",
    // "mobPlatform": "android",
    // "mobileAppVersion": "1.0.0",
    // "deviceId": "9",
    // "clientAppVer": "1.0.0",
    // "billerName":"MSEB",
    // "billerNickName":"EBILL"
  }


  /**
   * param to add biller
   */
  getAddBillerParam(formData){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_accountno]: formData.accNo,
      [this.constant.key_billerName]: formData.name,
      [this.constant.key_billerNickName]: formData.nickname,
      [this.constant.key_billerType]: formData.billerType,
      [this.constant.key_billerId]: formData.bilerId,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;



    // "entityId": "MOBILE",
    // "cbsType": "FLEXCUBE",
    // "MobileNo":"22345322",
    // "accountno":"123456",
    // "mobPlatform": "android",
    // "mobileAppVersion": "1.0.0",
    // "deviceId": "9",
    // "clientAppVer": "1.0.0",
    // "billerName":"MSEB",
    // "billerNickName":"EBILL",
    // "billerType":"ENERGY",
    // "billerId":"EN2345RT"
  }

  getOperatorList(){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion
    }

    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getRechargePlanParam(){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_SERVICEPROVIDER]: "Idea",
      [this.constant.key_circles]: "Maharashtra",
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getDeleteBillerParam(detail){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_accountno]:detail.ACCOUNTNO,
      [this.constant.key_billerName]:detail.BILLERID,
      [this.constant.key_billerNickName]:detail.BILLERNAME,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;




    // "entityId": "MOBILE",
    // "cbsType": "FLEXCUBE",
    // "MobileNo":"22345322",
    // "accountno":"123456",
    // "mobPlatform": "android",
    // "mobileAppVersion": "1.0.0",
    // "deviceId": "9",
    // "clientAppVer": "1.0.0",
    // "billerName":"MSEB",
    // "billerNickName":"EBILL"
  }
}
