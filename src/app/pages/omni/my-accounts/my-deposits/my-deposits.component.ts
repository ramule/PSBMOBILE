import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { MydepositeService } from '././mydeposite.service';
import { AppConstants } from 'src/app/app.constant';
import { AccountType } from '../../../../utilities/app-enum';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { DetailStatementService } from '../detailed-statement/detailed-statement.service';

@Component({
  selector: 'app-accountpage',
  templateUrl: './my-deposits.component.html',
  styleUrls: ['./my-deposits.component.scss']
})
export class MyDepositsComponent implements OnInit {

  isActive:boolean = true;
  isActiveCurrent:boolean = false;
  isDeposite:boolean = false;
  depositiveAccountEnquery:any="";
  myFixedDepAccount:any=[];
  totalFixedAcc:any = '00';
  totalFixedAmt:any = 0;
  myRecuringDepAccount:any=[];
  totalRecuringAcc:any = '00';
  totalRecuringAmt:any = 0;
  accountCarouselOptions: OwlOptions;
  totalAssetsAmt:any;
  activeTab="fixed";
  myDepositShow: boolean = false;
  myFixedAccount: any = [];
  totalSavAcc: any = '00';
  totalSavAmt: any = 0;
  myRecurringAccount: any = [];
  totalCurrentAcc: any = '00';
  totalCurrentAmt: any = 0;
  myDepositeAccount: any = [];
  totalDepositeAcc: any = '00';
  totalDepositeAmt: any = 0;
  myFdShow: boolean = false;
  myRdShow: boolean = false;
  getdeposits:any;
  totalSavingAmt: any;
  refreshedTime: any;
  config1:any;
  config2:any;
  showNoRecords:boolean = false;

  isDepositeSingleCurrency: boolean = false;
  isFixedDepositingleCurrency: boolean = false;
  isRecuringDepositeSingleCurrency: boolean = false;

  cardSelectionSection: any;
  refreshDate:any;
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
  ];
  constructor(
    public dataService : DataService,
    private commonMethod:CommonMethods,
    private router : Router,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private mydepositeService: MydepositeService,
    private constant: AppConstants,
    private datepipe: DatePipe,
    private location: Location,
    private detailStatementService: DetailStatementService
    ) {
      this.config1 = {id:"basicPaginate1", itemsPerPage:this.dataService.listCountObj.itemsPerPage, currentPage: this.dataService.listCountObj.currentPage};
      this.config2 = {id:"basicPaginate2", itemsPerPage:this.dataService.listCountObj.itemsPerPage, currentPage: this.dataService.listCountObj.currentPage};
    }
    pageChanged1(event){this.config1.currentPage= event;}
    pageChanged2(event){this.config2.currentPage= event;}

  ngOnInit(): void {
    this.initialize();
    //this.DepositeAccountEnquery();
    this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.dataService.timeFormat);
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.dataService.setPageSettings('MY_DEPOSITS');
    this.dataService.getBreadcrumb('MY_DEPOSITS' , this.router.url);
    this.isDepositeSingleCurrency = this.dataService.customerMyDepostie.some((e) => e.currency.toLowerCase() != "inr");
    console.log("accountNumber ===>",this.isDepositeSingleCurrency);
  }


   /**
   * filter and load data at the time of intialization
   */
  initialize(){
    this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();
    this.dataService.setPageSettings('MY_ACCOUNTS');
    this.dataService.setShowThemeObservable(true);
    this.dataService.setShowsideNavObservable(true);
    this.dataService.setShowNotificationObservable(true);

    this.refreshDate = this.datepipe.transform(this.dataService.onRefreshDate.toISOString(), this.dataService.timeFormat);
    // this.getOmniDashboardData();
    this.getAccountList();
  }

  getOmniDashboardData(){
    let param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.dataService.timeFormat);
        // this.accountList = data.set.records;
        this.dataService.fetchTotalBalance(data.set.records , "dashboard");

        this.dataService.customerMyDepostie = [];
        this.dataService.customerOperativeAccList =[];
        this.dataService.customerBorrowingsList= [];
          this.dataService.totalMyDepositBalance = 0;
          this.dataService.totalMyOperativeBalance = 0;
          this.dataService.totalMyBorrowingsBalance = 0;
          data.set.records.forEach(el => {
            if( el.accountType != "CAPPI"){
              if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
                this.dataService.customerMyDepostie.push(el);
                this.dataService.totalMyDepositBalance = this.dataService.totalMyDepositBalance + parseFloat(el.acctBalance);
              }
              else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
                this.dataService.customerOperativeAccList.push(el);
                this.dataService.totalMyOperativeBalance = this.dataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
              }
              else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
                this.dataService.customerBorrowingsList.push(el);
                this.dataService.totalMyBorrowingsBalance = this.dataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
              }
            }
          });

        this.totalSavingAmt = this.dataService.totalMyOperativeBalance.toFixed(2);
        this.totalDepositeAmt = this.dataService.totalMyDepositBalance.toFixed(2);

      }
    });
  }


  refreshDetails(){

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
          this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.dataService.timeFormat);
          this.getAccountList();
        }
        else {

        }
      });
  }

  getAccountList(type?:any) {
    this.totalSavingAmt = 0;
    this.totalSavAmt = 0;
    this.totalCurrentAmt = 0;
    this.totalDepositeAmt = 0;
    this.totalRecuringAcc = 0;
    this.totalFixedAcc = 0;
    this.totalDepositeAcc = 0;
    this.totalFixedAmt = 0;
    this.totalRecuringAmt = 0;
    this.myFixedAccount = [];
    this.myRecurringAccount = [];
    this.dataService.customerMyDepostie.forEach(el => {
      if( el.accountType != "CAPPI"){
        switch (el.SchemeCode) {
          case AccountType.FIXED_DEPOSITE_ACCOUNT:
            let accNo = el.accountNo
            if(this.dataService.isNRENRO)
            {
              if(accNo.slice(4, 6) == "14" || accNo.slice(4, 6) == "17"){ //"00501400002133" FD
                this.myFixedAccount.push(el);
                this.totalFixedAmt = this.totalFixedAmt + parseFloat(el.acctBalance);
              }
              else if(accNo.slice(4, 6) == "15"){ //"00501500002183" RD
                this.myRecurringAccount.push(el);
                this.totalRecuringAmt = this.totalRecuringAmt + parseFloat(el.acctBalance);
              }
            }
            else
            {
              if(accNo.slice(4, 6) == "14"){ //"00501400002133" FD
                this.myFixedAccount.push(el);
                this.totalFixedAmt = this.totalFixedAmt + parseFloat(el.acctBalance);
              }
              else if(accNo.slice(4, 6) == "15"){ //"00501500002183" RD
                this.myRecurringAccount.push(el);
                this.totalRecuringAmt = this.totalRecuringAmt + parseFloat(el.acctBalance);
              }
            }

            break;
          }
      }
    });

    if(this.myFixedAccount.length == 0 && this.myRecurringAccount.length == 0){
      this.showNoRecords = true
    }
    console.log('this.myFixedAccount: ', this.myFixedAccount);
    console.log('this.myFixedAccount: ', this.myRecurringAccount);
    this.myFixedAccount = this.modeOperationCheck(this.myFixedAccount);
    this.myRecurringAccount = this.modeOperationCheck(this.myRecurringAccount);

    this.totalFixedAcc = this.myFixedAccount.length < 10 ? '0' + this.myFixedAccount.length : this.myFixedAccount.length;
    this.totalRecuringAcc = this.myRecurringAccount.length < 10 ? '0' + this.myRecurringAccount.length : this.myRecurringAccount.length;

    if(this.dataService.isNRENRO){
      if(this.myFixedAccount.length > 0)this.isFixedDepositingleCurrency = this.myFixedAccount.some((e) => e.currency.toLowerCase() != "inr");
      if(this.totalRecuringAmt.length > 0) this.isRecuringDepositeSingleCurrency = this.totalRecuringAmt.some((e) => e.currency.toLowerCase() != "inr");
    }

    if(this.totalFixedAcc != '00' ){ this.activeTab = 'fixed'; }
    else{ this.activeTab = 'recurring'; }

    this.totalDepositeAmt = this.totalFixedAcc + this.totalRecuringAcc;
    if(type == 'refresh'){
      this.dataService.onRefreshDate = new Date();
      this.refreshDate = this.datepipe.transform(this.dataService.onRefreshDate.toISOString(), this.dataService.timeFormat);
    }
  }

  /**
   * will nativage to account detail page
   * @accountDetails selected account list
   */

  goToAccountDetails(accountDetails,index){
    this.dataService.accTypeSelected = "Deposits"
    this.dataService.accDetails = accountDetails;
    this.dataService.accDetails.showBal = false;
    this.dataService.accDetailsIdx = index
    this.dataService.accDetails.maskBalance = this.commonMethod.maskBalance(accountDetails.sbBalance);
   // this.router.navigateByUrl('/myAccountDetails');
   this.router.navigateByUrl('myAccountsInfo');
  }

  /**
   * get total balance of saving Account and current Account
   * @accountsArray saving or current account list
   */
  getTotalAvailBal(accountsArray){
    var totalAvailBal = 0;
    var arr = accountsArray;
    for (let index = 0; index < arr.length; index++) {
      totalAvailBal += Number(arr[index].sbBalance);
    }
    return totalAvailBal;
  }

  /**
   * get total ledger balance of saving Account and current Account
   * @accountsArray saving or current account list
   */
  getTotalLedgerBal(accountsArray){
    var totalLedgerBal = 0;
    var arr = accountsArray;
    for (let index = 0; index < arr.length; index++) {
      totalLedgerBal += Number(arr[index].LedgerBalance);
    }
    return totalLedgerBal;
  }


  getTotalCurrentBal(accountsArray){
    var totalCurrentBal = 0;
    var arr = accountsArray;
    for (let index = 0; index < arr.length; index++) {
      totalCurrentBal += Number(arr[index].sbBalance);
    }
    return totalCurrentBal;
  }


  gotoMyAccount(item, value){
    console.log(item);
    this.dataService.accDetails = item;
    this.dataService.accTypeSelected = "Deposits";
    this.dataService.subAccTypeSelected = value ;
    this.router.navigateByUrl('/myAccountsInfo');
  }

  gotoFundTransfer(item){
    this.router.navigateByUrl('/sendMoney');
  }

  goToPage(routeName, selTab){
    this.router.navigateByUrl('/'+routeName, {state: { openDepositTabSelection: selTab }});
  }

  modeOperationCheck(operativeValues : any) {
    console.log("MODE OF OPERATION :: ", operativeValues)

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
