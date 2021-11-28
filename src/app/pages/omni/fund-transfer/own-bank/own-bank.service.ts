import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class OwnBankService {

  constructor(
    private constant: AppConstants, 
    private encryptDecryptService: EncryptDecryptService,
    private storage:LocalStorageService,
    public dataService : DataService
  ) { }


  getOwnFundTransferParam(formData,benificiaryDtl){
    var inputData = {};
    inputData ={
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_amount]: formData.amount,
      [this.constant.key_accountno] : formData.fromAccount,
      [this.constant.key_beneficiary_account_no]: formData.toAccount,
      [this.constant.key_ifsc_code]: benificiaryDtl.IFSC,
      [this.constant.key_remarks]: formData.remark,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      
    }

  this.dataService.setOmniChannelReqParam(this.constant.key_omni_ownTransfer,JSON.stringify(inputData));//set omni channel req
  console.log("own requrest=====>"+JSON.stringify(inputData));
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }
}
