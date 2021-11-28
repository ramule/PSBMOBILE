import { Component, OnInit , ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { RegistrationMpinService } from './registration-mpin.service';
import { Output, EventEmitter } from '@angular/core';
import { CommonMethods } from '../../../../../utilities/common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-registration-mpin',
  templateUrl: './registration-mpin.component.html',
  styleUrls: ['./registration-mpin.component.scss']
})
export class RegistrationMpinComponent implements OnInit {
  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/registration'
  }
  public formErrorsstep6 = {
    mpin: '',
    confMpin: '',
  };

  entermpin : boolean = false;
  enterConfrmmpin : boolean = false;
  mpinNotMatched : boolean =  false;
  isFormValid : boolean = false;
  mpinValue:any = "";
  isAlreadyMBUser: any = "N";

  @ViewChildren('sMpin') sMpin: any;
  @ViewChildren('cMpin') cMpin: any;

  @Output() prevEvent = new EventEmitter<number>();
  @Output() nextEvent2 = new EventEmitter<number>();
  regiFormVerifyMpin: FormGroup;
  mpinRepeatError : boolean = false;
  mpinConsecutiveError : boolean = false;

  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private localStorage: LocalStorageService,
    private constant: AppConstants,
    private commonMethod:CommonMethods,
    private regservice: RegistrationMpinService
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
      this.isAlreadyMBUser = this.localStorage.getLocalStorage(this.constant.storage_isMBUser)
      this.bindForm();
  }
  buildForm() {
    this.regiFormVerifyMpin = new FormGroup({
      mpin1: new FormControl(''),
      mpin2: new FormControl(''),
      mpin3: new FormControl(''),
      mpin4: new FormControl(''),
      mpin5: new FormControl(''),
      mpin6: new FormControl(''),
      confMpin1: new FormControl(''),
      confMpin2: new FormControl(''),
      confMpin3: new FormControl(''),
      confMpin4: new FormControl(''),
      confMpin5: new FormControl(''),
      confMpin6: new FormControl(''),
    });
  }


  bindForm(){
    this.regiFormVerifyMpin.patchValue({
      mpin1: this.DataService.regFeildData.mpin1,
      mpin2: this.DataService.regFeildData.mpin2,
      mpin3: this.DataService.regFeildData.mpin3,
      mpin4: this.DataService.regFeildData.mpin4,
      mpin5: this.DataService.regFeildData.mpin5,
      mpin6: this.DataService.regFeildData.mpin6,
      confMpin1: this.DataService.regFeildData.confMpin1,
      confMpin2: this.DataService.regFeildData.confMpin2,
      confMpin3: this.DataService.regFeildData.confMpin3,
      confMpin4: this.DataService.regFeildData.confMpin4,
      confMpin5: this.DataService.regFeildData.confMpin5,
      confMpin6: this.DataService.regFeildData.confMpin6,
    });
  }

  validatesForm() {
    var mpin = this.regiFormVerifyMpin.value.mpin1 + this.regiFormVerifyMpin.value.mpin2 + this.regiFormVerifyMpin.value.mpin3 + this.regiFormVerifyMpin.value.mpin4 + this.regiFormVerifyMpin.value.mpin5 + this.regiFormVerifyMpin.value.mpin6;
    var confmpin = this.regiFormVerifyMpin.value.confMpin1 + this.regiFormVerifyMpin.value.confMpin2 + this.regiFormVerifyMpin.value.confMpin3 + this.regiFormVerifyMpin.value.confMpin4 +  this.regiFormVerifyMpin.value.confMpin5 + this.regiFormVerifyMpin.value.confMpin6;
    this.entermpin =  false; this.enterConfrmmpin = false; this.mpinNotMatched =  false; this.isFormValid = false;
    this.DataService.confmpin = confmpin;

    if(this.regiFormVerifyMpin.value.mpin1 == "" ||
    this.regiFormVerifyMpin.value.mpin2 == "" ||
    this.regiFormVerifyMpin.value.mpin3 == "" ||
    this.regiFormVerifyMpin.value.mpin4 == "" ||
    this.regiFormVerifyMpin.value.mpin5 == "" ||
    this.regiFormVerifyMpin.value.mpin6 == ""){
      this.entermpin = true;
    }
    else if(this.regiFormVerifyMpin.value.confMpin1 == "" ||
    this.regiFormVerifyMpin.value.confMpin2 == "" ||
    this.regiFormVerifyMpin.value.confMpin3 == "" ||
    this.regiFormVerifyMpin.value.confMpin4 == "" ||
    this.regiFormVerifyMpin.value.confMpin5 == "" ||
    this.regiFormVerifyMpin.value.confMpin6 == ""){
      this.enterConfrmmpin = true;
    }
    else if(mpin != confmpin) {
      this.mpinNotMatched = true;
    }
    else{
      this.isFormValid = true;
      this.mpinValue = mpin;
    }
  }

  submit(){
    this.validatesForm()
    this.mpinRepeatError = false;
    this.mpinConsecutiveError = false;
    this.mpinRepeatError = this.checkRepeatedDigits(this.mpinValue);
    this.mpinConsecutiveError = this.checkConsecutiveDigits(this.mpinValue);
    if(this.isFormValid && !this.mpinRepeatError && !this.mpinConsecutiveError){
      console.log(this.mpinValue)
      var param = this.regservice.getValidateMpinParam(this.mpinValue);
      this.setMpin(param);
    }else{
      this.formErrorsstep6 = this.formValidation.validateForm(this.regiFormVerifyMpin, this.formErrorsstep6, true);
    }
  }

  setMpin(param){
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage("deviceId"), this.constant.serviceName_SETUPDATEPIN).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.localStorage.setLocalStorage(this.constant.storage_isMBUser,'Y');
        this.DataService.regFeildData.mpin1 = this.regiFormVerifyMpin.value.mpin1;
        this.DataService.regFeildData.mpin2 = this.regiFormVerifyMpin.value.mpin2;
        this.DataService.regFeildData.mpin3 = this.regiFormVerifyMpin.value.mpin3;
        this.DataService.regFeildData.mpin4 = this.regiFormVerifyMpin.value.mpin4;
        this.DataService.regFeildData.mpin5 = this.regiFormVerifyMpin.value.mpin5;
        this.DataService.regFeildData.mpin6 = this.regiFormVerifyMpin.value.mpin6;
        this.DataService.regFeildData.confMpin1 = this.regiFormVerifyMpin.value.confMpin1;
        this.DataService.regFeildData.confMpin2 = this.regiFormVerifyMpin.value.confMpin2;
        this.DataService.regFeildData.confMpin3 = this.regiFormVerifyMpin.value.confMpin3;
        this.DataService.regFeildData.confMpin4 = this.regiFormVerifyMpin.value.confMpin4;
        this.DataService.regFeildData.confMpin5 = this.regiFormVerifyMpin.value.confMpin5;
        this.DataService.regFeildData.confMpin6 = this.regiFormVerifyMpin.value.confMpin6;
        this.nextEvent2.next(5);
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
      // showToastMessage(resp.Result,"error");
    }
  }
    /**
   * Validation if mpin & confirm mpin doesn't match
   * @param formGroup
   */
  mpin(formGroup: FormGroup) {
    const { value: mpin } = formGroup.get('mpin');
    const { value: confMpin } = formGroup.get('confMpin');
    return mpin === confMpin ? null : { mpinNotMatch: true };
  }

  gotoPrevious(){
    // var backurl = this.DataService.isFromMpinLogin? "/registrationMpinUserValidate" : "/registrationmpin";
    // this.router.navigateByUrl(backurl);
    this.prevEvent.next(5);
  }


  skipStep(){
    this.nextEvent2.next(5);
    this.localStorage.setLocalStorage(this.constant.storage_isMBUser,'N');
  }


  onKeyUp(index, event,type) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

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
        this.enterConfrmmpin = false;this.mpinNotMatched = false;this.mpinRepeatError = false;this.mpinConsecutiveError = false;
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
    if (type == "spassword") {
      if (index <= 5)
        return this.sMpin._results[index].nativeElement;
    }
    else if (type == "cpassword") {
      if (index <= 5)
        return this.cMpin._results[index].nativeElement;
    }

  }


  checkRepeatedDigits(val) {
    console.log('checkRepeatedDigits val', val);
    let regex1 = /^([0-9])\1{5}$/;
    if (regex1.test(val)) {
      console.log("repeated true");
      // this.repeatedDigits = true;
      return true;
    } else {
      console.log("repeated false");
      // this.repeatedDigits = false;
      return false;
    }
  }

  checkConsecutiveDigits(val) {
    console.log('checkConsecutiveDigits val === ', val);

    if (val == "012345" || val == "123456" || val == "234567" || val == "345678" || val == "456789" || val == "567890") {
      console.log("consecutive true");
      // this.consecutiveDigits = true;
      return true;
    } else if (val == "987654" || val == "876543" || val == "765432" || val == "654321" || val == "543210" || val == "098765") {
      console.log("consecutive true");
      // this.consecutiveDigits = true;
      return true;
    } else {
      console.log("consecutive false");
      // this.consecutiveDigits = false;
      return false;
    }
  }

  mpinPolicy(){
    this.commonMethod.openPopup("div.mpin-popup")
  }

}
