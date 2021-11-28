import { Injectable } from '@angular/core';
import { LocalStorage } from '@ng-idle/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class OpenDepositService {

  constructor(
    private constant:AppConstants,
    private dataService:DataService,
    private storage:LocalStorageService,
    private commonMethod:CommonMethods,
    private encryptDecryptService:EncryptDecryptService
  ) { }

  setTDAccountOpening(formDtl , accountType , month , nomination, schemeCode, nomineeDetails, isAddress, day?) {
    var autocls = '';
    var autorenewalflag = '';
    var minorFlag = '';
    console.log('nomineeDetails: ', nomineeDetails);
    var maturityInstructionFlag = '';
    var updatedDate = '';
    var amt = formDtl.amount.trim().replace(/[^0-9]+/g, '');
    var finalAmt = amt.slice(0, -2);
    console.log('finalAmt: ', finalAmt);
    console.log('selected month: ', formDtl.datepicker1.getMonth());

    // var tenuremonths = (Number(month) + ((day == '0' || day =='' || day == undefined || day == null) ? 0 : Number(day)/30)).toFixed(2);
    // console.log('tenuremonths: ', tenuremonths);
    if(nomination) {
      updatedDate = nomineeDetails.nomineeDob;
    }
    else {
      updatedDate = (formDtl.datepicker1.getDate() < 10 ? '0'+formDtl.datepicker1.getDate() : formDtl.datepicker1.getDate()) + '-' + (formDtl.datepicker1.getMonth() < 9 ? '0'+(formDtl.datepicker1.getMonth()+1) : formDtl.datepicker1.getMonth()+1) + '-' + formDtl.datepicker1.getFullYear();
    }

    let date = updatedDate.split("-")[0];
    let monthh = updatedDate.split("-")[1];
    let year = updatedDate.split("-")[2];
    var ageDiff = parseInt(""+moment().diff(year+"-"+monthh+"-"+date,'years',true))

    if(ageDiff >= 18) {
      minorFlag = 'N';
    }
    else {
      minorFlag = 'Y';
    }

    if(formDtl.maturityInstruction == "Auto Closure on maturity") {
      autocls = 'Y';
      autorenewalflag = 'N';
      maturityInstructionFlag = '';
    }
    else {
      autocls = 'N';
      autorenewalflag = 'Y';
      if(formDtl.maturityInstruction == "Renew with maturity amount") {
        maturityInstructionFlag = 'M';
      }
      else if(formDtl.maturityInstruction == "Renew with principal amount") {
        maturityInstructionFlag = 'P';
      }else{
        maturityInstructionFlag = '';
      }
    }

    var randomRegNumber = 'ON'+new Date().getTime();
    var tdAccountOpeningData = "";
    tdAccountOpeningData = formDtl.debitAccount + "|" + accountType  + "|" + schemeCode + "|" + month + "|" + day + "|" + finalAmt + "|001|"
                                + autocls + "|"+ autorenewalflag + "|Y|" + formDtl.nomineeName +"|"+ randomRegNumber +"|"+ formDtl.maturityInstruction2
                                + "|"+ formDtl.custaddress1 +"|"+ (isAddress ? this.dataService.custProfileStateCityObj.cityId : formDtl.custcity) +"|"+ formDtl.custaddress2 +"|"+ (isAddress ? this.dataService.custProfileStateCityObj.stateId : formDtl.custstate) +"|"+ formDtl.custpincode +"|IN|"+ updatedDate +"|"+ minorFlag
                                + "|"+ (formDtl.guardianName == null ? '' :  formDtl.guardianName) + "|"+ (formDtl.address1== null ? '' :  formDtl.address1) +"|"+ (formDtl.address2 == null ? '' :  formDtl.address2) +"|"+ (formDtl.city == null ? '' :  formDtl.city) +"|"+ (formDtl.state == null ? '' :  formDtl.state) +"|"+ (minorFlag == 'Y' ? 'IN' : '') +"|"+ (formDtl.pincode == null ? '' :  formDtl.pincode) + "|" + (minorFlag == 'Y' ? formDtl.guardianType : '')+"|"+ maturityInstructionFlag + "|";

    // tdAccountOpeningData = formDtl.debitAccount + "|" + accountType  + "|" + schemeCode + "|" + tenuremonths + "|" + '' + "|" + finalAmt + "|001|"
    //                             + autocls + "|"+ autorenewalflag + "|Y|" + formDtl.nomineeName +"|"+ randomRegNumber + "|"+ formDtl.maturityInstruction2
    //                             + "|"+ formDtl.custaddress1 +"|"+ formDtl.custcity +"|"+ formDtl.custaddress2 +"|"+ formDtl.custstate +"|"+ formDtl.custpincode +"|IN|"+ updatedDate +"|"+ minorFlag
    //                             + "|"+ (formDtl.guardianName == null ? '' :  formDtl.guardianName) + "|"+ (formDtl.address1== null ? '' :  formDtl.address1) +"|"+ (formDtl.address2 == null ? '' :  formDtl.address2) +"|"+ (formDtl.city == null ? '' :  formDtl.city) +"|"+ (formDtl.state == null ? '' :  formDtl.state) +"|"+ (minorFlag == 'Y' ? 'IN' : '') +"|"+ (formDtl.pincode == null ? '' :  formDtl.pincode) + "|" + (minorFlag == 'Y' ? 'C' : '')+"|"+ maturityInstructionFlag + "|";

    console.log(tdAccountOpeningData);
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_tdAccountOpeningData]: tdAccountOpeningData
    }
    console.log('getFDRDParams: ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  setRDAccountOpening(formDtl , accountType , month , recurringNomination, schemeCode, autoClosureFlag, nomineeDetails, isAddress, day?) {
    var autorenewalflag = '';
    var minorFlag = '';
    var updatedDate = '';
    var amt = formDtl.amount.trim().replace(/[^0-9]+/g, '');
    var finalAmt = amt.slice(0, -2);
    console.log('finalAmt: ', finalAmt);

    var tenuremonths = (Number(month) + ((day == '0' || day =='' || day == undefined || day == null) ? 0 : Number(day)/30)).toFixed(2);
    console.log('tenuremonths: ', tenuremonths);

    if(recurringNomination) {
      updatedDate = nomineeDetails.nomineeDob
    }
    else {
      updatedDate = (formDtl.datepicker1.getDate() < 10 ? '0'+formDtl.datepicker1.getDate() : formDtl.datepicker1.getDate()) + '-' + (formDtl.datepicker1.getMonth() < 9 ? '0'+(formDtl.datepicker1.getMonth()+1) : formDtl.datepicker1.getMonth()+1) + '-' + formDtl.datepicker1.getFullYear();
    }

    let date = updatedDate.split("-")[0];
    let monthh = updatedDate.split("-")[1];
    let year = updatedDate.split("-")[2];
    var ageDiff = parseInt(""+moment().diff(year+"-"+monthh+"-"+date,'years',true));

    if (day == '' || day == undefined ) day= '0';

    if(ageDiff >= 18) {
      minorFlag = 'N';
    }
    else {
      minorFlag = 'Y';
    }
    console.log('formDtl:', formDtl);
    var randomRegNumber = 'ON'+new Date().getTime();
    var tdAccountOpeningData = "";
    tdAccountOpeningData = formDtl.debitAccount + "|" + accountType  + "|" + schemeCode + "|" + month + "|" + day + "|" + finalAmt + "|001|"
                            + (autoClosureFlag ? 'Y' : 'N') + "|"+ autorenewalflag + "|Y|" + formDtl.nomineeName +"|"+ randomRegNumber + "|"+ formDtl.maturityInstruction2
                            + "|"+ formDtl.custaddress1 +"|"+ (isAddress ? this.dataService.custProfileStateCityObj.cityId : formDtl.custcity) +"|"+ formDtl.custaddress2 +"|"+ (isAddress ? this.dataService.custProfileStateCityObj.stateId : formDtl.custstate) +"|"+ formDtl.custpincode +"|IN|"+ updatedDate +"|"+ minorFlag
                            + "|"+ (formDtl.guardianName == null ? '' :  formDtl.guardianName) + "|"+ (formDtl.address1== null ? '' :  formDtl.address1) +"|"+ (formDtl.address2 == null ? '' :  formDtl.address2) +"|"+ (formDtl.city == null ? '' :  formDtl.city) +"|"+ (formDtl.state == null ? '' :  formDtl.state) +"|"+ (minorFlag == 'Y' ? 'IN' : '') +"|"+ (formDtl.pincode == null ? '' :  formDtl.pincode) + "|"+ (minorFlag == 'Y' ? formDtl.guardianType : '') +"|"+ '' + "|";

    // tdAccountOpeningData = formDtl.debitAccount + "|" + accountType  + "|" + schemeCode + "|" + tenuremonths + "|" + '' + "|" + finalAmt + "|001|"
    //                         + (autoClosureFlag ? 'Y' : 'N') + "|"+ autorenewalflag + "|Y|" + formDtl.nomineeName +"|"+ randomRegNumber + "|"+ formDtl.maturityInstruction2
    //                         + "|"+ formDtl.custaddress1 +"|"+ formDtl.custcity +"|"+ formDtl.custaddress2 +"|"+ formDtl.custstate +"|"+ formDtl.custpincode +"|IN|"+ updatedDate +"|"+ minorFlag
    //                         + "|"+ (formDtl.guardianName == null ? '' :  formDtl.guardianName) + "|"+ (formDtl.address1== null ? '' :  formDtl.address1) +"|"+ (formDtl.address2 == null ? '' :  formDtl.address2) +"|"+ (formDtl.city == null ? '' :  formDtl.city) +"|"+ (formDtl.state == null ? '' :  formDtl.state) +"|"+ (minorFlag == 'Y' ? 'IN' : '') +"|"+ (formDtl.pincode == null ? '' :  formDtl.pincode) + "|"+ (minorFlag == 'Y' ? 'C' : '') +"|"+ '' + "|";

    console.log(tdAccountOpeningData);
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_tdAccountOpeningData]: tdAccountOpeningData
    }
    console.log('getFDRDParams: ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  setTDClosureValidation(formDtl) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      // [this.constant.key_accountNo]: accNo,
    }
    console.log('getLoanParam', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  setRDClosureValidation(formDtl) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      // [this.constant.key_accountNo]: accNo,
    }
    console.log('getLoanParam', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

    /**
   * Get statelist request
   */
     getStateListParams() {
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsType,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_CountryCode]: "1",
        [this.constant.Key_type]: 'ACCOPEN' //Country code 1 is for india
      }
      console.log("getStateListParams ",JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
      //return inputData;
      return encryptData;
    }

    /**
     * Get CityList by stateId
     * @param stateId
     */
     getCityListParams(stateId) {
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsType,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_StateId]: stateId,
        [this.constant.key_type]: 'ACCOPEN'
      }

      console.log('city Params ', JSON.stringify(inputData));

      let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
      //return inputData;
      return encryptData;
    }

    getInterestRatesCall(formData, formName, tenureType?) {
      console.log(formData);
      if(formName == 'fixedForm') {
        if(tenureType == 'days') {
          var inputData = {
            [this.constant.key_entityId]: this.constant.getEntityId(),
            [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
            [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
            [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
            [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
            [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
            [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
            [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
            [this.constant.key_typeOfRequest]: 'FD',
            [this.constant.key_year]: "00",
            [this.constant.key_month]: "00",
            [this.constant.key_noofdays]: formData.dayField
          }
        }
        else if(tenureType == 'yearMonthDays') {
          var inputData = {
            [this.constant.key_entityId]: this.constant.getEntityId(),
            [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
            [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
            [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
            [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
            [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
            [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
            [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
            [this.constant.key_typeOfRequest]: 'FD',
            [this.constant.key_year]: formData.year,
            [this.constant.key_month]: formData.month,
            [this.constant.key_noofdays]: formData.day
          }
        }
      }
      else {
        var inputData = {
          [this.constant.key_entityId]: this.constant.getEntityId(),
          [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
          [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
          [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
          [this.constant.key_deviceId]: this.constant.deviceID,
          [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
          [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
          [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
          [this.constant.key_typeOfRequest]: 'FD',
          [this.constant.key_year]: formData.year,
          [this.constant.key_month]: formData.month,
          [this.constant.key_noofdays]: "00"
        }
      }

        console.log('Interest Rate Params: ', JSON.stringify(inputData));
        let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
        return encryptData;
    }

    getFDAccountFetchDetailsCall(FDRDType, formData, tenureMonths, tenureDays?) {
      console.log('FDRDType', FDRDType);
      console.log('formData: ', formData);
      console.log('Tenure months: ', tenureMonths);
      console.log('Tenure Days: ', tenureDays);
      // var tenuredays = tenureDays == '0' ? '' : tenureDays;
      // var tenuremonths = tenureMonths == '0' ? '' : tenureMonths;
      var tenuremonths = (Number(tenureMonths) + (tenureDays == '0' ? 0 : Number(tenureDays)/30)).toFixed(2);
      console.log('final tenure months: ', tenuremonths);
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
        [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
        // [this.constant.key_productFetchDetailsData]: FDRDType+"|"+this.dataService.userDetails.cifNumber+"|"+formData.debitAccount+"|"+formData.chooseDepositScheme+"|INR|"+ tenuredays +"|"+ tenuremonths+"|"+formData.interestPayout+"|"
        [this.constant.key_productFetchDetailsData]: FDRDType+"|"+this.dataService.userDetails.cifNumber+"|"+formData.debitAccount+"|"+formData.chooseDepositScheme+"|INR|"+ '' +"|"+ tenuremonths+"|"+formData.interestPayout+"|"
      }

      console.log('get Account Fetch Details: ', JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    getRDAccountFetchDetailsCall(FDRDType, formData, tenureMonths, tenureDays?) {
      var tenuredays = tenureDays == undefined || tenureDays == '0' ? '' : tenureDays;
      var tenuremonths = tenureMonths == '0' ? '' : tenureMonths;
      console.log('FDRDType', FDRDType);
      console.log('formData: ', formData);
      console.log('Tenure months: ', tenureMonths);
      console.log('Tenure Days: ', tenureDays);
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
        [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
        [this.constant.key_productFetchDetailsData]: FDRDType+"|"+this.dataService.userDetails.cifNumber+"|"+formData.debitAccount+"|"+'G'+"|INR|"+ '' +"|"+ tenuremonths+"|"+ 'C' +"|"
      }

      console.log('get Account Fetch Details: ', JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    getInquiryNomineeValidations(selectedAccount) {
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
        [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
        [this.constant.key_inquiryNomineeData]: this.dataService.userDetails.cifNumber+"|"+selectedAccount
      }

      console.log('get Account Fetch Details: ', JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }
  }


