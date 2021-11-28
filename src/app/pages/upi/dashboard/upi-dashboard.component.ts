import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { UpiDashboardService } from './upi-dashboard.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { ProfileDetailsService } from '../../omni/profile/profile-details/profile-details.service';
import { PluginService } from '../../../services/plugin-service';
import { NpciAndroidService } from '../../../services/npci-android.service';
import { Subject } from 'rxjs';
import { NpciIosService } from 'src/app/services/npci-ios.service';
import { ManageAccountDashboardService } from '../manage-accounts/manage-accounts-dashboard/manage-account-dashboard.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { BenificiaryService } from '../benificiary/benificiary.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var navigator: any;
declare var showNoVPAModal: any;
declare var upiDashboard: any;
declare var window: any;
declare var cordova: any;

@Component({
  selector: 'app-upi-dashboard',
  templateUrl: './upi-dashboard.component.html',
  styleUrls: ['./upi-dashboard.component.scss']
})

export class UpiDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  recentTransactionList = [];
 
  upidashboardCarousel: OwlOptions;
  activeSlides: SlidesOutputData;
  vpaListIdx: any;
  accListIdx: any;
  vpaList: any = [];
  vpaAccountList = [];
  selectedVPA = "";
  selectedAccountVpa: any;
  selectedVPAIndex: any;
  // allPendingNotificationCount: any;
  transactionNotificationCount: any;
  notificationCountTimer: any;
  allPendingNotificationCount: any;
  headerdata:any;
  constructor(
    private router: Router,
    public DataService: DataService,
    private translatePipe: TranslatePipe,
    private upiDashboardService: UpiDashboardService,
    private http: HttpRestApiService,
    public constant: AppConstants,
    private storage: LocalStorageService,
    private profileDtlsService: ProfileDetailsService,
    private pluginService: PluginService,
    private npciIosService: NpciIosService,
    private commonMethods: CommonMethods,
    private beneficiaryService: BenificiaryService,
    private loaderService: pageLoaderService,
    private ngZone: NgZone,
    private manageAccountService: ManageAccountDashboardService,
    private npciAndroidService: NpciAndroidService,
    private cdr: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // this.DataService.removePreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.DataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });
    if(this.DataService.omniUPIFlow){
      if(this.DataService.fromOmniLogin){
        this.headerdata = {
          'headerType': 'backUpiIdHeader',
          'titleName': 'BHIM UPI',
          'footertype': 'upiDashboardFooter'
        }
      }else{
        this.headerdata = {
          'headerType': '',
          'sidebarNAv': 'upiDashboardNav',
          'footertype': 'upiDashboardFooter'
        };
      }
       
    }else{    
      this.headerdata = {
        'headerType': '',
        'sidebarNAv': 'upiDashboardNav',
        'footertype': 'upiDashboardFooter'
      };
    }
    this.DataService.changeMessage(this.headerdata);
    // upiDashboard();
    if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      if (this.DataService.fetchUPIProfileDetails && !this.DataService.omniUPIFlow) {
        this.DataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + this.storage.getLocalStorage(this.constant.storage_profileImage));
        this.getProfileDetails();
      }
    }
    this.fetchVPAAdressList();
    this.updateIcons()
    this.upidashboardCarousel = this.DataService.getUpiCarouselOptions();
    this.DataService.invokeBiometricCheck();
    console.log("local VPALIST", this.DataService.vpaAddressList);
    this.manageAccountService.initData();
    this.checkIntentCall();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        if (this.DataService.fetchUPIProfileDetails && !this.DataService.omniUPIFlow) {
          this.getProfileDetails();
        }
      }
      this.getNotificationCount();
      this.beneficiaryService.getBenificiaryList();
    });
  }

  checkIntentCall() {
    if (this.DataService.isCordovaAvailable && this.DataService.vpaAddressList.length > 0) {
      var self = this;
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        window.plugins.launchmyapp.getLastIntent(function (url) {
          if (url.indexOf("upi://pay") > -1) {
            console.log("received url: " + url);
            self.DataService.setIntentCallback({ error: "", fromRecent: false, isValidQR: "Y", response: url });
          } else {
            return console.log("ignore intent: " + url);
          }
        }, function (error) {
          return console.log("no intent received");
        });
        return;
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("DataService.profileImage = ", this.DataService.profileImage);
      } else {
        console.log("Unknown platform");
      }
    }
  }

  /**
   * Navigate by url
   * @param routeName 
   */
  goToPage(routeName) {
    if (routeName == 'collectRecentRequest') {
      this.DataService.resetUpiCollectData();
    } else if (routeName == 'createUpi') {
      //navigate to createUPI with defaultVPAflag set to yes
      this.DataService.createDefaultVPAFlag = true;
    } else if (routeName == 'payUpi') {
      this.DataService.resetUpiPayData();
    } else if (routeName == 'pendingRequestUpi') {
      this.DataService.enablePendingWithPayerTab = false;
    } else if (routeName == 'manageAccounts') {
      this.DataService.isSetVpaDtl = false;
    } else if (routeName == 'searchPayee') {
      this.DataService.upiSearchType = 'recent';
    } else if (routeName == 'transactionList') {
      this.DataService.navigationFromDashboard = true;
    }
    this.DataService.isRaiseComplaint = false;
    this.DataService.routeWithNgZone(routeName);
  }

  getNotificationCount() {
    // this.DataService.notificationCountApiCalled = true;
    let reqParams = this.upiDashboardService.getNotificationCountRequestObject();
    this.UpiApiCall(reqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), true);
  }

  /**
   * On carousel update value
   * @param data 
   */
  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides.startPosition);
  }

  // Move array on basis of default account set
  defaultVpaMove(vpaAccountList) {
    let default_Vpa_Set_Index = 0;
    let default_Vpa_index = vpaAccountList.findIndex(function (vpa) {
      return vpa.isDefaultAccount === 'Y';
    });
    if (default_Vpa_Set_Index >= vpaAccountList.length) {
      var k = default_Vpa_Set_Index - vpaAccountList.length + 1;
      while (k--) {
        vpaAccountList.push(undefined);
      }
    }
    vpaAccountList.splice(default_Vpa_Set_Index, 0, vpaAccountList.splice(default_Vpa_index, 1)[0]);
    console.log('Sorted vpaList', vpaAccountList)
    // if (this.vpaList.length > 0) {
    //   this.setSelectedVpaAccountList(0);
    // }
    // return arr; // for testing
  };

  /**
   * Fetch VPA Address List
   */
  fetchVPAAdressList() {
    if (this.DataService.vpaAddressList.length == 0) {
      this.upiDashboardService.getUserLocation();
      var param = this.upiDashboardService.getVPAAddressListAPICall();
      let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId)
      this.UpiApiCall(param, deviceId, false)
    } else {
      this.vpaList = this.DataService.vpaAddressList;
      let selectedVPA = this.vpaList.find((vpaAddress) => vpaAddress.vpaSelected == true);
      this.getAccountListByVPA(selectedVPA);
    }
  }

  /**
   * Invoking NPCI Screen
   * @param accountData 
   * @param paymentAddress 
   * @param flowName 
   */
  callNpciLibrary(accountData, flowName, paymentAddress?, vpaListIdx?, accListIdx?) {
    this.loaderService.showLoader();
    console.log("inside callNpciLibrary => ");
    if (vpaListIdx != undefined && accListIdx != undefined) {
      this.vpaListIdx = vpaListIdx;
      this.accListIdx = accListIdx;
    }
    accountData.paymentAddress = paymentAddress;
    console.log('accountData', accountData);

    if (window.hasOwnProperty('cordova')) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        let subject = new Subject<any>();
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.npciAndroidService.androidStartCLLibrary(accountData, flowName, subject).subscribe((NPCIResponse) => {
            console.log('Android StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              this.callApiForFlow(flowName, accountData, NPCIResponse);
            } else {

            }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });

      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          let subject = new Subject<any>();
          this.npciIosService.iosStartCLLibrary(accountData, flowName, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse && NPCIResponse.credkey) {
              this.callApiForFlow(flowName, accountData, NPCIResponse);
            } else {
              //failure handler
              console.log("Npci Flow cancelled...");
            }
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        console.log("unknown platform = ", this.DataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
  }

  /**
   * Checking for flow,so to handle api calls accordingly
   * @param flowName 
   * @param accDetails 
   * @param NPCIResponse 
   */
  callApiForFlow(flowName, accDetails, NPCIResponse) {
    switch (flowName) {
      case this.constant.val_npci_flow_balanceEnquiry:
        this.manageAccountService.balanceEnquiryRequestObject(accDetails, NPCIResponse);
        var requestObj = this.manageAccountService.getEncryptedOmniRequestObject();
        this.UpiApiCall(requestObj, this.storage.getLocalStorage(this.constant.storage_deviceId), false);
        break;
      default:
        console.log("Default case...", flowName);
        break;
    }
  }

  /**
   * Common UPI Api call
   * @param request 
   * @param deviceId 
   * @param notificationSync 
   */
  UpiApiCall(request, deviceId, notificationSync) {
    this.http.callBankingAPIService(request, deviceId, this.constant.upiserviceName_PROCESSUPISERVICESESSION, true, { notificationSync: notificationSync }).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      console.log('1 => response', response);
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
            console.log("GETPAYMENTADDRESSLISTDETAILS => ", response);
            this.DataService.vpaAddressList = this.DataService.processVPAlist(response.responseParameter.addresslist);
            console.log('this.DataService.vpaAddressList', JSON.stringify(this.DataService.vpaAddressList))
            this.vpaList = this.DataService.vpaAddressList;
            let selectedVPA = this.vpaList.find((vpaAddress) => vpaAddress.vpaSelected == true);
            this.getAccountListByVPA(selectedVPA);
            if (this.DataService.isCordovaAvailable) {
              var self = this;
              if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
                window.plugins.launchmyapp.getLastIntent(function (url) {
                  if (url.indexOf("upi://pay") > -1) {
                    console.log("received url: " + url);
                    self.DataService.setIntentCallback({ error: "", fromRecent: false, isValidQR: "Y", response: url });
                  } else {
                    return console.log("ignore intent: " + url);
                  }
                }, function (error) {
                  return console.log("no intent received");
                });
                return;
              } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {

              } else {
                console.log("Unknown platform");
              }
            }
            break;
          case this.constant.upiserviceName_BALANCEENQUIRY:
            console.log("BALANCEENQUIRY response handling...");
            let amount = response.responseParameter.RESULT; //ledgerBal
            if (this.vpaList.length > 0) {
              this.ngZone.run(() => {
                this.vpaList[this.vpaListIdx].accounts[this.accListIdx].balanceAmount = amount;
                this.vpaList[this.vpaListIdx].accounts[this.accListIdx].maskedBalance = this.commonMethods.maskBalance(amount);
                this.vpaList[this.vpaListIdx].accounts[this.accListIdx].showBalance = true;
                this.vpaList[this.vpaListIdx].accounts[this.accListIdx].isBalanceUpdated = true;
                this.cdr.detectChanges();
              });
            }
            console.log('update balance', amount);

            break;
          case this.constant.upiserviceName_GETNOTIFICATIONCOUNT:
            console.log("GETNOTIFICATIONCOUNT response => ");
            console.log(response.responseParameter);
            this.transactionNotificationCount = parseInt(response.responseParameter.transactionNotificationCount);
            this.DataService.updateIcons(response.responseParameter);
          default:
            console.log("default => ", response.subActionId);
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
            if (this.vpaList.length == 0) {
              this.DataService.isVpaZero = true;
              if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
                showNoVPAModal();
              } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
                this.showPopup('noVpaExitRetryIos');
              } else {
                console.log("Unknown platform...");
              }
            }
            break;
          default:
            console.log("Error in service... ", response.subActionId);
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }


  getAccountListByVPA(selectedVPA, closePopup?) {
    if (closePopup) {
      this.closePopup('upi-account');
    }
    this.selectedAccountVpa = selectedVPA;
    console.log('selectedVPA ==> ', selectedVPA)
    this.vpaAccountList = [];
    this.vpaList.forEach((item, index) => {
      if (item.paymentAddress == selectedVPA.paymentAddress) {
        this.selectedVPAIndex = index;
        console.log('VPA INDEX ', index)
        this.selectedVPA = item.paymentAddress;
        item.vpaSelected = true;
        this.vpaAccountList = item.accounts;
      } else {
        item.vpaSelected = false;
      }
    });
    this.defaultVpaMove(this.vpaAccountList);
    console.log(' VPA LIST ', JSON.stringify(this.vpaList));
  }

  setDetails(selectedVPA) {
    this.selectedAccountVpa = selectedVPA;
  }

  setDetailsAccountList(selectedVPA, closePopup?) {
    if (closePopup) {
      this.closePopup('upi-account');
    }
    this.selectedAccountVpa = selectedVPA;
    console.log('selectedVPA ==> ', selectedVPA)
    this.vpaAccountList = [];
    this.vpaList.forEach((item, index) => {
      if (item.paymentAddress == this.selectedAccountVpa.paymentAddress) {
        this.selectedVPAIndex = index;
        console.log('VPA INDEX ', index)
        this.selectedVPA = item.paymentAddress;
        item.vpaSelected = true;
        this.vpaAccountList = item.accounts;
      } else {
        item.vpaSelected = false;
      }
    });
  }

  /**
   * function to get profile details and display
   * api call for frofile
   */
  getProfileDetails() {
    let param = this.profileDtlsService.getProfileDetailsParam(true);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CUSTPROFILEDETAILS, true).subscribe(data => {
      console.log("Profile details => ");
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.DataService.upiUserEmailAdress = resp.email_id;
        this.DataService.userName = resp.customerName;
        console.log("profImgUploadFlag = ", this.storage.getLocalStorage(this.constant.storage_profImgUploadFlag));
        if (this.storage.getLocalStorage(this.constant.storage_profImgUploadFlag) == 'N') {
          resp.base64Image = this.storage.getLocalStorage(this.constant.storage_profileImage);
          console.log("this.storage.getLocalStorage(this.constant.storage_profileImage)",this.storage.getLocalStorage(this.constant.storage_profileImage));
          this.DataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + this.storage.getLocalStorage(this.constant.storage_profileImage));
        }
        this.DataService.setUPIDetails(resp);
      } else {
        // this.errorCallBack(data.subActionId, resp);
        this.ngZone.run(() => {
          this.DataService.profileImage =  this.domSanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + this.storage.getLocalStorage(this.constant.storage_profileImage));
        });
      }
    });
  }

  /**
   * Update show balance parameter
   * @param vpaListIdx 
   * @param accListIdx 
   * @param showBalance 
   */
  // updateShowBalance(vpaListIdx, accListIdx, showBalance) {
  //   this.vpaList[vpaListIdx].accounts[accListIdx].showBalance = showBalance;
  // }


  setVpaDetailsForLinkAccount(url) {
    this.DataService.linkAccSelectedVpaDetails = this.selectedAccountVpa;
    this.goToPage(url);
  }

  exitApp() {
    navigator.app.exitApp();
  }

  navigateToPage(recentTransaction) {
    if (recentTransaction.txnMode == 'ACCOUNT') {
      recentTransaction.beneVpa = recentTransaction.beneVpa ? recentTransaction.beneVpa : recentTransaction.beneAccount + "@" + recentTransaction.beneIfsc + ".ifsc.npci";
    }
    this.DataService.recentTransactionUPI = recentTransaction;
    // this.router.navigateByUrl('/recentTransaction');
    this.DataService.routeWithNgZone('/recentTransaction');
  }

  toggleBalanceDetails(vpaItem, vpaListIdx, accListIdx) {
    console.log("inside toggleBalanceDetails");
    console.log('vpaItem', vpaItem);
    console.log('vpaListIdx', vpaListIdx);
    console.log('accListIdx', accListIdx);

    if (vpaItem.isBalanceUpdated) {
      vpaItem.showBalance = !vpaItem.showBalance;
    } else {
      if (vpaItem.showBalance) {
        vpaItem.showBalance = false;
      } else {
        this.viewBalanceFlow(vpaItem, vpaListIdx, accListIdx);
      }
    }
  }

  viewBalanceFlow(vpaItem, vpaListIdx, accListIdx) {
    console.log("viewBalanceFlow =", vpaItem);
    // if (vpaItem.accounts[accListIdx].showBalance) {
    //   vpaItem.accounts[accListIdx].showBalance = false;
    // } else {
    //   if (vpaItem.accounts[accListIdx].mbeba == 'N') {
    //     this.ngZone.run(() => {
    //       this.DataService.information = this.translatePipe.transform('UPI_PIN_NOT_SET');
    //       this.commonMethods.openPopup('div.popup-bottom.show-common-info')
    //     });
    //   } else {
    //     this.callNpciLibrary(vpaItem.accounts[accListIdx], this.constant.val_npci_flow_balanceEnquiry,vpaItem.paymentAddress, vpaListIdx, accListIdx);
    //   }
    // }

    if (vpaItem.mbeba == 'N') {
      this.ngZone.run(() => {
        this.DataService.information = this.translatePipe.transform('UPI_PIN_NOT_SET');
        this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
        this.DataService.primaryBtnText = this.translatePipe.transform('OK');
        this.commonMethods.openPopup('div.popup-bottom.show-common-info');
      })
    } else {
      this.callNpciLibrary(vpaItem, this.constant.val_npci_flow_balanceEnquiry, this.selectedVPA, vpaListIdx, accListIdx);
    }
  }

  ngOnDestroy() {
    this.DataService.intentCallbackSource.unsubscribe();
    // clearInterval(this.notificationCountTimer);
    // this.DataService.notificationCountApiCalled = false;
  }

  showPopup(popupName) {
    this.commonMethods.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName, exitApp?) {
    this.commonMethods.closePopup('div.popup-bottom.' + popupName);
    if (popupName == 'location-permission-denied') {
      if (exitApp) {
        if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
          navigator.app.exitApp();
        } else {
          this.commonMethods.openPopup('div.popup-bottom.' + popupName);
        }
      }
    }
  }

  getContactSettings(popupName: string) {
    this.commonMethods.closePopup('div.popup-bottom.contact-dashboard-permission-not-granted');
    console.log("Opening native settings for contact...");
    this.pluginService.gotoSetting().subscribe((status) => {
      console.log("gotoSetting=====>", status);
    }, (err) => {
      console.log("gotoSetting error", err);
    });
  }

  closePopups() {
    this.commonMethods.closeAllPopup();
  }

  routeTo(location) {
    // this.router.navigate([location]);
    this.DataService.routeWithNgZone(location);
  }



  /**
   * Open logout modal
   */
  openLogoutModal() {
    this.ngZone.run(() => {
      this.DataService.informationLabel = this.translatePipe.transform('LOGOUT');
      this.DataService.informationDetails = this.translatePipe.transform('LOGOUT_MSG');
      this.DataService.primaryBtnText = this.translatePipe.transform('YES');
      this.DataService.secondaryBtnText = this.translatePipe.transform('NO');
      this.commonMethods.openPopup('div.popup-bottom.logout1');
    })
  }

  openProfilePopUp() {
    // upiDashboard();
    this.commonMethods.openPopup('div.popup-bottom.profile1');
  }



  updateIcons() {
    this.DataService.updateIconsObservable.subscribe((notificationCountObj: any) => {
      console.log("INSIDE HEADER");
      console.log(notificationCountObj);
      if (notificationCountObj) {
        this.allPendingNotificationCount = parseInt(notificationCountObj.allPendingNotificationCount);
      }
    });
  }

  cancel(){
    this.router.navigateByUrl('/dashboardMobile')
  }


}
