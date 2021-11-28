import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { resetNewTpinService } from './reset-new-tpin.service';

@Component({
  selector: 'app-reset-new-tpin',
  templateUrl: './reset-new-tpin.component.html',
  styleUrls: ['./reset-new-tpin.component.scss']
})
export class ResetNewTpinComponent implements OnInit {

  public confMpinError = "";
  public mpinError = "";
  validMpin: boolean = false;
  validConfirmMpin: boolean = false;
  mpinMatch: boolean = true;

  mpinForm: FormGroup;
  reMpinForm: FormGroup;

  mpinInput = ['mpin1', 'mpin2', 'mpin3', 'mpin4', 'mpin5', 'mpin6',]
  reMpinInput = ['reMpin1', 'reMpin2', 'reMpin3', 'reMpin4', 'reMpin5', 'reMpin6',]


  @ViewChildren('mpinRow') mpinRows: any;
  @ViewChildren('reMpinRow') reMpinRows: any;

  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location: Location,
    private encryptDecryptService: EncryptDecryptService,
    public commonMethod: CommonMethods,
    public resetTpinService: resetNewTpinService
  ) { }


  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('RESET_TPIN' , this.router.url)
    this.DataService.setPageSettings('RRESET_TPIN');

    this.buildForm();
  }


  buildForm() {

    this.mpinForm = new FormGroup({
      mpin1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      mpin6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    })

    this.reMpinForm = new FormGroup({
      reMpin1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      reMpin6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    })
  }


  validationForm() {
    //check form validity
    if (this.mpinForm.invalid) {
      this.mpinError = "";
      this.confMpinError = "";
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


  submitTpin(){
    this.validationForm();
      if (this.mpinForm.valid) {
        console.log('mpin ', this.getMPINValue());
        console.log('confirm mpin ', this.getConfirmMPINValue());

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
        if (!this.confMpinError && this.mpinMatch && !this.validConfirmMpin && !this.mpinError && !this.validMpin) {
          var tpin = ""+this.reMpinForm.value.reMpin1+""+this.reMpinForm.value.reMpin2+""+this.reMpinForm.value.reMpin3+""+this.reMpinForm.value.reMpin4+""+this.reMpinForm.value.reMpin5+""+this.reMpinForm.value.reMpin6
          var param1 = this.resetTpinService.getValidateTpinParam(tpin);
          this.setTpin(param1);
        }
        // else {

        //   this.dataService.omniRegistrationFlow = true;
        //   //Omni flow
        // }
      }
  }


  setTpin(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SETUPDATEPIN).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.commonMethod.openPopup('div.success-popup');
      }
      else {
        // this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  closePopup(popup){
    if(popup == "success1"){
      this.router.navigateByUrl("/profileDetails");
    }
    this.commonMethod.openPopup('div.popup-bottom.'+popup);
  }

  checkMpinMatch(mpinVal, confirmMpinVal) {
    if (mpinVal === confirmMpinVal) {
      return true;
    } else {
      return false;
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
    for (const field in this.reMpinForm.controls) { // 'field' is a string
      const control = this.reMpinForm.get(field); // 'control' is a FormControl
      if (field.includes('reMpin') && !control.hasError('required')) {
        confirmMPIN += control.value;
      }
    }
    return confirmMPIN;
  }


  onKeyUpEvent(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 7) {
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
      if (event.key != "Unidentified") {
        if (type == 'mpassword') {
          this.mpinForm.get(this.mpinInput[index])?.setValue("");
        } else if (type == 'rmpassword') {
          this.reMpinForm.get(this.reMpinInput[index])?.setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }

  }

  onFocusEvent(index: any, type: any) {

    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index: any, type: any) {
    if (type == 'mpassword') {
      return this.mpinRows._results[index].nativeElement;
    } else if (type == 'rmpassword') {
      return this.reMpinRows._results[index].nativeElement;
    }
  }

  goBack(){
    
  }

  goToPage(routeName){
    this.router.navigateByUrl('/' + routeName);
  }

}
