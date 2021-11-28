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
import { pageLoaderService } from './pageloader.service';
import * as moment from 'moment';

declare var showToastMessage;
declare var cordova: any;

@Injectable({
  providedIn: 'root'
})

export class NpciIosService {
  mobileNumber: string = "";
  deviceId: string = "";
  xmlPayloadValue: any = "";
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
  appId: string = "";
  type: string = "";
  refUrl: string = "";
  currentLanguage: string = "";
  tokenValue: string = "";
  tokenExpiry: string = "";
  isNPCIPageRequested: boolean = false;
  upiPayModelObj: any;
  selectedMandateDetails: any = {};
  upiCreateMandateModel: any = {};
  omniApiName: string = "";
  encryptKey: string = "";
  selectedFlow: string = "";
  isFromModifyMandate: boolean = false;
  credTypeValue: string = "";
  upiDeviceId: any;
  txnId: string = "";
  expiry: string = "";
  platform: string = "";
  isAtmPINRequired: string = "";

  constructor(private constant:AppConstants, private localStorageService: LocalStorageService, private translatePipe: TranslatePipe, private dataService: DataService, private encryptDecryptService: EncryptDecryptService, private httpService: HttpRestApiService, private loader: pageLoaderService, private commonMethod: CommonMethods) { }

  subject:any;

  initData() {
    console.log("NPCI iOS service => Initialising Data");
    this.mobileNumber = this.localStorageService.getLocalStorage(this.constant.storage_mobileNo);
    this.upiMobileNumber = this.commonMethod.processPhoneNo(this.mobileNumber);
    this.deviceId = this.localStorageService.getLocalStorage(this.constant.key_deviceId);
    this.upiDeviceId = this.dataService.uuid;
    this.entityId = this.constant.val_upi_psb;
    this.appVersion = this.constant.val_upi_app_version;
    this.clientAppVersion = this.constant.val_clientAppVersion;
    this.locale = this.dataService.getSelectedLanguageCodeUPI();
    this.appId = this.constant.val_app_pakage_name;
    this.type = "initial";
    this.refUrl = this.constant.val_upi_refUrl;
    this.currentLanguage = this.dataService.getSelectedLanguageCodeUPI();
    this.token = "";
    this.tokenValue = "";
    this.tokenExpiry = "";
    this.platform = this.dataService.platform;

    if (this.localStorageService.getSessionStorage(this.constant.val_sessionKey)) {
      this.omniApiName = this.constant.upiserviceName_PROCESSUPISERVICESESSION;
      this.encryptKey = this.localStorageService.getSessionStorage(this.constant.val_sessionKey) ? this.localStorageService.getSessionStorage(this.constant.val_sessionKey) : "";
    } else {
      this.omniApiName = this.constant.upiserviceName_PROCESSUPISERVICE;
      this.encryptKey = this.mobileNumber + this.constant.mapEncryptKey;
    }
  }

  iosStartCLLibrary (accountDetails: UPIBankAccount, flowIdentifier, subject?): Observable<any> {
    console.log("iosStartCLLibrary called...");
    this.subject = subject;
    
    if (flowIdentifier == this.constant.val_npci_flow_setUpiPin) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_setUpiPin_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_balanceEnquiry) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_balanceEnquiry_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_changeUpiPin) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_changeUpiPin_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_sendMoney) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_sendMoney_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_acceptMandate) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_acceptMandate_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_createMandate) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_createMandate_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_updateMandateEnquiry) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_updateMandateEnquiry_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_mandateBalanceEnquiry) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_mandateBalanceEnquiry_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_revokeMandate) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_revokeMandate_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_executeMandate) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_executeMandate_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_acceptPendingRequest) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_acceptPendingRequest_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_globalUpi) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_globalUpi_ios;
    } else if (flowIdentifier == this.constant.val_npci_flow_debitBlock) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_debitBlock_ios
    } else if (flowIdentifier == this.constant.val_npci_flow_pauseUnpauseMandate) {
      this.npciFlowIdentifier = this.constant.val_npci_flow_pauseUnpauseMandate_ios
    } else {
      console.log("Unknown Flow Identifier...");
    }
    
    console.log('this.npciFlowIdentifier', this.npciFlowIdentifier);

    this.accountDetails = accountDetails;
    console.log('accountDetails', accountDetails);
  
    if (this.localStorageService.hasKeyLocalStorage('NpciToken') && (this.localStorageService.hasKeyLocalStorage('NpciTokenExpiry'))) {
      this.tokenValue = this.localStorageService.getLocalStorage('NpciToken');
      this.tokenExpiry = this.localStorageService.getLocalStorage('NpciTokenExpiry');
    }

    this.setDataNpci(this.upiMobileNumber, this.appId, this.upiDeviceId, this.type, this.entityId, this.refUrl, this.tokenValue, this.tokenExpiry);
    return this.subject.asObservable();
  }

  getTransactionId() {
    console.log("getTransactionId called...");
    let subject = new Subject<any>();

    let paramObj = {
      "txnIdIdent" : "PSB"
    }
    
    cordova.plugins.npciIosPlugin.getTransactionId(paramObj, (transactionId) => {
      console.log("getTransactionId Success = ", transactionId);
      subject.next(transactionId);
      subject.complete();
    }, (error) => {
      console.log("getTransactionId Error = ", error);
      subject.next(error);
      subject.complete();
    });

    return subject.asObservable();
  }
  
  setDataNpci(mobileNumber, appId, deviceId, type, entityId, refUrl, tokenValue, tokenExpiry) {
    console.log("setDataNpci called...");
    let paramObj = {
      "devId" : deviceId,
      "moNo" : mobileNumber,
      "id" : appId,
      "url" : refUrl, 
      "entity" : entityId,
      "tokenValue" : tokenValue,
      "expiry": tokenExpiry
    };

    cordova.plugins.npciIosPlugin.setDataNpci(paramObj, (d) => {
      console.log("setDataNpci Success => ", d);
  
      let returnedValue = this.initializeCommonLib();
      console.log('returnedValue', returnedValue);
      
      if(returnedValue) {
        console.log("Registration already done");
        this.registerIosAppNpci();
      } else {
        console.log("registration Initiated");
        this.generateChallenge(deviceId, appId);
      }
    }, (e) => {
      console.log("setDataNpci Error => ", e);
    });
  }

  setDataNpciWithoutCallback(mobileNumber, appId, deviceId, type, entityId, refUrl, tokenValue, tokenExpiry) {
    console.log("setDataNpci called...");
    let paramObj = {
      "devId" : deviceId,
      "moNo" : mobileNumber,
      "id" : appId,
      "url" : refUrl, 
      "entity" : entityId,
      "tokenValue" : tokenValue,
      "expiry": tokenExpiry
    };

    cordova.plugins.npciIosPlugin.setDataNpci(paramObj, (d) => {
      console.log("setDataNpci Success => ", d);
    }, (e) => {
      console.log("setDataNpci Error => ", e);
    });
  }

  initializeCommonLib() {
    console.log("initializeCommonLib called...");
    if (window.hasOwnProperty('cordova')) {
      cordova.plugins.npciIosPlugin.initializeCommonLib((d) => {
        console.log("initializeCommonLib Success => ", d);
        return d;
      }, (e) => {
        console.log("initializeCommonLib Error => ", e);
        return false;
      });
    } else {
      return false;
    }
  }

  generateChallenge(deviceId, appId) {
    console.log("generateChallenge called...");

    let paramObj = {
      "deviceId" : deviceId,
      "appId" : appId
    };
    
    cordova.plugins.npciIosPlugin.generateChallenge(paramObj , (d) => {
      console.log('generateChallenge Success => ', d);
      let challenge = d;
      this.getTokenServices(challenge,"");
    }, (e) => {
      console.log("generateChallenge Error => ", e);
    });
  }

  registerIosAppNpci() {
    console.log("Start registration...");
    this.setDataNpciWithoutCallback(this.upiMobileNumber, this.appId, this.upiDeviceId, "Initial", this.entityId, this.refUrl, this.tokenValue, this.tokenExpiry);
    this.isAppRegisteredForNpci(this.upiMobileNumber, this.appId, this.upiDeviceId, this.tokenValue, this.tokenExpiry);
  }

  isAppRegisteredForNpci(mobileNumber, appId, deviceId, tokenValue, tokenExpiry) {
    console.log("isAppRegisteredForNpci called...");
    let paramObj = {
      "mobileNumber" : mobileNumber, 
      "appId" : appId, 
      "deviceId" :deviceId,
      "tokenValue" : tokenValue,
      "tokenExpiry" : tokenExpiry
    }
    
    cordova.plugins.npciIosPlugin.isAppRegisteredForNpci(paramObj, (d) => {
      console.log("isAppRegisteredForNpci Success => ", d); 
      console.log('this.xmlPayloadValue => ', this.xmlPayloadValue);
      console.log(typeof(this.xmlPayloadValue));
    
      if (this.dataService.isEmpty(this.xmlPayloadValue)) {
        console.log("XML Payload Blank");
        this.getXMLPayloadService();
      } else {
        console.log("XML Payload Present");
        this.continueNPCICommunication();
      }
    }, (e)=>{
      console.log("isAppRegisteredForNpci Error => ", e);
      showToastMessage(this.translatePipe.transform("error in registration"), "error");
    });   
  }

  showNpciPageNative(credLength, otpCredLength, atmCredLength, txnId, tokenValue, xmlPayloadValue, bankName, localUPIFlow, txnAmount, payerAddress, payeeDetails, payeeName, isAtmPINRequired, devId, moNo, id, url, entity, expiry) {
    console.log("showNpciPageNative called...");
    
    let paramObj = {
      "credLength" : credLength, 
      "otpCredLength" : otpCredLength, 
      "atmCredLength" : atmCredLength, 
      "txnId" : txnId, 
      "tokenValue" : tokenValue, 
      "xmlPayloadValue" : xmlPayloadValue, 
      "bankName" : bankName, 
      "txnAmount" : txnAmount, 
      "payerAddress" : payerAddress, 
      "payeeDetails" : payeeDetails, 
      "payeeName" : payeeName, 
      "isAtmPINRequired" : isAtmPINRequired,
      "note" : localUPIFlow,
      "devId" : devId,
      "moNo" : moNo,
      "id" : id,
      "url" : url,
      "entity" : entity,
      "expiry" : expiry
    };

    cordova.plugins.npciIosPlugin.showNpciPageNative(paramObj, (success) => {
      console.log('showNpciPageNative success', success);
      this.finalCredResponseModel = {};
      this.finalCredCallback(success);
    }, (e) => {
      console.log("showNpciPageNativeError => ", e);
    });
  }

  finalCredCallback(data) {
    let finalResponse = JSON.parse(data);
    
    console.log("finalCredCallback param =>", finalResponse);

    this.finalCredResponseModel.transactionId = finalResponse.txnId;

    if(finalResponse.AtmCredSubType && finalResponse.AtmCredSubType == this.constant.val_npci_ATMPIN) {
      this.finalCredResponseModel.credATMDataForJson = finalResponse.AtmCredData;
      this.finalCredResponseModel.credATMkey = finalResponse.AtmCredKi;
      this.finalCredResponseModel.credATMId = finalResponse.AtmCredCode;
      this.finalCredResponseModel.credATMType = finalResponse.AtmCredType;
      this.finalCredResponseModel.credATMSubType = finalResponse.AtmCredSubType;
    }

    if(finalResponse.SubType && finalResponse.SubType == this.constant.val_npci_MPIN) {
      this.finalCredResponseModel.credDataForJson = finalResponse.CredData;
      this.finalCredResponseModel.credkey = finalResponse.Ki;
      this.finalCredResponseModel.credId = finalResponse.Code;
      this.finalCredResponseModel.credType = finalResponse.Type;
      this.finalCredResponseModel.credSubType = finalResponse.SubType;
    }

    if(finalResponse.NewSubType && finalResponse.NewSubType == this.constant.val_npci_SMS || finalResponse.NewSubType == this.constant.val_npci_NMPIN) {
      this.finalCredResponseModel.credOTPDataForJson = finalResponse.NewCredData;
      this.finalCredResponseModel.credOTPkey = finalResponse.NewCredKi;
      this.finalCredResponseModel.credOTPId = finalResponse.NewCode;
      this.finalCredResponseModel.credOTPType = finalResponse.NewType;
      this.finalCredResponseModel.credOTPSubType = finalResponse.NewSubType;
    }
    
    console.log("finalCredResponseModel => ", this.finalCredResponseModel);

    console.log("NPCI Flow iOS : ", this.npciFlowIdentifier);
    this.loader.hideLoader();

    this.subject.next(this.finalCredResponseModel);
    this.subject.complete();
  }

  continueNPCICommunication(){
    console.log("continueNPCICommunication called...");
    console.log("Account Details => ", this.accountDetails);
    this.isAtmPINRequired = "NO";

    console.log('this.accountDetails');
    console.log(this.accountDetails);

    this.upiPayModelObj = this.dataService.upiPayModelObj;
    console.log('this.upiPayModelObj');
    console.log(this.upiPayModelObj);
    // this.upiCreateMandateModel = this.dataService.createMandateObj;
    console.log('this.upiCreateMandateModel');
    console.log(this.upiCreateMandateModel);

    let bankName = this.accountDetails.bankName;
    let credType = this.accountDetails.credType;
    let credSubType = this.accountDetails.credSubType;
    let credDType = this.accountDetails.credDType;
    let credDLength = this.accountDetails.credDLength;
    let atmCredType = this.accountDetails.atmCredType;
    let atmCredSubType = this.accountDetails.atmCredSubType;
    let atmCredDType = this.accountDetails.atmCredDtype; 
    let atmCredDLength = this.accountDetails.atmCredDLength; 
    let otpCredType = this.accountDetails.otpCredType;
    let otpCredSubType = this.accountDetails.otpCredSubType;
    let otpCredDType = this.accountDetails.otpCredDType; 
    let otpCredDLength = this.accountDetails.otpCredDLength; 
    // let credTypeValue = this.constant.val_npci_credTypeSetUPIPinWithATM;
    let credTypeValue = "";
  
    if(this.dataService.isEmpty(this.accountDetails.atmCredType) || this.dataService.isEmpty(atmCredSubType) || this.dataService.isEmpty(atmCredDType) || this.dataService.isEmpty(atmCredDLength) || atmCredSubType!="ATMPIN"){
      credTypeValue = this.constant.val_npci_credTypeSetUpiPin;
      this.isAtmPINRequired = "NO";
      this.accountDetails.atmCredType = "";
      atmCredSubType = "";
      atmCredDType = "";
      atmCredDLength = "";
      if(!this.dataService.isEmpty(this.upiPayModelObj)){
        this.upiPayModelObj.atmCredType = "";
        this.upiPayModelObj.atmCredSubType = "";
        this.upiPayModelObj.atmCredDtype = ""; 
        this.upiPayModelObj.atmCredDlength = ""; 
      }
    } else {
      this.isAtmPINRequired = "YES";
      credTypeValue = this.constant.val_npci_credTypeSetUPIPinWithATM;
    }
  
    console.log("Open NPCI Page");

    console.log("Bank Name = ", bankName);
    if(this.dataService.isEmpty(bankName)){
      bankName = "";
    }
    console.log('npciFlowIdentifier = ', this.npciFlowIdentifier);

    let payeeVPA = "";
    let payerVPA = this.accountDetails.paymentAddress;
    let localUPIFlow = "";
    let txnAmount = this.dataService.roundOffAmount(this.upiCreateMandateModel.txnAmount);

    if(this.npciFlowIdentifier == this.constant.val_npci_flow_setUpiPin_ios) {
      localUPIFlow = "Set UPI PIN";
      credTypeValue = this.constant.val_npci_credTypeSetUPIPinWithATM;
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_balanceEnquiry_ios) {
      localUPIFlow = "Balance enquiry";
      credTypeValue = this.constant.val_npci_credTypeUpiPin;
      this.isAtmPINRequired = "NO";
    } else if (this.npciFlowIdentifier == this.constant.val_npci_flow_mandateBalanceEnquiry_ios) {
      localUPIFlow = "Balance enquiry";
      credTypeValue = this.constant.val_npci_credTypeUpiPin;
      this.isAtmPINRequired = "NO";
    } else if(this.npciFlowIdentifier == this.constant.val_npci_flow_sendMoney_ios) {
      localUPIFlow = "SEND MONEY";
      credTypeValue = this.constant.val_npci_credTypeUpiPin;
      if(this.selectedFlow === this.constant.val_npci_upiPayVpa) {
        this.upiPayModelObj.payeeVpa = this.upiPayModelObj.payeeAddr;
      } else if(this.selectedFlow === this.constant.val_npci_upiPayMmid) {
        payeeVPA = this.upiPayModelObj.payeeMobile+"@"+this.upiPayModelObj.payeeMmid+".mmid.npci";
        this.upiPayModelObj.payeeVpa = payeeVPA;
      } else if(this.selectedFlow === this.constant.val_npci_upiPayIfsc) {
        payeeVPA = this.upiPayModelObj.payeeAccNo+"@"+this.upiPayModelObj.payeeIfsc+".ifsc.npci";
        this.upiPayModelObj.payeeVpa = payeeVPA;
      } else if(this.selectedFlow === this.constant.val_npci_pendingRequest) {
        this.upiPayModelObj.payeeVpa = this.dataService.pendingWithMe.payeeAddress;
        this.upiPayModelObj.txnAmount = this.dataService.pendingWithMe.amount;
      } else if(this.selectedFlow === this.constant.val_npci_upiPayVpaBqr) {
        //to be confirmed by Sagar
      } else if(this.selectedFlow === this.constant.val_npci_upiPayIfscBqr) {
        //to be confirmed by Sagar
      } else {
        console.log('this.selectedFlow', this.selectedFlow);
      }
    } else if(this.npciFlowIdentifier == this.constant.val_npci_flow_changeUpiPin_ios){
      localUPIFlow = "Change UPI PIN";
      credTypeValue = this.constant.val_npci_credTypeChangeUpiPin;
    } else if(this.npciFlowIdentifier == this.constant.val_npci_flow_updateMandateEnquiry_ios){
      payerVPA = this.accountDetails.payerVPA;
      payeeVPA = this.accountDetails.payeeVPA; 
    } else if(this.npciFlowIdentifier == this.constant.val_npci_flow_revokeMandate_ios){
      payerVPA = this.selectedMandateDetails.payerVPA;
      payeeVPA = this.selectedMandateDetails.payeeVPA; 
      txnAmount = this.selectedMandateDetails.txnAmount; 
    } else {
      console.log('this.npciFlowIdentifier', this.npciFlowIdentifier);
    }

    console.log("localUPIFlow = ", localUPIFlow);
    console.log("credTypeValue= ", credTypeValue );

    if(this.npciFlowIdentifier == this.constant.val_npci_flow_sendMoney_ios) {
      credTypeValue = this.constant.val_npci_credTypeUpiPin;
      localUPIFlow = "SEND MONEY";
      this.setDataNpciWithoutCallback(this.upiMobileNumber, this.appId, this.upiDeviceId, "Initial", this.entityId, this.refUrl, this.tokenValue, this.tokenExpiry);
      this.showNpciPageNative(credDLength, otpCredDLength, atmCredDLength, this.txnId, this.tokenValue, this.xmlPayloadValue,bankName, localUPIFlow, this.upiPayModelObj.txnAmount, this.upiPayModelObj.payerAddr, this.upiPayModelObj.payeeVpa, this.upiPayModelObj.payeeName,this.isAtmPINRequired, this.upiDeviceId, this.upiMobileNumber, this.appId,this.refUrl, this.entityId, this.tokenExpiry);
    } else if(this.npciFlowIdentifier == this.constant.val_npci_flow_createMandate_ios || this.npciFlowIdentifier == this.constant.val_npci_flow_updateMandateEnquiry_ios) {
      credTypeValue = this.constant.val_npci_credTypeUpiPin;
      localUPIFlow = "CREATE MANDATE";
      this.setDataNpciWithoutCallback(this.upiMobileNumber, this.appId, this.upiDeviceId, "Initial", this.entityId, this.refUrl, this.tokenValue, this.tokenExpiry);
      this.showNpciPageNative(credDLength, otpCredDLength, atmCredDLength, this.txnId, this.tokenValue, this.xmlPayloadValue, bankName, localUPIFlow, txnAmount, this.upiCreateMandateModel.payerVPA, this.upiCreateMandateModel.payeeVPA,this.upiCreateMandateModel.payeeName, this.isAtmPINRequired, this.upiDeviceId, this.upiMobileNumber, this.appId,this.refUrl, this.entityId, this.tokenExpiry);
    } else if(this.npciFlowIdentifier == this.constant.val_npci_flow_revokeMandate_ios) {
      credTypeValue = this.constant.val_npci_credTypeUpiPin;
      localUPIFlow = "REVOKE MANDATE";
      this.setDataNpciWithoutCallback(this.upiMobileNumber, this.appId, this.upiDeviceId, "Initial", this.entityId, this.refUrl, this.tokenValue, this.tokenExpiry);
      this.showNpciPageNative(credDLength, otpCredDLength, atmCredDLength, this.txnId, this.tokenValue, this.xmlPayloadValue, bankName, localUPIFlow, txnAmount, this.selectedMandateDetails.payerVPA, this.selectedMandateDetails.payeeVPA, this.selectedMandateDetails.payeeName, this.isAtmPINRequired, this.upiDeviceId, this.upiMobileNumber, this.appId,this.refUrl, this.entityId, this.tokenExpiry);
    } else if (this.npciFlowIdentifier === this.constant.val_npci_flow_acceptMandate_ios) {
      credTypeValue = this.constant.val_npci_credTypeUpiPin;
      console.log("ACCEPT MANDATE Flow");
      otpCredDLength = "";
      payerVPA = this.upiPayModelObj.payerAddr;
      payeeVPA = this.upiPayModelObj.payeeAddr;
      this.setDataNpciWithoutCallback(this.upiMobileNumber, this.appId, this.upiDeviceId, "Initial", this.entityId, this.refUrl, this.tokenValue, this.tokenExpiry);
      this.showNpciPageNative(credDLength, otpCredDLength, atmCredDLength, this.txnId, this.tokenValue, this.xmlPayloadValue, bankName, localUPIFlow, this.upiPayModelObj.txnAmount, payerVPA, payeeVPA,this.upiPayModelObj.payeeName, this.isAtmPINRequired, this.upiDeviceId, this.upiMobileNumber, this.appId, this.refUrl, this.entityId, this.tokenExpiry);
    } else {
      this.setDataNpciWithoutCallback(this.upiMobileNumber, this.appId, this.upiDeviceId, "Initial", this.entityId, this.refUrl, this.tokenValue, this.tokenExpiry);
      this.showNpciPageNative(credDLength, otpCredDLength, atmCredDLength, this.txnId, this.tokenValue, this.xmlPayloadValue,bankName, localUPIFlow, "0.00", payerVPA, this.accountDetails.accNum, "", this.isAtmPINRequired, this.upiDeviceId, this.upiMobileNumber, this.appId,this.refUrl, this.entityId, this.tokenExpiry);
    }
  }

  getTokenServices(challenge, tokenType) {
    try{
      console.log("Inside getToken");
      
      if(this.dataService.isEmpty(tokenType)) {
        tokenType = "initial";
      }
      
      let credData = this.upiDeviceId + "|" + this.constant.val_app_pakage_name + "|" + this.upiMobileNumber + "|" + challenge;

      let upiReqJson = {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_npci_mobileNo]: this.upiMobileNumber,
        [this.constant.key_npci_subAction]: this.constant.upiserviceName_GetToken,
        [this.constant.key_npci_inputParam]: {
          [this.constant.key_npci_appVersion]: this.constant.val_upi_app_version,
          [this.constant.key_upi_credType]: this.constant.val_upi_credTypeChallenge,
          [this.constant.key_npci_txnNote]: "",
          [this.constant.key_npci_credSubType]: this.constant.val_upi_initial,
          [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
          [this.constant.key_upi_refID]: this.txnId,
          [this.constant.key_upi_refUrl]: this.constant.val_upi_refUrl,
          [this.constant.key_npci_keyType]: this.constant.val_upi_GET_TOKEN,
          [this.constant.key_npci_language]: this.currentLanguage,
          [this.constant.key_npci_credData]: credData,
          [this.constant.key_npci_device]: this.dataService.getDeviceObjectForUpi(),
          [this.constant.key_upi_txnID]: this.txnId
        }
      };

      let omniReqJson = {
        [this.constant.key_npci_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
        [this.constant.key_npci_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_npci_mobPlatform]: this.constant.val_ios,
        [this.constant.key_npci_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_npci_deviceId]: this.deviceId,
        [this.constant.key_npci_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_npci_upiRequest]: JSON.stringify(upiReqJson)
      }

      console.log("Token Json", upiReqJson);

      console.log(omniReqJson);
      
      this.loader.showLoader();
      
      let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(omniReqJson));
      console.log('encryptData => ', JSON.stringify(encryptData));
  
      this.httpService.callBankingAPIService(encryptData, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.omniApiName, true).subscribe(data => {
        console.log("Omni Api Success => ",data);
        let response = data.responseParameter;
        if (response.opstatus == "00") {
          console.log("Token API Response => ");
          console.log(response);
          if(response.upiResponse.status == "00") {
            if(response.upiResponse.responseParameter) {
              this.tokenValue = response.upiResponse.responseParameter.RESULT;
              this.tokenExpiry = moment().add(90, 'days').format('DD/MM/YYYY');
              this.localStorageService.setSessionStorage('NpciToken', this.tokenValue);
              this.localStorageService.setLocalStorage('NpciTokenExpiry', this.tokenExpiry);
              console.log("TOKEN VALUES => ");
              console.log(this.tokenValue);
              console.log(this.tokenExpiry);
              this.getTransactionId().subscribe((transactionId) => {
                this.txnId = transactionId;
                console.log('Inside geToken Transaction ID ',transactionId);
                this.registerIosAppNpci();
              });
            } else {
              console.log("Token not received...");
            }
          } else {
            //Uncomment For Testing ONLY
            // console.log("UPI Failure... Setting static Token data for testing...");
            // this.tokenValue = "WkRrSzhpdjJOMGg3dUVUcUpBaWtsQnp4YWNBcXByakg=";
            // this.tokenExpiry = "26/05/2021";
            // this.localStorageService.setSessionStorage('NpciToken', this.tokenValue);
            // this.localStorageService.setLocalStorage('NpciTokenExpiry', this.tokenExpiry);
            // console.log("TOKEN VALUES => ");
            // console.log(this.tokenValue);
            // console.log(this.tokenExpiry);
            // this.registerIosAppNpci(); 
          }
        } else {
         console.log("Token API Error = ", response);
         showToastMessage(this.translatePipe.transform("error_something_went_wrong1"), "error");
         this.subject.unsubscribe();
        }
      }, err => {
        console.log('Omni Api err', err);
        showToastMessage(this.translatePipe.transform("error_something_went_wrong2"), "error");
      });      
    }
    catch(err){
      this.loader.hideLoader();
      showToastMessage(this.translatePipe.transform("error_something_went_wrong3"), "error");
    }
  }

  getXMLPayloadService() {
    console.log("getXMLPayloadService called...");
    try{
      this.loader.showLoader();

      let upiReqJson = {
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_npci_mobileNo]: this.upiMobileNumber,
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

      console.log('omniReqJson => ', JSON.stringify(omniReqJson));

      let encryptData = this.encryptDecryptService.encryptText(this.encryptKey, JSON.stringify(omniReqJson));
      
      console.log('encryptData => ', JSON.stringify(encryptData));
  
      this.httpService.callBankingAPIService(encryptData, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.omniApiName, true).subscribe(data => {
        console.log("Omni Api Success => ",data);
        let resp = data.responseParameter;
        if (resp.opstatus == "00") {
          console.log("xmlPayloadServiceApiCall Success =>", resp);
          this.xmlPayloadValue = resp.upiResponse.responseParameter.RESULT;
          this.localStorageService.setSessionStorage('NpciXmlPayload', this.xmlPayloadValue);
          this.continueNPCICommunication();
        } else {
          console.log("xmlPayloadServiceApiCall Error  = ", resp);
          showToastMessage(this.translatePipe.transform("error_something_went_wrong4"), "error");
          this.subject.unsubscribe();
        }
      }, err => {
        console.log("Omni Api Error => ", err);
        showToastMessage(this.translatePipe.transform("error_something_went_wrong5"), "error");
      });
    }
    catch(err){
      this.loader.hideLoader();
      showToastMessage(this.translatePipe.transform("error_something_went_wrong6"), "error");
    }
  }
}