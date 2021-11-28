import { Component, OnInit, OnDestroy, HostListener, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { StopChequeAuthorizationService } from './stop-cheque-authorization.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Subscription, timer } from 'rxjs';
declare var showToastMessage: any;
import { Location } from '@angular/common';
@Component({
  selector: 'app-stop-cheque-authorization',
  templateUrl: './stop-cheque-authorization.component.html',
  styleUrls: ['./stop-cheque-authorization.component.scss']
})
export class StopChequeAuthorizationComponent implements OnInit {

  constructor( private router:Router, public dataService: DataService, public formValidation: FormValidationService,public authService:StopChequeAuthorizationService, private encryptDecryptService: EncryptDecryptService,  private storage: LocalStorageService,private constant: AppConstants, private http: HttpRestApiService,public commonMethod:CommonMethods,private location: Location) { }
  otpSessionForm: FormGroup;
  public formErrors = {
    otp: '',
  };
  tempDecryptedReq: any;
  mobNumber:any="";
  counter = 120;
  tick = 1000;
  countDown: Subscription;
  invalidOtp : boolean = false ;
  platform:any;

  otpFormInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6'] ;

  @ViewChildren('OTPFormRow') otpPinRows: any;

  @HostListener('focusout')
  onBlur() {
    //call form validarion on focus out
    this.formErrors = this.formValidation.validateForm(
      this.otpSessionForm,
      this.formErrors,
      true
    );
  }

  ngOnInit(): void {
    this.dataService.setPageSettings('OTP');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
    this.buildForm()
    this.resendOTP()
    this.mobNumber = this.commonMethod.maskMobileNumber(this.storage.getLocalStorage(this.constant.storage_mobileNo));
    history.pushState({},this.dataService.previousPageUrl,this.location.prepareExternalUrl(this.dataService.previousPageUrl));
    history.pushState({},'self',this.location.prepareExternalUrl(this.router.url));
  }

  buildForm() {

    if(this.dataService.otplength == 4) {
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

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  /**
   * Validate Form
   */
   validateForm() {
    if (this.otpSessionForm.invalid) {
      this.otpSessionForm.get('otp1').markAsTouched();
      this.otpSessionForm.get('otp2').markAsTouched();
      this.otpSessionForm.get('otp3').markAsTouched();
      this.otpSessionForm.get('otp4').markAsTouched();
      if(this.dataService.otplength == 6) {
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


   /**
   * On Otp confirmation this fucntion called
   */
    confirmOtpClick() {
      var otpValue;
      this.validateForm();
      console.log(this.otpSessionForm.value);
      if (this.otpSessionForm.valid) {
        if(this.dataService.otplength == 4) {
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

       var param = this.authService.getSendOTPSessionReq(otpValue);
       this.submitOtpSession(param);
       this.otpSessionForm.reset()
      }
    }

   /**
   * function called on otp submit
   */
  submitOtpSession(param) {
    console.log("this.dataService.request" + this.dataService.request);

    this.tempDecryptedReq = JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), this.dataService.request));
    console.log(this.tempDecryptedReq);
    this.tempDecryptedReq.methodName = this.dataService.endPoint.split('/')[1];
    this.tempDecryptedReq.customerID =this.dataService.userDetails.customerId;
    // this.tempDecryptedReq.value = this.otpSessionForm.value.otp1 + this.otpSessionForm.value.otp2 +  this.otpSessionForm.value.otp3 + this.otpSessionForm.value.otp4 + this.otpSessionForm.value.otp5 + this.otpSessionForm.value.otp6;
    // this.tempDecryptedReq.customerID = this.dataService.userDetails.customerId;

    if(this.dataService.otpName == 'OTP'){
      this.tempDecryptedReq.value =this.otpSessionForm.value.otp1 +this.otpSessionForm.value.otp2 +this.otpSessionForm.value.otp3 +this.otpSessionForm.value.otp4 +this.otpSessionForm.value.otp5 +this.otpSessionForm.value.otp6;
    }else{
      this.tempDecryptedReq.value = this.encryptDecryptService.createMD5Value(this.otpSessionForm.value.otp1 + this.otpSessionForm.value.otp2 +  this.otpSessionForm.value.otp3 + this.otpSessionForm.value.otp4 + this.otpSessionForm.value.otp5 + this.otpSessionForm.value.otp6)
    }

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.dataService.request = encryptData;
    console.log(this.dataService.request);
    this.submitReq();
  }

  submitReq()
  {
    this.http
    .callBankingAPIService(
      this.dataService.request,
      this.storage.getLocalStorage(this.constant.storage_deviceId),
      this.dataService.endPoint
    )
    .subscribe((resp) => {
      if(resp.responseParameter.opstatus == '11'){
        this.invalidOtp = true;
        return ;
      }


      if (resp.responseParameter.opstatus == '00') {
        console.log(resp);
        this.dataService.stopChequeReceiptObj.response = this.constant.val_Successful;
      }
      else {
        this.dataService.stopChequeReceiptObj.response = this.constant.val_Failed;
      }

      this.dataService.receiptmsg = resp.responseParameter.Result;
      this.dataService.stopChequeReceiptObj.msg = resp.responseParameter.Result;
      this.dataService.stopChequeReceiptObj.rrn = resp.set.records[0].referenceNumber =="" ? "" : resp.set.records[0].referenceNumber ;
      this.router.navigate(['/stopChequeReceipt']);

    })
  }

   /**
   * call function for resend function
   */
    resendOTP() {
      this.otpSessionForm.reset();
      var resendOTPReq = this.authService.getResendOTPSessionReq(this.constant.val_STOPCHEQUE);
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

    startCounter() {
    this.invalidOtp = false;

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

    onSearchChange(value,inputPlace)
  {

    this.invalidOtp = false;
    console.log(value);
    if(inputPlace == 1)
    {
       if(value.length == 1)
       document.getElementById("spassword2").focus();
    }
    else if(inputPlace == 2)
    {
      if(value.length == 1)
      document.getElementById("spassword3").focus();
      // else if(value.length == 0)
      else
      document.getElementById("spassword1").focus();
    }
    else if(inputPlace == 3)
    {
      if(value.length == 1)
      document.getElementById("spassword4").focus();
      // else if(value.length == 0)
      else
      document.getElementById("spassword2").focus();

    }
    else if(inputPlace == 4)
    {
      if(value.length == 1)
      document.getElementById("spassword5").focus();
      // else if(value.length == 0)
      else
      document.getElementById("spassword3").focus();

    }
    else if(inputPlace == 5)
    {
      if(value.length == 1)
      document.getElementById("spassword6").focus();
      // else if(value.length == 0)
      else
      document.getElementById("spassword4").focus();

    }
    else if(inputPlace == 6)
    {
      if(value.length == 0)
      document.getElementById("spassword5").focus();

    }
  }



    cancel(){
      //this.location.back();
      //console.log(this.dataService.previousPageUrl);
      this.router.navigateByUrl(this.dataService.previousPageUrl);
    }


    // OTP auto focus and auto move
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
          this.otpSessionForm.get(this.otpFormInput[index])?.setValue("");
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
      return this.otpPinRows._results[index].nativeElement;
    }
  }

}
