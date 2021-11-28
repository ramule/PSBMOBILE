import { Injectable } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AppConstants } from '../../../app.constant';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { CommonMethods} from '../../../utilities/common-methods';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service'

@Injectable({
    providedIn: 'root'
})

export class FaqService {
    constructor ( private dataService: DataService,
        private constant: AppConstants,
        private storage: LocalStorageService,
        private commonMethod: CommonMethods,
        private encryptDecryptService: EncryptDecryptService
    ){}

    getFaqRequest() {
        var upiRequestObj = {
          [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
          [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETFAQ,
          [this.constant.key_upi_inputParam]: {
            [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
            [this.constant.key_upi_appVersion]: this.constant.val_mobileAppVersion,
            [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
            [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
                [this.constant.key_upi_device]: {
                    [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
                    [this.constant.key_upi_capability]: this.constant.val_upi_capability,
                    [this.constant.key_upi_os]: this.dataService.platform,
                    [this.constant.key_upi_ip]: this.dataService.ipAddress,
                    [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
                    [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
                }    
          }
        }
        console.log("upiRequestObj=> ",upiRequestObj);
        return this.getOmniRequestObject(upiRequestObj);
    }

    getOmniRequestObject(upiRequestObj) {
        var upiRequestObj = upiRequestObj;
        var inputData = {
          [this.constant.key_entityId]: this.constant.val_entityId_UMOB,
          [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
          [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
          [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
          [this.constant.key_deviceId]: "33011342265556",
          [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
          [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
        };
        console.log('inputData => ', JSON.stringify(inputData));
        return this.getEncryptedOmniRequestObject(inputData);
    }
    getEncryptedOmniRequestObject(inputData) {
        console.log('session Key : ', this.storage.getSessionStorage(this.constant.val_sessionKey))
        // let encryptData = this.encryptDecryptService.encryptText(this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)) + this.constant.mapEncryptKey, JSON.stringify(inputData));
        let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
        console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
        return encryptData;        
    }
}   