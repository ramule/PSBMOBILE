import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { RegistrationMobCheckService } from './registration-mob-check.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { AppConstants } from '../../../../../app.constant';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { RegistrationStatus } from '../../../../../utilities/app-enum'
import { CommonMethods } from 'src/app/utilities/common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-registration-mob-check',
  templateUrl: './registration-mob-check.component.html',
  styleUrls: ['./registration-mob-check.component.scss']
})
export class RegistrationMobCheckComponent implements OnInit {
  registrationForm: FormGroup;
  mobileNumber: null;
  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/registrationMobCheck'
  }
  public formErrors = {
    mobNumber: ''
  };

  //private regStatus: RegistrationStatus

  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private registrationService: RegistrationMobCheckService,
    private constant: AppConstants,
    public localStorage: LocalStorageService,
    private formValidation: FormValidationService,
    public commonMethod : CommonMethods
  ) { }

  ngOnInit(): void {
    this.buildForm()
    //this.mobileNumber = this.DataService.registrationData.mobnumber
    this.registrationForm.controls['mobNumber'].setValue(this.mobileNumber);
    //Set page common Components
    this.DataService.changeMessage(this.commonPageComponent);
  }



  buildForm() {
    this.registrationForm = new FormGroup({
      mobNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]),
    }, {
      validators: [this.isValidMobileNo.bind(this)]
    });
  }

  validateForm() {
    this.registrationForm.get('mobNumber').markAsTouched();
    this.formErrors = this.formValidation.validateForm(this.registrationForm, this.formErrors, true);
    return;
  }

  /**
   * function to be called on submit registration
   */
  submitregistration() {
    this.validateForm()
    if (!this.registrationForm.invalid) {

      console.log(this.registrationForm.value)
      this.mobileNumber = this.registrationForm.value.mobNumber;
      var param = this.registrationService.getmobileNoCheckParam(this.registrationForm.value);
      this.mobileNoCheckApiCall(param);
    }
  }


  ngOnDestroy() {
    //this.DataService.registrationData = this.mobileNumber;
  }

  /**
   * api call to validate mobile number
   * @param
   */
  mobileNoCheckApiCall(param) {
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_MOBILENOCHECK).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.DataService.registrationData = data.responseParameter;
        this.DataService.registrationSecQue = data.set != undefined ? data.set?.records[0]: '';
        //TODO: binding records is not required now
        // back button is hidden for onmi channel
        //this.bindExistingRecord(this.DataService.registrationData,JSON.stringify(this.DataService.registrationSecQue));
        this.localStorage.setLocalStorage(this.constant.storage_mobileNo, this.mobileNumber);
        this.localStorage.setLocalStorage(this.constant.storage_deviceId, data.responseParameter.deviceId);
        this.DataService.mobStaticEncKey = this.localStorage.getLocalStorage(this.constant.storage_mobileNo) + this.constant.mapEncryptKey

        /***** get pending state and naviagte to respective page  ******/
        /* If a user left registration in middile then when return,
            will navigate to the screen he left
            @IBRegistrationSuccess :- status for internet banking
            @MOBRegistrationSuccess :- status for mobile banking
        */
       //TODO : Change this later
       /*
       this.constant.getEntityId() == this.constant.val_entityIDMob ? this.DataService.registrationData.MOBRegistrationSuccess : this.DataService.registrationData.RegistrationSuccess
       */
       this.DataService.userRegStaus = this.DataService.registrationData.RegistrationSuccess;
        var otpNextPage: string = '';

        otpNextPage = "/registration";
        switch (this.DataService.userRegStaus) {
          case RegistrationStatus.ALREADY_REGISTERED: {
            console.log("PENDING_AT_UPDTE_REG");
            this.localStorage.setLocalStorage(this.constant.storage_omniRegisteredUser, "true");
            if (this.constant.getPlatform() == "web") {
              otpNextPage = "/login";
            }
            else {
              otpNextPage = "/loginMobile";
            }
            break;
          }
          case RegistrationStatus.USER_BLOCKED: {
            this.commonMethod.openPopup('div.popup-bottom.blocked-user');
            otpNextPage = "";
            break;
          }
          default: {
            this.DataService.regIsAtStep = 1;
            otpNextPage = "/registration";
            break;
          }
      }

        // switch (this.DataService.userRegStaus) {
        //   case RegistrationStatus.PENDING_AT_CUSTOMER_DETL: {
        //     console.log("PENDING_AT_CUSTOMER_DETL");
        //     //otpNextPage = "/registrationStep1";
        //     otpNextPage = "/registration";
        //     this.DataService.isFromOmniReg.isStepI = false;
        //     this.DataService.regIsAtStep = 1;
        //     break;
        //   }
        //   case RegistrationStatus.PENDING_AT_VALDATE_REG_DET: {
        //     console.log("PENDING_AT_VALDATE_REG_DET");
        //     //otpNextPage = "/registrationStep2";
        //     otpNextPage = "/registration";
        //     this.DataService.isFromOmniReg.isStepII = false;
        //     this.DataService.regIsAtStep = 2;
        //     break;
        //   }
        //   case RegistrationStatus.PENDING_AT_USERNAME: {
        //     console.log("PENDING_AT_USERNAME");
        //     //otpNextPage = "/registrationStep3";
        //     otpNextPage = "/registration";
        //     this.DataService.isFromOmniReg.isStepIII = false;
        //     this.DataService.regIsAtStep = 3;
        //     break;
        //   }
        //   case RegistrationStatus.PENDING_AT_VERIFY_TOKEN: {
        //     console.log("PENDING_AT_VERIFY_TOKEN");
        //     //otpNextPage = "/registrationStep2";
        //     otpNextPage = "/registration";
        //     this.DataService.isFromOmniReg.isStepII = false;
        //     this.DataService.regIsAtStep = 2;
        //     this.DataService.pendingAtToken = true;
        //     break;
        //   }
        //   case RegistrationStatus.PENDING_AT_UPI: {
        //     console.log("PENDING_AT_SECURITY_QUE");
        //     //otpNextPage = "/registrationStep4";
        //     otpNextPage = "/registration";
        //     this.DataService.isFromOmniReg.isStepIV = false;
        //     this.DataService.regIsAtStep = 4;
        //     break;
        //   }
        //   case RegistrationStatus.PENDING_AT_TPIN: {
        //     console.log("PENDING_AT_TPIN");
        //     // otpNextPage = "/registrationStep5";
        //     otpNextPage = "/registration";
        //     this.DataService.isFromOmniReg.isStepV = false;
        //     this.DataService.regIsAtStep = 5;
        //     break;
        //   }
        //   case RegistrationStatus.PENDING_AT_UPDTE_REG: {
        //     console.log("PENDING_AT_UPDTE_REG");
        //     //otpNextPage = "/registrationStep6";
        //     otpNextPage = "/registration";
        //     this.DataService.isFromOmniReg.isStepVI = false;
        //     this.DataService.regIsAtStep = 6;
        //     break;
        //   }
        //   case RegistrationStatus.ALREADY_REGISTERED: {
        //     console.log("PENDING_AT_UPDTE_REG");
        //     otpNextPage = "/alreadyRegistered";
        //     //otpNextPage = "/registrationValidateRegDetails";//TODO:for testing
        //     break;
        //   }
        //   default: {
        //     otpNextPage = "/registration";
        //     this.DataService.regIsAtStep = 1;
        //     break;
        //   }
        // }

      // PENDING AT TPIN=25;
      // PENDING AT VERIFY TOKEN=89;
      // PENDING AT SECURITY QUE=90;
      // PENDING AT USERNAME=55;

      //  PENDING AT CUSTOMER DETL = 91;
      //  PENDING AT VALDATE REG DET=88;
      //  PENDING AT UPDTE REG=92;

      //otpNextPage = "/registrationStep2"//TODO: need to remove only used for testing
        /***** Navigate to respective page ******/
        this.DataService.otpPreviousPage = "/registrationMobCheck";
        this.DataService.otpNextPage = "/registration";
        this.router.navigate(['/otp']);
        //this.router.navigateByUrl('/registrationStep1');
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
    showToastMessage(resp.Result, "error");
  }


  bindExistingRecord(reqData,seqQue){
    seqQue = seqQue.substring(1, seqQue.length - 1);
    var queList = seqQue.split(",");
    console.log(queList);
    console.log();
    console.log();
    this.DataService.regFeildData ={
      custId: reqData.cifNumber,
      accNo: '',
      cardNumber: '',
      expDate: '',
      cardPin: '',
      ibUserName: '',
      ibPassword: '',
      ibmpin: reqData.MPIN,
      bankToken: '',
      username: reqData.userName,
      password: reqData.password,
      confPassword: reqData.password,
      quest1: queList[0].split(":")[1].substring(1, queList[0].split(":")[0].length - 1),
      ans1: queList[0].split(":")[1].substring(1, queList[0].split(":")[1].length - 1),
      quest2: queList[1].split(":")[1].substring(1, queList[1].split(":")[0].length - 1),
      ans2: queList[1].split(":")[1].substring(1, queList[1].split(":")[1].length - 1),
      quest3: queList[2].split(":")[1].substring(1, queList[2].split(":")[0].length - 1),
      ans3: queList[2].split(":")[1].substring(1, queList[2].split(":")[1].length - 1),
      tpin: '',
      confTpin: '',
      mpin: reqData.MPIN,
      confMpin: reqData.MPIN
    }
  }


   /**
   * Validation if mobile no
   * @param formGroup
   */
  isValidMobileNo(formGroup: FormGroup) {
    const { value: mobNumber } = formGroup.get('mobNumber');
    let count = 0
    let length = 0;
    if(mobNumber != undefined){
      for(let i=0;i< mobNumber.length ;i++){
        if(mobNumber[i] == "0"){
            count++;
        }
      }
      console.log(mobNumber.length);
      console.log(count);
      length = mobNumber.length;
    }


    return length != count ? null : { isInvalidMobileNo: true };
}


  closePopup(popup){
    this.commonMethod.closePopup('div.popup-bottom.'+popup);
  }


}
