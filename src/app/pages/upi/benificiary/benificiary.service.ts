import { Injectable, NgZone } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { DataService } from '../../../services/data.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { PluginService } from '../../../services/plugin-service';
import { AddBenificiary } from '../../../models/add-benificiary-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
@Injectable({
  providedIn: 'root'
})
export class BenificiaryService {
  userLocationName: any;
  latitude: any;
  longitude: any;

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private pluginService: PluginService,
    private localStorage: LocalStorageService,
    private http: HttpRestApiService,
    private ngZone: NgZone
  ) { }

  getUserLocation() {
    // this.dataService.getCurrentLatLong().subscribe((data) => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Success => ', data);
    //   console.log(this.dataService.latitude);
    //   console.log(this.dataService.longitude);

    this.latitude = this.dataService.latitude ? this.dataService.latitude : "0";
    this.longitude = this.dataService.longitude ? this.dataService.longitude : "0";

    // this.dataService.getUserLocationName(this.latitude, this.longitude).subscribe((data) => {
    //   console.log('data', data);
    //   console.log("dataservice.userLocationName => ", this.dataService.userLocationName);
    this.userLocationName = this.dataService.userLocationName;
    //   }, (err) => {
    //     console.log('err', err);
    //   });
    // }, err => {
    //   console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
    // });
  }

  /**
 * request parameter for setAddBenificiaryRequest
 */
  setAddBenificiaryRequest(addBenificiary: AddBenificiary, isAccountOrIfsc: boolean, isVPA: boolean, isMMid: boolean) {
    var QRScanData = this.dataService.ScanQrCodeData ? this.dataService.ScanQrCodeData : {};
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_ADDBENIFICIARY,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_payeeName]: addBenificiary.payeeName,
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_nickName]: addBenificiary.nickName,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_is_Favourite]: addBenificiary.isFavourite,
        [this.constant.key_upi_appID]: this.constant.val_upi_psb,
        [this.constant.key_upi_device]:
        {
          [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
          [this.constant.key_upi_capability]: this.constant.val_upi_capability,
          [this.constant.key_upi_lng]: this.longitude,
          [this.constant.key_upi_lat]: this.latitude,
          [this.constant.key_upi_os]: this.dataService.platform,
          [this.constant.key_upi_ip]: this.dataService.ipAddress,
          [this.constant.key_upi_location]: this.userLocationName,
          [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
        },
      }

    }
    if (isAccountOrIfsc) {
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_accNum] = this.dataService.upiBenfAccNo ? this.dataService.upiBenfAccNo : QRScanData.qrAccountNo;
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_ifsc] = this.dataService.upiBenfIfsc ? this.dataService.upiBenfIfsc : QRScanData.qrIfsc;
    } else if (isVPA) {
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_payeeVPA] = addBenificiary.payeeVPA;
    } else if (isMMid) {
      upiRequestObj[this.constant.key_upi_inputParam][this.constant.key_upi_mmid] = this.dataService.upiBenfMMId;
    }
    console.log('setAddBenificiaryRequest ', JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }



  /**
   * Common function to set omni request for upi
   * @param upiRequestObj 
   */
  getOmniRequestObject(upiRequestObj) {
    var upiRequestObj = upiRequestObj;
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(this.constant.val_entityId_UMOB),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_upiRequest]: JSON.stringify(upiRequestObj)
    };

    console.log('inputData => ', JSON.stringify(inputData));
    return this.getEncryptedOmniRequestObject(inputData);
  }

  /**
   * request parameter for getBenficiaryListReq
   */
  getBenficiaryListReq(benListType, benfListMode) {
    var upiRequestObj = {
      [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
      [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
      [this.constant.key_upi_subAction]: this.constant.upiserviceName_GETBENIFICIARYLIST,
      [this.constant.key_upi_inputParam]: {
        [this.constant.key_upi_appVersion]: this.constant.val_upi_app_version,
        [this.constant.key_upi_entityID]: this.constant.val_upi_psb,
        [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
        [this.constant.key_upi_beneListType]: benListType,
        [this.constant.key_upi_language]: this.dataService.getSelectedLanguageCodeUPI(),
        [this.constant.key_upi_beneListMode]: benfListMode,
        [this.constant.key_upi_device]:
        {
          [this.constant.key_upi_app]: this.constant.val_app_pakage_name,
          [this.constant.key_upi_capability]: this.constant.val_upi_capability,
          [this.constant.key_upi_lng]: this.longitude,
          [this.constant.key_upi_lat]: this.latitude,
          [this.constant.key_upi_os]: this.dataService.platform,
          [this.constant.key_upi_ip]: this.dataService.ipAddress,
          [this.constant.key_upi_location]: this.userLocationName,
          [this.constant.key_upi_mobileNo]: this.commonMethod.processPhoneNo(this.storage.getLocalStorage(this.constant.storage_mobileNo)),
          [this.constant.key_upi_deviceID]: this.storage.getLocalStorage(this.constant.storage_deviceId)
        }
      }
    }
    console.log("getBenficiaryListReq ", JSON.stringify(upiRequestObj));

    return this.getOmniRequestObject(upiRequestObj);
  }


  /**
   * Common function to encrypt the data
   * @param inputData 
   */
  getEncryptedOmniRequestObject(inputData) {
    console.log('session Key : ', this.storage.getSessionStorage(this.constant.val_sessionKey))
    // let encryptData = this.encryptDecryptService.encryptText(this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey, JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));

    console.log('encryptDatagetOmniRequestObject => ', JSON.stringify(encryptData));
    return encryptData;
  }


  getBenificiaryList() {
    return new Promise((resolve, reject) => {
      this.ngZone.run(() => {
        if (this.dataService.fetchUPIbenificiaryLists) {
          this.getUserLocation();
          this.fetchBenificiaryList(resolve);
        } else {
          resolve({'recentBeneList': this.dataService.recentBeneficiaryList, 'FavBeneList': this.dataService.favPayeeList })
        }
      })
    })
  }

  fetchBenificiaryList(resolve) {
    var reqParams = this.getBenficiaryListReq(this.constant.val_upi_benListType_ALL, this.constant.val_upi_ANY);
    this.UpiApiCall(reqParams, resolve);
  }


  /**
  * Common Api Call for beneficiaryList 
  * @param request 
  */
  UpiApiCall(request, resolve) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETBENIFICIARYLIST:
            this.dataService.recentBeneficiaryList = response.responseParameter?.beneficiaryList ? response.responseParameter?.beneficiaryList :[] ;
            this.dataService.favPayeeList = response.responseParameter?.FavBeneList ? response.responseParameter?.FavBeneList : [];
            resolve({ 'recentBeneList': this.dataService.recentBeneficiaryList, 'FavBeneList': this.dataService.favPayeeList })
            this.dataService.fetchUPIbenificiaryLists = false;
            break;

          default:
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

 

}
