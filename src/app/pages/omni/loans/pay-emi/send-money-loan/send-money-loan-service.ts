import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SendMoneyLoanService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private common : CommonMethods,
    private datepipe : DatePipe
  ) { }


  /**
   * 
   * 
   * getRecommendedOffersReq
   * 
   */
  getSendMoneyLoanReq(fromAcc,toAcc,amount,remark) {
    var _amount = ""+amount
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_referenceNumber]: this.common.genRandomDigit(9),
      [this.constant.key_accountNo] : fromAcc,
      [this.constant.key_toAccount]: toAcc,
      [this.constant.key_loanCreditsData]: remark==""? '-': remark,
      [this.constant.key_amount]:_amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_RRN]: this.common.genRandomDigit(9)
    }

    console.log('Recommended offers Req',JSON.stringify(inputData));
    

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

}
