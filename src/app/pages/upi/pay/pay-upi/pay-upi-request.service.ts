import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})

export class payUpiRequestService {
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
    return this.getOmniRequestObject(upiReqObj)
  }

  getVerifyRequest() {
    var upiReqObj = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      // [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      // [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      // [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      // [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      // [this.constant.key_latitude]: this.dataService.latitude,
      // [this.constant.key_longitude]: this.dataService.longitude,
      // [this.constant.key_MobileNo]: this.storage.getLocalStorage('mobileNo'),
      // [this.constant.key_deviceId]: this.storage.getLocalStorage('deviceId')
    }
    console.log('getVerifyRequest ', JSON.stringify(upiReqObj));
    this.getOmniRequestObject(upiReqObj)
  }

  getBankListRequest() {
    var upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
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
    * request parameter for setValidateRequest
    */
  setValidateRequest(formData, defaultVPAAccDetails, transactionID) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VALIDATEADDRESS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_payeeDetails]:
          [
            {
              [this.constant.key_upi_payeeName]: formData.upiIdOrMobno.replace(/\s/g, ""),
              [this.constant.key_upi_payeeAddr]: formData.upiIdOrMobno.replace(/\s/g, "")
            }
          ],
        [this.constant.key_upi_payerAddr]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_txnNote]: this.constant.val_upi_PayReq,
        [this.constant.key_upi_payerName]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_refID]: transactionID,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        // {
        //   // [this.constant.key_upi_app]: "com.infrasofttech.psbupiuat",
        //   // [this.constant.key_upi_capability]: "5200000200010004000639292929292",
        //   // [this.constant.key_upi_lng]: "79.30569348",
        //   // [this.constant.key_upi_lat]: "19.98133432",
        //   // [this.constant.key_upi_os]: "Android 10",
        //   // [this.constant.key_upi_ip]: "192.168.43.224",
        //   // [this.constant.key_upi_location]: "",
        //   // [this.constant.key_upi_mobileNo]: "919769523191",
        //   // [this.constant.key_upi_deviceID]: "4971020082ef0f9d",
        //   [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
        //   [this.constant.key_upi_capability]: this.constant.val_upi_capability,
        //   [this.constant.key_upi_lng]: this.longitude,
        //   [this.constant.key_upi_lat]: this.latitude,
        //   [this.constant.key_upi_os]: this.dataService.platform,
        //   [this.constant.key_upi_ip]: this.dataService.ipAddress,
        //   [this.constant.key_upi_location]: this.userLocationName,
        //   [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        //   [this.constant.key_upi_deviceID]: this.dataService.getDeviceObjectForUpi()
        // },
        [this.constant.key_upi_txnID]: transactionID,
        [this.constant.key_upi_txnType]: this.constant.val_upi_PAY
      }
    };
    console.log('setValidateRequest => ', JSON.stringify(upiRequestObj));
    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
 * request parameter for GETDEFAULTVPA
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

  /**
  * request parameter to verify Ifsc code
  */
  setVerifyBranchRequest(ifscCode) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FETCHBANKNAME,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_language]: this.storage.hasKeyLocalStorage(this.constant.storage_language) ? this.storage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
        [this.constant.key_upi_ifsc]: ifscCode
      }
    }

    console.log('setDefaultVPARequest ', JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
  * request parameter to get Distict Account List for self transfer
  */
  getVpaAccountList() {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FETCHDISTINCTACCOUNTLIST,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.storage.hasKeyLocalStorage(this.constant.storage_language) ? this.storage.getLocalStorage(this.constant.storage_language) : this.constant.val_default_lang,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
      }
    }
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