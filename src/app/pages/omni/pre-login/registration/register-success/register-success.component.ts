import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { PluginService } from 'src/app/services/plugin-service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AccountOpeningSuccessService } from '../../account-opening/account-opening-success/account-opening-success.service';
declare var showToastMessage: any;
import { BiometricStatus } from 'src/app/utilities/app-enum';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {
  regRefId:string="";
  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/registration'
  }


  biometriSelectedOption: any; //biometric
  biometricType = "";
  isBiometricAvailable: boolean = false;
  informationLabel = "";
  information = "";

  constructor(
    public dataService:DataService,
    private constant: AppConstants,
    private router: Router,
    private storage: LocalStorageService,
    public commonMethod: CommonMethods,
    public plugin: PluginService,
    private http: HttpRestApiService,
    public accOpeningSuccessService: AccountOpeningSuccessService,
    private translate: TranslatePipe,
    ) { }

  ngOnInit(): void {
    console.log("in register");
    this.regRefId = this.dataService.regRefId;
    this.dataService.isFromMpinLogin
    this.dataService.changeMessage(this.commonPageComponent);
    if(this.constant.getPlatform() != "web")this.checkBiometricAvailable();
    this.getAutoLinkAccounts();
  }


  gotoLogin(){
    if(this.constant.getPlatform() == "web"){
      this.router.navigateByUrl('/login');
    }
    else{
      if (this.isBiometricAvailable) {
        this.showBiometricModal();
      } else {
        this.commonMethod.closePopup('div.popup-bottom.confirmation');
        this.router.navigateByUrl('/loginMobile');
      }
    }
  }



  /******* Biometric implementation *****/

  // biometricCheck() {
  //   // if (this.biometriSelectedOption == 'faceid' || this.biometriSelectedOption == 'biometric') {
  //   //   this.dataService.regUPICustData.isBIOMETRICEnable = "Y";
  //   //   this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric,'Y');
  //   //   this.commonMethod.closePopup('div.popup-bottom.confirmation');
  //   //   this.router.navigateByUrl('/loginMobile');
  //   // } else {
  //   //   this.biometriSelectedOption = "nooption";
  //   // }
  //   this.registerDegisterBiometric('BIO');
  // }


  /**
   * function to called on biometric popup thumb click
   */
  thumbClick() {
    this.biometriSelectedOption = "biometric";
    this.dataService.isBiometric = "Y";
  }

  /**
   * function to called on biometric popup face click
   */
  faceClick() {
    this.biometriSelectedOption = "faceid";
    this.dataService.isBiometric = "Y";
  }

  /**
     * check biometric avaialable
     */

   checkBiometricAvailable() {
    this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
      console.log(biometricResult);
      if (biometricResult.available == true) {
        this.isBiometricAvailable = true;
        this.biometricType = biometricResult.result;
      }
    });
  }


  showBiometricModal() {
    // showBiometricModal()
    this.commonMethod.openPopup('div.popup-bottom.confirmation');
  }


  hideBiometricModal() {
    this.dataService.isBiometric = "N";
    this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric,'N');
    this.commonMethod.closePopup('div.popup-bottom.confirmation');
    this.router.navigateByUrl('/loginMobile');
  }


  getAutoLinkAccounts() {
    console.log("in autolimk");
    var param = this.accOpeningSuccessService.getAccInfoAutoLinkCall(this.dataService.regRefId,this.dataService.regFeildData.accNo,this.storage.getLocalStorage(this.constant.storage_mobileNo));
    console.log('Account Auto Link Params: ', param);
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_AUTOLINKACCOUNTS).subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  errorCallBack(subActionId, resp) {
      (resp.Result, 'error');
  }

  /**
   * Register/Deregister Biometric
   */
   registerDegisterBiometric(type) {
    if (this.dataService.isCordovaAvailable) {
      this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
        if (biometricResult && biometricResult.available == true) {
          this.biometricType = biometricResult.result;
          this.dataService.upiRegistrationFlow = true;
          this.dataService.isFromMpinPage = true;
          // this.biometriSelectedOption = "nooption";
          // if (this.isBiometricAvailable) {
          this.showBiometricModal();
          // } else {
          //   this.commonMethod.closePopup('div.popup-bottom.confirmation');
          //   this.callBankingService();
          // }
        } else {
          this.hideBiometricModal();
        }
      })
    }
  }

  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  biometricCheck() {
    this.commonMethod.closePopup('div.popup-bottom.confirmation');
    this.storage.setLocalStorage(this.constant.storage_isCheckBiometric, "false");
    this.plugin.authenticateBiometric('Fingerprint/FaceID Authentication').then((result) => {
      console.log(result);
      if (result == true) {
        this.information = this.translate.transform('FINGERPRINT_FACEID_AUTH_ENABLED');
        this.dataService.regUPICustData.isBIOMETRICEnable = "Y";
        this.storage.setLocalStorage(this.constant.key_localStorage_isBiometric, 'Y');
        this.router.navigateByUrl('/loginMobile');
      }
      else {
        this.informationLabel = this.translate.transform('INFORMATION');
        switch (result.code) {
          case BiometricStatus.BIOMETRIC_LOCKED_OUT_PERMANENT:
            this.information = this.translate.transform("BIOMETRIC_DISABLED");
            this.showPopup('show-biometric-info-popup');
            break;
          case BiometricStatus.BIOMETRIC_LOCKED_OUT:
            this.information = this.translate.transform("BIOMETRIC_TOO_MANY_ATTEMPTS");
            this.showPopup('show-biometric-info-popup');
            break;
          case BiometricStatus.BIOMETRIC_AUTHENTICATION_FAILED:
            this.information = this.translate.transform("BIOMETRIC_AUTH_FAILED");
            this.showPopup('show-biometric-info-popup');
            break;
          case BiometricStatus.BIOMETRIC_PERMISSION_NOT_GRANTED:
            this.information = this.translate.transform("BIOMETRIC_PERMISSION_NOT_GRANTED");
            this.showPopup('show-biometric-info-popup');
            break;
          // case BiometricStatus.BIOMETRIC_DISMISSED:
          //   this.information = this.translate.transform("BIOMETRIC_CANCELED");
          //   this.showPopup('show-biometric-info-popup');
          //   break;

          // case BiometricStatus.BIOMETRIC_UNKNOWN_ERROR:
          //   this.information = this.translate.transform("BIOMETRIC_CANCELED");
          //   this.showPopup('show-biometric-info-popup');
          //   break;
          default:
            break;
        }
      }
    });
  }

}
