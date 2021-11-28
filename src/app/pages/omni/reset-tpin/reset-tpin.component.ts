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
import { resetTpinService } from './reset-tpin.service';

@Component({
  selector: 'app-reset-tpin',
  templateUrl: './reset-tpin.component.html',
  styleUrls: ['./reset-tpin.component.scss']
})
export class ResetTpinComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location: Location,
    private encryptDecryptService: EncryptDecryptService,
    public commonMethod: CommonMethods,
    public resetTpinService: resetTpinService
  ) { }
  @ViewChildren('debitCard') cardPinRows: any;
  @ViewChildren('expdateInput') expdateRows: any;
  @ViewChildren('cardPin') debitcardRows: any;

  tpinTypes: any = 'debitCard';
  updatedDate: any;
  today:any;
  difference:any;

  isRegenerateToken = false;
  tokenStatusId: any = 0;

  debitCardForm: FormGroup;
  bankTokenForm: FormGroup;

  debitCardPin = ['debitCard1', 'debitCard2', 'debitCard3', 'debitCard4'];
  expdateInput = ['expDate1', 'expDate2', 'expDate3', 'expDate4'];
  cardPin = ['pin1', 'pin2', 'pin3', 'pin4']

  ngOnInit(): void {
    this.buildForm();
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('RESET_TPIN' , this.router.url)
    this.DataService.setPageSettings('RRESET_TPIN');
    var param = this.resetTpinService.getTokenExistsParam();
    this.checkToken(param);
  }



  checkToken(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_VALIDATEBANKTOKEN).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.isRegenerateToken = false;
      }
      else {
        this.isRegenerateToken = true;
        this.tokenStatusId = resp.statusId
      }
    });

  }


  /**
   * function to generate bank token
   */
   generateToken() {
    this.isRegenerateToken = true;
    // this.tokenStatusId = 3;
    var param = this.resetTpinService.getGenerateTokenParam();
    this.apiCallToGenerateToken(param);
  }


  /**getGenerateTokenCall
   * api call to generate token
   * @param
   */
   apiCallToGenerateToken(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_VERIFYBANKTOKEN).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.tokenStatusId = '8';
        this.isRegenerateToken = true;
        this.DataService.errorResult = "Bank Token request generated successfully, Please Contact your Branch"
        this.commonMethod.openPopup('div.popup-bottom.token-generated-info');
        //showToastMessage(resp.Result, "success");
      }
      else {

      }
    });
  }

  closePopup(popup){
    this.commonMethod.closePopup('div.popup-bottom.'+popup);
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  tpinTypeSelection(value) {
    this.tpinTypes = value;
    if (value == 'debitCard') {
      this.debitCardForm.get('debitCard1').setValidators([Validators.required]);
      this.debitCardForm.get('debitCard2').setValidators([Validators.required]);
      this.debitCardForm.get('debitCard3').setValidators([Validators.required]);
      this.debitCardForm.get('debitCard4').setValidators([Validators.required]);

      this.debitCardForm.get('expDate1').setValidators([Validators.required]);
      this.debitCardForm.get('expDate2').setValidators([Validators.required]);
      this.debitCardForm.get('expDate3').setValidators([Validators.required]);
      this.debitCardForm.get('expDate4').setValidators([Validators.required]);

      this.debitCardForm.get('pin1').setValidators([Validators.required]);
      this.debitCardForm.get('pin2').setValidators([Validators.required]);
      this.debitCardForm.get('pin3').setValidators([Validators.required]);
      this.debitCardForm.get('pin4').setValidators([Validators.required]);


      this.debitCardForm.get('debitCard1').updateValueAndValidity();
      this.debitCardForm.get('debitCard2').updateValueAndValidity();
      this.debitCardForm.get('debitCard3').updateValueAndValidity();
      this.debitCardForm.get('debitCard4').updateValueAndValidity();

      this.debitCardForm.get('expDate1').updateValueAndValidity();
      this.debitCardForm.get('expDate2').updateValueAndValidity();
      this.debitCardForm.get('expDate3').updateValueAndValidity();
      this.debitCardForm.get('expDate4').updateValueAndValidity();

      this.debitCardForm.get('pin1').updateValueAndValidity();
      this.debitCardForm.get('pin2').updateValueAndValidity();
      this.debitCardForm.get('pin3').updateValueAndValidity();
      this.debitCardForm.get('pin4').updateValueAndValidity();

    } else {
      this.debitCardForm.get('debitCard1').clearValidators();
      this.debitCardForm.get('debitCard2').clearValidators();
      this.debitCardForm.get('debitCard3').clearValidators();
      this.debitCardForm.get('debitCard4').clearValidators();

      this.debitCardForm.get('expDate1').clearValidators();
      this.debitCardForm.get('expDate2').clearValidators();
      this.debitCardForm.get('expDate3').clearValidators();
      this.debitCardForm.get('expDate4').clearValidators();

      this.debitCardForm.get('pin1').clearValidators();
      this.debitCardForm.get('pin2').clearValidators();
      this.debitCardForm.get('pin3').clearValidators();
      this.debitCardForm.get('pin4').clearValidators();


      this.debitCardForm.get('debitCard1').updateValueAndValidity();
      this.debitCardForm.get('debitCard2').updateValueAndValidity();
      this.debitCardForm.get('debitCard3').updateValueAndValidity();
      this.debitCardForm.get('debitCard4').updateValueAndValidity();

      this.debitCardForm.get('expDate1').updateValueAndValidity();
      this.debitCardForm.get('expDate2').updateValueAndValidity();
      this.debitCardForm.get('expDate3').updateValueAndValidity();
      this.debitCardForm.get('expDate4').updateValueAndValidity();

      this.debitCardForm.get('pin1').updateValueAndValidity();
      this.debitCardForm.get('pin2').updateValueAndValidity();
      this.debitCardForm.get('pin3').updateValueAndValidity();
      this.debitCardForm.get('pin4').updateValueAndValidity();
    }
  }

  updatedDates()
     {
      this.updatedDate=this.debitCardForm.value.expDate1+this.debitCardForm.value.expDate2+this.debitCardForm.value.expDate3+this.debitCardForm.value.expDate4
      console.log("Selected date::::::::::",this.updatedDate);
      var today = new Date();
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yy = today.getFullYear().toString().substr(-2);

       this.today = mm + yy;
       console.log("today date:::::::::::", this.today)
        this.difference = this.today-this.updatedDate;
       console.log("difference",this.difference);
     }

  buildForm() {
    this.debitCardForm = new FormGroup({
      debitCard1: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      debitCard2: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      debitCard3: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      debitCard4: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      expDate1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      expDate2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      expDate3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      expDate4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      pin1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      pin2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      pin3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      pin4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });

    this.bankTokenForm = new FormGroup({
      bankToken: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  validateForm() {
    if (this.debitCardForm.invalid) {
      this.debitCardForm.get('debitCard1').markAsTouched();
      this.debitCardForm.get('debitCard2').markAsTouched();
      this.debitCardForm.get('debitCard3').markAsTouched();
      this.debitCardForm.get('debitCard4').markAsTouched();
      this.debitCardForm.get('expDate1').markAsTouched();
      this.debitCardForm.get('expDate2').markAsTouched();
      this.debitCardForm.get('expDate3').markAsTouched();
      this.debitCardForm.get('expDate4').markAsTouched();
      this.debitCardForm.get('pin1').markAsTouched();
      this.debitCardForm.get('pin2').markAsTouched();
      this.debitCardForm.get('pin3').markAsTouched();
      this.debitCardForm.get('pin4').markAsTouched();
      return;
    }
  }

  validateTokenForm(){
    if (this.bankTokenForm.invalid) {
      this.bankTokenForm.get('bankToken').markAsTouched();
      return;
    }
  }

  onKeyUpEvent(index, event, type) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);
    // this.updatedDates()

    var textlength = type == 'debitCard' ? 4 : 1;

    if (this.getSpasswordElement(index, type).value.length >= textlength) {
      if (index !== 3) {
        if (type == 'expDate' && index == 1) {
          var month = this.getSpasswordElement(0, type).value + this.getSpasswordElement(1, type).value;
          if (month > 12) {
            this.debitCardForm.get(this.expdateInput[0]).setValue("");
            this.debitCardForm.get(this.expdateInput[1]).setValue("");
            this.getSpasswordElement(0, type).focus();
          }
          else {
            this.getSpasswordElement(index + 1, type).focus();
          }
        }
        else {
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
        if (type == 'debitCard') {
          this.debitCardForm.get(this.debitCardPin[index]).setValue("");
        }
        else if (type == 'pin') {
          this.debitCardForm.get(this.cardPin[index]).setValue("");
        }
        else {
          this.debitCardForm.get(this.expdateInput[index]).setValue("");
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

  getSpasswordElement(index, type) {
    if (index <= 3)
      if (type == 'debitCard') {
        return this.cardPinRows._results[index].nativeElement;
      }
      else if (type == 'pin') {
        return this.debitcardRows._results[index].nativeElement;
      } else {
        return this.expdateRows._results[index].nativeElement;
      }
  }

  resetPinSubmit() {
    if(this.tpinTypes == 'bankToken'){
      if(this.bankTokenForm.valid){
        var param = this.resetTpinService.getValidateTokenParam(this.bankTokenForm.value);
        this.validateToken(param)
      }
      else{
        this.validateTokenForm();
      }
    }
    else{
      if (this.debitCardForm.valid) {
        //this.router.navigateByUrl("/resetNewTpin");
        this.forgotMpinUsingDebitcard();
      } else {
        this.validateForm();
      }
    }
  }

  validateToken(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOGINVALIDATETOKEN).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.router.navigateByUrl("/resetNewTpin");
      }
      else {
        
      }
    });
  }

  forgotMpinUsingDebitcard() {
    var cardNo = this.debitCardForm.value.debitCard1 +""+ this.debitCardForm.value.debitCard2 +""+ this.debitCardForm.value.debitCard3 +""+ this.debitCardForm.value.debitCard4;
    var expDate = this.debitCardForm.value.expDate3 +""+ this.debitCardForm.value.expDate4 +""+ this.debitCardForm.value.expDate1 +""+ this.debitCardForm.value.expDate2 ;
    var cardPin = this.debitCardForm.value.pin1 + this.debitCardForm.value.pin2 + this.debitCardForm.value.pin3 + this.debitCardForm.value.pin4 ;
    var accountNo = this.DataService.primaryAccountDtl.accountNo;
    var param = this.resetTpinService.getResetTpinAuthforDebitCard(cardNo,cardPin ,expDate, accountNo );
    let deviceID = this.constant.deviceID;
    this.forgotMpinforDebitcardApiCall(param, deviceID);
  }

  forgotMpinforDebitcardApiCall(param, deviceID) {
    this.http .callBankingAPIService(param,deviceID,this.constant.serviceName_VALIDATEDEBITCARD).subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
          this.router.navigateByUrl("/resetNewTpin");
        }
      });
  }


}
