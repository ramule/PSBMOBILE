import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class TPINService {

  constructor(private constant: AppConstants, private encryptService: EncryptDecryptService, private constants: AppConstants, private localStorage: LocalStorageService, private dataService: DataService, private encryptDecryptService: EncryptDecryptService,private commonMethod: CommonMethods) { }
  /**
   * To set resend OTP request request
   */
  getResendOTPSessionReq(type) {
    var reqObj;
    reqObj = {
      [this.constants.key_entityId]: this.constant.getEntityId(),
      [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
      [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
      [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
      [this.constant.key_MobileNo]:  this.localStorage.getLocalStorage('mobileNo'), // "8249443992", // this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]: this.constant.val_longitude,
      [this.constant.key_service_Type]: type
    }
    console.log('resend OTP', JSON.stringify(reqObj));
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj));
    // let encryptData = this.encryptDecryptService.encryptText("19816465728282", JSON.stringify(reqObj));
    return encryptData;
  }




  /**
   * To get send otp request this function is invoked
   * @param otpFormData
   */
  getVerifyTPINReq(tpinVal) {
    var reqObj;
     
    reqObj = {
      [this.constants.key_entityId]: this.constant.getEntityId(),
      [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
      [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
      [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
      [this.constant.key_UserID]:this.localStorage.getLocalStorage(this.constant.storage_username) ? this.localStorage.getLocalStorage(this.constant.storage_username) :this.dataService.omniProfileName,
      [this.constant.key_typeOfPin]:'TPIN',
      [this.constant.key_TPIN]: this.encryptDecryptService.createMD5Value(tpinVal),
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude,
    }

    console.log(reqObj);
    return this.encryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj))
  }

  /**
 * param for add omnichannel
 * @endPoint
 */
  getAddOmniChannelParam(endPoint) {
    var request;
    var accountNo;
    var serviceType = endPoint
    if (endPoint == this.constants.serviceName_OWNFUNDTRANSFER) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_ownTransfer);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }
    else if (endPoint == this.constants.serviceName_NEFTFUNDTRANSFER) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_neftTransfer);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }
    else if (endPoint == this.constants.serviceName_RTGSFUNDTRANSFER) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_rtgsTransfer);
      accountNo = JSON.parse(request)[this.constant.key_senderAccount];
    }
    else if (endPoint == this.constant.serviceName_ADDBENEFICIARY) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_addPayee);
      accountNo = JSON.parse(request)[this.constant.key_beneficiary_account_no];
    }
    else if (endPoint == this.constant.serviceName_ISSUECHEQUEBOOK) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_chequeBookReq);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }
    else if (endPoint == this.constant.serviceName_STOPCHEQUEPAYMENT) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_singleCheque);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }
    else if (endPoint == this.constant.serviceName_STOPBULKCHEQUEPAYMENT) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_bulkCheque);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }
    else if (endPoint == this.constant.serviceName_WATERBILLPAYMENT) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_WaterBillpay);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }else if (endPoint == this.constant.serviceName_RECHARGEMOBILEDTHDATACARD) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_DTHBillpay);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }else if (endPoint == this.constant.serviceName_PAYMOBILEBILL) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_mobileBillPay);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }else if (endPoint == this.constant.serviceName_TRANSFERTRANSACTION) {
      request = this.dataService.getOmniChannelReqParam(this.constant.key_omni_mobileBillPay);
      accountNo = JSON.parse(request)[this.constant.key_accountno];
    }

    let _request = request;

    console.log("======== start =========");
    console.log(endPoint);
    console.log(request);
    console.log(accountNo);

    var reqObj;
    reqObj = {
      [this.constants.key_entityId]: this.constant.getEntityId(),
      [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
      [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
      [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage("deviceId"),
      [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
      [this.constant.key_reqData]: request,
      [this.constant.key_accountNumber]: accountNo,
      [this.constant.key_MobileNo]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_service_Type]: serviceType.split('/')[1],
      [this.constant.key_pendingat]: 'tpin',
      [this.constant.key_channelAction]: endPoint,
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude,
    }

    console.log(reqObj);
    console.log("======== end =========");
    return this.encryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj))
  }

  /**
   * param to set omni final param
   * @status
   */
  getOmniChannelParam(status) {
    var reqObj;
    reqObj = {
      [this.constants.key_entityId]: this.constant.getEntityId(),
      [this.constants.key_cbsType]: this.constants.val_cbsTypeTcs,
      [this.constants.key_mobPlatform]: this.constants.val_mobPlatform,
      [this.constants.key_mobileAppVersion]: this.constants.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constants.val_clientAppVersion,
      [this.constant.key_MobileNo]: this.localStorage.getLocalStorage('mobileNo'),
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage("deviceId"),
      [this.constant.key_latitude]: this.constant.val_latitude,
      [this.constant.key_longitude]:this.constant.val_longitude,
      [this.constant.key_referenceNumber]: this.dataService.referenceNo,
      [this.constant.key_Status]: status == 'success' ? "9" : "10"
    }
    console.log(reqObj);
    return this.encryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj))
  }


  getAadhaarValOtp(aadharNo,otp, transactionId){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_aadharNumber]: aadharNo,
      [this.constant.val_npci_credTypeOnlyOtp] :otp,
      [this.constant.key_npci_txnId] : transactionId,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9)
    }
    console.log("aadhar request", inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }
  
}
