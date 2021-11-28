import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { Complaint } from 'src/app/models/complaint-model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods
  ) { }


  /**
   * request parameter for getComplaintRequest
   */
  getComplaintRequest() {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETCOMPLAINTSFORMOBILE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        // [this.constant.key_upi_device]:
        // {
        //   [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
        //   [this.constant.key_upi_capability]: this.constant.val_upi_capability,
        //   [this.constant.key_upi_lng]: this.dataService.longitude,
        //   [this.constant.key_upi_lat]: this.dataService.latitude,
        //   [this.constant.key_upi_os]: this.dataService.platform,
        //   [this.constant.key_upi_ip]: this.dataService.ipAddress,
        //   [this.constant.key_upi_location]: "Kshirsamudra, Maharashtra",
        //   [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        //   [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
        // }
      }
    }
    console.log("getComplaintRequest", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
 * request parameter for getEscalateRequest
 */
  getEscalateRequest(complaint: Complaint) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_ESCALATECOMPLAINT,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_transactionID]: complaint.transactionID,
        [this.constant.key_upi_rrn]: complaint.rrn,
        [this.constant.key_upi_refID]: complaint.refID,
        [this.constant.key_upi_complaintType]: complaint.complaintType,
      }
    }

    if (complaint.complaintType.toLowerCase() == 'mandate') {
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_umn] = complaint.umn;
    }
    console.log("getEscalateRequest", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
* request parameter for getEscalateRequest
*/
  getRaiseComplaintRequest(raiseComplaint: RaiseComplaint, transactionId) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_RAISECOMPLAINT,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_orgTxnID]: raiseComplaint.transactionID,
        [this.constant.key_upi_complaintType]: raiseComplaint.complaintType,
        [this.constant.key_upi_transactionType]: raiseComplaint.transactionType,
        [this.constant.key_upi_txnID]: transactionId,
        [this.constant.key_upi_refID]: transactionId,
        [this.constant.key_upi_transactionID]: transactionId,
        [this.constant.key_upi_payeeCode]: raiseComplaint.payeeCode,
        [this.constant.key_upi_txnType]: this.constant.val_upi_COMPLAINT,
        [this.constant.key_upi_orgRRN]: raiseComplaint.rrn,
        [this.constant.key_upi_remarks]: this.constant.val_upi_UDIR_RE_NA,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_initiationMode]: raiseComplaint.initiationMode,
        [this.constant.key_upi_subject]: raiseComplaint.subject,
        [this.constant.key_upi_description]: raiseComplaint.description,
        [this.constant.key_upi_txnStatus]: raiseComplaint.txnStatus,
        [this.constant.key_upi_purpose]: '00',
        [this.constant.key_upi_txnDateTime]: moment(raiseComplaint.transactionDate).format(),// moment(raiseComplaint.transactionDate, moment.ISO_8601),
        [this.constant.key_upi_refCategory]: '00',
        [this.constant.key_upi_customerEmail]: raiseComplaint.customerEmail,
        [this.constant.key_upi_txnAmount]: raiseComplaint.txnAmount.trim().replace(/[^.0-9]+/g, ''),
        [this.constant.key_upi_payerAddr]: raiseComplaint.payerAddress,
        [this.constant.key_upi_payeeAddr]: raiseComplaint.payeeAddress,
        [this.constant.key_upi_responseCode]: this.dataService.trackStatusRes.responseCode,
        [this.constant.key_upi_upiVersion]: this.constant.val_upi_UPIVERSION,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI()
      }
    }

    if (raiseComplaint.complaintType.toLowerCase() == 'mandate') {
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_umn] = raiseComplaint.umn;
    }
    console.log("getRaiseComplaintRequest", JSON.stringify(upiRequestObj));

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
    // console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


}
