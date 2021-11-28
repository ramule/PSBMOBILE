import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class WaterBillService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService
  ) { }

  /**
   * Creating request for fetching water payment bill
   */
  getWaterBillRequest(formData) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_requestType]: this.constant.val_billAmount,
      [this.constant.Key_customerId]: formData.billNo,

    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getWaterBillPayRequest(formData,amount,obj) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_requestType]: this.constant.val_billAmount,
      [this.constant.Key_customerId]: formData.billNo,
      [this.constant.key_amount]:amount,
      [this.constant.key_accountno]: obj.transferFrom,
      [this.constant.key_board_type] : formData.boardType
    }

    console.log('Water bill pay req',JSON.stringify(inputData));
    
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_WaterBillpay, JSON.stringify(inputData));//set omni channel req

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getGasBillPayRequest(formData,amount,type,boardName) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_requestType]: this.constant.val_billAmount,
      [this.constant.Key_customerId]: boardName,
      [this.constant.key_amount]:amount,
      [this.constant.key_accountno]: type == "payGasBill" ? formData.customerNo: formData.lpgId,
      [this.constant.key_board_type] : type == "payGasBill" ? formData.accountNoGasLine: formData.accountNoCylinder
    }

    console.log('Gas bill pay req',JSON.stringify(inputData));
    
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_WaterBillpay, JSON.stringify(inputData));//set omni channel req

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getInsuranceBillPayRequest(insuranceFormData,payBillFormData,amount) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_requestType]: this.constant.val_billAmount,
      [this.constant.Key_customerId]: insuranceFormData.policyNumber,
      [this.constant.key_amount]:amount,
      [this.constant.key_accountno]: payBillFormData.transferFrom,
      [this.constant.key_board_type] : insuranceFormData.insuanceType
    }

    console.log('Insurance bill pay req',JSON.stringify(inputData));
    
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_WaterBillpay, JSON.stringify(inputData));//set omni channel req

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
