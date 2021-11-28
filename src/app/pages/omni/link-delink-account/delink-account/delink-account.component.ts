import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DelinkAccountService } from './delink-account.service';
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
import { LinkAccountService } from '../link-account/link-account.service';
import { Location } from '@angular/common';
import { Subscription , timer} from 'rxjs';
import { OtpSessionService} from '../../otp-session/otp-session.service';
import { DetailStatementService } from '../../my-accounts/detailed-statement/detailed-statement.service';
import { AccountType } from '../../../../utilities/app-enum';

declare var delinkAccountModals: any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-delink-account',
  templateUrl: './delink-account.component.html',
  styleUrls: ['./delink-account.component.scss'],
})
export class DelinkAccountComponent implements OnInit {
  delinkAccountForm: FormGroup;
  otpSessionForm:FormGroup;
  accountList: any;
  confirm: boolean = false;
  formData: any;
  linkDelinkList: any = [];
  linkDelinkItem;
  commonPageComponent = {

    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'innerFooter',
    'currentpageRoute':  this.router.url
  };

  dataAvailable :boolean = false;
  countDown: Subscription;
  counter = 120;
  tick = 1000;

  @ViewChildren('mOtpRow') mobileOtp: any;
  constructor(
    private router: Router,
    public DataService: DataService,
    public delinkAccService: DelinkAccountService,
    private form: FormBuilder,
    private constant: AppConstants,
    private dataService: DataService,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private domSanitizer: DomSanitizer,
    private commonMethod: CommonMethods,
    private linkAccService: LinkAccountService,
    private location: Location,
    private otpSessionService:OtpSessionService,
    private detailStatementService: DetailStatementService
  ) {}

  buildForm() {
    console.log(
      'Saving/Operative account List: ',
      this.DataService.customerOperativeAccList
    );
    this.accountList = this.DataService.customerOperativeAccList;
    this.delinkAccountForm = new FormGroup({
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
      ])
    });


  }

  /**
   * Initialization functionality
   */
  initialization() {
    this.buildForm();
    var param = this.linkAccService.linkDelinkFetchAccountsList();
    this.fetchLinkDelinkAccountList(param);
   // this.resendOTP(1);
    console.log();
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, this.DataService.previousPageUrl == 'myAccountsInfo' ? 'myAccountsInfo' : backUrl, this.location.prepareExternalUrl(this.DataService.previousPageUrl == 'myAccountsInfo' ? 'myAccountsInfo' : backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.setPageSettings('DELINK_ACCOUNT');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    //this.DataService.changeMessage(this.commonPageComponent);
    this.DataService.getBreadcrumb('DELINK_ACCOUNT' , this.router.url)
  }

  ngOnInit(): void {
    history.pushState({},'dashboard',this.location.prepareExternalUrl('dashboard'));
    history.pushState({},'self',this.location.prepareExternalUrl(this.router.url));

    this.initialization();
  }

  validateForm() {
    if (this.delinkAccountForm.invalid) {
      this.delinkAccountForm.get('radioboxdemo').markAsTouched();
      this.delinkAccountForm.get('radioboxdemo1').markAsTouched();
      return;
    }
  }

  cancel() {
    this.commonMethod.closeAllPopup();
  }

  gotoDashboard() {
    if(this.constant.getPlatform() == "web"){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.location.back();
    }
  }

  onSearchChange(value, inputPlace) {
    if (inputPlace == 1) {
      if (value.length == 1) document.getElementById('spassword2').focus();
    } else if (inputPlace == 2) {
      if (value.length == 1) document.getElementById('spassword3').focus();
      else if (value.length == 0) document.getElementById('spassword1').focus();
    } else if (inputPlace == 3) {
      if (value.length == 1) document.getElementById('spassword4').focus();
      else if (value.length == 0) document.getElementById('spassword2').focus();
    } else if (inputPlace == 4) {
      if (value.length == 1) document.getElementById('spassword5').focus();
      else if (value.length == 0) document.getElementById('spassword3').focus();
    } else if (inputPlace == 5) {
      if (value.length == 1) document.getElementById('spassword6').focus();
      else if (value.length == 0) document.getElementById('spassword4').focus();
    } else if (inputPlace == 6) {
      if (value.length == 0) document.getElementById('spassword5').focus();
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  submit(data) {
    console.log(data);
    this.validateForm();
    if (this.delinkAccountForm.valid) {
      this.DataService.resetTransactionObj();
      this.formData = data;
      console.log("LINK DETails", this.linkDelinkItem)
      this.dataService.request = '';
      let param = this.delinkAccService.delinkAccountParam(this.linkDelinkItem);
      this.dataService.endPoint = this.constant.serviceName_LINKDELINKACCOUNTS;
      this.dataService.request = param;
      this.dataService.linkingMobileNumber = this.linkDelinkItem.MobileNo;
      this.dataService.authorizeHeader = 'DeLink Account';
      this.dataService.feedbackType = "delinkAccount"
      this.dataService.screenType = 'delinkAccount';
      this.DataService.otpSessionPreviousPage = "/delinkAccount";
        this.router.navigate(['/otpSession']);
    }
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
          var dataSet = data.set?.records;
          // *ngIf="item.MobileNo != '' && item.LinkDelingFLG != 'D'"
          dataSet.forEach((element) => {
            var isValidCustomer = this.isValidAccStatusFrmScheme(element.SchemeCode);
            if(isValidCustomer){
              if (element.MobileNo != '' && element.LinkDelingFLG != 'D' && element.LinkDelingFLG != 'P' && element.LinkDelingFLG != '') {
                this.linkDelinkList.push(element);
              }
            }
            
          });

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

  radioBoxClicked(item) {
    console.log("accountnumber",item)
    this.linkDelinkItem = item;
    console.log("accountnumberffdsd",item.accountNo);
    this.dataService.dellinkAccountnumber=item.accountNo
  }

  proceed() {
    console.log('in');

    delinkAccountModals();
    //this.confirm = true
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

  onKeyupEvent(index, event) {
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
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1).focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      // this.MPINForm.get('upassword1').reset();
      // this.MPINForm.get('upassword2').reset();
      // this.MPINForm.get('upassword3').reset();
      // this.MPINForm.get('upassword4').reset();
      // this.MPINForm.get('upassword5').reset();
      // this.MPINForm.get('upassword6').reset();
      // this.mPinRows._results[0].nativeElement.focus();
      if (event.key != "Unidentified") {
        //this.otpForm.get(this.uFormInput[index]).setValue("");
        this.getSpasswordElement(index - 1).focus();
      }
    }
  }
  onfocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index) {
    //console.log(this.mPinRows);
      if (index <= 5)
      return this.mobileOtp._results[index].nativeElement;
  }

  resendOTP(numCount?: any) {
    this.delinkAccountForm.reset();
    var resendOTPReq = this.otpSessionService.getResendOTPSessionReq(this.constant.val_DELINK);
    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_RESENDOTPSESSION
      )
      .subscribe((data) => {
        if (data.responseParameter.opstatus == '00') {
          this.startCounter();
          if (numCount == 2)
            showToastMessage(data.responseParameter.Result, 'success');
        }
      });
  }

  startCounter() {
    this.tick = 1000;
    this.counter = 120;
    if (this.countDown && !this.countDown.closed) {
      this.countDown.unsubscribe();
    }
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter == 1) this.countDown.unsubscribe();
      --this.counter;
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

          console.log(" delink data.set.records" + JSON.stringify(data.set.records));

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

  openPopUp(){
  
    this.commonMethod.openPopup("div.tpin-popup")
  }
  closepopup(){
    this.commonMethod.closePopup("div.tpin-popup")
  }

}
