import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountType, DropDownMaster } from 'src/app/utilities/app-enum';
import { AccountOpeningStepsService } from '../../../pre-login/account-opening/account-opening-steps/account-opening-steps.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { OpenDepositService } from './open-deposit.service';
import { InstantPayService } from '../../../fund-transfer/instant-pay/instant-pay.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { DatePipe, Location } from '@angular/common';
import { CommonMethods } from '../../../../../utilities/common-methods';
import * as moment from 'moment';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-open-deposit',
  templateUrl: './open-deposit.component.html',
  styleUrls: ['./open-deposit.component.scss']
})
export class OpenDepositComponent implements OnInit {
  openDepositTabSelection : any = 'fixed';
  accBalance: any = "";
  fixedMaturity : boolean = false ;
  recurringMaturity : boolean = false ;
  nomination : boolean = false ;
  recurringNomination : boolean = false;
  isAddress : boolean = false ;
  recurringIsAddress : boolean = false;
  accountList = [];
  invalidAmount: any = false;
  exceedMaxAmt: boolean = false;
  exceedMinAmt: boolean = false;
  todayDate: any;
  maturityValue: any;
  totalInterest: any;
  tenureMonths: any = "";
  tenureDays: any = "";
  customerProfileDetails: any;
  isStaffFlag: any;
  custBirthDate: any;
  rateOfInterest: any;
  isSeniorCitizenFlag: any;
  maturityDays: any;
  maturityDate: any;
  isValidTenure: boolean = false;
  autoClosureFlag: boolean = true;
  nomineeDetails: any = "";
  schemeCode: any = "";
  isYearExceeds: boolean = false;
  isRDYearExceeds: boolean = false;
  isMaturityCalculated: boolean = false;
  selectedTabDetails: any = "fixed";
  depositSchemeList = [
    {'depositScheme': 'General', 'schemeType' :'G'},
    {'depositScheme': 'Tax Saver', 'schemeType' :'T'},
  ];
  depositorTypeList = [];
  modeOfOperationList = [];
  maturityInstructionsList = ['Renew with maturity amount', 'Renew with principal amount', 'Auto Closure on maturity'];
  maturityPayout=[
    {'interestPayout': 'ON_MATURITY', 'payoutType' :'C'},
    {'interestPayout': 'QUARTERLY', 'payoutType' :'Q'},
    {'interestPayout': 'MONTHLY', 'payoutType' :'M'}
  ];
  yearsArray: any = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  monthsArray: any = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
  RDMonthsArray: any = ['00', '03', '06', '09'];
  daysArray: any = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
  stateList = [];
  cityList = [];
  guardianCityList = [];
  stateNomineeList = [];
  gardianTypeList = [];
  nomineeRelationshipList = [];
  month = 0
  days = 0
  day = 0
  recurringMonth = 0;
  isTermsAndCondition:any;
  recurringisTermsAndCondition:any;
  fixedForm : FormGroup ;
  recurringForm : FormGroup ;
  tenureType = 'days';
  nominationType : any ;
  nomineeAddress : any ;
  nomineeAge: any = "";
  minorFlag: boolean = false;
  recurringMinorFlag: boolean = false;
  modeOfOperationName: any = "";
  multipleof:boolean=false
  taxminAmt:boolean=false
  modeOfOpertion = [
    { 'ModeOfOperation' : '001' , 'modeOfOperationType' : 'SELF'},
    { 'ModeOfOperation' : '002' , 'modeOfOperationType' : 'Either or Survivor'},
    { 'ModeOfOperation' : '003' , 'modeOfOperationType' : 'Former or Survivor'},
    { 'ModeOfOperation' : '004' , 'modeOfOperationType' : 'Any One or Survivor'},
    { 'ModeOfOperation' : '005' , 'modeOfOperationType' : 'Jointly by all'},
    { 'ModeOfOperation' : '006' , 'modeOfOperationType' : 'Proprietor'},
    { 'ModeOfOperation' : '007' , 'modeOfOperationType' : 'Partner/Director'},
    { 'ModeOfOperation' : '008' , 'modeOfOperationType' : 'Managing Partners/Director'},
    { 'ModeOfOperation' : '009' , 'modeOfOperationType' : 'Any two Partners/Directors'},
    { 'ModeOfOperation' : '010' , 'modeOfOperationType' : 'Power of Attorney'},
    { 'ModeOfOperation' : '011' , 'modeOfOperationType' : 'Karta (HUF)'},
    { 'ModeOfOperation' : '012' , 'modeOfOperationType' : 'Authorized Signatory'},
    { 'ModeOfOperation' : '013' , 'modeOfOperationType' : 'Executor / Administrator'},
    { 'ModeOfOperation' : '014' , 'modeOfOperationType' : 'Guardian'},
    { 'ModeOfOperation' : '015' , 'modeOfOperationType' : 'Mandate Holder'},
    { 'ModeOfOperation' : '016' , 'modeOfOperationType' : 'Official Liquidator'},
    { 'ModeOfOperation' : '017' , 'modeOfOperationType' : 'Trusteed'},
    { 'ModeOfOperation' : '019' , 'modeOfOperationType' : 'Chairman'},
    { 'ModeOfOperation' : '020' , 'modeOfOperationType' : 'Secretary'},
    { 'ModeOfOperation' : '021' , 'modeOfOperationType' : 'President'},
    { 'ModeOfOperation' : '022' , 'modeOfOperationType' : 'Treasurer'},
    { 'ModeOfOperation' : '023' , 'modeOfOperationType' : 'Jointly or Survivors'},
    { 'ModeOfOperation' : '024' , 'modeOfOperationType' : 'Anyone '},
    { 'ModeOfOperation' : '025' , 'modeOfOperationType' : 'Constitutional Attorney'}
  ];

  currentDate: any = moment().toDate();

  constructor(
    private router: Router,
    public DataService: DataService,
    private accOpeningService:AccountOpeningStepsService,
    private http:HttpRestApiService,
    private constant:AppConstants,
    private openDepositService:OpenDepositService,
    private instantPayService: InstantPayService,
    private storage: LocalStorageService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private formValidation: FormValidationService,
    private datePipe: DatePipe,
    private commonMethod : CommonMethods,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.setPageSettings('OPEN_DEPOSIT');
    this.DataService.getBreadcrumb('OPEN_DEPOSIT' , this.router.url);
    this.selectedTabDetails = this.location.getState();
    console.log('sel Tab details: ', this.selectedTabDetails);
    this.openDepositTabSelection = this.selectedTabDetails.openDepositTabSelection;
    console.log('sel Tab: ', this.openDepositTabSelection);
    this.buildForm();
    this.customerProfileDetails = this.DataService.profileDetails;
    console.log('customer profile details: ', this.customerProfileDetails);
    this.isStaffFlag = this.customerProfileDetails[0].stafFlag;
    this.custBirthDate = this.customerProfileDetails[0].custBirthDate;
    this.initialize();
    console.log('customer staff flag: ', this.isStaffFlag);
    console.log('customer Birth Date: ', this.custBirthDate);
    console.log(this.accountList[0]);
    this.getAccountBalance(this.accountList[0].accountNo);
    this.todayDate = this.datePipe.transform(new Date(), 'dd MMM yyyy');
    console.log('today date: ', this.todayDate);
    

    if(this.nomination) {
      this.getInquiryNomineeDetails(this.accountList[0].accountNo, 'fixedForm');
    }

    if(this.openDepositTabSelection == 'fixed') {
      this.modeOfOperationName = this.getModeOfOperationName(this.accountList[0].ModeOfOperation);
      console.log('modeOfOperationName: ', this.modeOfOperationName);
      this.fixedForm.patchValue({
        debitAccount: this.accountList[0].accountNo,
        maturityPayoutAccount: this.accountList[0].accountNo,
        depositorType: this.isStaffFlag == 'Y' ? 'STAFF' : 'CUSTOMER',
        modeOperation: this.modeOfOperationName
      });
    } else {
      this.modeOfOperationName = this.getModeOfOperationName(this.accountList[0].ModeOfOperation);
      console.log('modeOfOperationName: ', this.modeOfOperationName);
      this.recurringForm.patchValue({
        debitAccount: this.accountList[0].accountNo,
        maturityPayoutAccount: this.accountList[0].accountNo,
        monthlyDebitDate: this.todayDate,
        depositorType: this.isStaffFlag == 'Y' ? 'STAFF' : 'CUSTOMER',
        modeOperation: this.modeOfOperationName
      });
    }
  }

  getModeOfOperationName(ModeOfOperation) {
    var val = this.modeOfOpertion.filter(x => x.ModeOfOperation == ModeOfOperation);
    console.log(val[0].modeOfOperationType);
    return val[0].modeOfOperationType;
  }

  calculateDateRange() {
    let date = this.custBirthDate.split("-")[0];
    let month = this.custBirthDate.split("-")[1];
    let year = this.custBirthDate.split("-")[2];
    var convertedDate = new Date(month+'-'+date+'-'+year);
    /* below condtion is to test popup */
    // var convertedDate = new Date('01-01-1941');
    var dateDiff = this.calculateDiff(convertedDate);
    var ageDiff = parseInt(""+dateDiff/365);
    console.log('Age difference: ', ageDiff);
    if(ageDiff < 50) {
      this.isSeniorCitizenFlag = 'N';
    }
    else {
      this.isSeniorCitizenFlag = 'Y';
    }
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    // dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  initialize(){
    this.tabSelection('fixed')
    this.getNomineeRelationList();
    this.getGardianType();
    this.getState()
    this.schemeCodeFetchDetails()

    this.DataService.customerOperativeAccList.forEach(el => {
      if( el.accountType != "CAPPI"){
        // if(el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT){
        if(el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT){
          if(el.accountFlag == "P" && el.Status == 'Active' && el.ModeOfOperation == "001"){
            console.log('account: ', el);
            this.accountList[0] = el;
          }
        }
      }
    })

    this.DataService.customerOperativeAccList.forEach(el => {
      if( el.accountType != "CAPPI"){
        if(el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT){
          if(el.accountFlag != "P" && el.Status == 'Active' && el.ModeOfOperation == "001"){
            console.log('account: ', el);
            this.accountList.push(el);
          }
        }
      }
    })

    console.log('accountList: ', this.accountList);

  }

  buildForm(){
    this.fixedForm = new FormGroup({
      debitAccount: new FormControl('',[Validators.required]),
      chooseDepositScheme: new FormControl('', [Validators.required]),
      depositorType: new FormControl(''),
      amount: new FormControl('', [Validators.required]),
      interestPayout : new FormControl('', [Validators.required]),
      selectOption : new FormControl(''),
      modeOperation: new FormControl(''),
      maturityInstruction: new FormControl('',[Validators.required]),
      maturityPayoutAccount: new FormControl(''),

      nomineeName: new FormControl('',[Validators.required]),
      maturityInstruction2: new FormControl('',[Validators.required]),
      sameAddress: new FormControl(''),
      datepicker1: new FormControl('',[Validators.required]),
      guardianName: new FormControl(''),
      guardianType: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl(''),
      year: new FormControl('Select Year'),
      month: new FormControl(''),
      day: new FormControl(''),
      dayField: new FormControl(''),
      custaddress1: new FormControl('',[Validators.required]),
      custaddress2: new FormControl('',[Validators.required]),
      custstate: new FormControl('',[Validators.required]),
      custcity: new FormControl('',[Validators.required]),
      custpincode: new FormControl('',[Validators.required]),
      termsCondition: new FormControl('',[Validators.required]),
    });

    this.recurringForm = new FormGroup({
      debitAccount: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      depositorType: new FormControl(''),
      year: new FormControl('',[Validators.required]),
      month: new FormControl('',[Validators.required]),
      monthlyDebitDate: new FormControl(''),
      modeOperation: new FormControl(''),
      maturityPayoutAccount: new FormControl(''),
      nomineeName: new FormControl('',[Validators.required]),
      maturityInstruction2: new FormControl('',[Validators.required]),
      sameAddress: new FormControl(''),
      datepicker1: new FormControl('',[Validators.required]),
      guardianName: new FormControl(''),
      guardianType: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl(''),
      custaddress1: new FormControl('',[Validators.required]),
      custaddress2: new FormControl('',[Validators.required]),
      custstate: new FormControl('',[Validators.required]),
      custcity: new FormControl('',[Validators.required]),
      custpincode: new FormControl('',[Validators.required]),
      termsCondition: new FormControl('',[Validators.required]),
    });

    this.daysSelection(this.tenureType)
  }


  validateForm(formType){

    switch(formType){
      case 'fixed':
        if (this.fixedForm.invalid) {
          this.fixedForm.get('chooseDepositScheme').markAsTouched();
          this.fixedForm.get('depositorType').markAsTouched();
          this.fixedForm.get('amount').markAsTouched();
          this.fixedForm.get('interestPayout').markAsTouched();

          this.fixedForm.get('debitAccount').markAsTouched();
          this.fixedForm.get('modeOperation').markAsTouched();
          this.fixedForm.get('maturityInstruction').markAsTouched();
          // this.fixedForm.get('maturityPayoutAccount').markAsTouched();
          this.fixedForm.get('termsCondition').markAsTouched();

          if(this.tenureType == 'days'){
            this.fixedForm.get('dayField').markAsTouched();
          }

          if(this.tenureType == 'yearMonthDays'){
            this.fixedForm.get('year').markAsTouched();
            this.fixedForm.get('month').markAsTouched();
            this.fixedForm.get('day').markAsTouched();
          }

          if(!this.nomination){
            this.fixedForm.get('nomineeName').markAsTouched();
            this.fixedForm.get('maturityInstruction2').markAsTouched();
            this.fixedForm.get('datepicker1').markAsTouched();
            this.fixedForm.get('guardianName').markAsTouched();
            this.fixedForm.get('guardianType').markAsTouched();
            this.fixedForm.get('address1').markAsTouched();
            this.fixedForm.get('address2').markAsTouched();
            this.fixedForm.get('state').markAsTouched();
            this.fixedForm.get('city').markAsTouched();
            this.fixedForm.get('pincode').markAsTouched();
            this.fixedForm.get('sameAddress').markAsTouched();
            this.fixedForm.get('custaddress1').markAsTouched();
            this.fixedForm.get('custaddress2').markAsTouched();
            this.fixedForm.get('custstate').markAsTouched();
            this.fixedForm.get('custcity').markAsTouched();
            this.fixedForm.get('custpincode').markAsTouched();
          }

          if(this.tenureType == 'days') {

          }
          return;
        }

        break;

        case 'recurring':

          if (this.recurringForm.invalid) {
            this.recurringForm.get('debitAccount').markAsTouched();
            this.recurringForm.get('amount').markAsTouched();
            this.recurringForm.get('year').markAsTouched();
            this.recurringForm.get('month').markAsTouched();
            this.recurringForm.get('termsCondition').markAsTouched();

            if(!this.recurringNomination){
              this.recurringForm.get('nomineeName').markAsTouched();
              this.recurringForm.get('maturityInstruction2').markAsTouched();
              this.recurringForm.get('datepicker1').markAsTouched();
              this.recurringForm.get('guardianName').markAsTouched();
              this.recurringForm.get('guardianType').markAsTouched();
              this.recurringForm.get('address1').markAsTouched();
              this.recurringForm.get('address2').markAsTouched();
              this.recurringForm.get('state').markAsTouched();
              this.recurringForm.get('city').markAsTouched();
              this.recurringForm.get('pincode').markAsTouched();
              this.recurringForm.get('sameAddress').markAsTouched();
              this.recurringForm.get('custaddress1').markAsTouched();
              this.recurringForm.get('custaddress2').markAsTouched();
              this.recurringForm.get('custstate').markAsTouched();
              this.recurringForm.get('custcity').markAsTouched();
              this.recurringForm.get('custpincode').markAsTouched();
            }
            return;
          }
          break ;
      }
  }

  depositSubmit(formType){

    switch(formType){
      case 'fixed' :
        if(this.fixedForm.valid){
          if(this.isMaturityCalculated) {
            console.log("Fixed Form Data :: ", this.fixedForm.value);
            this.getProductFetchDetails('FD');
          }
          else {
            this.commonMethod.openPopup('div.calculate-maturity-popup')
          }
        }
        else{
          this.validateForm(formType)
        }
      break;

      case 'recurring' :
      if(this.recurringForm.valid){
        if(this.isMaturityCalculated) {
          console.log("Recurring Form Data :: ", this.recurringForm.value);
          this.getProductFetchDetails('RD');
        }
        else {
          this.commonMethod.openPopup('div.calculate-maturity-popup')
        }
      }
      else{
        this.validateForm(formType)
      }
      break;
    }
  }

  getProductFetchDetails(FDRDType) {
    console.log('Nominee age: ', this.nomineeAge);
    if(FDRDType == 'FD') {
      var param = this.openDepositService.getFDAccountFetchDetailsCall(FDRDType, this.fixedForm.value, this.tenureMonths, this.tenureDays);
    }
    else {
      var param = this.openDepositService.getRDAccountFetchDetailsCall(FDRDType, this.recurringForm.value, this.tenureMonths);
    }

    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_PRODUCTFETCHDETAILS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
          this.schemeCode = data.set.records[0].descriptionCode.trim();
          console.log('scheme code: ', this.schemeCode);
        if(FDRDType == 'FD') {
          this.DataService.feedbackType = "FDDetails";
          var params = this.openDepositService.setTDAccountOpening(this.fixedForm.value, 'TDA', this.tenureMonths, this.nomination, this.schemeCode, this.nomineeDetails, this.isAddress, this.tenureDays);
          this.DataService.request = params;
          this.DataService.endPoint = this.constant.serviceName_TDACCOUNTOPENING;
          var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
          // if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
            this.DataService.openFDReceiptObj.depositAmount = this.fixedForm.value.amount;
            this.DataService.openFDReceiptObj.depositScheme = this.fixedForm.value.chooseDepositScheme;
            this.DataService.openFDReceiptObj.interestPayout = this.fixedForm.value.interestPayout;
            this.DataService.openFDReceiptObj.depositType = 'FD';
            this.DataService.openFDReceiptObj.depositorType = this.fixedForm.value.depositorType;
            this.DataService.openFDReceiptObj.interestRate = this.rateOfInterest;
            this.DataService.openFDReceiptObj.maturityAmount = this.maturityValue;
            this.DataService.openFDReceiptObj.maturityDate = this.maturityDate;
            this.DataService.openFDReceiptObj.maturityInstruction = this.fixedForm.value.maturityInstruction;
            this.DataService.openFDReceiptObj.maturityPayoutAccount = this.fixedForm.value.maturityPayoutAccount;
            this.DataService.openFDReceiptObj.modeOfOperation = 'SELF';
            this.DataService.openFDReceiptObj.nomineeName = this.fixedForm.value.nomineeName;
            if(this.tenureDays == 0) {
              this.DataService.openFDReceiptObj.tenure = this.tenureMonths+" Months";
            }
            else if(this.tenureMonths == 0) {
              this.DataService.openFDReceiptObj.tenure = this.tenureDays+" Days";
            }
            else {
              this.DataService.openFDReceiptObj.tenure = this.tenureMonths+" Months"+" " +this.tenureDays+" Days";
            }
            this.router.navigate(['/openDepositAccountAuthorization']);
        }
        else {

          this.DataService.feedbackType = "RDDetails";
          var params = this.openDepositService.setRDAccountOpening(this.recurringForm.value, 'RDA', this.tenureMonths, this.recurringNomination, this.schemeCode, this.autoClosureFlag, this.nomineeDetails, this.recurringIsAddress, this.tenureDays);
          this.DataService.request = params;
          this.DataService.endPoint = this.constant.serviceName_TDACCOUNTOPENING;
          var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
          // if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
            this.DataService.openRDReceiptObj.installmentAmount = this.recurringForm.value.amount;
            this.DataService.openRDReceiptObj.monthlyDebitDate = this.todayDate;
            this.DataService.openRDReceiptObj.depositType = 'RD';
            this.DataService.openRDReceiptObj.depositorType = this.recurringForm.value.depositorType;
            this.DataService.openRDReceiptObj.interestRate = this.rateOfInterest;
            this.DataService.openRDReceiptObj.maturityAmount = this.maturityValue;
            this.DataService.openRDReceiptObj.maturityDate = this.maturityDate;
            this.DataService.openRDReceiptObj.debitAccount = this.recurringForm.value.debitAccount;
            this.DataService.openRDReceiptObj.maturityPayoutAccount = this.recurringForm.value.maturityPayoutAccount;
            this.DataService.openRDReceiptObj.modeOfOperation = 'SELF';
            this.DataService.openRDReceiptObj.nomineeName = this.recurringForm.value.nomineeName;
            this.DataService.openRDReceiptObj.tenureMonths = this.tenureMonths;
            this.DataService.openRDReceiptObj.paymentFrequency = 'M';

            if(this.tenureDays == 0) {
              this.DataService.openRDReceiptObj.tenure = this.tenureMonths+" Months";
            }
            else {
              this.DataService.openRDReceiptObj.tenure = this.tenureMonths+" Months"+ this.tenureDays+" Days";
            }
          this.router.navigate(['/openRdAccountAuthorization']);
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  tabSelection(value){

    if(value == 'fixed' || value == 'recurring'){
      this.isMaturityCalculated = false;
      this.accBalance = "";
      this.autoClosureFlag = true;
      this.invalidAmount = false;
      this.exceedMaxAmt = false;
      this.exceedMinAmt = false;
      this.fixedMaturity = false;
      this.multipleof = false;
      this.taxminAmt = false

      this.tenureType = 'days' ;
      this.openDepositTabSelection = value ;
      if(value == 'fixed') {
        this.minorFlag = false;
        this.fixedForm.reset();
        // this.nomination = true;
        this.isAddress = false ;
        this.fixedForm.get('debitAccount').setValue('');
        this.fixedForm.get('chooseDepositScheme').setValue('');
        // this.fixedForm.get('depositorType').setValue('');
        this.fixedForm.get('amount').setValue('');
        this.fixedForm.get('interestPayout').setValue('');
        this.fixedForm.get('modeOperation').setValue('');
        this.fixedForm.get('maturityInstruction').setValue('');
        this.fixedForm.get('maturityInstruction2').setValue('');
        this.fixedForm.get('maturityPayoutAccount').setValue('');
        this.fixedForm.get('custaddress1').setValue('');
        this.fixedForm.get('custaddress2').setValue('');
        this.fixedForm.get('custstate').setValue('');
        this.fixedForm.get('custcity').setValue('');
        this.fixedForm.get('custpincode').setValue('');
        if(this.nomineeAge < 18){
          this.fixedForm.get('guardianName').setValue('');
          this.fixedForm.get('guardianType').setValue('');
          this.fixedForm.get('address1').setValue('');
          this.fixedForm.get('address2').setValue('');
          this.fixedForm.get('state').setValue('');
          this.fixedForm.get('city').setValue('');
          this.fixedForm.get('pincode').setValue('');
        }
        let date = this.custBirthDate.split("-")[0];
        let month = this.custBirthDate.split("-")[1];
        let year = this.custBirthDate.split("-")[2];
        var ageDiff = parseInt(""+moment().diff(year+"-"+month+"-"+date,'years',true))


        this.fixedForm.patchValue({
          depositorType: this.isStaffFlag == 'Y' ? 'STAFF' : 'CUSTOMER',
          modeOperation: 'SELF'
        });

        if(ageDiff >= 60 && this.isStaffFlag == 'Y' )
        {
          this.fixedForm.patchValue({
            monthlyDebitDate: this.todayDate,
            depositorType: 'Ex-Staff',
            modeOperation: 'SELF'
          });
        }

        if(ageDiff >= 60 && this.isStaffFlag != 'Y' )
        {
          this.fixedForm.patchValue({
            monthlyDebitDate: this.todayDate,
            depositorType: 'Senior Citizen',
            modeOperation: 'SELF'
          });
        }

      }
      else {
        this.recurringMinorFlag = false;
        this.recurringForm.reset();
        // this.recurringNomination = true;
        this.recurringIsAddress = false ;
        this.recurringMaturity = false;
        this.recurringForm.get('debitAccount').setValue('');
        // this.recurringForm.get('depositorType').setValue('');
        this.recurringForm.get('amount').setValue('');
        // this.recurringForm.get('monthlyDebitDate').setValue('');
        this.recurringForm.get('modeOperation').setValue('');
        this.recurringForm.get('maturityPayoutAccount').setValue('');
        this.recurringForm.get('maturityInstruction2').setValue('');
        this.recurringForm.get('year').setValue('');
        this.recurringForm.get('month').setValue('');
        this.recurringForm.get('custaddress1').setValue('');
        this.recurringForm.get('custaddress2').setValue('');
        this.recurringForm.get('custstate').setValue('');
        this.recurringForm.get('custcity').setValue('');
        this.recurringForm.get('custpincode').setValue('');
        if(this.nomineeAge < 18){
          this.recurringForm.get('guardianName').setValue('');
          this.recurringForm.get('guardianType').setValue('');
          this.recurringForm.get('address1').setValue('');
          this.recurringForm.get('address2').setValue('');
          this.recurringForm.get('state').setValue('');
          this.recurringForm.get('city').setValue('');
          this.recurringForm.get('pincode').setValue('');
        }
        let date = this.custBirthDate.split("-")[0];
        let month = this.custBirthDate.split("-")[1];
        let year = this.custBirthDate.split("-")[2];
        var ageDiff = parseInt(""+moment().diff(year+"-"+month+"-"+date,'years',true))
        console.log("age diff"+ageDiff)
        this.recurringForm.patchValue({
          monthlyDebitDate: this.todayDate,
          depositorType: this.isStaffFlag == 'Y' ? 'STAFF' : 'CUSTOMER',
          modeOperation: 'SELF'
        });

        if(ageDiff >= 60 && this.isStaffFlag == 'Y' )
        {
          this.recurringForm.patchValue({
            monthlyDebitDate: this.todayDate,
            depositorType: 'Ex-Staff',
            modeOperation: 'SELF'
          });
        }

        if(ageDiff >= 60 && this.isStaffFlag != 'Y' )
        {
          this.recurringForm.patchValue({
            monthlyDebitDate: this.todayDate,
            depositorType: 'Senior Citizen',
            modeOperation: 'SELF'
          });
        }

      }
    }
    else if(value == 'fixedMaturity'){
      this.isMaturityCalculated = true;
      if(this.fixedForm.value.chooseDepositScheme == 'G') {
        if(this.fixedForm.value.interestPayout == 'C') {
          if(this.fixedForm.value.amount != ''  && ( this.fixedForm.value.dayField != '' || (this.fixedForm.value.day != '' || this.fixedForm.value.year != ''|| this.fixedForm.value.month != '') ) ){
            if(this.tenureType =="days") {
              if(this.fixedForm.controls['dayField'].value > 14) {
                this.fixedMaturity = true ;
                this.getInterestRates('fixedForm');
              }
              if(this.fixedForm.value.dayField == '' ) {
                this.fixedForm.get('dayField').markAsTouched();
              }

            } else if(this.tenureType =="yearMonthDays"){

              if((this.fixedForm.value.day != '' || this.fixedForm.value.year != ''|| this.fixedForm.value.month != '')) {
                if(this.fixedForm.value.year == '') {
                  this.fixedForm.patchValue({
                    year: '00'
                  });
                }
                if(this.fixedForm.value.month == '') {
                  this.fixedForm.patchValue({
                    month: '00'
                  });
                }
                if(this.fixedForm.value.day == '') {
                  this.fixedForm.patchValue({
                    day: '00'
                  });
                }

                if(this.fixedForm.value.year == '00' && this.fixedForm.value.month == '00' && this.fixedForm.value.day < '15') {
                  this.yearMonthDayZeroConditionFixedForm();
                }
                else {
                  if(!this.exceedMaxAmt && !this.exceedMinAmt && !this.invalidAmount && !this.multipleof && !this.taxminAmt) {
                    this.fixedMaturity = true ;
                    this.getInterestRates('fixedForm');
                  }
                }
              }

              if(this.fixedForm.value.day == '' && this.fixedForm.value.year == '' && this.fixedForm.value.month == '') {
                this.fixedForm.get('day').markAsTouched();
                this.fixedForm.get('year').markAsTouched();
                this.fixedForm.get('month').markAsTouched();
              }

            }
            else{
              this.fixedMaturity = false ;
            }
          } else{
            this.fixedForm.get('amount').markAsTouched();
            if(this.tenureType == 'days'){
              this.fixedForm.get('dayField').markAsTouched();
            }
            if(this.tenureType == 'yearMonthDays'){
              this.fixedForm.get('year').markAsTouched();
              this.fixedForm.get('month').markAsTouched();
              this.fixedForm.get('day').markAsTouched();
            }
          }
        }
        else {
          if(this.fixedForm.value.amount != ''  && ( this.fixedForm.value.dayField != '' || (this.fixedForm.value.day != '' || this.fixedForm.value.year != ''|| this.fixedForm.value.month != '') )){
            if(this.tenureType =="yearMonthDays"){

              if((this.fixedForm.value.day != '' || this.fixedForm.value.year != ''|| this.fixedForm.value.month != '')) {
                if(this.fixedForm.value.year == '' || this.fixedForm.value.year == '00') {
                  this.fixedForm.get('year').setValidators([Validators.required]);
                  this.fixedForm.controls['year'].updateValueAndValidity();
                }
                if(this.fixedForm.value.month == '') {
                  this.fixedForm.patchValue({
                    month: '00'
                  });
                }
                if(this.fixedForm.value.day == '') {
                  this.fixedForm.patchValue({
                    day: '00'
                  });
                }
                if(this.fixedForm.get('year').valid && !this.exceedMaxAmt && !this.exceedMinAmt && !this.invalidAmount && !this.multipleof && !this.taxminAmt) {
                  this.fixedMaturity = true ;
                  this.getInterestRates('fixedForm');
                }
              }

              if(this.fixedForm.value.day == '' && this.fixedForm.value.year == '' && this.fixedForm.value.month == '') {
                this.fixedForm.get('day').markAsTouched();
                this.fixedForm.get('year').markAsTouched();
                this.fixedForm.get('month').markAsTouched();
              }
            }
            else{
              this.fixedMaturity = false ;
            }
          } else{
            this.fixedForm.get('amount').markAsTouched();
            this.fixedForm.get('year').markAsTouched();
            this.fixedForm.get('month').markAsTouched();
            this.fixedForm.get('day').markAsTouched();
          }
        }
      }
      else {
        if(this.fixedForm.value.amount != ''  && (this.fixedForm.value.day != '' || this.fixedForm.value.year != ''|| this.fixedForm.value.month != '')){
          if(this.tenureType =="yearMonthDays"){

            if((this.fixedForm.value.day != '' || this.fixedForm.value.year != ''|| this.fixedForm.value.month != '')) {
              if(this.fixedForm.value.year == '' || this.fixedForm.value.year == '00') {
                this.fixedForm.get('year').setValidators([Validators.required]);
                this.fixedForm.controls['year'].updateValueAndValidity();
              }
              if(this.fixedForm.value.month == '') {
                this.fixedForm.patchValue({
                  month: '00'
                });
              }
              if(this.fixedForm.value.day == '') {
                this.fixedForm.patchValue({
                  day: '00'
                });
              }
              if(this.fixedForm.get('year').valid && !this.exceedMaxAmt && !this.exceedMinAmt && !this.invalidAmount && !this.multipleof && !this.taxminAmt) {
                this.fixedMaturity = true ;
                this.getInterestRates('fixedForm');
              }
            }

            if(this.fixedForm.value.day == '' && this.fixedForm.value.year == '' && this.fixedForm.value.month == '') {
              this.fixedForm.get('day').markAsTouched();
              this.fixedForm.get('year').markAsTouched();
              this.fixedForm.get('month').markAsTouched();
            }
          }
          else{
            this.fixedMaturity = false ;
          }
        } else{
          this.fixedForm.get('amount').markAsTouched();
          this.fixedForm.get('year').markAsTouched();
          this.fixedForm.get('month').markAsTouched();
          this.fixedForm.get('day').markAsTouched();
        }
      }

    }
    else if(value == 'recurringMaturity'){
      this.isMaturityCalculated = true;
      if(this.recurringForm.value.amount != ''  &&  (this.recurringForm.value.year != '' || this.recurringForm.value.month != '')) {
        if(this.recurringForm.value.year == '' || this.recurringForm.value.year == '00') {
          if(this.recurringForm.value.month < '06') {
            this.recurringForm.get('month').setValidators([Validators.required, Validators.min(6)]);
            this.recurringForm.controls['month'].updateValueAndValidity();
          }
          else {
            this.recurringForm.get('month').setValidators([]);
            this.recurringForm.controls['month'].updateValueAndValidity();
            this.recurringForm.patchValue({
              year: '00'
            });
            this.recurringMaturity = true;
            this.getInterestRates('recurringForm');
          }
        }
        else {
          if(this.recurringForm.value.month == '') {
            this.recurringForm.patchValue({
              month: '00'
            });
            return;
          }
          else {
            this.recurringMaturity = true;
            this.getInterestRates('recurringForm');
          }
        }
      } else{
        this.recurringMaturity = false;
        this.recurringForm.get('amount').markAsTouched();
        this.recurringForm.get('year').markAsTouched();
        this.recurringForm.get('month').markAsTouched();
      }
    }
  }

  getInterestRates(formName) {
    if(formName == 'fixedForm') {
      var param = this.openDepositService.getInterestRatesCall(this.fixedForm.value, formName, this.tenureType);
    }
    else {
      var param = this.openDepositService.getInterestRatesCall(this.recurringForm.value, formName);
    }
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETFDRDMATURITYRATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if(resp.opstatus == '00') {
        this.isValidTenure = true;
        var interestRatesObj = data.set.records[0];
        console.log('interest Rate obj: ', interestRatesObj);
        if(this.isSeniorCitizenFlag == 'Y') {
          if(this.isStaffFlag == 'Y') {
            this.rateOfInterest = interestRatesObj.additionalPercentage;
          }
          else {
            this.rateOfInterest = interestRatesObj.seniorCitizenPencentage;
          }
        }
        else {
          if(this.isStaffFlag == 'Y') {
            this.rateOfInterest = interestRatesObj.staffPercentage;
          }
          else {
            this.rateOfInterest = interestRatesObj.generalPublicPercentage;
          }
        }
        if(formName == 'fixedForm') {
          if(this.fixedForm.value.chooseDepositScheme == 'G') {
            if(this.fixedForm.value.interestPayout == 'C') {
              this.calculateFDCI(this.rateOfInterest);
            }
            else {
              this.calculateFDSI(this.rateOfInterest);
            }
          }
          else if(this.fixedForm.value.chooseDepositScheme == 'T') {
            if(this.fixedForm.value.interestPayout == 'C') {
              this.calculateFDCI(this.rateOfInterest);
            }
            else {
              this.calculateFDSI(this.rateOfInterest);
            }
          }
        }
        else {
          this.calculateRDCI(this.rateOfInterest);
        }
      }
      else {
        this.isValidTenure = false;
      }
    });
  }

  calculateFDSI(rateOfInterest) {
    this.maturityDate = new Date();
    var todaydate = new Date();
    var p = this.fixedForm.get('amount').value.split('.')[0].trim().replace(/[^0-9]+/g, '');
    console.log('principal amount: ', p);
    var i = rateOfInterest;
    var ic = 3; //QUARTERLY
    var n; //months
    var mv; //Maturity value
    var mYear;
    var mMonth;
    var mDay;
    if(this.tenureType == 'days') {
      n = (this.fixedForm.get('dayField').value)/30;
      this.tenureDays = this.fixedForm.get('dayField').value;
      console.log('Tenure days: ', this.tenureDays);

      this.maturityDate = this.datePipe.transform(new Date(todaydate.setDate(todaydate.getDate() + Number(this.tenureDays))), 'dd MMM yyyy');
      console.log('Maturity Date: ', this.maturityDate);
    }
    else if(this.tenureType == 'yearMonthDays') {
      console.log('year: ', Number(this.fixedForm.get('year').value));
      console.log('month: ', Number(this.fixedForm.get('month').value));
      console.log('days: ', Number(this.fixedForm.get('day').value));

      mYear = todaydate.getFullYear() + Number(this.fixedForm.get('year').value);
      mMonth = todaydate.getMonth() + Number(this.fixedForm.get('month').value);
      mDay = todaydate.getDate() + Number(this.fixedForm.get('day').value);

      console.log('mYear: ', mYear);
      console.log('mMonth: ', mMonth);
      console.log('mDay: ', mDay);

      if(Number(this.fixedForm.get('day').value) == 0) {
        n = (Number(this.fixedForm.get('year').value))*12 + (Number(this.fixedForm.get('month').value)) + (Number(this.fixedForm.get('day').value))

        this.maturityDate = this.datePipe.transform(new Date(Date.UTC(mYear, mMonth, todaydate.getDate())), 'dd MMM yyyy');
        console.log('Maturity Date: ', this.maturityDate);
      }
      else {
        n = (Number(this.fixedForm.get('year').value))*12 + (Number(this.fixedForm.get('month').value)) + (Number(this.fixedForm.get('day').value))/30

        this.maturityDate = this.datePipe.transform(new Date(Date.UTC(mYear, mMonth, mDay)), 'dd MMM yyyy');
        console.log('Maturity Date: ', this.maturityDate);
      }
      this.tenureMonths = (Number(this.fixedForm.get('year').value))*12 + (Number(this.fixedForm.get('month').value));
      this.tenureDays = (Number(this.fixedForm.get('day').value));
      console.log('Tenure Months: ', this.tenureMonths);
      console.log('Tenure Days: ', this.tenureDays);
    }
    this.maturityValue = "";

    // The equation is A = p * [[1 + (r/n)] ^ nt]
    mv = ((p * i * n)/1200).toFixed(2);
    this.maturityValue = p;
    console.log('Maturity Value: ', this.maturityValue);
    this.totalInterest = mv;
    console.log('Total Interest: ', this.totalInterest);
  }

  calculateFDCI(rateOfInterest) {
    this.maturityDate = new Date();
    var todaydate = new Date();
    var p = this.fixedForm.get('amount').value.split('.')[0].trim().replace(/[^0-9]+/g, '');
    console.log('principal amount: ', p);
    var i = rateOfInterest;
    var ic = 4; //QUARTERLY
    var n; //months
    var mv; //Maturity value
    var mYear;
    var mMonth;
    var mDay;
    if(this.tenureType == 'days') {
      n = (this.fixedForm.get('dayField').value)/30;
      this.tenureDays = this.fixedForm.get('dayField').value;
      console.log('Tenure days: ', this.tenureDays);

      this.maturityDate = this.datePipe.transform(new Date(todaydate.setDate(todaydate.getDate() + Number(this.tenureDays))), 'dd MMM yyyy');
      console.log('Maturity Date: ', this.maturityDate);
    }
    else if(this.tenureType == 'yearMonthDays') {
      console.log('year: ', Number(this.fixedForm.get('year').value));
      console.log('month: ', Number(this.fixedForm.get('month').value));
      console.log('days: ', Number(this.fixedForm.get('day').value));

      mYear = todaydate.getFullYear() + Number(this.fixedForm.get('year').value);
      mMonth = todaydate.getMonth() + Number(this.fixedForm.get('month').value);
      mDay = todaydate.getDate() + Number(this.fixedForm.get('day').value);

      console.log('mYear: ', mYear);
      console.log('mMonth: ', mMonth);
      console.log('mDay: ', mDay);

      if(Number(this.fixedForm.get('day').value) == 0) {
        n = (Number(this.fixedForm.get('year').value))*12 + (Number(this.fixedForm.get('month').value)) + (Number(this.fixedForm.get('day').value))

        this.maturityDate = this.datePipe.transform(new Date(Date.UTC(mYear, mMonth, todaydate.getDate())), 'dd MMM yyyy');
        console.log('Maturity Date: ', this.maturityDate);
      }
      else {
        n = (Number(this.fixedForm.get('year').value))*12 + (Number(this.fixedForm.get('month').value)) + (Number(this.fixedForm.get('day').value))/30

        this.maturityDate = this.datePipe.transform(new Date(Date.UTC(mYear, mMonth, mDay)), 'dd MMM yyyy');
        console.log('Maturity Date: ', this.maturityDate);
      }
      this.tenureMonths = (Number(this.fixedForm.get('year').value))*12 + (Number(this.fixedForm.get('month').value));
      this.tenureDays = (Number(this.fixedForm.get('day').value));
      console.log('Tenure Months: ', this.tenureMonths);
      console.log('Tenure Days: ', this.tenureDays);
    }
    this.maturityValue = "";

    // The equation is A = p * [[1 + (r/n)] ^ nt]
    mv = (p * Math.pow((1 + (i / (ic * 100))), (ic * n/12))).toFixed(2);
    this.maturityValue = mv;
    console.log('Maturity Value: ', mv);
    this.totalInterest = this.maturityValue - p;
    console.log('Total Interest: ', this.totalInterest);
  }

  calculateRDCI(rateOfInterest) {
    this.maturityValue = "";
    var mYear;
    var mMonth;
    var todaydate = new Date();
    mYear = todaydate.getFullYear() + Number(this.recurringForm.get('year').value);
    mMonth = todaydate.getMonth() + Number(this.recurringForm.get('month').value);

    console.log('mYear: ', mYear);
    console.log('mMonth: ', mMonth);

    this.maturityDate = this.datePipe.transform(new Date(Date.UTC(mYear, mMonth, todaydate.getDate())), 'dd MMM yyyy');
    console.log('Maturity Date: ', this.maturityDate);

    var p = this.recurringForm.get('amount').value.split('.')[0].trim().replace(/[^0-9]+/g, '');
    var i = rateOfInterest;
    var ic = 4; //QUARTERLY
    var n = (Number(this.recurringForm.get('year').value))*12 + (Number(this.recurringForm.get('month').value)); //months
    var mv; //Maturity value

    this.tenureMonths = (Number(this.recurringForm.get('year').value))*12 + (Number(this.recurringForm.get('month').value));
    console.log('Tenure Months: ', this.tenureMonths);

    // The equation is A = p * [[1 + (r/n)] ^ nt]
    // mv = (p * Math.pow((1 + (i / (ic * 100))), (ic * n/12))).toFixed(2);
    mv = ((p * (Math.pow((1+(i/ic)/100), (ic * (n/12)))-1))/(1- Math.pow((1+(i/ic)/100), -ic/12))).toFixed(2);
    // mv = ((Math.pow(((400+i)/400),(n/3))-1)*2*p*((600+i)/i)).toFixed(2);
    this.maturityValue = mv;
    console.log('Maturity Value: ', mv);
    this.totalInterest = this.maturityValue - (p*n);
    console.log('Total Interest: ', this.totalInterest);
  }

  nominationSelection(value){
    this.nominationType = value ;
    switch(value){
      case 'nomination':
        // this.nomination = !this.nomination;
      if(!this.nomination){
        this.fixedForm.controls['nomineeName'].setValidators([Validators.required])
        this.fixedForm.controls['maturityInstruction2'].setValidators([Validators.required])
        this.fixedForm.controls['datepicker1'].setValidators([Validators.required])
        this.fixedForm.controls['guardianType'].setValidators([Validators.required])
        this.fixedForm.controls['address1'].setValidators([Validators.required])
        this.fixedForm.controls['state'].setValidators([Validators.required])
        this.fixedForm.controls['city'].setValidators([Validators.required])
        this.fixedForm.controls['pincode'].setValidators([Validators.required])

        this.fixedForm.controls['custaddress1'].setValidators([Validators.required])
        this.fixedForm.controls['custaddress2'].setValidators([Validators.required])
        this.fixedForm.controls['custstate'].setValidators([Validators.required])
        this.fixedForm.controls['custcity'].setValidators([Validators.required])
        this.fixedForm.controls['custpincode'].setValidators([Validators.required])

        this.fixedForm.patchValue({
          nomineeName: '',
          maturityInstruction2: '',
          datepicker1: '',
          custaddress1: '',
          custaddress2: '',
          custstate: '',
          custcity: '',
          custpincode: '',
          guardianName: '',
          guardianType: '',
          address1: '',
          address2: '',
          state: '',
          city: '',
          pincode: '',
        });
      }
      else {

        this.fixedForm.controls['nomineeName'].clearValidators()
        this.fixedForm.controls['maturityInstruction2'].clearValidators()
        this.fixedForm.controls['datepicker1'].clearValidators()
        this.fixedForm.controls['guardianType'].clearValidators()
        this.fixedForm.controls['address1'].clearValidators()
        this.fixedForm.controls['state'].clearValidators()
        this.fixedForm.controls['city'].clearValidators()
        this.fixedForm.controls['pincode'].clearValidators()

        this.fixedForm.controls['custaddress1'].clearValidators()
        this.fixedForm.controls['custaddress2'].clearValidators()
        this.fixedForm.controls['custstate'].clearValidators()
        this.fixedForm.controls['custcity'].clearValidators()
        this.fixedForm.controls['custpincode'].clearValidators()

        this.getInquiryNomineeDetails(this.fixedForm.value.debitAccount, 'fixedForm');
      }

      this.fixedForm.controls['nomineeName'].updateValueAndValidity();
      this.fixedForm.controls['maturityInstruction2'].updateValueAndValidity()
      this.fixedForm.controls['datepicker1'].updateValueAndValidity()
      this.fixedForm.controls['guardianType'].updateValueAndValidity()
      this.fixedForm.controls['address1'].updateValueAndValidity()
      this.fixedForm.controls['state'].updateValueAndValidity()
      this.fixedForm.controls['city'].updateValueAndValidity()
      this.fixedForm.controls['pincode'].updateValueAndValidity()

      this.fixedForm.controls['custaddress1'].updateValueAndValidity();
      this.fixedForm.controls['custaddress2'].updateValueAndValidity()
      this.fixedForm.controls['custstate'].updateValueAndValidity()
      this.fixedForm.controls['custcity'].updateValueAndValidity()
      this.fixedForm.controls['custpincode'].updateValueAndValidity()

      break;

      case 'recurringNomination' :

        // this.recurringNomination = !this.recurringNomination;
        if(!this.recurringNomination){
          this.recurringForm.controls['nomineeName'].setValidators([Validators.required])
          this.recurringForm.controls['maturityInstruction2'].setValidators([Validators.required])
          this.recurringForm.controls['datepicker1'].setValidators([Validators.required])
          this.recurringForm.controls['guardianType'].setValidators([Validators.required])
          this.recurringForm.controls['address1'].setValidators([Validators.required])
          this.recurringForm.controls['state'].setValidators([Validators.required])
          this.recurringForm.controls['city'].setValidators([Validators.required])
          this.recurringForm.controls['pincode'].setValidators([Validators.required])

          this.recurringForm.controls['custaddress1'].setValidators([Validators.required])
          this.recurringForm.controls['custaddress2'].setValidators([Validators.required])
          this.recurringForm.controls['custstate'].setValidators([Validators.required])
          this.recurringForm.controls['custcity'].setValidators([Validators.required])
          this.recurringForm.controls['custpincode'].setValidators([Validators.required])

          this.recurringForm.patchValue({
            nomineeName: '',
            maturityInstruction2: '',
            datepicker1: '',
            custaddress1: '',
            custaddress2: '',
            custstate: '',
            custcity: '',
            custpincode: '',
            guardianName: '',
            guardianType: '',
            address1: '',
            address2: '',
            state: '',
            city: '',
            pincode: '',
          })
        }
        else {
          this.recurringForm.controls['nomineeName'].clearValidators()
          this.recurringForm.controls['maturityInstruction2'].clearValidators()
          this.recurringForm.controls['datepicker1'].clearValidators()
          this.recurringForm.controls['guardianType'].clearValidators()
          this.recurringForm.controls['address1'].clearValidators()
          this.recurringForm.controls['state'].clearValidators()
          this.recurringForm.controls['city'].clearValidators()
          this.recurringForm.controls['pincode'].clearValidators()


          this.recurringForm.controls['custaddress1'].clearValidators()
          this.recurringForm.controls['custaddress2'].clearValidators()
          this.recurringForm.controls['custstate'].clearValidators()
          this.recurringForm.controls['custcity'].clearValidators()
          this.recurringForm.controls['custpincode'].clearValidators()

          this.getInquiryNomineeDetails(this.recurringForm.value.debitAccount, 'recurringForm');
        }

        this.recurringForm.controls['nomineeName'].updateValueAndValidity();
        this.recurringForm.controls['maturityInstruction2'].updateValueAndValidity()
        this.recurringForm.controls['datepicker1'].updateValueAndValidity()
        this.recurringForm.controls['guardianType'].updateValueAndValidity()
        this.recurringForm.controls['address1'].updateValueAndValidity()
        this.recurringForm.controls['state'].updateValueAndValidity()
        this.recurringForm.controls['city'].updateValueAndValidity()
        this.recurringForm.controls['pincode'].updateValueAndValidity()

        this.recurringForm.controls['custaddress1'].updateValueAndValidity();
        this.recurringForm.controls['custaddress2'].updateValueAndValidity()
        this.recurringForm.controls['custstate'].updateValueAndValidity()
        this.recurringForm.controls['custcity'].updateValueAndValidity()
        this.recurringForm.controls['custpincode'].updateValueAndValidity()
        break;
    }

  }

  applicantAddressSelection(){
    console.log('profileDetails: ', this.DataService.profileDetails);
    switch(this.openDepositTabSelection){
      case 'fixed':
        this.isAddress = !this.isAddress;
        if(this.isAddress) {
          // this.fixedForm.get('custaddress1').disable();
          // this.fixedForm.get('custaddress2').disable();
          // this.fixedForm.get('custstate').disable();
          // this.fixedForm.get('custcity').disable();
          // this.fixedForm.get('custpincode').disable();

          this.fixedForm.patchValue({
            custaddress1: this.DataService.profileDetails[0].add1 ,
            custaddress2: this.DataService.profileDetails[0].add2,
            custstate: this.DataService.custProfileStateCityObj.state,
            custcity: this.DataService.custProfileStateCityObj.city,
            custpincode : this.DataService.profileDetails[0].pin
          });

        }
        else {
          this.fixedForm.patchValue({
            custaddress1: "",
            custaddress2: "",
            custstate: "",
            custcity: "",
            custpincode: ""
          });

          this.fixedForm.get('custaddress1').enable();
          this.fixedForm.get('custaddress2').enable();
          this.fixedForm.get('custstate').enable();
          this.fixedForm.get('custcity').enable();
          this.fixedForm.get('custpincode').enable();
        }

      break;

      case 'recurring' :
        this.recurringIsAddress = !this.recurringIsAddress;
        if(this.recurringIsAddress) {
          // this.recurringForm.get('custaddress1').disable();
          // this.recurringForm.get('custaddress2').disable();
          // this.recurringForm.get('custstate').disable();
          // this.recurringForm.get('custcity').disable();
          // this.recurringForm.get('custpincode').disable();

          this.recurringForm.patchValue({
            custaddress1: this.DataService.profileDetails[0].add1 ,
            custaddress2: this.DataService.profileDetails[0].add2,
            custstate: this.DataService.custProfileStateCityObj.state,
            custcity: this.DataService.custProfileStateCityObj.city,
            custpincode : this.DataService.profileDetails[0].pin
          });
        }
        else {
          this.recurringForm.patchValue({
            custaddress1: "",
            custaddress2: "",
            custstate: "",
            custcity: "",
            custpincode: ""
          });
          this.recurringForm.get('custaddress1').enable();
          this.recurringForm.get('custaddress2').enable();
          this.recurringForm.get('custstate').enable();
          this.recurringForm.get('custcity').enable();
          this.recurringForm.get('custpincode').enable();
        }

        break;
    }

  }



  // API calls

  // tdAccountOpening() {

  //   var param;
  //   switch (this.openDepositTabSelection){
  //     case 'fixed':
  //       param = this.openDepositService.setTDAccountOpening(this.fixedForm.value , 'TDA' , this.month , this.day);
  //       break;
  //     case 'recurring':
  //       param = this.openDepositService.setTDAccountOpening(this.recurringForm.value , 'RDA' , this.recurringMonth);
  //       break;
  //   }

  //   this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_TDACCOUNTOPENING).subscribe(data => {
  //     console.log(data);
  //     var resp = data.responseParameter
  //     if (resp.opstatus == "00") {

  //     }
  //     else {
  //       this.errorCallBack(data.subActionId, resp);
  //     }
  //   });
  // }

  schemeCodeFetchDetails() {

    var param;
    switch (this.openDepositTabSelection){
      case 'fixed':
        param = this.accOpeningService.getSchemeDetails('TDA');
        break;
      case 'recurring':
        param = this.accOpeningService.getSchemeDetails('RDA');
        break;
    }

    /*NOTE : Removing as per Sushant Comment since there is only 2 fixed value*/
    // this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_PRODUCTFETCHDETAILS).subscribe(data => {
    //   console.log(data);
    //   var resp = data.responseParameter
    //   if (resp.opstatus == "00") {
    //     this.depositSchemeList =  data.listofDataset[0].records;
    //     console.log("depositSchemeList" + JSON.stringify(this.depositSchemeList))
    //   }
    //   else {
    //     this.errorCallBack(data.subActionId, resp);
    //   }
    // });
  }

  rdClosureValidation() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_RDCLOSUREVALIDATION).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  tdClosureValidation() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.gardianTypeList = data.listofDataset[0].records;
        }
      }
      else {
        this.gardianTypeList = [
          { "DESCRIPTION": "Father", "ref_code": "1" },
          { "DESCRIPTION": "Mother", "ref_code": "2" },
          { "DESCRIPTION": "grandFather", "ref_code": "3" },
          { "DESCRIPTION": "Uncle", "ref_code": "4" }
        ]
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getGardianType() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.gardianTypeList = data.listofDataset[0].records;
        }
      }
      else {
        this.gardianTypeList = [
          { "DESCRIPTION": "Court Appointed", "ref_code": "C" },
          { "DESCRIPTION": "Defacto Guardin", "ref_code": "D" },
          { "DESCRIPTION": "father", "ref_code": "F" },
          { "DESCRIPTION": "Mother", "ref_code": "M" },
          { "DESCRIPTION": "Other", "ref_code": "O" }
        ]
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getNomineeRelationList() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.NOMINEE_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.nomineeRelationshipList = data.listofDataset[0].records;
          console.log('Nominee Relationship List: ', this.nomineeRelationshipList);
        }
      }
    });
  }

  getState() {
    let stateListParams = this.openDepositService.getStateListParams();
    this.http.callBankingAPIService(stateListParams, this.constant.deviceID, this.constant.serviceName_GETSTATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.stateList = data.set.records;
          console.log('State List: ', this.stateList);
          this.stateNomineeList = data.set.records;
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getCity(stateId, type) {
    let cityListParams = this.openDepositService.getCityListParams(stateId);
    this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        if(type == 'nominee') {
          this.cityList = [];
          console.log(data.responseParameter);
          if (data.hasOwnProperty('set')) {
            this.cityList = data.set.records;
          }
        }
        else {
          this.guardianCityList = [];
          console.log(data.responseParameter);
          if (data.hasOwnProperty('set')) {
            this.guardianCityList = data.set.records;
          }
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
  }

  onFromAccountSelect(event, type) {
    console.log("onFromAccountSelect",event);
    if(type == 'fixedForm') {
      if(event) {
        this.fixedForm.patchValue({
          maturityPayoutAccount: event
        });
        this.getAccountBalance(event);
        if(this.nomination) {
          this.getInquiryNomineeDetails(event, type);
        }
      }
      else {
        this.fixedForm.patchValue({
          maturityPayoutAccount: ''
        });
        this.accBalance = "";
      }
    }
    else {
      if(event) {
        this.recurringForm.patchValue({
          maturityPayoutAccount: event
        });
        this.getAccountBalance(event);
        if(this.nomination) {
          this.getInquiryNomineeDetails(event, type);
        }
      }
      else {
        this.recurringForm.patchValue({
          maturityPayoutAccount: ''
        });
        this.accBalance = "";
      }
    }
  }

  /**
   * This function is use to call api to fetch
   * accounts balance
   */
   getAccountBalance(selectedAccount) {
    var param = this.instantPayService.getAccountBalanceParam(selectedAccount);
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_BALANCEINQUIRY
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.accBalance = data.set.records[0].ledgerBalance;
          console.log('account balance: ', this.accBalance);

          if(this.openDepositTabSelection == 'fixed' && this.fixedForm.value.amount) {
            if(Number(this.accBalance) < Number((this.fixedForm.value.amount.trim().replace('₹', '')).replace(/,/g, ''))){
              this.invalidAmount = true
            } else{
              this.invalidAmount = false
            }
          }
          else if(this.openDepositTabSelection == 'recurring' && this.recurringForm.value.amount) {
            if(Number(this.accBalance) < Number((this.recurringForm.value.amount.trim().replace('₹', '')).replace(/,/g, ''))){
              this.invalidAmount = true
            } else{
              this.invalidAmount = false
            }
          }
        } else {
          // this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  /**
   * This function is use to call api to fetch
   * accounts balance
   */
   getInquiryNomineeDetails(selectedAccount, type) {
    var param = this.openDepositService.getInquiryNomineeValidations(selectedAccount);
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_InquiryNomineeValidation
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.nomineeDetails = data.set.records[0];
          if(type == 'fixedForm') {
            this.fixedForm.patchValue({
              nomineeName: this.nomineeDetails.nomineeName,
              maturityInstruction2: this.nomineeDetails.nomineeRelation,
              datepicker1: '',
              custaddress1: this.nomineeDetails.nomineeAddress1,
              custaddress2: this.nomineeDetails.nomineeAddress2,
              custstate: this.nomineeDetails.stateCode,
              custcity: this.nomineeDetails.cityCode,
              custpincode: '',
              guardianName: this.nomineeDetails.guardianName,
              guardianType: '',
              address1: this.nomineeDetails.guardianAddress,
              address2: '',
              state: '',
              city: '',
              pincode: '',
            })
          }
          else {
            this.recurringForm.patchValue({
              nomineeName: this.nomineeDetails.nomineeName,
              maturityInstruction2: this.nomineeDetails.nomineeRelation,
              datepicker1: '',
              custaddress1: this.nomineeDetails.nomineeAddress1,
              custaddress2: this.nomineeDetails.nomineeAddress2,
              custstate: this.nomineeDetails.stateCode,
              custcity: this.nomineeDetails.cityCode,
              custpincode: '',
              guardianName: this.nomineeDetails.guardianName,
              guardianType: '',
              address1: this.nomineeDetails.guardianAddress,
              address2: '',
              state: '',
              city: '',
              pincode: '',
            })
          }
        } else {
          if(type == 'fixedForm') {
            this.fixedForm.patchValue({
              nomineeName: '',
              maturityInstruction2: '',
              datepicker1: '',
              custaddress1: '',
              custaddress2: '',
              custstate: '',
              custcity: '',
              custpincode: '',
              guardianName: '',
              guardianType: '',
              address1: '',
              address2: '',
              state: '',
              city: '',
              pincode: '',
            })
          }
          else {
            this.recurringForm.patchValue({
              nomineeName: '',
              maturityInstruction2: '',
              datepicker1: '',
              custaddress1: '',
              custaddress2: '',
              custstate: '',
              custcity: '',
              custpincode: '',
              guardianName: '',
              guardianType: '',
              address1: '',
              address2: '',
              state: '',
              city: '',
              pincode: '',
            })
          }

          // this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  sliderInput(month , from){

    this.days = this.daysInMonth(month , new Date().getFullYear())

    switch(from){
      case "month":

        break;
      case "day":

        break;
      case "recurringMonth":

        break;

    }

  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  onStateSelect(state, type){
    this.fixedForm.get('city').setValue('');
    this.recurringForm.get('city').setValue('');
    this.getCity(state, type)
  }

  // onTermsAndCondition(value , type){

  //   if(type == 'fixed'){
  //       this.isTermsAndCondition = !this.isTermsAndCondition
  //   }else{
  //       this.recurringisTermsAndCondition = !this.recurringisTermsAndCondition
  //   }

  // }

    /**
   * set update currency value
   * @param value
   */
  formatCurrency(value, type) {
    // this.isMaturityCalculated = false;
    let amt = this.customCurrencyPipe
      .transform(value, 'decimal')
      .replace(/[^.0-9]+/g, '');
      if(type == 'fixedForm') {
        this.formValidation.formatCurrency(value, this.fixedForm);
      }
      else if(type == 'recurringForm') {
        this.formValidation.formatCurrency(value, this.recurringForm);
      }
  }

  OnInput(evn , form:FormGroup){
    this.isMaturityCalculated = false;
    var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
    evn = evn.replace(regex, '$1');

    form.patchValue({
      amount:evn
    })

    console.log(evn);
    if(Number(this.accBalance) > Number((evn.trim().replace('₹', '')).replace(/,/g, ''))){
      this.invalidAmount = false
    } else{
      this.invalidAmount = true
    }

    var amt = evn
    if(parseFloat(amt.trim().replace(/[^.0-9]+/g, '')) > 19999999){
      this.exceedMaxAmt = true;
    }
    else{
      this.exceedMaxAmt = false;
    }

    if(parseFloat(amt.trim().replace(/[^.0-9]+/g, '')) < 500){
      this.exceedMinAmt = true;
    }
    else{
      this.exceedMinAmt = false;
    }

    if(this.fixedForm.controls['chooseDepositScheme'].value == 'T'){
    var rem = parseFloat(amt.trim().replace(/[^.0-9]+/g, '')) % 500
    if(rem==0){
      this.multipleof = false;
    }
    else{
      this.multipleof = true;
    }

    if(parseFloat(amt.trim().replace(/[^.0-9]+/g, '')) < 5000){
      this.taxminAmt = true;
    }
    else{
      this.taxminAmt = false;
    }
  }

  }

  // Nomine Agee
  onDateChange(event) {
    console.log(event);
    var diff = Math.floor(this.currentDate - event);
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    this.nomineeAge = Math.floor(months / 12);

    // if(this.nomineeAge < 18 ){
    //   this.minorFlag = true;

      switch(this.openDepositTabSelection){
        case 'fixed' :
          if(this.nomineeAge < 18){
            this.minorFlag = true ;
            this.fixedForm.get('guardianName').setValidators([Validators.required, Validators.pattern("[a-zA-Z ]*$")]);
            this.fixedForm.get('guardianType').setValidators([Validators.required]);
            this.fixedForm.get('address1').setValidators([Validators.required]);
            this.fixedForm.get('address2').setValidators([Validators.required]);
            this.fixedForm.get('state').setValidators([Validators.required]);
            this.fixedForm.get('city').setValidators([Validators.required]);
            this.fixedForm.get('pincode').setValidators([Validators.required]);
          }
          else{
            this.minorFlag= false;
            this.fixedForm.get('guardianName').clearValidators();
            this.fixedForm.get('guardianType').clearValidators();
            this.fixedForm.get('address1').clearValidators();
            this.fixedForm.get('address2').clearValidators();
            this.fixedForm.get('state').clearValidators();
            this.fixedForm.get('city').clearValidators();
            this.fixedForm.get('pincode').clearValidators();
          }
          this.fixedForm.get('guardianName').updateValueAndValidity();
          this.fixedForm.get('guardianType').updateValueAndValidity();
          this.fixedForm.get('address1').updateValueAndValidity();
          this.fixedForm.get('address2').updateValueAndValidity();
          this.fixedForm.get('state').updateValueAndValidity();
          this.fixedForm.get('city').updateValueAndValidity();
          this.fixedForm.get('pincode').updateValueAndValidity();

          break ;

        case 'recurring' :
          if(this.nomineeAge < 18){
            this.recurringMinorFlag = true ;
            this.recurringForm.get('guardianName').setValidators([Validators.required, Validators.pattern("[a-zA-Z ]*$")]);
            this.recurringForm.get('guardianType').setValidators([Validators.required]);
            this.recurringForm.get('address1').setValidators([Validators.required]);
            this.recurringForm.get('address2').setValidators([Validators.required]);
            this.recurringForm.get('state').setValidators([Validators.required]);
            this.recurringForm.get('city').setValidators([Validators.required]);
            this.recurringForm.get('pincode').setValidators([Validators.required]);
          }
          else{
            this.recurringMinorFlag= false;
            this.recurringForm.get('guardianName').clearValidators();
            this.recurringForm.get('guardianType').clearValidators();
            this.recurringForm.get('address1').clearValidators();
            this.recurringForm.get('address2').clearValidators();
            this.recurringForm.get('state').clearValidators();
            this.recurringForm.get('city').clearValidators();
            this.recurringForm.get('pincode').clearValidators();
          }
          this.recurringForm.get('guardianName').updateValueAndValidity();
          this.recurringForm.get('guardianType').updateValueAndValidity();
          this.recurringForm.get('address1').updateValueAndValidity();
          this.recurringForm.get('address2').updateValueAndValidity();
          this.recurringForm.get('state').updateValueAndValidity();
          this.recurringForm.get('city').updateValueAndValidity();
          this.recurringForm.get('pincode').updateValueAndValidity();

          break ;
      }
  }

  daysSelection(value){
    this.tenureMonths = "";
    this.tenureDays = "";
    this.fixedMaturity= false;
    this.isMaturityCalculated = false;

    if(value == 'days' ){
      this.fixedForm.get('dayField').reset();
      this.fixedForm.get('dayField').setValidators([Validators.required, Validators.min(15), Validators.max(999)]);
      this.fixedForm.get('year').clearValidators();
      this.fixedForm.get('month').clearValidators();
      this.fixedForm.get('day').clearValidators();
      this.fixedForm.get('dayField').setValue('');

    } else if(value == 'yearMonthDays' ){
      // this.fixedForm.get('dayField').clearValidators();
      this.fixedForm.get('year').reset();
      this.fixedForm.get('month').reset();
      this.fixedForm.get('day').reset();
      this.fixedForm.get('dayField').clearValidators();
      this.fixedForm.get('year').setValidators([Validators.required]);
      this.fixedForm.get('month').setValidators([Validators.required]);
      this.fixedForm.get('day').setValidators([Validators.required]);
      this.fixedForm.get('year').setValue('');
      this.fixedForm.get('month').setValue('');
      this.fixedForm.get('day').setValue('');
    }

    this.fixedForm.get('dayField').updateValueAndValidity();
    this.fixedForm.get('year').updateValueAndValidity();
    this.fixedForm.get('month').updateValueAndValidity();
    this.fixedForm.get('day').updateValueAndValidity();

  }

  onDepistSchemeChange(event) {
    this.isMaturityCalculated = false;
    this.fixedForm.get('interestPayout').setValue('');
    if(this.fixedForm.controls['chooseDepositScheme'].value == 'T'){
      this.commonMethod.openPopup('div.popup-bottom.tax')


      this.yearsArray = ['05', '06', '07', '08', '09', '10'];
      this.maturityInstructionsList = ['Auto Closure on maturity'];
      this.maturityPayout =[
        {'interestPayout': 'ON_MATURITY', 'payoutType' :'C'},
        {'interestPayout': 'QUARTERLY', 'payoutType' :'Q'}
      ];
      this.daysSelection('yearMonthDays')
      this.tenureType = 'yearMonthDays'
      this.fixedForm.controls['selectOption'].setValue('yearMonthDays');
      this.fixedForm.get('year').setValidators([Validators.required]);
      this.fixedForm.get('year').updateValueAndValidity();

    }else{
      this.yearsArray = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
      this.maturityInstructionsList = ['Renew with maturity amount', 'Renew with principal amount', 'Auto Closure on maturity'];
      this.maturityPayout =[
        {'interestPayout': 'ON_MATURITY', 'payoutType' :'C'},
        {'interestPayout': 'QUARTERLY', 'payoutType' :'Q'},
        {'interestPayout': 'MONTHLY', 'payoutType' :'M'}
      ];
      this.daysSelection('days')
      this.tenureType = 'days'
      this.fixedForm.controls['selectOption'].setValue( 'days');
      this.fixedForm.get('year').setValidators([]);
      this.fixedForm.get('year').updateValueAndValidity();
    }
    console.log(event.target.value);

  }

  onInterestPayoutChange(event) {
    this.isMaturityCalculated = false;
    console.log(event.target.value);
    if(this.fixedForm.value.chooseDepositScheme == 'G') {
      if(event.target.value == 'M' || event.target.value == 'Q') {
        this.yearsArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
        this.daysSelection('yearMonthDays')
        this.tenureType = 'yearMonthDays'
        this.fixedForm.controls['selectOption'].setValue('yearMonthDays');
        this.fixedForm.get('year').setValidators([Validators.required]);
        this.fixedForm.get('year').updateValueAndValidity();
      }
      else {
        this.yearsArray = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
        this.daysSelection('days')
        this.tenureType = 'days'
        this.fixedForm.controls['selectOption'].setValue( 'days');
        this.fixedForm.get('year').setValidators([]);
        this.fixedForm.get('year').updateValueAndValidity();
      }
    }
  }

  onToggleChange() {
    this.autoClosureFlag = !this.autoClosureFlag;
  }

  // onTenureTypeChange(type) {
  //   this.fixedMaturity= false;
  //   console.log(type);
  //   this.tenureMonths = "";
  //   this.tenureDays = "";
  //   if(type == 'days') {
  //     this.fixedForm.get('dayField').clearValidators();;
  //   }
  //   else if(type == 'yearMonthDays') {
  //     this.fixedForm.get('year').clearValidators();;
  //     this.fixedForm.get('month').clearValidators();;
  //     this.fixedForm.get('day').clearValidators();;
  //   }
  // }

  onYearChange(event) {
    this.isMaturityCalculated = false;
    console.log(event.target.value);
    if(event.target.value == 10) {
      this.isYearExceeds = true;
      this.fixedForm.patchValue({
        month: '',
        day: ''
      });
      // this.fixedForm.controls['month'].setValidators([]);
      // this.fixedForm.controls['day'].setValidators([]);
    }
    else {
      this.isYearExceeds = false;
      // this.fixedForm.controls['month'].setValidators([Validators.required]);
      // this.fixedForm.controls['day'].setValidators([Validators.required]);
    }
    // this.fixedForm.controls['month'].updateValueAndValidity();
    // this.fixedForm.controls['day'].updateValueAndValidity();

    if(this.fixedForm.get('year').value == '00' && this.fixedForm.get('month').value == '00' && this.fixedForm.get('day').value < '15') {
      this.fixedForm.get('day').setValidators([Validators.required, Validators.min(15)]);
      this.fixedForm.controls['day'].updateValueAndValidity();
    }
    else {
      this.fixedForm.get('day').setValidators([]);
      this.fixedForm.get('month').setValidators([]);

      this.fixedForm.controls['day'].updateValueAndValidity();
      this.fixedForm.controls['month'].updateValueAndValidity();
    }

    // this.yearMonthDayZeroConditionFixedForm();

  }

  onDayChange(event) {
    this.isMaturityCalculated = false;
    console.log(event.target.value);
    if(this.fixedForm.get('year').value == '00' && this.fixedForm.get('month').value == '00') {
      if(event.target.value < '15') {
        this.fixedForm.controls['day'].setValidators([Validators.required, Validators.min(15)]);
      }
      else {
        this.fixedForm.controls['day'].setValidators([Validators.required]);
      }
      this.fixedForm.controls['day'].updateValueAndValidity()
    }
  }

  onMonthChange(event) {
    this.isMaturityCalculated = false;
    this.yearMonthDayZeroConditionFixedForm();
  }

  yearMonthDayZeroConditionFixedForm() {
    if(this.fixedForm.get('year').value == '00' && this.fixedForm.get('month').value == '00' && this.fixedForm.get('day').value < '15') {
      this.fixedForm.get('day').setValidators([Validators.required, Validators.min(15)]);
    }
    else {
      this.fixedForm.get('day').setValidators([]);
    }
    this.fixedForm.controls['day'].updateValueAndValidity();
    return;
  }

  onRDYearChange(event) {
    this.isMaturityCalculated = false;
    console.log(event.target.value);
    if(event.target.value == 10) {
      this.isRDYearExceeds = true;
      this.recurringForm.patchValue({
        month: '',
      });
    }
    else {
      this.isRDYearExceeds = false;
    }

    if(event.target.value != '' && event.target.value > '00') {
      this.recurringForm.get('month').setValidators([]);
      this.recurringForm.controls['month'].updateValueAndValidity();
    }
  }

  onRDMonthChange(event) {
    this.isMaturityCalculated = false;
    if(this.recurringForm.value.year == '' || this.recurringForm.value.year == '00') {
      if(event.target.value == '' || event.target.value < '06') {
        this.recurringForm.get('month').setValidators([Validators.required, Validators.min(6)]);
        this.recurringForm.controls['month'].updateValueAndValidity();
      }
      else {
        this.recurringForm.get('month').setValidators([]);
        this.recurringForm.controls['month'].updateValueAndValidity();
      }
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('/dashboard');
  }

  termsConditionPopup(type){
    switch(type){
      case 'fixed' :
        this.commonMethod.openPopup('div.terms-conditions-popup')
        break ;

      case 'recurring' :
        this.commonMethod.openPopup('div.terms-conditions-popup-recurring')
        break ;
    }
  }

  closeTerms(){
    this.commonMethod.closeAllPopup();
  }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  onDayfieldInput() {
    this.isMaturityCalculated = false;
  }
}
