import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AddBillerService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService
  ) { }


  /**
   * param to pay mobile bill
   * @param
   */
  addBillerParam(formData){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_accountno]: formData.accountNo,
      [this.constant.key_billerName]: formData.billerName,
      [this.constant.key_billerNickName]: formData.billerNickName,
      [this.constant.key_billerType]: formData.category,
      [this.constant.key_billerId]: formData.billerId,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    console.log("inputdata====>",inputData);
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_mobileBillPay, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
