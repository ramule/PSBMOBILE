import { Component, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { AppConstants } from '../../../../../app.constant';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  sessionDecryptKey: any;
  isFromForgotMPIN = false;
  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter'
  }

  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    public translate: TranslatePipe,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private encryptDecryptService: EncryptDecryptService,
    private forgotPasswordService: ForgotPasswordService,
    private localStorage: LocalStorageService,
    public location: Location,
  ) { }

  forgotpassword: FormGroup;

  ngOnInit(): void {
    this.isFromForgotMPIN = this.dataService.fromForgotMPIN;
    var route = this.constant.getPlatform() == 'web' ? "login" : "loginMobile"
    history.pushState({}, route, this.location.prepareExternalUrl(route));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
    this.dataService.changeMessage(this.commonPageComponent);
  }
  submitForm() {
    console.log("Formdata=========", this.forgotpassword.value)

    this.validateForm();
    if (this.forgotpassword.valid) {
      this.dataService.forgotPassUsername = this.forgotpassword.value.username;
      console.log('forgot password username: ', this.dataService.forgotPassUsername);
      this.forgotPassword()

      //this.router.navigateByUrl('/forgotPasswordAuth');

    }
  }
  buildForm() {
    this.forgotpassword = new FormGroup({
      username: new FormControl('', [Validators.required]),
      custId: new FormControl('', [Validators.required, Validators.pattern(/^(?!0{9})[0-9][0-9]{8}$/)]),
      accNo: new FormControl('', [Validators.required, Validators.pattern(/^(?!0{14})[0-9][0-9]{13}$/)]),
    });
  }
  validateForm() {
    if (this.forgotpassword.invalid) {
      this.forgotpassword.get('username').markAsTouched();
      return;
    }
  }

  goToLogin() {
    if (this.constant.getPlatform() == "web") {
      this.router.navigateByUrl("/login")
    }
    else {
      this.location.back();
    }
  }

  forgotPassword() {
      var param = this.forgotPasswordService.getForgotPassowrd(this.forgotpassword.value)
      let deviceID = this.constant.deviceID;
      this.forgotPasswordApiCall(param, deviceID);
  }

  forgotPasswordApiCall(param, deviceID) {
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_FORGOTPASSWORD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
        if (this.isFromForgotMPIN) {
          // this.dataService.forgotPassDtl = this.forgotpassword.value;
          this.dataService.forgotPassUsername = this.forgotpassword.value.username;
          this.router.navigateByUrl('/forgotMpinMob')
        } else {
          this.dataService.forgotPassDtl = this.forgotpassword.value;
          this.router.navigateByUrl('/forgotPasswordAuth');
        }
      }

    });
  }

  backToPrevPage() {
    this.location.back();
  }

}
