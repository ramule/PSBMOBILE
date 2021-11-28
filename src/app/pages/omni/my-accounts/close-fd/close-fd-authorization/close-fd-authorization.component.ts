import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { NomineeAuthorizationService } from '../../../nominee/nominee-authorization/nominee-authorization.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common';
import { MydepositeService } from '../../my-deposits/mydeposite.service';
import { MyAccountInfoService } from '../../my-accounts-info/my-account-info.service';
import { DetailStatementService } from '../../detailed-statement/detailed-statement.service'
import { AccountType } from '../../../../../utilities/app-enum';

declare var showToastMessage : any;

@Component({
  selector: 'app-close-fd-authorization',
  templateUrl: './close-fd-authorization.component.html',
  styleUrls: ['./close-fd-authorization.component.scss']
})
export class CloseFDAuthorizationComponent implements OnInit {
  counter = 120;
  tick = 1000;
  countDown: Subscription;
  mobNumber: any ;
  invalidOtp: boolean = false;
  tempDecryptedReq: any;
  closeFDDetails: any;
  depositsDtl: any={};
  selAccDtl: any;
  totalAccountList: any = [];
  accountDtls: any;
  remarks ='';
  constructor(
    private router: Router,
    public dataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location : Location,
    private encryptDecryptService: EncryptDecryptService,
    public commonMethod:CommonMethods,
    private nomineeAuthorizationService : NomineeAuthorizationService,
    private mydepositeService : MydepositeService,
    private myAccountInfoService: MyAccountInfoService,
    private detailStatementService : DetailStatementService,) { }

  closeFdForm : FormGroup ;
  @ViewChildren('closeFdOTPRow') closeFdOTPRows : any;

  closeFdOTPInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6']

  ngOnInit(): void {
    this.buildForm();
    this.remarks = this.dataService.closeFDObj?.remarks ? this.dataService.closeFDObj.remarks  : '-';
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
    this.dataService.setPageSettings('AUTHORIZATION');
    console.log('mobileNo: ', this.storage.getLocalStorage("mobileNo"));
    console.log('mobileNo: ', this.storage.getLocalStorage(this.constant.storage_mobileNo));
    this.mobNumber = this.maskCharacter(this.storage.getLocalStorage(this.constant.storage_mobileNo), 4);
    this.closeFDDetails = this.dataService.closeFDObj;
    console.log('closeFDDetails: ', this.closeFDDetails);
    this.totalAccountList = this.dataService.customerMyDepostie;
    this.selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.closeFDDetails.FDAccNumber);
    console.log('selected account details : ', this.selAccDtl);
    this.resendOTP(1);
    this.AccountEnquiryDtl();
    this.DepositeAccountEnquery();
    history.pushState({}, this.dataService.previousPageUrl, this.location.prepareExternalUrl(this.dataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  AccountEnquiryDtl() {
    var param = this.myAccountInfoService.getAccountEnquiryParam(this.selAccDtl[0]);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
          // this.branchCode = data.set.records[0]['001']
        console.log(data);
        if (data.hasOwnProperty("set")) {
          this.accountDtls = data.set.records[0];
          console.log("Account details::",this.accountDtls);
        }
      }
      else {

      }
    });
  }


  buildForm(){
    this.closeFdForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    });
  }

  DepositeAccountEnquery() {
    let param =  this.mydepositeService.depositeAccountEquirey(this.closeFDDetails.FDAccNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DEPOSITACCOUNTINQUIRY).subscribe(data => {
      console.log(data);
      console.log('Temp Deposite Data :: ');
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data);
        this.depositsDtl = data.set.records[0];
        console.log('depositsDtl: ', this.depositsDtl);
        this.depositsDtl.interest_Rate = parseFloat(this.depositsDtl.interest_Rate).toFixed(2);
        this.depositsDtl.accountOpenDate = this.setDate(this.depositsDtl.accountOpenDate);
        this.depositsDtl.maturityDate = this.setDate(this.depositsDtl.maturityDate);
        this.depositsDtl.depositPeriodMonthsComponent = parseInt(this.depositsDtl.depositPeriodMonthsComponent);
      }
      else {

      }
    });
  }

  setDate(date){
    var validDate;
    var urDate = date.match(/(\d{4})(\d{2})(\d{2})/);
    validDate = urDate[3]+"/"+urDate[2]+"/"+urDate[1];
    return validDate
  }

  validateForm(){
    if(this.closeFdForm.invalid){
      this.closeFdForm.get('otp1').markAsTouched();
      this.closeFdForm.get('otp2').markAsTouched();
      this.closeFdForm.get('otp3').markAsTouched();
      this.closeFdForm.get('otp4').markAsTouched();
      this.closeFdForm.get('otp5').markAsTouched();
      this.closeFdForm.get('otp6').markAsTouched();
      return;
    }
  }

  onKeyUpEvent(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 7) {
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
      if (event.key != "Unidentified") {
        if (type == 'otp') {
          this.closeFdForm.get(this.closeFdOTPInput[index])?.setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }

  }

  onFocusEvent(index: any, type: any) {

    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index: any, type: any) {
    if (type == 'otp') {
      return this.closeFdOTPRows._results[index].nativeElement;
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName, {state : { account : this.closeFDDetails.FDAccNumber, FDRDData: this.depositsDtl, accountDtls: this.accountDtls }});
  }

  closeFdSubmit(){
    let otpValue;
    if(this.closeFdForm.valid){
      otpValue =
      this.closeFdForm.value.otp1 +
      this.closeFdForm.value.otp2 +
      this.closeFdForm.value.otp3 +
      this.closeFdForm.value.otp4 +
      this.closeFdForm.value.otp5 +
      this.closeFdForm.value.otp6  ;

      // this.router.navigateByUrl('/closeFDSuccess');
      var param = this.nomineeAuthorizationService.getSendOTPSessionReq(otpValue);
      this.submitOtpSession(param);

    } else{
      this.validateForm() ;
    }
  }

  submitOtpSession(param) {
    console.log("this.DataService.request" + this.dataService.request);

    this.tempDecryptedReq = JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), this.dataService.request));
    console.log("close FD: ", this.tempDecryptedReq)
    console.log(this.tempDecryptedReq);
    this.tempDecryptedReq.methodName = this.dataService.endPoint.split('/')[1];
    this.tempDecryptedReq.value = this.closeFdForm.value.otp1 + this.closeFdForm.value.otp2 +  this.closeFdForm.value.otp3 + this.closeFdForm.value.otp4 + this.closeFdForm.value.otp5 + this.closeFdForm.value.otp6;
    this.tempDecryptedReq.customerID = this.dataService.userDetails.customerId;

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.dataService.request = encryptData;
    console.log(this.dataService.request);
    this.submitReq();
  }

  submitReq(){
    console.log("this.dataService.request" + this.dataService.request);
    this.http.callBankingAPIService( this.dataService.request, this.storage.getLocalStorage(this.constant.storage_deviceId),this.dataService.endPoint).subscribe(data => {
      console.log(data);
      this.closeFdForm.reset();
      switch (data.responseParameter.opstatus) {
        case this.constant.val_InvalidCredentials:
          break;
        case "03":
          this.dataService.isOTPMaxAttempts = true;
          break;
        case "11":
          //invaild otp
          this.invalidOtp = true;
          break;
        case "12":
          //otp attempt expired
          this.dataService.isOTPMaxAttempts = true;
          this.commonMethod.openPopup('div.popup-bottom.otp-attempt-expired');
          break;
        default:
          if (data.responseParameter.opstatus == '00') {
            console.log(data);
            this.dataService.receiptType = 'Successful';
          } else {
            this.dataService.receiptType = 'Failed';
          }

          this.dataService.receiptmsg = data.responseParameter.Result;
          this.dataService.receipdRefID = data.RRN =="" ? "-" : data.RRN ;
          this.omniDashboardApiCall();
          this.router.navigate(['/closeFDSuccess']);
      }

    })
  }


  omniDashboardApiCall(){
    let param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.customerAccountList = data.set.records;
        this.dataService.isOmniLogin = true; // handel page navigation after session timeout

        //filltered account list of saving Account, deposit Account , overDraftAccount
        //Accounts filtered will be used in dashbord and other module
        this.dataService.customerCanTransferAccountList =[];
        this.dataService.customerMyDepostie =[];
        this.dataService.customerLoanAccountList =[];


        /* clearing all the arrays and resetting balances */

        this.dataService.customerMyDepostie = [];
        this.dataService.customerOperativeAccList = [];
        this.dataService.customerBorrowingsList = [];

        this.dataService.totalMyDepositBalance = 0;
        this.dataService.totalMyOperativeBalance = 0;
        this.dataService.totalMyBorrowingsBalance = 0;

        data.set.records.forEach(el => {
          if(el.accountType != 'CAPPI'){
            if(el.accountFlag == "P") this.dataService.primaryAccountDtl = el;
            if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
              this.dataService.customerMyDepostie.push(el);
              this.dataService.totalMyDepositBalance = this.dataService.totalMyDepositBalance + parseFloat(el.acctBalance);
            }
            else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
              // el.AGSStatus = el["AGS Status"];
              this.dataService.customerOperativeAccList.push(el);
              this.dataService.totalMyOperativeBalance = this.dataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
              console.log("customerOperativeAccList =====>",this.dataService.customerOperativeAccList);
            }
            else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
              this.dataService.customerBorrowingsList.push(el);
              this.dataService.totalMyBorrowingsBalance = this.dataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
            }
          }
        });
      }
      else {

      }
    });
  }

  resendOTP(numCount?: any) {
    this.closeFdForm.reset();
    var resendOTPReq = this.nomineeAuthorizationService.getResendOTPSessionReq('Close FD');
    this.http.callBankingAPIService(resendOTPReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_RESENDOTPSESSION)
    .subscribe((data) => {
      if (data.responseParameter.opstatus == '00') {
        this.startCounter();
        if (numCount == 2) {
          showToastMessage(data.responseParameter.Result, 'success');
        }
      }
    });
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
      // mask then add remaining string
    return ('' + str).slice(0, -n).replace(/./g, "*")+ ('' + str).slice(-n);
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

  closePopup(popup){
    this.commonMethod.closePopup(popup);
    this.router.navigateByUrl('/pmjjbyDetails');
  }

}
