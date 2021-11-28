import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { AppConstants } from '../../../../../app.constant';
import { RegistrationCustDetailsService } from './registration-cust-details.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { Output, EventEmitter } from '@angular/core';
import { RegistrationMobCheckService } from '../registration-mob-check/registration-mob-check.service';
import { RegistrationStatus } from '../../../../../utilities/app-enum';
import { OtpAPIService } from "../../otp/otp.service";
import { CommonMethods } from 'src/app/utilities/common-methods';
import { timer, Subscription } from "rxjs";
import { RegistrationStepsComponent } from '../registration-steps/registration-steps.component';
import { environment } from 'src/environments/environment.prod';
import { ThemeSettingsComponent } from 'src/app/pages/common-ui/theme-settings/theme-settings.component';
declare var showToastMessage: any;
declare var openModal: any;

@Component({
  selector: 'app-registration-cust-details',
  templateUrl: './registration-cust-details.component.html',
  styleUrls: ['./registration-cust-details.component.scss']
})
export class RegistrationCustDetailsComponent implements OnInit {
  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/registration'
  }
  public formErrorsstep1 = {
    mobNumber: '',
    custId: '',
    accNo: ''
  };
  registrationFormCustDtl: FormGroup;
  accountNumberLen:any;
  isReadOnly: any;
  platform:any;

  countDown: Subscription;
  counter = 120;
  tick = 1000;
  termsCondition : any = '' ;
  @Output() termsConditionEvent = new EventEmitter<number>();

  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private constant: AppConstants,
    private regServices: RegistrationCustDetailsService,
    private localStorage: LocalStorageService,
    private registrationService : RegistrationMobCheckService,
    private otpAPIService : OtpAPIService,
    private commonMethods : CommonMethods,
    public regSteps: RegistrationStepsComponent,
    private otpService : OtpAPIService
    ) { }


  ngOnInit(): void {
      //Set page common Components
      this.isReadOnly = this.constant.getPlatform();
      this.DataService.changeMessage(this.commonPageComponent);
      this.setDefaultValue()
      this.buildForm();
      this.bindForm();
      console.log("inisede");
  }

  setDefaultValue(){
    this.DataService.regFeildData = {
      custId: '',
      accNo: '',
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
      ibUserName: '',
      ibPassword: '',
      ibmpin: '',
      bankToken: '',
      username: '',
      password: '',
      confPassword: '',
      quest1: '',
      ans1: '',
      quest2: '',
      ans2: '',
      quest3: '',
      ans3: '',
      tpin: '',
      confTpin: '',
      mpin1: '',
      mpin2: '',
      mpin3: '',
      mpin4: '',
      mpin5: '',
      mpin6: '',
      confMpin1: '',
      confMpin2: '',
      confMpin3: '',
      confMpin4: '',
      confMpin5: '',
      confMpin6: '',
    };
  }

  otpPopup(){
    this.regSteps.timerCounter()
    // openModal("#numberConfirmation" , 'show');
    this.commonMethods.openPopup("#numberConfirmation");
  }
  /**
   * form intiallization
   */
  buildForm() {
    this.accountNumberLen = this.constant.val_accountNumberLength;


    this.registrationFormCustDtl = new FormGroup({
      mobNumber: new FormControl('',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.minLength(10)]),
      // custId: new FormControl('', [Validators.required,Validators.pattern(/^(?!0{9})[0-9][0-9]{9}$/)]),
      custId: new FormControl('', [Validators.required,  Validators.maxLength(9)]),
      // accNo: new FormControl('', [Validators.required, Validators.pattern(/^(?!0{14})[0-9][0-9]{13}$/)]),
      accNo: new FormControl('', [Validators.required, Validators.maxLength(14)]),
      email: new FormControl('', [Validators.pattern(this.constant.email_regex),Validators.required]),
      migrated: new FormControl(''),
      termCondition: new FormControl('', [Validators.required])
    })


  //   if(environment.production){
  //   this.registrationFormCustDtl = new FormGroup({
  //     mobNumber: new FormControl('',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.minLength(10)]),
  //     custId: new FormControl('', [Validators.required,Validators.pattern(/^(?!0{9})[0-9][0-9]{8}$/)]),
  //     accNo: new FormControl('', [Validators.required, Validators.pattern(/^(?!0{14})[0-9][0-9]{13}$/)]),
  //     email: new FormControl('', [Validators.pattern(this.constant.email_regex),Validators.required]),
  //     migrated: new FormControl('')
  //   })
  // }else{
  //   this.registrationFormCustDtl = new FormGroup({
  //     mobNumber: new FormControl('9988600012',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.minLength(10)]),
  //     custId: new FormControl('011153784', [Validators.required,Validators.pattern(/^(?!0{9})[0-9][0-9]{8}$/)]),
  //     accNo: new FormControl('08341100000061', [Validators.required, Validators.pattern(/^(?!0{14})[0-9][0-9]{13}$/)]),
  //     email: new FormControl('gurpreet.singh@psb.co.in', [Validators.pattern(this.constant.email_regex),Validators.required]),
  //     migrated: new FormControl('')
  //   })
  // }


    this.registrationFormCustDtl.valueChanges.subscribe((data) => {
      this.formErrorsstep1 = this.formValidation.validateForm(this.registrationFormCustDtl, this.formErrorsstep1, true);
    });
  }

  testFunction(){
    this.nextEvent.next(this.DataService.regIsAtStep);
  }

  bindForm(){
    if(this.isReadOnly != 'web'){
      this.registrationFormCustDtl.patchValue({
      mobNumber: this.localStorage.getLocalStorage(this.constant.storage_mobileNo)
    })
    }
  }

  validatesForm() {
    if (this.registrationFormCustDtl.invalid) {
      this.formValidation.markFormGroupTouched(this.registrationFormCustDtl);
      return;
    }
  }

  /**
   * operation to be performed on account information is submited
   */
  @Output() nextEvent = new EventEmitter<number>();
  submit(){
    this.validatesForm();
    if(this.registrationFormCustDtl.valid){
      var regStatus = this.isValidAccStatusFrmNo(this.registrationFormCustDtl.value.accNo);

      if(regStatus){
        this.DataService.regFeildData.custId = this.registrationFormCustDtl.value.custId;
        this.DataService.regFeildData.accNo = this.registrationFormCustDtl.value.accNo;
        this.DataService.email = this.registrationFormCustDtl.value.email.toLowerCase();
        this.DataService.isMigratedUser = this.registrationFormCustDtl.value.migrated;
        this.localStorage.setLocalStorage(this.constant.storage_mobileNo, this.registrationFormCustDtl.value.mobNumber);
        console.log(this.DataService.isMigratedUser)
        if(this.constant.getPlatform() == "web"){
          let _param = this.regServices.getValidateCustDtlParam(this.DataService.regFeildData.custId,this.DataService.regFeildData.accNo,this.DataService.email.toLowerCase() , this.constant.deviceID);
          this.updateCustDtlApiCall(_param);
        }
        else{
          let _param = this.regServices.getValidateCustDtlMobParam(this.DataService.regFeildData.custId,this.DataService.regFeildData.accNo,this.DataService.email.toLowerCase() , this.localStorage.getLocalStorage("deviceId"));
          this.updateCustDtlApiCall(_param);
        }

      }
      else{
        this.commonMethods.openPopup('div.popup-bottom.show-valid-acc')
      }
    }else{
      this.formErrorsstep1 = this.formValidation.validateForm(this.registrationFormCustDtl, this.formErrorsstep1, true);
    }
  }


  isValidAccStatusFrmNo(accNo){
    var validAccStatus = false;
    switch(this.DataService.regType){
      case 'retail':
        validAccStatus = (accNo.slice(4,6) == "10" || accNo.slice(4,6) == "11" || accNo.slice(4,6) == "13" || accNo.slice(4,6) == "16" )
        break;
      case 'loan':
        validAccStatus = accNo.slice(4,6) == "12"
        break;
      case 'nri':
        validAccStatus = (accNo.slice(4,6) == "10" || accNo.slice(4,6) == "11" || accNo.slice(4,6) == "20" || accNo.slice(4,6) == "21" || accNo.slice(4,6) == "30" || accNo.slice(4,6) == "31" )
        break;
    }
    return validAccStatus;
  }


  /**
   * api call to validate mobile number
   * @param
   */
  // mobileNoCheckApiCall(param) {

  //   this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_MOBILENOCHECK).subscribe(data => {
  //     console.log(data);
  //     var resp = data.responseParameter
  //     if (resp.opstatus == "00") {
  //       console.log(data.responseParameter);
  //       /*****  *****/
  //       this.localStorage.setLocalStorage(this.constant.storage_mobileNo, this.registrationFormCustDtl.value.mobNumber);
  //       this.localStorage.setLocalStorage("deviceId", data.responseParameter.deviceId);

  //       this.DataService.registrationData = data.responseParameter;
  //       this.DataService.registrationSecQue = data.set != undefined ? data.set?.records[0]: '';

  //       this.DataService.mobStaticEncKey = this.localStorage.getLocalStorage("mobileNo") + this.constant.mapEncryptKey
  //       this.DataService.userRegStaus = this.DataService.registrationData.RegistrationSuccess;
  //       this.DataService.pendingAtToken  = false
  //       var otpNextPage;
  //       this.DataService.regIsAtStep = 1;

  //       // switch (this.DataService.userRegStaus) {
  //       //   case RegistrationStatus.PENDING_AT_CUSTOMER_DETL: {
  //       //     console.log("PENDING_AT_CUSTOMER_DETL","registrationStep1");
  //       //     this.DataService.isFromOmniReg.isStepI = false;
  //       //     otpNextPage = "/registration";
  //       //     this.DataService.regIsAtStep = 1;
  //       //     break;
  //       //   }
  //       //   case RegistrationStatus.PENDING_AT_VALDATE_REG_DET: {
  //       //     console.log("PENDING_AT_VALDATE_REG_DET","registrationStep2");
  //       //     this.DataService.isFromOmniReg.isStepII = false;
  //       //     otpNextPage = "/registration";
  //       //     this.DataService.regIsAtStep = 2;
  //       //     break;
  //       //   }
  //       //   case RegistrationStatus.PENDING_AT_USERNAME: {
  //       //     console.log("PENDING_AT_USERNAME","registrationStep3");
  //       //     this.DataService.isFromOmniReg.isStepIII = false;
  //       //     otpNextPage = "/registration";
  //       //     this.DataService.regIsAtStep = 3;
  //       //     break;
  //       //   }
  //       //   case RegistrationStatus.PENDING_AT_VERIFY_TOKEN: {
  //       //     console.log("PENDING_AT_VERIFY_TOKEN","registrationStep2");
  //       //     otpNextPage = "/registration";
  //       //     this.DataService.isFromOmniReg.isStepII = false;
  //       //     this.DataService.pendingAtToken = true;
  //       //     this.DataService.regIsAtStep = 2;
  //       //     this.DataService.pendingAtToken = true;
  //       //     break;
  //       //   }
  //       //   case RegistrationStatus.PENDING_AT_UPI: {
  //       //     console.log("PENDING_AT_SECURITY_QUE","registrationStep4");
  //       //     otpNextPage = "/registration";
  //       //     this.DataService.isFromOmniReg.isStepIV = false;
  //       //     this.DataService.regIsAtStep = 4;
  //       //     break;
  //       //   }
  //       //   case RegistrationStatus.PENDING_AT_TPIN: {
  //       //     console.log("PENDING_AT_TPIN","registrationStep5");
  //       //     otpNextPage = "/registration";
  //       //     this.DataService.isFromOmniReg.isStepV = false;
  //       //     this.DataService.regIsAtStep = 5;
  //       //     break;
  //       //   }
  //       //   case RegistrationStatus.PENDING_AT_UPDTE_REG: {
  //       //     console.log("PENDING_AT_UPDTE_REG","registrationStep6");
  //       //     otpNextPage = "/registration";
  //       //     //otpNextPage = "/registrationStep6";
  //       //     this.DataService.isFromOmniReg.isStepVI = false;
  //       //     this.DataService.regIsAtStep = 6;
  //       //     break;
  //       //   }
  //       //   case RegistrationStatus.ALREADY_REGISTERED: {
  //       //     this.DataService.isFromOmniReg.isAlreadyRegister = true;
  //       //     otpNextPage = "/registration";
  //       //     console.log("PENDING_AT_UPDTE_REG");
  //       //     otpNextPage = "/alreadyRegistered";
  //       //     //otpNextPage = "/registrationValidateRegDetails";//TODO:for testing
  //       //     break;
  //       //   }
  //       //   default: {
  //       //     otpNextPage = "/registration";
  //       //     this.DataService.regIsAtStep = 1;
  //       //     break;
  //       //   }
  //       // }

  //       if(this.constant.getPlatform() == "web"){
  //         this.DataService.maskRegisternumber = this.commonMethods.maskNumber(this.localStorage.getLocalStorage("mobileNo"));
  //         this.counter = 120;
  //         if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
  //         this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
  //         this.otpPopup();

  //         // //api call to get otp
  //         // var otpParam =  this.otpAPIService.getResendOTPReq();
  //         // //this.nextEvent.next(4);
  //         // this.http.callBankingAPIService(otpParam, this.localStorage.getLocalStorage("deviceId"), this.constant.serviceName_RESENDOTP).subscribe(data => {
  //         //   var _resp = data.responseParameter
  //         //   if (_resp.opstatus == "00") {
  //         //     this.DataService.maskRegisternumber = this.commonMethods.maskNumber(this.localStorage.getLocalStorage("mobileNo"));

  //         //     this.counter = 120;
  //         //     if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
  //         //     this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });

  //         //     this.otpPopup();
  //         //   }
  //         //   else{
  //         //     this.errorCallBack(data.subActionId, _resp);
  //         //   }
  //         // })
  //       }
  //       else{
  //         this.testFunction();
  //       }


  //       /***** Navigate to respective page ******/
  //       // this.DataService.otpPreviousPage = "/registrationMobCheck";
  //       // this.DataService.otpNextPage = "/registration";
  //       // this.router.navigate(['/otp']);
  //     }
  //     else {
  //       this.errorCallBack(data.subActionId, resp);
  //     }
  //   });
  // }

  /**
   * operation to be performed on back button click
   */
  cancel(){
    if(this.constant.getPlatform() == "web"){
      this.router.navigateByUrl('/nliLanding');
    }else{
      this.router.navigateByUrl('/LandingPage');
    }
  }

  /**
   * update customer detail api is called
   * @param
   */
  updateCustDtlApiCall(param){

    var url = '';
    var deviceID = '';
    if(this.constant.getPlatform() == "web"){
      url = this.constant.serviceName_CIFACCOUNTMOBILECHECK;
      deviceID = this.constant.deviceID;
    }else{
      url = this.constant.serviceName_CUSTACCOUNTVALIDATION;
      deviceID = this.localStorage.getLocalStorage("deviceId");
    }

    this.http.callBankingAPIService(param, deviceID , url).subscribe(data => {
      console.log(JSON.stringify(data));
      var resp = data.responseParameter
      if (resp.opstatus == "00") {

        var isValidCustomer = this.isValidAccStatusFrmScheme(data.set?.records[0].schemeCode);
        if(isValidCustomer){
          if(this.constant.getPlatform() == "web"){
            this.proceedWithRegistration(data)
          }
          else{
            this.testFunction();
          }
        }
        else{
          this.commonMethods.openPopup('div.popup-bottom.show-valid-acc')
        }

      } else  if (resp.opstatus == "02") {
        if(this.constant.getPlatform() == "web"){
          if(resp.omniRegistrationStatus.toUpperCase() == 'N'){
            this.proceedWithRegistration(data,true)
          }
          else{
            this.DataService.errorMsg = resp.Result;
            this.commonMethods.openPopup('div.popup-bottom.show-valid-user')
          }
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  proceedWithRegistration(data,isOTPRequired?){
    
    this.localStorage.setLocalStorage("deviceId", data.responseParameter.deviceId);

    this.DataService.registrationData = data.responseParameter;
    this.DataService.registrationSecQue = data.set != undefined ? data.set?.records[0]: '';

    this.DataService.mobStaticEncKey = this.localStorage.getLocalStorage("mobileNo") + this.constant.mapEncryptKey
    this.DataService.userRegStaus = this.DataService.registrationData.RegistrationSuccess;
    this.DataService.pendingAtToken  = false
    var otpNextPage;
    this.DataService.regIsAtStep = 1;

    this.DataService.maskRegisternumber = this.commonMethods.maskNumber(this.localStorage.getLocalStorage("mobileNo"));
    if(isOTPRequired){
      this.resendOtp();
    }else{
      this.openOTPModal();
    }
  }

  openOTPModal(){
    this.counter = 120;
    if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
    this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
    this.otpPopup();
  }


  

  resendOtp(){
    //api call to get otp
    var otpParam =  this.otpService.getResendOTPReq();
    this.http.callBankingAPIService(otpParam, this.localStorage.getLocalStorage("deviceId"), this.constant.serviceName_RESENDOTP).subscribe(data => {
      var _resp = data.responseParameter
      if (_resp.opstatus == "00") {
        this.openOTPModal();
      }
      else{
        this.errorCallBack(data.subActionId, _resp);
      }
    })
  }

  isValidAccStatusFrmScheme(schemeCode){
    var validAccStatus = false;
    switch(this.DataService.regType){
      case 'loan':
        validAccStatus = true;
        break;
      case 'retail':
        validAccStatus = (schemeCode != "CAPPI" && schemeCode != "SBNRE" && schemeCode != "SBNRO" && schemeCode != "CANRE" && schemeCode != "CANRO" && schemeCode != "CCAGR" && schemeCode != "SBSRL" && schemeCode != "SBDCT" && schemeCode != "SBBAS" && schemeCode != "SBFIN" && schemeCode != "SBFIB" && schemeCode != "SBKID")
        break;
      case 'nri':
        validAccStatus = (schemeCode == "SBNRE" || schemeCode == "SBNRO" || schemeCode == "CANRE" || schemeCode == "CANRO")
        break;
    }
    return validAccStatus;
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result,"error");
    if(resp.opstatus == "04"){
      console.log("redirect to bank account page");
    }
  }


  closePopup(popopName){
    this.commonMethods.closePopup(popopName);
  }

  openPopUp(){
    this.termsCondition = 'termsConditionRegistration'
    this.termsConditionEvent.next( this.termsCondition)
    
  }

}

