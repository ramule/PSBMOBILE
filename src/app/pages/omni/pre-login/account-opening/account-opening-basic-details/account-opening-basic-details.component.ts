import { Component, OnInit , ViewChildren} from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { timer, Subscription } from "rxjs";
declare var showToastMessage: any;


@Component({
  selector: 'app-account-opening-basic-details',
  templateUrl: './account-opening-basic-details.component.html',
  styleUrls: ['./account-opening-basic-details.component.scss']
})
export class AccountOpeningBasicDetailsComponent implements OnInit {

  personalInfoForm: FormGroup;
  otpForm: FormGroup;
  headerdata = {
    'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
    'titleName': '',            // Note : add titlename if headerType = TitleHeader
    'footertype': 'none' //Options: upiFooter , none
  };

  countDown: Subscription;
  mobileCountDown: Subscription;
  counter = 120;
  mobileCounter = 120;
  tick = 1000;
  invalidDtl:any = "";

  @ViewChildren('mOtpRow') mobileOtp: any;
  @ViewChildren('eOtpRow') emailOtp: any;

  constructor(private router: Router,
    public commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    public  translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private constant: AppConstants
  ) { }


  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    this.buildForm();
  }
  routeTo(location) {
    console.log('location', location);
    this.router.navigateByUrl(location);
  }
  validateForm() {
    if (this.personalInfoForm.invalid) {
      this.personalInfoForm.get('firstname').markAsTouched();
      this.personalInfoForm.get('lastname').markAsTouched();
      this.personalInfoForm.get('middlename').markAsTouched();
      this.personalInfoForm.get('mobile').markAsTouched();
      this.personalInfoForm.get('email').markAsTouched();
      this.personalInfoForm.get('acceptTerms1').markAsTouched();
      this.personalInfoForm.get('acceptTerms2').markAsTouched();
      return;
    }
  }

  buildForm() {
    this.personalInfoForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      lastname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      middlename: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      acceptTerms1: new FormControl(false, [Validators.requiredTrue]),
      acceptTerms2: new FormControl(false, [Validators.requiredTrue])
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

  }
  submitForm() {
    this.validateForm();
    if (this.personalInfoForm.valid) {
      //this.openPopup('otp');
      this.dataService.accountOpenMobNo = this.personalInfoForm.value.mobile;
      this.dataService.accountOpenFldData.FirstName = this.personalInfoForm.value.firstname;
      this.dataService.accountOpenFldData.LastName = this.personalInfoForm.value.lastname;
      this.dataService.accountOpenFldData.middlename = this.personalInfoForm.value.middlename;
      this.dataService.accountOpenFldData.MobileNoOrg = this.personalInfoForm.value.mobile;
      this.dataService.accountOpenFldData.emailId = this.personalInfoForm.value.email;

      var param = this.accOpeningService.getmobileNoCheckParam(this.personalInfoForm.value);
      this.mobileNoCheckApiCall(param);
    }

  }

  mobileNoCheckApiCall(param) {
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_MOBILENOCHECK).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.checkLeadAccount();
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  checkLeadAccount() {
    var param = this.accOpeningService.getUserAccLeadDtlParam();
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_ADDUSERACCOUNTLEADSDETAILS).subscribe(data => {
      console.log("=====checkLeadAccount=====", data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.dataService.accountOpenRRN = data.responseParameter.RRN;

        this.startCounter();
        this.startMobileCounter();
        console.log(this.countDown);
        this.otpForm.reset();
        this.invalidDtl = "";
        // this.router.navigateByUrl("/accountOpeningKyc"); //for development
        this.openPopup('otp');
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  validateOtp() {
    if (this.otpForm.valid) {
      var mobileOtp = this.otpForm.value.mobile1 + this.otpForm.value.mobile2 + this.otpForm.value.mobile3 + this.otpForm.value.mobile4 + this.otpForm.value.mobile5 + this.otpForm.value.mobile6;
      var emailOtp = this.otpForm.value.email1 + this.otpForm.value.email2 + this.otpForm.value.email3 + this.otpForm.value.email4 + this.otpForm.value.email5 + this.otpForm.value.email6;
      var refNo = this.dataService.accountOpenRRN; 
      var param = this.accOpeningService.getValidateLeadOtpParam(mobileOtp, emailOtp, refNo);

      this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_VALIDATEUSERACCOUNTLEADSOTP).subscribe(data => {
        console.log("=====validate otp=====", data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.closePopup('otp');
          this.router.navigateByUrl("/accountOpeningKyc");
        }
        else {
          this.invalidDtl = data.responseParameter.Result
          this.errorCallBack(data.subActionId, resp);
        }
      });
    }
  }

  resendLeadOtp(type) {
    var refNo = this.dataService.accountOpenRRN;
    
    var param = this.accOpeningService.getResendLeadOtpParam(refNo);
    this.invalidDtl = ""

  //  this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_RESENDLEADSOTP).subscribe(data => {
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_RESENDUSERACCOUNTLEADSOTP).subscribe(data => {
      console.log("=====resend otp=====", data);
      var resp = data.responseParameter
      this.dataService.accountOpenRRN = data.responseParameter.RRN
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if(type == 'email') {
          this.counter = 120;
          this.startCounter();
          this.otpForm.get('email1').reset();
          this.otpForm.get('email2').reset();
          this.otpForm.get('email3').reset();
          this.otpForm.get('email4').reset();
          this.otpForm.get('email5').reset();
          this.otpForm.get('email6').reset();

          this.startMobileCounter();
          this.otpForm.get('mobile1').reset();
          this.otpForm.get('mobile2').reset();
          this.otpForm.get('mobile3').reset();
          this.otpForm.get('mobile4').reset();
          this.otpForm.get('mobile5').reset();
          this.otpForm.get('mobile6').reset();
        }
        else if(type == 'mobile') {
          this.mobileCounter = 120;
          this.startMobileCounter();
          this.otpForm.get('mobile1').reset();
          this.otpForm.get('mobile2').reset();
          this.otpForm.get('mobile3').reset();
          this.otpForm.get('mobile4').reset();
          this.otpForm.get('mobile5').reset();
          this.otpForm.get('mobile6').reset();

          this.otpForm.get('email1').reset();
          this.otpForm.get('email2').reset();
          this.otpForm.get('email3').reset();
          this.otpForm.get('email4').reset();
          this.otpForm.get('email5').reset();
          this.otpForm.get('email6').reset();
        }
      }
      else {
        this.closePopup('numberConfirmation');
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }



  openPopup(popupName) {
    this.commonMethods.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName) {
    this.commonMethods.closePopup('div.popup-bottom.' + popupName);
  }

  goBack() {
    if(this.constant.getPlatform() == 'web'){
      this.router.navigateByUrl("/nliLanding");
    }
    else{
      this.router.navigateByUrl("/LandingPage");
    }
  }

  startCounter(){
    this.counter = 120;
        if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
        this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
  }

  startMobileCounter() {
    this.mobileCounter = 120;
    if (this.mobileCountDown  && !this.mobileCountDown.closed) { this.mobileCountDown.unsubscribe(); }
     this.mobileCountDown = timer(0, this.tick).subscribe(() => { if(this.mobileCounter == 1) this.mobileCountDown.unsubscribe(); --this.mobileCounter });
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
   // showToastMessage(resp.Result, "error");
  }


  onKeyUp(index, event,type) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);
    this.invalidDtl = "";
    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, type).focus();
      } else {
        this.getSpasswordElement(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      // this.MPINForm.get('upassword1').reset();
      // this.MPINForm.get('upassword2').reset();
      // this.MPINForm.get('upassword3').reset();
      // this.MPINForm.get('upassword4').reset();
      // this.MPINForm.get('upassword5').reset();
      // this.MPINForm.get('upassword6').reset();
      // this.mPinRows._results[0].nativeElement.focus();
      if (event.key != "Unidentified") {
        //this.otpForm.get(this.uFormInput[index]).setValue("");
        this.getSpasswordElement(index - 1, type).focus();
      }
    }
  }

  onFocus(index,type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index, type) {
    //console.log(this.mPinRows);
    if (type == "mobileOtp") {
      if (index <= 5)
        return this.mobileOtp._results[index].nativeElement;
    }
    else if (type == "emailOtp") {
      if (index <= 5)
        return this.emailOtp._results[index].nativeElement;
    }

  }

}
