import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { DatePipe } from '@angular/common';
import {ForgotUsernameService} from '../forgot-username/forgot-username.service'
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { AppConstants } from '../../../../../app.constant';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.scss']
})
export class ForgotUsernameComponent implements OnInit {
  sessionDecryptKey: any;
  todayDate: any;

  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/ForgotUsername'
  }

  constructor(private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    public commonMethod: CommonMethods,
    private form: FormBuilder,
    private http: HttpRestApiService,
    private dataService: DataService,
    private forgotUserNameService:ForgotUsernameService,
    public  translate: TranslatePipe,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private formValidation: FormValidationService,
    public datePipe: DatePipe,
    private location : Location,
    private constant: AppConstants,) { }

    forgotUsernameForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var route = this.constant.getPlatform()== 'web'? "login" : "loginMobile";
    this.dataService.changeMessage(this.commonPageComponent);
    history.pushState({}, route, this.location.prepareExternalUrl(route));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    // this.getMaskedDetails()
  }
  submitForm(){
    console.log("Formdata=========",this.forgotUsernameForm.value)

    if(this.forgotUsernameForm.valid){
      this.forgotUserName();
    }
    else {
      this.validateForm()
    }
  }
  validateForm() {
    if (this.forgotUsernameForm.invalid) {
      this.forgotUsernameForm.get('customerID').markAsTouched();
      this.forgotUsernameForm.get('mobile').markAsTouched();
      this.forgotUsernameForm.get('dob').markAsTouched();
      return;
    }
  }

  buildForm() {
      this.forgotUsernameForm = new FormGroup({
        customerID: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(4)]),
        mobile : new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
        dob: new FormControl('', [Validators.required]),
      });
  }
  onDateChange(date)
  {

  }

  goToLogin(){
    if(this.constant.getPlatform()=="web"){
      this.router.navigateByUrl('/login');
    }
    else{
      this.location.back();
    }
  }

  forgotUserName()
  {
    var param=this.forgotUserNameService.getForgotUserName(this.forgotUsernameForm.value)
    let deviceID = this.constant.deviceID;
    this.forgotUserNameApiCall(param,deviceID)
  }

  forgotUserNameApiCall(param,deviceID)
  {
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_FORGOTUSERNAME).subscribe(data=>{
    console.log(data);
    var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.DataService.refId = data.RRN;
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
        this.router.navigateByUrl('/usernameSuccess');


      }

    });
  }

  backToPrevPage(){
    this.location.back() ;
  }
}
