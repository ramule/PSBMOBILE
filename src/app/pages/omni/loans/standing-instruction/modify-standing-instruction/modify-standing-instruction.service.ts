import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ModifyStandingInstructionService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private commonMethod : CommonMethods,
    private datepipe : DatePipe
  ) { }

  getModifyStandingInstruction(siNum, formData, amount) {
    // var date = this.datepipe.transform(new Date().toISOString(), "dd-MM-yyyy");

    let dateVal = formData.datepicker1.split("-")[0].replace(/^0+/, '')


    console.log("Date Val == > ", formData.datepicker1)
    var modifyStandingInstructionData = siNum+"|"+formData.debitAccount+"|"+formData.creditAccount+"|"+amount+"|"+formData.paymentFrequency+"|"+ formData.installmentNumber +'|'+ dateVal +"|"+ formData.datepicker1+"|"+ formData.remarks;

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNoOrg]: this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_standingInstructionData] : modifyStandingInstructionData ,
    }

    console.log('Modify Standing Instruction  : ',JSON.stringify(inputData));
    

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
