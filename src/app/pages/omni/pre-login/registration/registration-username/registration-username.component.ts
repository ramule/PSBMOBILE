import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { PasswordStrengthValidator } from '../../../../../utilities/password-strength.validators';
import { RegistrationUsernameService } from './registration-username.service';
import { AppConstants } from '../../../../../app.constant';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { Output, EventEmitter } from '@angular/core'; 
import { CommonMethods } from '../../../../../utilities/common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-registration-username',
  templateUrl: './registration-username.component.html',
  styleUrls: ['./registration-username.component.scss']
})
export class RegistrationUsernameComponent implements OnInit {
  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/registration'
  }
  public formErrorsstep3 = {
    username: '',
    password: '',
    confPassword: ''
  };

    //listner for all focusout event
    @HostListener("focusout")
    onBlur() {
      //call form validarion on focus out
      this.formErrorsstep3 = this.formValidation.validateForm(this.registrationFormstep3, this.formErrorsstep3, true);
      //Set page header
  
    }
    @Output() nextEvent2 = new EventEmitter<number>();
    @Output() prevEvent = new EventEmitter<number>();
  registrationFormstep3: FormGroup;
    isuserNameVerfied: any;
    userAvailabilityChecked:boolean = false; 
    notclickedflag:boolean = false
    isuseravailable:boolean = false;
    custNumber: any 
    
  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private regVerifyService: RegistrationUsernameService,
    private constant:AppConstants,
    private commonMethod:CommonMethods,
    private storage : LocalStorageService) { }

  ngOnInit(): void {
    this.initialization();
  }

  /** Initialization process */
  initialization() {
    //Set page common Components
    this.DataService.changeMessage(this.commonPageComponent);
    console.log(this.DataService.registrationData)
    this.buildForm();
    this.bindForm();
  }


  bindForm(){
    this.registrationFormstep3.patchValue({
      username: this.DataService.regFeildData.username,
      password: this.DataService.regFeildData.password,
      confPassword: this.DataService.regFeildData.confPassword
    });
  }

  /**
   * Function for building the reactive forms
   */
  buildForm() {
    this.registrationFormstep3 = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),Validators.minLength(8),Validators.maxLength(20)]),
      confPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
    },{
      validators: [this.password.bind(this)]
    });

    this.registrationFormstep3.valueChanges.subscribe((data) => {
      this.formErrorsstep3 = this.formValidation.validateForm(this.registrationFormstep3, this.formErrorsstep3, true);
    });


  }
  
  validatesForm() {
    if (this.registrationFormstep3.invalid) {
      this.formValidation.markFormGroupTouched(this.registrationFormstep3);
      return;
    }
  }

  submitStep3() {
    this.validatesForm();
    if (this.registrationFormstep3.valid) {
     
        if(this.userAvailabilityChecked){
          this.updateUserDetails(this.registrationFormstep3.value);
        }
      else{
        this.notclickedflag = true
      }
      //this.nextEvent2.next(3);
    } else {
      this.formErrorsstep3 = this.formValidation.validateForm(this.registrationFormstep3, this.formErrorsstep3, true);
    }
  }
  cancelbtn(){
    
    this.prevEvent.next(3);
  }

   /**
   * Validation if password & confirm password doesn't match
   * @param formGroup 
   */
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confPassword } = formGroup.get('confPassword');
    return password === confPassword ? null : { passwordNotMatch: true };
  }

   /**
   * This function is invoked to update the user details for login
   * @param formdata 
   * @param channelType 
   */
  updateUserDetails(formdata) {
    //update login details request
    let paramReq = this.regVerifyService.getUpdateLoginDetailsParam(formdata)
    this.http.callBankingAPIService(paramReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_UPDATELOGINDETAILS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.DataService.regFeildData.username = this.registrationFormstep3.value.username,
        this.DataService.regFeildData.password = this.registrationFormstep3.value.password,
        this.DataService.regFeildData.confPassword = this.registrationFormstep3.value.confPassword
        console.log(data.responseParameter);
        // this.router.navigateByUrl('/registrationSecurityQuestion');
        this.nextEvent2.next(3);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

    /**
 * function to called on unsuccessfull responce
 * @subActionId
 * @resp
 */
errorCallBack(subActionId, resp) {
  if (resp.opstatus == "02" || resp.opstatus == "03") {
 
  }
}
onUserChange(value){
  
  this.isuserNameVerfied=false;
  this.isuseravailable = false
this.userAvailabilityChecked = false;
}
  checkAvailability(){
    let paramReq = this.regVerifyService.getCheckAvaiablityParam(this.registrationFormstep3.value.username)
  
    this.userAvailabilityChecked = true
    this.notclickedflag = false;
    this.http.callBankingAPIService(paramReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CHECKOMNIUSERNAME).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.isuserNameVerfied = true;
        this.isuseravailable = false
      }
      else {
        if(!this.isuserNameVerfied){
          this.isuseravailable = true;
        
        }else{
          this.isuseravailable = false;
       
        }
      }
    });
  }

  usernamepolicy(){
    this.commonMethod.openPopup("div.username-popup")
  }

  passwordpolicy(){
    this.commonMethod.openPopup("div.password-popup")
  }


}
