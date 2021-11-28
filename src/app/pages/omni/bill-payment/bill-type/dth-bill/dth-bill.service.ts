import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class DTHBillService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService
  ) { }

  /**
   * Request for dth bill pay bill
   */
  getDTHPayRequest(formData) {
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
      [this.constant.key_requestType]: this.constant.val_DTH,
      [this.constant.key_deviceId] : this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_accountno]: formData.transferFrom,
      [this.constant.key_numberToRecharge]:formData.dynamicID,
      [this.constant.key_operatorType]:formData.operator,
      [this.constant.key_amount]:formData.amount.trim().replace(/[^0-9]+/g,'')
    }

    console.log('DTH Payment req',JSON.stringify(inputData));
    
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_DTHBillpay, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


}
