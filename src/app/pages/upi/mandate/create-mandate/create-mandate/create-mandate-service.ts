import { Injectable, NgZone } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Mandate, MandatePayment } from '../../../../../models/mandate-model';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateMandateService {
 latitude: any;
 longitude: any;
 userLocationName: any;

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private httpService : HttpRestApiService
  ) { }

  getUserLocation() {   
    // this.dataService.getCurrentLatLong().subscribe((data) => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Success => ', data);
    //   console.log(this.dataService.latitude);
    //   console.log(this.dataService.longitude);

      this.latitude = this.dataService.latitude ? this.dataService.latitude : "0";
      this.longitude = this.dataService.longitude ? this.dataService.longitude : "0";

      // this.dataService.getUserLocationName(this.latitude, this.longitude).subscribe((data) => {
      //   console.log('data', data);
      //   console.log("dataservice.userLocationName => ", this.dataService.userLocationName);
        this.userLocationName = this.dataService.userLocationName;
    //   }, (err) => {
    //     console.log('err', err);
    //   });
    // }, err => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
    // });
  }


  /**
   * request parameter for create Mandate
   */
  createMandateReq(NPCIResponse) {
    let  createMandatePayment: MandatePayment = this.dataService.createMandatePayment;
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_PAYMANDATE,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_purpose]: createMandatePayment.frequency != "ONETIME" ? '14' : '00', 
        [this.constant.key_upi_mandateName]: 'Default', //TODO: change this after getting NPCI connectivity
        [this.constant.key_upi_blockFund]: createMandatePayment.frequency != "ONETIME" && createMandatePayment.frequency != "DAILY" && createMandatePayment.frequency != "ASPRESENTED" ? this.constant.val_upi_blockFund_N : this.constant.val_upi_blockFund,
        [this.constant.key_upi_shareToPayee]:createMandatePayment.notifyPayee,
        [this.constant.key_upi_credData]:NPCIResponse?.credDataForJson ? NPCIResponse.credDataForJson : '',
        [this.constant.key_upi_credCode]:NPCIResponse?.credId ? NPCIResponse.credId : '', 
        [this.constant.key_upi_mandateRuleType]:createMandatePayment.frequency != "ONETIME" && createMandatePayment.frequency != "DAILY" && createMandatePayment.frequency != "ASPRESENTED" ? createMandatePayment.debitDay: '', 
        [this.constant.key_upi_mandatePattern]:createMandatePayment.frequency,
        [this.constant.key_upi_applicationFormNo]:"", 
        [this.constant.key_upi_mandateValidityEnd]:createMandatePayment.validityEndDate.replace(/\\|\//g,''),
        [this.constant.key_upi_credSubType]: NPCIResponse?.credSubType ? NPCIResponse.credSubType : '',
        [this.constant.key_npci_payerName]:createMandatePayment.selectedVpa.vpaDetails.custName,
        [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
        [this.constant.key_upi_ifsc]: createMandatePayment.selectedVpa.accountDetails.ifsc,
        [this.constant.key_upi_accType]: createMandatePayment.selectedVpa.accountDetails.accTypeActual,
        [this.constant.key_upi_initiationMode]: this.constant.val_upi_mandate_initiationMode,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_txnType]:this.constant.val_upi_mandateTxnType,
        [this.constant.key_upi_refID]:  NPCIResponse.transactionId,
        [this.constant.key_upi_txnID]: NPCIResponse.transactionId,
        [this.constant.key_upi_accNum]: createMandatePayment.selectedVpa.accountDetails.accNum ,
        [this.constant.key_upi_payeeDetails]:
        [
          {
            [this.constant.key_upi_payeeName]: createMandatePayment.payeeName,
            [this.constant.key_upi_payeeAddr]: createMandatePayment.toPayee,
            [this.constant.key_upi_txnAmount]: createMandatePayment.amount.trim().replace(/[^.0-9]+/g,''),
          }
        ],
        [this.constant.key_upi_mandateValidityStart]:createMandatePayment.validityStartDate.replace(/\\|\//g,''),
        [this.constant.key_upi_amountRule]: this.constant.val_upi_amountRuleEXACT,
        [this.constant.key_upi_addressType]: this.constant.val_upi_ACCOUNT,
        [this.constant.key_upi_payMode]: this.constant.val_upi_PAYMENTADDRESS,
        [this.constant.key_upi_credKi]:NPCIResponse?.credkey ? NPCIResponse.credkey : '',
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_version]:this.constant.val_upi_app_version, 
        [this.constant.key_upi_mandateRuleValue]: createMandatePayment.frequency != "ONETIME" ? createMandatePayment.validityStartDate.replace(/\\|\//g,'') : '',
        [this.constant.key_upi_ipoNo]:'',
        [this.constant.key_upi_credType]: NPCIResponse?.credType ? NPCIResponse.credType :'',
        [this.constant.key_upi_payerAddr]: createMandatePayment.selectedVpa.vpaDetails.paymentAddress,
        [this.constant.key_upi_appID]: this.constant.val_upi_psb,
        [this.constant.key_upi_txnNote]:createMandatePayment.remarks,
        [this.constant.key_upi_device]:this.dataService.getDeviceObjectForUpi(),
        [this.constant.key_upi_txnAmount]: createMandatePayment.amount.trim().replace(/[^.0-9]+/g,''),
        [this.constant.key_upi_remarks]:createMandatePayment.remarks
      }
    }
    console.log("createMandateReq ", JSON.stringify(upiRequestObj));
    if(this.dataService.omniUPIFlow && !NPCIResponse?.credDataForJson){
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_channel] = this.constant.val_upi_MBANKING;
    }else{
      upiRequestObj[this.constant.key_upi_channel] = this.constant.val_upi_channel;
    }
    return this.getOmniRequestObject(upiRequestObj);
  }


  /**
   * request parameter for setRecentRequest
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
        [this.constant.key_upi_beneListMode]: this.constant.val_upi_VPA,
        [this.constant.key_upi_device]:
        {
          [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
          [this.constant.key_upi_capability]: this.constant.val_upi_capability,
          [this.constant.key_upi_lng]: this.longitude,
          [this.constant.key_upi_lat]: this.latitude,
          [this.constant.key_upi_os]: this.dataService.platform,
          [this.constant.key_upi_ip]: this.dataService.ipAddress,
          [this.constant.key_upi_location]: this.userLocationName,
          [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
        }
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
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo))
      }
    }

    console.log('setFavoritePayeeRequest ', JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }

  /**
    * request parameter for setValidateRequest
    */
  setValidateRequest(formData,defaultVPAAccDetails,transactionID) {
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
        [this.constant.key_upi_txnNote]: this.constant.val_upi_CreateMandate,
        [this.constant.key_upi_payerName]: defaultVPAAccDetails.vpaDetails.paymentAddress,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_refID]: this.commonMethod.randomString(32,"PSB"),
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
        [this.constant.key_upi_paymentAddress]:this.dataService.validateAddressResp.validatedVpa,
        [this.constant.key_upi_nickName]:this.dataService.validateAddressResp.MASKNAME,
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
        [this.constant.key_upi_beneMobileNo] : this.commonMethod.processPhoneNo(mobileNo),
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
  
  payMandateApiCall(request): Observable<any>  {
    let subject = new Subject<any>();
    this.httpService.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let upiResponse = data.responseParameter.upiResponse;
      this.dataService.createMandateResp = upiResponse;
      this.dataService.upiCallTransactionHistoryApi = true;
      console.log('CreateMAndate Service => dataService.createMandateResp', this.dataService.createMandateResp);
      if (upiResponse.status == "00") {
        switch (upiResponse.subActionId) {
          case this.constant.upiserviceName_PAYMANDATE:
            subject.next(true);
            subject.complete();
            // this.dataService.routeWithNgZone("createMandateSuccess");
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
