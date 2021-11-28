import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeregisterService } from './deregister.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { AppConstants } from '../../../app.constant';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { pageLoaderService } from '../../../services/pageloader.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '../../../services/translate.service';
import { PluginService } from 'src/app/services/plugin-service';

declare var deregister: any;
declare var navigator: any;
declare var window: any;
declare var device: any;


@Component({
  selector: 'app-deregister',
  templateUrl: './deregister.component.html',
  styleUrls: ['./deregister.component.scss']
})
export class DeregisterComponent implements OnInit {
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Deregister Application',
    'footertype': 'none'
  }
  customerName: string = "";
  profileImage: any;
  MPINForm: FormGroup;
  formInput = ['mpinInput1', 'mpinInput2', 'mpinInput3', 'mpinInput4', 'mpinInput5', 'mpinInput6'];

  @ViewChildren('mPINformRow') mPinRows: any;

  constructor(public translate: TranslateService, private domSanitizer: DomSanitizer, public dataService: DataService, private deregisterService: DeregisterService, private commonMethod: CommonMethods, private httpService: HttpRestApiService, public constant: AppConstants, private localStorageService: LocalStorageService, private loader: pageLoaderService, private pluginService : PluginService) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    this.MPINForm = this.toFormGroup(this.formInput);
    deregister();
    this.deregisterService.initData();
    this.customerName = this.dataService.regUPICustData.customerName;
    console.log('this.customerName', this.customerName);
    console.log("ProfileImg => ");
    console.log(this.dataService.profileImage)
  }

  toFormGroup(elements) {
    const group: any = {};
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  getMPINValue() {
    var mpin = "";
    console.log(this.MPINForm.controls);

    for (const field in this.MPINForm.controls) { // 'field' is a string

      const control = this.MPINForm.get(field); // 'control' is a FormControl  
      console.log("value", control.value);

      if (!control.hasError('required')) {
        mpin += control.value;
        console.log(mpin);

      }
    }
    return mpin;
  }

  getSpasswordElement(index) {
    // return document.getElementById('spassword' + index);
    console.log(this.mPinRows);
    if (index <= 5)
      return this.mPinRows._results[index].nativeElement;
  }

  onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index).value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1).focus();
      } else {
        this.getSpasswordElement(index).blur();
        // Submit code
        console.log('submit code ');
        //this.showPopup('deregisterConfirmationPopup');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1).focus();

    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        // this.MPINForm.reset();
        // this.mPinRows._results[0].nativeElement.focus();
        this.MPINForm.get(this.formInput[index]).setValue("");
        this.getSpasswordElement(index - 1).focus();
      }
    }
  }

  onFocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getCpasswordElement(index) {
    return document.getElementById('cpassword' + index);
  }

  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  /**
   * common function to validate form 
   * @formname 
   */
  validateForm(formname) {
    if (formname == "mpin" && this.MPINForm.invalid) {
      // this.MPINForm.get('mobNumber').markAsTouched();
      this.MPINForm.markAllAsTouched();
      // this.formErrorsMPIN = this.formValidation.validateForm(this.MPINForm, this.formErrorsMPIN, true);
      return;
    }
  }

  deregisterUser() {
    this.closePopup('deregisterConfirmationPopup');
    this.loader.showLoader();
    //Step 1 - Call upi Validate Mpin
    //on success - calll UPI => Deregister API
    //on success - call Omni - Deregister API
    let mpin = this.getMPINValue();
    let param = this.deregisterService.omniUpiValidateMpinRequestObject(mpin);

    this.httpService.callBankingAPIService(param, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_UPIVALIDATEMPIN, true).subscribe(response => {
      console.log(response);
      var res = response.responseParameter
      if (res.opstatus == "00") {
        this.UpiApiCall(this.constant.upiserviceName_DEREGISTERMOBILE);
      }
      else {
        this.MPINForm.reset();
      }
    }, err => {
      console.log("Error => ", err);
    });
  }

  UpiApiCall(apiName, data?) {
    let requestObj = this.deregisterService.deregisterUpiRequestObject();
    this.httpService.callBankingAPIService(requestObj, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log('success', data);

      if (data.responseParameter.opstatus == "00") {
        //success handler
        let upiResponseData = data.responseParameter.upiResponse;
        console.log('upiResponseData => ', upiResponseData);

        switch (upiResponseData.subActionId) {
          case this.constant.upiserviceName_DEREGISTERMOBILE:
            console.log("DEREGISTERMOBILE response handling...");
            if (upiResponseData.status == "00") {
              //success handler 
              this.omniDeactivateApiCall();
            } else {
              //failure handler
              //this.showPopup('deregisterRejectPopup');   //error msg will come form MW, so popup not required
            }
            break;
          default:
            console.log("Default => ", apiName);
            break;
        }
      } else {
        console.log(data.responseParameter.opstatus);
      }
    }, err => {
      console.log(err);
    });
  }

  omniDeactivateApiCall() {
    this.validateForm('mpin')
    console.log(this.MPINForm)
    if (this.MPINForm.valid) {
      let mpin = this.getMPINValue();
      let param = this.deregisterService.omniUpiValidateMpinRequestObject(mpin);
      this.httpService.callBankingAPIService(param, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_UPIDEACTIVATE, true).subscribe(response => {
        console.log(response);
        if (response.responseParameter.opstatus == "00") {
          this.loader.hideLoader();
          if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
            this.dataService.clearAppInfo();
            this.pluginService.enableSmartIntent(false);
          } else if(this.dataService.platform.toLowerCase() == this.constant.val_ios){
            this.dataService.clearAppInfoIos();
          }
          this.showPopup('deregisterSuccessPopup');
        } else {

        }
      }, err => {
        console.log("Error => ", err);
      });
    }

  }


  clearAppData(popupName,exitApp?) {
    this.closePopup(popupName);
    if (device.platform.toLowerCase() == this.constant.val_android) {
      if (exitApp) {
          navigator.app.exitApp();
      }
  } else {
      var self = this;
      setTimeout(function () { self.dataService.routeWithNgZone("/LandingPage"); }, 3000)
    }

    //TODO: Check if user is also registered for Omni & mobile banking & route accordingly. current implementation is done only for standalone UPI registration
    // if(this.dataService.platform.toLowerCase() == this.constant.val_android){
    //   navigator.app.exitApp();
    // }
    // else{
    //   this.localStorageService.setLocalStorage(this.constant.storage_languageVersion, this.languageVersion);
    //   this.translate.getLanguageObject();
    // }

  }


  onLoadData() {
    this.dataService.upiCommonObservable.subscribe((profileDtls: any) => {
      this.profileImage = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + profileDtls.base64Image);
    })
  }
}
