import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { PluginService } from 'src/app/services/plugin-service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanQrPaymentService {
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
  setPaymentRequest(selectedVpa, payeeDetails, NPCIResponse, QRScanData) {
    let splitAmount = QRScanData.splitAmount ? QRScanData.splitAmount : {};
    let merchantCode = QRScanData.mc ? QRScanData.mc : QRScanData.qrMerchantCode;
    let qrRefID = QRScanData.tr ? QRScanData.tr : QRScanData.qrReferenceNo;
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FUNDSTRANSFER,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_txnType]: this.constant.val_upi_PAY,
        [this.constant.key_upi_credData]: NPCIResponse?.credDataForJson ? NPCIResponse.credDataForJson : '',
        [this.constant.key_upi_credCode]: NPCIResponse?.credId ? NPCIResponse.credId : '',
        [this.constant.key_upi_payerIFSC]: selectedVpa.accountDetails.ifsc,
        [this.constant.key_upi_credSubType]: NPCIResponse?.credSubType ? NPCIResponse.credSubType :'',
        [this.constant.key_upi_payerName]: selectedVpa.accountDetails.custName,
        [this.constant.key_upi_refID]: qrRefID ? qrRefID : this.dataService.payReceiptTransId,
        [this.constant.key_upi_initiationMode]: QRScanData.mode ? QRScanData.mode : '00', // for BharatQR its set 03 as default initiation mode
        [this.constant.key_upi_refUrl]: QRScanData.url ? QRScanData.url : this.constant.val_upi_refUrl,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_is_Favourite]: "N",
        [this.constant.key_upi_txnID]:  QRScanData.tid ? QRScanData.tid : this.dataService.payReceiptTransId,
        // QRCode parameter
        [this.constant.key_upi_merchantCode]: QRScanData.mid ? QRScanData.mid : QRScanData.qrMerchantCode,
        [this.constant.key_upi_terminalId]: QRScanData.mtid,
        [this.constant.key_upi_msid]: QRScanData.msid,
        [this.constant.key_upi_tier]: QRScanData.tier,
        [this.constant.key_upi_pincode]: QRScanData.pinCode ? QRScanData.pinCode : QRScanData.qrMerchantPincode,
        [this.constant.key_upi_enTip]: this.dataService.upiPayRequest.enTipAmount.trim().replace(/[^.0-9]+/g, ''),
        [this.constant.key_upi_consentFlag]: this.dataService.upiPayRequest.consentFlag == true ? 'Y' : 'N',
        [this.constant.key_upi_gstBreakUp]: QRScanData.qrType == "GST" ? 'Y' : 'N',
        [this.constant.key_upi_gstIn]: QRScanData.gstIn,
        [this.constant.key_upi_accType]: selectedVpa.accountDetails.accTypeActual,
        [this.constant.key_upi_qrtr]: QRScanData.tr,
        [this.constant.key_upi_qrcu]: QRScanData.cu,
        [this.constant.key_upi_qrorgid]: QRScanData.orgid,
        [this.constant.key_upi_qrDetail]:
        {
          [this.constant.key_upi_qrExpire]: QRScanData.QRexpire,
          [this.constant.key_upi_qrMedium]: QRScanData.qrMedium,
          [this.constant.key_upi_qrTs]: QRScanData.QRts,
          [this.constant.key_upi_qVer]: QRScanData.ver,
        },
        [this.constant.key_upi_invoiceDetail]:
        {
          [this.constant.key_upi_invoiceDate]: QRScanData.invoiceDate,
          [this.constant.key_upi_invoiceName]: QRScanData.invoiceName,
          [this.constant.key_upi_invoiceNo]: QRScanData.invoiceNo,
        },
        [this.constant.key_upi_splitAmount]:
        {
          [this.constant.key_upi_cess]: splitAmount.CESS,
          [this.constant.key_upi_cgst]: splitAmount.CGST,
          [this.constant.key_upi_gst]: splitAmount.GST,
          [this.constant.key_upi_gstincentive]: splitAmount.GSTIncentive,
          [this.constant.key_upi_gstpct]: splitAmount.GSTPCT,
          [this.constant.key_upi_igst]: splitAmount.IGST,
          [this.constant.key_upi_sgst]: splitAmount.SGST,
        },
        [this.constant.key_upi_payeeDetails]:
          [
            {
              [this.constant.key_upi_payeeName]: payeeDetails.payeeName,
              [this.constant.key_upi_payeeAddr]: payeeDetails.payeeUpiAddress,
              [this.constant.key_upi_payeeCode]: merchantCode ? merchantCode : "0000",
              [this.constant.key_upi_txnAmount]: this.dataService.upiPayModelObj.txnAmount,
              [this.constant.key_upi_accNum]: payeeDetails.payeeActNo,
              [this.constant.key_upi_ifsc]: payeeDetails.payeeIfsc,
            }
          ],
        [this.constant.key_upi_payerAccountNo]: selectedVpa.accountDetails.accNum,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payMode]: payeeDetails.payMode,
        [this.constant.key_upi_credKi]: NPCIResponse?.credkey ?  NPCIResponse.credkey :'',
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_credType]: NPCIResponse?.credType ? NPCIResponse.credType : '',
        [this.constant.key_upi_payerAddr]: selectedVpa.vpaDetails.paymentAddress,
        [this.constant.key_upi_txnNote]: this.dataService.upiPayRequest.remarks,
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
        [this.constant.key_upi_txnAmount]: this.dataService.upiPayModelObj.txnAmount,
        [this.constant.key_upi_remarks]: this.dataService.upiPayRequest.remarks
      }
    }

    if(this.dataService.omniUPIFlow && !NPCIResponse?.credDataForJson){
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
    }
    console.log("setPayRequest", JSON.stringify(upiRequestObj));

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

  setDetails(response){
    this.dataService.payReceiptObj= response;
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
