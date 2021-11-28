import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage:LocalStorageService,
    public dataService : DataService,
    public common:CommonMethods
  ) { }


  feedBack(formData){
    var inputData = {};
    inputData ={
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_transactionID] :this.common.genRandomDigit(8),
      [this.constant.key_beneficiary_account_no]: formData.toAccount,
      [this.constant.key_remarks]: formData.remark,
      [this.constant.key_rating]: formData.rating,
      [this.constant.key_type]: this.dataService?.feedbackType ? this.dataService?.feedbackType : "-",
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,


      //formData.fromAccount,
    //   "entityId": "MOBILE",
    // "cbsType": "TCS",
    // "mobPlatform": "android",
    // "mobileAppVersion": "1.0.0",
    // "deviceId": "9",
    // "clientAppVer": "1.0.0",
    // "MobileNo":"7865676567",
    //  "accountno":"123456",
    // "beneficiary_account_no":"343432432433",
    //  "amount": "10567",
    // "period":"Daily",
    // "limitName":"INTERNAL_TRANSFER_LIMIT",
    // "txn_amount":"1000",
    // "paymentMode":"JiO",
    // "remarks":"payment for mobile recharge",
    // "beneficiaryMobileNo":"8286363809"

    }

  this.dataService.setOmniChannelReqParam(this.constant.key_omni_ownTransfer,JSON.stringify(inputData));//set omni channel req
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }
}
