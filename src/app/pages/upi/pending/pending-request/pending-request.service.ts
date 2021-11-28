import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { PendingWithMe } from 'src/app/models/pending-request.model';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingReqService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private httpService : HttpRestApiService,
  ) { }


  /**
   * request parameter for setPendingWithMeRequest
   */
  setPendingRequest() {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_PENDINGREQUESTS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_device]:this.dataService.getDeviceObjectForUpi()
      }
    }
    console.log("setPendingRequest", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

    /**
   * request parameter for set reminder
   */
  snoozeNotificationReq(snoozeTime,pendigReq) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_SNOOZENOTIFICATION,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_snoozeTime]:snoozeTime,
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_payeeDetails]: [
          {
            [this.constant.key_upi_payeeAddr]:pendigReq.payeeAddress
          }
        ],

        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_expireAfter]: pendigReq.expiredDate,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_notificationType]:this.constant.val_upi_TRANSACTION_NOTIFICATION,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnAmount]:pendigReq.amount,
        [this.constant.key_upi_txnID]:pendigReq.txnId
      }
    }
    console.log("snoozeNotificationReq ", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
   * request parameter for block upi
   */
  setBlockUPIReq(formData,pendigReq) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_BLOCKNOTIFICATION,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_paymentAddress]:pendigReq.payeeAddress,
        [this.constant.key_upi_payerAddr]:pendigReq.payerAddress,
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_blockPeriod]:formData.blockPeriod,
        [this.constant.key_upi_nickName]:pendigReq.payeeName,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_notificationType]:this.constant.val_upi_TRANSACTION_NOTIFICATION,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnID]:pendigReq.txnId,
        [this.constant.key_upi_reason]:formData.reason,
        [this.constant.key_upi_isSpam]:formData.spam ? "YES" : 'N'
      }
    }
    console.log("setBlockUPIReq ", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  
   /**
   * request setAcceptCollectReq
   */
    setAcceptCollectReq(pendigReq:PendingWithMe,NPCIDetails,consentFlag) {
      let VPAAccountDetails = this.dataService.collectAcceptVPADetails;
      var upiRequestObj = {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_subAction]: this.constant.upiserviceName_ACCEPTNOTIFICATION,
        [this.constant.key_upi_inputParam]: {
          [this.constant.key_upi_appVersion] : this.constant.val_mobileAppVersion,
          [this.constant.key_upi_credKi]: NPCIDetails?.credkey ? NPCIDetails.credkey : '',
          [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
          [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_credData]: NPCIDetails?.credDataForJson ? NPCIDetails.credDataForJson :'',
          [this.constant.key_upi_credCode]: NPCIDetails?.credId ? NPCIDetails.credId :'',
          [this.constant.key_upi_credType]: NPCIDetails?.credType ? NPCIDetails.credType : '',
          [this.constant.key_upi_txnNote]:pendigReq.remarks,
          [this.constant.key_upi_credSubType]: NPCIDetails?.credSubType ? NPCIDetails.credSubType :'',
          [this.constant.key_upi_refID]:pendigReq.refId,
          [this.constant.key_upi_refUrl]:this.constant.val_upi_refUrl,
          [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
          [this.constant.key_upi_txnAmount]:pendigReq.amount,
          [this.constant.key_upi_txnID]:pendigReq.txnId,
          [this.constant.key_upi_payerName]:VPAAccountDetails.custName,
          [this.constant.key_upi_payerAccountNo]:VPAAccountDetails.accNum,
          [this.constant.key_upi_payerIFSC]:VPAAccountDetails.ifsc,
          [this.constant.key_upi_payerAccType]:VPAAccountDetails.accTypeActual,
          [this.constant.key_upi_payMode]: this.constant.val_upi_payMode_PaymentAddress,
          [this.constant.key_upi_paymentAddress]:VPAAccountDetails.paymentAddress
        },
        
      }

      if(pendigReq.isGstEnable == 'Y'){
        upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_invoiceDetail] = {};
        upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_invoiceDetail][this.constant.key_upi_invoiceNo] = pendigReq.invoiceNumber;
        upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_invoiceDetail][this.constant.key_upi_invoiceName] = pendigReq.invoiceName;
        upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_invoiceDetail][this.constant.key_upi_invoiceDate] = pendigReq.invoiceDate;
        upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_consentFlag] = consentFlag ? 'Y' : 'N';
      }
      console.log("setAcceptCollectReq ", JSON.stringify(upiRequestObj));
  
      if(this.dataService.omniUPIFlow && !NPCIDetails?.credDataForJson){
        upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
      }
      return this.getOmniRequestObject(upiRequestObj);
    }

  /**
   * request setAcceptNotificationReq
   */
  setAcceptNotificationReq(pendigReq) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_ACCEPTNOTIFICATION,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_paymentAddress]:pendigReq.payeeAddress,
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_nickName]:pendigReq.payeeName,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]:this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_notificationType]:this.constant.val_upi_TRANSACTION_NOTIFICATION,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnID]:pendigReq.txnId
      }
    }
    console.log("setAcceptCollectReq ", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }


    /**
   * request for reject collect request
   */
  setRejectCollectReq(formData,pendigReq) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_REJECTNOTIFICATION,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_reason]:formData.reason,
        [this.constant.key_upi_payerAddr]:pendigReq.payerAddress,
        [this.constant.key_upi_payeeVPA]:pendigReq.payeeAddress,
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_isSpam]:formData.spam ? "YES" : 'N',
        [this.constant.key_upi_txnID]:pendigReq.txnId
      }
    }
    console.log("setRejectCollectReq ", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

    /**
   * request parameter for setFavoritePayeeRequest
   */
  setAddFavoritePayeeRequest(pendingPayeeDetails) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_ADDFAVOURITES,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_paymentAddress]:pendingPayeeDetails.payeeAddress,
        [this.constant.key_upi_nickName]:pendingPayeeDetails.payeeName,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
      }
    }

    console.log('setFavoritePayeeRequest ', JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
   * Common function to set omni request for upi
   * @param upiRequestObj 
   */
  getOmniRequestObject(upiRequestObj) {
    var upiRequestObj = upiRequestObj;
    var inputData = {
      [this.constant.key_entityId]:this.constant.getEntityId(this.constant.val_entityId_UMOB),
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

  acceptNotificationApiCall(requestObj): Observable <any> {
    let subject = new Subject<any>();
    this.httpService.callBankingAPIService(requestObj, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ACCEPTNOTIFICATION:
            this.dataService.pendindReqResp = response;
            this.dataService.pendingBlockSuccessURL = 'pendingRequestUpi';
            console.log('upiserviceName_ACCEPTNOTIFICATION ', JSON.stringify(response));
            subject.next(true);
            subject.complete();
            // this.dataService.routeWithNgZone("pendingSuccess");
          break;
          default:
            subject.next(false);
            subject.complete();
          break;
        }
      } else {
        subject.next(false);
        subject.complete();
        this.dataService.routeWithNgZone("pendingRequestUpi");
      }
    }, error => {
      console.log("ERROR!", error);
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }
}
