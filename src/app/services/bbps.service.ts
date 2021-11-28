import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constant';
import { DatePipe, Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {EncryptDecryptService} from '../services/encrypt-decrypt.service'
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from '../services/local-storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class BbpsService {
  constructor(
    private constant: AppConstants,
    private storage: LocalStorageService,
    private datepipe: DatePipe,
    private dataService: DataService,
    private encryptDecryptService : EncryptDecryptService,private http: HttpClient ) { }

 
  
    getBillerCategories(){
      var inputData = {
      [this.constant.key_entityId]: "PSB",
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_service_name] :this.constant.serviceName_GetCategories,
    }
    console.log("getbillerlist ==>" + JSON.stringify(inputData))
    console.log('this.storage.getSessionStorage(this.constant.val_sessionKey)' , this.storage.getSessionStorage(this.constant.val_sessionKey))
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

    getLocationList(type){

      
      var inputData = {
        [this.constant.key_entityId]: "PSB",
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_service_name]:this.constant.serviceName_GetBillerLocationService,
        [this.constant.key_biller_category]:type,
        
        
      }
      console.log("getLocationlist ==>" + JSON.stringify(inputData))
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    getbillerlist(location , type) {
      var inputData = {
        [this.constant.key_entityId]: "PSB",
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_service_name]:this.constant.serviceName_GetBillerListService,
        [this.constant.key_biller_category]:type,
        [this.constant.key_biller_location]:location,  
      }
      console.log("getbillerlist ==>" + JSON.stringify(inputData))
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    } 


    ValidatePaymentParam( data){
     
      var platformtype =''
      if (this.constant.getPlatform() == "web") {
        platformtype = 'InternetBanking'
      }else{
        platformtype = 'MobileBanking'
      }
    
      var devicedetails = {
        "init_channel": platformtype,
        "ip": this.dataService.ipAddress,
        "mac": "11-AC-58-21-1B-AA"
      }
    
      
      var inputData = {
        [this.constant.key_entityId]: "PSB",
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_service_name]:this.constant.serviceName_ValidatePaymentService,
        [this.constant.key_biller_authenticators]:JSON.stringify(data.authenticators),
        [this.constant.key_billerid]: data.billerId,
        "customerId": this.dataService.customerID,
        "sitxn": "no",
        [this.constant.key_cust_firstName]:this.dataService.userDetails?.customerName.split(' ')[0],
        [this.constant.key_cust_lastName]: this.dataService.userDetails?.customerName.split(' ')[this.dataService.userDetails?.customerName.split(' ').length - 1],
        [this.constant.key_cust_mobile]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_cust_email]:  this.dataService.profileDetails[0].emailId.toLowerCase(),
        [this.constant.key_cust_device]: JSON.stringify(devicedetails),

        
      }
      console.log("getbillerlistparam ==>" + JSON.stringify(inputData))
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

}
