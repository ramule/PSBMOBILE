import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../../app.constant';
import { DatePipe, Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {EncryptDecryptService} from '../../../../../../services/encrypt-decrypt.service'
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from '../../../../../../services/local-storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class MobilePrepaidServiceService {

  constructor(  private constant: AppConstants,
    private storage: LocalStorageService,
    private datepipe: DatePipe,
    private dataService: DataService,
    private encryptDecryptService : EncryptDecryptService,private http: HttpClient) { }

    getPrepaidOperator(mobnumber){
      var inputData = {
        [this.constant.key_entityId]: "PSB",
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage("deviceId"),
        [this.constant.key_service_name]:this.constant.serviceName_RetrieveOperatorDetails,
        [this.constant.Key_recharge_mobNumber]:mobnumber.substring(0, 5)
        
        
      }
      console.log("getbillerlist ==>" + JSON.stringify(inputData))
      console.log('this.storage.getSessionStorage(this.constant.val_sessionKey)' , this.storage.getSessionStorage(this.constant.val_sessionKey))
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }
}
