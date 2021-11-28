import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MyAccountInfoService } from '../../../my-accounts/my-accounts-info/my-account-info.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { StandingInstructionService } from './standing-instruction.service';
import { AppConstants } from '../../../../../app.constant';
import { DatePipe, Location } from '@angular/common'


@Component({
  selector: 'app-standing-instruction',
  templateUrl: './standing-instruction.component.html',
  styleUrls: ['./standing-instruction.component.scss']
})
export class StandingInstructionComponent implements OnInit {

  standingInstructionForm : FormGroup;
  totalOperativeAccount = [];
  totalBorrowingAccount = [];
  totalDepositeAccount=[] ;

  totalAccountList : any ;
  disable:boolean = false;
  userDetail:any;
  todayDate = new Date();
  tommorow ;
 
  amountModel : any ;

  frequencyType =[
    { 'siFreq' : 'D', 'frequency': 'Daily'},
    { 'siFreq' : 'W', 'frequency': 'Weekly'},
    { 'siFreq' : 'M', 'frequency': 'Monthly'},
    { 'siFreq' : 'Q', 'frequency': 'Quarterly'},
    { 'siFreq' : 'H', 'frequency': 'Half-Yearly'},
    { 'siFreq' : 'Y', 'frequency': 'Yearly'},

  ]

  constructor(
    private router:Router,
    public dataService: DataService,
    private storage : LocalStorageService,
    private http : HttpRestApiService,
    private formValidation: FormValidationService,
    private addStandingInstructionService: StandingInstructionService,
    private constant: AppConstants,
    private datePipe: DatePipe,
    ) { }


  ngOnInit(): void {
    this.tommorow =new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 1);
    
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('STANDING_INSTRUCTION' , this.router.url)
    this.dataService.setPageSettings('STANDING_INSTRUCTION');
    this.buildForm();
    this.accountSelection() ;

    console.log(this.totalBorrowingAccount);
    this.userDetail=this.dataService.profiledateDetails;
    console.log("userDetail::::::::",  this.userDetail);
    this.userDetail[0].mobileNo;
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }


  accountSelection(){
    this.totalOperativeAccount =  this.dataService.customerOperativeAccList;
    console.log(this.totalOperativeAccount);
    this.totalBorrowingAccount = this.dataService.customerBorrowingsList;
    // this.totalDepositeAccount = this.dataService.customerMyDepostie


    this.dataService.customerMyDepostie.forEach(el => {
      if(el.accountType == "RDGEN"){
       this.totalDepositeAccount.push(el);
      }
    })

    this.totalAccountList = this.totalOperativeAccount.concat(this.totalBorrowingAccount.concat(this.totalDepositeAccount))
    console.log("Total Account  :: ", this.totalAccountList);


  }

  buildForm() {
    this.standingInstructionForm = new FormGroup({
      debitAccount: new FormControl('', [Validators.required]),
      creditAccount: new FormControl('', [Validators.required]),
      datepicker1: new FormControl('', [Validators.required]),
      installmentNumber: new FormControl('', [Validators.required, Validators.maxLength(9999)]),
      paymentFrequency: new FormControl('',[Validators.required]),
      amount: new FormControl('',[Validators.required]),
      remarks: new FormControl('')
    });
  }

  validateForm(){
    if (this.standingInstructionForm.invalid) {
      this.standingInstructionForm.get('debitAccount').markAsTouched();
      this.standingInstructionForm.get('creditAccount').markAsTouched();
      this.standingInstructionForm.get('datepicker1').markAsTouched();
      this.standingInstructionForm.get('installmentNumber').markAsTouched();
      // this.standingInstructionForm.get('paymentFrequency').markAsTouched();
      //this.standingInstructionForm.get('frequencyType').markAsTouched();
      this.standingInstructionForm.get('amount').markAsTouched();
    }
  }
  standingInstructionSubmit(formValue){
    console.log('standingInstruction');
    if(this.standingInstructionForm.valid && this.standingInstructionForm.value.debitAccount != this.standingInstructionForm.value.creditAccount){
      this.dataService.screenType = 'addStandingInstruction';
      this.dataService.endPoint = this.constant.serviceName_ADDSTANDINGINSTRUCTION;
      var objCheckFlag = this.dataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.dataService.endPoint.split('/')[1]);
      if(this.dataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
      console.log("Form :: ", formValue)
      this.dataService.standingInstructionDtl = this.standingInstructionForm.value;
      this.dataService.standingInstructionDtl.datepicker1 = this.datePipe.transform(this.dataService.standingInstructionDtl.datepicker1, 'dd-MM-yyyy');
      // this.dataService.standingInstructionParam = this.addStandingInstructionService.getStandingInstructionService(this.standingInstructionForm.value);
     
      this.dataService.request = this.addStandingInstructionService.getStandingInstructionService(this.standingInstructionForm.value,'Y');
      this.dataService.otpName = "OTP"
      this.router.navigateByUrl("/standingInstructionOverview");
      }
    }
    else{
      console.log('else');
      this.validateForm()
    }
  }

  /**
   * set update currency value
   * @param value
   */


   cancel(){
     this.router.navigateByUrl("/standingInstructionList");
   }

   onDateChange(env){

   }


   formatCurrency(e){
    this.formValidation.formatCurrency(e, this.standingInstructionForm);
  }

  focusAmount(e){
    this.amountModel = e.replace(/^\₹|,|\.\d*$/gm, '')
  }


}
