import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class OtherBankService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    public dataService: DataService
  ) { }


  benificiaryListParam() {
    var inputData = {};
    // inputData = {
    //   [this.constant.key_entityId]: this.constant.getEntityId(),
    //   [this.constant.key_cbsType]: this.constant.val_cbsType,
    //   [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
    //   [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
    //   [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    //   [this.constant.key_latitude]: this.dataService.latitude,
    //   [this.constant.key_longitude]: this.dataService.longitude, [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
    //   [this.constant.key_MobileNo]: this.storage.getLocalStorage("mobileNo")

    // }

    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
       [this.constant.key_deviceId]:this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo)

    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  getNEFTFundTransferParam(formData, benificiaryDtl) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_benefName]: benificiaryDtl.benefName,
      [this.constant.key_accountno]: formData.transferFrom,
      [this.constant.key_beneficiary_account_no]: benificiaryDtl.beneficiary_account_no,
      [this.constant.key_ifsc_code]: benificiaryDtl.IFSC,
      [this.constant.key_remarks]: formData.remark != undefined || formData.remark != null ? formData.remark : ''

    }
    console.log("neft requrest=====>" + JSON.stringify(inputData));
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_neftTransfer, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getRTGSFundTransferParam(formData, benificiaryDtl, accountDetail) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude, [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_sender]: accountDetail.shortName,
      [this.constant.key_receiver]: benificiaryDtl.benefName,
      [this.constant.key_senderAccount]: formData.transferFrom,
      [this.constant.key_beneficiaryAccount]: benificiaryDtl.beneficiary_account_no,
      [this.constant.key_ifsc_code]: benificiaryDtl.IFSC,
      [this.constant.key_remarks]: formData.remark,
      //new parameters added for sms send [25-09-2020]
      [this.constant.key_referenceNumber] : "R455433",
      [this.constant.key_date] : "2020-09-25"


    }
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_rtgsTransfer, JSON.stringify(inputData));//set omni channel req
    console.log('getRTGSFundTransferParam', JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


}
