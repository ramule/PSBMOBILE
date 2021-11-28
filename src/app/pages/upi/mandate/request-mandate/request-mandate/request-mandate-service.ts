import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { PluginService } from '../../../../../services/plugin-service';
import { MandateRequest } from 'src/app/models/mandate-model';

@Injectable({
  providedIn: 'root'
})
export class RequestMandateService {
  latitude: any;
  longitude: any;
  userLocationName: any;

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private pluginService: PluginService
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
   */
  requestMandate(transactionID) {
    let requestMandate: MandateRequest = this.dataService.requestMandate;
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_COLLECTMANDATE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_purpose]: requestMandate.frequency != "ONETIME" ? '14' : '00', /// TODO: dropdown UI need to be provided from UI Team for getting purpose
        [this.constant.key_upi_mandateName]: 'Default', //TODO: change this after getting NPCI connectivity
        [this.constant.key_upi_channel]: this.constant.val_upi_channel,
        [this.constant.key_upi_blockFund]: requestMandate.frequency != "ONETIME" && requestMandate.frequency != "DAILY" && requestMandate.frequency != "ASPRESENTED" ? this.constant.val_upi_blockFund_N : this.constant.val_upi_blockFund,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_txnType]: this.constant.val_upi_mandateTxnType,
        [this.constant.key_upi_mandateRuleType]: requestMandate.frequency != "ONETIME" && requestMandate.frequency != "DAILY" && requestMandate.frequency != "ASPRESENTED" ? requestMandate.debitDay: '',  // TODO
        [this.constant.key_upi_mandatePattern]: requestMandate.frequency,
        [this.constant.key_upi_mandateValidityEnd]: requestMandate.validityEndDate.replace(/\\|\//g, ''),
        [this.constant.key_upi_applicationFormNo]: "", // TODO
        [this.constant.key_upi_payerName]: requestMandate.payerName,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_refID]: transactionID, //this.commonMethod.randomString(32, "PSB"),
        [this.constant.key_upi_accType]: requestMandate.selectedVpa.accountDetails.accTypeActual,
        [this.constant.key_upi_initiationMode]: '00',
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_txnID]: transactionID,
        [this.constant.key_upi_ifsc]: requestMandate.selectedVpa.accountDetails.ifsc,
        [this.constant.key_upi_payeeDetails]:
          [
            {
              [this.constant.key_upi_payeeName]: requestMandate.selectedVpa.accountDetails.custName,
              [this.constant.key_upi_payeeAddr]: requestMandate.selectedVpa.vpaDetails.paymentAddress,
              [this.constant.key_upi_accNum]: requestMandate.selectedVpa.accountDetails.accNum,
              [this.constant.key_upi_payeeCode]: requestMandate.selectedVpa.accountDetails.mcc,
              [this.constant.key_upi_ifsc]: requestMandate.selectedVpa.accountDetails.ifsc,
              [this.constant.key_upi_txnAmount]: requestMandate.amount.trim().replace(/[^.0-9]+/g, ''),
            }
          ],
        [this.constant.key_upi_mandateValidityStart]: requestMandate.validityStartDate.replace(/\\|\//g, ''),
        [this.constant.key_upi_amountRule]: this.constant.val_upi_amountRuleEXACT,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payMode]: this.constant.val_upi_PAYMENTADDRESS,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_version]: this.constant.val_upi_app_version, // TODO: add data after NPCI library integration
        [this.constant.key_upi_mandateRuleValue]: requestMandate.validityStartDate.replace(/\\|\//g, ''),// TODO: add data after NPCI library integration
        [this.constant.key_upi_ipoNo]: '', //TODO
        [this.constant.key_upi_payerAddr]: requestMandate.requestedFromUPIId,
        [this.constant.key_upi_appID]: this.constant.val_app_pakage_name,
        [this.constant.key_upi_txnNote]: requestMandate.remarks,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_remarks]: requestMandate.remarks,
        [this.constant.key_upi_txnAmount]: requestMandate.amount.trim().replace(/[^.0-9]+/g, '')
      }
    }
    console.log("setRecentRequest", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
   * request parameter for setCollectRecentRequest
   */
  setRecentRequest() {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETBENIFICIARYLIST,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_beneListType]: this.constant.val_upi_All,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_beneListMode]: this.constant.val_upi_ANY,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),

      }
    }
    console.log("setRecentRequest", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
   * request parameter for setFavoritePayeeRequest
   */
  setFavoritePayeeRequest() {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETFAVOURITES,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
      }
    }

    console.log('setFavoritePayeeRequest ', JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
    * request parameter for setValidateRequest
    */
  setValidateRequest(formData, defaultVPAAccDetails, transactionID) {
    // this.pluginService.getTransactionId().subscribe((transactionID)=>{
    //   this.dataService.collectReceiptTransId =transactionID;
    // })
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_VALIDATEADDRESS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_payeeDetails]:
          [
            {
              [this.constant.key_upi_payeeName]: formData.upiIdOrMobno,
              [this.constant.key_upi_payeeAddr]: formData.upiIdOrMobno
            }
          ],
        [this.constant.key_upi_payerAddr]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_txnNote]: this.constant.val_upi_CollectReq,
        [this.constant.key_upi_payerName]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_refID]: this.commonMethod.randomString(32, "PSB"),
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_device]:this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnID]: transactionID,
        [this.constant.key_upi_txnType]: this.constant.val_upi_Collect
      }
    };

    console.log('setValidateRequest => ', JSON.stringify(upiRequestObj));
    return this.getOmniRequestObject(upiRequestObj);
  }


  /**
 * request parameter for setFavoritePayeeRequest
 */
  setAddFavoritePayeeRequest() {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_ADDFAVOURITES,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_paymentAddress]: this.dataService.validateAddressResp.validatedVpa,
        [this.constant.key_upi_nickName]: this.dataService.validateAddressResp.MASKNAME,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
      }
    }

    console.log('setFavoritePayeeRequest ', JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
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
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
      }
    }

    console.log('setDefaultVPARequest ', JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }


  /**
   * Common function to set omni request for upi
   * @param upiRequestObj 
   */
  getOmniRequestObject(upiRequestObj) {
    var upiRequestObj = upiRequestObj;
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
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
   * Common function to encrypt the data
   * @param inputData 
   */
  getEncryptedOmniRequestObject(inputData) {
    console.log('session Key : ', this.storage.getSessionStorage(this.constant.val_sessionKey))
    // let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));

    console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
    return encryptData;
  }


}
