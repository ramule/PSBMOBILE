import { Component, OnInit, ViewChildren, NgZone} from '@angular/core';
import { timer, Subscription } from 'rxjs';

import { DataService } from '../../../../services/data.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LinkAccountService } from './link-account.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { AppConstants } from '../../../../app.constant';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationStart,
} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { OtpSessionService } from '../../otp-session/otp-session.service';
import { Location } from '@angular/common';
import { DetailStatementService } from '../../my-accounts/detailed-statement/detailed-statement.service';
import { AccountType } from '../../../../utilities/app-enum';
import { DashboardService } from '../../dashboard/dashboard.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { AccountOpeningSuccessService } from '../../pre-login/account-opening/account-opening-success/account-opening-success.service';

// declare var linkAccountModals: any;
// declare var linkAccountConfirmation: any;
declare var showToastMessage: any;
// declare var $: any;

@Component({
  selector: 'app-link-account',
  templateUrl: './link-account.component.html',
  styleUrls: ['./link-account.component.scss'],
})
export class LinkAccountComponent implements OnInit {
  linkAccountForm: FormGroup;
  otpSessionForm: FormGroup;
  accountList: any;
  confirm: boolean = false;
  formData: any;
  linkDelinkList: any = [];
  linkDelinkItem;
  existingOTP: any = '';
  linkingOTP: any = '';
  storageMobileNo: any = '';
  dataAvailable : boolean = false;
  countDown: Subscription;
  counter = 120;
  tick = 1000;
  dashboard:any;
  currentRoute:any;
  validationIssue: any = true;
  tempDecryptedReq: any;
  screentype="myAccount";
  myAccount:any;
  invaildotp = ""

  commonPageComponent = {

    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'innerFooter',
    'currentpageRoute':  this.router.url
  };


  @ViewChildren('mOtpRow') mobileOtp: any;
  @ViewChildren('mNewOtpRow') mobileNewOtp: any;
  constructor(
    private router: Router,
    public DataService: DataService,
    public linkAccService: LinkAccountService,
    private form: FormBuilder,
    public constant: AppConstants,
    public dataService: DataService,
    public storage: LocalStorageService,
    private http: HttpRestApiService,
    private domSanitizer: DomSanitizer,
    private commonMethod: CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
    private otpSessionService: OtpSessionService,
    private location: Location,
    private detailStatementService: DetailStatementService,
    private dashboardService: DashboardService,
    private ngZone: NgZone,
    private idle: Idle,
    private accOpeningSuccessService: AccountOpeningSuccessService
  ) {

  }

  buildForm() {
    console.log(
      'Saving/Operative account List: ',
      this.DataService.customerOperativeAccList
    );

    this.accountList = this.DataService.customerOperativeAccList;
    // this.accountList = [
    //   { name: 'Punjab & Sind Bank', account:'Savings 6578 7684 5467', value: '100CP', checked: false },
    //   { name: 'Punjab & Sind Bank', account:'Savings 6578 7684 2345', value: '101TR', checked: false },
    //   { name: 'Punjab & Sind Bank', account:'Savings 6578 7684 1234', value: '102MO', checked: false }
    // ];
    // Setting default selection in FormControl
    let getCheckedRadio = null;
    this.accountList.forEach((o) => {
      if (o.checked) getCheckedRadio = o.value;
    });
    this.linkAccountForm = new FormGroup({
      radioboxdemo: new FormControl('', { validators: Validators.required }),
      radioboxdemo1: new FormControl('', { validators: Validators.required }),
    });

    this.otpSessionForm = new FormGroup({
      otppassword1: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      otppassword2: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      otppassword3: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      otppassword4: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      otppassword5: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      otppassword6: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      newotppassword1: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      newotppassword2: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      newotppassword3: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      newotppassword4: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      newotppassword5: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      newotppassword6: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
    });
  }

  /**
   * Initialization functionality
   */
  initialization() {
    this.DataService.setPageSettings('LINK_ACCOUNT');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    //this.dataService.changeMessage(this.commonPageComponent);
   this.dataService.getBreadcrumb('LINK_ACCOUNT' , this.router.url)
    this.buildForm();
    var param = this.linkAccService.linkDelinkFetchAccountsList();

    this.fetchLinkDelinkAccountList(param);
    // var backUrl =
    //   this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile';
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, this.DataService.previousPageUrl == 'myAccount' ? 'myAccount' : backUrl , this.location.prepareExternalUrl(this.DataService.previousPageUrl == 'myAccount' ? 'myAccount' : backUrl));
    history.pushState(
      {},
      'self',
      this.location.prepareExternalUrl(this.router.url)
    );
    this.storageMobileNo = this.storage.getLocalStorage(this.constant.storage_mobileNo);
    this.getPrimaryAccount();
  }

  getPrimaryAccount(){
    console.log(this.DataService.primaryAccountDtl);
  }


  breadcrumroute(routeName){
    this.dataService.updateBreadcrumb(this.router.url , routeName)
    this.router.navigateByUrl('/' + routeName);
  }
  fetchLinkDelinkAccountList(param) {
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.key_deviceId),
        this.constant.serviceName_LINKDELINKFETCHACCOUNT
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.linkDelinkList = [];
          var dataSet = data.set?.records;
          dataSet.forEach((element) => {
            var isValidCustomer = this.isValidAccStatusFrmScheme(element.SchemeCode);
            if(isValidCustomer){
              if ( element.MobileNo != '' && element.LinkDelingFLG != 'L' && element.LinkDelingFLG != 'P' ) {
                this.linkDelinkList.push(element);
              }
            }
          });

          // if (this.linkDelinkList.length == 0) {
          //   this.commonMethod.openPopup('div.popup-bottom.show-no-record');
          // }

          console.log(
            JSON.stringify('this.linkDelinkList' + this.linkDelinkList)
          );
          if(!this.linkDelinkList.length){
            this.dataAvailable = true
          }
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }


  isValidAccStatusFrmScheme(schemeCode){
    var validAccStatus = false;
    validAccStatus = (schemeCode != "CAPPI" && schemeCode != "CCAGR" && schemeCode != "SBSRL" && schemeCode != "SBDCT" && schemeCode != "SBBAS" && schemeCode != "SBFIN" && schemeCode != "SBFIB" && schemeCode != "SBKID")
    return validAccStatus;
  }

  ngOnInit(): void {
    this.initialization();

    console.log("currentPageUrl",this.DataService.currentPageUrl);


  }

  validateForm() {
    if (this.linkAccountForm.invalid) {
      this.linkAccountForm.get('radioboxdemo').markAsTouched();
      this.linkAccountForm.get('radioboxdemo1').markAsTouched();
      return;
    }
  }

  closePopup(popup){
    if(popup == 'div.popup-bottom.link-primary-account'){
      this.linkAccData();
    }
    this.commonMethod.closePopup(popup);
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

  cancel() {
    this.commonMethod.closeAllPopup();
    // this.location.back();
    //this.router.navigate(['/linkAccount']);
  }
  // gotoDashboard(dashboard,myaccount) {
  //   if(dashboard=='dashboard'){
  //     this.router.navigate(['/dashboard']);
  //   }
  //  else if(myaccount=='myaccount'){
  //   this.router.navigate(['/myAccount']);
  //  }
  //   // this.location.back();

  // }

  gotoDashboard(){
    if(this.constant.getIsCordova() == 'cordova')
    {
       this.location.back();
    }
    else{
       if( this.DataService.previousPageUrl=='dashboard' ){

        this.router.navigate(['/dashboard']);
       }
       else if( this.DataService.previousPageUrl=='myAccount')
        {
          this.router.navigate(['/myAccount']);
        }
    }

  }


  // && this.currentRoute == "sidenav"

  goToPage(routeName) {
    if(this.DataService.primaryAccountDtl.SchemeCode == AccountType.LOAN_ACCOUNT && this.linkDelinkItem?.AccountType != AccountType.LOAN_ACCOUNT){
      this.linkPrimaryAccount();
    }else{
      var param = this.linkAccService.linkDelinkFetchAccountsList();
      this.fetchLinkDelinkAccountList(param);
      this.router.navigateByUrl('/' + routeName);
    }
    this.commonMethod.closeAllPopup();
  }

  linkPrimaryAccount(){
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
        this.logoutapp();
      });
  }

  radioBoxClicked(item) {
    console.log('linkdelimitm' + JSON.stringify(item));
    this.linkDelinkItem = item;
  }

  resendClicked() {}

  submit(data) {
    console.log(data);
    this.validateForm();
    if (this.linkAccountForm.valid) {


      if(this.DataService.primaryAccountDtl.SchemeCode == AccountType.LOAN_ACCOUNT && this.linkDelinkItem?.AccountType != AccountType.LOAN_ACCOUNT ){
        this.commonMethod.openPopup('div.popup-bottom.link-primary-account');
      }
      else{
        this.linkAccData();
      }

      //this.linkAccData();
      // linkAccountConfirmation();
      this.formData = data;
    }
  }

  linkAccData(){
    if(this.linkDelinkItem?.MobileNo != this.storageMobileNo){
      this.commonMethod.openPopup('div.confirmationbox-setting');
    }else{
      this.proceed();
    }
  }

  proceed() {
    if (this.linkDelinkItem?.MobileNo == this.storageMobileNo) {
      this.resendOTPSession();
    } else {
      this.resendOTP();
    }

    this.commonMethod.openPopup('div.opt-verification');
    // linkAccountModals();
  }

  resendOTPSession(numCount?: any) {
    this.otpSessionForm.reset();
    var resendOTPReq = this.otpSessionService.getResendOTPSessionReq(this.constant.val_LINK);
    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_RESENDOTPSESSION
      )
      .subscribe((data) => {
        if (data.responseParameter.opstatus == '00') {
          //showToastMessage(data.responseParameter.Result, 'success');
          this.countDown = timer(0, this.tick).subscribe(() => {
            if (this.counter != 0) {
              --this.counter;
            }
          });
        }
      });
  }

  resendOTP() {
    this.otpSessionForm.reset();
    var resendOTPReq = this.linkAccService.getResendLeadOtpParam(
      this.linkDelinkItem.MobileNo
    );
    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_RESENDCHANNELOTPSESSION
      )
      .subscribe((data) => {
        if (data.responseParameter.opstatus == '00') {
          this.countDown = timer(0, this.tick).subscribe(() => {
            if (this.counter != 0) {
              --this.counter;
            }
          });
          // showToastMessage(data.responseParameter.Result, 'success');
        }
      });
  }

  validateOTP() {
    this.existingOTP =
      this.otpSessionForm.value.otppassword1 +
      this.otpSessionForm.value.otppassword2 +
      this.otpSessionForm.value.otppassword3 +
      this.otpSessionForm.value.otppassword4 +
      this.otpSessionForm.value.otppassword5 +
      this.otpSessionForm.value.otppassword6;
    this.linkingOTP =
      this.otpSessionForm.value.newotppassword1 +
      this.otpSessionForm.value.newotppassword2 +
      this.otpSessionForm.value.newotppassword3 +
      this.otpSessionForm.value.newotppassword4 +
      this.otpSessionForm.value.newotppassword5 +
      this.otpSessionForm.value.newotppassword6;

    var resendOTPReq = this.linkAccService.getValidateLeadOtpParam(
      this.existingOTP,
      this.linkingOTP
    );
    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_VALIDATECHANNELOTPSESSION
      )
      .subscribe((data) => {
        if (data.responseParameter.opstatus == '00') {
          this.submitReq();
        } else if (data.responseParameter.opstatus == "01"){
          var invalidAttempt: number = +data.invalidAttempts;
          this.invaildotp = (invalidAttempt-1).toString() + " of 4 unsuccessful attempts, Please try again";
          this.otpSessionForm.reset();
        }
        else{
          this.invaildotp = "";
          this.commonMethod.closeAllPopup();
        }
      });
  }

  singleOTPValidate() {

    this.dataService.request = '';
    let param = this.linkAccService.linkAccountParam(this.linkDelinkItem);
    this.dataService.endPoint = this.constant.serviceName_LINKDELINKACCOUNTS;
    this.dataService.request = param;

    console.log("this.dataService.request" + this.dataService.request);

    this.tempDecryptedReq = JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), this.dataService.request));
    console.log(this.tempDecryptedReq);
    this.tempDecryptedReq.methodName = this.dataService.endPoint.split('/')[1];
    this.tempDecryptedReq.value = this.otpSessionForm.value.otppassword1 + this.otpSessionForm.value.otppassword2 +  this.otpSessionForm.value.otppassword3 + this.otpSessionForm.value.otppassword4 + this.otpSessionForm.value.otppassword5 + this.otpSessionForm.value.otppassword6;
    this.tempDecryptedReq.customerID = this.dataService.userDetails.customerId;

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.dataService.request = encryptData;
    console.log(this.dataService.request);
    this.submitSingleOTPReq();

  }

  submitSingleOTPReq()
  {
    this.http
    .callBankingAPIService(
      this.dataService.request,
      this.storage.getLocalStorage(this.constant.storage_deviceId),
      this.dataService.endPoint
    )
    .subscribe((resp) => {
      this.otpSessionForm.reset();
      if (resp.responseParameter.opstatus == '00') {
        console.log(resp);
        this.commonMethod.closeAllPopup();
        this.getAccountList();
        this.dataService.feedbackType = 'linkAccount';
        this.commonMethod.openPopup('div.success-acct-link');
        this.invaildotp = ""
      }else if (resp.responseParameter.opstatus == "01"){
        var invalidAttempt: number = +resp.invalidAttempts;
        this.invaildotp = (invalidAttempt-1).toString() + " of 4 unsuccessful attempts, Please try again";
        this.otpSessionForm.reset();
      }
      else{
        this.invaildotp = "";
        this.commonMethod.closeAllPopup();
      }

    })
  }

  submitOTP() {

    if (this.linkDelinkItem?.MobileNo == this.storageMobileNo) {
      this.singleOTPValidate();
    } else {
      this.validateOTP();
    }
  }

  submitReq() {
    this.dataService.request = '';

    let param = this.linkAccService.linkAccountParam(this.linkDelinkItem);
    this.dataService.endPoint = this.constant.serviceName_LINKDELINKACCOUNTS;
    var objCheckFlag = this.dataService.activitySettingData.findIndex(
      (x) => x.ACTIVITYNAME == this.dataService.endPoint.split('/')[1]
    );

    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.dataService.endPoint
      )
      .subscribe((resp) => {
        this.otpSessionForm.reset();
        if (resp.responseParameter.opstatus == '00') {
          this.commonMethod.closeAllPopup();
          this.getAccountList();
          this.dataService.feedbackType = 'linkAccount';
          this.commonMethod.openPopup('div.success-acct-link');
          this.invaildotp = ""
        }
      });
  }



  getAccountList(type?:any){
    var param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty("set")) {
          this.DataService.customerCanTransferAccountList =[];
          this.DataService.customerMyDepostie =[];
          this.DataService.customerLoanAccountList =[];


          /* clearing all the arrays and resetting balances */

          this.DataService.customerMyDepostie = [];
          this.DataService.customerOperativeAccList = [];
          this.DataService.customerBorrowingsList = [];

          this.DataService.totalMyDepositBalance = 0;
          this.DataService.totalMyOperativeBalance = 0;
          this.DataService.totalMyBorrowingsBalance = 0;

          console.log("data.set.records" + JSON.stringify(data.set.records));
          data.set.records.forEach(el => {
            if(el.accountType != 'CAPPI'){
              if(el.accountFlag == "P") this.DataService.primaryAccountDtl = el;
              if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
                this.DataService.customerMyDepostie.push(el);
                this.DataService.totalMyDepositBalance = this.DataService.totalMyDepositBalance + parseFloat(el.acctBalance);
              }
              else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
                // el.AGSStatus = el["AGS Status"];
                this.DataService.customerOperativeAccList.push(el);
                this.DataService.totalMyOperativeBalance = this.DataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
                console.log("customerOperativeAccList =====>",this.DataService.customerOperativeAccList);
              }
              else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
                this.DataService.customerBorrowingsList.push(el);
                this.DataService.totalMyBorrowingsBalance = this.DataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
              }
            }
          });
        }
      }
      else {

      }
    });

  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == '02') {
      showToastMessage(resp.Result, 'error');
    }
  }

  onKeyupEvent(index, event, type) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, type).focus();
      } else {
        this.getSpasswordElement(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != 'Unidentified') {
        this.getSpasswordElement(index - 1, type).focus();
      }
    }
  }

  onfocusEvent(index, type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index, type) {
    console.log(index);
    //console.log(this.mPinRows);
    if (type == 'mobileOtp') {
      if (index <= 5) return this.mobileOtp._results[index].nativeElement;
    } else if (type == 'mobileNewOtp') {
      if (index <= 5) return this.mobileNewOtp._results[index].nativeElement;
    }
  }

  // openPopUp(){
  //   this.commonMethod.openPopup('div.terms-condition')
  // }

  openPopUp(){
  
    this.commonMethod.openPopup("div.tpin-popup")
  }
  closepopup(){
    this.commonMethod.closePopup("div.tpin-popup")
  }
}
