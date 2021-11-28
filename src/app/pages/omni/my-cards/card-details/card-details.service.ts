import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  constructor(  private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage:LocalStorageService,
    public dataService : DataService,
    public commonMethod: CommonMethods,
    private localStorage: LocalStorageService,
    public datepipe : DatePipe) { }

    getAccountOpeningDetails(branchCode,accountNo)
    {
      var inputData = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_MobileNoOrg]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
        [this.constant.key_RRN]:this.commonMethod.genRandomDigit(9),
        [this.constant.key_branchCode]:branchCode,
        [this.constant.key_accountNo]:accountNo,
      }

    console.log(inputData);
      let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
      return encryptData;
      }


  getCardApplyDetails(formData,accountNo,accountType,branchCode,Date,cardDtl,type)
  {

    var acctype;
    switch (accountType) {
      case 'SBA':
        acctype = 10;
        break;
      case 'CAA':
        acctype = 20;
        break;
      case 'ODA':
        acctype = 30
        break;
      case 'CCA':
        acctype =40
        break;
    }

    var dateOfBirth = this.dataService.profileDetails[0].custBirthDate;
    dateOfBirth = dateOfBirth.split("-").join('/')

    // this.dataService.isCardUpgrade ? 'U' : 'P'
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_BinPrefix]: cardDtl.bin,
      //[this.constant.key_CifId]:"008168899",
       //[this.constant.key_CifId]: "PSBI"+this.commonMethod.genRandomDigit(10),
      [this.constant.key_CardProgram]:cardDtl.cardType,
      [this.constant.key_PinMailer]: formData.ecom ? "G" : "V",//P or V
      [this.constant.key_CardType]: "P",//P or A//formData.ecom ? "P" : "A"
      [this.constant.key_CustomerName]:this.dataService.userDetails.customerName, //
      [this.constant.key_NameOnCard]:formData.name,
      [this.constant.key_CifCreationDate]:"",
      [this.constant.key_AccountType]:acctype,
      [this.constant.key_AccountNo]:accountNo,
      [this.constant.key_accountOpeningDate]:Date,
      [this.constant.key_Address1]:this.dataService.profileDetails[0].add1,
      [this.constant.key_Address2]:this.dataService.profileDetails[0].add2 ? this.dataService.profileDetails[0].add2 : "-",
      [this.constant.key_City]:this.dataService.profileDetails[0].cityCode,
      [this.constant.key_City1]:this.dataService.profileDetails[0].cityCode,
      [this.constant.key_State]:this.dataService.accountOpenFldData.stateCode,
      [this.constant.key_Pincode]:this.dataService.profileDetails[0].pin,
      [this.constant.key_Country]:this.constant.val_Country,
      [this.constant.key_MothersMaidenName]:"-", //
      [this.constant.key_DateOfBirth]:dateOfBirth,
      [this.constant.key_CountryCode1]:"91",
      [this.constant.key_MobileNo]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_EmailID]:this.dataService.profileDetails[0].emailId.toLowerCase(), //
      [this.constant.key_BranchCode]:branchCode,
      [this.constant.key_PanNumber]:this.dataService.profileDetails[0].panNumber,
      [this.constant.key_aadharNumber]:this.dataService.profileDetails[0].aadharNumber,
      [this.constant.key_service_Type]: type,

  }

   console.log(inputData);
  //this.dataService.setOmniChannelReqParam(this.constant.key_omni_ownTransfer,JSON.stringify(inputData));//set omni channel req
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }



  getReissueCard(selectedDataCard, getPhysical,newCardDtl,branchCode,type) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_debitCardNo]: selectedDataCard.CardNo,
      [this.constant.key_methodName]: "REISSUEDEBITCARD",
      [this.constant.key_BinPrefix]: newCardDtl.bin, ///
      [this.constant.key_RequestFor]: "R",
      [this.constant.key_CardProgram]: newCardDtl.cardType, ///
      [this.constant.key_PinMailer]: getPhysical ? "G" : "V",
      [this.constant.key_CifId]: selectedDataCard.Cifid,
      [this.constant.key_BranchCode]: branchCode,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_accountNo]: selectedDataCard.AccountNo,
      [this.constant.key_service_Type]: type,
    }

    console.log(inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }



  getBlockReissueCardParam(selectedDataCard, getPhysical,newCardDtl,branchCode,type) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_RequestID]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_debitCardNo]: selectedDataCard.CardNo,
      [this.constant.key_cardStatus]: "9",
      [this.constant.key_methodName]: "BLOCKCARDANDREISSUE",
      [this.constant.key_BinPrefix]: newCardDtl.bin, ///
      [this.constant.key_RequestFor]: "R",
      [this.constant.key_CardProgram]: newCardDtl.cardType, ///
      [this.constant.key_PinMailer]: getPhysical ? "G" : "V",
      [this.constant.key_CifId]: selectedDataCard.Cifid,
      [this.constant.key_BranchCode]: branchCode,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_accountNo]: selectedDataCard.AccountNo,
      [this.constant.key_service_Type]: type,
    }

    console.log(inputData);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;

  }

}
