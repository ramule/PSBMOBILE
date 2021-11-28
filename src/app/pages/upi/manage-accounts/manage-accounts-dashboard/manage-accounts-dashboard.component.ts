import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { CarouselComponent, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { ManageAccountDashboardService } from './manage-account-dashboard.service';
import { AppConstants } from '../../../../app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { CustomCurrencyPipe } from '../../../../pipes/custom-currency.pipe';
import { CommonMethods } from '../../../../utilities/common-methods';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { UPIBankAccount } from '../../../../models/account-detail-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import { PluginService } from '../../../../services/plugin-service';
import { Location } from '@angular/common';

import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { data } from 'jquery';
import { UpiDashboardService } from '../../dashboard/upi-dashboard.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { FormValidationService } from 'src/app/services/form-validation.service';

declare var manageAccountDashboard: any;

@Component({
  selector: 'app-manage-accounts-dashboard',
  templateUrl: './manage-accounts-dashboard.component.html',
  styleUrls: ['./manage-accounts-dashboard.component.scss']
})

export class ManageAccountsDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  //@ViewChild('owlCarManage', { static: false }) owlCarManage: any;

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Manage Accounts',
    'footertype': 'none'
  }
  vpaIndex = 0;
  acctIdx = 0;
  isAmountLimitExceeded = false;
  manageAccountDashboardCarousel: OwlOptions;
  activeSlides: SlidesOutputData;
  vpaList: any = [];
  formInput = ['spassword1', 'spassword2', 'spassword3', 'spassword4', 'spassword5', 'spassword6'];
  formInputExp = ['expdate1', 'expdate2', 'expdate3', 'expdate4'];
  vpaAccountList: any;
  vpaAccountListStatic: any;
  selectedVpaDetails: any;
  accountBalance: any;
  showAmountLabel: boolean = false;
  popupData: any = {};
  minDate: any;
  maxDate: any;
  setLimitForm: FormGroup;
  debitCardForm: FormGroup;
  finalCredResponse: any;
  accountDetails: any;
  showFormat1Screen: boolean = false;
  showFormat2Screen: boolean = false;
  vpaListIdx: any;
  accListIdx: any;
  callVpaMoveFun: boolean = true;
  showDebitBlockOption: boolean = false;
  @ViewChildren('mPINformRow') mPinRows: any;
  @ViewChildren('expiryDateRow') expDateRows: any;
  @ViewChild('owlCarManage') owlCarManage: CarouselComponent;

  constructor(private router: Router, public dataService: DataService, private manageAccountService: ManageAccountDashboardService, public constant: AppConstants, public http: HttpRestApiService, public localStorageService: LocalStorageService, public customCurrencyPipe: CustomCurrencyPipe, private commonMethod: CommonMethods, public translate: TranslatePipe, private npciAndroidService: NpciAndroidService, private npciIosService: NpciIosService, private pluginService: PluginService, private location: Location, private upiDashboardService: UpiDashboardService, private loaderServce: pageLoaderService, private ngZone: NgZone, private formValidation: FormValidationService, private loaderService: pageLoaderService) { }

  ngOnInit(): void {
    console.log("MANAGE ACCOUNTS => ngOnInit...");

    if (this.dataService.previousPageUrl == "myProfile") {
      history.pushState({}, 'myProfile', this.location.prepareExternalUrl("myProfile"));
    } else {
      history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    }
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.dataService.changeMessage(this.headerdata);
    this.manageAccountDashboardCarousel = this.dataService.getManageCarouselOptions(1);
    manageAccountDashboard();
    this.manageAccountService.initData();
    this.buildSetLimitForm();
    this.buildDebitCardForm();
    this.fetchVPAAdressList();
    console.log('this.dataService.isSetVpaDtl', this.dataService.isSetVpaDtl);
    if (this.dataService.isSetVpaDtl) {
      setTimeout(() => {
        var self = this;
        var index = this.vpaList.map(function (x) {
          return x.paymentAddress;
        }).indexOf(self.dataService.vpaDtls.paymentAddress);
        console.group("index =");
        console.log(index);
        this.owlCarManage.to(index.toString());
        this.dataService.isSetVpaDtl = false;
      }, 500);
    }
  }

  buildSetLimitForm() {
    this.setLimitForm = new FormGroup({
      limitAmt: new FormControl('', [Validators.required])
    });
  }

  buildDebitCardForm() {
    this.debitCardForm = new FormGroup({
      //cardNumber : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      spassword1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword5: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword6: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      expdate1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      expdate2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      expdate3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      expdate4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)])
    });
  }

  goToPage(routeName, comingFrom?) {
    if (routeName == 'createUpi') {
      this.dataService.isSetVpaDtl = true;
      this.dataService.vpaDtls = this.selectedVpaDetails;
      if (comingFrom == "add") {
        this.setVpaDetailsForLinkAccount(this.selectedVpaDetails);
        this.dataService.isLinkAccountFlow = true;
      } else {
        this.dataService.isLinkAccountFlow = false;
      }
      if (this.dataService.vpaAddressList.length > 0) {
        //User has existing VPAs, check length & default VPA
        if (this.dataService.vpaAddressList.length == 3) {
          //Max Limit reached, navigate to upiRegSuccess
        } else {
          if (this.dataService.vpaAddressList.some(vpaDetails => vpaDetails.default === 'Y')) {
            //navigate to createUPI with defaultVPAflag set to no
            this.dataService.createDefaultVPAFlag = false;
          } else {
            //navigate to createUPI with defaultVPAflag set to yes
            this.dataService.createDefaultVPAFlag = true;
          }
        }
      } else {
        //user has no VPAs, navigate to createUPI with defaultVPAflag set to yes
        this.dataService.createDefaultVPAFlag = true;
      }
    }
    else if (routeName == 'payUpi') {
      // this.dataService.isSelfTransfer = true;
      // this.dataService.isSetVpaDtl = true;
      this.dataService.vpaDtls = this.selectedVpaDetails;
    }
    this.dataService.routeWithNgZone(routeName);
  }

  setVpaDetailsForLinkAccount(vpa) {
    this.dataService.linkAccSelectedVpaDetails = vpa;
  }

  getSlideData(data: SlidesOutputData, vpa?) {
    // console.log('vpa', vpa);
    this.activeSlides = data;
    var activeSlidesIsActive = data.slides[0] ? data.slides[0].isActive : false;
    console.log("active slide => ", this.activeSlides.startPosition);
    if (activeSlidesIsActive || this.callVpaMoveFun == false) {
      this.setSelectedVpaAccountList(this.activeSlides.startPosition);
    } else {
      this.setSelectedVpaAccountList(0);
    }
  }

  /**
   * Fetch VPA Address List
   */
  fetchVPAAdressList() {
    if (this.dataService.vpaAddressList.length == 0) {
      this.upiDashboardService.getUserLocation();
      // var param = this.upiDashboardService.getVPAAddressListAPICall();
      // this.dashboardAPICall(param);
      // this.UpiApiCall(param);
      this.UpiApiCall(this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS);
    } else {
      this.vpaList = this.dataService.vpaAddressList;
      console.log("MANAGE => vpaLsit => ");
      console.log(this.vpaList);
      if (this.callVpaMoveFun) {
        this.defaultVpaMove(this.vpaList);
      } else {

      }
    }
  }

  setSelectedVpaAccountList(index) {
    this.vpaIndex = index;
    this.selectedVpaDetails = this.vpaList[index];
    console.log('this.selectedVpaDetails');
    console.log(this.selectedVpaDetails);
    this.manageAccountService.selectedVpa = this.selectedVpaDetails;
    this.vpaAccountList = this.selectedVpaDetails.accounts;
    this.vpaAccountList.forEach(element => {
      element.frequency = this.selectedVpaDetails.frequency;
      element.paymentAddress = this.selectedVpaDetails.paymentAddress;
      element.showBalance = false;
      element.accountLinkedTime = moment(element.accountLinkedTime).format('DD MMMM YYYY');
    });

    this.vpaAccountList.sort(function (x, y) {
      // true values first
      return (x.isDefaultAccount === y.isDefaultAccount) ? 0 : x.isDefaultAccount == 'Y' ? -1 : 1;
      // false values first
      // return (x === y)? 0 : x? 1 : -1;
    });

    setTimeout(() => {
      if (this.callVpaMoveFun == false) {
        this.owlCarManage.to(index.toString());
        this.callVpaMoveFun = true;
      }
    }, 500);
    console.log('this.vpaAccountList');
    console.log(this.vpaAccountList);
  }

  // Move array on basis of default account set
  defaultVpaMove(vpaList) {
    let default_Vpa_Set_Index = 0;
    let default_Vpa_index = vpaList.findIndex(function (vpa) {
      return vpa.default === 'Y';
    });
    if (default_Vpa_Set_Index >= vpaList.length) {
      var k = default_Vpa_Set_Index - vpaList.length + 1;
      while (k--) {
        vpaList.push(undefined);
      }
    }
    vpaList.splice(default_Vpa_Set_Index, 0, vpaList.splice(default_Vpa_index, 1)[0]);
    console.log('Sorted vpaList', vpaList)
    // if (this.vpaList.length > 0) {
    //   this.setSelectedVpaAccountList(0);
    // }
    // return arr; // for testing
  };

  callNpciLibrary(accountData: UPIBankAccount, flowName, accountIdx?) {
    this.loaderService.showLoader();
    if (accountIdx != undefined) {
      this.accListIdx = accountIdx;
    }
    this.loaderServce.showLoader();
    console.log("inside callNpciLibrary => ");
    accountData.paymentAddress = this.selectedVpaDetails.paymentAddress;
    console.log('accountData', accountData);

    if (flowName == this.constant.val_npci_flow_setUpiPin) {
      if (this.dataService.isEmpty(accountData.atmCredType)) {
        this.showFormat1Screen = true;
        this.showFormat2Screen = false;
      } else {
        this.showFormat1Screen = false;
        this.showFormat2Screen = true;
      }
      console.log('this.showFormat1Screen', this.showFormat1Screen);
      console.log('this.showFormat2Screen', this.showFormat2Screen);

      if (this.showFormat1Screen) {
        if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
          this.npciAndroidService.credTypeValue = this.constant.val_npci_credTypeSetUpiPin;
        } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
          this.npciIosService.credTypeValue = this.constant.val_npci_credTypeSetUpiPin;
        } else {
          console.log("Unknown platform..");
        }
      }

      if (this.showFormat2Screen) {
        if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
          this.npciAndroidService.credTypeValue = this.constant.val_npci_credTypeSetUPIPinWithATM;
        } else if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
          this.npciIosService.credTypeValue = this.constant.val_npci_credTypeSetUPIPinWithATM;
        } else {
          console.log("Unknown platform..");
        }
      }
    }

    if (window.hasOwnProperty('cordova')) {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        let subject = new Subject<any>();

        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.npciAndroidService.androidStartCLLibrary(accountData, flowName, subject).subscribe((NPCIResponse) => {
            console.log('Android StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              this.finalCredResponse = NPCIResponse;
              this.callApiForFlow(flowName, accountData, this.finalCredResponse);
            } else {
              if (flowName == this.constant.val_npci_flow_setUpiPin) {
                $('div.ios-nav-overlay').fadeOut(400);
              }
            }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });
      } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        console.log(flowName);
        this.npciIosService.initData();
        let subject = new Subject<any>();
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          this.npciIosService.iosStartCLLibrary(accountData, flowName, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse && NPCIResponse.credkey) {
              this.finalCredResponse = NPCIResponse;
              this.callApiForFlow(flowName, accountData, this.finalCredResponse);
            } else {
              //failure handler
              console.log("NPCI flow cancelled...");
            }
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        console.log("unknown platform = ", this.dataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
  }

  callApiForFlow(flowName, accountData, finalCredResponse) {
    switch (flowName) {
      case this.constant.val_npci_flow_balanceEnquiry:
        this.UpiApiCall(this.constant.upiserviceName_BALANCEENQUIRY, accountData, finalCredResponse);
        break;
      case this.constant.val_npci_flow_setUpiPin:
        this.UpiApiCall(this.constant.upiserviceName_REGMOBILE, accountData, finalCredResponse);
        break;
      case this.constant.val_npci_flow_changeUpiPin:
        this.UpiApiCall(this.constant.upiserviceName_CHANGECREDENTIALS, accountData, finalCredResponse);
        break;
      case this.constant.val_npci_flow_globalUpi:
        this.UpiApiCall(this.constant.upiserviceName_GLOBALQRACTIVATION, accountData, finalCredResponse);
        break;
      default:
        console.log("Default case...", flowName);
        break;
    }
  }

  UpiApiCall(apiName, accountData?, NPCIResponse?) {
    switch (apiName) {
      case this.constant.upiserviceName_CHANGECREDENTIALS:
        this.manageAccountService.changeUPIPINRequestObject(accountData, NPCIResponse);
        break;
      case this.constant.upiserviceName_BALANCEENQUIRY:
        this.manageAccountService.balanceEnquiryRequestObject(accountData, NPCIResponse);
        break;
      case this.constant.upiserviceName_DELETEACCOUNTTOVPA:
        this.manageAccountService.deleteAccountToVpaRequestObject(accountData);
        break;
      case this.constant.upiserviceName_CHANGEDEFAULTACCMAPPING:
        this.manageAccountService.changeDefaultAccMappingRequestObject(accountData);
        break;
      case this.constant.upiserviceName_SETDEFAULTVPA:
        this.manageAccountService.setDefaultVpaRequestObject(accountData);
        break;
      case this.constant.upiserviceName_SYNCACCOUNT:
        this.manageAccountService.syncAccountRequestObject(accountData);
        break;
      case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
        this.manageAccountService.getPaymentAddressListDetailsRequestObject();
        break;
      case this.constant.upiserviceName_REQUESTOTP:
        this.manageAccountService.requestOTPRequestObject(accountData);
        break;
      case this.constant.upiserviceName_REGMOBILE:
        this.manageAccountService.regMobileRequestObject(accountData, this.finalCredResponse);
        break;
      case this.constant.upiserviceName_EDITACCOUNTCURRENTLIMIT:
        // let amt = this.customCurrencyPipe.transform(this.setLimitForm.get('limitAmt').value, 'decimal').replace(/[^.0-9]+/g,'');
        var amt = this.setLimitForm.get('limitAmt').value.toString()
        amt = amt.replace(/[^.0-9]+/g, '');
        if (Number(amt) > 100000) {
          this.isAmountLimitExceeded = true;
          return;
        } else {
          this.isAmountLimitExceeded = false;
        }
        this.closePopup('setLimitPopup');
        this.manageAccountService.editAccountCurrentLimitRequestObject(accountData, amt, this.selectedVpaDetails.paymentAddress);

        break;
      case this.constant.upiserviceName_GLOBALQRACTIVATION:
        if (accountData.isUpiGlobalActive == 'Y') {
          //call to deactivate
          this.manageAccountService.globalQrActivateDeactivateRequestObject(accountData, this.finalCredResponse, false);
        } else {
          //call to activate
          this.manageAccountService.globalQrActivateDeactivateRequestObject(accountData, this.finalCredResponse, true);
        }
        break;
      default:
        console.log('Default case=> apiName = ', apiName);
        break;
    }

    let requestObj = this.manageAccountService.getEncryptedOmniRequestObject();

    this.http.callBankingAPIService(requestObj, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log('success', data);

      if (data.responseParameter.opstatus == "00") {
        //success handler
        let upiResponseData = data.responseParameter.upiResponse;
        console.log('upiResponseData => ', upiResponseData);

        switch (upiResponseData.subActionId) {
          case this.constant.upiserviceName_ADDACCOUNTTOVPA:
            console.log("ADDACCOUNTTOVPA response handling...");
            if (upiResponseData.status == "00") {
              //success handler 
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_CHANGECREDENTIALS:
            console.log("CHANGECREDENTIALS response handling...");
            if (upiResponseData.status == "00") {
              //success handler 
              this.showPopup('changeUpiPinSuccessPopup');
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_BALANCEENQUIRY:
            console.log("BALANCEENQUIRY response handling...");
            if (upiResponseData.status == "00") {
              //success handler
              this.ngZone.run(() => {
                let amount = upiResponseData.responseParameter.RESULT;
                let ledgerBal = upiResponseData.responseParameter.ledgerBal;
                if (this.vpaList.length > 0) {
                  this.vpaAccountList[this.accListIdx].balanceAmount = amount;
                  this.vpaAccountList[this.accListIdx].ledgerBal = ledgerBal;
                  this.vpaAccountList[this.accListIdx].maskedBalance = this.commonMethod.maskBalance(amount);
                  this.vpaAccountList[this.accListIdx].showBalance = true;
                }
              });
            }
            break;
          case this.constant.upiserviceName_DELETEACCOUNTTOVPA:
            console.log("DELETEACCOUNTTOVPA response handling...");
            if (upiResponseData.status == "00") {
              this.dataService.vpaAddressList = [];
              //success handler
              this.dataService.deletedAccountDetails = upiResponseData.responseParameter;
              console.log('this.dataService.deletedAccountDetails');
              console.log(this.dataService.deletedAccountDetails);
              this.dataService.isSetVpaDtl = true;
              this.dataService.vpaDtls = this.selectedVpaDetails;

              this.dataService.routeWithNgZone('removeAccountSuccess');
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_CHANGEDEFAULTACCMAPPING:
            console.log("CHANGEDEFAULTACCMAPPING response handling...");
            if (upiResponseData.status == "00") {
              //success handler
              this.dataService.vpaAddressList = [];
              this.callVpaMoveFun = false;
              this.fetchVPAAdressList();
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_SETDEFAULTVPA:
            console.log("SETDEFAULTVPA response handling...");
            if (upiResponseData.status == "00") {
              //success handler
              this.dataService.vpaAddressList = [];
              this.callVpaMoveFun = true;
              this.fetchVPAAdressList();
              // this.UpiApiCall(this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS);
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_SYNCACCOUNT:
            console.log("SYNCACCOUNT response handling...");
            if (upiResponseData.status == "00") {
              //success handler
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
            console.log("GETPAYMENTADDRESSLISTDETAILS response handling...");
            if (upiResponseData.status == "00") {
              //success handler
              this.dataService.vpaAddressList = this.dataService.processVPAlist(upiResponseData.responseParameter.addresslist);
              this.vpaList = this.dataService.vpaAddressList;
              if (this.callVpaMoveFun == true) {
                this.defaultVpaMove(this.vpaList);
              }
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_REQUESTOTP:
            console.log("REQUESTOTP response handling...");
            if (upiResponseData.status == "00") {
              this.callNpciLibrary(this.accountDetails, this.constant.val_npci_flow_setUpiPin);
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_REGMOBILE:
            console.log("REGMOBILE response handling...");
            if (upiResponseData.status == "00") {
              this.dataService.vpaAddressList = [];
              this.callVpaMoveFun = true;
              this.fetchVPAAdressList();
              this.showPopup('setUpiPinSuccessPopup');
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_EDITACCOUNTCURRENTLIMIT:
            console.log("EDITACCOUNTCURRENTLIMIT response handling...");
            if (upiResponseData.status == "00") {
              this.dataService.vpaAddressList = [];
              this.callVpaMoveFun = false;
              // this.vpaList[this.vpaIndex].accounts[this.acctIdx].currentLimit = this.setLimitForm.get('limitAmt').value;
              this.fetchVPAAdressList();
            } else {
              //failure handler
            }
            break;
          default:
            console.log("default case subActionId => ", upiResponseData.subActionId);
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  toggleAmountLabel() {
    // console.log('1 => this.showAmountLabel = ', this.showAmountLabel)
    this.showAmountLabel = !this.showAmountLabel;
    // console.log('2 => this.showAmountLabel = ', this.showAmountLabel)
  }

  showPopup(popupName, data?, acctIdx?) {
    if (popupName == 'setLimitPopup') {
      this.acctIdx = acctIdx;
      this.isAmountLimitExceeded = false;
      this.setLimitForm.reset();
      this.setLimitForm.get('limitAmt').setValue(data.currentLimit);
    }
    if (popupName == 'debitcard-info') {
      this.debitCardForm.reset();
    }
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
    this.accountDetails = this.popupData;
  }

  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  checkAccountToBeRemoved(accData) {
    this.closePopup('removeAccConfirmationPopup');
    console.log('Check => accData', accData);
    if (accData.isDefaultAccount == 'Y' || this.vpaAccountList.length == 1) {
      this.showPopup('removeDefaultAccPopup');
    } else {
      this.UpiApiCall(this.constant.upiserviceName_DELETEACCOUNTTOVPA, accData);
    }
  }

  openDatePicker() {
    // this.minDate = moment().toDate();
    // this.maxDate = moment().add(20, 'years').toDate(); 
    // this.pluginService.openDatePicker('date', new Date(), this.minDate, this.maxDate).subscribe((date)=>{
    //   console.log('Success date', date);
    //   if (date) {
    //     this.debitCardForm.get('expiryDate').setValue(moment(date).format('YYYY/MM'));
    //     this.manageAccountService.debitCardExpiryDate = moment(date).format('MMYY');
    //   }
    // });
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    $('.owl-dots').css({ "top": "70px" })
  }

  callRequestOtp() {
    this.manageAccountService.debitCardNumber = this.getMPINValue();
    this.manageAccountService.debitCardExpiryDate = this.getExpDate();
    console.log('this.manageAccountService.debitCardNumber', this.manageAccountService.debitCardNumber);
    console.log('this.manageAccountService.debitCardExpiryDate', this.manageAccountService.debitCardExpiryDate);

    this.closePopup('debitcard-info');
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.pluginService.requestSMSPermission().subscribe((status) => {
        console.log('status : ', status)
      })

      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.manageAccountService.requestOtpTxnId = transactionId;
        console.log('requestOtpTxnId => ', this.manageAccountService.requestOtpTxnId);
        this.UpiApiCall(this.constant.upiserviceName_REQUESTOTP, this.popupData);
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        this.manageAccountService.requestOtpTxnId = transactionId;
        console.log('requestOtpTxnId => ', this.manageAccountService.requestOtpTxnId);
        this.UpiApiCall(this.constant.upiserviceName_REQUESTOTP, this.popupData);
      });
    }
  }

  initiateGlobalQRFlow(accountDetails: UPIBankAccount) {
    console.log('initiateGlobalQRFlow => accountDetails', accountDetails);
    this.dataService.globalUpiAccountData = accountDetails;

    if (accountDetails.isUpiGlobalActive == 'N') {
      this.dataService.routeWithNgZone("activateUpiGlobal");
    } else {
      this.dataService.routeWithNgZone("updateUpiGlobalSettings");
    }
  }

  callApiForAccount(account) {
    console.log("Inside callApiForAccount", account);
    //call GlobalQrQuery
  }

  debitBlockFlow(account) {
    console.log('DEBIT BLOCK => account', account);

    if (account.debitFreezeStatus == 'N') {
      this.showPopup('debitBlockConfirmationPopup', account);
    }

    //show popup
    //check mbeba and proceed accordingly
  }

  viewBalanceFlow(account, accountIndex) {
    console.log('accountIndex', accountIndex);
    console.log('account', account);
    if (account.showBalance) {
      account.showBalance = false;
    } else {
      if (account.mbeba == 'N') {
        this.ngZone.run(() => {
          this.dataService.information = this.translate.transform('UPI_PIN_NOT_SET');
          this.dataService.informationLabel = this.translate.transform('INFORMATION');
          this.dataService.primaryBtnText = this.translate.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        })
      } else {
        this.callNpciLibrary(account, this.constant.val_npci_flow_balanceEnquiry, accountIndex);
      }
    }
  }

  /**
  * set update currency value
  * @param value 
  */
  // formatCurrency(value) {
  //   let amt = this.customCurrencyPipe.transform(value, 'decimal').replace(/[^.0-9]+/g, '');
  //   if (Number(amt) > 100000) {
  //     this.isAmountLimitExceeded = true;
  //   } else {
  //     this.isAmountLimitExceeded = false;
  //   }
  //   this.formValidation.formatAmtCurrency(value, this.setLimitForm, 'limitAmt');
  // }

  checkLimit(value) {
    if (/^0*$/.test(value)) {
      this.setLimitForm.reset();
    } else {
      let amt = value.toString().replace(/[^.0-9]+/g, '');
      if (Number(amt) > 100000) {
        this.isAmountLimitExceeded = true;
        this.setLimitForm.get('limitAmt').markAllAsTouched();
        return;
      } else {
        this.isAmountLimitExceeded = false;
      }
    }
  }


  getSpasswordElement(index, type) {
    //console.log(this.mPinRows);
    if (type == "mpin") {
      if (index <= 5)
        return this.mPinRows._results[index].nativeElement;
    }
    else if (type == "expdate") {
      if (index <= 4)
        return this.expDateRows._results[index].nativeElement;
    }

  }

  onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, "mpin").value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, "mpin").focus();
      } else {
        // this.getSpasswordElement(index).blur();
        // // Submit code
        // console.log('submit code ');
        // ////console.log(this.getMPINValue());
        // let mpin = this.getMPINValue();
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, "mpin").focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        this.debitCardForm.get(this.formInput[index]).setValue("");
        this.getSpasswordElement(index - 1, "mpin").focus();
      }
    }
  }

  onFocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, "mpin");
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  keyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, "expdate").value.length === 1) {
      if (index !== 3) {
        this.getSpasswordElement(index + 1, "expdate").focus();
      } else {
        // this.getSpasswordElement(index).blur();
        // // Submit code
        // console.log('submit code ');
        // ////console.log(this.getMPINValue());
        // let mpin = this.getMPINValue();
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, "expdate").focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        this.debitCardForm.get(this.formInputExp[index]).setValue("");
        this.getSpasswordElement(index - 1, "expdate").focus();
      }
    }
  }


  focusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, "expdate");
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  getMPINValue() {
    var mpin = "";
    //console.log(this.MPINForm.controls);
    for (const field in this.debitCardForm.controls) { // 'field' is a string
      const control = this.debitCardForm.get(field); // 'control' is a FormControl  
      //console.log("value", control.value);
      if (!control.hasError('required') && this.formInputExp.indexOf(field) == -1) {
        mpin += control.value;
        //console.log(mpin);
      }
    }
    return mpin;
  }

  getExpDate() {
    var expDate = "";
    //console.log(this.MPINForm.controls);
    for (const field in this.debitCardForm.controls) { // 'field' is a string
      const control = this.debitCardForm.get(field); // 'control' is a FormControl  
      //console.log("value", control.value);
      if (!control.hasError('required') && this.formInput.indexOf(field) == -1) {
        expDate += control.value;
        //console.log(mpin);
      }
    }
    return expDate;
  }


  //   formInput = ['spassword1', 'spassword2', 'spassword3', 'spassword4', 'spassword5', 'spassword6'];
  // formInputExp = ['expdate1', 'expdate2', 'expdate3', 'expdate4']


}
