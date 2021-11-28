import { Injectable } from '@angular/core';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from '../../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class SelectOtherBankService {
  inputData : any;

  constructor(private constant:AppConstants, private http:HttpRestApiService, private encryptDecryptService: EncryptDecryptService) { }

  getOmniRequestObject(upiRequestObj) {
    var upiRequestObj = upiRequestObj;

    this.inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType] : this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: "16087011273489773080463",
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
    };

    console.log('inputData => ', JSON.stringify(this.inputData));

    this.getEncryptedOmniRequestObject();
  }

  getEncryptedOmniRequestObject() {
    console.log("encrypt key => ", "9773080463" + this.constant.mapEncryptKey);
    let encryptData = this.encryptDecryptService.encryptText("9773080463" + this.constant.mapEncryptKey, JSON.stringify(this.inputData));

    return encryptData;
  }

  getAccountProviderListRequestObject() {
    var upiReqObj = {
      [this.constant.key_upi_entityID] : this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo] : "9773080463",
      [this.constant.key_upi_subAction] : this.constant.upiserviceName_GETACCOUNTPROVIDERLIST,
      [this.constant.key_upi_inputParam] : {
        [this.constant.key_upi_language] : this.constant.val_upi_en_US,
        [this.constant.key_upi_mobileNo] : "9773080463"
      }
    };

    this.getOmniRequestObject(upiReqObj);
  }
}
