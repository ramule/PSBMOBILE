import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormFifteenGhService } from './form-fifteen-gh.service';

@Component({
  selector: 'app-form-fifteen-gh',
  templateUrl: './form-fifteen-gh.component.html',
  styleUrls: ['./form-fifteen-gh.component.scss']
})
export class FormFifteenGhComponent implements OnInit {

  formFifteenGHDetailsArr: any = [];
  fifteenGHValue: any;
  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location: Location,
    private encryptDecryptService: EncryptDecryptService,
    public commonMethod: CommonMethods,
    private formFifteenGHService: FormFifteenGhService
  ) { }

  fifteenGHForm: FormGroup;
  otpForm: FormGroup;
  assessedTaxModel: any;
  custBirthDate: any;
  dateDiff: any;

  @ViewChildren('otpRow') OTPRows: any;
  otpInput = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']

  ngOnInit(): void {
    this.buildForm();
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('FORM_15_G_H', this.router.url)
    this.DataService.setPageSettings('FORM_15_G_H');
    this.custBirthDate = !this.commonMethod.validateEmpty(this.DataService.profiledateDetails[0].custBirthDate) ? this.DataService.profiledateDetails[0].custBirthDate : '-';
    this.calculateDateRange();
    // this.getFifteenGHDetails();
  }

  calculateDateRange() {
    let date = this.custBirthDate.split("-")[0];
    let month = this.custBirthDate.split("-")[1];
    let year = this.custBirthDate.split("-")[2];
    var convertedDate = new Date(month+'-'+date+'-'+year);
    /* below condtion is to test popup */
    // var convertedDate = new Date('01-01-1941');
    this.dateDiff = this.calculateDiff(convertedDate);
    var ageDiff = parseInt(""+this.dateDiff/365);
    console.log('Age difference: ', ageDiff);
    if(ageDiff >= 60) {
      this.fifteenGHValue = '15H'
    }
    else {
      this.fifteenGHValue = '15G'
    }
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    // dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }


  buildForm() {
    this.fifteenGHForm = new FormGroup({
      customerName: new FormControl(''),
      dateOfBirth: new FormControl(''),
      panNumber: new FormControl(''),
      tds: new FormControl(''),
      formType: new FormControl(''),
      constitution: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pin: new FormControl(''),
      mobileNumber: new FormControl(''),
      branchCode: new FormControl(''),
      financialYear: new FormControl(''),
      email: new FormControl(''),
      branchName: new FormControl('', [Validators.required]),
      estimatedIncomeDeclaration: new FormControl('', [Validators.required, Validators.min(1)]),
      estimatedTotalIncome: new FormControl('', [Validators.required, Validators.min(1)]),
      totalIncome: new FormControl(''),
      taxAssessed: new FormControl('', [Validators.required]),
      lastAssessment: new FormControl('', [Validators.required]),
      taxableIncome: new FormControl(''),
      totalForm: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      termsCondition: new FormControl('', [Validators.required]),
    });

    this.otpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });
  }

  validateForm(value) {
    switch (value) {
      case 'form15GH':
        if (this.fifteenGHForm.invalid) {
          this.fifteenGHForm.get('branchName').markAsTouched();
          this.fifteenGHForm.get('estimatedIncomeDeclaration').markAsTouched();
          this.fifteenGHForm.get('estimatedTotalIncome').markAsTouched();
          this.fifteenGHForm.get('taxAssessed').markAsTouched();
          this.fifteenGHForm.get('lastAssessment').markAsTouched();
          this.fifteenGHForm.get('taxableIncome').markAsTouched();
          this.fifteenGHForm.get('totalForm').markAsTouched();
          this.fifteenGHForm.get('amount').markAsTouched();
          this.fifteenGHForm.get('termsCondition').markAsTouched();
        }
        break;

      case 'otpForm':
        if (this.otpForm.invalid) {
          this.otpForm.get('otp1').markAsTouched();
          this.otpForm.get('otp2').markAsTouched();
          this.otpForm.get('otp3').markAsTouched();
          this.otpForm.get('otp4').markAsTouched();
          this.otpForm.get('otp5').markAsTouched();
          this.otpForm.get('otp6').markAsTouched();
        }
        break;
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  submitForm() {
    if (this.fifteenGHForm.valid) {
      // this.goToPage('form15GHAuth')
      this.commonMethod.openPopup('div.otp-popup')
    } else {
      this.validateForm('form15GH');
    }
  }

  otpSubmit() {
    if (this.otpForm.valid) {
      this.commonMethod.closeAllPopup() ;
      this.goToPage('form15GHAuth')
    }
    else {
      this.validateForm('otpForm');
    }
  }

  getFifteenGHDetails() {
    var param = this.formFifteenGHService.getFormFifteenGHDetailsCall();
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_SUBMITFORM15G15H).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.formFifteenGHDetailsArr = data.listofDataset[0].records;
        console.log('Form fifteen G/H details: ', this.formFifteenGHDetailsArr);
      }
    });
  }

  infoPopup(value){
    switch(value){
      case 'taxIncome':
        this.commonMethod.openPopup('div.income-info-popup') ;
        break;

      case 'totalIncomeInfo' :
        this.commonMethod.openPopup('div.total-income-info-popup') ;
        break ;

      case 'taxInfo' :
        this.commonMethod.openPopup('div.tax-info-popup') ;
        break;
    }
  }

  closePopup(){
    this.commonMethod.closeAllPopup() ;
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
        if (type == 'otp') {
          this.otpForm.get(this.otpInput[index])?.setValue("");
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
    if (type == 'otp') {
      return this.OTPRows._results[index].nativeElement;
    }
  }
}

