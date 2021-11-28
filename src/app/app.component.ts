import { Component, OnInit, NgZone, AfterViewInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from 'rxjs/operators';
import { CommonMethods } from './utilities/common-methods';
import { HttpRestApiService } from './services/http-rest-api.service';
import { AppConstants } from './app.constant';
import { DataService } from './services/data.service';
import { LocalStorageService } from './services/local-storage-service.service';
import { PluginService } from './services/plugin-service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { LoginService } from './pages/omni/pre-login/login/login.service';
import { TranslateService } from './services/translate.service';
import { Keepalive } from '@ng-idle/keepalive';
import { DashboardService } from './pages/omni/dashboard/dashboard.service';
import { RegistrationMobCheckService } from './pages/omni/pre-login/registration/registration-mob-check/registration-mob-check.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { UpiDashboardService } from './pages/upi/dashboard/upi-dashboard.service';
import { HttpClient } from "@angular/common/http";
import { DatePipe, LocationStrategy, Location } from '@angular/common';
import { environment } from '../environments/environment.prod';
import * as moment from 'moment';
import { EncryptDecryptService } from './services/encrypt-decrypt.service';
// import  *  as  data  from  '../assets/i18n/en.json';
declare var device: any;
declare var showToastMessage: any;
declare var navigator: any;
declare var $: any;
declare var IRoot: any;
declare var cordova: any;
declare var hideMpinModel: any;
declare var window: any;
declare var LocalFileSystem: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'PSB';
  showCommonModules: boolean = false;
  languageVersion;
  forceUpdate;
  previousUrl = [];
  isdeviceBack: boolean = false;
  idleState;
  timedOut = false;
  data: any = {};
  langData: any = {};
  langJsonData: any = {};
  showDetails = true;
  plugins: any;
  permissions: any;
  currentUrl: any;
  showThemeDetails = false;
  showSideNavDetails = false;
  showNotificationDetails = false
  informationLabel = "";
  timeOutLabel = "";
  keepActiveLabel = "";
  informationDetails = "";
  isUPIRegistered = false;
  primaryBtnText = "";
  secondaryBtnText = "";
  logoutLabel = "";
  isIntentCallbackReceived = false;
  contactAlwaysDenied = false;
  minimizedTime: any;
  enLangJSON: any;
  activityVersion:any;

  constructor(private router: Router,
    private commonMethod: CommonMethods,
    private psbApiService: HttpRestApiService,
    public constants: AppConstants,
    public dataService: DataService,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private loginService: LoginService,
    public constant: AppConstants,
    public plugin: PluginService,
    public translate: TranslateService,
    private ngZone: NgZone,
    private location: Location,
    private idle: Idle,
    private keepalive: Keepalive,
    private translatePipe: TranslatePipe,
    private dashboardService: DashboardService,
    private upiDashboardService: UpiDashboardService,
    private registrationService: RegistrationMobCheckService,
    private httpClient: HttpClient,
    private locationStrategy: LocationStrategy,
    private encryptDecryptService: EncryptDecryptService
  ) {
  }

  ngOnInit() {
    this.checkFlow(); // It will check respective flow and will redirect to respective page
    // this.getCountryCodeByLatLong();
    this.setLanguageDefault();
    if (environment.production) {
      document.addEventListener('contextmenu', event => event.preventDefault());
      $('body').bind('cut copy paste', function (e) {
        e.preventDefault();
      });
    }
    if (this.constant.getPlatform() == "web") {
      window.onhashchange = function () {
        if (self.router.url != '/dashboard') {
          self.logoutapp()
        }
      }
      this.checkEvt();
      var self = this

    }


    //this.testDecrypt()

  }

  /** For browser backbutton event, we are login out the user */
  logoutapp() {
    // need to change after some time
    let logoutReqParams = this.dashboardService.getLogoutParams();
    this.http.callBankingAPIService(logoutReqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOGOUT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.isLogOutOmni = true;
        this.idle.stop();
        if (this.dataService.isUPILogin) {
          this.ngZone.run(() => {
            this.router.navigate(['/upiLogin'], { replaceUrl: true });
            this.dataService.gotpage ="";
          });
          this.storage.clearSessionStorage();
        } else {
          this.dataService.isLoggedIn = false;
          this.dataService.setShowThemeObservable(false);
          this.dataService.showDetails = false;
          this.dataService.gotpage = '';

          if (this.constant.getPlatform() == "web") {
            // showToastMessage(resp.Result,'success')

            this.router.navigate(['/login'], { replaceUrl: true });
          }
          else {
            this.router.navigate(['/loginMobile'], { replaceUrl: true });
          }
        }

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialization();
    }, 1000);
  }

  checkEvt() {
    var evTypep = window.performance.getEntriesByType("navigation")[0].type;
    if (evTypep == 'reload' && this.constant.getPlatform() == 'web') {
      if (this.storage.getSessionStorage(this.constant.val_sessionKey) != undefined) {
        this.router.navigateByUrl('/temporaryServiceOut')
      }
      //  window.location.replace("http://www.stackoverflow.com");
      this.dataService.timeoutHeader = "Session Expired"
      this.dataService.timeoutMsg = "You are not allowed to refresh or use browser navgation key after login "
    }
  }

  /**
   * For intialization this function is invoked
   */
  initialization() {
    if (this.constant.getPlatform() != "web" ) {
      this.checkForNewVersion();
    }
    else{
      this.translate.getLanguageObject();
      this.getDynamicPageConfig();
    }
    
    this.ngZone.run(() => {
      this.handleNativeFunctionality();
      this.getActivatedRoute();
    });
    this.getIP();
    this.getObservableDetails();
    this.watchIdleSession();
    this.setUpdatedTheme();
    this.handleBrowserRefreshEvent();
    this.initializeEvents();
    // on pop state this function is invoked.
    this.locationStrategy.onPopState(() => {
      console.log("onPopState");
      // set isBackButtonClicked to true.
      if (this.router.url == '/dashboard') {
        this.dataService.isBackClick = true;
        return false;
      }
    });
  }

  continueAppExecution() {
    this.initializeNetworkEvents();
    // this.getActivitySetting();
    console.log("upiStandAlone" + this.dataService.upiStandAlone);
  }

  // getCameraPermission() {
  //   cordova.plugins.diagnostic.requestCameraAuthorization((status) => {
  //     console.log('iOS requestCameraAuthorization status = ', status);
  //     switch (status) {
  //       case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
  //         this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
  //         return;
  //       default:
  //         console.log("default case..");
  //         break;
  //     }
  //   });
  // }

  enableCameraPermission() {
    console.log("Opening native settings for Camera permission...");
    this.closePopup('div.popup-bottom.enable-camera-permission');
    cordova.plugins.diagnostic.switchToSettings(function () {
      console.log("Successfully switched to Settings app");
    }, function (error) {
      console.error("The following error occurred: " + error);
    });
  }

  checkIfUPIRegister() {
    if (this.storage.hasKeyLocalStorage(this.constant.storage_isUpiRegistrationSuccess)) {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        this.router.navigateByUrl('/upiLogin').then((val) => {
          navigator.splashscreen.hide();
        });
      } else {
        this.dataService.routeWithNgZone("upiLogin");
        // navigator.splashscreen.hide();
      }
    } else {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        this.router.navigateByUrl('/LandingPage').then((val) => {
          navigator.splashscreen.hide();
        });
      } else {
        this.dataService.routeWithNgZone("LandingPage");
        // navigator.splashscreen.hide();
      }
    }
  }

  /**
   * This function is invoked to get dynamic page configuration like otp,tpin etc
  */
  getDynamicPageConfig() {
    try {
      const request = this.dataService.getDynamicPageConfig();
      this.activitySetting(request, this.constant.deviceID, this.constants.serviceName_GETACTIVITYSETTINGDATA);
    }
    catch (e) {
      console.log("e");
    }
  }

  activitySetting(inputData, deviceId, endPoint){
    this.commonMethod.showLoader();
    this.psbApiService.callBankingAPIService(inputData, deviceId, endPoint).subscribe((result) => {
      console.log("Omni activitySettingData"+ result);
      this.dataService.activitySettingData = result.set.records;
      this.storage.setLocalStorage(this.constant.storage_activityJson,JSON.stringify(result.set.records));
    });
  }

  getDeepLinkIntentCallBack() {
    window.plugins.launchmyapp.getLastIntent((url) => {
      this.ngZone.run(() => {
        this.isIntentCallbackReceived = true;
        this.isUPIRegistered = this.storage.hasKeyLocalStorage(this.constant.storage_isUpiRegistrationSuccess) && (this.storage.getLocalStorage(this.constant.storage_isUpiRegistrationSuccess) == 'true');
        if (!this.isUPIRegistered) {
          this.ngZone.run(() => {
            this.dataService.information = this.translatePipe.transform('YOU_ARE_NOT_REGISTERD_ON_UPI');
            this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.dataService.primaryBtnText = this.translatePipe.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.show-common-info');
          })
        }
      })
    }, (error) => {
      return console.log("no intent received");
    });
  }

  getMacAddress() {
    try {
      this.plugin.getMacAddress().subscribe((res) => {
        console.log("get mac address");
        console.log(res.value);
        this.dataService.macAddress = res.value;
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  /**
   * Language default setting
   */
  setLanguageDefault() {
    //language object will be received from local storage
    //in not available api will be called

    //TODO: remove below line after testing
    try {
      console.log("inside setLanguageDefault=====>")
      if (this.storage.hasKeyLocalStorage(this.constant.storage_languageJson)) {
        //if language is avilable then it will set the language
        if (this.storage.hasKeyLocalStorage(this.constant.storage_language)) {
          this.translate.use(this.storage.getLocalStorage(this.constant.storage_language));
        }
        else this.translate.use(this.constant.defaultLanguageCode);

      } else {
        this.httpClient.get("assets/i18n/language.json").subscribe(langData => {
          this.translate.useJsonFile(this.constant.defaultLanguageCode, langData);
        });
      }
    }
    catch (e) {
      console.log(e);
    }
    // this.informationLabel = this.translatePipe.transform('INFORMATION');

    //TODO: remove below line after testing
    // else {
    //   this.translate.getLanguageObject();
    // }
  }

  getObservableDetails() {
    this.dataService.$showthemeObservable.subscribe((showTheme: boolean) => {
      this.showThemeDetails = showTheme;
    });

    this.dataService.$showSideNavObservable.subscribe((sideNav: boolean) => {
      this.showSideNavDetails = sideNav;
    });

    this.dataService.$showNotificationObservable.subscribe((sideNav: boolean) => {
      this.showNotificationDetails = sideNav;
    });
  }


  /**
   * Get Sim settings
   */

  getSIMSettings() {
    console.log("Inside getSIMSettings");
    //Check if Read Permission is granted
    this.plugin.hasReadPermission().subscribe((status) => {
      console.log("hasReadPermission Success"+ status);
      if (status) {
        //Granted => Check Sim status
        console.log("hasReadPermission granted!");
        this.getSimInfo();
      } else {
        //Not Granted => request read permission
        this.requestSimReadPermission();
      }
    }, (err) => {
      console.log("2 => hasReadPermission Error"+ err);
    });
  }

  requestSimReadPermission() {
    this.plugin.requestReadPermission().subscribe((status) => {
      console.log("requestReadPermission Success"+ status);
      if (status) {
        //Granted => Fetch sim info
        console.log("Read Permission granted!");
        this.commonMethod.closePopup('div.popup-bottom.permission-not-granted');
        this.getSimInfo();
      } else {
        console.log("request denied");
        //this.commonMethod.openPopup('div.popup-bottom.permission-not-granted');
        //TODO: change for testing
        this.commonMethod.closePopup('div.popup-bottom.permission-not-granted');
        this.plugin.gotoSetting().subscribe((status) => {
          console.log("gotoSetting=====>"+ status);
        }, (err) => {
          console.log("gotoSetting error"+ err);
        });
      }
    }, (err) => {
      console.log("requestReadPermission Error"+ err);
    });
  }

  getSimInfo() {
    console.log("Inside getSimInfo...");
    let simInfo;

    this.plugin.getSIMInfo().subscribe((data) => {
      //Success => Check Sim Status
      console.log("getSIMInfo Success"+ data);
      console.log("activeSimCount = "+ this.dataService.activeSimCount);
      console.log("dataservice.simData => "+ this.dataService.simData);
      if (this.dataService.simData) {
        simInfo = this.dataService.simData;
      } else {
        simInfo = data;
      }

      console.log("Is UPI user registered => "+ this.storage.getLocalStorage(this.constant.storage_isUpiRegistrationSuccess));

      //for testing, uncomment below line and comment if-else block
      // this.continueAppExecution();

      if (this.storage.getLocalStorage(this.constant.storage_isUpiRegistrationSuccess) || this.storage.getLocalStorage(this.constant.storage_omniRegisteredUser) == "true") {
        console.log("checking Sim Status..");
        this.ngZone.run(() => {
          this.checkDeviceSimStatus(simInfo);
        })
      } else {
        console.log("Sim check not required..");
        this.continueAppExecution();
      }
    }, (err) => {
      console.log("getSIMInfo Error"+ err);
    });
  }

  checkDeviceSimStatus(simInfo?) {
    console.log('checkDeviceSimStatus param => '+ simInfo);
    let isDualSim = simInfo.activeSubscriptionInfoCountMax > 0 ? true : false;
    var simOne = this.storage.getLocalStorage("SimOneId") != '' && this.storage.getLocalStorage("SimOneId") != undefined ? this.storage.getLocalStorage("SimOneId") : 'blank';
    var simTwo = this.storage.getLocalStorage("SimTwoId") != '' && this.storage.getLocalStorage("SimTwoId") != undefined ? this.storage.getLocalStorage("SimTwoId") : 'blank';
    console.log('checkDeviceSimStatus SimeOne '+ simOne)
    console.log('checkDeviceSimStatus simTwo '+ simTwo)
    this.plugin.checkSimStatusAndroid(simOne, simTwo, isDualSim).subscribe((response) => {
      console.log("Sim Detect Success => "+ response);

      if (response.status == "00") {
      } else if (response.status == "01") {
        if (response.validSimFound) {
          //continue execution
          this.continueAppExecution();
        } else {
          //registeredSimNotFound - show popup & exit app
          console.log("Registered sim not found...")
          // this.dataService.clearAppInfo();
          this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.dataService.simInfoDetails = this.translatePipe.transform('REGISTERED_SIM_NOT_FOUND');
          this.dataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.registered-sim-not-found');
        }
      } else if (response.status == "02") {
        // noSimAvailableForApp - show popup & exit app
        console.log("No sim available for app...");
        this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
        this.dataService.simInfoDetails = this.translatePipe.transform('NO_SIM_AVAILABLE');
        this.dataService.primaryBtnText = this.translatePipe.transform('OK');
        this.commonMethod.openPopup('div.popup-bottom.no-sim-available');
      } else {
        //exit App
      }
    }, (err) => {
      console.log("Sim Detect Error => "+ err);
    });
  }

  exitApp(isRegisteredSIMNotFound?) {
    if (isRegisteredSIMNotFound) {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        this.dataService.clearAppInfo();
        navigator.app.exitApp();
      }
      else {
        this.dataService.clearAppInfoIos();
        var self = this;
        setTimeout(function () { self.dataService.routeWithNgZone("/LandingPage"); }, 3000)
      }
    } else {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        navigator.app.exitApp();
      }
    }
  }

  showNotGrantedModel() {
    $('#notgrantedpermodel').modal('show');
  }

  hideNotGrantedModal() {
    $('#notgrantedpermodel').modal('hide');
  }
  /**
   * get Activated Routes
   */
  getActivatedRoute() {
    try {
      console.log("inside getActivatedRoute..");
      this.router.events
        .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
        .subscribe((events: RoutesRecognized[]) => {
          console.log("EVENTS => ");
          console.log(events);
          this.commonMethod.closeAllPopup();
          console.log('previous url'+ events[0].urlAfterRedirects);
          console.log('current url'+ events[1].urlAfterRedirects);
          this.currentUrl = events[1].urlAfterRedirects;

          if (events[1].urlAfterRedirects != "/receipt") {
            this.dataService.previousPageUrl = events[0].urlAfterRedirects.substring(1, events[0].urlAfterRedirects.length);
            this.dataService.currentPageUrl = events[1].urlAfterRedirects.substring(1, events[1].urlAfterRedirects.length);
          }

          if (events[1].urlAfterRedirects == "/login") {
            this.previousUrl = [];
          } else if (events[1].urlAfterRedirects == "/upiLogin") {
            // this.dataService.addPreLoginFooterCss();
            // this.ngZone.run(() => {
            //   if(this.dataService.bezellessIphone) {
            //     $("#mainDiv").addClass("pre-login");
            //   }
            // });
            this.previousUrl = [];
          } else if (events[1].urlAfterRedirects == "/upiDashboard") {
            // this.dataService.removePreLoginFooterCss();
            // this.ngZone.run(() => {
            //   if(this.dataService.bezellessIphone) {
            //     $("#mainDiv").removeClass("pre-login");
            //   }
            // });
          } else if (!this.isdeviceBack) {
            this.previousUrl = [...this.previousUrl, events[0].urlAfterRedirects];
          } else if (events[1].urlAfterRedirects == "/LandingPage") {
            // this.dataService.addPreLoginFooterCss();
            // this.ngZone.run(() => {
            //   if(this.dataService.bezellessIphone) {
            //     $("#mainDiv").addClass("pre-login");
            //   }
            // });
          }

          if (this.isdeviceBack) {
            this.isdeviceBack = !this.isdeviceBack;
          }
        });
    }
    catch (e) {
      console.log(e);
    }
  }

  /**
   * This function is invoked to check new version
   */
  checkForNewVersion() {
    try {
      const request = this.dataService.checkForUpdateCall();
      this.invokeBankingService(request, "1", this.constants.serviceName_CHECKFORNEWVERSIONONSTORE);
    }
    catch (e) {
      console.log("e");
    }

  }

  /**
   * api call to get activity setting
   * pages list need to be activated or deactivated
   * during event like fund transfer,manage payee etc.
   */
  getActivitySetting() {
    var param = this.loginService.getActivitySettingParam();
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETACTIVITYSETTINGDATA).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.dataService.activitySettingData = data.set?.records;
        this.storage.setLocalStorage(this.constant.storage_activityJson,this.dataService.activitySettingData);
        console.log('activity setting data: '+ this.dataService.activitySettingData);
      }
      else {
        // this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * To handle refresh event this function is called
   */
  handleBrowserRefreshEvent() {
    try {
      if (this.constants.getPlatform() == "web") {
        this.router.events
          .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
          .subscribe(event => {
            if (
              event.id === 1 &&
              event.url === event.urlAfterRedirects
            ) {
              this.idle.stop();
              this.router.navigate(['/login']);
            }
          })
      }
    }
    catch (e) {
      console.log(e);
    }
  }



  testDecrypt() {
    var encryptedValue = {
      subActionId: "OMNILOGIN",
      data: "3646fce43c6a2f90b416e3f2902a8f14 7d81ea6b672320d5d250c0ed9c7b3109 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",
      secType: "M",
      RRN: "1636614553369"
  }
    console.log("Decrypted Value: ", this.encryptDecryptService.decryptText("jrD@Mt6i#0mnip$b",encryptedValue.data));
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == "02") {
      //showToastMessage(resp.Result, "error");
    } else if (resp.opstatus == "92") {
      //TODO: Handle opstatus value 92 (Invalid Session)
      this.commonMethod.closeAnyModal();
      this.commonMethod.closeAllPopup();
    }
  }

  /**
   * Setting updated theme from the backend
   */
  setUpdatedTheme() {
    this.dataService.setThemeObservable.subscribe((themeName: string) => {
      if (themeName) {
        $('html').attr('theme', themeName);
      } else {
        $('html').attr('theme', 'default');
      }
    });
  }

  /**
   * Set session Idle functionality
   */
  watchIdleSession() {
    // sets an idle timeout of 180 seconds(3 min)
    this.idle.setIdle(350);//120 350
    // sets a timeout period of 5 seconds. after 60 seconds of inactivity, the user will be considered timed out.
    // this.idle.setTimeout(5);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // this.idle.onIdleEnd.subscribe(() => {
    //   //this.idleState = 'No longer idle.';
    //   ($("#modal-idle") as any).modal('hide')
    //   console.log("idle end");
    //   this.resetTimeOut();
    // });

    this.idle.onTimeout.subscribe(() => {
      //this.idleState = 'No longer idle.';
      console.log('No longer idle');

      ($("#modal-idle") as any).modal('hide');
      ($("#logoutModal") as any).modal('hide');

      console.log("idle end");
      this.ngZone.run(() => {
        this.logout(true);
      })
    });

    this.idle.onIdleStart.subscribe(() => {
      // this.idle.clearInterrupts();
      this.commonMethod.closeAllPopup();
      this.commonMethod.closeSideNavUPI();
      console.log("Calling Logout API from watchIdleSession...");
      this.logout(true);
      // this.commonMethod.closePopup('div.popup-bottom.logout1');
      // this.ngZone.run(() => {
      //   this.timeOutLabel = this.translatePipe.transform('SESSION_TIMEOUT');
      //   this.logoutLabel = this.translatePipe.transform('LOGOUT');
      //   this.keepActiveLabel = this.translatePipe.transform('KEEP_ACTIVE');
      //   this.commonMethod.openPopup('div.popup-bottom.timeout1');
      // })
      console.log("You\'ve gone idle!");
    });
  }

  getCountryCodeByLatLong(){
    this.dataService.getCurrentLatLong(true).subscribe(
      (data) => {
        if(data){
          console.log('address',data)
        }
      })
  }

  /**
   * Logout api call
   */

  logout(showSessionTimedOut?) {
    this.commonMethod.closeAnyModal();
    let logoutReqParams = this.dashboardService.getLogoutParams();
    this.http.callBankingAPIService(logoutReqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOGOUT).subscribe(data => {
      console.log("Logout Response => ");
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.setShowThemeObservable(false);
        this.dataService.isLogOutOmni = true;
        this.dataService.gotpage ="";
        this.commonMethod.closeAnyModal();
        this.commonMethod.closeAllPopup();
        this.idle.stop();
        if (showSessionTimedOut) {
          this.dataService.isUPILogin = false;
          if(this.constant.getPlatform() == "web"){
            this.router.navigateByUrl('/temporaryServiceOut')
            this.dataService.timeoutHeader = "Timed out!"
            this.dataService.timeoutMsg = "You were idle for too long, please Login again"
          }
          else{
            this.ngZone.run(() => {
              this.dataService.information = this.translatePipe.transform('SESSION_TIMED_OUT');
              this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
              this.dataService.primaryBtnText = this.translatePipe.transform('OK');
              this.commonMethod.openPopup('div.popup-bottom.show-sessionTimedOut-info');
            })
          }
          return;
        }
        else {
          this.dataService.isLogOut = true;
        }
        if (this.dataService.isUPILogin) {
          if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
            $('body').addClass('iosLogout');
          }
          this.ngZone.run(() => {
            this.router.navigate(['/upiLogin'], { replaceUrl: true });
          });
          this.storage.clearSessionStorage();
        } else {
          this.dataService.showDetails = false;
          if (this.constants.getPlatform() == "web") {
            this.router.navigate(['/login'], { replaceUrl: true });
          }
          else {
            this.router.navigate(['/loginMobile'], { replaceUrl: true });
          }
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * Reset Session after timeout
   */
  resetTimeOut() {
    this.ngZone.run(() => {
      this.extendSession();
    })
    this.idle.watch();
    this.timedOut = false;
  }

  /**
   * Extend session api call
   */
  extendSession() {
    this.commonMethod.closePopup('div.popup-bottom.timeout1');
    let getExtendSessionReq = this.dashboardService.getExtendSessionReqParams();
    this.http.callBankingAPIService(getExtendSessionReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SESSIONEXTEND).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        // this.informationLabel = this.translatePipe.transform('INFORMATION');
        this.ngZone.run(() => {
          this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
          this.idle.watch();
          this.dataService.information = resp.Result;
          this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.dataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        })
        // showToastMessage(resp.Result, "success");
      }
      else {
        // this.informationLabel = this.translatePipe.transform('INFORMATION');
        this.ngZone.run(() => {
          this.dataService.information = resp.Result;
          this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.dataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-error')
        })
      }
    });
  }


  /**
   * To handle callback this function is invoked
   * @param inputData
   * @param deviceId
   * @param endPoint
   */
  invokeBankingService(inputData, deviceId, endPoint) {
    this.commonMethod.showLoader();
    this.psbApiService.callBankingAPIService(inputData, deviceId, endPoint).subscribe((result) => {
      console.log("Omni Result"+ result);
      // if (result.subActionId == 'GETACTIVITYSETTINGDATA') {
      //   this.dataService.activitySettingData = result.set.records;
      //   console.log('activity setting data: '+ this.dataService.activitySettingData);
      // }
      // else if(){
      // }

      switch (result.responseParameter.opstatus) {
        case "00":
          this.commonMethod.hideLoader();
          this.storage.clearSessionStorage();
          this.storage.setSessionStorage(this.constant.storage_isLoggedIn, "false");
          this.forceUpdate = result.responseParameter.forceupdate;
          this.languageVersion = result.responseParameter.jsonLanguageVersion;
          this.activityVersion = result.responseParameter.activityVersion;
          this.constants.val_forceUpdate = result.responseParameter.forceupdate;
          this.constants.val_statementYear = result.responseParameter.statementYears ? result.responseParameter.statementYears : "";
          if (this.storage.hasKeyLocalStorage(this.constant.storage_languageJson)) {
            if (this.storage.getLocalStorage(this.constant.storage_languageVersion) != this.languageVersion) {
              this.translate.getLanguageObject();
              this.storage.setLocalStorage(this.constant.storage_languageVersion, this.languageVersion);
            }
          } else {
            this.storage.setLocalStorage(this.constant.storage_languageVersion, this.languageVersion);
            this.translate.getLanguageObject();
          }

          //call activity setting only once when load for web
          if(this.constant.getPlatform() == "web"){
            this.getDynamicPageConfig();
          }
          else{
            if (this.storage.hasKeyLocalStorage(this.constant.storage_activityVersion)) {
              if (this.storage.getLocalStorage(this.constant.storage_activityVersion) != this.activityVersion) {
                this.storage.setLocalStorage(this.constant.storage_activityVersion, this.activityVersion);
                if (this.dataService.upiStandAlone != true) this.getDynamicPageConfig(); 
              }
              else{
                this.dataService.activitySettingData = JSON.parse(this.storage.getLocalStorage(this.constant.storage_activityJson));
              }
            } else {
              this.storage.setLocalStorage(this.constant.storage_activityVersion, this.activityVersion);
              if (this.dataService.upiStandAlone != true) this.getDynamicPageConfig(); 
            }
          }

          
          if (this.forceUpdate == "Y") {
            this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.dataService.information = this.translatePipe.transform('FORCE_UPDATE_MSG');
            this.dataService.primaryBtnText = this.translatePipe.transform('UPDATE');
            this.commonMethod.openPopup('div.popup-bottom.force-update-popup');
          }

          break;
        case "05":
          this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.dataService.errorMsg = this.translatePipe.transform('THERE_IS_SOME_PROBLEM_WITH_BHIM_PSB_UPI_APPLICATION');
          this.dataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.signedError');
          break;

        default:
          this.dataService.informationLabel = this.translatePipe.transform('ERROR');
          this.dataService.errorMsg = this.translatePipe.transform('PLEASE_TRY_AGAIN_LATER');
          this.dataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.check-version-error');
          break;
      }
    });
  }

  updateApp() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      // this.plugin.openInAppBrowser('https://play.google.com/store/apps/details?id=com.psb.omniretail');
      window.open('https://play.google.com/store/apps/details?id=com.psb.omniretail');
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      // this.plugin.openInAppBrowser(); //TODO:insert App Store Link
    } else {
      console.log("Unknown platform");
    }
  }

  blockUserFlow(popupName) {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      if (popupName == "check-version-error" || popupName == 'rooted-device-popup' || popupName == 'signedError') {
        this.exitApp();
      }
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      //TODO: iOS Handling
      if (popupName == "check-version-error") {
        this.commonMethod.openPopup('div.popup-bottom.check-version-error');
      } else if (popupName == 'rooted-device-popup') {
        this.commonMethod.openPopup('div.popup-bottom.rooted-device-popup');
      } else if (popupName == 'virtualDevice') {
        this.commonMethod.openPopup('div.popup-bottom.virtualDevice');
      } else if (popupName == 'signedError') {
        this.commonMethod.openPopup('div.popup-bottom.signedError');
      }
    } else {
      console.log("Unknown platform");
    }
  }

  /**
   * handle back event
   */
  handleBackEvent() {
    if (this.constant.getEntityId() == this.constant.val_entityIDMob) {
      var self = this;
      /**
       * event listener to handle device back
       */
      document.addEventListener("backbutton", function (e) {
        console.log("inside event of backbutton");
        self.ngZone.run(() => {
          try {
            if (self.dataService.isDeepLinkIntentCalled && self.dataService.isUPILogin && self.dataService.platform.toLowerCase() == self.constant.val_android) {
              self.informationLabel = self.translatePipe.transform('INFORMATION');
              self.informationDetails = self.translatePipe.transform('PAYMENT_CANCEL_MSG');
              self.commonMethod.openPopup('div.popup-bottom.show-intent-message');
              return;
            }
            if (self.currentUrl) {
              if (self.currentUrl == '/dashboard' || self.currentUrl == '/dashboardMobile') {
                $('#logoutModal').modal('show');
                return;
              }
              if (self.currentUrl == '/upiDashboard') {
                // $('#logoutModal').modal('show');
                self.commonMethod.closeSideNavUPI();
                if (self.dataService.omniUPIFlow) {
                  self.router.navigateByUrl('/dashboardMobile');
                  return;
                }
                self.ngZone.run(() => {
                  self.dataService.informationLabel = self.translatePipe.transform('LOGOUT');
                  self.dataService.informationDetails = self.translatePipe.transform('LOGOUT_MSG');
                  self.dataService.primaryBtnText = self.translatePipe.transform('YES');
                  self.dataService.secondaryBtnText = self.translatePipe.transform('NO');
                  self.commonMethod.openPopup('div.popup-bottom.logout1');
                })

                return;
                // $('#logoutModal').modal('show');
              }
              if (self.currentUrl == '/login' || self.currentUrl == '/loginMobile') {
                console.log($('div.popup-bottom.mpin-info').hasClass('popup-active'));
                if ($('div.popup-bottom.mpin-info').hasClass('popup-active')) {
                  hideMpinModel();
                }
                else {
                  e.preventDefault();
                  navigator.app.exitApp();
                }
                return;
              }
              if (self.currentUrl == '/upiLogin') {
                if ($('div.popup-bottom.mpin-info').hasClass('popup-active')) {
                  hideMpinModel();
                }
                else {
                  e.preventDefault();
                  navigator.app.exitApp();
                }
                return;
              }
              if (self.currentUrl == '/LandingPage') {
                e.preventDefault();
                navigator.app.exitApp();
                return;
              }
              if (self.currentUrl == '/personalInfo') {
                e.preventDefault();
                var prevUrl = [self.previousUrl[self.previousUrl.length - 2]];
                self.isdeviceBack = true;
                self.router.navigate(prevUrl);
                self.previousUrl.pop();
                return;
              }

              // if(self.currentUrl == '/collectSuccess'){
              //   return;
              // }

              self.isdeviceBack = true;
              // var prevUrl = [self.previousUrl[self.previousUrl.length - 1]];
              // self.router.navigate(prevUrl);
              // self.previousUrl.pop();
              self.location.back();
            }
            else {
              if ($('div.popup-bottom.mpin-info').hasClass('popup-active')) {
                hideMpinModel();
              }
              else {
                e.preventDefault();
                navigator.app.exitApp();
              }
            }
          }
          catch (ex) {
            console.log(ex);
          }
        });
      }, false);
    }
    else {
      console.log("outside event of backbutton");
    }
  }


  handleIntentCallback() {
    var self = this;
    if (self.isIntentCallbackReceived || self.dataService.isDeepLinkIntentCalled) {
      var paramObj = {
        txnId: self.dataService?.payReceiptTransId ? self.dataService?.payReceiptTransId : '',
        responseCode: self.dataService.payReceiptObj?.responseParameter?.responseCode ? self.dataService.payReceiptObj?.responseParameter?.responseCode : '',
        rrnValue: self.dataService.payReceiptObj?.responseParameter ? self.dataService.payReceiptObj.responseParameter.rrn : '',
        status: self.dataService.payReceiptObj?.responseParameter.status ? 'SUCCESS' : 'FAILURE',
        refId: self.dataService.payReceiptObj?.responseParameter ? self.dataService.payReceiptObj.responseParameter.rrn : '',
        appId: this.constant.val_app_pakage_name
      }

      window.plugins.launchmyapp.setIntent(paramObj, (d) => {
        console.log('setIntent Success => '+ d);
      }, (e) => {
        console.log('setIntent Error => '+ e);
      });
    }
  }

  checkFlow() {
    try {
      console.log("checkFlow ====>");
      if (window.hasOwnProperty('cordova')) {
        console.log("upiStandAlone ====>" + this.dataService.upiStandAlone);
        if (this.dataService.upiStandAlone) {
          this.checkIfUPIRegister();
        } else {
          this.checkIfUserAlreadyRegistered();
        }
      }
    }
    catch (e) {
      console.log("checkFlow catch====>");
    }
  }

  /**
   * Handle Native Plugins functionality
   */
  handleNativeFunctionality() {
    // this.checkFlow();
    if (this.constant.getIsCordova() != 'web') {
      let _this = this;
      document.addEventListener('deviceready', () => {
        console.log("inside deviceready");
        navigator.splashscreen.hide();
        let platform = this.constant.getPlatform();
        console.log('platform' + platform);
        this.checkSIMAvailable();
        this.getDeviceDetails();

        /*Check If App running in Emulator/Simulator */
        if (device.isVirtual) {
          if (platform == this.constant.val_android) {
            console.log("Incompatible Device/Emulator Found");
            this.exitApp();
          } else if (platform == this.constant.val_ios) {
            console.log("Incompatible Device/Simulator Found");
            this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.commonMethod.openPopup('div.popup-bottom.virtualDevice');
          }
        } else {
          if (platform == this.constant.val_android) {
            console.log("Calling methods for Android Platform...");
            this.getSIMSettings();
            this.handleBackEvent();
            // this.continueAppExecution(); //uncomment for testing, comment otherwise
            this.getDeepLinkIntentCallBack();
          } else if (platform == this.constant.val_ios) {
            console.log("iOS Platform handling...");
            //Uncomment only for Prod Build
            // this.checkScreenRecordingIos();
          } else {
            console.log("Unknown platform...");
          }
        }
        this.plugin.checkForRootedDevice().then((deviceDetails) => {
          console.log('deviceDetails => ');
          console.log(deviceDetails);
          if (deviceDetails.rooted) {
            if (platform == this.constant.val_android) {
              console.log("Android device is rooted... Exiting App");
            } else if (platform == this.constant.val_ios) {
              console.log("Jailbroken iPhone detected... App access not allowed");
            } else {
              console.log("Unknown platform...");
            }
            this.commonMethod.openPopup('div.popup-bottom.rooted-device-popup');
          } else {
            this.getMacAddress();
            this.initializeFirebasePlugin();
            this.onFmcMessageReceived();
          }
        });
        // setTimeout(function () { navigator.splashscreen.hide() }, 3000);
        /**
     * This function is invoked to check CodePush updates
     */
        // this.plugin.checkCodePushUpdates();
      }, true);
    } else {
      this.continueAppExecution();
    }
  }

  checkScreenRecordingIos() {
    this.plugin.checkScreenMirroring().subscribe((data) => {
      console.log('checkScreenMirroring return data');
      console.log(data);
    }, (err) => {
      console.log('checkScreenMirroring return err');
      console.log(err);
    });
  }

  createFolder() {
    var storageLocation = 'file:///storage/emulated/0/';
    window.resolveLocalFileSystemURL(storageLocation, function (fileSystem) {
      console.log("<---- file system root --->");
      console.log(fileSystem);
      var directoryEntry = fileSystem;
      var folderName = "PSB";

      directoryEntry.getDirectory(folderName, { create: true, exclusive: false }, function (dir) { console.log("<---->"+ dir) }, function (err) { console.log("<---->"+ err); });

    }, function (err) {
      console.log("<-- out side -->"+ err);
    });
  }

  checkIfUserAlreadyRegistered() {
    // if (this.constant.getPlatform() != "web") {
    if (this.constant.getIsCordova() != "web") {
      console.log("hasKeyLocalStorage ===>" + this.storage.hasKeyLocalStorage(this.constant.storage_omniRegisteredUser));
      // OMNI
      if (!this.storage.hasKeyLocalStorage(this.constant.storage_omniRegisteredUser)) {
        console.log("storage_omniRegisteredUser");
        this.router.navigateByUrl('/LandingPage').then((val) => {
          navigator.splashscreen.hide();
        });
      } else {
        this.router.navigateByUrl('/loginMobile').then((val) => {
          navigator.splashscreen.hide();
        });
      }
    }
    else {
      this.router.navigateByUrl('/login').then((val) => {
        navigator.splashscreen.hide();
      });
    }
  }

  /**
   * function to get device details
   */
  getDeviceDetails() {
    // this.plugin.checkDeviceIMEIPermission().subscribe((status) => {
    //   console.log("status====>",status);
    //   if(status){
    //   this.dataService.imei = this.plugin.getDeviceIMEI();
    //  }
    // });
    // this.plugin.checkIfBiometricAvailable().then((biometricResult) => {
    //   console.log(biometricResult);
    //   this.dataService.isBiometric = biometricResult && biometricResult.available == true ? 'Y' : 'N';
    // });
    this.dataService.uuid = this.plugin.getDeviceUUID();
    this.dataService.platform = this.plugin.getDevicePlatform();
    this.dataService.devicemodel = this.plugin.getDeviceModel();
    this.dataService.osversion = this.plugin.getDeviceOsversion();
    this.dataService.imei = this.plugin.getDeviceIMEI();
    this.constant.val_mobPlatform = this.dataService.platform ? this.dataService.platform : "";
    console.log('this.constant.val_mobPlatform'+ this.constant.val_mobPlatform);
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.constant.val_mobileAppVersion = this.constant.val_mobileAppVersion_android;
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.constant.val_mobileAppVersion = this.constant.val_mobileAppVersion_ios;
      this.addFooterCssForIphone();
    } else {
      this.constant.val_mobileAppVersion = "";
    }
    this.constant.val_upi_app_version = this.constant.val_mobileAppVersion;
    console.log('this.constant.val_mobileAppVersion'+ this.constant.val_mobileAppVersion);

    // this.dataService.uuid= "3d01917b6fd3a4fb";
    // this.dataService.platform = "Android";
    // this.dataService.devicemodel = "Redmi Note 8";
    // this.dataService.osversion = "10"
    // this.dataService.imei = undefined;
    console.log("My Device Details =>");
    console.log("IMEI = ", this.dataService.imei, "UUID = ", this.dataService.uuid, "Platform = ", this.dataService.platform, "Model = ", this.dataService.devicemodel, "OS Version = ", this.dataService.osversion);
  }

  addFooterCssForIphone() {
    console.log('Device Model =>'+ this.dataService.devicemodel);
    /* Add Css for following models on <body>
    iPhone10,6 : iPhone X GSM
    iPhone11,2 : iPhone XS
    iPhone11,4 : iPhone XS Max
    iPhone11,6 : iPhone XS Max Global
    iPhone11,8 : iPhone XR
    iPhone12,1 : iPhone 11
    iPhone12,3 : iPhone 11 Pro
    iPhone12,5 : iPhone 11 Pro Max
    iPhone13,1 : iPhone 12 Mini
    iPhone13,2 : iPhone 12
    iPhone13,3 : iPhone 12 Pro
    iPhone13,4 : iPhone 12 Pro Max
    "iPhone14,4": iPhone 13 mini
    "iPhone14,5": iPhone 13
    "iPhone14,2": iPhone 13 Pro
    "iPhone14,3": iPhone 13 Pro Max
    */

    if (this.dataService.devicemodel == "iPhone10,6" || this.dataService.devicemodel == "iPhone11,2" || this.dataService.devicemodel == "iPhone11,4" || this.dataService.devicemodel == "iPhone11,6" || this.dataService.devicemodel == "iPhone11,8" || this.dataService.devicemodel == "iPhone12,1" || this.dataService.devicemodel == "iPhone12,3" || this.dataService.devicemodel == "iPhone12,5" || this.dataService.devicemodel == "iPhone13,1" || this.dataService.devicemodel == "iPhone13,2" || this.dataService.devicemodel == "iPhone13,3" || this.dataService.devicemodel == "iPhone13,4" || this.dataService.devicemodel == "iPhone14,4" || this.dataService.devicemodel == "iPhone14,5" || this.dataService.devicemodel == "iPhone14,2" || this.dataService.devicemodel == "iPhone14,3") {
      console.log("Bezelless iPhone => Adding Footer CSS...");
      this.dataService.bezellessIphone = true;
    } else {
      this.dataService.bezellessIphone = false;
      console.log("Bezel iPhone => Footer CSS not required")
    }
    console.log('this.dataService.bezellessIphone'+ this.dataService.bezellessIphone);
  }

  checkPermissions() {
    let list = [
      this.permissions.READ_PHONE_STATE,
      this.permissions.SEND_SMS,
      this.permissions.RECEIVE_SMS,
      this.permissions.ACCESS_COARSE_LOCATION

    ];
    let _this = this;
    this.permissions.checkPermission(list, (status) => {
      console.log("hasPermission"+ status);
      if (!status.hasPermission) {

        _this.permissions.requestPermissions(
          list,
          (status) => {
            console.log("requestPermissions"+ status);
            if (!status.hasPermission) {
              // this.reqSmsPerm();
              // this.reqSimPerm();

            } else {
              _this.getSIMSettings();
            }
            // _this.checkGeoLoc();

          },
          (err) => {
            console.warn('requestPermissions not turned on', err);
          });
      } else {
        // _this.getSimInfo();
        // _this.checkGeoLoc();
        _this.getSIMSettings();
      }
    }, (err) => {
      console.warn('hasPermission not turned on', err);
    });
  }

  /**
* api call to validate mobile number
* @param
*/
  mobileNoCheckApiCall(param) {
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_MOBILENOCHECK).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.storage.setLocalStorage(this.constant.storage_deviceId, resp.deviceId);
        this.storage.setLocalStorage(this.constant.storage_isTpinAvl, resp.isTpinAvl);
        this.storage.setLocalStorage(this.constant.storage_isMBUser, resp.isMBUser);
        this.storage.setLocalStorage(this.constant.storage_isIBUser, resp.isIBUser);
        this.storage.setLocalStorage(this.constant.storage_isBiomertric, resp.isBiomertric);
        if (this.constants.getPlatform() == "web") {
          this.router.navigateByUrl('/login');
        }
        else {
          this.router.navigateByUrl('/loginMobile');
        }

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getIP() {
    this.http.getIPAddress().subscribe((res: any) => {
      this.dataService.ipAddress = res.ip;
    });
  }

  closeNoSimPopup() {
    this.commonMethod.closePopup('div.popup-bottom.no-sim-available-ios');
  }

  closePopup(popupName, exitApp?) {

    if (popupName == 'div.popup-bottom.show-common-error' && this.dataService.isDeepLinkIntentCalled && this.dataService.platform.toLowerCase() == this.constant.val_android) {

      var paramObj = {
        txnId: this.dataService?.payReceiptTransId ? this.dataService?.payReceiptTransId : '',
        responseCode: this.dataService.payReceiptObj?.responseParameter?.responseCode ? this.dataService.payReceiptObj?.responseParameter?.responseCode : '',
        rrnValue: this.dataService.payReceiptObj?.responseParameter ? this.dataService.payReceiptObj.responseParameter.rrn : '',
        status: this.dataService.payReceiptObj?.responseParameter.status ? 'SUCCESS' : 'FAILURE',
        refId: this.dataService.payReceiptObj?.responseParameter ? this.dataService.payReceiptObj.responseParameter.rrn : '',
        appId: this.constant.val_app_pakage_name
      }
      window.plugins.launchmyapp.setIntent(paramObj, (d) => {
        console.log('setIntent Success => '+ d);
      }, (e) => {
        console.log('setIntent Error => '+ e);
      });
    }
    if (exitApp) {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        navigator.app.exitApp();
      } else {
        console.log("Exit app not allowed");
      }
    } else {
      if (popupName == '')
        this.dataService.information = "";
      this.dataService.errorMsg = "";
      this.commonMethod.closePopup(popupName);
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        if (this.isIntentCallbackReceived && !this.isUPIRegistered) {
          this.handleIntentCallback();
        }
        if (this.dataService.isDeepLinkIntentCalled) {
          this.commonMethod.closePopup('div.popup-bottom.insecure-qrcode');
        }
      }
    }

    if (this.dataService.isOTPMaxAttempts) {
      this.router.navigateByUrl(this.dataService.previousPageUrl);
      this.dataService.isOTPMaxAttempts = false;
    }

  }

  public initializeNetworkEvents(): void {
    document.addEventListener("offline", this.onOffline.bind(this), true);
    document.addEventListener("online", this.onOnline.bind(this), true);
  }

  onOnline() {
    // this.closePopup('div.popup-bottom.network-info')
  }

  onOffline() {
    this.ngZone.run(() => {
      this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
      this.dataService.informationDetails = this.translatePipe.transform('NO_INTERNET_CONNECTION');
      // this.commonMethod.openPopup('div.popup-bottom.network-info');
      this.dataService.primaryBtnText = this.translatePipe.transform('OK');
      this.dataService.secondaryBtnText = this.translatePipe.transform('RETRY');

      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        this.commonMethod.openPopup('div.popup-bottom.network-info-android');
      } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
        this.commonMethod.openPopup('div.popup-bottom.network-info-ios');
      } else {
        console.log("Unknown platforms...");
      }
    });
  }

  retryInternetCheck(popupName) {
    this.closePopup('div.popup-bottom.' + popupName);
    let connectionType = this.plugin.checkConnection();
    console.log('connectionType'+ connectionType);

    if (connectionType == "Nonetwork") {
      this.onOffline();
    }
  }

  exitAppForNoInternet() {
    this.closePopup('div.popup-bottom.network-info-android');
    navigator.app.exitApp();
  }

  restartApplication() {
    this.ngZone.run(() => {
      this.commonMethod.closePopup('div.popup-bottom.show-appminimized-message');
      this.router.navigateByUrl('/LandingPage');
      // Show splash screen (useful if your app takes time to load)
      navigator.splashscreen.show();
      setTimeout(function () { navigator.splashscreen.hide() }, 3000)
      // Reload original app url (ie your index.html file)
    })
  }

  checkSIMAvailable() {
    this.plugin.checkSIMAvailable().subscribe((response) => {
      this.ngZone.run(() => {
        console.log("checkSIMAvailable Success => "+ response);
        if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
          if (!response.isSimActive) {
            // this.commonMethod.closeAllPopup();
            this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.dataService.simInfoDetails = this.translatePipe.transform('NO_SIM_AVAILABLE');
            this.dataService.primaryBtnText = this.translatePipe.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.no-sim-available');
          }
        } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
          //iOS handling goes here => check for true or false
          if (response == "true" || response == true) {
            //continue execution
            this.dataService.activeSimCount = 1;
            this.continueAppExecution();
          } else {
            //noSimAvailableForApp - show popup & block user flow
            this.dataService.activeSimCount = 0;
            this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.dataService.simInfoDetails = this.translatePipe.transform('NO_SIM_AVAILABLE');
            this.dataService.primaryBtnText = this.translatePipe.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.no-sim-available-ios');
          }
        } else {
          console.log("Unknown platform");
        }
      });
    });
  }


  initializeFirebasePlugin() {
    var self = this;
    console.log("Testing Firebase Plugin...");
    //Check if Firebase Permission is granted or not
    window.FirebasePlugin.hasPermission(function (hasPermission) {
      console.log("Firebase Permission is granted ? " + (hasPermission ? "granted" : "denied"));
      if (hasPermission) {
        //check app token
        window.FirebasePlugin.getToken(function (fcmToken) {
          console.log("fcmToken success = "+ fcmToken);
          self.dataService.fcmToken = fcmToken;
        }, function (error) {
          console.error("fcmToken error = ", error);
        });

      } else {
        //request permission
        window.FirebasePlugin.grantPermission((hasPermission) => {
          console.log("Firebase Permission was granted => " + (hasPermission ? "granted" : "denied"));
          if (hasPermission) {
            self.initializeFirebasePlugin();
          } else {

          }
        });
      }
    });
  }

  onFmcMessageReceived() {
    window.FirebasePlugin.onMessageReceived(function (message) {
      console.log('message Received => '+ message);
      console.log("Message type: " + message.messageType);
      if (message.messageType === "notification") {
        console.log("Notification message received");
        if (message.tap) {
          console.log("Tapped in " + message.tap);
        }
        /*
        Redirect to:
        'PAY' => Transaction History
        'COLLECT' => Pending With Payer
        'COLLECT_ACCEPT' => Pending With Me
        'MANDATE' => UPI Mandates
        'MANDATE_ACCEPT'=> Approve Mandate
        'SET_PIN', 'CHANGE_PIN', 'LINK_ACCOUNT', 'BAL_ENQ' => Manage Account
        'OTP', 'OTHERS' => Dashboard
         */
        let url = "";
        if (message.type) {
          if (message.type == 'PAY') {
            // url = "payUpi";
            url = "transactionList";
          } else if (message.type == 'COLLECT') {
            url = "pendingRequestUpi";
            this.DataService.enablePendingWithPayerTab = false;
          } else if (message.type == 'COLLECT_ACCEPT') {
            url = "pendingRequestUpi";
            this.DataService.enablePendingWithPayerTab = true;
          } else if (message.type == 'MANDATE') {
            url = "upiMandate";
          } else if (message.type == 'MANDATE_ACCEPT') {
            url = "approveMandate";
          } else if (message.type == 'SET_PIN' || message.type == 'CHANGE_PIN' || message.type == 'LINK_ACCOUNT' || message.type == 'BAL_ENQ') {
            url = "manageAccounts";
          } else if (message.type == 'OTP' || message.type == 'OTHERS') {
            url = "upiDashboard";
          } else {
            console.log("Type not found..");
            url = "upiDashboard";
          }
          this.DataService.routeWithNgZone(url);
        } else {
          console.log("Type not found..");
        }
      }
      console.dir(message);
    }, function (error) {
      console.error("Message Error", error);
    });
  }

  redirecToLogin(popupName) {
    this.ngZone.run(() => {
      this.commonMethod.closePopup('div.popup-bottom.' + popupName);
      this.router.navigate(['/upiLogin'], { replaceUrl: true });
    });
  }

  navigateToLogin() {
    this.ngZone.run(() => {
      this.commonMethod.closePopup('div.popup-bottom.show-sessionTimedOut-info');
      if (this.constants.getPlatform() == "web") {
        this.router.navigate(['/login'], { replaceUrl: true });
      }
      else if (this.dataService.isOmniLogin == true && this.constants.getPlatform() != "web") {
        this.router.navigate(['/loginMobile'], { replaceUrl: true });
      }
      else {
        this.ngZone.run(() => {
          this.router.navigate(['/upiLogin'], { replaceUrl: true });
        })
      }
      this.dataService.isUPILogin = false;
      this.dataService.isOmniLogin = false;
    });
  }


  initializeEvents() {
    document.addEventListener("resume", this.onResume.bind(this), false);
    document.addEventListener("pause", this.onPause.bind(this), false);
  }

  onResume() {
    if (this.dataService.isUPILogin) {
      var diff = new Date().getTime() - this.minimizedTime.getTime()
      var secondsDiff = Math.floor(diff / 1000);
      if (secondsDiff > 120) {
        console.log("Calling Logout API from onResume...");
        this.logout(true);
      }
    }
    else{
      var diff = new Date().getTime() - this.minimizedTime.getTime()
      var secondsDiff = Math.floor(diff / 1000);
      if (secondsDiff > 120) {
        console.log("Calling Logout API from onResume...");
        this.logoutOmni();
      }
    }
  }

  onPause() {
    this.minimizedTime = new Date();
  }


  logoutOmni(){
    let logoutReqParams = this.dashboardService.getLogoutParams();
    this.http.callBankingAPIService(logoutReqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOGOUT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.isLogOutOmni = true;
        this.idle.stop();
        this.commonMethod.closeAnyModal();
        this.commonMethod.closeAllPopup();

        this.ngZone.run(() => {
          this.dataService.information = this.translatePipe.transform('SESSION_TIMED_OUT');
          this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.dataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-sessionTimedOut-info');
        })


        this.dataService.isLoggedIn = false;
        this.dataService.setShowThemeObservable(false);
        this.dataService.showDetails = false;
        this.storage.clearSessionStorage();
        if (this.constant.getPlatform() == "web") {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
        else {
          this.router.navigate(['/loginMobile'], { replaceUrl: true });
        }

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

}
