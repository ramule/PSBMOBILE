import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Mandate } from 'src/app/models/mandate-model';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModifyMandateService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private httpRestApiService: HttpRestApiService
  ) { }


  /**
   * request parameter for setPendingWithMeRequest
   */
  modifyMandateRequest(NPCIResponse,mandateDetails : Mandate,MandateFormDetails) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_EDITMANDATE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_orgTxnID]: mandateDetails.orgTxnId,
        [this.constant.key_upi_purpose]: mandateDetails.frequency != "ONETIME" ? '14' : '00',
        [this.constant.key_upi_mandateName]:mandateDetails.mandateName,
        [this.constant.key_upi_blockFund]: mandateDetails.frequency != "ONETIME" && mandateDetails.frequency != "DAILY" && mandateDetails.frequency != "ASPRESENTED" ? this.constant.val_upi_blockFund_N : this.constant.val_upi_blockFund,
        [this.constant.key_upi_txnType]:this.constant.val_upi_mandateUpdateTxnType,
        [this.constant.key_upi_shareToPayee]: mandateDetails.shareToPayee,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_credData]: this.dataService.getMandateInciatedBy(mandateDetails) == 'PAYEE' ? '': NPCIResponse?.credDataForJson ? NPCIResponse.credDataForJson :'',
        [this.constant.key_upi_credCode]: this.dataService.getMandateInciatedBy(mandateDetails) == 'PAYEE' ? '': NPCIResponse?.credId ? NPCIResponse.credId :'',
        [this.constant.key_upi_mandateRuleType]:mandateDetails?.recurrenceRuleType ? mandateDetails?.recurrenceRuleType : '',
        [this.constant.key_upi_mandatePattern]: mandateDetails.frequency,
        [this.constant.key_upi_mandateValidityEnd]:MandateFormDetails.validyEndDate.replace(/\//g,''),
        [this.constant.key_upi_applicationFormNo]:'', 
        [this.constant.key_upi_umn]:mandateDetails.umn,
        [this.constant.key_upi_credSubType]: mandateDetails.credSubType,
        [this.constant.key_upi_payerName]:mandateDetails.payerName,
        [this.constant.key_upi_refID]: this.dataService.getMandateInciatedBy(mandateDetails) == 'PAYEE' ? this.dataService.payeeRevokeTransId : NPCIResponse.transactionId,
        [this.constant.key_upi_refUrl]:mandateDetails.refUrl,
        [this.constant.key_upi_ifsc]:mandateDetails.payerIfsc,
        [this.constant.key_upi_accType]:'', //TODO : need accType from backend
        [this.constant.key_upi_initiationMode]: this.constant.val_upi_mandate_initiationMode,
        [this.constant.key_upi_initiatedBy]: mandateDetails.initiatedBy,
        [this.constant.key_upi_txnID]: this.dataService.getMandateInciatedBy(mandateDetails) == 'PAYEE' ? this.dataService.payeeRevokeTransId : NPCIResponse.transactionId,
        [this.constant.key_upi_accNum]: mandateDetails.payerAccount,
        [this.constant.key_upi_payeeDetails]:[
          {
            [this.constant.key_upi_payeeName]:mandateDetails.payeeName,
            [this.constant.key_upi_payeeAddr]: mandateDetails.payeeAddress,
            [this.constant.key_upi_txnAmount]:MandateFormDetails.amount.trim().replace(/[^.0-9]+/g,'')
          }
        ],
        [this.constant.key_upi_amountRule]:mandateDetails.amountRule,
        [this.constant.key_upi_mandateValidityStart]:mandateDetails.validityStart,
        [this.constant.key_upi_payMode]:this.constant.val_upi_PAYMENTADDRESS,
        [this.constant.key_upi_addressType]:this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_credKi]: this.dataService.getMandateInciatedBy(mandateDetails) == 'PAYEE' ? '' : NPCIResponse?.credkey ? NPCIResponse.credkey :'',
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_version]:this.constant.val_upi_app_version,
        [this.constant.key_upi_mandateRuleValue]: mandateDetails?.recurrenceRuleValue ? mandateDetails?.recurrenceRuleValue : '',
        [this.constant.key_upi_ipoNo]:'', 
        [this.constant.key_upi_credType]: this.dataService.getMandateInciatedBy(mandateDetails) == 'PAYEE' ? '' : NPCIResponse?.credType ? NPCIResponse.credType :'',
        [this.constant.key_upi_payerAddr]:mandateDetails.payerAddress,
        [this.constant.key_upi_txnNote]:mandateDetails.remarks,
        [this.constant.key_upi_appID]:this.constant.val_upi_psb,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_remarks]:mandateDetails.remarks,
        [this.constant.key_upi_txnAmount] :MandateFormDetails.amount.trim().replace(/[^.0-9]+/g,''),
      }
    }

    if(this.dataService.omniUPIFlow && !NPCIResponse?.credDataForJson){
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
    }else{
      upiRequestObj[this.constant.key_upi_channel] = this.constant.val_upi_channel;
    }
    console.log("modifyMandateRequest ", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }


  /**
   * Common function to set omni request for upi
   * @param upiRequestObj 
   */
  getOmniRequestObject(upiRequestObj) {
    var upiRequestObj = upiRequestObj;
    var inputData = {
      [this.constant.key_entityId]:this.constant.getEntityId("UMOBILE"),
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
  
  editMandateApiCall(request): Observable<any> {
    let subject = new Subject<any>();
    this.httpRestApiService.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.dataService.modifyMandateResp = response;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_EDITMANDATE:
            console.log('upiserviceName_EDITMANDATE ', JSON.stringify(response));
            // this.dataService.routeWithNgZone("modifyMandateSuccess");
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
      }
    }, error => {
      console.log("ERROR!", error);
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }

}
