import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';

import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayUpiPaymentService {
  latitude: any;
  longitude: any;
  userLocationName: any;
  // preApprovedEncData: any;
  selectedVpa: any;
  payAmtFormValues: any;
  payeeObj: any;
  transactionId: any;

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private httpService: HttpRestApiService
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
    * @param formData
    */
   setPaymentRequest(upiPayReqDetails, selectedVpa, payeeDetails, NPCIResponse) {
    console.log('Expiry Date',upiPayReqDetails.expiryTime)
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_FUNDSTRANSFER,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_txnType]: this.constant.val_upi_PAY,
        [this.constant.key_upi_credData]: NPCIResponse?.credDataForJson ? NPCIResponse.credDataForJson :'',
        [this.constant.key_upi_credCode]: NPCIResponse?.credId ? NPCIResponse.credId: '',
        [this.constant.key_upi_payerIFSC]: selectedVpa.accountDetails.ifsc,
        [this.constant.key_upi_credSubType]: NPCIResponse?.credSubType ? NPCIResponse.credSubType : '',
        [this.constant.key_upi_payerName]: selectedVpa.accountDetails.custName,
        [this.constant.key_upi_refID]: NPCIResponse.transactionId,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_language]:this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_is_Favourite]: "N",
        [this.constant.key_upi_txnID]: NPCIResponse.transactionId,
        [this.constant.key_upi_payeeCode]: this.dataService.verifyAddressResp.CODE,
        [this.constant.key_upi_payeeDetails]: [{
          [this.constant.key_upi_payeeName]: payeeDetails.payeeName,
          [this.constant.key_upi_payeeAddr]: payeeDetails.payeeUpiAddress,
          [this.constant.key_upi_payeeCode]: this.dataService.verifyAddressResp.CODE,
          [this.constant.key_upi_txnAmount]: this.dataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g,''),
          [this.constant.key_upi_accNum]: payeeDetails.payeeActNo,
          [this.constant.key_upi_ifsc]: payeeDetails.payeeIfsc,
        }],
        [this.constant.key_upi_payerAccountNo]: selectedVpa.accountDetails.accNum,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payMode]: payeeDetails.payMode,
        [this.constant.key_upi_credKi]: NPCIResponse?.credkey ? NPCIResponse.credkey : '',
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_credType]: NPCIResponse?.credType ? NPCIResponse.credType : '', //this.constant.val_upi_PIN,
        [this.constant.key_upi_payerAddr]: selectedVpa.vpaDetails.paymentAddress,
        [this.constant.key_upi_txnNote]: this.dataService.upiPayRequest.remarks,
        [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnAmount]: this.dataService.upiPayRequest.amount.trim().replace(/[^.0-9]+/g,''),
        [this.constant.key_upi_remarks]: this.dataService.upiPayRequest.remarks,
        [this.constant.key_upi_accType] : selectedVpa.accountDetails.accTypeActual
      }
    }
    console.log("setPayRequest", JSON.stringify(upiRequestObj));
    if(this.dataService.omniUPIFlow && !NPCIResponse?.credDataForJson){
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
    }
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

  getSystemConfigurationRequest() {
    let upiReqObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETSYSTEMCONFIRGURATION,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      }
    }

    let omniReqObj = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.dataService.platform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.dataService.uuid,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiReqObj)
    };

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(omniReqObj));
    console.log('encryptData => ', JSON.stringify(encryptData));
    return encryptData;

  }

  fundTransferApiCall(NPCIResponse): Observable<any>  {
    let subject = new Subject<any>();
    let currentDate = moment().format('YYYY-MM-DD');
    let currentTime = moment.duration(moment().format('HH:mm'),"minutes");
    let time = moment.duration(moment(this.dataService.upiPayRequest.time).format('HH:mm'),"minutes");
    let expiryDate = moment(this.dataService.upiPayRequest.date).format('YYYY-MM-DD');
    let actualExpDateDiffInMins = moment(expiryDate).diff(currentDate,'minutes');
    let expiryTime = moment.duration(time, "minutes");
    let actualTimeDiffInMins = expiryTime.subtract(currentTime).minutes();
    let expirationMin = actualExpDateDiffInMins + actualTimeDiffInMins;
    this.dataService.upiPayRequest.expiryTime = expirationMin.toString();
    this.getUserLocation();
    this.payeeObj = this.dataService.payeeObj;
    this.selectedVpa = this.dataService.selectedVpaDetailsPay;

    console.log("Setting request object...");
    console.log('this.dataService.upiPayRequest', this.dataService.upiPayRequest);
    console.log('this.payeeObj', this.payeeObj);
    console.log('this.selectedVpa', this.selectedVpa);

    let requestObj = this.setPaymentRequest(this.dataService.upiPayRequest, this.selectedVpa, this.payeeObj, NPCIResponse);

    this.httpService.callBankingAPIService(requestObj, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.dataService.upiCallTransactionHistoryApi = true;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.setDetails(response,NPCIResponse);
            subject.next({isPaymentSuccessful:true});
            subject.complete();
            // this.dataService.routeWithNgZone("payUpiSuccess");
          break;
          default:
            subject.next({isPaymentSuccessful:false,errorMsg:response.msg});
            subject.complete();
          break;
        }
      } else {
        this.commonMethod.closePopup('div.popup-bottom.show-common-error');
        this.setDetails(response,NPCIResponse);
        subject.next({isPaymentSuccessful:false,errorMsg:response.msg});
        subject.complete();
      }
    }, error => {
      // subject.next({isPaymentSuccessful:false,errorMsg:response.msg});
      // subject.complete();
      console.log("ERROR!", error);
    });
    return subject.asObservable();
  }

  setDetails(response,NPCIResponse){
    this.dataService.payReceiptObj= response;
    let amount = this.dataService.upiPayRequest.amount;
    let remarks = this.dataService.upiPayRequest.remarks;
    this.dataService.payReceiptObj.remarks = remarks;
    this.dataService.payReceiptObj.amount = amount;
    this.dataService.payReceiptObj.payType = this.dataService.verifyAddressResp.payType;
    this.dataService.payReceiptObj.payeeName = this.payeeObj.payeeName;
    this.dataService.payReceiptObj.payeeUpiAddress = this.payeeObj.payeeUpiAddress;
    this.dataService.payReceiptObj.payeeBankName = this.payeeObj.payeeBankName;
    this.dataService.payReceiptObj.payeeIfsc = this.payeeObj.payeeIfsc
    this.dataService.payReceiptObj.payeeActNo = this.payeeObj.payeeActNo
    this.dataService.payReceiptObj.selectedVpa = this.dataService.selectedVpaDetailsPay;
    this.dataService.payReceiptObj.payReceiptTransId = NPCIResponse.transactionId;
  }
}
