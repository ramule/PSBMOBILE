import { Location } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { BenificiaryService } from '../../../benificiary/benificiary.service';
import { RequestMandateService } from './request-mandate-service'
declare var mandate: any;

@Component({
  selector: 'app-request-mandate',
  templateUrl: './request-mandate.component.html',
  styleUrls: ['./request-mandate.component.scss']
})
export class RequestMandateComponent implements OnInit, OnDestroy {
  showFavPayeeLength = 10;
  showRecentPayeeLength = 10;
  requestMandateForm: FormGroup;
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'REQUEST_MANDATE',
    'footertype': 'none'
  }
  createMandateForm: FormGroup;
  showUserInfo = false;
  showMoreFav = false;
  showMoreRecentRequest = false;

  defaultVPAAccountDetails: any;
  recentPayeeReqList = [];
  favPayeeList = [];
  constructor(private router: Router, public DataService: DataService, private location: Location, private http: HttpRestApiService, private constant: AppConstants, private localStorage: LocalStorageService, private pluginService: PluginService, private commonMethod: CommonMethods, private requestMandateService: RequestMandateService, private beneficiaryService: BenificiaryService, private ngZone: NgZone, private translatePipe: TranslatePipe) { }

  ngOnInit(): void {
    this.DataService.fetchContactsFromDevice = false;
    history.pushState({}, 'upiMandate', this.location.prepareExternalUrl("upiMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    this.DataService.changeMessage(this.headerdata);
    this.DataService.upiSearchPayeeList = [];
    this.buildForm();
    this.validateAddressByVPAorMobNo();
    this.getBenificiaryList();
    this.DataService.contactPrevURL = this.router.url;
  }

  /**
  * Form Creation
  */
  buildForm() {
    this.requestMandateForm = new FormGroup({
      upiIdOrMobno: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)])
    });
  };

  goToPage(routeName) {
    if (routeName == 'searchContactList') {
      this.DataService.contactPrevURL = this.router.url;
      this.DataService.fetchContactsFromDevice = true;
    } else {
      this.DataService.fetchContactsFromDevice = false;
    }
    this.router.navigateByUrl('/' + routeName);
  }

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
  getFavPayeeList() {
    var req = this.requestMandateService.setFavoritePayeeRequest();
    this.UpiApiCall(req);
  }

  /**
   * To check if User UPI Id or Mobile number is valid 
   */
  verify() {
    // this.formValidation.markFormGroupTouched(this.collectRecentReqForm);
    this.requestMandateForm.markAllAsTouched();
    if (this.requestMandateForm.valid) {
      let upiIdOrMobno = this.requestMandateForm.get('upiIdOrMobno').value;
      if (/^\d{10}$/.test(upiIdOrMobno)) {
        var reqParams = this.requestMandateService.setDefaultVPARequest(upiIdOrMobno);
        this.UpiApiCall(reqParams);
      } else {
        this.pluginService.getTransactionId().subscribe((transactionID) => {
          // this.requestMandateService.getUserLocation();
          var req = this.requestMandateService.setValidateRequest(this.requestMandateForm.value, this.defaultVPAAccountDetails, transactionID);
          this.UpiApiCall(req);
        });
      }
    }
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
            break;
          case this.constant.upiserviceName_GETDEFAULTVPA:
            let vpaAddress = response.responseParameter.defaultVpaDetail.paymentAddress;
            this.pluginService.getTransactionId().subscribe((transactionID) => {
              // this.requestMandateService.getUserLocation();
              var req = this.requestMandateService.setValidateRequest({ upiIdOrMobno: vpaAddress }, this.defaultVPAAccountDetails, transactionID);
              this.UpiApiCall(req);
            });
          default:
            break;
        }
      } else {
        // switch (response.subActionId) {
        //   case this.constant.upiserviceName_GETDEFAULTVPA:
        //     showToastMessage(response.msg, "error");
        //     break;

        //   default:
        //     break;
        // }

        this.ngZone.run(() => {
          this.DataService.errorMsg = response.msg;
          this.DataService.informationLabel = this.translatePipe.transform('ERROR');
          this.DataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-error')
        })
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  // ngAfterViewInit() {
  //   this.validateAddressByVPAorMobNo();
  // }

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

  /**
   * Api call to Validate Upi Id using mobile number
   */
  validateAddressByVPAorMobNo() {
    if (this.DataService.deviceMobileNo) {
      var reqParams = this.requestMandateService.setDefaultVPARequest(this.DataService.deviceMobileNo);
      this.UpiApiCall(reqParams);
    }
    if (this.DataService.upiValidatedVpaAdress) {
      this.pluginService.getTransactionId().subscribe((transactionID) => {
        // this.requestMandateService.getUserLocation();
        var req = this.requestMandateService.setValidateRequest({ upiIdOrMobno: this.DataService.upiValidatedVpaAdress }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      });
    }
  }

  /**
 * Navigate to the collect amount screen
 */
  proceed() {
    this.DataService.resetRequestMandateData();
    this.router.navigateByUrl('/requestMandatePayment');
  }

  ngOnDestroy() {
    this.DataService.deviceMobileNo = "";
    this.DataService.upiValidatedVpaAdress = "";
  }

  /**
  * On cancel form will be reset
  */
  cancel() {
    this.showUserInfo = false;
    this.requestMandateForm.reset();
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
  * This function is check if the user is valid vpa
  * @param payee 
  */
  validatePayee(type, payee) {
    var req;
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.requestMandateService.getUserLocation();
      if (type == 'recent') {
        req = this.requestMandateService.setValidateRequest({ upiIdOrMobno: payee.beneVpa }, this.defaultVPAAccountDetails, transactionID);
      } else {
        req = this.requestMandateService.setValidateRequest({ upiIdOrMobno: payee.beneVpa }, this.defaultVPAAccountDetails, transactionID);
      }
      this.UpiApiCall(req);
    });
  }

  showMore(type) {
    if (type == 'recent') {
      this.showRecentPayeeLength = this.recentPayeeReqList.length;
    } else {
      this.showFavPayeeLength = this.favPayeeList.length;
    }
  }

}
