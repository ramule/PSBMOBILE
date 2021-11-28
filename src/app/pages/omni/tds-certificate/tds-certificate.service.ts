import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TdsCertificateService {

  constructor(
    private constant: AppConstants,
    private storage: LocalStorageService,
    public common:CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private dataService: DataService,
  ) { }

  getTdsCertificateCall(formdata, selectedPeriod, selectedQuarter, selectedYear) {
    var selMonth;
    var selYear;

    if(selectedPeriod == 'QUARTERLY') {
      if(selectedQuarter == 'Quarter 1') {
        selYear = selectedYear.split('-')[0];
        selMonth = '0104';
      }
      else if(selectedQuarter == 'Quarter 2') {
        selYear = selectedYear.split('-')[0];
        selMonth = '0107';
      }
      else if(selectedQuarter == 'Quarter 3') {
        selYear = selectedYear.split('-')[0];
        selMonth = '0110';
      }
      else if(selectedQuarter == 'Quarter 4') {
        selYear = '20' + selectedYear.split('-')[1];
        selMonth = '0101';
      }
    }
    else {
      selYear = selectedYear.split('-')[0];
      selMonth = '0104';
    }

    selectedPeriod = selectedPeriod == 'YEARLY' ? 'A' : 'Q'

    console.log('selected year: ', selYear);
    console.log('selected month: ', selMonth);
    var selYearMonth = selMonth + selYear;
    console.log('selected year month: ', selYearMonth);
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_accountNo]: formdata.accountNumber ? formdata.accountNumber : '00000000000000',
      [this.constant.key_tdsCertificateData]: selYearMonth + '|' + this.dataService.userDetails.cifNumber +'|'+ selectedPeriod + '|',
    }

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }

  getAssessmentYearCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_configType]: this.constant.val_assessmentYear,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getPeriodCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_configType]: this.constant.val_period,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getQuarterCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_configType]: this.constant.val_quarter,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
