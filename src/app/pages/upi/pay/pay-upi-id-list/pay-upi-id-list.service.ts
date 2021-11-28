import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { PluginService } from '../../../../services/plugin-service';

@Injectable({
  providedIn: 'root'
})
export class PayUpiIdListService {
  latitude: any;
  longitude: any;
  userLocationName: any;

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private pluginService : PluginService
  ) { }

  getUserLocation() {   
    this.dataService.getCurrentLatLong().subscribe((data) => {
      console.log('GeoLocation Plugin => getCurrentLatLong Success => ', data);
      console.log(this.dataService.latitude);
      console.log(this.dataService.longitude);

      this.latitude = this.dataService.latitude ? this.dataService.latitude : "0";
      this.longitude = this.dataService.longitude ? this.dataService.longitude : "0";

      this.dataService.getUserLocationName(this.latitude, this.longitude).subscribe((data) => {
        console.log('data', data);
        console.log("dataservice.userLocationName => ", this.dataService.userLocationName);
        this.userLocationName = this.dataService.userLocationName;
      }, (err) => {
        console.log('err', err);
      });
    }, err => {
      console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
    });
  }


   /**
    * request parameter for setCollectRecentRequest
    * @param formData 
    */
  setCollectRequest(formData,upiCollectReqDetails,selectedVpa) {
    this.pluginService.getTransactionId().subscribe((object)=>{
      this.dataService.collectReceiptTransId = object.TransactionId;
    })
    console.log('Expiry Date',upiCollectReqDetails.expiryTime)
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FUNDSTRANSFER,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_payeeDetails]: [{
          [this.constant.key_upi_payeeName]: selectedVpa.vpaDetails.custName,
          [this.constant.key_upi_payeeAddr]: selectedVpa.vpaDetails.paymentAddress,

          [this.constant.key_upi_accNum]: selectedVpa.accountDetails.accNum,
          [this.constant.key_upi_payeeCode]: "0000",
          [this.constant.key_upi_ifsc]: selectedVpa.accountDetails.ifsc,
          [this.constant.key_upi_txnAmount]: formData.amount.trim().replace(/[^0-9]+/g,''),
        }],
        [this.constant.key_upi_payMode]: this.constant.val_upi_PAYMENTADDRESS,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_minAmountRule]: this.constant.val_upi_MinAmountRole,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_txnType]: this.constant.val_upi_Collect,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_expreAfterRule]: upiCollectReqDetails.expiryTime,
        [this.constant.key_upi_payType]: "", //blank as nothing mentioned in api document
        [this.constant.key_upi_payerAddr]: this.dataService.verifyAddressResp.validatedVpa,
        [this.constant.key_upi_txnNote]: formData.remarks,
        [this.constant.key_upi_payerName]: this.dataService.verifyAddressResp.MASKNAME,
        [this.constant.key_upi_refID]: this.dataService.collectReceiptTransId,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_device]:
        {
          [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
          [this.constant.key_upi_capability]: this.constant.val_upi_capability,
          [this.constant.key_upi_lng]: this.longitude,
          [this.constant.key_upi_lat]: this.latitude,
          [this.constant.key_upi_os]: this.dataService.platform,
          [this.constant.key_upi_ip]: this.dataService.ipAddress,
          [this.constant.key_upi_location]: this.userLocationName,
          [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
        },
        [this.constant.key_upi_txnAmount]: formData.amount.trim().replace(/[^0-9]+/g,''),
        [this.constant.key_upi_remarks]: formData.remarks,
        [this.constant.key_upi_txnID]: this.dataService.collectReceiptTransId,
        [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_accType] : selectedVpa.accountDetails.accTypeActual
      }
    }
    console.log("setCollectRequest", JSON.stringify(upiRequestObj));

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
