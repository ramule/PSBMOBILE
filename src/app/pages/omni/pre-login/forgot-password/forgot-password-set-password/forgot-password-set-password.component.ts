import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';

import {ForgotPasswordSetPasswordService} from '../forgot-password-set-password/forgot-password-set-password.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { AppConstants } from '../../../../../app.constant';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Location } from '@angular/common';


declare var showToastMessage: any;
@Component({
  selector: 'app-forgot-password-set-password',
  templateUrl: './forgot-password-set-password.component.html',
  styleUrls: ['./forgot-password-set-password.component.scss']
})
export class ForgotPasswordSetPasswordComponent implements OnInit {
  setPasswordForm:FormGroup;
  sessionDecryptKey: any;
  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter',
  }


  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    public  translate: TranslatePipe,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private localStorage: LocalStorageService,
    private encryptDecryptService:EncryptDecryptService,
    private forgotPasswordSetPasswordService:ForgotPasswordSetPasswordService,
    public location : Location,
    ) { }

  ngOnInit(): void {
    var route = this.constant.getPlatform()== 'web'? "login" : "loginMobile"
    history.pushState({}, this.dataService.previousPageUrl, this.location.prepareExternalUrl(this.dataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this. buildForm();
    this.dataService.changeMessage(this.commonPageComponent);
  }

  buildForm() {
    this.setPasswordForm = new FormGroup({

      setPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

  }
  submitForm(){
    console.log("Formdata=========",this.setPasswordForm.value)
    if(this.setPasswordForm.valid) {
        if(this.setPasswordForm.value.setPassword == this.setPasswordForm.value.confirmPassword) {
          this.setPassword();
        } else {
          showToastMessage('New and Confirm Password does not match', 'error');
        }
    } else {
      this.validateForm()
    }
  }

  validateForm() {
    if (this.setPasswordForm.invalid) {

      this.setPasswordForm.get('setPassword').markAsTouched();
      this.setPasswordForm.get('confirmPassword').markAsTouched();
      return;
    }
  }
  prevtab(){
    this.router.navigateByUrl('/ForgotPassword');
  }

  setPassword() {
    var param=this.forgotPasswordSetPasswordService.getSetForgoatPassword(this.setPasswordForm.value)
    //let deviceID = "9";
    let deviceID = this.constant.deviceID
    this.setPasswordApiCall(param,deviceID)
  }

  setPasswordApiCall(param,deviceID) {
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_UPDATELOGINDETAILS).subscribe(data=>{
    console.log(data);
    var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.router.navigateByUrl('/forgotPasswordSuccess');
      }
    });
  }

  goToLogin() {
    if(this.constant.getPlatform()== 'web'){
      this.router.navigateByUrl('/login');
    }
    else{
      this.location.back();
    }
  }

  passwordpolicy(){
    this.commonMethods.openPopup("div.password-popup")
  }
  closePopups(){
    this.commonMethods.closePopup("div.password-popup")
  
  }

  backToPrevPage(){
    this.location.back() ;
}

}

