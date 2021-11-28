import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constant';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { LocalStorageService } from './local-storage-service.service';
import { DataService } from './data.service';
import { CommonMethods } from '../utilities/common-methods';
import { Observable, Subject } from 'rxjs';
import { HttpRestApiService } from './http-rest-api.service';
import { UPIBankAccount } from '../models/account-detail-model';
import { TranslatePipe } from '../pipes/translate.pipe';
import { PluginService } from './plugin-service';
import { pageLoaderService } from './pageloader.service';
import * as moment from 'moment';

declare var showToastMessage;
declare var cordova: any;

@Injectable({
  providedIn: 'root'
})

export class NpciAndroidService {

  mobileNumber: string = "";
  deviceId: string = "";
  xmlPayloadValue: any = "";
  xmlCallFromDashboard: boolean = false;
  npciFlowIdentifier: string = "";
  npciCredCounter: number = 0;
  token: any;
  accountDetails: any;
  finalCredResponseModel: any;
  entityId: string = "";
  upiMobileNumber: string = "";
  appVersion: string = "";
  clientAppVersion: string = "";
  locale: string = "";
  packageName: string = "";
  type: string = "";
  refUrl: string = "";
  currentLanguage: string = "";
  tokenValue: string = "";
  tokenExpiry: string = "";
  upiPayModelObj: any;
  omniApiName: string = "";
  encryptKey: string = "";
  selectedFlow: string = "";
  isFromModifyMandate: boolean = false;
  upiCreateMandateModel = { txnId: '', payerVPA: '', payeeVPA: '', txnAmount: '', payeeName: '' };
  selectedMandateDetails = { txnId: '', payerVPA: '', payeeVPA: '', txnAmount: '', payeeName: '' };
  credTypeValue: string = "";
  transactionId: string = "";

  constructor(private constant: AppConstants, private encryptDecryptService: EncryptDecryptService, private localStorageService: LocalStorageService, private commonMethod: CommonMethods, private dataService: DataService, private httpService: HttpRestApiService, private translatePipe: TranslatePipe, private pluginService: PluginService, private loaderService: pageLoaderService) { }

  subject: any;

  initData() {
    this.mobileNumber = this.localStorageService.getLocalStorage(this.constant.storage_mobileNo);
    this.upiMobileNumber = this.commonMethod.processPhoneNo(this.mobileNumber);
    this.deviceId = this.localStorageService.getLocalStorage(this.constant.key_deviceId);
    this.entityId = this.constant.val_upi_psb;
    this.appVersion = this.constant.val_upi_app_version;
    this.clientAppVersion = this.constant.val_clientAppVersion;
    this.locale = this.dataService.getSelectedLanguageCodeUPI();
    this.packageName = this.constant.val_app_pakage_name;
    this.type = "initial";
    this.refUrl = this.constant.val_upi_refUrl;
    this.currentLanguage = this.dataService.getSelectedLanguageCodeUPI();
    this.token = "";
    this.tokenValue = "";
    this.tokenExpiry = "";

    if (this.localStorageService.getSessionStorage(this.constant.val_sessionKey)) {
      this.omniApiName = this.constant.upiserviceName_PROCESSUPISERVICESESSION;
      this.encryptKey = this.localStorageService.getSessionStorage(this.constant.val_sessionKey) ? this.localStorageService.getSessionStorage(this.constant.val_sessionKey) : "";
    } else {
      this.omniApiName = this.constant.upiserviceName_PROCESSUPISERVICE;
      this.encryptKey = this.mobileNumber + this.constant.mapEncryptKey;
    }
  }

  androidStartCLLibrary(accountDetails: UPIBankAccount, flowIdentifier, subject?): Observable<any> {
    this.loaderService.showLoader();
    this.npciFlowIdentifier = flowIdentifier;
    this.accountDetails = accountDetails;
    this.subject = subject;

    if (this.localStorageService.hasKeyLocalStorage('NpciToken') && (this.localStorageService.hasKeyLocalStorage('NpciTokenExpiry'))) {
      this.tokenValue = this.localStorageService.getLocalStorage('NpciToken');
      this.tokenExpiry = this.localStorageService.getLocalStorage('NpciTokenExpiry');
    }

    this.setNpciVariables(this.pluginService.getDeviceUUID(), this.commonMethod.processPhoneNo(this.mobileNumber), this.packageName, this.refUrl, this.currentLanguage, this.entityId, this.tokenValue, this.tokenExpiry);
    this.startCLService(this.type);
    return this.subject.asObservable();
  }

  setNpciVariables(deviceId, mobileNo, id, url, locale, entity, tokenValue, expiry) {
    console.log("calling setNpciVariables...");
    let paramObj = {
      "deviceId": deviceId,
      "mobileNo": mobileNo,
      "id": id,
      "url": url,
      "locale": locale,
      "entity": entity,
      "tokenValue": tokenValue,
      "expiry": expiry,
      "algo": "AES",
      "padding": "AES/CBC/PKCS5Padding"
    };

    cordova.plugins.npciAndroidPlugin.setNPCIVariables(paramObj, (d) => {
      console.log("setNPCIVariables Success => ", d);
    }, (e) => {
      this.loaderService.hideLoader();
      console.log("setNPCIVariables Error => ", e);
    });
  }

  startCLService(type) {
    console.log("calling startCLService...");
    this.dataService.isCredCallbackSuccess = false;
    cordova.plugins.npciAndroidPlugin.startCLService(type, this.npciCLInitCallback.bind(this), (e) => {
      console.log("startCLService Error => ", e);
      this.loaderService.hideLoader();
    });
  }

  npciCLInitCallback(data) {
    console.log("npciCLInitCallback data => ", data);

    try {
      let response = JSON.parse(data);
      console.log(response);

      if (response.status == "00") {
        if (response.registered == true) {
          if (this.dataService.isEmpty(this.xmlPayloadValue)) {
            this.xmlCallFromDashboard = false;
            this.getXMLPayloadService();
          } else {
            this.npciContinueExecutionPostXML();
          }
        } else {
          if (response.challenge === "") {
            this.loaderService.hideLoader();
            //Error
            showToastMessage(this.translatePipe.transform("error_something_went_wrong1"), "error");
            console.log("error_something_went_wrong1");

          } else {
            //Get Token Service call
            this.getTokenServices(response.challenge, response.tokenType);
          }
        }
      } else {
        //Error
        this.loaderService.hideLoader();
        showToastMessage(this.translatePipe.transform("error_something_went_wrong2"), "error");
        console.log("error_something_went_wrong2");
      }
    } catch (error) {
      this.loaderService.hideLoader();
      showToastMessage(this.translatePipe.transform("error_something_went_wrong3"), "error");
      console.log("error_something_went_wrong3", error);
    }
  }

  getXMLPayloadService() {
    console.log("calling getXMLPayloadService...");
    try {
      let upiReqJson = {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_npci_mobileNo]: this.commonMethod.processPhoneNo(this.mobileNumber),
        [this.constant.key_npci_subAction]: this.constant.upiserviceName_GetListKeysString,
        [this.constant.key_npci_inputParam]: {
          [this.constant.key_npci_appVersion]: this.constant.val_upi_app_version,
          [this.constant.key_npci_language]: this.currentLanguage,
          [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
          [this.constant.key_upi_device]: this.dataService.getDeviceObjectForUpi(),
        }
      };

      let omniReqJson = {
        [this.constant.key_npci_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
        [this.constant.key_npci_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_npci_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_npci_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_npci_deviceId]: this.localStorageService.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_npci_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_npci_upiRequest]: JSON.stringify(upiReqJson)
      };

      let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(omniReqJson));
      console.log('encryptData => ', JSON.stringify(encryptData));

      this.httpService.callBankingAPIService(encryptData, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.omniApiName, true).subscribe((data) => {
        console.log("Omni Api Success => ", data);
        let resp = data.responseParameter;
        if (resp.opstatus == "00" && resp.upiResponse.status == "00") {
          console.log("xmlPayloadServiceApiCall success", data);
          console.log(data.responseParameter);
          this.xmlPayloadValue = resp.upiResponse.responseParameter.RESULT;
          // this.localStorageService.setSessionStorage('NpciXmlPayload', this.xmlPayloadValue);
          // this.androidStartCLLibrary(this.accountDetails, this.npciFlowIdentifier, this.subject);
          this.npciContinueExecutionPostXML();
        } else {
          console.log("xmlPayloadServiceApiCall Error", data);
          this.subject.unsubscribe();
        }
      }, (err) => {
        this.loaderService.hideLoader();
        console.log("Omni API error => ", err);
      });
    } catch (err) {
      this.loaderService.hideLoader();
      showToastMessage(this.translatePipe.transform("error_something_went_wrong4"), "error");
      console.log("error_something_went_wrong4", err);
    }
  }

  npciContinueExecutionPostXML() {
    console.log("calling npciContinueExecutionPostXML...");

    this.dataService.npciFinalCredResponseModel = {};
    this.finalCredResponseModel = {};
    this.loaderService.hideLoader();

    if (this.npciFlowIdentifier == this.constant.val_npci_flow_setUpiPin_android) {
      this.continueSetUpiPin(this.accountDetails);
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_balanceEnquiry_android) {
      this.continueCheckAvailableBalance(this.accountDetails);
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_sendMoney_android || this.npciFlowIdentifier == this.constant.val_npci_flow_acceptMandate_android) {
      this.continueUpiSendMoney(this.accountDetails);
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_changeUpiPin_android) {
      this.continueChangeUpiPin(this.accountDetails);
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_createMandate_android || this.npciFlowIdentifier == this.constant.val_npci_flow_updateMandateEnquiry_android) {
      this.continueCreateMandate(this.accountDetails);
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_mandateBalanceEnquiry_android) {
      this.getUPIMandateAccountBalance(this.accountDetails);
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_revokeMandate_android || this.npciFlowIdentifier == this.constant.val_npci_flow_executeMandate_android || this.npciFlowIdentifier == this.constant.val_npci_flow_pauseUnpauseMandate_android) {
      this.continueRevokeMandate(this.accountDetails);
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_acceptPendingRequest) {
      this.continueCollectAcceptRequest(this.accountDetails);
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_modifyMandate_android) {
      this.continueCreateMandate(this.accountDetails);
    } else if(this.npciFlowIdentifier == this.constant.val_npci_flow_pauseUnpauseMandate_android){
      this.initiateSendMoney(this.transactionId, this.selectedMandateDetails.payerVPA, this.selectedMandateDetails.payeeVPA, this.dataService.roundOffAmount(this.selectedMandateDetails.txnAmount), this.selectedMandateDetails.payeeName);
    }else {
      console.log("Else npciFlowIdentifier => ", this.npciFlowIdentifier);
    }
  }

  getTokenServices(challenge, tokenType) {
    try {
      this.getTransactionId().subscribe((transactionId) => {
        let transId = transactionId;
        console.log('GetToken Transaction ID ',transId);
        let deviceId = this.localStorageService.getLocalStorage(this.constant.key_deviceId);
  
        if (this.dataService.isEmpty(tokenType)) {
          tokenType = "initial";
        }
  
        let credData = this.pluginService.getDeviceUUID() + "|" + this.constant.val_app_pakage_name + "|" + this.commonMethod.processPhoneNo(this.mobileNumber) + "|" + challenge;
        console.log("getToken values" + transId + credData);
  
        let upiReqJson = {
          [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
          [this.constant.key_npci_mobileNo]: this.commonMethod.processPhoneNo(this.mobileNumber),
          [this.constant.key_npci_subAction]: this.constant.upiserviceName_GetToken,
          [this.constant.key_npci_inputParam]: {
            [this.constant.key_npci_appVersion]: this.constant.val_upi_app_version,
            [this.constant.key_upi_credType]: this.constant.val_upi_credTypeChallenge,
            [this.constant.key_npci_txnNote]: this.constant.val_upi_txnNote,
            [this.constant.key_npci_credSubType]: this.constant.val_upi_initial,
            [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
            [this.constant.key_upi_refID]: transId,
            [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
            [this.constant.key_npci_keyType]: this.constant.val_upi_GET_TOKEN,
            [this.constant.key_npci_language]: this.currentLanguage,
            [this.constant.key_npci_credData]: credData,
            [this.constant.key_npci_device]: this.dataService.getDeviceObjectForUpi(),
            [this.constant.key_upi_txnID]: transId
          }
        };
  
        let omniReqJson = {
          [this.constant.key_npci_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
          [this.constant.key_npci_cbsType]: this.constant.val_cbsTypeTcs,
          [this.constant.key_npci_mobPlatform]: this.constant.val_mobPlatform,
          [this.constant.key_npci_mobileAppVersion]: this.constant.val_mobileAppVersion,
          [this.constant.key_npci_deviceId]: deviceId,
          [this.constant.key_npci_clientAppVersion]: this.constant.val_clientAppVersion,
          [this.constant.key_npci_upiRequest]: JSON.stringify(upiReqJson)
        };
  
        console.log("Token Json" + upiReqJson);
        console.log('omniReqJson ', JSON.stringify(omniReqJson));
        let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(omniReqJson));
        console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
  
        this.httpService.callBankingAPIService(encryptData, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.omniApiName, true).subscribe((data) => {
          console.log('Omni API Success', data);
          let resp = data.responseParameter;
          if (resp.opstatus == "00" && resp.upiResponse.status == "00") {
            console.log("Token API Success =>", resp);
            this.tokenValue = resp.upiResponse.responseParameter.RESULT;
            this.tokenExpiry = moment().add(90, 'days').format('DD/MM/YYYY');
            this.localStorageService.setLocalStorage('NpciToken', this.tokenValue);
            this.localStorageService.setLocalStorage('NpciTokenExpiry', this.tokenExpiry);
  
            console.log("TOKEN VALUES => ");
            console.log(this.tokenValue);
            console.log(this.tokenExpiry);
            //generate new txnID here
            this.getTransactionId().subscribe((transactionId) => {
              this.transactionId = transactionId;
              console.log('Inside geToken Transaction ID ',transactionId);
  
              this.androidStartCLLibrary(this.accountDetails, this.npciFlowIdentifier, this.subject);
            });
          } else {
            console.log("Token API Error =>", resp);
            this.subject.unsubscribe();
          }
        }, (err) => {
          this.loaderService.hideLoader();
          console.log("Omni API Error =>", err);
        });
      });
     
    }
    catch (err) {
      this.loaderService.hideLoader();
      showToastMessage(this.translatePipe.transform("error_something_went_wrong5"), "error");
      console.log("error_something_went_wrong5", err);
    }
  }

  getTransactionId() {
    let subject = new Subject<any>();

    cordova.plugins.npciAndroidPlugin.generateTransactionId("PSB", (transactionId) => {
      console.log("getTransactionId Success => ", transactionId);
      subject.next(transactionId);
      subject.complete();
    }, (error) => {
      console.log("getTransactionId Error => ", error);
      subject.next(error);
      subject.complete();
    });

    return subject.asObservable();
  }

  setOtpCredValues(credType, credSubType, credDType, credDLength, accountDetails) {
    console.log("calling setOtpCredValues...");
    let paramObj = {
      "credType": credType,
      "credSubType": credSubType,
      "credDType": credDType,
      "credDLength": credDLength,
      "accountDetails": accountDetails
    };

    cordova.plugins.npciAndroidPlugin.setOtpCredValues(paramObj, (d) => {
      console.log('setOtpCredValues Success => ', d);

      this.setBankNameCredXml(accountDetails.bankName, this.credTypeValue, accountDetails.credType, accountDetails.credSubType, accountDetails.credDType, accountDetails.credDLength, accountDetails.atmCredType, accountDetails.atmCredSubType, accountDetails.atmDType, accountDetails.atmDLength, this.xmlPayloadValue, true, accountDetails);
    }, (e) => {
      this.loaderService.hideLoader();
      console.log('setOtpCredValues Error => ', e);
    });
  }

  setBankNameCredXml(bankName, credTypeValue, credType, credSubType, credDType, credDLength, atmCredType, atmCredSubType, atmCredDType, atmCredDLength, xmlPayload, considerOtp, accountDetails, txnId?) {
    console.log('accountDetails', accountDetails)
    console.log('considerOtp', considerOtp)
    console.log('xmlPayload', xmlPayload)
    console.log('atmCredDLength', atmCredDLength)
    console.log('atmCredDType', atmCredDType)
    console.log('atmCredSubType', atmCredSubType)
    console.log('atmCredType', atmCredType)
    console.log('credDLength', credDLength)
    console.log('credDType', credDType)
    console.log('credSubType', credSubType)
    console.log('credType', credType)
    console.log('credTypeValue', credTypeValue)
    console.log('bankName', bankName)


    console.log("calling setBankNameCredXml...");
    let paramObj = {
      "bankName": bankName,
      "credTypeValue": credTypeValue,
      "credType": credType,
      "credSubType": credSubType,
      "credDType": credDType,
      "credDLength": credDLength,
      "atmCredType": atmCredType ? atmCredType : "",
      "atmCredSubType": atmCredSubType ? atmCredSubType : "",
      "atmCredDType": atmCredDType ? atmCredDType : "",
      "atmCredDLength": atmCredDLength ? atmCredDLength : "",
      "xmlPayload": xmlPayload,
      "considerOtp": considerOtp
    };

    console.log("paramObj => ", paramObj);

    cordova.plugins.npciAndroidPlugin.setBankNameCredXML(paramObj, (d) => {
      console.log('setBankNameCredXML Success => ', d);
      this.loaderService.hideLoader();
      let paymentAddress = accountDetails.paymentAddress;
      let txnId = this.transactionId;
      let amountToNpci;
      this.upiPayModelObj = this.dataService.upiPayModelObj;

      if (this.npciFlowIdentifier == this.constant.val_npci_flow_setUpiPin_android) {
        console.log('1 => accountDetails', accountDetails);
        this.initiateSetUpiPin(paymentAddress, txnId, accountDetails.accNum);
      } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_balanceEnquiry_android || this.npciFlowIdentifier == this.constant.val_npci_flow_globalUpi_android) {
        this.initiateBalanceEnquiry(txnId, paymentAddress, accountDetails.accNum);
      } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_sendMoney_android || this.npciFlowIdentifier == this.constant.val_npci_flow_acceptMandate_android) {
        //Accept mandate is also called for Accept Pending Request
        //Call appropriate flow depending on selected option
        if (this.selectedFlow === this.constant.val_npci_upiPayVpa || this.selectedFlow === this.constant.val_npci_upiPayVpaBqr || this.selectedFlow === this.constant.val_npci_approveMandate) {
          if (this.upiPayModelObj !== null) {
            this.initiateSendMoney(txnId, this.upiPayModelObj.payerAddr, this.upiPayModelObj.payeeAddr, this.upiPayModelObj.txnAmount, this.upiPayModelObj.payeeName);
          } else {
            showToastMessage(this.translatePipe.transform("error_something_went_wrong6"), "error");
          }
        } else if (this.selectedFlow === this.constant.val_npci_upiPayMmid) {
          if (this.upiPayModelObj !== null) {
            this.initiateSendMoney(txnId, this.upiPayModelObj.payerAddr, this.upiPayModelObj.payeeAddr, this.upiPayModelObj.txnAmount, this.upiPayModelObj.payeeName);
          } else {
            showToastMessage(this.translatePipe.transform("error_something_went_wrong7"), "error");
          }
        } else if (this.selectedFlow === this.constant.val_npci_upiPayIfsc || this.selectedFlow === this.constant.val_npci_upiPayIfscBqr) {
          if (this.upiPayModelObj !== null) {
            this.initiateSendMoney(txnId, this.upiPayModelObj.payerAddr, this.upiPayModelObj.payeeAddr, this.upiPayModelObj.txnAmount, this.upiPayModelObj.payeeName);
          } else {
            showToastMessage(this.translatePipe.transform("error_something_went_wrong8"), "error");
          }
        } else if (this.selectedFlow === this.constant.val_npci_pendingRequest) {
          if (this.upiPayModelObj !== null) {
            if (this.dataService.isEmpty(this.upiPayModelObj.acceptedAmount)) {
              amountToNpci = this.upiPayModelObj.txnAmount;
            } else {
              amountToNpci = this.upiPayModelObj.acceptedAmount;
            }
            this.initiateSendMoney(txnId, this.upiPayModelObj.payerAddr, this.upiPayModelObj.payeeAddr, amountToNpci, this.upiPayModelObj.payeeName);
          } else {
            showToastMessage(this.translatePipe.transform("error_something_went_wrong9"), "error");
          }
        } else if (this.selectedFlow === this.constant.val_npci_scanQrPay) {
          if (this.upiPayModelObj !== null) {
            this.initiateSendMoney(txnId, this.upiPayModelObj.payerAddr, this.upiPayModelObj.payeeAccount + "@" + this.upiPayModelObj.payeeIfsc + ".ifsc.npci", this.upiPayModelObj.txnAmount, this.upiPayModelObj.payeeName);
          } else {
            showToastMessage(this.translatePipe.transform("error_something_went_wrong8"), "error");
          }
        } else {
          console.log("Selected Flow = ", this.selectedFlow);
        }
      } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_changeUpiPin_android) {
        this.initiateChangeUpiPin(txnId, paymentAddress, accountDetails.accNum);
      } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_createMandate_android) {
        this.initiateSendMoney(this.upiCreateMandateModel.txnId, this.upiCreateMandateModel.payerVPA, this.upiCreateMandateModel.payeeVPA, this.upiCreateMandateModel.txnAmount, this.upiCreateMandateModel.payeeName);
      } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_modifyMandate_android) {
        this.initiateSendMoney(this.transactionId, this.upiCreateMandateModel.payerVPA, this.upiCreateMandateModel.payeeVPA, this.upiCreateMandateModel.txnAmount, this.upiCreateMandateModel.payeeName);
      } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_revokeMandate_android || this.npciFlowIdentifier == this.constant.val_npci_flow_pauseUnpauseMandate_android) {
        this.initiateSendMoney(this.transactionId, this.selectedMandateDetails.payerVPA, this.selectedMandateDetails.payeeVPA, this.dataService.roundOffAmount(this.selectedMandateDetails.txnAmount), this.selectedMandateDetails.payeeName);
      } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_acceptPendingRequest) {
        this.initiateCollectRequestAccept(this.dataService.pendingWithMe.txnId, this.dataService.pendingWithMe.payerAddress, this.dataService.pendingWithMe.payeeAddress, this.dataService.pendingWithMe.amount);
      } else {
        console.log('Else this.npciFlowIdentifier = ', this.npciFlowIdentifier);
      }
    }, (e) => {
      console.log('setBankNameCredXML Error =>', e);
    });
  }

  initiateSetUpiPin(paymentAddress, txnId, accountNo) {
    let paramObj = {
      "paymentAddress": paymentAddress,
      "txnId": txnId,
      "accountNo": accountNo
    };
    console.log('paramObj', paramObj);

    cordova.plugins.npciAndroidPlugin.initiateSetUpiPin(paramObj, this.finalCredCallback.bind(this), (e) => {
      console.log('initiateSetUpiPin Error => ', e);
    });
  }

  initiateBalanceEnquiry(txnId, paymentAddress, accountNo) {
    let paramObj = {
      "txnId": txnId,
      "paymentAddress": paymentAddress,
      "accountNo": accountNo
    };
    console.log('initiateBalanceEnquiry paramObj => ', paramObj);

    cordova.plugins.npciAndroidPlugin.initiateBalanceEnquiry(paramObj, this.finalCredCallback.bind(this), (e) => {
      console.log("initiateBalanceEnquiry Error => ", e);
    });
  }

  initiateChangeUpiPin(txnId, paymentAddress, accountNo) {
    let paramObj = {
      "txnId": txnId,
      "paymentAddress": paymentAddress,
      "accountNo": accountNo
    };
    cordova.plugins.npciAndroidPlugin.initiateChangeUpiPin(paramObj, this.finalCredCallback.bind(this), (d) => {
      console.log('initiateChangeUpiPin Success => ', d);
    }, (e) => {
      console.log("initiateChangeUpiPin Error => ", e)
    });
  }

  initiateCollectRequestAccept(txnId, payerAddress, payeeAddress, amount) {
    let paramObj = {
      "txnId": txnId,
      "transAmount": amount,
      "payerAddress": payerAddress,
      "payeeAddress": payeeAddress
    };
    cordova.plugins.npciAndroidPlugin.initiateCollectRequestAccept(paramObj, this.finalCredCallback.bind(this), (e) => {
      console.log("initiateCollectRequestAccept Error => ", e)
    });
  }

  initiateSendMoney(txnId, payerAddress, payeeAddress, amount, payeeName) {
    let paramObj = {
      "txnId": txnId,
      "payerAddress": payerAddress,
      "payeeAddress": payeeAddress,
      "amount": amount,
      "payeeName": payeeName
    };
    cordova.plugins.npciAndroidPlugin.initiateSendMoney(paramObj, this.finalCredCallback.bind(this), (d) => {
      console.log('initiateSendMoney Success => ', d);
    }, (e) => {
      console.log("initiateSendMoney Error => ", e)
    });
  }

  continueSetUpiPin(accountDetails) {
    console.log("continueSetUpiPin called...");

    this.npciCredCounter = 3;

    if (this.dataService.isEmpty(accountDetails.atmCredType) || this.dataService.isEmpty(accountDetails.atmCredSubType) || this.dataService.isEmpty(accountDetails.atmCredDType) || this.dataService.isEmpty(accountDetails.atmCredDLength) || accountDetails.atmCredSubType != "ATMPIN") {
      this.npciCredCounter = 2;
    }

    if (this.dataService.isEmpty(accountDetails.otpCredType) || this.dataService.isEmpty(accountDetails.otpCredSubType) || this.dataService.isEmpty(accountDetails.otpCredDType) || this.dataService.isEmpty(accountDetails.otpCredDLength)) {
      console.log("1 => OTP Data Empty => setOtpCredValues");
      this.setOtpCredValues("OTP", "SMS", "NUM", "6", accountDetails);
    } else {
      console.log("2 => OTP Data not Empty => setOtpCredValues");
      this.setOtpCredValues(accountDetails.otpCredType, accountDetails.otpCredSubType, accountDetails.otpCredDType, accountDetails.otpCredDLength, accountDetails);
    }
  }

  continueCheckAvailableBalance(accountDetails) {
    console.log("continueCheckAvailableBalance called...");
    let credTypeValue = this.constant.val_npci_credTypeUpiPin;
    this.npciCredCounter = 1;

    this.setBankNameCredXml(accountDetails.bankName, credTypeValue, accountDetails.credType, accountDetails.credSubType, accountDetails.credDType, accountDetails.credDLength, accountDetails.atmCredType, accountDetails.atmCredSubType, accountDetails.atmCredDType, accountDetails.atmCredDLength, this.xmlPayloadValue, false, accountDetails);
  }

  continueUpiSendMoney(accountDetails) {
    console.log("continueUpiSendMoney called...");
    let credTypeValue = this.constant.val_npci_credTypeUpiPin;
    this.npciCredCounter = 1;

    this.setBankNameCredXml(accountDetails.bankName, credTypeValue, accountDetails.credType, accountDetails.credSubType, accountDetails.credDType, accountDetails.credDLength, accountDetails.atmCredType, accountDetails.atmCredSubType, accountDetails.atmCredDType, accountDetails.atmCredDLength, this.xmlPayloadValue, false, accountDetails);
  }

  continueChangeUpiPin(accountDetails) {
    console.log("continueChangeUpiPin called...");
    let credTypeValue = this.constant.val_npci_credTypeChangeUpiPin;
    this.npciCredCounter = 2;

    this.setBankNameCredXml(accountDetails.bankName, credTypeValue, accountDetails.credType, accountDetails.credSubType, accountDetails.credDType, accountDetails.credDLength, accountDetails.atmCredType, accountDetails.atmCredSubType, accountDetails.atmCredDType, accountDetails.atmCredDLength, this.xmlPayloadValue, true, accountDetails);
  }

  continueCreateMandate(accountDetails) {
    console.log("continueCreateMandate called...");
    let credTypeValue = this.constant.val_npci_credTypeUpiPin;
    this.npciCredCounter = 1;
    let txnId = "";

    if (!this.isFromModifyMandate) {
      // txnId = this.upiCreateMandateModel.txnId;
      // txnId = this.transactionId;
      this.upiCreateMandateModel.txnId = this.transactionId;
      console.log('continueCreateMandate Transaction ID ',this.transactionId);

    } else {
      // selectedMandateDetails.txnId = this.transactionId;
    }



    this.setBankNameCredXml(accountDetails.bankName, credTypeValue, accountDetails.credType, accountDetails.credSubType, accountDetails.credDType, accountDetails.credDLength, accountDetails.atmCredType, accountDetails.atmCredSubType, accountDetails.atmCredDType, accountDetails.atmCredDLength, this.xmlPayloadValue, false, accountDetails);
  }

  getUPIMandateAccountBalance(accountDetails) {
    console.log("getUPIMandateAccountBalance called...");
    try {
      let device = {
        [this.constant.key_npci_mobileNo]: this.mobileNumber,
        [this.constant.key_npci_longitude]: this.dataService.longitude,
        [this.constant.key_npci_latitude]: this.dataService.latitude,
        [this.constant.key_npci_location]: this.dataService.userLocation,
        [this.constant.key_npci_deviceId]: this.deviceId,
        [this.constant.key_npci_deviceIp]: this.dataService.ipAddress,
        [this.constant.key_npci_deviceOs]: this.dataService.platform + " " + this.dataService.osversion,
        [this.constant.key_npci_app]: this.constant.val_app_pakage_name,
        [this.constant.key_npci_capability]: this.constant.val_upi_capability,
        [this.constant.key_npci_imei1]: this.dataService.imei,
        [this.constant.key_npci_imei2]: this.dataService.imei, //imei2
        [this.constant.key_npci_operatorId]: this.dataService.selectedSim.carrierName,
        [this.constant.key_npci_simSerialNo]: this.dataService.selectedSim.simSerialNumber,
        [this.constant.key_npci_telecom]: this.dataService.selectedSim.carrierName,
        [this.constant.key_npci_ipv4]: this.dataService.ipAddress,
        [this.constant.key_npci_ipv6]: this.dataService.ipAddress, //ipv6
        [this.constant.key_npci_uuid]: this.dataService.uuid,
      };

      let paymentAddress = "apptest123@psb";

      var finalJson = {
        [this.constant.key_npci_action]: this.constant.upiserviceName_UPIBalanceCheck,
        [this.constant.key_npci_subAction]: this.constant.upiserviceName_UPIBalanceCheck,
        [this.constant.key_npci_entityId]: this.entityId,
        [this.constant.key_npci_inputParam]: {
          [this.constant.key_npci_accNum]: accountDetails.accountNo,
          [this.constant.key_npci_addressType]: "ACCOUNT",
          [this.constant.key_npci_credKi]: this.finalCredResponseModel.credkey,
          [this.constant.key_npci_entityId]: this.entityId,
          [this.constant.key_npci_mobileNo]: this.mobileNumber,
          [this.constant.key_npci_credData]: this.finalCredResponseModel.credDataForJson,
          [this.constant.key_npci_credCode]: this.finalCredResponseModel.credId,
          [this.constant.key_npci_credType]: this.finalCredResponseModel.credType,
          [this.constant.key_npci_payerAddr]: paymentAddress, //this.selectedManageVPA,
          [this.constant.key_npci_txnNote]: "Set OTP Pin",
          [this.constant.key_npci_credSubType]: this.finalCredResponseModel.credSubType,
          [this.constant.key_npci_payerName]: this.dataService.userDetails.FirstName + ' ' + this.dataService.userDetails.LastName,
          [this.constant.key_npci_refUrl]: this.refUrl,
          [this.constant.key_npci_refId]: this.finalCredResponseModel.transactionId,
          [this.constant.key_npci_ifsc]: accountDetails.ifsc,
          [this.constant.key_npci_accountType]: accountDetails.accountType,
          [this.constant.key_npci_txnId]: this.finalCredResponseModel.transactionId,
          [this.constant.key_npci_language]: this.currentLanguage,
          [this.constant.key_npci_amount]: accountDetails.acceptedAmount,
          [this.constant.key_npci_device]: device,
          [this.constant.key_npci_currency]: this.constant.val_npci_inr
        }
      };

      console.log("BalanceEnquiryService", finalJson);

      let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(finalJson));
      console.log('encryptData => ', JSON.stringify(encryptData));

      this.httpService.callBankingAPIService(encryptData, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.omniApiName, true).subscribe((data) => {
        console.log("Omni Api Success => ", data);
        let resp = data.responseParameter;
        if (resp.opstatus == "00" && resp.upiResponse.status == "00") {
          console.log("UPIBalanceCheck success => ", data);
          // var currentFrm = kony.application.getCurrentForm().id;
          // if(response.status == "00"){
          //   if (response.RESULT == "Y"){
          //     showToastMessage(this.translatePipe.transform("You have sufficient balance to create mandate"), "success");
          //   } else {
          //     if(currentFrm == "frmCreateMandate") {
          //       frmCreateMandate.txtBoxPayVPAAmount.text = "";
          //     } else if (currentFrm == "frmUPIRequestMandate") {
          //       frmUPIRequestMandate.txtBoxPayVPAAmount.text = "";
          //     }
          //     showToastMessage(this.translatePipe.transform("You don't have sufficient balance to create mandate"), "error");
          //   }
          // } else {
          //   if(currentFrm == "frmCreateMandate") {
          //     frmCreateMandate.txtBoxPayVPAAmount.text = "";
          //   }
          //   showToastMessage(this.translatePipe.transform("You don't have sufficient balance to create mandate"), "error");
          // }
        }
        else {
          console.log("UPIBalanceCheck Error => ", data);
          showToastMessage(this.translatePipe.transform("error_something_went_wrong12"), "error");
        }
      }, (err) => {
        console.log("Omni API error => ", err);
        showToastMessage(this.translatePipe.transform("error_something_went_wrong13"), "error");
      });
    } catch (err) {
      console.log("Exception in getAccountBalanceEnquiry ===>" + err);
    }
  }

  continueRevokeMandate(accountDetails) {
    console.log("continueRevokeMandate called...");
    let credTypeValue = this.constant.val_npci_credTypeUpiPin;
    this.npciCredCounter = 1;

    this.setBankNameCredXml(accountDetails.bankName, credTypeValue, accountDetails.credType, accountDetails.credSubType, accountDetails.credDType, accountDetails.credDLength, accountDetails.atmCredType, accountDetails.atmCredSubType, accountDetails.atmCredDType, accountDetails.atmCredDLength, this.xmlPayloadValue, false, accountDetails);
  }

  continueCollectAcceptRequest(accountDetails) {
    console.log("continueCollectAcceptRequest called...");
    let credTypeValue = this.constant.val_npci_credTypeUpiPin;
    this.npciCredCounter = 1;

    this.setBankNameCredXml(accountDetails.bankName, credTypeValue, accountDetails.credType, accountDetails.credSubType, accountDetails.credDType, accountDetails.credDLength, accountDetails.atmCredType, accountDetails.atmCredSubType, accountDetails.atmCredDType, accountDetails.atmCredDLength, this.xmlPayloadValue, false, accountDetails);
  }

  // continueAcceptPendingRequest(txnId, accountDetails:UPIBankAccount) {
  // }

  finalCredCallback(data) {
    console.log("finalCredCallback param =>", data);
    let finalResponse = data;
    if (finalResponse.status == "00") {
      this.finalCredResponseModel.transactionId = finalResponse.transactionId;
      this.finalCredResponseModel.status = data.status;

      for (let i = 0; i < finalResponse.responseArray.length; i++) {
        if (finalResponse.responseArray[i].credSubType == "ATMPIN") {
          this.finalCredResponseModel.credATMDataForJson = finalResponse.responseArray[i].credDataForJson;
          this.finalCredResponseModel.credATMkey = finalResponse.responseArray[i].credkey;
          this.finalCredResponseModel.credATMId = finalResponse.responseArray[i].credId;
          this.finalCredResponseModel.credATMType = finalResponse.responseArray[i].credType;
          this.finalCredResponseModel.credATMSubType = finalResponse.responseArray[i].credSubType;
          this.npciCredCounter--;
        } else if (finalResponse.responseArray[i].credSubType == "MPIN") {
          this.finalCredResponseModel.credDataForJson = finalResponse.responseArray[i].credDataForJson;
          this.finalCredResponseModel.credkey = finalResponse.responseArray[i].credkey;
          this.finalCredResponseModel.credId = finalResponse.responseArray[i].credId;
          this.finalCredResponseModel.credType = finalResponse.responseArray[i].credType;
          this.finalCredResponseModel.credSubType = finalResponse.responseArray[i].credSubType;
          this.npciCredCounter--;
        } else {
          this.finalCredResponseModel.credOTPDataForJson = finalResponse.responseArray[i].credDataForJson;
          this.finalCredResponseModel.credOTPkey = finalResponse.responseArray[i].credkey;
          this.finalCredResponseModel.credOTPId = finalResponse.responseArray[i].credId;
          this.finalCredResponseModel.credOTPType = finalResponse.responseArray[i].credType;
          this.finalCredResponseModel.credOTPSubType = finalResponse.responseArray[i].credSubType;
          this.npciCredCounter--;
        }
      }

      console.log('this.finalCredResponseModel =', this.finalCredResponseModel);
      console.log('this.npciCredCounter', this.npciCredCounter);

    } else if (finalResponse.status == "02") {
      //  requestOTPService(true);
      //Request OTP API call goes here
    } else {
      //Error
      // showToastMessage(this.translatePipe.transform("error_something_went_wrong14"), "error");
    }
    this.loaderService.hideLoader();

    this.subject.next(this.finalCredResponseModel);
    this.subject.complete();
  }
}
