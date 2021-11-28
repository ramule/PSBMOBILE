import { Component, NgZone, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service'
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { RegistrationStatus } from 'src/app/utilities/app-enum';
import { RegistrationMobCheckService } from '../../omni/pre-login/registration/registration-mob-check/registration-mob-check.service';
import { PluginService } from 'src/app/services/plugin-service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';

declare var showToastMessage: any;
declare var navigator: any;
declare var toastLiveMessage : any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  // headerdata = {
  //   'headerType': 'none',  //Options: TitleHeader , preloginHeader
  //   'titleName':'none',            // Note : add titlename if headerType = TitleHeader
  //   'footertype':'upiLandingFooter', //Options: upiFooter , none
  // }

  headerdata = {
    'headerType': 'none',
    'sidebarNAv': 'none',
    // 'footertype':'upiLandingFooter'
    'footertype': 'upiFooter'
  };
  popupData: any = {};

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    public dataService: DataService,
    private registrationService: RegistrationMobCheckService,
    public plugin: PluginService,
    private translate: TranslatePipe,
    private commonMethod: CommonMethods,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // this.dataService.addPreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.dataService.bezellessIphone) {
        $("#mainDiv").addClass("pre-login");
      }
    });
    this.dataService.previousPageUrl = "\LandingPage";
    this.dataService.changeMessage(this.headerdata);
    toastLiveMessage();
  }

  routeTo(location) {
    console.log('location', location);
    this.router.navigateByUrl(location);
  }

  /**
   * This function will validate if sim binding is done or not
   */
  gotoRegister(regtype?:any): void {

    // if(regtype == 'nri' || regtype == 'loan'){
    if(regtype == 'nri' ){
      return ;
    }
    // this.router.navigateByUrl('/upiRegistration');
    this.dataService.omniRegistrationFlow = true;
    this.dataService.upiRegistrationFlow = false;
    this.dataService.regIsAtStep = 1;
    this.dataService.regFeildData.custId = "";
    this.dataService.regFeildData.accNo = "";
    this.dataService.regType = regtype

    if (!this.localStorage.hasKeyLocalStorage(this.constant.storage_simBindingSuccess)) {
      //this.router.navigateByUrl('/smsVerification');
      this.dataService.routeWithNgZone(["/smsVerification"]);
    } else {
      let mobileNo = this.localStorage.getLocalStorage(this.constant.storage_mobileNo);
      var param = this.registrationService.getmobileNoCheckParam({ 'mobNumber': mobileNo });
      this.mobileNoCheckApiCall(param, mobileNo)
    }
  }


  gotoAccountOpen(){
    this.dataService.routeWithNgZone(["/accountOpening"]); 
  }

  /**
  * UPI Popup as Currently Live on UPI
  * @param
  */
  showUpiPopUp(type) {
    //navigator.app.exitApp();
    this.showPopup(type, '')
  }

  /**
* show popup by popupName
* @param popupName
* @param data
*/
  showPopup(popupName, data?) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
  }

  /**
   * Close popup by popupName
   * @param popupName
   */
  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  /**
  * api call to validate mobile number
  * @param
  */
  mobileNoCheckApiCall(param, mobileNo) {
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_MOBILENOCHECK).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.dataService.registrationData = data.responseParameter;
        this.dataService.registrationSecQue = data.set != undefined ? data.set?.records[0] : '';
        //TODO: binding records is not required now
        // back button is hidden for onmi channel
        //this.bindExistingRecord(this.DataService.registrationData,JSON.stringify(this.DataService.registrationSecQue));
        this.localStorage.setLocalStorage(this.constant.storage_simBindingSuccess, "true")
        this.localStorage.setLocalStorage(this.constant.storage_mobileNo, mobileNo);
        this.localStorage.setLocalStorage(this.constant.storage_deviceId, resp.deviceId);
        this.localStorage.setLocalStorage(this.constant.storage_isTpinAvl, resp.isTpinAvl);
        this.localStorage.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
        this.localStorage.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
        this.localStorage.setLocalStorage(this.constant.storage_isBiomertric, resp.isBiomertric);
        this.localStorage.setLocalStorage(this.constant.storage_username, resp.userName);

        this.dataService.mobStaticEncKey = this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey; this.dataService.userRegStaus = this.dataService.registrationData.RegistrationSuccess;
        console.log("storage_MPIN =====>"+this.localStorage.getLocalStorage(this.constant.storage_isMBUser));
        var nextPageURL: string = '';
        if (resp.ISCBS == 'N') {
          // nextPageURL = "/LandingPage";
          // this.showCommonToastMsgWithKey("MOBILE_NOT_REG_BANK", "error");
          this.commonMethod.openPopup('div.popup-bottom.non-psb')
        } else {
          if(resp.omniRegistrationStatus.toUpperCase() == 'Y'){
            this.localStorage.setLocalStorage(this.constant.storage_omniRegisteredUser, "true");
            if (this.constant.getPlatform() == "web") {
              nextPageURL = "/login";
            }
            else {
              nextPageURL = "/loginMobile";
            }
          }
          else{
           this.dataService.regIsAtStep = 1;
            //If not omni registered will go to omni registration
            nextPageURL = "/registration";
          }
        }

        if (nextPageURL != "") {
          this.dataService.routeWithNgZone([nextPageURL])
        }
      }else if (resp.opstatus == "01") {
          this.commonMethod.openPopup('div.popup-bottom.non-psb')
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }


  /**
  * Show Toast message with multilingual
  * @param msgKey
  * @param toastColor
  */
  showCommonToastMsgWithKey(msgKey, toastColor) {
    showToastMessage(this.translate.transform(msgKey), toastColor)
  }
}
