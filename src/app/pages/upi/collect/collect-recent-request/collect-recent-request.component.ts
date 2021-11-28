import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app.constant';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CanComponentDeactivate } from 'src/app/services/navigation-guard.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { BenificiaryService } from '../../benificiary/benificiary.service';
import { CollectRecentReqService } from './collect-recent-request.service';

declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var cordova: any;

@Component({
  selector: 'app-collect-recent-request',
  templateUrl: './collect-recent-request.component.html',
  styleUrls: ['./collect-recent-request.component.scss']
})
export class CollectRecentRequestComponent implements OnInit, OnDestroy {
  showFavPayeeLength = 10;
  showRecentPayeeLength = 10;
  mobileContacts = [];

  headerdata = {
    'headerType': 'backUpiIdHeader',
    'titleName': 'COLLECT',
    'footertype': 'none'
  }
  recentPayeeReqList = [];
  favPayeeList = [];
  showUserInfo = false;
  collectRecentReqForm: FormGroup;
  firstLastChar = "";
  showMoreFav = false;
  showMoreRecentRequest = false;
  errorMsg = "";
  defaultVPAAccountDetails: any;
  constructor(private loader: pageLoaderService, private router: Router, public DataService: DataService, private location: Location, private http: HttpRestApiService, private collectRecentReqService: CollectRecentReqService, private constant: AppConstants, private localStorage: LocalStorageService, private formValidation: FormValidationService, private pluginService: PluginService, private commonMethod: CommonMethods, private beneficiaryService: BenificiaryService, private translate: TranslatePipe, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.initialize();
  }

  
  /**
   * Initialization function
   */
  initialize() {
    this.DataService.fetchContacts = false;
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    this.DataService.upiSearchCollectPayeeList = [];
    this.buildForm();
    this.validateAddressByVPAorMobNo();
    this.getBenificiaryList();
    createGlobalNavMore();
    this.DataService.contactPrevURL = this.router.url;
  }

  /**
   * Form Creation
   */
  buildForm() {
    this.collectRecentReqForm = new FormGroup({
      upiIdOrMobno: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)])
    });
  };

  /**
   * Get Recent & Favorite Collect Request List
   */
  getBenificiaryList() {
    this.beneficiaryService.getBenificiaryList().then((response: any) => {
      this.recentPayeeReqList = []
      response.recentBeneList.map((benificiary, index) => {
        if (benificiary.txnMode == "VPA") {
          this.recentPayeeReqList.push(benificiary);
        }
      });
      this.favPayeeList = this.DataService.favPayeeList;
      if (this.recentPayeeReqList.length > 10) {
        this.showMoreRecentRequest = true;
      }
      if (this.favPayeeList.length > 10) {
        this.showMoreFav = true;
      }
    });
  }

  /**
   * Get Favorite Payee List
   */
  // getFavPayee() {
  //   var req = this.collectRecentReqService.setFavoritePayeeRequest();
  //   this.UpiApiCall(req);
  // }

  /**
   * To check if User UPI Id or Mobile number is valid 
   */
  verify() {
    this.formValidation.markFormGroupTouched(this.collectRecentReqForm);
    if (this.collectRecentReqForm.valid) {
      let upiIdOrMobno = this.collectRecentReqForm.get('upiIdOrMobno').value;
      if (/^\d{10}$/.test(upiIdOrMobno)) {
        var reqParams = this.collectRecentReqService.setDefaultVPARequest(upiIdOrMobno);
        this.UpiApiCall(reqParams);
      } else {
        this.pluginService.getTransactionId().subscribe((transactionID) => {
          // this.collectRecentReqService.getUserLocation();
          var req = this.collectRecentReqService.setValidateRequest(this.collectRecentReqForm.value, this.defaultVPAAccountDetails, transactionID);
          this.UpiApiCall(req);
        });
      }
    }
  }

  /**
   * Page navigation
   * @param routeName 
   */
  goToPage(routeName) {
    if (routeName == 'searchContactList') {
      this.DataService.contactPrevURL = this.router.url;
      this.DataService.fetchContacts = true;
    } else {
      this.DataService.fetchContacts = false;
    }
    // this.loader.showLoader();
    this.router.navigateByUrl(routeName);
  }

  searchContact(type) {
    if (type == 'recent') {
      this.DataService.upiSearchCollectPayeeList = this.recentPayeeReqList;
    } else {
      this.DataService.upiSearchCollectPayeeList = this.favPayeeList;
    }
    this.DataService.upiCollectsearchType = type;
    this.router.navigateByUrl('/collectSearchContact')
  }

  /**
   * On cancel form will be reset
   */
  cancel() {
    this.showUserInfo = false;
    this.collectRecentReqForm.reset();
  }

  /**
   * Navigate to the collect amount screen
   */
  proceed() {
    this.DataService.resetUpiCollectData();
    this.router.navigateByUrl('/collectAmount');
  }

  /**
   * Common Api Call for collect 
   * @param request 
   */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            this.showUserInfo = true;
            this.ngZone.run(() => {
              this.DataService.validateAddressResp = response.responseParameter;
            });
            if (this.DataService.fromRecentTransaction) {
              this.proceed();
            }
            break;
          // case this.constant.upiserviceName_GETBENIFICIARYLIST:
          //   let benficiaryList = response.responseParameter.beneficiaryList;
          //   this.recentPayeeReqList = []
          //   benficiaryList.map((benificiary, index) => {
          //     if (benificiary.txnMode == "VPA") {
          //       this.recentPayeeReqList.push(benificiary);
          //     }
          //     if (benificiary.favourites == 'Y' && benificiary.txnMode == "VPA") {
          //       this.favPayeeList.push(benificiary);
          //     }
          //   });
          //   this.DataService.favPayeeList = this.favPayeeList;
          //   if (this.recentPayeeReqList.length > 10) {
          //     this.showMoreRecentRequest = true;
          //   }
          //   if (this.favPayeeList.length > 10) {
          //     this.showMoreFav = true;
          //   }
          //   break;
          case this.constant.upiserviceName_GETDEFAULTVPA:
            let vpaAddress = response.responseParameter.defaultVpaDetail.paymentAddress;
            this.pluginService.getTransactionId().subscribe((transactionID) => {
              // this.collectRecentReqService.getUserLocation();
              var req = this.collectRecentReqService.setValidateRequest({ upiIdOrMobno: vpaAddress }, this.defaultVPAAccountDetails, transactionID);
              this.UpiApiCall(req);
            });
            break;
          default:
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  /**
   * This function is check if the user is valid vpa
   * @param payee 
   */
  validatePayee(type, payee) {
    var req;
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.collectRecentReqService.getUserLocation();
      // if (type == 'recent') {
      req = this.collectRecentReqService.setValidateRequest({ upiIdOrMobno: payee.beneVpa }, this.defaultVPAAccountDetails, transactionID);
      // } else {
      //   req = this.collectRecentReqService.setValidateRequest({ upiIdOrMobno: payee.paymentAddress }, this.defaultVPAAccountDetails, transactionID);
      // }
      this.UpiApiCall(req);
    });
  }

  /**
   * Api call to Validate Upi Id using mobile number
   */
  validateAddressByVPAorMobNo() {
    if (this.DataService.upiCollectRequest.mobileNo) {
      var reqParams = this.collectRecentReqService.setDefaultVPARequest(this.DataService.upiCollectRequest.mobileNo);
      this.UpiApiCall(reqParams);
    }
    if (this.DataService.upiCollectRequest.validatedVpaAdress) {
      this.pluginService.getTransactionId().subscribe((transactionID) => {
        // this.collectRecentReqService.getUserLocation();
        var req = this.collectRecentReqService.setValidateRequest({ upiIdOrMobno: this.DataService.upiCollectRequest.validatedVpaAdress }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      });
    }

  }

  /**
   * Get Default Vpa Adress/Account Details
   */
  getDefaultVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.vpaAddressList.find((vpaAddress) => { return vpaAddress.default == "Y" });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    }
  }

  /**
   * Get Default Vpa AccountNo Details
   * @param array 
   */
  getDefaultAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isDefaultAccount == "Y" });
    }
  }

  showMore(type) {
    if (type == 'recent') {
      this.showRecentPayeeLength = this.recentPayeeReqList.length;
    } else {
      this.showFavPayeeLength = this.favPayeeList.length;
    }
  }

  ngOnDestroy() {
    this.DataService.upiCollectRequest.mobileNo = "";
    this.DataService.upiCollectRequest.validatedVpaAdress = "";
    this.DataService.fromRecentTransaction = false;
  }

  scanQRCode() {
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      cordova.plugins.diagnostic.requestCameraAuthorization((status) => {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            cordova.plugins.QRCodeScannerPlugin.scan({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }, (QRDetals) => {
              console.log('QRDetals Success => ', QRDetals);
            }, (e) => {
              console.log("QRDetals Error => ", e)
            });
          break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            this.openPopup('enable-camera-permissions');
            return;
          default:
          break;
        }
      }, function (error) {
        console.error(error);
      });
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      window['plugins'].qrscan.startCamera((data) => {
        console.log('qrscan success', data);
        console.log("Other data => ", JSON.stringify({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }));
        if (data == "DENIED" || data == "Not Authorized") {
          //show popup to user to go to settings
          this.DataService.cameraPermissionGrantedIos = false;
          this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
        }
      }, (error) => {
        console.log('qrscan error ', error);
      })
    } else {
      console.log("Unknown Platform...");
    }
  }

  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }

  openPopup(popup) {
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }

  grant() {
    cordova.plugins.diagnostic.switchToSettings(function () {
      console.log("Successfully switched to Settings app");
    }, function (error) {
      console.error("The following error occurred: " + error);
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.DataService.disableBack) {
      return false;
    }
    else return true;
  }
}
