import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotUsernameService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private datepipe: DatePipe
  ) { }

  getForgotUserName(formData) {

    var datePipe = this.datepipe.transform(formData.dob, 'dd-MM-yyyy')

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      //[this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.Key_customerId]:formData.customerID,
      [this.constant.key_UserID]:formData.mobile,
      [this.constant.key_MobileNo]:formData.mobile,
      [this.constant.Key_dateOfBirth]: datePipe,
    }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }

  getMaskDetailsParams() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
    }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText("7038615424jrD@Mt6i", JSON.stringify(inputData));
    return encryptData;
  }
}


