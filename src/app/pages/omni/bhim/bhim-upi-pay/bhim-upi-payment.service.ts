import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant'
import { LocalStorageService } from '../../../../../app/services/local-storage-service.service';
import { CommonMethods } from '../../../../../app/utilities/common-methods';
import { EncryptDecryptService } from '../../../../../app/services/encrypt-decrypt.service';
import { DataService } from '../../../../../app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class BhimUPIService {

  constructor(
    private constant: AppConstants,
    private storage: LocalStorageService,
    public commonMethod:CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private dataService: DataService,
  ) { }

  /**
    * request parameter for setCollectRecentRequest
    * @param formData
    */
   setPaymentRequest(selectedVpa, payeeDetails, NPCIResponse) {
    // console.log('Expiry Date',upiPayReqDetails.expiryTime)
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FUNDSTRANSFER,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_channel]: this.constant.val_upi_MBANKING,
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_txnType]: this.constant.val_upi_PAY,
        [this.constant.key_upi_credData]: NPCIResponse?.credDataForJson ? NPCIResponse.credDataForJson: '',
        [this.constant.key_upi_credCode]: NPCIResponse?.credId ? NPCIResponse.credId :'',
        [this.constant.key_upi_payerIFSC]: selectedVpa.accountDetails.ifsc,
        [this.constant.key_upi_credSubType]: NPCIResponse.credSubType ? NPCIResponse.credSubType :'',
        [this.constant.key_upi_payerName]: selectedVpa.accountDetails.custName,
        [this.constant.key_upi_refID]: NPCIResponse.transactionId,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_is_Favourite]: "N",
        [this.constant.key_upi_txnID]: NPCIResponse.transactionId,
        [this.constant.key_upi_payeeCode]: this.dataService.verifyAddressResp.CODE,
        [this.constant.key_upi_payeeDetails]: [{
          [this.constant.key_upi_payeeName]: payeeDetails.payeeName,
          [this.constant.key_upi_payeeAddr]: payeeDetails.payeeUpiAddress,
          [this.constant.key_upi_payeeCode]: this.dataService.verifyAddressResp.CODE,
          [this.constant.key_upi_txnAmount]: this.dataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g,''),
          [this.constant.key_upi_accNum]: payeeDetails.payeeActNo,
          [this.constant.key_upi_ifsc]: payeeDetails.payeeIfsc,
        }],
        [this.constant.key_upi_payerAccountNo]: selectedVpa.accountDetails.accNum,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payMode]: payeeDetails.payMode,
        [this.constant.key_upi_credKi]: NPCIResponse?.credkey ? NPCIResponse.credkey : '',
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_credType]: NPCIResponse?.credType ? NPCIResponse?.credType :'', //this.constant.val_upi_PIN,
        [this.constant.key_upi_payerAddr]: selectedVpa.vpaDetails.paymentAddress,
        [this.constant.key_upi_txnNote]: this.dataService.upiPayRequest.remarks,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnAmount]: this.dataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g,''),
        [this.constant.key_upi_remarks]: this.dataService.upiPayRequest.remarks,
        [this.constant.key_upi_accType] : selectedVpa.accountDetails.accTypeActual
      }
    }
    console.log("setPayRequest", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
   * Common omni request
   * @param upiRequestObj
   */
  getOmniRequestObject(upiRequestObj) {
    var upiRequestObj = upiRequestObj;
    var inputData = {
      [this.constant.key_entityId]: this.constant.val_entityId_UMOB,
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
    };

    console.log('inputData => ', JSON.stringify(inputData));
    return this.getEncryptedOmniRequestObject(inputData);
  }

   /**
   * Common function to encrypt the request
   * @param inputData
   */
    getEncryptedOmniRequestObject(inputData) {
      console.log('session Key : ', this.storage.getSessionStorage(this.constant.val_sessionKey))
      // let encryptData = this.encryptDecryptService.encryptText(this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)) + this.constant.mapEncryptKey, JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
      return encryptData;
    }

}
