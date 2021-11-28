import { NomineeAuthorizationService } from './nominee-authorization.service';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import {DatePipe, Location} from '@angular/common'
import { Subscription, timer } from 'rxjs';

declare var showToastMessage : any

@Component({
  selector: 'app-nominee-authorization',
  templateUrl: './nominee-authorization.component.html',
  styleUrls: ['./nominee-authorization.component.scss']
})
export class NomineeAuthorizationComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService,  
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location : Location,
    private nomineeAuthorizationService : NomineeAuthorizationService,
    private encryptDecryptService: EncryptDecryptService,
    public commonMethod:CommonMethods,
    private date : DatePipe
) { }
nomineeAuthForm : FormGroup ;
@ViewChildren('nomineeOTPRow') nomineeOTPRows : any;

nomineeOtpInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6']
tempDecryptedReq: any;
mobNumber : any ;
dateOfBirth : any ;
counter = 120;
tick = 1000;
countDown: Subscription;
type = "password";
ngOnInit(): void {
  this.buildForm() ;
  if(this.DataService.isCordovaAvailable){
    this.type = "tel";
  }
  this.DataService.setPageSettings('Nominee');
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
  this.resendOTP(1)
  this.mobNumber = this.commonMethod.maskMobileNumber(this.storage.getLocalStorage(this.constant.storage_mobileNo));
  history.pushState(
    {},
    this.DataService.otpSessionPreviousPage,
    this.location.prepareExternalUrl(this.DataService.otpSessionPreviousPage)
  );
  history.pushState(
    {},
    'self',
    this.location.prepareExternalUrl(this.router.url)
  );
  // this.dateOfBirth =  this.datePipe.transform(this.nomineeDetailsForm.value.dob, 'dd-MM-yyyy') ;
}

buildForm(){
  this.nomineeAuthForm = new FormGroup({
    otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
  });
}

validateForm(){
  if(this.nomineeAuthForm.invalid){
    this.nomineeAuthForm.get('otp1').markAsTouched();
    this.nomineeAuthForm.get('otp2').markAsTouched();
    this.nomineeAuthForm.get('otp3').markAsTouched();
    this.nomineeAuthForm.get('otp4').markAsTouched();
    this.nomineeAuthForm.get('otp5').markAsTouched();
    this.nomineeAuthForm.get('otp6').markAsTouched();
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
          this.nomineeAuthForm.get(this.nomineeOtpInput[index])?.setValue("");
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
      return this.nomineeOTPRows._results[index].nativeElement;
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

  nomineeAuthSubmit(){
    let otpValue;
    if(this.nomineeAuthForm.valid){
      // this.goToPage('nomineeSuccess') ;
      otpValue =
      this.nomineeAuthForm.value.otp1 +
      this.nomineeAuthForm.value.otp2 +
      this.nomineeAuthForm.value.otp3 +
      this.nomineeAuthForm.value.otp4 +
      this.nomineeAuthForm.value.otp5 +
      this.nomineeAuthForm.value.otp6  ;

      var param = this.nomineeAuthorizationService.getSendOTPSessionReq(otpValue);
      this.submitOtpSession(param);

    } else{
      this.validateForm() ;
    }

 
  }

  submitOtpSession(param) {
    console.log("this.DataService.request" + this.DataService.request);

    this.tempDecryptedReq = JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), this.DataService.request));
    console.log("nominee auth ", this.tempDecryptedReq)
    console.log(this.tempDecryptedReq);
    this.tempDecryptedReq.methodName = this.DataService.endPoint.split('/')[1];
    if(this.DataService.otpName == 'OTP')
    this.tempDecryptedReq.value = this.nomineeAuthForm.value.otp1 + this.nomineeAuthForm.value.otp2 +  this.nomineeAuthForm.value.otp3 + this.nomineeAuthForm.value.otp4 + this.nomineeAuthForm.value.otp5 + this.nomineeAuthForm.value.otp6;
    else{
      this.tempDecryptedReq.value =this.encryptDecryptService.createMD5Value(this.nomineeAuthForm.value.otp1 + this.nomineeAuthForm.value.otp2 +  this.nomineeAuthForm.value.otp3 + this.nomineeAuthForm.value.otp4 + this.nomineeAuthForm.value.otp5 + this.nomineeAuthForm.value.otp6); 
      this.tempDecryptedReq.customerID = this.DataService.userDetails.customerId;
    }
  

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.DataService.request = encryptData;
    console.log(this.DataService.request);
    this.submitReq();
  }


  submitReq(){
    console.log("this.DataService.request" + this.DataService.request);
    this.http.callBankingAPIService( this.DataService.request, this.storage.getLocalStorage(this.constant.storage_deviceId),this.DataService.endPoint).subscribe(data => {
        if (data.responseParameter.opstatus == '00') {
          console.log(data);
          this.DataService.nomineeReceiptObj.response = 'Successful';
        } else {
          this.DataService.nomineeReceiptObj.response = 'Failed';
        }
  
        this.DataService.nomineeReceiptObj.msg = data.responseParameter.Result;
        this.DataService.nomineeReceiptObj.rrn = data.RRN == "" ? "-" : data.RRN ;
        this.router.navigate(['/nomineeSuccess']);
  
      })
  }

  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  resendOTP(numCount?: any) {
    this.nomineeAuthForm.reset();
    var resendOTPReq = this.nomineeAuthorizationService.getResendOTPSessionReq(this.constant.val_ADDNOMINEEDATA);
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


}

