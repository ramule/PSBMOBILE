import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { ResistrationMpinValidateUserService } from './resistration-mpin-validate-user.service';
import { RegistrationValidateRegService } from '../registration-validate-reg-details/registration-validate-reg-details.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-registration-mpin-validate-user',
  templateUrl: './registration-mpin-validate-user.component.html',
  styleUrls: ['./registration-mpin-validate-user.component.scss']
})
export class RegistrationMpinValidateUserComponent implements OnInit {

  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/registration'
  }
  public formErrorValidateUser = {
    userName: '',
    password: '',
  };

  registrationFormValidateUser: FormGroup; 
  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private validateUserService: RegistrationValidateRegService
    ) { }

  ngOnInit(): void {
      //Set page common Components
     
      if( window.innerWidth < 767){
         
        this.commonPageComponent = {
          'headerType': 'preloginHeader',
          'sidebarNAv': false,
          'footer': 'innerFooter',
          'currentpageRoute': '/registration'
         
        }
    }
      this.DataService.changeMessage(this.commonPageComponent);
      console.log(this.DataService.registrationData)
      this.buildForm();
  }
  buildForm() {
    this.registrationFormValidateUser = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
     
    });

    this.registrationFormValidateUser.valueChanges.subscribe((data) => {
      this.formErrorValidateUser = this.formValidation.validateForm(this.registrationFormValidateUser, this.formErrorValidateUser, true);
    });
  }


  validatesForm() {
    if (this.registrationFormValidateUser.invalid) {
      this.formValidation.markFormGroupTouched(this.registrationFormValidateUser);
      return;
    }
  }

  submit(){
    this.validatesForm()
    if(this.registrationFormValidateUser.valid){
      console.log(this.registrationFormValidateUser.value);
      let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId)
      var param = this.validateUserService.getValidateCredentialsParam(this.registrationFormValidateUser.value);
      this.validateUserDetails(param,deviceId);
    }else{
      this.formErrorValidateUser = this.formValidation.validateForm(this.registrationFormValidateUser, this.formErrorValidateUser, true);
    }
  }

  validateUserDetails(param,deviceId){
    this.http.callBankingAPIService(param, deviceId, this.constant.serviceName_VERFYCREDNTIALS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.DataService.isFromMpinLogin = true;
        this.router.navigate(['/registrationMpin']);
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
      showToastMessage(resp.Result,"error");
  }

}
