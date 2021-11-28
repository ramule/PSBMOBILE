import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from '../../../services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare var showToastMessage: any;
@Component({
  selector: 'app-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.scss']
})
export class FooterMobileComponent implements OnInit {

  currentRouteUrl:any
  constructor(private router: Router,
    private ngZone: NgZone,
    private dataService: DataService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    public plugin: PluginService,
    private commonMethod: CommonMethods,
    private translate: TranslatePipe
    ) { }

  languageList:any;

  ngOnInit(): void {
    console.log(this.router.url);
    this.currentRouteUrl = this.router.url;
  }

  routeTo(location){
    console.log('location', location);
    this.router.navigateByUrl(location);
  }
  goToMoreServices(){
    showToastMessage("Coming Soon", "error");
  }

setUpiFlag() {
    // this.dataService.upiRegistrationFlow = true;
  }

  checkFlow() {
    if (this.dataService.isCordovaAvailable) {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        // this.proceedToUPIFlow(); //uncomment for testing only
        this.getSMSPerms();
      } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
        this.isIphoneAndIosCompatible();
      }
    } else {
      this.proceedToUPIFlow(); //uncomment for testing only
    }
  }

  proceedToUPIFlow() {
    this.dataService.upiRegistrationFlow = true;
    let isOmniRegistered = this.storage.getLocalStorage(this.constant.storage_omniRegisteredUser);
    // let isUPIRegistered = this.storage.getLocalStorage(this.constant.storage_isUpiRegistrationSuccess);
    //let isUPIRegistered =  true; //uncomment for testing only
    if (isOmniRegistered) {
      this.dataService.mobStaticEncKey = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
      this.routeTo("/upiLogin");
    } else {
      if (!this.storage.hasKeyLocalStorage(this.constant.storage_simBindingSuccess)) {
        this.routeTo("/smsVerification");
      }
      else{
        this.dataService.mobStaticEncKey = this.storage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey;
        this.routeTo("/personalInfo");
      }
    }
  }


  /**
   * Get Sim settings
   */
   getSMSPerms() {
    /**
     * ask for sim permission
     */
    this.plugin.hasReadPermission().subscribe((status) => {
      console.log("checkSMSPermission", status);
      if (status) {
        this.proceedToUPIFlow();
      }
      else {
        console.log("request denied");
        this.commonMethod.openPopup('div.popup-bottom.permission-not-granted');
      }
    })
  }

  isIphoneAndIosCompatible() {
    /*
    Allow UPI only on iPhone 6S & iOS 13.4 onwards
    Device models to check for:
    iPhone5,1 : iPhone 5 (GSM)
    iPhone5,2 : iPhone 5 (GSM+CDMA)
    iPhone5,3 : iPhone 5C (GSM)
    iPhone5,4 : iPhone 5C (Global)
    iPhone6,1 : iPhone 5S (GSM)
    iPhone6,2 : iPhone 5S (Global)
    iPhone7,1 : iPhone 6 Plus
    iPhone7,2 : iPhone 6
    */

    console.log("iPhone model = ", this.dataService.devicemodel);
    let iOSVersion = parseFloat(this.dataService.osversion);
    console.log("iOS Version = ", iOSVersion);
    // && this.dataService.osversion < 13.4
    if((this.dataService.devicemodel == "iPhone5,1" || this.dataService.devicemodel == "iPhone5,2" || this.dataService.devicemodel == "iPhone5,3" || this.dataService.devicemodel == "iPhone5,4" || this.dataService.devicemodel == "iPhone6,1" || this.dataService.devicemodel == "iPhone6,2" || this.dataService.devicemodel == "iPhone7,1" || this.dataService.devicemodel == "iPhone7,2") && this.dataService.osversion < 13.4 ) {
      //show popup & block user flow
      console.log("iPhone & iOS are NOT compatible with UPI... ");
      this.commonMethod.openPopup('div.popup-bottom.upi-incompatible-device');
    } else {
      console.log("iPhone & iOS are compatible with UPI...");
      this.plugin.checkSIMAvailable().subscribe((response) => {
        if (response == true || response == "true") {
          this.proceedToUPIFlow();
        }
        else{
          this.commonMethod.closeAllPopup();
          this.commonMethod.openPopup('div.popup-bottom.no-sim-available-ios');
        }
      });
    }
  }
}
