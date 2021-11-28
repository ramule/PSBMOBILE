import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { MyAccountInfoService } from '../../my-accounts/my-accounts-info/my-account-info.service';
import { MyBorrowingService } from '../../my-accounts/my-borrowings/my-borrowings.service';
import { AccountType } from '../../../../utilities/app-enum';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DtlStatementData } from 'src/app/utilities/app-interface';
import { DetailStatementService } from '../../my-accounts/detailed-statement/detailed-statement.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import * as jsPDF from 'jspdf';
import { FontBase64 } from 'src/app/utilities/app-enum';
import { TitleCasePipe } from '@angular/common';
import { MydepositeService } from '../../my-accounts/my-deposits/mydeposite.service';
import { Subject } from 'rxjs';
declare var dtSample1: any;
declare var selectAccountMob:any;
declare var OSREC: any;

@Component({
  selector: 'app-loan-detailed-statement',
  templateUrl: './loan-detailed-statement.component.html',
  styleUrls: ['./loan-detailed-statement.component.scss']
})
export class LoanDetailedStatementComponent implements OnInit {

  constructor(
    private router: Router,
    public dataService: DataService,
    public datePipe: DatePipe,
    public commonMethod : CommonMethods,
    private myAccountInfoService : MyAccountInfoService,
    private myBorrowingService : MyBorrowingService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private detailStatementService: DetailStatementService,
    private translatePipe: TranslatePipe,
    private titlecasePipe:TitleCasePipe,
    private mydepositeService: MydepositeService
  ) { }

  totalAccountList:any = [];
  selectedAccountNo:any;
  selAccDtl:any;
  refreshDate: Date;
  selType: string = "period";
  detailStatementList:any = [];
  periodList:any = [];
  transactionCnt:any = [];
  pdfTransactionData: any = [];
  dtlStatementVal = {} as DtlStatementData;
  loanUserDtl:any;
  depositsDtl:any;
  disable:boolean = false;
  loanDtls:any=[];
  selectPeriodDtl = {
    fromDate : "",
    toDate : "",
  }

  transactionType:any;
  dsForm:FormGroup;

  maxFrom : Date = new Date();
  maxTo : Date = new Date();
  minFrom : Date = new Date('01-01-1900');
  minTo : Date = new Date('01-01-1900');
  openBal :any = 0;
  totalDeposit :any = 0;
  totalWithdraw :any = 0;
  closingBal :any = 0;
  public formErrors = {
    transferFrom: '',
    selType: '',
    fromDate: '',
    toDate: '',
    fromAmt: '',
    toAmt: '',
    lastTrans: ''
  };
  hasErrorOneYear : boolean = false;
  minmaxCheck:boolean ;

  lastDate: any;
  lastTransactionID: any;
  moreListFlag = 'N'
  finalDisplayValue =[]
  itemsToShow = 20
  accountDtls: any;
  Date:any;
  lastPostingDate:any;
  lastBalance:any
  dateGreaterThan : boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  selectPeriodDropdown:any=""

  modeOfOpertion = [
    { 'ModeOfOperation' : '001' , 'modeOfOperationType' : 'Self'},
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
  ]



  ngOnInit(): void {
    if(this.dataService.accTypeSelected == 'Deposits'){
      this.dataService.setPageSettings('DEPOSIT_ACCOUNT_DETAILED_STATEMENT');
      this.dataService.getBreadcrumb('DEPOSIT_ACCOUNT_DETAILED_STATEMENT' , this.router.url)
    }
    else{
      this.dataService.setPageSettings('LOAN_ACCOUNT_DETAILED_STATEMENT');
      this.dataService.getBreadcrumb('LOAN_ACCOUNT_DETAILED_STATEMENT' , this.router.url)
    }

    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    dtSample1();
    // selectAccountMob();

    this.transactionType = [
      { name: 'Both', value: '', checked: false },
      { name: 'Credit', value: 'C', checked: false },
      { name: 'Debit', value: 'D', checked: false }
    ];

    this.initialize();
  }

  initialize(){
    this.buildForm();
    this.getAccountList('onload');
    this.selStatementType(this.selType);
    this.getPeriod();
    this.getCount();
    this.refreshDate = this.dataService.onRefreshDate;
    // this.dsForm.controls['filtertype1'].setValue("period");
  }

  buildForm(){
    this.dsForm = new FormGroup({
      selAcc: new FormControl('',[Validators.required]),
      filtertype1: new FormControl('',[Validators.required]),
      selectPeriod: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      transCount: new FormControl(''),
      minAmount: new FormControl(''),
      maxAmount: new FormControl(''),
      transType: new FormControl('')
    });
  }

  getAccountList(type?: any) {
    this.totalAccountList = [];
    if(this.dataService.accTypeSelected == "Deposits")
    this.totalAccountList = this.dataService.customerMyDepostie;
    else
    this.totalAccountList = this.dataService.customerBorrowingsList;
   

    if (type == 'onload') {
      this.dsForm.controls['selAcc'].setValue(this.dataService.accDetails.accountNo);
      this.dsForm.controls['filtertype1'].setValue("period");
      //this.dsForm.value.selAcc = this.dataService.accDetails.accountNo;
      this.getSelectedAccount(this.dsForm.value.selAcc)
    }
  }


  resetForm(){
    this.dsForm.patchValue({
      selectPeriod: '',
      fromDate: '',
      toDate: '',
      transCount: '',
      minAmount: '',
      maxAmount: '',
      transType: ''
    })
    this.finalDisplayValue=[]
    this.detailStatementList = []
  }


  onCountSelected(){
    var d,from
    d = new Date();
    //from = d.setDate(d.getDate() -90);
    this.selectPeriodDtl.fromDate = (new Date(d.getFullYear(), d.getMonth()-12, new Date().getDate())).toString();
    this.selectPeriodDtl.toDate = d.setDate(d.getDate())
    //this.dsForm.controls['fromDate'].setValue(from);
  }


  getSelectedAccount(accNo){
    var selAccDtl =  this.totalAccountList.filter(item => item.accountNo == accNo );
    this.selAccDtl = selAccDtl[0];
    if(this.dataService.accTypeSelected == "Deposits"){
      this.DepositeAccountEnquery();
      this.AccountEnquiryDtl();
    }
    else{
      this.getLoanEnq(this.selAccDtl.accountNo);
      this.AccountEnquiryDtl();
    }
  }

  DepositeAccountEnquery() {
    let param =  this.mydepositeService.depositeAccountEquirey(this.selAccDtl.accountNo);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DEPOSITACCOUNTINQUIRY).subscribe(data => {
      console.log(data);
      console.log('Temp Deposite Data :: ');
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data);
        this.depositsDtl = data.set.records[0];
      }
    });
  }


  getLoanEnq(accNo){
    var param = this.myBorrowingService.getMyLoansInquiry(accNo,this.selAccDtl.branchCode);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANACCOUNTINQUIRY).subscribe(data => {
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          if (data.hasOwnProperty("set")) {
            this.loanUserDtl = data.set.records[0]
          }
        }
      });
  }


  getPeriod(){
    var param = this.detailStatementService.getAssessmentYearCall(certificateConfig.STATEMENT_PERIOD);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CERTIFICATECONFIGS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty("listofDataset")) {
          this.periodList = data.listofDataset[0].records
        }
        console.log(this.periodList)
      }
      else {

      }
    });
  }

  getCount(){
    var param = this.detailStatementService.getAssessmentYearCall(certificateConfig.STATEMENT_COUNT);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CERTIFICATECONFIGS).subscribe(data => {
      console.log("STATEMENT_COUNT",data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty("listofDataset")) {
          this.transactionCnt = data.listofDataset[0].records
        }
      }
      else {
      }
    });
  }


  // getLoanDetailsAmount(accNo){
  //   var param = this.myBorrowingService.getLoanMandateDetails(accNo,this.datePipe.transform(data.fromDate, 'yyyyMMdd'));
  //   this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANDEMANDDETAILS).subscribe(data => {
  //     console.log(data);
  //     var resp = data.responseParameter;
  //     if (resp.opstatus == "00") {
  //       console.log(data.responseParameter);
  //       if (data.hasOwnProperty("set")) {

  //       }
  //     }
  //     else {
  //       this.closePopUp();
  //     }
  //   });
  // }



  toggleDisable(){
    if(this.disable){
      this.disable = false;
      this.dsForm.get('minAmount').setValidators(Validators.required);
      this.dsForm.get('maxAmount').setValidators(Validators.required);
      this.dsForm.get('transType').setValidators(Validators.required);
    }else{
      this.disable = true;
      this.dsForm.get('minAmount').setValidators(Validators.nullValidator);
      this.dsForm.get('maxAmount').setValidators(Validators.nullValidator);
      this.dsForm.get('transType').setValidators(Validators.nullValidator);
    }
    console.log(this.disable);
    this.dsForm.get('minAmount').updateValueAndValidity();
    this.dsForm.get('maxAmount').updateValueAndValidity();
    this.dsForm.get('transType').updateValueAndValidity();
  }

  selStatementType(type){
    this.selType = type;
    switch(type){
      case "period":
        this.dsForm.get('fromDate').setValue("");
        this.dsForm.get('toDate').setValue("");
        this.dsForm.get('transCount').setValue("");
        this.dsForm.get('selectPeriod').setValidators(Validators.required);
        this.dsForm.get('fromDate').setValidators(Validators.nullValidator);
        this.dsForm.get('toDate').setValidators(Validators.nullValidator);
        this.dsForm.get('transCount').setValidators(Validators.nullValidator);
        break;
      case "dateRange":
        this.dsForm.get('selectPeriod').setValue("");
        this.dsForm.get('transCount').setValue("");
        this.dsForm.get('selectPeriod').setValidators(Validators.nullValidator);
        this.dsForm.get('fromDate').setValidators(Validators.required);
        this.dsForm.get('toDate').setValidators(Validators.required);
        this.dsForm.get('transCount').setValidators(Validators.nullValidator);
        break;
      case "transactionCount":
        this.dsForm.get('fromDate').setValue("");
        this.dsForm.get('toDate').setValue("");
        this.dsForm.get('selectPeriod').setValue("");
        this.dsForm.get('selectPeriod').setValidators(Validators.nullValidator);
        this.dsForm.get('fromDate').setValidators(Validators.nullValidator);
        this.dsForm.get('toDate').setValidators(Validators.nullValidator);
        this.dsForm.get('transCount').setValidators(Validators.required);
        break;
    }

    this.dsForm.get('selectPeriod').updateValueAndValidity();
    this.dsForm.get('fromDate').updateValueAndValidity();
    this.dsForm.get('toDate').updateValueAndValidity();
    this.dsForm.get('transCount').updateValueAndValidity();
  }


  ToDateChange(event){
    console.log(event);
    // var d = event.setFullYear(event.getFullYear() - 1);
    // this.minFrom = new Date(d);
    // var _d = event.setFullYear(event.getFullYear() + 1);
    // if( new Date(_d) > new Date() ){
    //   this.maxFrom = new Date();
    // }
    // else{
    //   this.maxFrom = new Date(_d);
    // }

    if(this.dsForm.value.fromDate){
      var ageDifMs = this.dsForm.value.fromDate - event;
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      var dateDiff = Math.abs(ageDate.getUTCFullYear() - 1970);
      if(dateDiff > 1){
        this.hasErrorOneYear = true;
        this.dateGreaterThan = false
      }
      else{
        this.hasErrorOneYear = false;
      }
      this.dsForm.value.toDate = new Date(event);
    }
    else{
      this.hasErrorOneYear = false;
      this.dsForm.value.toDate = new Date(event);
    }

    var d1 = this.dsForm.value.fromDate
    var d2 = this.dsForm.value.toDate 

    if(this.hasErrorOneYear == false && this.dsForm.value.fromDate!="" && this.dsForm.value.toDate )
    {
      if(d1 > d2)
      {
        this.dateGreaterThan = true
        this.hasErrorOneYear = false;
      }
      else
      {
        this.dateGreaterThan = false
      }
    }
   
   


  //  moment(this.dsForm.value.fromDate)
  //   this.toCheckdate();
  //   // console.log("eventsssssssssssssssss",event);

  //   var diff = Math.floor(this.dsForm.value.fromDate - this.dsForm.value.toDate);
  //   var day = 1000 * 60 * 60 * 24;

  //   var days = Math.floor(diff / day);
  //   var months = Math.floor(days / 31);
  //   this.startendDifference = Math.floor(months / 12);

  //
    }

    fromDateChange(event){
      // console.log(event);
      // this.minTo = new Date(event);
      // var d = event.setFullYear(event.getFullYear() + 1);
      // if( new Date(d) > new Date() ){
      //   this.maxTo = new Date();
      // }
      // else{
      //   this.maxTo = new Date(d);
      // }
      // this.dsForm.value.fromDate = new Date(event.setFullYear(event.getFullYear() - 1));

      if(this.dsForm.value.toDate){
        var ageDifMs = event - this.dsForm.value.toDate;
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var dateDiff = Math.abs(ageDate.getUTCFullYear() - 1970);
        if(dateDiff > 1){
          this.hasErrorOneYear = true;
        }
        else{
          this.hasErrorOneYear = false;
        }
        this.dsForm.value.fromDate = new Date(event);
      }
      else{
        this.hasErrorOneYear = false;
        this.dsForm.value.fromDate = new Date(event);
      }

      // this.toCheckdate();
      // // console.log("eventsssssssssssssssss",event);

      // var diff = Math.floor(this.dsForm.value.fromDate - this.dsForm.value.toDate);
      // var day = 1000 * 60 * 60 * 24;

      // var days = Math.floor(diff / day);
      // var months = Math.floor(days / 31);
      // this.startendDifference = Math.floor(months / 12);

      // console.log("this.toDate: " + this.startendDifference)

      var d1 = this.dsForm.value.fromDate
      var d2 = this.dsForm.value.toDate 
  
      if(this.hasErrorOneYear == false && this.dsForm.value.fromDate!="" && this.dsForm.value.toDate )
      {

        if(d1 > d2)
        {
          this.dateGreaterThan = true
          this.hasErrorOneYear = false;
        }
        else
        {
          this.dateGreaterThan = false
        }
      }

      }
      

      randomDigit(value)
      {
        var predigits:any = '00000000000000000000'
        var digit:any = predigits + value
        var length:any = digit.length
        var diff:any = Math.abs(17- +length)
        return digit.slice(diff)
  
      }

      checkMinMax()
      {
        if(this.dsForm.value.minAmount!="" && this.dsForm.value.maxAmount!="")
         if(+this.dsForm.value.minAmount > +this.dsForm.value.maxAmount)
         this.minmaxCheck = true
         else
         this.minmaxCheck = false
      
      
      }

  validateForm() {
    if (this.dsForm.invalid) {
      this.dsForm.get('selAcc').markAsTouched();
      this.dsForm.get('selectPeriod').markAsTouched();
      this.dsForm.get('fromDate').markAsTouched();
      this.dsForm.get('toDate').markAsTouched();
      this.dsForm.get('transCount').markAsTouched();
      this.dsForm.get('minAmount').markAsTouched();
      this.dsForm.get('maxAmount').markAsTouched();
      this.dsForm.get('transType').markAsTouched();
      return;
    }
  }

  onPeriodChange(value){
    this.selectPeriodDropdown = value
    var d,to,from;
    switch(value){
      case "LAST_WEEK":
        d = new Date();
        //d.setDate(d.getDate() -7);
        //to = d.setTime(d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000);
       // from = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000);
       to = new Date(d.getFullYear(), d.getMonth(), d.getDate())
       from = new Date(d.getFullYear(), d.getMonth(), d.getDate()-6)
        break;
      case "CURRENT_MONTH":
        d = new Date();
        from = new Date(d.getFullYear(), d.getMonth(), 1);
        to = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        break;
      case "QUARTERLY":
        d = new Date();
       // var quarter = Math.floor((d.getMonth() / 3));
        //from = new Date(d.getFullYear(),d.getMonth() - 3)
        //to = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        to = new Date(d.getFullYear(), d.getMonth(), d.getDate())
        from = new Date(to.getFullYear(), to.getMonth() - 3, to.getDate())
        break;
      case "HALF_YEARLY":
        d = new Date();
        // var halfyrly = Math.floor((d.getMonth() / 6));
        // from = new Date(d.getFullYear(), halfyrly * 6, 1);
        // to = new Date(from.getFullYear(), from.getMonth() + 6, 0);
        to = new Date(d.getFullYear(), d.getMonth(), d.getDate())
        from = new Date(to.getFullYear(), to.getMonth() - 6, to.getDate())
        break;
      case "YEARLY":
        d = new Date();
        // from = new Date(new Date().getFullYear(), 0, 1);
        // to = new Date(new Date().getFullYear(), 0, 365);
        to = new Date(d.getFullYear(), d.getMonth(), d.getDate())
        from = new Date(to.getFullYear()-1, to.getMonth(), to.getDate())
        break;
      case "PREVIOUS_FY":
       // from = new Date(new Date().getFullYear() - 1, 0, 1);
      //  to = new Date(new Date().getFullYear() - 1, 0, 365)
        from = new Date(new Date().getFullYear() - 1, 3, 1)
        to = new Date(new Date().getFullYear(), 2, 31)
        break;
      default:
        from = undefined;
        to = undefined;
        break;
    }
    console.log(new Date(from));
    console.log(new Date(to));
    this.selectPeriodDtl.fromDate = from;
    this.selectPeriodDtl.toDate = to;
    // this.dsForm.controls['fromDate'].setValue(from);
    // this.dsForm.controls['toDate'].setValue(to);
  }

  randomIDDigit(value)
  {
    var predigits:any = '000000000'
    var digit:any = predigits + value
    var length:any = digit.length
    var diff:any = Math.abs(9- +length)
    var diffnew = digit.slice(diff)

    if(diffnew.includes('D'))
    {
      var split = diffnew.split('DL')
      var space = split[0].replace('0',' ')
      return space+"DL"+split[1]
    }
    else
    {
      var split = diffnew.split('S')
      var space = split[0].replace('0',' ')
      return space+"S"+split[1]
    }
    

    //return  diffnew.replace('0',' ')

  }
  
  getdetailedStatementDataMore(formData,lastTransId,lastTransDate,lastPostDate,lastBalance){
    var fromDate="",toDate="";
  
    if(this.selType == 'period'){
      var d : any  ;
      var to : any ;
      var from : any ;
      var lastTrans : any ;
      var TransDate: any ;
      var count : any ;
      var postDate: any ;
      var sort: any ;
      var balance:any
      switch(this.dsForm.value.selectPeriod){
        case "LAST_WEEK":
          d = new Date();
          //d.setDate(d.getDate() -7);
          to = d.setTime(d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000);
          from = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000);
          break;
        case "CURRENT_MONTH":
          d = new Date();
          from = new Date(d.getFullYear(), d.getMonth(), 1);
          to = new Date(d.getFullYear(), d.getMonth() + 1, 0);
          break;
        case "QUARTERLY":
          d = new Date();
          var quarter = Math.floor((d.getMonth() / 3));
          from = new Date(d.getFullYear(), quarter * 3, 1);
          to = new Date(from.getFullYear(), from.getMonth() + 3, 0);
          break;
        case "HALF_YEARLY":
          d = new Date();
          var halfyrly = Math.floor((d.getMonth() / 6));
          from = new Date(d.getFullYear(), halfyrly * 6, 1);
          to = new Date(from.getFullYear(), from.getMonth() + 6, 0);
          break;
        case "YEARLY":
          from = new Date(new Date().getFullYear(), 0, 1);
          to = new Date(new Date().getFullYear(), 0, 365);
          break;
        case "PREVIOUS_FY":
          from = new Date(new Date().getFullYear() - 1, 0, 1);
          to = new Date(new Date().getFullYear() - 1, 0, 365)
          break;
        default:
          from = undefined;
          to = undefined;
          break;
      }
      fromDate = this.selectPeriodDtl.fromDate;
      toDate = this.datePipe.transform(to, 'yyyyMMdd');
      lastTrans = lastTransId
      TransDate =  lastTransDate
      postDate = lastPostDate
      sort = ''
      count = ''
      balance = lastBalance
    }
    else if(this.selType == 'dateRange'){
      // fromDate = this.datePipe.transform( this.dsForm.value.fromDate, 'yyyyMMdd')
      // toDate = this.datePipe.transform( this.dsForm.value.fromDate, 'yyyyMMdd')
      fromDate = this.selectPeriodDtl.fromDate; //start date is going wrong need to discuss with vikrant
      toDate = this.selectPeriodDtl.toDate; //end date is going wrong need to discuss with vikrant
      lastTrans = lastTransId
      TransDate =  lastTransDate
      postDate = lastPostDate
      sort = ''
      count =''
      balance = lastBalance
    }
    else if(this.selType == 'transactionCount'){
      d = new Date();
      toDate =  this.datePipe.transform(d, 'yyyyMMdd');
      fromDate = this.datePipe.transform(d.setDate(d.getDate() -90), 'yyyyMMdd');
      lastTrans = lastTransId
      TransDate =  lastTransDate
      postDate = lastPostDate
      sort = "D"
      balance = lastBalance
  
      switch(+formData.transCount)
      {
        case 50:
        if(this.detailStatementList.length == 40 )
        count = 10
        else
        count = formData.transCount
        break;
        case 30:
        if(this.detailStatementList.length == 20)
        count = 10
        else
        count = formData.transCount
        break;
      }
  
    }
  
  
    this.dtlStatementVal.START_DATE = ""+fromDate;
    this.dtlStatementVal.END_DATE = toDate != "" ? ""+toDate : "        ";
    this.dtlStatementVal.LOW_AMOUNT = formData.minAmount != "" ? this.randomDigit(formData.minAmount) : "                 ";
    this.dtlStatementVal.HIGH_AMOUNT = formData.maxAmount != "" ? this.randomDigit(formData.maxAmount) : "                 ";
    this.dtlStatementVal.FIRST_CHEQUE_NUMBER = "                ";
    this.dtlStatementVal.LAST_CHEQUE_NUMBER = "                ";
    this.dtlStatementVal.NUMBER_OF_RECORDS_REQUESTED = count != "" ? count : "  ";
    this.dtlStatementVal.SORT_CRITERIA = sort != "" ? sort :" ";
    this.dtlStatementVal.CRDR_FLAG = formData.transType != "" ? formData.transType : " ";
    this.dtlStatementVal.LAST_TRANSACTION_DATE = TransDate != "" ? TransDate :"        ";
    this.dtlStatementVal.LAST_TRANSACTION_ID = lastTrans != "" ? this.randomIDDigit(lastTrans) : "         ";
    this.dtlStatementVal.LAST_PART_TRANSACTION_NUMBER = "    ";
    this.dtlStatementVal.LAST_POSTING_DATE = postDate != "" ? postDate :"              ";
    this.dtlStatementVal.LAST_BALANCE = balance != "" ? balance :"                 ";
  
  
    var detailStatementStr = "";
    detailStatementStr = this.dtlStatementVal.START_DATE +
    this.dtlStatementVal.END_DATE +
    this.dtlStatementVal.LOW_AMOUNT +
    this.dtlStatementVal.HIGH_AMOUNT +
    this.dtlStatementVal.FIRST_CHEQUE_NUMBER +
    this.dtlStatementVal.LAST_CHEQUE_NUMBER +
    this.dtlStatementVal.NUMBER_OF_RECORDS_REQUESTED +
    this.dtlStatementVal.SORT_CRITERIA +
    this.dtlStatementVal.CRDR_FLAG +
    this.dtlStatementVal.LAST_TRANSACTION_DATE +
    this.dtlStatementVal.LAST_TRANSACTION_ID +
    this.dtlStatementVal.LAST_PART_TRANSACTION_NUMBER +
    this.dtlStatementVal.LAST_POSTING_DATE +
    this.dtlStatementVal.LAST_BALANCE;
  
  
    detailStatementStr = detailStatementStr.trim();
  
  
    console.log(detailStatementStr);
  
    return detailStatementStr;
  
  }

  submit(data){
    // if (this.dsForm.valid) {
    //   console.log(data.fromDate);
      //console.log(this.datePipe.transform(data.fromDate, 'yyyyMMdd'));
      // this.getdetailedStatementData(this.dsForm.value)
      // var param = this.detailStatementService.getDetailedStatementParam(this.selAccDtl,this.dsForm.value,this.getdetailedStatementData(this.dsForm.value));
      //var date = this.datePipe.transform(data.fromDate, 'yyyyMMdd')
      // var param = this.myBorrowingService.getLoanMandateDetails(this.selAccDtl.accountNo,date);
      // this.getLoanDetailedStatement(param);
      //this.getMyLoansDtlStatement(this.selAccDtl.accountNo,data.fromDate,data.toDate);
      // var param = this.detailStatementService.getDetailedStatementParam(this.selAccDtl,this.getdetailedStatementData(this.dsForm.value));
      // this.getDetailedStatement(param);
      if(this.selType == "transactionCount")
      this.onCountSelected()
      if(this.selType == 'period')
      this.onPeriodChange(this.selectPeriodDropdown)
      this.validateForm();
      if (this.dsForm.valid && !this.hasErrorOneYear && !this.dateGreaterThan) {
        this.moreListFlag = "N"
        this.lastTransactionID = ""
        this.detailStatementList  = []
        this.finalDisplayValue=[]
        // this.lastDate = ""
        console.log("from date ===>"+data.fromDate);
        console.log("to date ===>"+data.toDate);
        console.log(this.datePipe.transform(data.fromDate, 'yyyyMMdd'));
        // this.getdetailedStatementData(this.dsForm.value)
  
        var param = this.detailStatementService.getDetailedStatementParam(this.selAccDtl,this.getdetailedStatementData(this.dsForm.value));
  
        this.getDetailedStatement(param);
        var _param = this.detailStatementService.getDashboardHeader(this.selAccDtl,this.dsForm.value,this.selectPeriodDtl,this.selType);
        this.getDashboardData(_param);
    }
  }

  getDashboardData(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DASHBOARDHEADER).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty("set")) {
          console.log(data.set.records);
          this.openBal = data.set.records[0].openingBalance;
          this.totalDeposit = data.set.records[0].totalDeposit
          this.totalWithdraw  = data.set.records[0].totalWithdrawl
          this.closingBal = data.set.records[0].closingBalance
        }
      }
      else {

      }
    });
  }






  

  getDetailedStatement(param){


    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DETAILEDSTATEMENT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00" && !resp.Result.toLowerCase().includes('no record')) {
        console.log(data.responseParameter);
        if (data.hasOwnProperty("set")) {

          if(this.detailStatementList.length < 1){
          this.detailStatementList = data.set.records;
          this.dtTrigger.next();
          // this.nextCount = 1
          for(var i=0;i < this.itemsToShow ; i++)
          {
            if(data.set.records[i]!="" && data.set.records[i]!=undefined && data.set.records.length!=0)
            this.finalDisplayValue.push(data.set.records[i])
          }

          } else{
            for(var i = 0 ; i < data.set.records.length ; i ++){
              this.detailStatementList.push(data.set.records[i])

              this.moreListFlag = data.responseParameter.flag
              this.lastDate = this.detailStatementList[ this.detailStatementList.length -1 ].TransactionDate
              this.lastTransactionID = this.detailStatementList[ this.detailStatementList.length -1 ].TransactionId
              this.lastPostingDate = this.detailStatementList[ this.detailStatementList.length -1 ].postedDateAndTime
              this.lastBalance = this.detailStatementList[ this.detailStatementList.length -1 ].closingBalance
              if(data.set.records[i]!="" && data.set.records[i]!=undefined && data.set.records.length!=0)
              this.finalDisplayValue.push(data.set.records[i])
            }
            console.log('this.detailStatementList Inside FOR', this.detailStatementList);
              var self = this;
          }

          console.log('lastDate' + this.lastDate)
          console.log('lastTransactionID' + this.lastTransactionID)

          this.lastDate = this.detailStatementList[ this.detailStatementList.length -1 ].TransactionDate
          this.lastTransactionID = this.detailStatementList[ this.detailStatementList.length -1 ].TransactionId
          this.moreListFlag = data.responseParameter.flag;
          this.lastPostingDate = this.detailStatementList[ this.detailStatementList.length -1 ].postedDateAndTime
          this.lastBalance = this.detailStatementList[ this.detailStatementList.length -1 ].closingBalance

          if(this.selType == 'transactionCount' && this.dsForm.value.transCount == "20" ||this.dsForm.value.transCount == "40" || this.dsForm.value.transCount == "10")
          this.moreListFlag = "N"

          if(this.selType == 'transactionCount' && this.dsForm.value.transCount == "50" && this.detailStatementList.length==50)
          this.moreListFlag = "N"

          if(this.selType == 'transactionCount' && this.dsForm.value.transCount == "30" && this.detailStatementList.length==30)
          this.moreListFlag = "N"
        }

       //  if(this.constant.getPlatform() != "web") this.generatePDF();
      }
      else {
       this.dataService.information = resp.Result;
       this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
       this.dataService.primaryBtnText = this.translatePipe.transform('OK');
       this.commonMethod.openPopup('div.popup-bottom.show-common-info');
       this.moreListFlag = "N"
      }
    });
  }


  onNextClick(){
    // this.finalDisplayValue =[]
    this.callDetailApiAgain();

    // const startindex = this.itemsToShow * this.nextCount
    // this.endindex = startindex
    // for(var i = 0; i <  this.itemsToShow; i++ ){
    //   this.finalDisplayValue.push(this.detailStatementList[startindex + i])
    // }
    // this.nextCount = this.nextCount + 1
  }

  callDetailApiAgain(){
    if(this.moreListFlag == "Y"){
      this.selectPeriodDtl.fromDate = this.lastDate
      this.selectPeriodDtl.toDate = this.datePipe.transform(this.dsForm.value.toDate, 'yyyyMMdd')
      var param = this.detailStatementService.getDetailedStatementParam(this.selAccDtl,this.getdetailedStatementDataMore(this.dsForm.value,this.lastTransactionID,this.lastDate,this.lastPostingDate,this.lastBalance));
      this.getDetailedStatement(param)
      }
  }

  getdetailedStatementData(formData){
    var fromDate="",toDate="",sort="";

    if(this.selType == 'period'){
      fromDate = this.selectPeriodDtl.fromDate;
      toDate = this.selectPeriodDtl.toDate;
    }
    else if(this.selType == 'dateRange'){
      fromDate = formData.fromDate;
      toDate = formData.toDate;
    }
    else if(this.selType == 'transactionCount'){
      fromDate = this.selectPeriodDtl.fromDate;
      toDate = this.selectPeriodDtl.toDate
      sort = "D"

    }


    this.dtlStatementVal.START_DATE = ""+this.datePipe.transform(fromDate, 'yyyyMMdd');
    this.dtlStatementVal.END_DATE = toDate != "" ? ""+this.datePipe.transform(toDate, 'yyyyMMdd') : "        ";
    this.dtlStatementVal.LOW_AMOUNT = formData.minAmount != "" ? this.randomDigit(formData.minAmount) : "                 ";
    this.dtlStatementVal.HIGH_AMOUNT = formData.maxAmount != "" ? this.randomDigit(formData.maxAmount) : "                 ";
    this.dtlStatementVal.FIRST_CHEQUE_NUMBER = "                ";
    this.dtlStatementVal.LAST_CHEQUE_NUMBER = "                ";
    this.dtlStatementVal.NUMBER_OF_RECORDS_REQUESTED = formData.transCount != "" ? formData.transCount : "  ";
    this.dtlStatementVal.SORT_CRITERIA = sort != "" ? sort :" ";
    this.dtlStatementVal.CRDR_FLAG = formData.transType != "" ? formData.transType : " ";
    this.dtlStatementVal.LAST_TRANSACTION_DATE = "        ";
    this.dtlStatementVal.LAST_TRANSACTION_ID = "         ";
    this.dtlStatementVal.LAST_PART_TRANSACTION_NUMBER = "    ";
    this.dtlStatementVal.LAST_POSTING_DATE = "              ";
    this.dtlStatementVal.LAST_BALANCE = "                 ";


    var detailStatementStr = "";
    detailStatementStr = this.dtlStatementVal.START_DATE +
    this.dtlStatementVal.END_DATE +
    this.dtlStatementVal.LOW_AMOUNT +
    this.dtlStatementVal.HIGH_AMOUNT +
    this.dtlStatementVal.FIRST_CHEQUE_NUMBER +
    this.dtlStatementVal.LAST_CHEQUE_NUMBER +
    this.dtlStatementVal.NUMBER_OF_RECORDS_REQUESTED +
    this.dtlStatementVal.SORT_CRITERIA +
    this.dtlStatementVal.CRDR_FLAG +
    this.dtlStatementVal.LAST_TRANSACTION_DATE +
    this.dtlStatementVal.LAST_TRANSACTION_ID +
    this.dtlStatementVal.LAST_PART_TRANSACTION_NUMBER +
    this.dtlStatementVal.LAST_POSTING_DATE +
    this.dtlStatementVal.LAST_BALANCE;


    detailStatementStr = detailStatementStr.trim();


    console.log(detailStatementStr);

    return detailStatementStr;

  }

  AccountEnquiryDtl() {
    var param = this.myAccountInfoService.getAccountEnquiryParam(this.selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data);
        if (data.hasOwnProperty("set")) {
          this.accountDtls = data.set.records[0];
          // this.Date=this.openingDate()
          // console.log("Date",this.openingDate());
          console.log("Account details::",this.accountDtls);
          //hardcoded for now need to be changed later
        
    
        }
      }
      else {

      }
    });
  }

  randomCheque(value)
  {
    if(value!="")
    {
      var predigits:any = '000000'
      var digit:any = predigits + value
      var length:any = digit.length
      var diff:any = Math.abs(6- +length)
      return digit.slice(diff)
    }
    else
    return '-'
    

  }

  convertCurrency(value) {
    return OSREC.CurrencyFormatter.format(value, { currency: 'INR', symbol: '₹' });
   }

  /**
   *
   * @param print
   */
   generatePDF(print?: any) {
    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = this.constant.psbNewLogo;
    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line


    doc.setFontSize(10);
    doc.text("Branch Name : "+this.selAccDtl.branch_name, pageWidth - 110, 10, 'left');
    doc.text("Branch Code : "+this.selAccDtl['001'], pageWidth - 110, 15, 'left');
   // doc.text("Branch Address : "+this.accountDtls.BranchAddress, pageWidth - 110, 20, 'left');  // +this.selAccDtl.BRANCHADDRESS, pageWidth - 110, 20, 'left');
    var splitTitle = doc.splitTextToSize("Branch Address : "+this.accountDtls.BranchAddress, 90);
    doc.text(splitTitle, pageWidth - 110,20 ,'left');
    doc.text("Branch Contact : "+this.accountDtls.phone_number, pageWidth - 110, 30, 'left');
    doc.text("IFSC : " +this.accountDtls.ifscCode, pageWidth - 110, 35, 'left');
    doc.text("MICR Code : "+this.accountDtls.micrCode,pageWidth - 110, 40, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(20);
    doc.text("Account Statement", 20, 60, 'left');

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 55, 'S');

    doc.setFontSize(15);
    if(this.dataService.accTypeSelected == "Deposits")
    doc.text("Account Name : "+this.depositsDtl?.accountName, 20, 80, 'left');
    else
    doc.text("Account Name : "+this.loanUserDtl?.accountName, 20, 80, 'left');



    doc.setFontSize(10);
    if(this.dataService.accTypeSelected == "Deposits")
    doc.text("Customer ID : "+this.depositsDtl?.customerID,20, 90, 'left');
    else
    doc.text("Customer ID : "+this.loanUserDtl?.customerID,20, 90, 'left');

    doc.text("Account Number : " +this.accountDtls?.accountNo, 20, 95, 'left');
    doc.text("Account Type : " +this.accountDtls?.accountType + " - "+this.selAccDtl?.schemeDescription, 20, 100, 'left');
    var splitTitle = doc.splitTextToSize("Address : "+this.titlecasePipe.transform(this.dataService.profileDetails[0].add1 +","+this.dataService.profileDetails[0].add2 +"," +this.dataService.profileDetails[0].pin),90);
    doc.text(splitTitle, 20, 105, 'left');
    doc.text("Date : "+this.datePipe.transform(new Date(), 'dd/MM/yyyy'), pageWidth - 20, 80, 'right');
   // doc.text(, 20, 100, 'left');


    // doc.setLineWidth(0.5);
    // doc.line(pageWidth/2, 80, pageWidth/2, 110);

   // doc.text("Customer ID : "+this.accountDtls?.customerId,pageWidth - 100, 90, 'left');
   var objIndex = this.modeOfOpertion.findIndex(
    (obj) => obj.ModeOfOperation == this.selAccDtl.ModeOfOperation
  );
  if(this.modeOfOpertion[objIndex]!=undefined)
   doc.text("Mode of Operation : "+this.modeOfOpertion[objIndex].modeOfOperationType, pageWidth - 120, 90, 'left');
   else
   doc.text("Mode of Operation : "+'-', pageWidth - 120, 90, 'left');
   var datadate = this.Date?.split('-')
   if(this.Date!=undefined && this.Date!="")
   doc.text("Account Opening Date : "+this.Date?.split('-')[0]+"/"+this.Date?.split('-')[1]+"/"+this.Date?.split('-')[2], pageWidth - 120, 95, 'left');




    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");
    doc.setFontSize(5);
    var newArray:any = []

      for(var i=0;i<this.detailStatementList.length;i++)
      {
      var newData:any=[]
      var date =   this.detailStatementList[i].TransactionDate.substring(6,8) + '/' + this.detailStatementList[i].TransactionDate.substring(4,6) + '/' + this.detailStatementList[i].TransactionDate.substring(0,4)
      var remark = this.detailStatementList[i].particulars
      var ref = this.detailStatementList[i].TransactionId
      var cheque = this.randomCheque(this.detailStatementList[i].instrumentNumber)
      if(this.detailStatementList[i].creditOrDebit=='D')
      {
        var withdraw:any = this.convertCurrency(this.detailStatementList[i].amount)
        var deposit:any = "-"
      }
      else
      {
        var withdraw:any = "-"
        var deposit:any = this.convertCurrency(this.detailStatementList[i].amount)
      }
      var closing = this.convertCurrency(this.detailStatementList[i].closingBalance)
      newData.push(date,remark,ref,cheque,withdraw,deposit,closing)
      newArray.push(newData)

    }
    var _columns = ["Transaction Date", "Remarks", "Ref. No.","Cheque No.", "Withdraw", "Deposit", "Closing Balance"];
    var _rows = newArray;
    console.log(_rows);



    doc.autoTable(_columns, _rows, {
      theme: 'grid', // 'striped', 'grid' or 'plain',
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      margin: { top: 130 },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        horizontalPageBreak:true,
        font:"Sakalbharati",
      },
      columnStyles: {
        0: {cellWidth: 25},
        1: {cellWidth: 45},
        2: {cellWidth: 22},
        3: {cellWidth: 20},
        4: {cellWidth: 25, halign: 'right'},
        5: {cellWidth: 25, halign: 'right'},
        6: {cellWidth: 28, halign: 'right'},
      }
    });



    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(7)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
     // doc.setLineWidth(0.1);
    //  doc.text('Please examine your receipt immediately on receipt. If no error is reported in the printed statement with in 15 days, the acount will be considered correct.', 15, 278, 'left')
    //  doc.text('This is computer generated statement and does not require any signature. ', 15, 281, 'left')
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth-15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

  //  var poc = this.newpages(doc,pageWidth)

    if (print) {
      doc.autoPrint();
      window.open(doc.output('bloburl'));
    }
    else {
      this.commonMethod.downloadPDF(doc, 'Detail_Statement');
    }
  }


  getMyLoansDtlStatement(accNo,fromDate,toDate){
    var param = this.myBorrowingService.getMyLoansDtlStatement(accNo,fromDate,toDate);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANMINISTATEMENT ).subscribe(data => {
        console.log("getMyLoansMiniStatement===>",data);
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          if (data.hasOwnProperty("set")) {
            this.loanDtls  = data.set.records;
          }
        }
      });
  }



  setDate(date){
    var validDate;
    var urDate = date.match(/(\d{4})(\d{2})(\d{2})/);
    validDate = urDate[3]+"/"+urDate[2]+"/"+urDate[1];
    return validDate
  }

  getLoanDetailedStatement(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANDEMANDDETAILS).subscribe(data => {
      console.log("detailStatementList  ===> ",data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty("set")) {
          this.detailStatementList = data.set.records;
          this.detailStatementList.forEach(el => {
            el.demandDate = this.formatDate(el.demandDate)
            el.demandOverdueDate = this.formatDate(el.demandOverdueDate)
            el.lastAdjustmentDate = this.formatDate(el.lastAdjustmentDate)
          });
        }
      }
      else {

      }
    });
  }

  formatDate(str) {
    var year = "";
    var month = "";
    var day = "";
    var newString = "";
    for (var i = 0; i < str.length; i++) {
      if(i >= 0 && i <= 3) {
        year += str[i];
      }
      else if(i > 3 && i <= 5) {
        month += str[i];
      }
      else if(i > 5) {
        day += str[i];
      }
    }
    console.log('year: ', year);
    console.log('month: ', month);
    console.log('day: ', day);

    newString = day + '/' + month + '/' + year;
    console.log('formatted date: ', newString);
    return newString;
  }

  closePopUp() {
    this.commonMethod.closeAllPopup();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
  

}


export enum certificateConfig{
  STATEMENT_COUNT = 'STATEMENT_COUNT',
  STATEMENT_PERIOD = 'STATEMENT_PERIOD'
}
