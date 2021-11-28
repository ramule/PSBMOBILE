import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Subscription, timer } from 'rxjs';
import { NomineeAuthorizationService } from '../../../nominee/nominee-authorization/nominee-authorization.service';
declare var showToastMessage : any
@Component({
  selector: 'app-pmsby-authorization',
  templateUrl: './pmsby-authorization.component.html',
  styleUrls: ['./pmsby-authorization.component.scss']
})
export class PmsbyAuthorizationComponent implements OnInit {
  overviewDetails: any;
  counter = 120;
  tick = 1000;
  countDown: Subscription;
  mobNumber: any ;
  invalidOtp: boolean = false;
  tempDecryptedReq: any;
  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location : Location,
    private encryptDecryptService: EncryptDecryptService,
    public commonMethod:CommonMethods,
    private nomineeAuthorizationService : NomineeAuthorizationService,
) { }

pmsbyForm : FormGroup ;
@ViewChildren('pmsbyOTPRow') pmsbyRows : any;

pmsbyOtpInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6']

ngOnInit(): void {
  this.buildForm() ;
  this.DataService.setPageSettings('pmsby Auth');
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('AUTHORIZATION' , this.router.url);
  this.resendOTP(1);
  this.overviewDetails = this.DataService.pmsbyDetailsOverviewObj;
  this.mobNumber = this.maskCharacter(this.storage.getLocalStorage(this.constant.storage_mobileNo), 4);

  history.pushState({}, 'pmsbyOverview', this.location.prepareExternalUrl('pmsbyOverview'));
  history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
}


buildForm(){
  this.pmsbyForm = new FormGroup({
    otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
  });
}

validateForm(){
  if(this.pmsbyForm.invalid){
    this.pmsbyForm.get('otp1').markAsTouched();
    this.pmsbyForm.get('otp2').markAsTouched();
    this.pmsbyForm.get('otp3').markAsTouched();
    this.pmsbyForm.get('otp4').markAsTouched();
    this.pmsbyForm.get('otp5').markAsTouched();
    this.pmsbyForm.get('otp6').markAsTouched();
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
          this.pmsbyForm.get(this.pmsbyOtpInput[index])?.setValue("");
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
      return this.pmsbyRows._results[index].nativeElement;
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  pmsbySubmit(){
    let otpValue;
    if(this.pmsbyForm.valid){
      // this.goToPage('nomineeSuccess') ;
      otpValue =
      this.pmsbyForm.value.otp1 +
      this.pmsbyForm.value.otp2 +
      this.pmsbyForm.value.otp3 +
      this.pmsbyForm.value.otp4 +
      this.pmsbyForm.value.otp5 +
      this.pmsbyForm.value.otp6  ;

      // this.goToPage('pmsbyReceipt')
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
    this.tempDecryptedReq.value = this.pmsbyForm.value.otp1 + this.pmsbyForm.value.otp2 +  this.pmsbyForm.value.otp3 + this.pmsbyForm.value.otp4 + this.pmsbyForm.value.otp5 + this.pmsbyForm.value.otp6;
    this.tempDecryptedReq.customerID = this.DataService.userDetails.customerId;
    this.tempDecryptedReq.amount = this.tempDecryptedReq.amount+"00"

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.DataService.request = encryptData;
    console.log(this.DataService.request);
    this.submitReq();
  }

  submitReq(){
    console.log("this.DataService.request" + this.DataService.request);
    this.http.callBankingAPIService( this.DataService.request, this.storage.getLocalStorage(this.constant.storage_deviceId),this.DataService.endPoint).subscribe(data => {
      console.log(data);
      this.pmsbyForm.reset();
      switch (data.responseParameter.opstatus) {
        case this.constant.val_InvalidCredentials:
          break;
        case "03":
          this.DataService.isOTPMaxAttempts = true;
          break;
        case "11":
          //invaild otp
          this.invalidOtp = true;
          break;
        case "12":
          //otp attempt expired
          this.DataService.isOTPMaxAttempts = true;
          this.commonMethod.openPopup('div.popup-bottom.otp-attempt-expired');
          break;
        default:
          if (data.responseParameter.opstatus == '00') {
            console.log(data);
            this.DataService.receiptType = 'Successful';
          } else {
            this.DataService.receiptType = 'Failed';
          }
          this.DataService.receiptmsg = data.responseParameter.Result;
          this.DataService.receipdRefID = data.RRN =="" ? "-" : data.RRN ;
          this.router.navigate(['/pmsbyReceipt']);
      }
    })
  }

  resendOTP(numCount?: any) {
    this.pmsbyForm.reset();
    var resendOTPReq = this.nomineeAuthorizationService.getResendOTPSessionReq('PMSBY Enrollment');
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
    this.router.navigateByUrl('/pmsbyDetails');
  }

}

