import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class OtpAPIService {

  constructor(private constant : AppConstants,private encryptService:EncryptDecryptService, private constants:AppConstants,private localStorage:LocalStorageService,private dataService : DataService){}
  /**
   * To set resend OTP request request
   */
  getResendOTPReq(otpPreviousPage?){
    var reqObj;

      reqObj =  {
        [this.constants.key_entityId]: this.constant.getEntityId(),
        [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
        [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
        [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.localStorage.getLocalStorage("deviceId") == undefined ? this.constant.val_DeviceID : this.localStorage.getLocalStorage("deviceId"),
        [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
        [this.constant.key_latitude]: this.constant.val_latitude,
        [this.constant.key_longitude]:this.constant.val_longitude,
        [this.constant.key_service_Type]: "Login"
      }

      if(this.constant.getEntityId() == this.constant.val_Desktop && otpPreviousPage == '/login'){
        reqObj[this.constant.key_UserID] = this.localStorage.getLocalStorage("username");
      }else{
        reqObj[this.constant.key_MobileNo] = this.localStorage.getLocalStorage("mobileNo");
      }

      console.log('resend OTP',JSON.stringify(reqObj));
      console.log('mobStaticEncKey ',this.dataService.mobStaticEncKey);


      return this.encryptService.encryptText(this.dataService.mobStaticEncKey,JSON.stringify(reqObj));
      //return reqObj;
  }




/**
 * To get send otp request this function is invoked
 * @param otpFormData
 */
  getSendOTPReq(otpnumber , otpPreviousPage?:any ){
    var reqObj;
    reqObj =  {
      [this.constants.key_entityId]: this.constant.getEntityId(),
      [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
      [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
      [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage("deviceId"),
      //[this.constant.key_deviceId]: "9",
      [this.constants.key_OTP]:otpnumber,
      [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude,
      [this.constant.key_service_Type]: this.constant.val_REGISTRATION
    }

    if(this.constant.getEntityId() == this.constant.val_Desktop && otpPreviousPage == '/login'){
      reqObj[this.constant.key_UserID]= this.localStorage.getLocalStorage("username")
    }else{
      reqObj[this.constant.key_MobileNo]=  this.localStorage.getLocalStorage("mobileNo")
    }

    console.log(reqObj);
    console.log('mobStaticEncKey ',this.dataService.mobStaticEncKey);

    return this.encryptService.encryptText(this.dataService.mobStaticEncKey,JSON.stringify(reqObj))
    //return reqObj;
  }
}
