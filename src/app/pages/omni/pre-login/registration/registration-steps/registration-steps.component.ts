import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { OtpAPIService } from '../../otp/otp.service';
import { Location } from '@angular/common';
import {RegistrationCustDetailsComponent} from '../registration-cust-details/registration-cust-details.component';
import { RegistrationCustDetailsService } from '../registration-cust-details/registration-cust-details.service';
import {RegistrationCreateUpiComponent} from '../registration-create-upi/registration-create-upi.component';
declare var showToastMessage: any;
import { timer, Subscription } from "rxjs";
import { TermsConditonsComponent } from 'src/app/pages/common-ui/terms-conditons/terms-conditons.component';

@Component({
  selector: 'app-registration-steps',
  templateUrl: './registration-steps.component.html',
  styleUrls: ['./registration-steps.component.scss']
})
export class RegistrationStepsComponent implements OnInit {
  activeTab = "step1"
  curentTabIndex = 1;
  information = '';
  termsCondition : any = ''

  otp1:any = '';
  otp2:any = '';
  otp3:any = '';
  otp4:any = '';
  otp5:any = '';
  otp6:any = '';

  @ViewChild(RegistrationCustDetailsComponent ) child: RegistrationCustDetailsComponent ;
  @ViewChild(RegistrationCreateUpiComponent) childUpiReg: RegistrationCreateUpiComponent;
  @ViewChild(TermsConditonsComponent) childTermsReg: TermsConditonsComponent;


  countDown: Subscription;
  counter = 120;
  tick = 1000;
  invaildotp = "";
  @ViewChildren('mOtpRow') mobileOtp: any;


  registrationsteps = [{
    "stepIndex": 1,
    "stepname":
     "Account Details",
    "stepActive": true,
    "stepStatus": "inprogress",
    "tabName": "step1"
  },
  {
    "stepIndex": 2,
    "stepname": "Channel Credentials",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step2"
  },
  {
    "stepIndex": 3,
    "stepname": "Set Login Credentials",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step3"
  },
  {
    "stepIndex": 4,
    "stepname": "Create UPI ID",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step4"
  },
  {
    "stepIndex": 5,
    "stepname": "Set MPIN",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step5"
  },
  {
    "stepIndex": 6,
    "stepname": "Set TPIN",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "step6"
  }
]
  constructor(
    private router: Router,
    public DataService: DataService,
    private otpService : OtpAPIService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    public localStorage: LocalStorageService,
    private regServices: RegistrationCustDetailsService,
    public commonMethod: CommonMethods,
    private location: Location,
    ) { }

  ngOnInit(): void {
    if(this.DataService.regType == 'loan'){
      this.initializeSteps();
      this.DataService.isLoanRegistration = true;
      this.DataService.showMigrated = false;
    }
    else{
      this.DataService.isLoanRegistration = false;
      this.DataService.showMigrated = true;
    }
    if(this.DataService.isCordovaAvailable){
      history.pushState({}, 'LandingPage', this.location.prepareExternalUrl("LandingPage"));
      history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    }
    this.setRegisteredStep();
  }

  initializeSteps(){
    this.registrationsteps = [{
      "stepIndex": 1,
      "stepname":
       "Account Details",
      "stepActive": true,
      "stepStatus": "inprogress",
      "tabName": "step1"
    },
    {
      "stepIndex": 2,
      "stepname": "Channel Credentials",
      "stepActive": false,
      "stepStatus": "incomplete",
      "tabName": "step2"
    },
    {
      "stepIndex": 3,
      "stepname": "Set Login Credentials",
      "stepActive": false,
      "stepStatus": "incomplete",
      "tabName": "step3"
    },
    {
      "stepIndex": 4,
      "stepname": "Set MPIN",
      "stepActive": false,
      "stepStatus": "incomplete",
      "tabName": "step5"
    },
    {
      "stepIndex": 5,
      "stepname": "Set TPIN",
      "stepActive": false,
      "stepStatus": "incomplete",
      "tabName": "step6"
    }
  ]
  }

  otpConfirmation(){
     console.log(this.otp1,this.otp2,this.otp3,this.otp4);
     if(this.otp1 != "" && this.otp2 != "" && this.otp3 != "" && this.otp4 != "" && this.otp5 != "" && this.otp6 != ""){
      var otpValue = this.otp1+this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;

      var validateOtpParam = this.otpService.getSendOTPReq(otpValue);
      this.http.callBankingAPIService(validateOtpParam, this.localStorage.getLocalStorage("deviceId"), this.constant.serviceName_VALIDATEOTP ).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.commonMethod.closeAllPopup();
          console.log(data.responseParameter);
          //this.child.testFunction();
          this.nextstep(1);
          if(this.DataService.isFromOmniReg.isAlreadyRegister){
            this.information = "Mobile Number has already been registered";
            this.commonMethod.openPopup('div.popup-bottom.invalid-registration-dtl');
          }
          else if(data.responseParameter.ISCBS == "N"){
            this.information = "Not a CBS Customer";
            this.commonMethod.openPopup('div.popup-bottom.invalid-registration-dtl');
          }
        }
        else if (resp.opstatus == "01"){
          var invalidAttempt: number = +resp.invalidAttempts;
          this.invaildotp = (invalidAttempt-1).toString() + " of 3 unsuccessful attempts, Please try again";
          this.otp1= "";this.otp2 = "" ;this.otp3 = "" ;this.otp4 = "" ;this.otp5 = "" ;this.otp6 = "";
        }
        else{
          this.invaildotp = "";
          this.commonMethod.closeAllPopup();
        }

      });
     }
      //this.child.testFunction();
  }

  setProgressStep(stepNo){
      this.registrationsteps[stepNo - 1].stepActive = true;
      this.registrationsteps[stepNo - 1 ].stepStatus = 'inprogress';
      this.activeTab = "step" + stepNo;
      for(var i=0; i < stepNo - 1; i++){
          this.registrationsteps[i].stepActive = false;
          this.registrationsteps[i].stepStatus = "incomplete";
      }
  }

  closePopup(popupName){
    this.invaildotp = "";
    this.commonMethod.closePopup('div.popup-bottom.'+popupName);
  }


  /**
   * function to validate customerId and Account Number
   */
   validateCusIdAccNo(){
    // var param = this.regServices.getValidateCustDtlParam(this.DataService.regFeildData.custId,this.DataService.regFeildData.accNo,this.DataService.email);
    // this.updateCustDtlApiCall(param);
  }

  /**
   * update customer detail api is called
   * @param
   */
  updateCustDtlApiCall(param){
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage("deviceId") , this.constant.serviceName_CUSTACCOUNTVALIDATION).subscribe(data => {
      console.log(JSON.stringify(data));
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        var isValidCustomer = this.isValidAccStatusFrmScheme(data.set.records[0].schemeCode);
        if(isValidCustomer){
          if(this.DataService.regIsAtStep == 1){
            this.child.testFunction();
          }
          else{
            this.setProgressStep(this.DataService.regIsAtStep)
          }
        }
        else{
          this.commonMethod.openPopup('div.popup-bottom.show-valid-acc')
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
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


  resendOtp(){
    //api call to get otp
    var otpParam =  this.otpService.getResendOTPReq();
    this.http.callBankingAPIService(otpParam, this.localStorage.getLocalStorage("deviceId"), this.constant.serviceName_RESENDOTP).subscribe(data => {
      var _resp = data.responseParameter
      if (_resp.opstatus == "00") {
        showToastMessage(_resp.Result, "success");
        this.timerCounter();
      }
      else{
        this.errorCallBack(data.subActionId, _resp);
      }
    })
  }


  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
  }

  setRegisteredStep(){
    //this.DataService.regIsAtStep = 5
    console.log(this.DataService.regIsAtStep);
     let stepindex = this.DataService.regIsAtStep - 1;

    for(let i=0; i<= stepindex-1; i++){
      this.registrationsteps[i].stepStatus = "completed"
      this.registrationsteps[i].stepActive = false
    }

    this.registrationsteps[stepindex].stepActive = true
    if (this.registrationsteps[stepindex].stepStatus != "completed") {
      this.registrationsteps[stepindex].stepStatus = "inprogress"
    }


    this.activeTab = "step" + (this.DataService.regIsAtStep);
    this.curentTabIndex = stepindex = this.DataService.regIsAtStep;


  }

  onstepChange(stepname, stepindex) {
    console.log(stepname,stepindex);

    // if(stepindex < this.DataService.regIsAtStep){
    //   return;
    // }
    this.activeTab = stepname

    for (let i = 0; i < this.registrationsteps.length; i++) {
      this.registrationsteps[i].stepActive = false;

    }

    this.registrationsteps[stepindex - 1].stepActive = true;

  }



  mobPrevclick(type?) {
    if(type != undefined && type == 'cross'){
      this.router.navigateByUrl('/registrationMobCheck');
    }
    else{
      if(this.constant.getPlatform() == "web"){
        this.router.navigateByUrl('/nliLanding');
      }
      else{
        this.router.navigateByUrl('/LandingPage');
      }
    }

  }



  prevstep(step) {

    let stepindex = step - 2
    console.log(stepindex)
    this.registrationsteps[stepindex].stepActive = true
    this.registrationsteps[stepindex + 1].stepActive = false
    this.activeTab = "step" + (step - 1)
    console.log(step)
    this.curentTabIndex = step - 1

  }

  nextstep(step) {
    console.log(step);
    let stepindex = step - 1
    console.log(stepindex)

    if( (this.DataService.regType == 'loan')){
      if((step + 1) > 4){
        stepindex = step - 2
      }
      this.registrationsteps[stepindex].stepStatus = "completed"
      this.registrationsteps[stepindex].stepActive = false
      this.registrationsteps[stepindex + 1].stepActive = true
      if (this.registrationsteps[stepindex + 1].stepStatus != "completed") {
        this.registrationsteps[stepindex + 1].stepStatus = "inprogress"
      }
      if((step + 1) == 4){
        this.activeTab = "step" + (step + 2)
      }
      else{
        this.activeTab = "step" + (step + 1)
      }

    }
    else{
      this.registrationsteps[stepindex].stepStatus = "completed"
      this.registrationsteps[stepindex].stepActive = false
      this.registrationsteps[stepindex + 1].stepActive = true
      if (this.registrationsteps[stepindex + 1].stepStatus != "completed") {
        this.registrationsteps[stepindex + 1].stepStatus = "inprogress"
      }
      this.activeTab = "step" + (step + 1)
    }

    this.curentTabIndex = step + 1
  }

  timerCounter(){
    this.otp1 = '';
    this.otp2= '';
    this.otp3= '';
    this.otp4= '';
    this.otp5= '';
    this.otp6= '';

    this.counter = 120;
    if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
    this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
  }

  onKeyUp(index, event) {
    this.invaildotp = "";
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index).value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1).focus();
      } else {
        this.getSpasswordElement(index).blur();
        this.otpConfirmation();
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1).focus();
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
        this.getSpasswordElement(index - 1).focus();
      }
    }
  }
  onFocus(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index) {
    if (index <= 5)
      return this.mobileOtp._results[index].nativeElement;
  }

  closePopups(popupName){
    this.commonMethod.closePopup('div.'+popupName);
  }


  skip(popup){
    this.childUpiReg.skip(popup);
  }

  backToPrevPage(){
      this.location.back() ;
  }

  termsConditionPopup(event){
    this.termsCondition =''
    this.termsCondition = event ;
    console.log("registration steps :: ", event)
    this.childTermsReg.openPopupTerms() ;
    
  }

}
