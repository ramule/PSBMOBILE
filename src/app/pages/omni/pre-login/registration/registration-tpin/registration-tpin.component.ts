import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { RegistrationUsernameService } from '../registration-username/registration-username.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Output, EventEmitter } from '@angular/core';
import { RegistrationMpinService } from '../registration-mpin/registration-mpin.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-registration-tpin',
  templateUrl: './registration-tpin.component.html',
  styleUrls: ['./registration-tpin.component.scss']
})
export class RegistrationTpinComponent implements OnInit {
  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/registration'
  }
  public formErrorsstep5 = {
    tpin: '',
    confTpin: '',
  };


  enterTpin: boolean = false;
  enterConfrmTPin: boolean = false;
  tpinNotMatched: boolean = false;
  isFormValid: boolean = false;
  tpinRepeatError: boolean =false;
  tpinConsecutiveError: boolean = false;
  tpinValue:any;
  confirmTpin = '';

  @ViewChildren('sTpin') sTpin: any;
  @ViewChildren('cTpin') cTpin: any;

  @Output() nextEvent2 = new EventEmitter<number>();
  @Output() prevEvent = new EventEmitter<number>();
  regiFormVerifyTpin: FormGroup;
  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private formValidation: FormValidationService,
    private registerService: RegistrationUsernameService,
    private commonMethod:CommonMethods,
    private regservice: RegistrationMpinService
    ) { }

  ngOnInit(): void {
    //Set page common Components
    this.DataService.changeMessage(this.commonPageComponent);
    console.log(this.DataService.registrationData)
    this.buildForm();
    //this.bindForm();
  }
  buildForm() {
    this.regiFormVerifyTpin = new FormGroup({
      tpin1: new FormControl(''),
      tpin2: new FormControl(''),
      tpin3: new FormControl(''),
      tpin4: new FormControl(''),
      tpin5: new FormControl(''),
      tpin6: new FormControl(''),
      confTpin1: new FormControl(''),
      confTpin2: new FormControl(''),
      confTpin3: new FormControl(''),
      confTpin4: new FormControl(''),
      confTpin5: new FormControl(''),
      confTpin6: new FormControl('')
    });

  }
  cancelbtn() {
    this.prevEvent.next(5);
  }


  bindForm() {
    this.regiFormVerifyTpin.patchValue({
      tpin: this.DataService.regFeildData.tpin,
      confTpin: this.DataService.regFeildData.confTpin
    });
  }
  validatesForm() {
    var tpin = this.regiFormVerifyTpin.value.tpin1 + this.regiFormVerifyTpin.value.tpin2 + this.regiFormVerifyTpin.value.tpin3 + this.regiFormVerifyTpin.value.tpin4 + this.regiFormVerifyTpin.value.tpin5 + this.regiFormVerifyTpin.value.tpin6;
    var confTpin = this.regiFormVerifyTpin.value.confTpin1 + this.regiFormVerifyTpin.value.confTpin2 + this.regiFormVerifyTpin.value.confTpin3 + this.regiFormVerifyTpin.value.confTpin4 + this.regiFormVerifyTpin.value.confTpin5 + this.regiFormVerifyTpin.value.confTpin6;
    this.enterTpin = false; this.enterConfrmTPin = false; this.tpinNotMatched = false; this.isFormValid = false;

    this.confirmTpin = confTpin;
    if (this.regiFormVerifyTpin.value.tpin1 == "" ||
      this.regiFormVerifyTpin.value.tpin2 == "" ||
      this.regiFormVerifyTpin.value.tpin3 == "" ||
      this.regiFormVerifyTpin.value.tpin4 == "" ||
      this.regiFormVerifyTpin.value.tpin5 == "" ||
      this.regiFormVerifyTpin.value.tpin6 == "") {
      this.enterTpin = true;
    }
    else if (this.regiFormVerifyTpin.value.confTpin1 == "" ||
      this.regiFormVerifyTpin.value.confTpin2 == "" ||
      this.regiFormVerifyTpin.value.confTpin3 == "" ||
      this.regiFormVerifyTpin.value.confTpin4 == "" ||
      this.regiFormVerifyTpin.value.confTpin5 == "" ||
      this.regiFormVerifyTpin.value.confTpin6 == "") {
      this.enterConfrmTPin = true;
    }
    else if (tpin != confTpin) {
      this.tpinNotMatched = true;
    }
    else {
      this.isFormValid = true;
      this.tpinValue = tpin;
    }
  }

  submitStep5() {
    //this.nextEvent2.next(5);
    this.validatesForm();
    this.tpinRepeatError = false;
    this.tpinConsecutiveError = false;
    this.tpinRepeatError = this.checkRepeatedDigits(this.tpinValue);
    this.tpinConsecutiveError = this.checkConsecutiveDigits(this.tpinValue);

    if (this.isFormValid && !this.tpinRepeatError && !this.tpinConsecutiveError) {
      let paramReq = this.registerService.getTPINUpdateParam(this.tpinValue);
      this.http.callBankingAPIService(paramReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SETUPDATEPIN).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          // this.router.navigateByUrl('/registrationMpin');
          //this.nextEvent2.next(5);
          this.storage.setLocalStorage('isMBUser', 'Y')
          this.updateRegistrationStatus();
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
    } else {
      this.formErrorsstep5 = this.formValidation.validateForm(this.regiFormVerifyTpin, this.formErrorsstep5, true);
    }
  }

  /**
 * Validation if tpin & confirm tpin doesn't match
 * @param formGroup
 */
  tpin(formGroup: FormGroup) {
    const { value: tpin } = formGroup.get('tpin');
    const { value: confTpin } = formGroup.get('confTpin');
    return tpin === confTpin ? null : { tpinNotMatch: true };
  }

  /**
* function to called on unsuccessfull responce
* @subActionId
* @resp
*/
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == "03") {
      showToastMessage(resp.Result, "error");
    }
  }

  /**
     * For Registration status update this function is invoked
     */
  updateRegistrationStatus() {

    if(this.DataService.confmpin != this.confirmTpin){
    let param = this.regservice.getUpdateRegistrationDetailsParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_UPDATEREGISTRATIONSTATUS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.DataService.regRefId = resp.RRN;
        this.DataService.isLoggedIn = true;
        this.storage.setLocalStorage(this.constant.storage_omniRegisteredUser, "true");
        this.router.navigateByUrl('/registrationSuccess');
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }else{
    //showToastMessage("resp.Result", "error");
  }
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
        this.enterConfrmTPin = false;this.tpinNotMatched = false;this.tpinRepeatError = false;this.tpinConsecutiveError = false;
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
        return this.sTpin._results[index].nativeElement;
    }
    else if (type == "cpassword") {
      if (index <= 5)
        return this.cTpin._results[index].nativeElement;
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

  tpinPolicy(){
    this.commonMethod.openPopup("div.tpin-popup")
  }
  closePopups(popupName){
    this.commonMethod.closePopup(popupName);
  }

}
