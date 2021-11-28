import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { RegistrationUsernameService } from '../registration-username/registration-username.service';
import { AppConstants } from '../../../../../app.constant';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { FilterPipe } from 'src/app/pipes/custom-currency.pipe';
declare var showToastMessage: any;
declare var uniqueSq: any;

@Component({
  selector: 'app-registration-security-question',
  templateUrl: './registration-security-question.component.html',
  styleUrls: ['./registration-security-question.component.scss']
})
export class RegistrationSecurityQuestionComponent implements OnInit {
  commonPageComponent = {
    'headerType': 'none',
    'sidebarNAv': false,
    'footer': 'none',
  }
  public formErrorsstep4 = {
    quest1: '',
    quest2: '',
    quest3: '',
    ans1: '',
    ans2: '',
    ans3: '',
  };

  //listner for all focusout event
  @HostListener("focusout")
  onBlur() {
    //call form validarion on focus out
    this.formErrorsstep4 = this.formValidation.validateForm(this.registrationFormstep4, this.formErrorsstep4, true);
    //Set page header

  }


  securityQuesList = [];
  selected = [];


  registrationFormstep4: FormGroup;
  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private regVerifyService: RegistrationUsernameService,
    private constant: AppConstants,
    private storage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.initialization();
  }

  /**
   * Function called for initlaization purpose
   */
  initialization() {
    //Set page common Components
    // uniqueSq();
    this.DataService.changeMessage(this.commonPageComponent);
    console.log(this.DataService.registrationData)
    this.buildForm();
    this.bindForm();
    this.getSecurityQuestionLists();
    var self = this;
    // $("select").change(function() {   
    //   $("select").not(this).find("option[value="+ $(this).val() + "]").attr('disabled', "true");
    // }); 
    $('select').change(function () {
      if ($('select option[value="' + $(this).val() + '"]:selected').length > 1) {
        if ($(this).val() != '') {
          var id = $(this).attr('id');
          showToastMessage('You have already selected this question');
          $(this).val('');
          if (id == '1') {
            self.registrationFormstep4.patchValue({ quest1: '' });
          } else if (id == '2') {
            self.registrationFormstep4.patchValue({ quest2: '' });
          } else {
            self.registrationFormstep4.patchValue({ quest3: '' });
          }
        }
      }
    });
  }

  buildForm() {
    this.registrationFormstep4 = new FormGroup({
      quest1: new FormControl('', [Validators.required,]),
      ans1: new FormControl('', [Validators.required]),
      quest2: new FormControl('', [Validators.required]),
      ans2: new FormControl('', [Validators.required]),
      quest3: new FormControl('', [Validators.required]),
      ans3: new FormControl('', [Validators.required]),
    });

    this.registrationFormstep4.valueChanges.subscribe((data) => {
      this.formErrorsstep4 = this.formValidation.validateForm(this.registrationFormstep4, this.formErrorsstep4, true);
    });
  }

  bindForm() {
    this.registrationFormstep4.patchValue({
      quest1: this.DataService.regFeildData.quest1,
      ans1: this.DataService.regFeildData.ans1,
      quest2: this.DataService.regFeildData.quest2,
      ans2: this.DataService.regFeildData.ans2,
      quest3: this.DataService.regFeildData.quest3,
      ans3: this.DataService.regFeildData.ans3
    });
  }

  /**
   * Form Validation
   */
  validatesForm() {
    if (this.registrationFormstep4.invalid) {
      this.formValidation.markFormGroupTouched(this.registrationFormstep4);
      return;
    }
  }

  /**
   * On submit click this function is called
   */
  submitStep4() {
    this.validatesForm()
    if (this.registrationFormstep4.valid) {
      this.setSecurityQuestion(this.registrationFormstep4.value)
    } else {
      this.formErrorsstep4 = this.formValidation.validateForm(this.registrationFormstep4, this.formErrorsstep4, true);
    }
  }

  setSecurityQuestion(formData) {
    let paramReq = this.regVerifyService.setSecurityQuestionList(formData);
    this.http.callBankingAPIService(paramReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_INSERTSECURITYANSWER).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.router.navigateByUrl('/registrationTpin');
      }
      else {
        this.errorCallBack(data.subActionId, resp);
        // this.router.navigateByUrl('/registrationStep5');
      }
    });
  }

  getSecurityQuestionLists() {
    let paramReq = this.regVerifyService.getSecurityQuestionList()
    this.http.callBankingAPIService(paramReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETSECQUESTIONLIST).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.securityQuesList = data.listofDataset[0].records;
        this.securityQuesList.map((question, index) => {
          question.index = index;
          question.selecteindexdIn = + 1;
        });
        console.log('securityQuesList ', JSON.stringify(this.securityQuesList));

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
    if (resp.opstatus == "01" || resp.opstatus == "02" || resp.opstatus == "03") {
      showToastMessage(resp.Result, "error");
    }
  }

  getUniqueSecQues(quesID) {
   
  }

}
