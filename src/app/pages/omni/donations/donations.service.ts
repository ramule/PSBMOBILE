import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  constructor(
    private constant:AppConstants,
    private dataService:DataService,
    private encryptDecryptService:EncryptDecryptService,
    private storage:LocalStorageService,
    public common:CommonMethods
  ) { }


  getDonationList() {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      ["typeOfRequest"] : "RETAIL"
    }

    console.log('getDonationRequest',JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getDonationFundTransferParam(formData , fromAccount , toAccount , paymentMode , ID,companyName){
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_accountNo] : fromAccount,
      [this.constant.key_toAccount]: toAccount,
      [this.constant.key_amount]: formData?.amount.trim().replace(/[^0-9]+/g,''),
      [this.constant.key_remarks]: formData.remarks ?  formData.remarks : "-",
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9), //need to change later
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_transType]: paymentMode,
      [this.constant.key_donationId]: ID,
      [this.constant.key_debitBranchCode]: '0000',
      [this.constant.key_creditBranchCode]: '0000',
      [this.constant.key_senderName]: this.dataService.userDetails?.customerName,
      [this.constant.key_receiverName]: companyName
    }

    console.log("donation inputData" + inputData);
  // this.dataService.setOmniChannelReqParam(this.constant.key_omni_ownTransfer,JSON.stringify(inputData));//set omni channel req
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }


  getAccountBalanceParam(selectAccount)
  {
    console.log(selectAccount)
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.constant.deviceID,
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_branchCode]: "0181",
      [this.constant.key_accountNo]:selectAccount,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),

    }
    console.log("Get Balance params =====>" + JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


}
