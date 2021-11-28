import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})

export class ScanQrRequestService {
  inputData: any;
  latitude: any;
  longitude: any;
  userLocationName: any;

  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods
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

  getPayRecentRequest() {
    var upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETBANKDETAILLIST,
      // [this.constant.key_upi_remarks] : "ba",
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb
      }
    };
    console.log('getVerifyRequest ', JSON.stringify(upiReqObj));
    return this.getOmniRequestObject(upiReqObj)
  }

  /**
    * request parameter for getFavoritePayeeRequest
  */
  getFavoritePayeeRequest() {
    var upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETBANKDETAILLIST,
      // [this.constant.key_upi_remarks] : "ba",
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb
      }
    };
    console.log('getVerifyRequest ', JSON.stringify(upiReqObj));
    return this.getOmniRequestObject(upiReqObj);
  }

  setValidateQrSignRequest(scanQrText) {
    var upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VALIDATEQRSIGNATURE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_orgID]: this.dataService.ScanQrCodeData.orgId,
        [this.constant.key_upi_qrData]: scanQrText.response
      }
    };
    console.log('getVerifyRequest ', JSON.stringify(upiReqObj));
    return this.getOmniRequestObject(upiReqObj);
  }

  
  setValidateMandateRequest(transactionID) {
    var upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_VALIDATEMANDATE,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_payeeDetails]:[
          {
            [this.constant.key_upi_payeeAddr]:this.dataService.ScanQrCodeData.pa,
            [this.constant.key_upi_txnAmount]:this.dataService.ScanQrCodeData.am
          }
        ],
        [this.constant.key_upi_umn]:this.dataService.ScanQrCodeData.umn,
        [this.constant.key_upi_appID]: this.constant.val_upi_psb,
        [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
        [this.constant.key_upi_txnType]: this.constant.val_type_COLLECT,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_appVersion] : this.constant.val_mobileAppVersion,
        [this.constant.key_upi_device]:this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnID]: transactionID,
      },
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
    };
    console.log('setValidateMandateRequest ',JSON.stringify(upiReqObj));
    return this.getOmniRequestObject(upiReqObj);
  }

  /**
    * request parameter for setValidateRequest
    */
  setValidateVpaRequest(qrScanResult, defaultVPAAccDetails, transactionID) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VALIDATEADDRESS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_payeeDetails]:
          [
            {
              [this.constant.key_upi_payeeName]: qrScanResult.qrMerchantName ? qrScanResult.qrMerchantName : qrScanResult.pn,
              [this.constant.key_upi_payeeAddr]: qrScanResult.qrPaymentAddress ? qrScanResult.qrPaymentAddress : qrScanResult.pa,
            }
          ],
        [this.constant.key_upi_payerAddr]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_txnNote]: this.constant.val_upi_PAY,
        [this.constant.key_upi_payerName]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_refID]: transactionID,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        // {
        //   [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
        //   [this.constant.key_upi_capability]: this.constant.val_upi_capability,
        //   [this.constant.key_upi_lng]: this.longitude,
        //   [this.constant.key_upi_lat]: this.latitude,
        //   [this.constant.key_upi_os]: this.dataService.platform,
        //   [this.constant.key_upi_ip]: this.dataService.ipAddress,
        //   [this.constant.key_upi_location]: this.userLocationName,
        //   [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        //   [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
        // },
        [this.constant.key_upi_txnID]: transactionID,
        [this.constant.key_upi_txnType]: this.constant.val_upi_PAY
      }
    };
    console.log('setValidateRequest => ', JSON.stringify(upiRequestObj));
    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
  * request parameter for setValidateQrRequest
  */
  setValidateQrRequest(qrScanResult, defaultVPAAccDetails, transactionID) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VALIDATEQR,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_payeeDetails]:
          [
            {
              [this.constant.key_upi_payeeName]: qrScanResult.qrMerchantName ? qrScanResult.qrMerchantName : qrScanResult.pn,
              [this.constant.key_upi_payeeAddr]: qrScanResult.qrPaymentAddress ? qrScanResult.qrPaymentAddress : qrScanResult.pa,
            }
          ],
        [this.constant.key_upi_payerAddr]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_txnNote]: this.constant.val_upi_PAY,
        [this.constant.key_upi_payerName]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_refID]: transactionID,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        // {
        //   [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
        //   [this.constant.key_upi_capability]: this.constant.val_upi_capability,
        //   [this.constant.key_upi_lng]: this.longitude,
        //   [this.constant.key_upi_lat]: this.latitude,
        //   [this.constant.key_upi_os]: this.dataService.platform,
        //   [this.constant.key_upi_ip]: this.dataService.ipAddress,
        //   [this.constant.key_upi_location]: this.userLocationName,
        //   [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        //   [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
        // },
        [this.constant.key_upi_qrDetail]:
        {
          [this.constant.key_upi_qrExpire]: qrScanResult.QRexpire,
          [this.constant.key_upi_qrMedium]: qrScanResult.qrMedium,
          [this.constant.key_upi_qrTs]: qrScanResult.QRts,
          [this.constant.key_upi_qVer]: qrScanResult.ver,
        },
        [this.constant.key_upi_txnID]: transactionID,
        [this.constant.key_upi_txnType]: this.constant.val_upi_PAY
      }
    };
    console.log('setValidateRequest => ', JSON.stringify(upiRequestObj));
    return this.getOmniRequestObject(upiRequestObj);
  }

  setValidateGlobalQrRequest(scanQrText, ScanQrCodeData, defaultVPAAccDetails) {
    var upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VALIDATEGLOBALQR,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_txnNote]: ScanQrCodeData.response,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_txnID]: ScanQrCodeData.tid,
        [this.constant.key_upi_refID]: ScanQrCodeData.tid,
        [this.constant.key_upi_purpose]: ScanQrCodeData.purpose,
        [this.constant.key_upi_initiationMode]: ScanQrCodeData.mode,
        [this.constant.key_upi_qrData]: scanQrText.response,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payerAddr]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_payerName]: defaultVPAAccDetails.accountDetails.custName,
      }
    };
    console.log('getVerifyRequest ', JSON.stringify(upiReqObj));
    return this.getOmniRequestObject(upiReqObj);
  }

  /**
 * request parameter for setFavoritePayeeRequest
 */
  setDefaultVPARequest(mobileNo) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETDEFAULTVPA,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_beneMobileNo]: this.commonMethod.processPhoneNo(mobileNo),
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_language]: this.storage.hasKeyLocalStorage(this.constant.storage_language) ? this.storage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
      }
    }

    console.log('setDefaultVPARequest ', JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  getOmniRequestObject(upiRequestObj) {
    var upiRequestObj = upiRequestObj
    this.inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
    };
    console.log("getOmniRequestObject Input", JSON.stringify(this.inputData));
    return this.getEncryptedOmniRequestObject();
  }

  getEncryptedOmniRequestObject() {
    console.log("Request Before Encrypt", JSON.stringify(this.inputData));
    // let encryptData = this.encryptDecryptService.encryptText(this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)) + this.constant.mapEncryptKey, JSON.stringify(this.inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.inputData));
    console.log('getEncryptedOmniRequestObject => ', JSON.stringify(encryptData));
    return encryptData;
  }
}