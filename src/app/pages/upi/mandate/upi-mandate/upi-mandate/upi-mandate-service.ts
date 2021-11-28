import { Injectable, NgZone } from '@angular/core';
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
export class UPIMandateService {
 

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private httpService: HttpRestApiService,
    private ngZone: NgZone
  ) { }


  /**
   * request parameter for getMyMandateListReq
   */
  getMyMandateListReq() {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETMANDATETXNDETAIL,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_txnType]:this.constant.val_upi_MANDATE,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_beneListType]: this.constant.val_upi_All,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_beneListMode]: this.constant.val_upi_ANY,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi()
      }
    }
    console.log("getMyMandateListReq ", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
   * request parameter for revokeMandateRequest
   */
  revokeMandateRequest(NPCIResponse,pendingMandate : Mandate) {
    //This scenario is handled from scan QR revoke
    if(pendingMandate.refUrl == undefined && pendingMandate.orgTxnId == undefined){
      pendingMandate.refUrl = pendingMandate.refURL;
      pendingMandate.orgTxnId = pendingMandate.mandateTxnID;
    }
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_REVOKEMANDATE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_orgTxnID]:pendingMandate.orgTxnId,
        [this.constant.key_upi_purpose]:  pendingMandate.frequency != "ONETIME" ? '14' : '00',
        [this.constant.key_upi_mandateName]: pendingMandate.mandateName,
        [this.constant.key_upi_blockFund]: pendingMandate.frequency != "ONETIME" && pendingMandate.frequency != "DAILY" && pendingMandate.frequency != "ASPRESENTED" ? this.constant.val_upi_blockFund_N : this.constant.val_upi_blockFund,
        [this.constant.key_upi_txnType] : this.constant.val_upi_revoke_txnType,
        [this.constant.key_upi_shareToPayee]: pendingMandate.shareToPayee,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_credData]: this.dataService.getMandateInciatedBy(pendingMandate) == 'PAYEE' ? '': NPCIResponse?.credDataForJson ? NPCIResponse.credDataForJson :'', 
        [this.constant.key_upi_credCode]: this.dataService.getMandateInciatedBy(pendingMandate) == 'PAYEE' ? '': NPCIResponse?.credId ? NPCIResponse.credId : '',
        [this.constant.key_upi_mandateRuleType]: pendingMandate.recurrenceRuleType,// TODO for recurring
        [this.constant.key_upi_mandatePattern]:pendingMandate.frequency,
        [this.constant.key_upi_mandateValidityEnd]:pendingMandate.validityEnd,
        [this.constant.key_upi_initiatedChange]:pendingMandate.initiatedBy,
        [this.constant.key_upi_applicationFormNo]:"", // TODO
        [this.constant.key_upi_umn]:pendingMandate.umn,
        [this.constant.key_upi_credSubType]: this.dataService.getMandateInciatedBy(pendingMandate) == 'PAYEE' ? '': NPCIResponse?.credSubType ? NPCIResponse.credSubType :'',
        [this.constant.key_upi_payerName]:pendingMandate.payerName,
        [this.constant.key_upi_refID]: this.dataService.getMandateInciatedBy(pendingMandate) == 'PAYEE' ? this.dataService.payeeRevokeTransId: NPCIResponse.transactionId,
        [this.constant.key_upi_refUrl]: pendingMandate.refUrl,
        [this.constant.key_upi_ifsc]: pendingMandate.payerIfsc,
        [this.constant.key_upi_accType]:"", // TODO need accType from MW response
        [this.constant.key_upi_initiationMode]: this.constant.val_upi_mandate_initiationMode, // TODO
        [this.constant.key_upi_initiatedBy]: this.dataService.getMandateInciatedBy(pendingMandate),
        [this.constant.key_upi_txnID] : this.dataService.getMandateInciatedBy(pendingMandate) == 'PAYEE' ? this.dataService.payeeRevokeTransId: NPCIResponse.transactionId,
        [this.constant.key_upi_accNum]: pendingMandate.payerAccount,
        [this.constant.key_upi_payeeDetails]:[
          {
            [this.constant.key_upi_payeeName]:pendingMandate.payeeName,
            [this.constant.key_upi_payeeAddr]: pendingMandate.payeeAddress,
            [this.constant.key_upi_txnAmount]: pendingMandate.amount
          }
        ],
        [this.constant.key_upi_amountRule]:pendingMandate.amountRule,
        [this.constant.key_upi_mandateValidityStart]:pendingMandate.validityStart,
        [this.constant.key_upi_payMode]: this.constant.val_upi_payMode_PaymentAddress ,// TODO
        [this.constant.key_upi_addressType]: "ACCOUNT", // TODO,
        [this.constant.key_upi_credKi]: this.dataService.getMandateInciatedBy(pendingMandate) == 'PAYEE' ? '': NPCIResponse?.credkey ? NPCIResponse.credkey :'', // TODO : Add credKi
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_version]:this.constant.val_upi_app_version, 
        [this.constant.key_upi_mandateRuleValue]: pendingMandate.recurrenceRuleValue,
        [this.constant.key_upi_ipoNo]:'', //TODO
        [this.constant.key_upi_credType]:this.dataService.getMandateInciatedBy(pendingMandate) == 'PAYEE' ? '' :pendingMandate.credType,
        [this.constant.key_upi_payerAddr]:pendingMandate.payerAddress,
        [this.constant.key_upi_txnNote]: pendingMandate.remarks,
        [this.constant.key_upi_appID]: this.constant.val_upi_psb,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_remarks]: pendingMandate.remarks,
        [this.constant.key_upi_txnAmount] : pendingMandate.amount,
      }
    }
    console.log("revokeMandateRequest ", JSON.stringify(upiRequestObj));
    if(this.dataService.omniUPIFlow && !NPCIResponse?.credDataForJson){
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
    }else{
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_channel] =this.constant.val_upi_channel;
    }
    return this.getOmniRequestObject(upiRequestObj);
  }

  
  /**
   * request parameter for pauseUnpauseMandate
   */
   pauseUnpauseMandate(NPCIResponse,mandatePause,mandateDetails:Mandate) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: mandatePause ?  this.constant.upiserviceName_PAUSEMANDATE : this.constant.upiserviceName_UNPAUSEMANDATE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_orgTxnID]: mandateDetails.orgTxnId,
        [this.constant.key_upi_purpose]: mandateDetails.purpose,
        [this.constant.key_upi_mandateName]:mandateDetails.mandateName,
        [this.constant.key_upi_blockFund]: mandateDetails.frequency != "ONETIME" && mandateDetails.frequency != "DAILY" && mandateDetails.frequency != "ASPRESENTED" ? this.constant.val_upi_blockFund_N : this.constant.val_upi_blockFund,
        [this.constant.key_upi_txnType]: mandatePause ? this.constant.val_upi_mandatePauseTxnType : this.constant.val_upi_mandateUnpauseTxnType,
        [this.constant.key_upi_shareToPayee]: mandateDetails.shareToPayee,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_credData]:NPCIResponse?.credDataForJson ? NPCIResponse.credDataForJson : '',
        [this.constant.key_upi_credCode]:NPCIResponse?.credId ? NPCIResponse.credId : '',
        [this.constant.key_upi_mandateRuleType]:mandateDetails?.recurrenceRuleType ? mandateDetails?.recurrenceRuleType : '',
        [this.constant.key_upi_mandatePattern]: mandateDetails.frequency,
        [this.constant.key_upi_mandateValidityEnd]:mandateDetails.validityEnd,
        [this.constant.key_upi_applicationFormNo]:'', 
        [this.constant.key_upi_umn]:mandateDetails.umn,
        [this.constant.key_upi_credSubType]: mandateDetails.credSubType,
        [this.constant.key_upi_payerName]:mandateDetails.payerName,
        [this.constant.key_upi_refID]:NPCIResponse.transactionId,
        [this.constant.key_upi_refUrl]:mandateDetails.refUrl,
        [this.constant.key_upi_ifsc]:mandateDetails.payerIfsc,
        [this.constant.key_upi_accType]:'', //TODO : need accType from backend
        [this.constant.key_upi_initiationMode]: this.constant.val_upi_mandate_initiationMode,
        [this.constant.key_upi_initiatedBy]: 'PAYER',
        [this.constant.key_upi_txnID]:NPCIResponse.transactionId,
        [this.constant.key_upi_accNum]: mandateDetails.payerAccount,
        [this.constant.key_upi_payeeDetails]:[
          {
            [this.constant.key_upi_payeeName]:mandateDetails.payeeName,
            [this.constant.key_upi_payeeAddr]: mandateDetails.payeeAddress,
            [this.constant.key_upi_txnAmount]:mandateDetails.amount
          }
        ],
        [this.constant.key_upi_amountRule]:mandateDetails.amountRule,
        [this.constant.key_upi_mandateValidityStart]:mandateDetails.validityStart,
        [this.constant.key_upi_payMode]:this.constant.val_upi_PAYMENTADDRESS,
        [this.constant.key_upi_addressType]:this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_credKi]:NPCIResponse?.credkey ? NPCIResponse.credkey : '',
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_version]:this.constant.val_upi_app_version,
        [this.constant.key_upi_mandateRuleValue]: mandateDetails?.recurrenceRuleValue ? mandateDetails?.recurrenceRuleValue : '',
        [this.constant.key_upi_ipoNo]:'', 
        [this.constant.key_upi_credType]:NPCIResponse?.credType ? NPCIResponse.credType :'',
        [this.constant.key_upi_payerAddr]:mandateDetails.payerAddress,
        [this.constant.key_upi_txnNote]:mandateDetails.remarks,
        [this.constant.key_upi_appID]:this.constant.val_upi_psb,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_remarks]:mandateDetails.remarks,
        [this.constant.key_upi_txnAmount] :mandateDetails.amount,
      }
    }
    if(this.dataService.omniUPIFlow && !NPCIResponse?.credDataForJson){
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
    }else{
      upiRequestObj[this.constant.key_upi_channel] = this.constant.val_upi_channel;
    }
    console.log("pauseUnpauseMandate ", JSON.stringify(upiRequestObj));

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

  mandateApiCall(request): Observable <any> {
    console.log("i am here");
    console.log(request);
    let subject = new Subject<any>();
    this.httpService.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.dataService.declineMandateResp = response;
      this.ngZone.run(() => {
        if (response.status == "00") {
          switch (response.subActionId) {
            case this.constant.upiserviceName_REVOKEMANDATE:
              this.commonMethod.closePopup('div.popup-bottom.revokeMandate');
              this.dataService.mandateRevokeMsg = response.msg;
              console.log('upiserviceName_REVOKEMANDATE ', JSON.stringify(response));
              // this.commonMethod.openPopup('div.popup-bottom.revoke-success');
              if(this.dataService.preApprovedFlowIdentifier == "activeViewRevokeMandate" || this.dataService.preApprovedFlowIdentifier == "revokeViewRevokeMandate") {
                subject.next(true);
                subject.complete();
              } else {
                subject.next(false);
                subject.complete();
              }
            break;
            case this.constant.upiserviceName_PAUSEMANDATE:
              this.dataService.pauseUnpauseMsg = response.msg;
              // this.commonMethod.openPopup('div.popup-bottom.pauseUnpause-success');
              if(this.dataService.preApprovedFlowIdentifier == "activeViewPauseUnpauseMandate" || this.dataService.preApprovedFlowIdentifier == "revokeViewPauseUnpauseMandate") {
                subject.next(true);
                subject.complete();
              } else {
                subject.next(false);
                subject.complete();
              }
              break;
            case this.constant.upiserviceName_UNPAUSEMANDATE:
              // this.pauseUnpauseMsg = response.msg;
              this.dataService.pauseUnpauseMsg = response.msg;
              this.commonMethod.openPopup('div.popup-bottom.pauseUnpause-success');
              if(this.dataService.preApprovedFlowIdentifier == "activeViewPauseUnpauseMandate" || this.dataService.preApprovedFlowIdentifier == "revokeViewPauseUnpauseMandate") {
                subject.next(true);
                subject.complete();
              } else {
                subject.next(false);
                subject.complete();
              }
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
      });
    }, error => {
      console.log("ERROR!", error);
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }
}
