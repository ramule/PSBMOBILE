import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TracesFormService {

  constructor(
    private constant: AppConstants,
    private storage: LocalStorageService,
    public common:CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private dataService: DataService,
  ) { }

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

  getPKCS7Signature(data,type?) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_Omni_data]:data,
      [this.constant.key_type]:type
      // [this.constant.key_configType]: this.constant.val_assessmentYear,
    }
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
