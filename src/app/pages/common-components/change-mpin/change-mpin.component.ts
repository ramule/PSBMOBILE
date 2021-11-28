import { Component, NgZone, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeMpinService } from "./change-mpin.service";
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';

// declare var changeMpin : any
@Component({
  selector: 'app-change-mpin',
  templateUrl: './change-mpin.component.html',
  styleUrls: ['./change-mpin.component.scss']
})
export class ChangeMpinComponent implements OnInit {
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Set New MPIN',
    'footertype': 'none'
  }

  MPINForm: FormGroup;
  uFormInput = ['upassword1', 'upassword2', 'upassword3', 'upassword4', 'upassword5', 'upassword6'];
  sFormInput = ['spassword1', 'spassword2', 'spassword3', 'spassword4', 'spassword5', 'spassword6'];
  cFormInput = ['cpassword1', 'cpassword2', 'cpassword3', 'cpassword4', 'cpassword5', 'cpassword6'];
  mpinMisMatchError: boolean = false;
  validOldError: boolean = false;
  validNewError: boolean = false;

  @ViewChildren('mPINformRow') mPinRows: any;
  @ViewChildren('mPINNformRow') mPinNRows: any;
  @ViewChildren('mPINCformRow') mPinCRows: any;

  constructor(
    private router: Router,
    public DataService: DataService,
    public changeMpin: ChangeMpinService,
    private http: HttpRestApiService,
    public constant: AppConstants,
    private storage: LocalStorageService,
    private commonMethod: CommonMethods,
    private ngZone: NgZone,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    // changeMpin();
    this.buildForm();
  }

  buildForm() {
    this.MPINForm = new FormGroup({
      // mobNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
      upassword1: new FormControl('', [Validators.required]),
      upassword2: new FormControl('', [Validators.required]),
      upassword3: new FormControl('', [Validators.required]),
      upassword4: new FormControl('', [Validators.required]),
      upassword5: new FormControl('', [Validators.required]),
      upassword6: new FormControl('', [Validators.required]),
      spassword1: new FormControl('', [Validators.required]),
      spassword2: new FormControl('', [Validators.required]),
      spassword3: new FormControl('', [Validators.required]),
      spassword4: new FormControl('', [Validators.required]),
      spassword5: new FormControl('', [Validators.required]),
      spassword6: new FormControl('', [Validators.required]),
      cpassword1: new FormControl('', [Validators.required]),
      cpassword2: new FormControl('', [Validators.required]),
      cpassword3: new FormControl('', [Validators.required]),
      cpassword4: new FormControl('', [Validators.required]),
      cpassword5: new FormControl('', [Validators.required]),
      cpassword6: new FormControl('', [Validators.required]),
    });
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  getMPINValue() {
    var mpin = "";
    console.log(this.MPINForm.controls);

    for (const field in this.MPINForm.controls) { // 'field' is a string

      const control = this.MPINForm.get(field); // 'control' is a FormControl  
      console.log("value", control.value);

      if (!control.hasError('required')) {
        mpin += control.value;
        console.log(mpin);

      }
    }
    return mpin;
  }



  getSpasswordElement(index, type) {
    if (type == "oldpin") {
      if (index <= 5)
        return this.mPinRows._results[index].nativeElement;
    }
    else if (type == "newpin") {
      if (index <= 5)
        return this.mPinNRows._results[index].nativeElement;
    }
    else if (type == "cnfpin") {
      if (index <= 5)
        return this.mPinCRows._results[index].nativeElement;
    }


  }

  // old mpin
  onKeyUp(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, "oldpin").value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, "oldpin").focus();
      } else {
        this.getSpasswordElement(index, "oldpin").blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, "oldpin").focus();
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
        this.MPINForm.get(this.uFormInput[index]).setValue("");
        this.getSpasswordElement(index - 1, "oldpin").focus();
      }
    }
  }
  onFocus(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, "oldpin");
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  // new mpin
  onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, "newpin").value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, "newpin").focus();
      } else {
        this.getSpasswordElement(index, "newpin").blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, "newpin").focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      // this.MPINForm.get('spassword1').reset();
      // this.MPINForm.get('spassword2').reset();
      // this.MPINForm.get('spassword3').reset();
      // this.MPINForm.get('spassword4').reset();
      // this.MPINForm.get('spassword5').reset();
      // this.MPINForm.get('spassword6').reset();
      // this.mPinNRows._results[0].nativeElement.focus(); 
      if (event.key != "Unidentified") {
        this.MPINForm.get(this.sFormInput[index]).setValue("");
        this.getSpasswordElement(index - 1, "newpin").focus();
      }
    }
  }
  onFocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, "newpin");
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  // confirm
  onKeyUpEvents(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, "cnfpin").value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, "cnfpin").focus();
      } else {
        this.getSpasswordElement(index, "cnfpin").blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, "cnfpin").focus();
    }
    if (eventCode === 8 || eventCode === 299) {
      // this.MPINForm.get('cpassword1').reset();
      // this.MPINForm.get('cpassword2').reset();
      // this.MPINForm.get('cpassword3').reset();
      // this.MPINForm.get('cpassword4').reset();
      // this.MPINForm.get('cpassword5').reset();
      // this.MPINForm.get('cpassword6').reset();
      // this.mPinCRows._results[0].nativeElement.focus(); 
      this.MPINForm.get(this.cFormInput[index]).setValue("");
      this.getSpasswordElement(index - 1, "cnfpin").focus();
    }
  }
  onFocusEvents(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, "cnfpin");
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  getCpasswordElement(index) {
    return document.getElementById('cpassword' + index);
  }


  validateForm() {
    if (this.MPINForm.invalid) {
      this.MPINForm.markAllAsTouched();
      return;
    }
  }


  onMpinSubmit() {
    this.mpinMisMatchError = false;
    this.validOldError = false;
    this.validNewError = false;
    this.validateForm()
    console.log(this.MPINForm)
    if (this.MPINForm.valid) {
      let oldMpin = this.MPINForm.value.upassword1 + this.MPINForm.value.upassword2 + this.MPINForm.value.upassword3 + this.MPINForm.value.upassword4 + this.MPINForm.value.upassword5 + this.MPINForm.value.upassword6;
      let newMpin = this.MPINForm.value.spassword1 + this.MPINForm.value.spassword2 + this.MPINForm.value.spassword3 + this.MPINForm.value.spassword4 + this.MPINForm.value.spassword5 + this.MPINForm.value.spassword6;
      let cnfMpin = this.MPINForm.value.cpassword1 + this.MPINForm.value.cpassword2 + this.MPINForm.value.cpassword3 + this.MPINForm.value.cpassword4 + this.MPINForm.value.cpassword5 + this.MPINForm.value.cpassword6;
      if (newMpin != cnfMpin) {
        this.mpinMisMatchError = true;
        return;
      }

      let valSeqOldMpin = this.checkRepeatedDigits(oldMpin);
      let valOldMpin = this.checkConsecutiveDigits(oldMpin);
      if (valOldMpin || valSeqOldMpin) {
        this.validOldError = true;
        return;
      }

      let valNewMpin = this.checkConsecutiveDigits(newMpin);
      let valCnfMpin = this.checkConsecutiveDigits(cnfMpin);
      let valSeqNewMpin = this.checkRepeatedDigits(newMpin);
      let valSeqCnfMpin = this.checkRepeatedDigits(cnfMpin);
      if (valNewMpin || valCnfMpin || valSeqNewMpin || valSeqCnfMpin) {
        this.validNewError = true;
        return
      }


      var reqParams = this.changeMpin.getChangeMpinParam(oldMpin, newMpin);
      this.UpiApiCall(reqParams, this.storage.getLocalStorage(this.constant.storage_deviceId));
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



  /**
   * Common UPI Api call
   * @param request 
   * @param deviceId 
   * @param accDetails 
   */
  UpiApiCall(request, deviceId, accDetails?) {
    this.http.callBankingAPIService(request, deviceId, this.constant.upiserviceName_UPIUPDATEMPIN, true).subscribe(data => {
      let response = data.responseParameter;
      console.log('mpin => response', response);
      if (response.opstatus == "00") {
        this.commonMethod.openPopup('div.popup-bottom.mpin-change');
      } else {
        this.ngZone.run(() => {
          this.DataService.errorMsg = response.Result;
          this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.DataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-error')
        })
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }


  gotoDashboard() {
    this.commonMethod.closePopup('div.popup-bottom.mpin-change');
    this.goToPage('upiDashboard')
  }

}
