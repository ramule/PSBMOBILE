import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { PluginService } from '../../../services/plugin-service';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TrackStatusService {
  latitude: any;
  longitude: any;
  selectedVpa: any;
  scanQrFormValues: any;
  payeeObj: any;
  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private pluginService: PluginService,
    private http: HttpRestApiService
  ) { }


  /**
   * request parameter for setCollectRecentRequest
   * @param formData 
   */
  getTrackStatusReq(transactionDtl, transactionId) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_TRACKSTATUS,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_orgTxnID]: transactionDtl.transactionID,
        [this.constant.key_upi_txnID]: transactionId,
        [this.constant.key_upi_refID]: transactionId,
        [this.constant.key_upi_txnType]: this.constant.val_upi_CHKTXN,
        [this.constant.key_upi_rrn]: transactionDtl.rrn,
        [this.constant.key_upi_remarks]: this.constant.val_upi_UDIR_RE_NA,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_initiationMode]: transactionDtl.initiationMode,
        [this.constant.key_upi_purpose]: '00',
        [this.constant.key_upi_txnDateTime]: moment(transactionDtl.transactionDate).format(),
        [this.constant.key_upi_refCategory]: '00',
      }
    }
    console.log("getTrackStatusReq", JSON.stringify(upiRequestObj));

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

  fundsTransferApiCall(request): Observable<any> {
    let subject = new Subject<any>();
    this.http.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.setDetails(response);
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
      console.log("ERROR!", error);
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }

  setDetails(response) {
    this.dataService.payReceiptObj = response;
    // let { remarks, amount } = this.scanQrAmountForm.value;
    this.dataService.payReceiptObj.remarks = this.dataService.upiPayRequest.remarks;
    this.dataService.payReceiptObj.amount = this.dataService.upiPayModelObj.txnAmount;
    this.dataService.payReceiptObj.payeeName = this.dataService.payeeObj.payeeName;
    this.dataService.payReceiptObj.payeeUpiAddress = this.dataService.payeeObj.payeeUpiAddress;
    this.dataService.payReceiptObj.payeeBankName = this.dataService.payeeObj.payeeBankName;
    this.dataService.payReceiptObj.payeeIfsc = this.dataService.payeeObj.payeeIfsc;
    this.dataService.payReceiptObj.payeeActNo = this.dataService.payeeObj.payeeActNo;
    this.dataService.payReceiptObj.selectedVpa = this.dataService.selectedVpaDetailsPay;
    this.dataService.payReceiptObj.refURL = this.dataService.ScanQrCodeData.url;
  }

}
