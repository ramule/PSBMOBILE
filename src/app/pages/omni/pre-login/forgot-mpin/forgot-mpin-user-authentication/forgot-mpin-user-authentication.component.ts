import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import {ForgotMpinUserAuthenticationService} from'../forgot-mpin-user-authentication/forgot-mpin-user-authentication.service';
import { timer, Subscription } from "rxjs";

@Component({
  selector: 'app-forgot-mpin-user-authentication',
  templateUrl: './forgot-mpin-user-authentication.component.html',
  styleUrls: ['./forgot-mpin-user-authentication.component.scss']
})
export class ForgotMpinUserAuthenticationComponent implements OnInit {

  forgotMpinUserAuthForm: FormGroup;
  commonPageComponent = {
    'headerType': 'preloginHeaderomni',
    'sidebarNAv': 'none',
    'footer': 'innerFooter',
  }
  maskedEmail:any="";
  maskedMobile:any="";
  otpForm: FormGroup;
  selectedtab = "card";
  countDownEmail: Subscription;
  counterEmail = 120;
  countDownMobile: Subscription;
  counterMobile = 120;
  tick = 1000;


  constructor( private router:Router,
    public DataService: DataService,
    private commonMethods: CommonMethods,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private forgotMpinUserAuthenticationService:ForgotMpinUserAuthenticationService,

    ) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.commonPageComponent);
    this.buildForm();
  }

  buildForm() {
    this.forgotMpinUserAuthForm = new FormGroup({
      username: new FormControl('', []),
      password: new FormControl('', []),
      mobilenumber: new FormControl('', []),
      emailaddress: new FormControl('', []),
    });
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  changeTab(type){
    this.selectedtab = type
    this.customValidation() ;
    if(this.selectedtab == "bankToken") {
      var param=this.forgotMpinUserAuthenticationService.getMaskDetailsParams()
      let deviceID = this.constant.deviceID;
      this.getMaskedDetailsApiCall(param,deviceID)
    }
    else {

    }
  }

  getMaskedDetailsApiCall(param,deviceID) {
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_GETMASKFORMATTEDDETAILS).subscribe(data=>{
    console.log(data);
    var resp = data.responseParameter
       if (resp.opstatus == "00") {
         if(resp.emailId!=null || resp.mobileNumber!=null) {
          this.maskedEmail = this.maskCharacter(resp.emailId,12)
          this.maskedMobile = this.maskCharacter(resp.mobileNumber,5)
          this.validateUserPwd()
         }
      }
    });
  }

  maskCharacter(str, n) {
  // Slice the string and replace with
    // mask then add remaining string
    return ('' + str).slice(0, -n)
        .replace(/./g, "*")
        + ('' + str).slice(-n);
  }

  customValidation() {
    if (this.selectedtab == 'card') {
      this.forgotMpinUserAuthForm.controls['username'].setValidators([Validators.required]);
      this.forgotMpinUserAuthForm.controls['password'].setValidators([Validators.required]);

      this.forgotMpinUserAuthForm.controls['mobilenumber'].setValidators([]);
      this.forgotMpinUserAuthForm.controls['emailaddress'].setValidators([]);
    } else {
      this.forgotMpinUserAuthForm.controls['username'].setValidators([]);
      this.forgotMpinUserAuthForm.controls['password'].setValidators([]);

      this.forgotMpinUserAuthForm.controls['mobilenumber'].setValidators([Validators.required]);
      this.forgotMpinUserAuthForm.controls['emailaddress'].setValidators([Validators.required]);
    }
    this.forgotMpinUserAuthForm.controls['username'].updateValueAndValidity();
    this.forgotMpinUserAuthForm.controls['password'].updateValueAndValidity();
    this.forgotMpinUserAuthForm.controls['username'].updateValueAndValidity();
    this.forgotMpinUserAuthForm.controls['password'].updateValueAndValidity();
  }

  validateForm() {
    if (this.selectedtab == 'card') {
      if (this.forgotMpinUserAuthForm.invalid) {
        this.forgotMpinUserAuthForm.get('username').markAsTouched();
        this.forgotMpinUserAuthForm.get('password').markAsTouched();
        return;
      }
    } else {
      if (this.forgotMpinUserAuthForm.invalid) {
        this.forgotMpinUserAuthForm.get('mobilenumber').markAsTouched();
        this.forgotMpinUserAuthForm.get('emailaddress').markAsTouched();
        return;
      }
    }
  }

  submitForm() {
    if(this.forgotMpinUserAuthForm.valid) {
      if(this.selectedtab == 'card')
      {
       var param=this.forgotMpinUserAuthenticationService.getValidateUserPwdParams(this.forgotMpinUserAuthForm.value)
       let deviceID=this.constant.deviceID;
       this.getValidateUserPwdApiCall(param,deviceID)
      }

    }
    else {
      this.validateForm();
    }
  }

  ResendOTPonmobile()
  {
    this.resendOTP();
  }

  validateUserPwd()
  {
    var param=this.forgotMpinUserAuthenticationService.getValidateUserPwdParams(this.forgotMpinUserAuthForm.value)
    let deviceID =this.constant.deviceID;
    this.getValidateUserPwdApiCall(param,deviceID)
  }


  getValidateUserPwdApiCall(param,deviceID) {
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_VALIDATEUSERNAMEPWD).subscribe(data=>{
    console.log(data);
    var resp = data.responseParameter
      if (resp.opstatus == "00") {

        //counter email
        this.counterEmail = 120;
        if (this.countDownEmail  && !this.countDownEmail.closed) { this.countDownEmail.unsubscribe(); }
        this.countDownEmail = timer(0, this.tick).subscribe(() => { if(this.counterEmail == 1) this.countDownEmail.unsubscribe(); --this.counterEmail });
        //counter mobile
        this.counterMobile = 120;
        if (this.countDownMobile  && !this.countDownMobile.closed) { this.countDownMobile.unsubscribe(); }
        this.countDownMobile = timer(0, this.tick).subscribe(() => { if(this.counterMobile == 1) this.countDownMobile.unsubscribe(); --this.counterMobile });

        this.openPopup('otp');

        }
    });
  }

validateOtp() {
  if (this.otpForm.valid) {
    var mobileOtp = this.otpForm.value.mobile1 + this.otpForm.value.mobile2 + this.otpForm.value.mobile3 + this.otpForm.value.mobile4 + this.otpForm.value.mobile5 + this.otpForm.value.mobile6;
    var emailOtp = this.otpForm.value.email1 + this.otpForm.value.email2 + this.otpForm.value.email3 + this.otpForm.value.email4 + this.otpForm.value.email5 + this.otpForm.value.email6;
    var refNo = "121212123434";
    let deviceID =this.constant.deviceID;
    var param = this.forgotMpinUserAuthenticationService.getChannelLeadOtpParam(mobileOtp, emailOtp, refNo);

    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_VALIDATECHANNELSPRELOGINOTP).subscribe(data => {
      console.log("=====validate otp=====", data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.closePopup('otp');
        this.router.navigateByUrl("/setForgotMpin");
      }
      else {
       // this.errorCallBack(data.subActionId, resp);
      }
    });
  }
}

resendOTP() {
  var param=this.forgotMpinUserAuthenticationService.getResendOTPParams(this.constant.val_FORGOTMPINUSER)
  let deviceID = this.constant.deviceID;
  this.getValidateUserPwdApiCall(param,deviceID)

}
  getresendOTP(param,deviceID) {
    this.http.callBankingAPIService(param,deviceID,this.constant. serviceName_RESENDOTP).subscribe(data=>{
    console.log(data);
    var resp = data.responseParameter
      if (resp.opstatus == "00") {
          console.log("Otp send successfully");
        }
    });
  }

 openPopup(popupName)
 {
    this.commonMethods.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName) {
    this.commonMethods.closePopup('div.popup-bottom.' + popupName);
  }
}
