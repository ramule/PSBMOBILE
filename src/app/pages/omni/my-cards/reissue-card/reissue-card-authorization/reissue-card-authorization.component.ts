import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { StopChequeAuthorizationService } from '../../../service-request/stop-cheque/stop-cheque-authorization/stop-cheque-authorization.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import {ReissueCardAuthorizationService} from '../reissue-card-authorization/reissue-card-authorization.service';
import { Subscription, timer } from 'rxjs';
declare var showToastMessage: any;
@Component({
  selector: 'app-reissue-card-authorization',
  templateUrl: './reissue-card-authorization.component.html',
  styleUrls: ['./reissue-card-authorization.component.scss']
})
export class ReissueCardAuthorizationComponent implements OnInit {
  otpSessionForm: FormGroup;
  public formErrors = {
    otp: '',
  };
  tempDecryptedReq: any;
  mobNumber:any="";
  counter = 120;
  tick = 1000;
  countDown: Subscription;
  constructor(
    private router:Router,
    public DataService: DataService,
    public formValidation: FormValidationService,
    public reissueCardAuthorizationService:ReissueCardAuthorizationService,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    public commonMethod:CommonMethods

) { }


  ngOnInit(): void {
    this.DataService.setPageSettings('OTP');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
    this.buildForm();
    this.resendOTP();
    this.mobNumber = this.commonMethod.maskMobileNumber(this.storage.getLocalStorage(this.constant.storage_mobileNo));
    this.countDown = timer(0, this.tick)
      .subscribe(() => --this.counter)

  }
  buildForm() {

    if(this.DataService.otplength == 4) {
      this.otpSessionForm = new FormGroup({
        otp1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ])
      });
    }
    else {
      this.otpSessionForm = new FormGroup({
        otp1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp5: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp6: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      });
    }
  }
  validateForm() {
    if (this.otpSessionForm.invalid) {
      this.otpSessionForm.get('otp1').markAsTouched();
      this.otpSessionForm.get('otp2').markAsTouched();
      this.otpSessionForm.get('otp3').markAsTouched();
      this.otpSessionForm.get('otp4').markAsTouched();
      if(this.DataService.otplength == 6) {
        this.otpSessionForm.get('otp5').markAsTouched();
        this.otpSessionForm.get('otp6').markAsTouched();
      }
      this.formErrors = this.formValidation.validateForm(
        this.otpSessionForm,
        this.formErrors,
        true
      );
      return;
    }
  }
  confirmOtpClick() {
    var otpValue;
    this.validateForm();
    console.log(this.otpSessionForm.value);
    if (this.otpSessionForm.valid) {
      if(this.DataService.otplength == 4) {
        otpValue =
        this.otpSessionForm.value.otp1 +
        this.otpSessionForm.value.otp2 +
        this.otpSessionForm.value.otp3 +
        this.otpSessionForm.value.otp4;
      }
      else {
        otpValue =
        this.otpSessionForm.value.otp1 +
        this.otpSessionForm.value.otp2 +
        this.otpSessionForm.value.otp3 +
        this.otpSessionForm.value.otp4 +
        this.otpSessionForm.value.otp5 +
        this.otpSessionForm.value.otp6;
      }

     var param = this.reissueCardAuthorizationService.getSendOTPSessionReq(otpValue);
     this.submitOtpSession(param);
    }
  }
  submitOtpSession(param) {
    console.log("this.dataService.request" + this.DataService.request);

    this.tempDecryptedReq = JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), this.DataService.request));
    console.log(this.tempDecryptedReq);
    this.tempDecryptedReq.methodName = this.DataService.endPoint.split('/')[1];
    this.tempDecryptedReq.value = this.otpSessionForm.value.otp1 + this.otpSessionForm.value.otp2 +  this.otpSessionForm.value.otp3 + this.otpSessionForm.value.otp4 + this.otpSessionForm.value.otp5 + this.otpSessionForm.value.otp6;
    this.tempDecryptedReq.customerID = this.DataService.userDetails.customerId;

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.DataService.request = encryptData;
    console.log(this.DataService.request);
    this.submitReq();
  }
  submitReq()
{
  this.http
  .callBankingAPIService(
    this.DataService.request,
    this.storage.getLocalStorage(this.constant.storage_deviceId),
    this.DataService.endPoint
  )
  .subscribe((resp) => {
    if (resp.responseParameter.opstatus == '00') {
      console.log(resp);
      this.DataService.reissuedCardObj.response = 'Successful';
    } else {
      this.DataService.reissuedCardObj.response = 'Failed';
    }

    this.DataService.reissuedCardObj.msg = resp.responseParameter.Result;
    this.DataService.reissuedCardObj.rrn = resp.responseParameter.RRN =="" ? "-" : resp.responseParameter.RRN ;
    this.router.navigate(['/reissueCardSuccess']);

  })
}
resendOTP() {
  this.otpSessionForm.reset();
  var resendOTPReq = this.reissueCardAuthorizationService.getResendOTPSessionReq();
  this.http
    .callBankingAPIService(
      resendOTPReq,
      this.storage.getLocalStorage(this.constant.storage_deviceId),
      this.constant.serviceName_RESENDOTPSESSION
    )
    .subscribe((data) => {
      if (data.responseParameter.opstatus == '00') {
        this.startCounter();
        showToastMessage(data.responseParameter.Result, 'success');
      }
    });
}
onSearchChange(value,inputPlace)
  {
    console.log(value);
    if(inputPlace == 1)
    {
       if(value.length == 1)
       document.getElementById("otppassword2").focus();
    }
    else if(inputPlace == 2)
    {
      if(value.length == 1)
      document.getElementById("otppassword3").focus();
      // else if(value.length == 0)
      else
      document.getElementById("otppassword1").focus();
    }
    else if(inputPlace == 3)
    {
      if(value.length == 1)
      document.getElementById("otppassword4").focus();
      // else if(value.length == 0)
      else
      document.getElementById("otppassword2").focus();

    }
    else if(inputPlace == 4)
    {
      if(value.length == 1)
      document.getElementById("otppassword5").focus();
      // else if(value.length == 0)
      else
      document.getElementById("otppassword3").focus();

    }
    else if(inputPlace == 5)
    {
      if(value.length == 1)
      document.getElementById("otppassword6").focus();
      // else if(value.length == 0)
      else
      document.getElementById("otppassword4").focus();

    }
    else if(inputPlace == 6)
    {
      if(value.length == 0)
      document.getElementById("otppassword5").focus();

    }
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

  cancel()
  {
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl("/dashboard");
    }
    else{
      this.router.navigateByUrl("/dashboardMobile");
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
}
