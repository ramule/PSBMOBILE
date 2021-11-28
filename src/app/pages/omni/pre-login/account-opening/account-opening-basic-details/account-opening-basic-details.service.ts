import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AccountOpeningBasicDetailsService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private storage: LocalStorageService,
  ) { }

  getmobileNoCheckParam(formdata) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: formdata.mobile,
      [this.constant.key_channelType]: this.dataService.getChannelType(),
      [this.constant.key_deviceModel]: this.dataService.devicemodel,
      [this.constant.key_isBiometric]: this.dataService.isBiometric,
      [this.constant.key_imei]: this.dataService.uuid,
      [this.constant.key_imsi]: "",
      ['requestType']:'verify',
      [this.constant.key_OSVERSION]: this.dataService.osversion,
      [this.constant.key_OS]: this.dataService.platform,
      [this.constant.key_MACADDRESS]: this.dataService.macAddress,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9)

    }

    if(this.constant.getPlatform() != "web"){
      inputData[this.constant.key_pushNotificationToken]= this.dataService.fcmToken
    }



    console.log("check sim binding",JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }
}

