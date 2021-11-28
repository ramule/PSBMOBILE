import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Mandate } from 'src/app/models/mandate-model';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { Observable, ObservedValueOf, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApproveMandateService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private httpService: HttpRestApiService
  ) { }


  /**
   * request parameter for setPendingWithMeRequest
   */
  approveMandateRequest(approveMandateDetail, NPCIResponse) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_ACCEPTMANDATE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_credKi]: NPCIResponse?.credkey ? NPCIResponse.credkey : '', // TODO : Add credKi
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_credData]: NPCIResponse?.credDataForJson ? NPCIResponse.credDataForJson :'', // TODO : Add credData
        [this.constant.key_upi_credCode]: NPCIResponse?.credId ? NPCIResponse.credId : '', // TODO : Add credCode
        [this.constant.key_upi_credType]: NPCIResponse?.credType ? NPCIResponse.credType : '',
        [this.constant.key_upi_txnNote]: approveMandateDetail.remarks,
        [this.constant.key_upi_credSubType]: NPCIResponse?.credSubType ?  NPCIResponse.credSubType :'',
        [this.constant.key_upi_refID]: approveMandateDetail.txnId,//approveMandateDetail.refId, //this.commonMethod.randomString(32,"PSB"),
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_initiationMode]: '11',// TODO : Add initiation Mode
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnAmount]: approveMandateDetail.amount,
        [this.constant.key_upi_txnID]: approveMandateDetail.txnId//NPCIResponse.transactionId
      }
    }

    if(this.dataService.omniUPIFlow && !NPCIResponse?.credDataForJson){
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
    }
    console.log("approveMandateRequest ", JSON.stringify(upiRequestObj));
    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
 * request parameter for setPendingWithMeRequest
 */
  approveMandateListRequest() {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_PENDINGREQUESTS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        // [this.constant.key_upi_credKi]:'', // TODO : Add credKi
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        // [this.constant.key_upi_credData]:'', // TODO : Add credData
        // [this.constant.key_upi_credCode]:'', // TODO : Add credCode
        // [this.constant.key_upi_credDType]:approveMandateDetail.credDType,
        // [this.constant.key_upi_txnNote]: approveMandateDetail.remarks,
        // [this.constant.key_upi_credSubType]:approveMandateDetail.credSubType,
        // [this.constant.key_upi_refID]: approveMandateDetail.refID,
        // [this.constant.key_upi_refUrl]:approveMandateDetail.refUrl,
        // [this.constant.key_upi_initiationMode] : '' ,// TODO : Add initiation Mode
        // [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        // [this.constant.key_upi_txnAmount] : approveMandateDetail.amount,
        // [this.constant.key_upi_txnID] : approveMandateDetail.txnId
      }
    }
    console.log("approveMandateRequest ", JSON.stringify(upiRequestObj));

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

  approveMandateApiCall(request): Observable<any> {
    let subject = new Subject<any>();
    this.httpService.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.dataService.approveMandateResp = response;
      this.dataService.upiCallTransactionHistoryApi = true;

      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ACCEPTMANDATE:
            console.log('upiserviceName_ACCEPTMANDATE ', JSON.stringify(response));
            // this.dataService.routeWithNgZone('approveMandateSuccess'); 
            subject.next(true);
            subject.complete(); 
          break;
          default:
            subject.next(false);
            subject.complete();
          break;
        }
      } else {
        subject.next(false);
        subject.complete();
        this.dataService.routeWithNgZone('upiMandate');
      }
    }, error => {
      subject.next(false);
      subject.complete();
      console.log("ERROR!", error);
    });
    return subject.asObservable();
  }
}
