import { Component, OnInit , ViewChildren} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { AppConstants } from '../../../../../app.constant';
import { RegistrationStatus } from '../../../../../utilities/app-enum'
import { Output, EventEmitter } from '@angular/core';
import {ForgotTpinUserAuthenticationService} from '../forgot-tpin-user-authentication/forgot-tpin-user-authentication.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-forgot-tpin-user-authentication',
  templateUrl: './forgot-tpin-user-authentication.component.html',
  styleUrls: ['./forgot-tpin-user-authentication.component.scss']
})
export class ForgotTpinUserAuthenticationComponent implements OnInit {

  @ViewChildren('cardPinRow') cardPinRows: any;
  @ViewChildren('expdateRow') expdateRows: any;
  @ViewChildren('debitcardRow') debitcardRows: any;

  carpinInput = ['cardPin1', 'cardPin2', 'cardPin3', 'cardPin4'];
  expdateInput = ['expDate1', 'expDate2' ,'expDate3' , 'expDate4'];
  debitCardInput = ['cardNumber1', 'cardNumber2', 'cardNumber3', 'cardNumber4']
  registrationFormstep2: FormGroup;
  bankTokenForm: FormGroup;
  chooseCredError: string = "";
  selectedButton: string = "debitCard";
  sessionDecryptKey: any;
  otpForm: FormGroup;


  commonPageComponent = {
    'headerType': 'preloginHeaderomni',
    'sidebarNAv': 'none',
    'footer': 'innerFooter',
  }


  public formErrorsDebitCard = {
    cardNumber1: '',
    cardNumber2: '',
    cardNumber3: '',
    cardNumber4: '',
    expDate1: '',
    expDate2: '',
    expDate3: '',
    expDate4: '',
    cardPin1: '',
    cardPin2: '',
    cardPin3: '',
    cardPin4: '',
  };

  public formErrorsBankToken = {
    bankToken: ''
  };

  constructor(
    private router: Router,
    private commonMethods: CommonMethods,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private localStorage: LocalStorageService,
    public constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private forgotTpinUserAuthenticationService:ForgotTpinUserAuthenticationService,

    ) { }

  ngOnInit(): void {
    this.initialization();
  }


  /** Initialization process */
  initialization() {
    //Set page common Components
    this.DataService.changeMessage(this.commonPageComponent);
    this.buildForm();
  }

  buildForm() {
    this.registrationFormstep2 = new FormGroup({
      cardNumber1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
      cardNumber2: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
      cardNumber3: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
      cardNumber4: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$")]),
      expDate1: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      expDate2: new FormControl('', [Validators.required,Validators.minLength(1)]),
      expDate3: new FormControl('', [Validators.required,Validators.minLength(1)]),
      expDate4: new FormControl('', [Validators.required,Validators.minLength(1)]),
      cardPin1: new FormControl('', [Validators.required,Validators.minLength(1)]),
      cardPin2: new FormControl('', [Validators.required,Validators.minLength(1)]),
      cardPin3: new FormControl('', [Validators.required,Validators.minLength(1)]),
      cardPin4: new FormControl('', [Validators.required,Validators.minLength(1)]),
    });

    this.otpForm = new FormGroup({
      mobile1: new FormControl('', [Validators.required]),
      mobile2: new FormControl('', [Validators.required]),
      mobile3: new FormControl('', [Validators.required]),
      mobile4: new FormControl('', [Validators.required]),
      mobile5: new FormControl('', [Validators.required]),
      mobile6: new FormControl('', [Validators.required]),
      email1: new FormControl('', [Validators.required]),
      email2: new FormControl('', [Validators.required]),
      email3: new FormControl('', [Validators.required]),
      email4: new FormControl('', [Validators.required]),
      email5: new FormControl('', [Validators.required]),
      email6: new FormControl('', [Validators.required]),
    });

    this.bankTokenForm = new FormGroup({
      bankToken: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }





  /**
   * for form validation
   */
   validatesForm(formType) {
    switch (formType) {
      case 'banktoken': {
        if (this.bankTokenForm.invalid) {
          this.formValidation.markFormGroupTouched(this.bankTokenForm);
        }


        break;
      }
      case 'debitCard': {
        if (this.registrationFormstep2.invalid) {
          this.formValidation.markFormGroupTouched(this.registrationFormstep2);
        }
        break;
      }
    }
  }


  /**
   * function call on submit button
   * choose customer registration type
   * on the basis of active slide respective form will be selected
   */

   submit() {
    this.chooseCredError = "";
    //this.nextEvent2.next(2);
    if ($("#banktoken").hasClass("active")) {
      this.validatesForm('banktoken');
      if (this.bankTokenForm.valid) {
         this.forgotTPINUsingBankToken()
        //this.router.navigateByUrl('/setForgotTpin')



      } else {
        this.formErrorsBankToken = this.formValidation.validateForm(this.bankTokenForm, this.formErrorsBankToken, true);
      }
    }
    else if ($("#debit-card").hasClass("active")) {
      this.validatesForm('debitCard');
      if (this.registrationFormstep2.valid) {
        this.forgotTPINUsingDebitcard();


      } else {
        this.formErrorsDebitCard = this.formValidation.validateForm(this.registrationFormstep2, this.formErrorsDebitCard, true);
      }
    }
    else {
      this.chooseCredError = "*Please choose channel to proceed"
    }
  }

  selectedUserAuth(type) {
    switch (type) {
      case 'banktoken': {
        this.selectedButton = "banktoken"
          this.forgotTPINUsingBankToken();
        break;
      }
      case 'debitCard': {
        this.selectedButton = "debitCard"
        break;
      }
    }
  }

  getSpasswordElement(index, type) {
    //console.log(this.mPinRows);
    if (index <= 3)
      if (type == 'cardpin') {
        return this.cardPinRows._results[index].nativeElement;
      }
      else if(type == 'debitcard'){
        return this.debitcardRows._results[index].nativeElement;
      } else {
        return this.expdateRows._results[index].nativeElement;
      }
  }

  onKeyUpEvent(index, event, type) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    var textlength = type == 'debitcard' ? 4 : 1;

    if (this.getSpasswordElement(index, type).value.length === textlength) {
      if (index !== 3) {
        if(type == 'expdate' && index == 1 ){
          var month = this.getSpasswordElement(0, type).value + this.getSpasswordElement(1, type).value;
          if(month > 12){
            this.registrationFormstep2.get(this.expdateInput[0]).setValue("");
            this.registrationFormstep2.get(this.expdateInput[1]).setValue("");
            this.getSpasswordElement(0, type).focus();
          }
          else{
            this.getSpasswordElement(index + 1, type).focus();
          }
        }
        else{
          this.getSpasswordElement(index + 1, type).focus();
        }
      }
      else {
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
        if(type == 'debitcard'){
          this.registrationFormstep2.get(this.debitCardInput[index]).setValue("");
        }
        else if (type == 'cardpin'){
          this.registrationFormstep2.get(this.carpinInput[index]).setValue("");
        }
        else{
          this.registrationFormstep2.get(this.expdateInput[index]).setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }
  }

  onFocusEvent(index, type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }


  forgotTPINUsingDebitcard() {
    let cardNumber = this.registrationFormstep2.value.cardNumber1 + this.registrationFormstep2.value.cardNumber2 + this.registrationFormstep2.value.cardNumber3 + this.registrationFormstep2.value.cardNumber4;
    let expDate = this.registrationFormstep2.value.expiry1 + this.registrationFormstep2.value.expiry2 + "-" + this.registrationFormstep2.value.expiry3 + this.registrationFormstep2.value.expiry4;
    let cardPin = this.registrationFormstep2.value.cardPin1 + this.registrationFormstep2.value.cardPin2 + this.registrationFormstep2.value.cardPin3 + this.registrationFormstep2.value.cardPin4;
    var param = this.forgotTpinUserAuthenticationService.getForgotTPINAuthforCardPram(this.registrationFormstep2.value,cardNumber,cardPin,expDate)
    let deviceID = this.constant.deviceID;
     this.forgotTPINforDebitcardApiCall(param, deviceID);
  }

  forgotTPINforDebitcardApiCall(param, deviceID) {
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_VERFYCREDNTIALS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.openPopup('otp');
        console.log(data.responseParameter);
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
        //this.router.navigateByUrl('/setForgotTpin');
        if (sessionKey == undefined || sessionKey == null || sessionKey == "") {
          showToastMessage("Invalid Credentials.", "error");
          return;
        }
      }
    });
  }

  forgotTPINUsingBankToken()
  {
    var param = this.forgotTpinUserAuthenticationService.getForgotTPINAuthforBankTokenPram(this.registrationFormstep2.value)
    let deviceID = this.constant.deviceID;
     this.forgotTPINforBankTokenApiCall(param, deviceID);
  }
  forgotTPINforBankTokenApiCall(param, deviceID) {
    this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_VERFYCREDNTIALS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
        this.router.navigateByUrl('/setForgotTpin');
        if (sessionKey == undefined || sessionKey == null || sessionKey == "") {
          showToastMessage("Invalid Credentials.", "error");
          return;
        }
      }
    });
  }

  validateOtp() {
    if (this.otpForm.valid) {
      var mobileOtp = this.otpForm.value.mobile1 + this.otpForm.value.mobile2 + this.otpForm.value.mobile3 + this.otpForm.value.mobile4 + this.otpForm.value.mobile5 + this.otpForm.value.mobile6;
      var emailOtp = this.otpForm.value.email1 + this.otpForm.value.email2 + this.otpForm.value.email3 + this.otpForm.value.email4 + this.otpForm.value.email5 + this.otpForm.value.email6;
      var refNo = "121212123434";
      let deviceID = this.constant.deviceID;
      var param = this.forgotTpinUserAuthenticationService.getChannelLeadOtpParam(mobileOtp, emailOtp, refNo);

      this.http.callBankingAPIService(param, deviceID, this.constant.serviceName_VALIDATECHANNELSPRELOGINOTP).subscribe(data => {
        console.log("=====validate otp=====", data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
           this.closePopup('otp');

          this.router.navigateByUrl("/setForgotTpin");
        }
        else {
         // this.errorCallBack(data.subActionId, resp);
        }
      });
    }
  }

  openPopup(popupName) {
    this.commonMethods.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName) {
    this.commonMethods.closePopup('div.popup-bottom.' + popupName);
  }

}



