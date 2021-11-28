import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import {ForgotMpinService} from '../forgot-mpin/forgot-mpin.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-forgot-mpin',
  templateUrl: './forgot-mpin.component.html',
  styleUrls: ['./forgot-mpin.component.scss']
})
export class ForgotMpinComponent implements OnInit {
  otpForm: FormGroup;
  sessionDecryptKey: any;
  commonPageComponent = {
    'headerType': 'preloginHeaderomni',
    'sidebarNAv': 'none',
    'footer': 'innerFooter',
  }


  constructor( public DataService: DataService,private router: Router,
    private commonMethods: CommonMethods,
   public loader: pageLoaderService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private localStorage: LocalStorageService,
    public constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private forgotMpinService:ForgotMpinService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.commonPageComponent);
    this.buildForm();
  }
  buildForm() {


    this.otpForm = new FormGroup({
      MPIN1: new FormControl('', [Validators.required]),
      MPIN2: new FormControl('', [Validators.required]),
      MPIN3: new FormControl('', [Validators.required]),
      MPIN4: new FormControl('', [Validators.required]),
      MPIN5: new FormControl('', [Validators.required]),
      MPIN6: new FormControl('', [Validators.required]),
      RMPIN1: new FormControl('', [Validators.required]),
      RMPIN2: new FormControl('', [Validators.required]),
      RMPIN3: new FormControl('', [Validators.required]),
      RMPIN4: new FormControl('', [Validators.required]),
      RMPIN5: new FormControl('', [Validators.required]),
      RMPIN6: new FormControl('', [Validators.required]),
    });

  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  setMPIN()
  {
  this.getProfileUpdateChangeMPIN();

  }

  getProfileUpdateChangeMPIN()
  {
    var oldpassword=this.otpForm.value.MPIN1+this.otpForm.value.MPIN2+this.otpForm.value.MPIN3+this.otpForm.value.MPIN4+this.otpForm.value.MPIN5+this.otpForm.value.MPIN6;
    var newpassword=this.otpForm.value.RMPIN1+this.otpForm.value.RMPIN2+this.otpForm.value.RMPIN3+this.otpForm.value.RMPIN4+this.otpForm.value.RMPIN5+this.otpForm.value.RMPIN6;
    //var confirmpassword=this.mPinForm.value.confirmpassword1+this.mPinForm.value.confirmpassword2+this.mPinForm.value.confirmpassword3+this.mPinForm.value.confirmpassword4+this.mPinForm.value.confirmpassword5+this.mPinForm.value.confirmpassword6;
    console.log("oldpassword===",oldpassword);
    console.log("newpassword==",newpassword);


   var param=this.forgotMpinService.getProfileUpdateChangeMPINParam(this.otpForm.value)
   let deviceID = this.localStorage.getLocalStorage(this.constant.storage_deviceId);
   this.getProfileUpdateChangeMPINApiCall(param,deviceID)

  }
  getProfileUpdateChangeMPINApiCall(param,deviceID)
  {
   this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_CHANGEPINS).subscribe(data=>{
     console.log(data);
     var resp = data.responseParameter
       if (resp.opstatus == "00") {
         console.log(data.responseParameter);
         var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey,resp.Session);
         console.log('sessionKey', sessionKey);
         this.router.navigateByUrl('/forgotMpinSuccess');
         if(sessionKey == undefined || sessionKey == null || sessionKey == ""){
           showToastMessage("Invalid Credentials.", "error");
           return;
         }

       }

     });

  }
  
  goToLogin(){
    if(this.constant.getPlatform() == 'web'){
      this.router.navigateByUrl("/nliLanding");
    }
    else{
      this.router.navigateByUrl("/LandingPage");
    }
  }



}
