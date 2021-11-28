import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {

  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    public common : CommonMethods) { }


    getProfileDetailsEditParam(isUPI?:boolean) {
      var inputData = {
        [this.constant.key_entityId]: isUPI ? this.constant.getEntityId(this.constant.val_entityId_UMOB) :this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_MobileNo]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_referenceNumber]:this.common.genRandomDigit(9),
      [this.constant.key_RRN]:this.common.genRandomDigit(9)
      }
      console.log("getProfileDetailsEditParam", JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }


    getProfileUpdateParamforUsername(profileDetails,formData) {
      console.log("detailllllllsssss"+profileDetails)
       var base64Img = '';
     // if(profileImg.split(",")[1] != null) base64Img = profileImg.split(",")[1];

      var inputData = {
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_entityId]:this.constant.getEntityId(this.constant.getEntityId()),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.Key_customerName]: formData.username.toLowerCase() ,
        [this.constant.key_emailId]: profileDetails[0].emailId.toLowerCase(),
        [this.constant.key_base64Image]: base64Img,
     }
      console.log('getProfileUpdateParam',JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }
    getProfileUpdateParamforEmail(profileDetails,formData)
    { var base64Img = '';
    // if(profileImg.split(",")[1] != null) base64Img = profileImg.split(",")[1];

     var inputData = {
       [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
       [this.constant.key_entityId]:this.constant.getEntityId(this.constant.getEntityId()),
       [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
       [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
       [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
       [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
       [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
       [this.constant.Key_customerName]:profileDetails[0].custName,
       [this.constant.key_emailId]:formData.emailId.toLowerCase(),
       [this.constant.key_base64Image]:  base64Img,
    }
     console.log('getProfileUpdateParam',JSON.stringify(inputData));
     let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
     return encryptData;

    }
    getProfileUpdateParamforAddress(profileDetails,formData)
    { var base64Img = '';

    //if(profileImg.split(",")[1] != null) base64Img = profileImg.split(",")[1];
       //var addressProof='';
     var inputData = {
       [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
       [this.constant.key_entityId]:this.constant.getEntityId(this.constant.getEntityId()),
       [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
       [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
       [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
       [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
       [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
       [this.constant.Key_customerName]:profileDetails.customerName,
       [this.constant.key_emailId]:profileDetails.email_id.toLowerCase(),
       [this.constant.key_address]:formData.address1+','+formData.address2+','+formData.address3+','+formData.city+','+formData.state+','+formData.pinCode+',',
       [this.constant.key_base64Image]:  base64Img,
    }
     console.log('getProfileUpdateParam',JSON.stringify(inputData));
     let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
     return encryptData;

    }


    getProfileUpdateParamForAadhar(formData)
    {
      var inputData = {
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_entityId]:'RMOB',
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]:this.common.genRandomDigit(8),
      [this.constant.key_referenceNumber]:this.dataService.profileDetails[0].referenceNumber,
      [this.constant.key_aadharUpdateData]:formData.aadhar
      }
      console.log('getProfileUpdateParam',JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }


    getProfileUpdateParamForPAN(formData)
    {
      console.log()
      var inputData = {
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_entityId]:'RMOB',
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_RRN]:this.common.genRandomDigit(8),
      [this.constant.key_referenceNumber]:this.dataService.profileDetails[0].referenceNumber,
      [this.constant.key_panUpdateData]:formData.pan
      }
      console.log('getProfileUpdatePANParam.....',JSON.stringify(inputData));
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
    }

    getEmailIdUpdateParam(profileDetails,formData)
    {

     var inputData = {
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_entityId]: 'RMOB',
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_UserID]: this.storage.getLocalStorage(this.constant.storage_username),
      [this.constant.key_Email]:formData.emailId,
      [this.constant.key_referenceNumber]:this.dataService.profileDetails[0].referenceNumber
   }
    console.log('getEmailUpdateParam',JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
    }

      /**
   * request parameter for login update
   */
   getCheckAvaiablityParam(username) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,

      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_UserID]: username

    }
    console.log('getCheckAvaiablityParam', JSON.stringify(inputData));
    // console.log('encrypt key ',this.localStorage.getLocalStorage('mobileNo')+this.constant.mapEncryptKey);
    let key = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
    console.log("key ", key);

    let encryptData = this.encryptDecryptService.encryptText(key, JSON.stringify(inputData));
    return inputData;
  }

  getResendLeadsOtpSessionCall(emailId, otpType) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_omni_emailId] : emailId,
      [this.constant.key_referenceNumber] : this.common.genRandomDigit(7).toString(),
      [this.constant.key_service_Type]: this.constant.val_CHANGEMAILID,
      [this.constant.key_otpType]: otpType
    }
    console.log("getValidateLeadOtpParam", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getValidateLeadsOtpSessionCall(mobileOtp, emailOtp, emailId) {
    var inputData = {
     [this.constant.key_entityId]: this.constant.getEntityId(),
     [this.constant.key_cbsType]: this.constant.val_cbsType,
     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
     [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
     [this.constant.key_latitude]: this.dataService.latitude,
     [this.constant.key_longitude]: this.dataService.longitude,
     [this.constant.key_emailOtp] : emailOtp,
     [this.constant.key_mobileOtp] : mobileOtp,
     [this.constant.key_mobileNumber]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
     [this.constant.key_omni_emailId] : emailId,
     [this.constant.key_referenceNumber]: this.dataService.referenceNo,
     [this.constant.key_service_Type]: this.constant.val_VALIDATEMAILID,
   }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getAadharValidation(aadharNo,transactionId){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_aadharNumber]: aadharNo,
      [this.constant.key_npci_txnId] : transactionId,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9)
    }
    console.log("aadhar request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }

  getValidateAadharValidation(aadharNo,transactionId){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_aadharNumber]: aadharNo,
      [this.constant.key_npci_txnId] : transactionId,
      [this.constant.key_RRN]: this.common.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9)
    }
    console.log("aadhar request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }



}

