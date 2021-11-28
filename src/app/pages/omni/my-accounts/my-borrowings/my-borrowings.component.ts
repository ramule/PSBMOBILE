import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CommonMethods } from '../../../../utilities/common-methods';
import { DatePipe, Location } from '@angular/common';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { AccountType } from '../../../../utilities/app-enum';
import { DetailStatementService } from '../detailed-statement/detailed-statement.service';
import { MyBorrowingService } from './my-borrowings.service';
declare var loanListScript:any;

@Component({
  selector: 'app-accountpage',
  templateUrl: './my-borrowings.component.html',
  styleUrls: ['./my-borrowings.component.scss']
})
export class MyBorrowingsComponent implements OnInit {

  accountCarouselOptions: OwlOptions;
  activeTab = "home";

  refreshDate:any;
  myLoanAccount: any = [];
  loanAccountDtl: any = [];
  totalLoanAmt: any = 0;
  totalLoanAcc: any = '00';
  loanMandateDetailsList:any = [];
  refreshedTime:any;
  config1:any;
  showNoRecords:boolean = false
  isMyBorrowingSingleCurrency: boolean = false;

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
    public dataService : DataService,
    private router: Router,
    private commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location: Location,
    private detailStatementService: DetailStatementService,
    private myBorrowingService: MyBorrowingService,
    public datePipe:DatePipe
  ) {
    this.config1 = {id:"basicPaginate1", itemsPerPage:this.dataService.listCountObj.itemsPerPage, currentPage: this.dataService.listCountObj.currentPage};
   }
   pageChanged1(event){this.config1.currentPage= event;}
  ngOnInit(): void {
    this.dataService.setPageSettings('MY_TERM_LOANS');
    this.dataService.getBreadcrumb('MY_TERM_LOANS' , this.router.url)
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();
    this.refreshedTime = this.datePipe.transform(new Date().toISOString(), this.dataService.timeFormat);
    loanListScript();
    this.getAccountList();
    this.refreshDate = this.dataService.onRefreshDate;
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  getAccountList(type?){
    this.totalLoanAmt = 0;
    this.totalLoanAcc = 0;
    this.myLoanAccount = [];
    this.myLoanAccount = this.dataService.customerBorrowingsList;
    this.totalLoanAmt = this.dataService.totalMyBorrowingsBalance;

    this.myLoanAccount = this.modeOperationCheck(this.myLoanAccount);
    if(this.myLoanAccount.length > 0) this.isMyBorrowingSingleCurrency = this.myLoanAccount.some((e) => e.currency.toLowerCase() != "inr");
    
    if(this.myLoanAccount.length == 0){
      this.showNoRecords = true
    }
    this.totalLoanAcc = this.myLoanAccount.length < 10 ? '0' + this.myLoanAccount.length : this.myLoanAccount.length;
    /*****modified by USER PSB1*****/
    if(this.totalLoanAcc != '00' ){ this.activeTab = 'home'; }
    /*****modified by USER PSB1 Ends****/

    if(type == 'refresh'){
      this.dataService.onRefreshDate = new Date();
      this.refreshDate = this.dataService.onRefreshDate
    }
  }

  getAccountBalance(){
    let param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
    console.log(data);
    var resp = data.responseParameter;
    if (resp.opstatus == "00") {
      this.dataService.fetchTotalBalance(data.set.records , "dashboard");
      this.dataService.customerMyDepostie = [];this.dataService.customerOperativeAccList =[];this.dataService.customerBorrowingsList;
      this.dataService.totalMyDepositBalance = 0;this.dataService.totalMyOperativeBalance = 0;this.dataService.totalMyBorrowingsBalance = 0;
      data.set.records.forEach(el => {
        if( el.accountType != "CAPPI"){
          if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
            this.dataService.customerMyDepostie.push(el);
            this.dataService.totalMyDepositBalance = this.dataService.totalMyDepositBalance + parseFloat(el.acctBalance);
          }
          else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
            // el.AGSStatus = el["AGS Status"];
            this.dataService.customerOperativeAccList.push(el);
            this.dataService.totalMyOperativeBalance = this.dataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
          }
          else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
            this.dataService.customerBorrowingsList.push(el);
            this.dataService.totalMyBorrowingsBalance = this.dataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
          }
        }
      });
      this.refreshedTime = this.datePipe.transform(new Date().toISOString(), this.dataService.timeFormat);
      this.getAccountList();
    }
    else {

    }
  });
    
  }

  loanDetails(item){
    console.log(item);
    this.dataService.accDetails = item;
    this.dataService.loanDetails = item;
    this.dataService.accTypeSelected = "Loans"
    this.goToPage('/loanDetails');
  }

  goToPage(page,item?){
    if(page == 'payEmi'){
      console.log(item);
      this.dataService.accDetails = item;
      this.dataService.loanDetails = item;//accountNo
    }
    this.router.navigateByUrl('/'+page);
  }

  
  modeOperationCheck(operativeValues) {
    let temp = '';
    let temp2;
    console.log('Mode Operation :: ', this.modeOfOpertion.length)
    for (let i = 0; i < operativeValues.length; i++) {
      temp = operativeValues[i]['ModeOfOperation'];
      for (let j = 0; j < this.modeOfOpertion.length; j++) {
        if (temp == this.modeOfOpertion[j]['ModeOfOperation']) {
          temp2 = this.modeOfOpertion[j]['modeOfOperationType']
          break;
        }
      }
      operativeValues[i]['modeTypeValue'] = temp2;
    }
    console.log("MODE OF OPERATION :: ", operativeValues)

    return operativeValues;
  }


}
