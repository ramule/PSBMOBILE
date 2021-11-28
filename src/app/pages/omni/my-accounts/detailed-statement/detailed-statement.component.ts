import {AfterViewInit, Component, ElementRef, OnInit,OnDestroy, ViewChild  } from '@angular/core';

import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { pageLoaderService } from '../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { DatePipe } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DetailStatementService } from '../detailed-statement/detailed-statement.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import { DtlStatementData } from 'src/app/utilities/app-interface';
import { AccountType } from '../../../../utilities/app-enum';
// declare var dtSample1: any;
declare var showToastMessage: any;
declare var selectAccountMob:any;
import { Location } from '@angular/common';
import { MyAccountInfoService } from '../my-accounts-info/my-account-info.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { FontBase64 } from 'src/app/utilities/app-enum';
import { TitleCasePipe } from '@angular/common';
// import 'rxjs/add/operator/map';
declare var OSREC: any;
@Component({
  selector: 'app-detailed-statement',
  templateUrl: './detailed-statement.component.html',
  styleUrls: ['./detailed-statement.component.scss']
})
export class DetailedStatementComponent implements AfterViewInit, OnDestroy ,  OnInit {

  totalAccountList:any = [];
  selectedAccountNo:any;
  selAccDtl:any;
  refreshDate: Date;
  selType: string = "period";
  detailStatementList:any = [];
  periodList:any = [];
  transactionCnt:any = [];
  pdfTransactionData: any = [];
  accountDtls: any;
  accountOpeningdate:any;
  Date:any;
  dtlStatementVal = {} as DtlStatementData;
  selectPeriodDtl = {
    fromDate : "",
    toDate : "",
  }
  lastDate: any;
  lastTransactionID: any;
  moreListFlag = 'N'
  accountList = [];
  selectedAccount: any;
  selectedAccBal: any;
  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }
  inputList:any;
  transactionType:any;
  dsForm:FormGroup;
  disable:boolean = false;
  // detailStatementForm: FormGroup;
  showDetails: boolean = false;
  transactionList = [];
  showAccountDetails = false;
  selectedAccountDetails:any;
  currentDate: any;
  periodLists=[];
  minAmtInwords="";
  maxAmtInwords="";
  public formErrors = {
    transferFrom: '',
    selType: '',
    fromDate: '',
    toDate: '',
    fromAmt: '',
    toAmt: '',
    lastTrans: ''
  };
  counter = 0
  @ViewChild('search') advSearch: ElementRef;


  @ViewChild(DataTableDirective , {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  maxFrom : Date = new Date();
  maxTo : Date = new Date();
  minFrom : Date = new Date('01-01-1900');
  minTo : Date = new Date('01-01-1900');
  openBal :any = 0;
  totalDeposit :any = 0;
  totalWithdraw :any = 0;
  closingBal :any = 0;
  toDate:any;
  dayDiff:any;
  startendDifference:any;
  hasErrorOneYear : boolean = false;
  finalDisplayValue =[]
  itemsToShow = 20
  nextCount = 1
  endindex
  minmaxCheck:boolean
  lastPostingDate:any;
  lastBalance:any

  dateGreaterThan : boolean = false;
  selectPeriodDropdown:any=""

  globalPeriod:any='Select'
  globalCount:any='Select'

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

  constructor(
    private router: Router,
    public dataService: DataService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private detailStatementService: DetailStatementService,
    public commonMethod : CommonMethods,
    private customCurrencyPipe : CustomCurrencyPipe,
    private form: FormBuilder,
    public loader: pageLoaderService,
    public datePipe: DatePipe,
    private location:Location,
    private myAccountInfoService: MyAccountInfoService,
    private elementRef: ElementRef,
    private translatePipe: TranslatePipe,
    private titlecasePipe:TitleCasePipe
    ) {
      this.onNumberchange(10)
    }


     /*Sanal Code start*/
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


    ngAfterViewInit(): void {
      //  this.dtTrigger.next();
    }
    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        console.log(dtInstance)
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
         this.dtTrigger.next();
       });
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  ngOnInit(): void {


    this.dataService.setPageSettings('DETAIL_STATEMENT');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('DETAIL_STATEMENT' , this.router.url)


    this.initialize();
    history.pushState({}, "myAccountsInfo", this.location.prepareExternalUrl("myAccountsInfo"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    // this.dataService.changeMessage(this.commonPageComponent);

    // dtSample1();
    var self = this;

    $(document).on('click' , '.paginate_button.next', function(){

      self.callDetailApiAgain();

    })

    // selectAccountMob();

    this.transactionType = [
      { name: 'Both', value: '', checked: false },
      { name: 'Credit', value: 'C', checked: false },
      { name: 'Debit', value: 'D', checked: false }
    ];


  }

  onNumberchange(value){
    if(this.finalDisplayValue.length>0)
    {
      this.itemsToShow = value
      this.finalDisplayValue =[]
      for(var i=0;i < value ; i++){
      this.finalDisplayValue.push(this.detailStatementList[i])
      }
    }

  }

 callDetailApiAgain(){
  if(this.moreListFlag == "Y"){
  //   if(this.dtlStatementVal.CRDR_FLAG == 'B' || this.dtlStatementVal.CRDR_FLAG.trim() == '')
  //   var nextdata =this.lastDate+this.datePipe.transform(this.dsForm.value.toDate, 'yyyyMMdd')+"                                                                     B        "+this.lastTransactionID
  //   if(this.dtlStatementVal.CRDR_FLAG == 'C')
  //   var nextdata =this.lastDate+this.datePipe.transform(this.dsForm.value.toDate, 'yyyyMMdd')+"                                                                     C        "+this.lastTransactionID
  //   if(this.dtlStatementVal.CRDR_FLAG == 'D')
  //   var nextdata =this.lastDate+this.datePipe.transform(this.dsForm.value.toDate, 'yyyyMMdd')+"                                                                     D        "+this.lastTransactionID
  //  var param = this.detailStatementService.getDetailedStatementParam(this.selAccDtl,nextdata)
  //   this.getDetailedStatement(param)

  this.selectPeriodDtl.fromDate = this.lastDate
  this.selectPeriodDtl.toDate = this.datePipe.transform(this.dsForm.value.toDate, 'yyyyMMdd')
  var param = this.detailStatementService.getDetailedStatementParam(this.selAccDtl,this.getdetailedStatementDataMore(this.dsForm.value,this.lastTransactionID,this.lastDate,this.lastPostingDate,this.lastBalance));
  this.getDetailedStatement(param)
  }

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


  breadcrumroute(routeName){
    this.dataService.updateBreadcrumb(this.router.url , routeName)
    this.router.navigateByUrl('/' + routeName);
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

  initialize(){
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 10,

    };
    this.buildForm();
    this.getAccountList('onload');
    this.selStatementType(this.selType);
    this.getPeriod();
    this.getCount();
    this.refreshDate = this.dataService.onRefreshDate;
    history.pushState({}, 'myAccountsInfo', this.location.prepareExternalUrl('myAccountsInfo'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    // this.dsForm.controls['filtertype1'].setValue("period");
  }

  getAccountList(type?:any){
    var param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty("set")) {
          // data.set.records.forEach(el => {
          //   el.maskedAccNo = this.commonMethod.maskAccNo(el.accountNo);
          // });
          //this.totalAccountList = data.set.records;

          if(this.dataService.accTypeSelected == "Operative")
          {

            for(var i=0;i<data.set.records.length;i++)
            {
              if( data.set.records[i].accountType != "CAPPI"){
                if(data.set.records[i].SchemeCode == AccountType.SAVING_ACCOUNT ||  data.set.records[i].SchemeCode == AccountType.CURRENT_ACCOUNT || data.set.records[i].SchemeCode == AccountType.CASH_CREDIT || data.set.records[i].SchemeCode == AccountType.OVER_DRAFT_ACCOUNT)
                this.totalAccountList.push(data.set.records[i])
              }
            }

          }
          else if(this.dataService.accTypeSelected == "Deposits")
          {

            for(var i=0;i<data.set.records.length;i++)
            {
              if( data.set.records[i].accountType != "CAPPI"){
                if(data.set.records[i].SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT)
                this.totalAccountList.push(data.set.records[i])
              }
            }

          }
          else if(this.dataService.accTypeSelected == "Borrowings")
          {

            for(var i=0;i<data.set.records.length;i++)
            {
              if( data.set.records[i].accountType != "CAPPI"){
                if(data.set.records[i].SchemeCode == AccountType.LOAN_ACCOUNT)
                this.totalAccountList.push(data.set.records[i])
              }
            }

          }

          console.log(this.totalAccountList);
          if(type == 'onload'){
            this.dsForm.controls['selAcc'].setValue(this.dataService.accDetails.accountNo);
            this.dsForm.controls['filtertype1'].setValue("period");
            //this.dsForm.value.selAcc = this.dataService.accDetails.accountNo;
            this.getSelectedAccount(this.dsForm.value.selAcc)
          }
        }
      }
      else {

      }
    });

  }


  getSelectedAccount(accNo){
    this.detailStatementList  = []
    this.finalDisplayValue=[]
    this.lastDate = ""
    this.selectedAccountNo = accNo;
    var selAccDtl =  this.totalAccountList.filter(item => item.accountNo == accNo );
    this.selAccDtl = selAccDtl[0];
    console.log('selected account details: ', selAccDtl);
    this.AccountEnquiryDtl();
  }

  AccountEnquiryDtl() {
    var param = this.myAccountInfoService.getAccountEnquiryParam(this.selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data);
        if (data.hasOwnProperty("set")) {
          this.accountDtls = data.set.records[0];
          this.accountOpeningdate=data.set.records[0].statement.split(',')[3];
          console.log("Opening date::", this.accountOpeningdate);
          this.Date=this.openingDate()
          console.log("Date",this.openingDate());
          console.log("Account details::",this.accountDtls);
          //hardcoded for now need to be changed later
          if(this.accountDtls?.accountType == AccountType.SAVING_ACCOUNT){
            this.accountDtls.CurrentRateofInterest = "3.10* %";
          }
          else if(this.accountDtls?.accountType == AccountType.CURRENT_ACCOUNT ){
            this.accountDtls.CurrentRateofInterest = "00 %";
          }
          else if(this.accountDtls?.accountType == AccountType.CASH_CREDIT){
            this.accountDtls.CurrentRateofInterest = "-";
          }
          else if(this.accountDtls?.accountType == AccountType.OVER_DRAFT_ACCOUNT){
            this.accountDtls.CurrentRateofInterest = "-";
          }
        }
      }
      else {

      }
    });
  }

  openingDate() {
  var x = this.accountOpeningdate;
  var day = x % 100;
  var month = Math.floor(x % 10000 / 100);
  var year = Math.floor(x / 10000);
  var date = new Date(year, month - 1, day);
  var OpDate=this.datePipe.transform(date, 'dd-MM-yyyy');
  return OpDate;
  }

  closePopup(){
    this.commonMethod.closePopup('div.popup-bottom');
  }



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

  selectAccount(){
    this.commonMethod.openPopup('div.popup-bottom.sel-account');
  }

  selectMobperiod()
  {
    this.commonMethod.openPopup('div.popup-bottom.sel-period');
  }
  selectMobcount()
  {
    this.commonMethod.openPopup('div.popup-bottom.sel-count');
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

  submit(data){
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
    this.lastDate = ""
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


  //Vikrant Code Start

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


  //Vikrant Code End

  formatDate(str) {
    return str.substring(6,8) + '/' + str.substring(4,6) + '/' + str.substring(0,4);
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
    this.globalPeriod = value
    //this.dsForm.controls['selectPeriod'].setValue(this.globalCount);
    this.dsForm.patchValue({selectPeriod:this.globalPeriod})
    
    // this.dsForm.controls['fromDate'].setValue(from);
    // this.dsForm.controls['toDate'].setValue(to);
  }


  onCountSelected(){
    var d,from
    d = new Date();
    //from = d.setDate(d.getDate() -90);
    this.selectPeriodDtl.fromDate = (new Date(d.getFullYear(), d.getMonth()-12, new Date().getDate())).toString();
    this.selectPeriodDtl.toDate = d.setDate(d.getDate())
    //this.dsForm.controls['fromDate'].setValue(from);
  }

  onCountSelectedMob(value){
    var d,from
    d = new Date();
    //from = d.setDate(d.getDate() -90);
    this.selectPeriodDtl.fromDate = (new Date(d.getFullYear(), d.getMonth()-12, new Date().getDate())).toString();
    this.selectPeriodDtl.toDate = d.setDate(d.getDate())
    //this.dsForm.controls['fromDate'].setValue(from);
    this.globalCount = value
   // this.dsForm.controls['transCount'].setValue(this.globalCount);
    this.dsForm.patchValue({transCount:this.globalCount})
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

  // onDateChange(event,type){
  //   console.log(event);
  //   console.log(type);
  //   console.log(this.dsForm.value.fromDate);
  //   console.log(this.dsForm.value.toDate);
  //   if(type == 'fromDate'){
  //     this.minTo = event;
  //   }
  //   else if(type == 'toDate'){
  //     this.maxFrom = event;
  //   }
  //   // if(this.dsForm.value.fromDate) this.minFrom = this.dsForm.value.fromDate;
  //   // if(this.dsForm.value.toDate) this.maxTo = this.dsForm.value.toDate;
  // }


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
    doc.text("Branch Code : "+this.selAccDtl.branchCode, pageWidth - 110, 15, 'left');
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
    doc.text("Account Name : "+this.accountDtls?.customerName, 20, 80, 'left');


    doc.setFontSize(10);
    doc.text("Customer ID : "+this.accountDtls?.customerId,20, 90, 'left');
    doc.text("Account Number : " +this.accountDtls?.accountNo, 20, 95, 'left');
    doc.text("Account Type : " +this.accountDtls?.accountType, 20, 100, 'left');
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
   doc.text("Mode of Operation : "+this.modeOfOpertion[objIndex].modeOfOperationType, pageWidth - 130, 90, 'left');
   var datadate = this.Date.split('-')
   doc.text("Account Opening Date : "+this.Date.split('-')[0]+"/"+this.Date.split('-')[1]+"/"+this.Date.split('-')[2], pageWidth - 130, 95, 'left');




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

    if (print ==  "print") {
      doc.autoPrint();
      window.open(doc.output('bloburl'));
    }
    else if(print == "email"){
      // alert()
      // window.open('mailto:?subject=Detailed Statement&body=' + );
    }
    else {
      this.commonMethod.downloadPDF(doc, 'Detail_Statement');
    }
  }

  convertCurrency(value) {
   return OSREC.CurrencyFormatter.format(value, { currency: 'INR', symbol: '₹' });
  }




  checkMinMax()
{
  if(this.dsForm.value.minAmount!="" && this.dsForm.value.maxAmount!="")
   if(+this.dsForm.value.minAmount > +this.dsForm.value.maxAmount)
   this.minmaxCheck = true
   else
   this.minmaxCheck = false


}

  toCheckdate(){
    var startDate = moment(this.dsForm.value.fromDate);
    var endDate = moment(this.dsForm.value.toDate);

    this.dayDiff = endDate.diff(startDate, 'days');
    console.log('Days:' + this.dayDiff);
  }



  /**
   * Initialization
   */
  //initialize() {
    // this.dataService.setPageSettings('STATEMENT');
    // this.buildForm();
    // this.accountList = JSON.parse(JSON.stringify(this.dataService.customerCanTransferAccountList));//assign copy of object instead of memory reference
    // var datePipe = new DatePipe("en-US");
    // this.currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    // //set selected account
    // this.detailStatementForm.controls['transferFrom'].setValue(this.dataService.accDetails.accountNumber);
    // console.log(this.dataService.accDetails);
    // this.selectedAccountDetails = this.dataService.accDetails;
    // this.selectedAccBal = this.dataService.accDetails.LedgerBalance;
    //this.getSelectPeriods();
 // }

  //new design

  /**
   * This function is called to get the particular object updated from array
   */
  // getBalanceEnquiryObj(array, obj) {
  //   return array.find(i => i.accountNumber == obj.accountNumber);
  // }

  // refreshDetails(){

  // }
  /**
   * This function is called when refresh icon is clicked to check the balance
   * @param customerAccDetails
   * @param index
   */
  // getBalanceEnquiry(customerAccDetails) {
  //   let balEnquiryReq = this.detailStatementService.getBalEnqParam(customerAccDetails);
  //   this.http.callBankingAPIService(balEnquiryReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEENQUIRY).subscribe(data => {
  //     console.log(data);
  //     var resp = data.responseParameter;
  //     if (resp.opstatus == "00") {
  //       console.log(data.responseParameter);
  //       let list = data.set.records;
  //       list.map((customer, index) => {
  //         customer.maskBalance = this.commonMethod.maskBalance(customer.sbBalance);
  //         return customer;
  //       });
  //       let balanceEnq = this.getBalanceEnquiryObj(list, customerAccDetails);
  //       console.log(balanceEnq);
  //     }
  //     else {
  //       this.errorCallBack(data.subActionId, resp);
  //     }
  //   });
  // }

  /**
   * Get Statement function
   */
  // getstatement() {
  //   // dtSample()
  //   // $("div.grid-container.grid-list").css("display", "block");
  //   this.validateForm();
  //   if (this.detailStatementForm.valid) {
  //     console.log(this.detailStatementForm.value);
  //     // if(this.advSearch.nativeElement.classList.contains('active')){
  //     //   let transactionParam = this.detailStatementService.getTransactionParam(this.detailStatementForm.value);
  //     //   this.getTransactionHistory(transactionParam);
  //     // }
  //     let transactionParam = this.detailStatementService.getTransactionParam(this.detailStatementForm.value);
  //     this.getTransactionHistory(transactionParam);

  //   } else {
  //     this.formErrors = this.formValidation.validateForm(this.detailStatementForm, this.formErrors, true);
  //   }
  // }

  //onAdvancedSearchClick() {
    // console.log(this.advSearch.nativeElement.advsearch.contains('active'));
    // if (this.advSearch.nativeElement.advsearch.contains('active')) {
    //   this.removeAdvanceSearchCtrls();
    // } else {
    //   this.addAdvanceSearchCtrls();
    // }
  //}


  // addAdvanceSearchCtrls() {
  //   this.detailStatementForm.addControl('fromDate', new FormControl('', [Validators.required]));
  //   this.detailStatementForm.addControl('toDate', new FormControl('', [Validators.required]));
  //   this.detailStatementForm.addControl('fromAmt', new FormControl('', [Validators.required]));
  //   this.detailStatementForm.addControl('toAmt', new FormControl('' , [Validators.required]));
  //   this.detailStatementForm.addControl('lastTrans', new FormControl('' , [Validators.required]));
  // }

  // removeAdvanceSearchCtrls() {
  //   this.detailStatementForm.removeControl('fromDate');
  //   this.detailStatementForm.removeControl('toDate');
  //   this.detailStatementForm.removeControl('fromAmt');
  //   this.detailStatementForm.removeControl('toAmt');
  //   this.detailStatementForm.removeControl('lastTrans');
  // }

  // validateForm() {
  //   if (this.detailStatementForm.invalid) {
  //     this.formValidation.markFormGroupTouched(this.detailStatementForm);
  //     return;
  //   }
  // }

  // clearFields() {
  //   $("div.grid-container.grid-list").css("display", "none");
  //   this.showAccountDetails = false;
  // }

  // buildForm() {
  //   // this.detailStatement = new FormGroup({
  //   //   selAcc: new FormControl('', [Validators.required]),
  //   //   filtertype1: new FormControl('', [Validators.required]),
  //   //   selectPeriod: new FormControl('', [Validators.required]),
  //   //   from: new FormControl('', [Validators.required]),
  //   //   to: new FormControl('', [Validators.required]),
  //   //   transCount: new FormControl('', [Validators.required]),
  //   //   minAmount: new FormControl('', [Validators.required]),
  //   //   maxAmount: new FormControl('', [Validators.required]),
  //   //   transType: new FormControl('', [Validators.required])

  //   // });

  //   // this.detailStatementForm.valueChanges.subscribe((data) => {
  //   //   this.formErrors = this.formValidation.validateForm(this.detailStatementForm, this.formErrors, true);
  //   // });
  // }


  // setFormControls(val) {
  //   if (val == '0') {
  //     this.detailStatementForm.get('fromDate').setValidators(Validators.required);
  //     this.detailStatementForm.get('toDate').setValidators(Validators.required);
  //     this.detailStatementForm.get('months').setValidators(Validators.nullValidator);
  //     this.detailStatementForm.get('fromDate').updateValueAndValidity();
  //     this.detailStatementForm.get('toDate').updateValueAndValidity();
  //     this.detailStatementForm.get('months').updateValueAndValidity();
  //     // this.detailStatementForm.get('fromDate').enable();
  //     // this.detailStatementForm.get('toDate').enable();
  //     // this.detailStatementForm.get('months').disable();
  //     this.detailStatementForm.get('months').reset('');
  //   } else {
  //     this.detailStatementForm.get('months').setValidators(Validators.required);
  //     this.detailStatementForm.get('fromDate').setValidators(Validators.nullValidator);
  //     this.detailStatementForm.get('toDate').setValidators(Validators.nullValidator);
  //     this.detailStatementForm.get('fromDate').updateValueAndValidity();
  //     this.detailStatementForm.get('toDate').updateValueAndValidity();
  //     this.detailStatementForm.get('months').updateValueAndValidity();
  //     // this.detailStatementForm.get('fromDate').disable();
  //     // this.detailStatementForm.get('toDate').disable();
  //     this.detailStatementForm.get('months').reset('');
  //     this.detailStatementForm.get('fromDate').reset();
  //     this.detailStatementForm.get('toDate').reset();
  //   }
  // }

  /**
   * On account number change this function is invoked
   * @param account
   */
  // onAccountNoChange(accountNumber) {
  //   // this.selectedAccount = accountNumber;
  //   if (accountNumber != '') {
  //     this.selectedAccount = this.accountList.find(i => i.accountNumber == accountNumber);
  //     console.log(this.selectedAccount);
  //     this.selectedAccBal = this.selectedAccount.sbBalance;
  //   } else {
  //     $("#transferFrom").val('');
  //   }
  // }



  // download() {

  // }

  // clear() {
  //   this.detailStatementForm.reset();
  // }

  /**
  * api call to get transaction history
  * @param
  */
  // getTransactionHistory(param) {
  //   this.showAccountDetails = false;
  //   this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_TRANSACTIONHISTORY).subscribe(data => {
  //     console.log(data);
  //     if (data.listofDataset !== undefined && data.listofDataset[0] !== undefined && data.listofDataset[0].records !== undefined) {
  //       this.transactionList = data.listofDataset[0].records;
  //     }
  //     else {
  //       this.transactionList = [];
  //     }
  //     if(data.hasOwnProperty('set')){
  //       this.transactionList = data.set.records;
  //     }
  //     this.showAccountDetails = true;
  //   });
  // }

  /**
  * function to called on unsuccessfull responce
  * @subActionId
  * @resp
  */
  // errorCallBack(subActionId, resp) {
  //   if (resp.opstatus == "02") {
  //     showToastMessage(resp.Result, "error");
  //   }
  // }


  /**
  * Validation if tpin & confirm tpin doesn't match
  * @param formGroup
  */
  // validaDate(formGroup: FormGroup) {
  //   let validDate = true;
  //   const { value: fromDate } = formGroup.get('fromDate');
  //   const { value: toDate } = formGroup.get('toDate');

  //   if (new Date(fromDate) > new Date(toDate)) {
  //     validDate = false;
  //   }
  //   return validDate ? null : { invalidDate: true };
  // }

  // getSelectPeriods() {
  //   let reqParams = this.detailStatementService.getSelectPeriodParam();
  //   this.http.callBankingAPIService(reqParams, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETSELECTPERIOD).subscribe(data => {
  //     var resp = data.responseParameter
  //     if (resp.opstatus == "00") {
  //       this.periodLists = data.set.records;
  //     }
  //     else {
  //       this.errorCallBack(data.subActionId, resp);
  //     }
  //   });
  // }

  // onInput(value,type) {
  //   if(value == '0'){
  //     if(this.detailStatementForm.contains('fromAmount')) this.detailStatementForm.get('fromAmount').reset();
  //     if(this.detailStatementForm.contains('toAmount')) this.detailStatementForm.get('toAmount').reset();
  //     return;
  //   }
  //   if (value != '') {
  //     let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
  //     if(type == 'minAmt'){
  //       if(this.detailStatementForm.contains('fromAmount'))  this.detailStatementForm.patchValue({ fromAmount: "₹" + updatedCurrency });
  //       this.minAmtInwords = this.commonMethod.convertNumberToWords(value);
  //     }else{
  //       if(this.detailStatementForm.contains('toAmount'))  this.detailStatementForm.patchValue({ toAmount: "₹" + updatedCurrency });
  //       this.maxAmtInwords = this.commonMethod.convertNumberToWords(value);
  //     }
  //   } else {
  //     if(type == 'minAmt'){
  //       if(this.detailStatementForm.contains('fromAmount'))  this.detailStatementForm.get('fromAmount').reset();
  //       this.minAmtInwords = '';
  //     }else{
  //       if(this.detailStatementForm.contains('toAmount'))  this.detailStatementForm.get('toAmount').reset();
  //       this.maxAmtInwords = '';
  //     }
  //     }
  // }


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

  //   console.log("this.toDate: " + this.startendDifference)

    }

    randomDigit(value)
    {
      var predigits:any = '00000000000000000000'
      var digit:any = predigits + value
      var length:any = digit.length
      var diff:any = Math.abs(17- +length)
      return digit.slice(diff)

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
}






export enum certificateConfig{
  STATEMENT_COUNT = 'STATEMENT_COUNT',
  STATEMENT_PERIOD = 'STATEMENT_PERIOD'
}
