import { Injectable, NgZone } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { PluginService } from 'src/app/services/plugin-service';
import { Router } from '@angular/router';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SelfTransferPaymentService {
  formValues: any;
  depositAccount: any;
  transferAccount: any;
  
  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private pluginService: PluginService,
    private router: Router,
    private httpService: HttpRestApiService,
    private ngZone: NgZone
  ) { }


  /**
   * request parameter for setCollectRecentRequest
   * @param formData 
   */
  setSelfTransferRequest(formData, depositAct, transferAct, NPCIResponse) {
    console.log("Inside setSelfTransferRequest");
    console.log('transferAct', transferAct)
  
    // this.dataService.selfTransReceiptTransId = transactionID;
    console.log('Expiry Date', this.dataService.selfTransferRequest.expiryTime)
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FUNDSTRANSFER,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_txnType]: this.constant.val_upi_PAY,
        [this.constant.key_upi_credData]: NPCIResponse?.credDataForJson ?  NPCIResponse.credDataForJson :'',
        [this.constant.key_upi_credCode]: NPCIResponse?.credId ? NPCIResponse.credId : '',
        [this.constant.key_upi_payerIFSC]: transferAct.ifsc,
        [this.constant.key_upi_credSubType]: NPCIResponse?.credSubType ? NPCIResponse.credSubType :'',
        [this.constant.key_upi_payerName]: transferAct.custName,
        [this.constant.key_upi_refID]: NPCIResponse?.transactionId ? NPCIResponse.transactionId :'',
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_is_Favourite]: "N",
        [this.constant.key_upi_txnID]: NPCIResponse.transactionId,
        [this.constant.key_upi_payeeCode]: transferAct.mcc,
        [this.constant.key_upi_payeeDetails]: [{
          [this.constant.key_upi_payeeName]: depositAct.custName,
          [this.constant.key_upi_payeeAddr]: depositAct.accNum + "@" + depositAct.ifsc  + ".ifsc.npci",
          [this.constant.key_upi_payeeCode]: transferAct.mcc,
          [this.constant.key_upi_txnAmount]: formData.amount.trim().replace(/[^.0-9]+/g, ''),
          [this.constant.key_upi_accNum]: depositAct.accNum,
          [this.constant.key_upi_ifsc]: depositAct.ifsc,
        }],
        [this.constant.key_upi_payerAccountNo]: transferAct.accNum,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payMode]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_credKi]: NPCIResponse?.credkey ? NPCIResponse.credkey : '',
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_credType]: NPCIResponse?.credType ? NPCIResponse.credType : '',
        [this.constant.key_upi_payerAddr]: transferAct.paymentAddress,
        [this.constant.key_upi_txnNote]: formData.remarks,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        // {
        //   [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
        //   [this.constant.key_upi_capability]: this.constant.val_upi_capability,
        //   [this.constant.key_upi_lng]: this.dataService.longitude ? this.dataService.longitude : "0",
        //   [this.constant.key_upi_lat]: this.dataService.latitude ? this.dataService.latitude : "0",
        //   [this.constant.key_upi_os]: this.dataService.platform,
        //   [this.constant.key_upi_ip]: this.dataService.ipAddress,
        //   [this.constant.key_upi_location]: "Kshirsamudra, Maharashtra",
        //   [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        //   [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
        // },
        [this.constant.key_upi_txnAmount]: formData.amount.trim().replace(/[^.0-9]+/g, ''),
        [this.constant.key_upi_remarks]: formData.remarks,
        [this.constant.key_upi_accType] : transferAct.accTypeActual,
        [this.constant.key_upi_isSelfTransfer] : 'Y'
      }
    }
    if(this.dataService.omniUPIFlow && !NPCIResponse?.credDataForJson){
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
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
   * Common function to encrypt the request
   * @param inputData 
   */
  getEncryptedOmniRequestObject(inputData) {
    console.log('session Key : ', this.storage.getSessionStorage(this.constant.val_sessionKey))
    // let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
    return encryptData;
  }

  selfTransferApiCall(requestObject) : Observable<any> {
    let subject = new Subject<any>();
    this.httpService.callBankingAPIService(requestObject, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.setDetails(response);
            // this.dataService.routeWithNgZone('selfTransferSuccess');
            subject.next(true);
            subject.complete();
          break;
          default:
            subject.next(false);
            subject.complete();
          break;
        }
      } else {
        this.setDetails(response);
        subject.next(false);
        subject.complete();
      }
    }, error => {
      subject.next(false);
      subject.complete();
      console.log("ERROR!", error);
    });
    return subject.asObservable();
  }

  setDetails(response) {
    this.dataService.selfTransReceiptObj = response;
    let remarks = this.formValues.remarks;
    let amount = this.formValues.amount;
    this.dataService.selfTransReceiptObj.remarks = remarks;
    this.dataService.selfTransReceiptObj.payeeName = this.depositAccount.custName;
    this.dataService.selfTransReceiptObj.payeeAccType = this.depositAccount.accType
    this.dataService.selfTransReceiptObj.payeeMaskedAccountNumber = this.depositAccount.maskedAccountNumber
    this.dataService.selfTransReceiptObj.payeePaymentAddress = this.depositAccount.accNum + "@" + this.depositAccount.ifsc  + ".ifsc.npci";
    this.dataService.selfTransReceiptObj.payeeBankName = this.depositAccount.payeeBankName;
    this.dataService.selfTransReceiptObj.payeeIfsc = this.depositAccount.payeeIfsc;
    this.dataService.selfTransReceiptObj.payeeActNo = this.depositAccount.payeeActNo;
    this.dataService.selfTransReceiptObj.payerPaymentAddress = this.transferAccount.paymentAddress;
    this.dataService.selfTransReceiptObj.payReceiptTransId = this.dataService.payReceiptTransId;
    this.dataService.selfTransReceiptObj.payerAccType = this.transferAccount.accType
    this.dataService.selfTransReceiptObj.payerMaskedAccountNumber = this.transferAccount.maskedAccountNumber;
  }

}
