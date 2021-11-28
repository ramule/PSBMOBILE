import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ExistingBillPayemtServiceService {

  constructor(private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private datepipe: DatePipe,
    private storage: LocalStorageService,) { }


    getBbpsTransferParam(formData , fromAccount , toAccount , paymentMode , ID, companyName){
      var platformtype =''
      if (this.constant.getPlatform() == "web") {
        platformtype = 'InternetBanking'
      }else{
        platformtype = 'MobileBanking'
      }
      console.log(" : " + JSON.stringify(formData))
     var  paymentAcc = {"payment_method":"BankAccount",
                          "account_number": fromAccount,
                          "ifsc": formData.ifsc
                        }
     
     var custdetials  = {
                        "firstname":this.dataService.userDetails?.customerName.split(' ')[0],
                         "lastname": this.dataService.userDetails?.customerName.split(' ')[this.dataService.userDetails?.customerName.split(' ').length - 1], 
                         "mobile": this.storage.getLocalStorage(this.constant.storage_mobileNo),
                         "email": this.dataService.profileDetails[0].emailId.toLowerCase()
                        }
      var devicedetails = {
                        "init_channel": platformtype,
                        "ip": this.dataService.ipAddress,
                        "mac": "11-AC-58-21-1B-AA"
                      }
      var bbpsData = {
        "serviceName":"MakePaymentService",
        "entityId":"PSB",
        "customerId": this.dataService.customerID, // this.DataService.customerID
        "validationid": formData.validationid,
        "payment_type": formData.paymentType,
        "currency": "356",
        "payment_amount": formData?.billamt,
        "cou_conv_fee": formData.cou_conv_fee,
        "bou_conv_fee": formData.bou_conv_fee,
        "debit_amount": formData?.billamt,
        "payment_remarks": formData.remarks ?  formData.remarks : "-",
        "payment_account": JSON.stringify(paymentAcc),
        "customer": JSON.stringify(custdetials),
        "device": JSON.stringify(devicedetails),
        "category": formData.billCategory
      }
     
        console.log("encryptedBbpsdata :" + bbpsData)
      
      var inputData = {};
      inputData = {                                                 
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]:'1',
        [this.constant.key_accountNo] : fromAccount,
        [this.constant.key_toAccount]: toAccount,
        [this.constant.key_amount]: formData?.billamt.trim().replace(/[^0-9]+/g,''),
        [this.constant.key_remarks]: formData.remarks ?  formData.remarks : "-",
        [this.constant.key_MobileNo_Org]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_latitude]: this.dataService.latitude,
        [this.constant.key_longitude]: this.dataService.longitude,
        [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9), //need to change later
        [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
        [this.constant.key_transType]: paymentMode,
        [this.constant.key_donationId]: ID,
        [this.constant.key_debitBranchCode]: '0000',
        [this.constant.key_creditBranchCode]: '0000',
        [this.constant.key_senderName]: this.dataService.userDetails?.customerName,
        [this.constant.key_receiverName]: companyName,
        [this.constant.key_TransactionDate]: this.datepipe.transform(new Date().toISOString(), 'dd-MM-yyyy hh:mm:ss'),
        "actionType":"Quick",
        "merchName":"bbps",
        "bbpsData" : JSON.stringify(bbpsData)
      
      }
  
      console.log("BBPS inputData" + JSON.stringify(bbpsData));
    // this.dataService.setOmniChannelReqParam(this.constant.key_omni_ownTransfer,JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
    }
 
}
