import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../services/data.service';

import { SetNewMpinService } from '../set-new-mpin/set-new-mpin.service';
import { Location } from '@angular/common';

declare var moboVerification: any;
declare var showToastMessage: any;
declare var showMPINSuccessModal: any;
declare var hideMPINSuccessModal: any;

@Component({
  selector: 'app-set-new-mpin',
  templateUrl: './set-new-mpin.component.html',
  styleUrls: ['./set-new-mpin.component.scss']
})
export class SetNewMpinComponent implements OnInit {
  headerdata = {
    'headerType':'CloseNewHeader',
    'titleName':'Set New Mpin',
    'footertype':'none'
  }

  mpinForm: FormGroup;
  oldMpinValues: any = [];
  validMpin: boolean = false;
  validConfirmMpin: boolean = false;
  mpinMatch: boolean = true;
  formInput = ['mpinInput1', 'mpinInput2', 'mpinInput3', 'mpinInput4', 'mpinInput5', 'mpinInput6', 'confirmMpinInput1', 'confirmMpinInput2', 'confirmMpinInput3', 'confirmMpinInput4', 'confirmMpinInput5', 'confirmMpinInput6'];
  biometriSelectedOption:any;
  sessionDecryptKey:any;


  @ViewChildren('mPINformRow') mPinRows: any;
  @ViewChildren('confirmMPINformRow') confirmMPinRows: any;

  public confMpinError = "";
  public mpinError = ""

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dataService: DataService,
    private formValidation: FormValidationService,
    private localStorage: LocalStorageService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private setNewMpinService: SetNewMpinService,
    private storage :LocalStorageService,
    private  commonMethod :CommonMethods,
    private  encryptDecryptService :EncryptDecryptService,
    private location : Location,
    ) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    // moboVerification()
    this.mpinForm = this.toFormGroup(this.formInput);
    this.dataService.changeMessage(this.headerdata);

  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  toFormGroup(elements) {
    const group: any = {};
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(type, event, index) {
    let pos = index;
    var key = event.keyCode || event.which;
    // if (event.keyCode === 8 && event.which === 8 ) {
    if (key === 8) {
      // pos = index - 1;
      pos = 0;
        if (type == 'mpin') {
          this.mpinForm.patchValue({
            mpinInput1 : "",
            mpinInput2 : "",
            mpinInput3 : "",
            mpinInput4 : "",
            mpinInput5 : "",
            mpinInput6 : "",
          })
        this.mPinRows._results[0].nativeElement.focus();
        } else {
          this.mpinForm.patchValue({
            confirmMpinInput1 : "",
            confirmMpinInput2 : "",
            confirmMpinInput3 : "",
            confirmMpinInput4 : "",
            confirmMpinInput5 : "",
            confirmMpinInput6 : "",
          })
          this.confirmMPinRows._results[0].nativeElement.focus();
        }

    } else {
      pos = index + 1;
    }
    if (type == 'mpin') {
      if (pos > -1 && pos < 6) {
        this.mPinRows._results[pos].nativeElement.focus();
      }
    } else {
      if (pos > -1 && pos < 6) {
        this.confirmMPinRows._results[pos].nativeElement.focus();
      }
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
    }
    else if (val == "987654" || val == "876543" || val == "765432" || val == "654321" || val == "543210" || val == "098765") {
      console.log("consecutive true");
      // this.consecutiveDigits = true;
      return true;
    }
    else {
      console.log("consecutive false");
      // this.consecutiveDigits = false;
      return false;
    }
  }

  callMpinAPI() {
    //to check last 3 MPINs
    // this.oldMpinValues = response array
  }

  validateForm() {
    //check form validity
    if (this.mpinForm.invalid) {
      this.mpinError = "";
      this.confMpinError = "";
      this.formValidation.markFormGroupTouched(this.mpinForm);
      for (const field in this.mpinForm.controls) { // 'field' is a string
        const control = this.mpinForm.get(field); // 'control' is a FormControl
        if (field.includes('mpin') && control.hasError('required')) {
          this.mpinError = '* This field is required';
        } else if (field.includes('confirmMpin') && control.hasError('required')) {
          this.confMpinError = '* This field is required';
        }
      }
      return;
    } else {
      this.mpinError = '';
      this.confMpinError = '';
    }
  }

  checkMpinMatch(mpinVal, confirmMpinVal) {
    if (mpinVal === confirmMpinVal) {
      return true;
    } else {
      return false;
    }
  }

  submitForm() {
    this.validateForm();
    if (this.mpinForm.valid) {
      console.log('mpin ',this.getMPINValue());
      console.log('confirm mpin ',this.getConfirmMPINValue());

      let validMpin1 = this.checkConsecutiveDigits(this.getMPINValue());
      console.log('validMpin1', validMpin1);
      let validMpin2 = this.checkRepeatedDigits(this.getMPINValue());
      console.log('validMpin2', validMpin2);

      this.validMpin = validMpin1 || validMpin2;
      console.log('this.validMpin', this.validMpin);


      let validConfirmMpin1 = this.checkConsecutiveDigits(this.getConfirmMPINValue());
      let validConfirmMpin2 = this.checkRepeatedDigits(this.getConfirmMPINValue());

      this.validConfirmMpin = validConfirmMpin1 || validConfirmMpin2;
      console.log('this.validConfirmMpin', this.validConfirmMpin);

      this.mpinMatch = this.checkMpinMatch(this.getMPINValue(), this.getConfirmMPINValue());
      console.log('this.mpinMatch', this.mpinMatch);
      if(!this.confMpinError && this.mpinMatch && !this.validConfirmMpin && !this.mpinError && !this.validMpin){
        this.callBankingService()
      }
    }
  }

  getMPINValue() {
    var mpin = "";
    for (const field in this.mpinForm.controls) { // 'field' is a string
      const control = this.mpinForm.get(field); // 'control' is a FormControl
      if (field.includes('mpin') && !control.hasError('required')) {
        mpin += control.value;
      }
    }
    return mpin;
  }

  getConfirmMPINValue() {
    var confirmMPIN = "";
    for (const field in this.mpinForm.controls) { // 'field' is a string
      const control = this.mpinForm.get(field); // 'control' is a FormControl
      if (field.includes('confirmMpin') && !control.hasError('required')) {
        confirmMPIN += control.value;
      }
    }
    return confirmMPIN;
  }

  callBankingService() {
    var param = this.setNewMpinService.getSetNewMPINParam(this.getMPINValue());
    let deviceID = this.localStorage.getLocalStorage(this.constant.storage_deviceId);
    this.setUPINEWMpinAPIcall(param, deviceID);
  }


   /**
  * api call for login
  * @Param get request in encrypted format
  * @loginType
  */
 setUPINEWMpinAPIcall(param, deviceID) {
  this.http.callBankingAPIService(param, deviceID, this.constant.upiserviceName_UPISETMPIN,true).subscribe(data => {
    console.log(data);
    var resp = data.responseParameter;
    if (resp.opstatus == "00") {
      console.log(data.responseParameter);
      this.showMPINSuccessModal();

    }
    else {
      this.errorCallBack(data.subActionId, resp);
    }
  });
}

  showMPINSuccessModal() {
    showMPINSuccessModal()
  }

  hideMPINSuccessModal() {
    hideMPINSuccessModal()
    // this.dataService.routeWithNgZone("upiLogin");
    this.router.navigate(['/upiLogin']);
  }

  /**
    * function to called on unsuccessfull responce
    * @subActionId
    * @resp
    */
   errorCallBack(subActionId, resp) {
    if (resp.opstatus == "02" || resp.opstatus == "03") {
      showToastMessage(resp.Result,"error");
    }
  }




}
