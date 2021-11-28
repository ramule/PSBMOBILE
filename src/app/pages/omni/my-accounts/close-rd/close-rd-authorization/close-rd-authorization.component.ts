import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { NomineeAuthorizationService } from '../../../nominee/nominee-authorization/nominee-authorization.service';
import { MydepositeService } from '../../my-deposits/mydeposite.service';
import { MyAccountInfoService } from '../../my-accounts-info/my-account-info.service';
import { Location } from '@angular/common';
declare var showToastMessage : any;

@Component({
  selector: 'app-close-rd-authorization',
  templateUrl: './close-rd-authorization.component.html',
  styleUrls: ['./close-rd-authorization.component.scss']
})
export class CloseRDAuthorizationComponent implements OnInit {
  counter = 120;
  tick = 1000;
  countDown: Subscription;
  mobNumber: any ;
  invalidOtp: boolean = false;
  tempDecryptedReq: any;
  closeRDDetails: any;
  depositsDtl: any = {};
  selAccDtl: any;
  totalAccountList: any = [];
  accountDtls: any;
  closeRdForm : FormGroup ;
  @ViewChildren('closeRdOTPRow') closeRdOTPRows : any;

  closeRdOTPInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6']
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
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
    this.dataService.setPageSettings('AUTHORIZATION');
    console.log('mobileNo: ', this.storage.getLocalStorage(this.constant.storage_mobileNo));
    this.mobNumber = this.maskCharacter(this.storage.getLocalStorage(this.constant.storage_mobileNo), 4);
    this.closeRDDetails = this.dataService.closeRDObj;
    this.totalAccountList = this.dataService.customerMyDepostie;
    this.selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.closeRDDetails.RDAccNumber);
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
    this.closeRdForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    });
  }

  DepositeAccountEnquery() {
    let param =  this.mydepositeService.depositeAccountEquirey(this.closeRDDetails.RDAccNumber);
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
    if(this.closeRdForm.invalid){
      this.closeRdForm.get('otp1').markAsTouched();
      this.closeRdForm.get('otp2').markAsTouched();
      this.closeRdForm.get('otp3').markAsTouched();
      this.closeRdForm.get('otp4').markAsTouched();
      this.closeRdForm.get('otp5').markAsTouched();
      this.closeRdForm.get('otp6').markAsTouched();
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
          this.closeRdForm.get(this.closeRdOTPInput[index])?.setValue("");
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
      return this.closeRdOTPRows._results[index].nativeElement;
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName, {state : { account : this.closeRDDetails.RDAccNumber, FDRDData: this.depositsDtl, accountDtls: this.accountDtls }});
  }

  closeFdSubmit(){
    let otpValue;
    if(this.closeRdForm.valid){
      otpValue =
      this.closeRdForm.value.otp1 +
      this.closeRdForm.value.otp2 +
      this.closeRdForm.value.otp3 +
      this.closeRdForm.value.otp4 +
      this.closeRdForm.value.otp5 +
      this.closeRdForm.value.otp6  ;

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
    this.tempDecryptedReq.value = this.closeRdForm.value.otp1 + this.closeRdForm.value.otp2 +  this.closeRdForm.value.otp3 + this.closeRdForm.value.otp4 + this.closeRdForm.value.otp5 + this.closeRdForm.value.otp6;
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
      this.closeRdForm.reset();
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
          this.router.navigate(['/closeRDSuccess']);
      }

    })
  }

  resendOTP(numCount?: any) {
    this.closeRdForm.reset();
    var resendOTPReq = this.nomineeAuthorizationService.getResendOTPSessionReq('Close RD');
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
