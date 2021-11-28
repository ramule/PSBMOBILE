import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { ModifyStandingInstructionService } from './modify-standing-instruction.service';
import { AppConstants } from '../../../../../app.constant';
import { Location , DatePipe} from '@angular/common';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';


@Component({
  selector: 'app-modify-standing-instruction',
  templateUrl: './modify-standing-instruction.component.html',
  styleUrls: ['./modify-standing-instruction.component.scss']
})
export class ModifyStandingInstructionComponent implements OnInit {


  constructor(
    private router: Router,
    public DataService: DataService,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private modifyStandingInstructionListService : ModifyStandingInstructionService,
    private constant: AppConstants,
    private location : Location,
    private datePipe : DatePipe,
    private formValidation: FormValidationService,
    private customCurrencyPipe: CustomCurrencyPipe,
  ) { }

  modifyStandingInstructionForm: FormGroup;
  siData : any ;
  defaultDate : any ;
  siNum : any ;
  todaydate = new Date();
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
 
  ngOnInit(): void {
    this.tommorow = new Date(this.todaydate.getFullYear(), this.todaydate.getMonth(), this.todaydate.getDate() + 1);
 
    this.buildForm();
    this.patchSiValue()
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('MODIFY_STANDING_INSTRUCTION' , this.router.url)
    this.DataService.setPageSettings('MODIFY_STANDING_INSTRUCTION');
   
  }

  patchSiValue(){
    var siDataTemp = this.location.getState()
    var siNoPeriod = siDataTemp['siPeriod']
    this.siData = siDataTemp['modifySi']
    
    this.siNum = this.siData.siNum ;
    console.log('SI  ====>>> ',siDataTemp)

    console.log('SI Num ====>>> ',this.siNum)
    console.log('SI DATA ====>>> ',this.siData)
    console.log('SI Period ====>>> ',siNoPeriod)

    // this.datePipe.transform(this.nomineeDetailsForm.value.dob, 'dd-MM-yyyy')
    this.defaultDate =  new Date (this.datePipe.transform(this.dateFormat(this.siData['nextDate']), 'MM/dd/yyyy'))
    this.amountModel = this.customCurrencyPipe.transform( this.siData['flowAmount'], 'symbol') //taking model value 

    this.modifyStandingInstructionForm.patchValue({
      debitAccount:  this.siData['drAccountNumber'],
      creditAccount: this.siData['crForacid'],
      datepicker1: new Date(this.defaultDate) ,
      installmentNumber: siNoPeriod,  //'0' , //this.siData['numOfTimeSiExe'],
      paymentFrequency: this.siData['siFreq'],
      amount: this.customCurrencyPipe.transform( this.siData['flowAmount'], 'symbol'),
      remarks: ''
    })

  }

  dateFormat(e){
    let date = e.split("-")[0];
    let month = e.split("-")[1];
    let year = e.split("-")[2];
    var convertedDate = new Date(month+'-'+date+'-'+year);
    console.log('converted Date: ', convertedDate);
    return convertedDate;
  }

  buildForm() {
    this.modifyStandingInstructionForm = new FormGroup({
      debitAccount: new FormControl(''),
      creditAccount: new FormControl(''),
      datepicker1: new FormControl('', [Validators.required]),
      installmentNumber: new FormControl('', [Validators.required,Validators.maxLength(9999)]),
      paymentFrequency: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      remarks: new FormControl('')
    });
  }

  validateForm() {
    if (this.modifyStandingInstructionForm.invalid) {
      this.modifyStandingInstructionForm.get('debitAccount').markAsTouched();
      this.modifyStandingInstructionForm.get('creditAccount').markAsTouched();
      this.modifyStandingInstructionForm.get('datepicker1').markAsTouched();
      this.modifyStandingInstructionForm.get('installmentNumber').markAsTouched();
      this.modifyStandingInstructionForm.get('paymentFrequency').markAsTouched();
      this.modifyStandingInstructionForm.get('amount').markAsTouched();

    }
  }

  modifySiSubmit() {
    if (this.modifyStandingInstructionForm.valid) {
      this.DataService.screenType = 'modifyStandingInstruction';
      this.DataService.endPoint = this.constant.serviceName_MODIFYSTANDINGINSTRUCTIONS;
      var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
      if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
      this.DataService.standingInstructionDtl = this.modifyStandingInstructionForm.value;
      console.log("Modify Global Data - > ", this.modifyStandingInstructionForm.value)
      // let amount = this.amountModel.replaceAll('₹','').replace(/^\₹|,|\.\d*$/gm, '').trim()
      let amount = this.amountModel.trim().replace(/[^.0-9]+/g,'')
      this.DataService.standingInstructionDtl.datepicker1 = this.datePipe.transform(this.DataService.standingInstructionDtl.datepicker1, 'dd-MM-yyyy');
      this.DataService.request = this.modifyStandingInstructionListService.getModifyStandingInstruction(this.siNum, this.modifyStandingInstructionForm.value, amount);
      this.DataService.otpName = "OTP"
      this.router.navigateByUrl("/standingInstructionOverview");
      }
    } else {
      this.validateForm();
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  onCancel() {
    this.router.navigateByUrl('/standingInstructionList');
  }

  formatCurrency(e){
    this.formValidation.formatCurrency(e, this.modifyStandingInstructionForm);
  }

  focusAmount(e){
    this.amountModel = e.replace(/^\₹|,|\.\d*$/gm, '')
  }

  // OnInput(evn , form:FormGroup){
  //   var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
  //   evn = evn.replace(regex, '$1');

  //   form.patchValue({
  //     amount:evn
  //   })

  //   console.log(evn);
  //   if(Number(this.accBalance) > Number((evn.trim().replace('₹', '')).replace(/,/g, ''))){
  //     this.invalidAmount = false
  //   }else{
  //     this.invalidAmount = true
  //   }

  //   var amt = evn
  //   if(parseFloat(amt.trim().replace(/[^.0-9]+/g, '')) > 10000){
  //     this.exceedMinAmt = true;
  //   }
  //   else{
  //     this.exceedMinAmt = false;
  //   }

  // }
  
}
