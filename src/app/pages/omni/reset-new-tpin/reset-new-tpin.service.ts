import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app/app.constant';
import { DataService } from '../../../services/data.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { CommonMethods } from '../../../utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class resetNewTpinService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    public common : CommonMethods
  ) { }


    /**
   * request parameter validate for debit card number
   */
  getValidateTpinParam(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_TPIN]: this.encryptDecryptService.createMD5Value(formdata),
      [this.constant.key_service_Type]: ""
    }

    let encryptData = this.encryptDecryptService.encryptText(
      this.storage.getLocalStorage(this.constant.storage_mobileNo) +
        this.constant.mapEncryptKey,
      JSON.stringify(inputData)
    );

    console.log("getValidateMpinParam ====>" + JSON.stringify(inputData));
    //let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage('mobileNo') + this.constant.mapEncryptKey, JSON.stringify(inputData));
    return encryptData;
  }



}

