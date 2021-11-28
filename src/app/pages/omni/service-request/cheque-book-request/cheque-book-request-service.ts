import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ChequeBookReqService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService : DataService,
    private commonMethod : CommonMethods
  ) { }

  /**
   * Creating request for search ifsc code
   */
  getIssueChequebookRequest(accNo, custId, address, pageNo) {
    var issunaceOfchqbookData = this.storage.getLocalStorage(this.constant.storage_mobileNo)+"|"+custId+"|"+accNo+"|"+pageNo+"|"+address;
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_accountno]: accNo,
      [this.constant.Key_customerId]: custId,
      [this.constant.key_customerAddress]: address,
      [this.constant.key_numberOfPages]: pageNo,
      [this.constant.key_issunaceOfchqbookData] : issunaceOfchqbookData,
      [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]:this.commonMethod.genRandomDigit(9)
      //issunaceOfchqbookData
    }

    console.log("Issue check book",JSON.stringify(inputData));
    //this.dataService.setOmniChannelReqParam(this.constant.key_omni_chequeBookReq, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }


  /**
   * Get CityList by stateId
   * @param stateId
   */
  // getCityListParams(stateId) {
  //   var inputData = {
  //     [this.constant.key_entityId]: this.constant.getEntityId(),
  //     [this.constant.key_cbsType]: this.constant.val_cbsType,
  //     [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
  //     [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
  //     [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
  //     [this.constant.key_latitude]: this.dataService.latitude,
  //     [this.constant.key_longitude]: this.dataService.longitude,
  //     [this.constant.key_StateId]: stateId
  //   }

  //   console.log('city Params ', JSON.stringify(inputData));

  //   let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  //   return encryptData;

  // }

  getAddressOfCheckBook(accNo){
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_MobileNo_Org] : this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_accountNo] : accNo
    }
    console.log('city Params ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getStateListParams() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_CountryCode]: "1" //Country code 1 is for india
    }
    console.log("getStateListParams ",JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;

  }

  /**
   * Get CityList by stateId
   * @param stateId
   */
   getCityListParams(stateId) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_StateId]: stateId
      // [this.constant.key_StateId]: 10016,
    }

    console.log('city Params ', JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    //return inputData;
    return encryptData;
  }



}
