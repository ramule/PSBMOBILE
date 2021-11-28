import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DetailStatementService } from '../detailed-statement/detailed-statement.service';
import { AppConstants } from 'src/app/app.constant';
import { AccountType } from '../../../../utilities/app-enum';
import { DatePipe, Location } from '@angular/common';
declare var showToastMessage: any;

@Component({
  selector: 'app-accountpage',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.scss']
})
export class MyAccountComponent implements OnInit {

  isActive: boolean = true;
  isActiveCurrent: boolean = false;
  isDeposite: boolean = false;
  mySavingAccount: any = [];
  totalSavAcc: any = '00';
  totalSavAmt: any = 0;
  myCurrentAccount: any = [];
  totalCurrentAcc: any = '00';
  totalCurrentAmt: any = 0;
  myDepositeAccount: any = [];
  totalDepositeAcc: any = '00';
  totalDepositeAmt: any = 0;
  myCashCreditAccount: any;
  totalCashCreditAmt: any;
  totalCashCreditAcc: any = '00'
  showNoRecords: boolean = false;
  accountCarouselOptions: OwlOptions;
  totalSavingAmt: any;
  activeTab = "savingAccount";
  cardSelectionSection: any;
  refreshDate: any;
  config1: any;
  config2: any;
  /*****modified by USER PSB1*****/
  config3: any;
  config4: any;
  /*****modified by USER PSB1 Ends****/
  norecords: boolean;
  isOperativeSingleCurrency: boolean = false;
  isSavingSingleCurrency: boolean = false;
  isCurrentSingleCurrency: boolean = false;
  isDepositeSingleCurrency: boolean = false;
  isCashCreditSingleCurrency: boolean = false;

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
    public dataService: DataService,
    private commonMethod: CommonMethods,
    private router: Router,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private detailStatementService: DetailStatementService,
    private constant: AppConstants,
    private location: Location,
    public datepipe: DatePipe,
  ) {
    this.config1 = { id: "basicPaginate1", itemsPerPage: this.dataService.listCountObj.itemsPerPage, currentPage: this.dataService.listCountObj.currentPage };
    this.config2 = { id: "basicPaginate2", itemsPerPage: this.dataService.listCountObj.itemsPerPage, currentPage: this.dataService.listCountObj.currentPage };
    /*****modified by USER PSB1*****/
    this.config3 = { id: "basicPaginate3", itemsPerPage: this.dataService.listCountObj.itemsPerPage, currentPage: this.dataService.listCountObj.currentPage };
    this.config4 = { id: "basicPaginate4", itemsPerPage: this.dataService.listCountObj.itemsPerPage, currentPage: this.dataService.listCountObj.currentPage };
    /*****modified by USER PSB1 Ends****/
  }

  pageChanged1(event) { this.config1.currentPage = event; }
  pageChanged2(event) { this.config2.currentPage = event; }
  /*****modified by USER PSB1*****/
  pageChanged3(event) { this.config3.currentPage = event; }
  pageChanged4(event) { this.config4.currentPage = event; }
  /*****modified by USER PSB1 Ends****/

  ngOnInit(): void {
    this.initialize();
  }

  /**
  * filter and load data at the time of intialization
  */
  initialize() {
    //console.log(this.dataService.customerAccountList);
    this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();
    console.log('operative account list: ', this.dataService.customerOperativeAccList);
    this.dataService.setPageSettings('OPERATIVE_ACCOUNTS');
    this.dataService.getBreadcrumb('OPERATIVE_ACCOUNTS' , this.router.url)
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.getAccountList();
    //this.refreshDate = this.dataService.onRefreshDate;
    this.refreshDate = this.datepipe.transform(this.dataService.onRefreshDate?.toISOString(), this.dataService.timeFormat);

    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.isOperativeSingleCurrency = this.dataService.customerOperativeAccList.some((e) => e.currency.toLowerCase() != "inr");

  }


  /**
  * function to get all the account list and filter
  *  data with respect to it
  */
  getAccountList(type?: any) {

    if(type == 'refresh'){
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
          this.dataService.onRefreshDate = new Date();
          this.refreshDate = this.datepipe.transform(this.dataService.onRefreshDate.toISOString(), this.dataService.timeFormat);
          this.setAccountDtl();
        }
        else {

        }
      });
    }
    else{
      this.setAccountDtl()
    }
  }

  //set account details
  setAccountDtl(){
    this.totalSavingAmt = 0;
    this.totalSavAmt = 0;
    this.totalCurrentAmt = 0;
    this.totalDepositeAmt = 0;
    this.totalSavAcc = 0;
    this.totalCurrentAcc = 0;
    this.totalDepositeAcc = 0;
    this.totalCashCreditAcc = 0;
    this.mySavingAccount = [];
    this.myCurrentAccount = [];
    this.myDepositeAccount = [];
    this.myCashCreditAccount = [];
    this.totalCashCreditAmt = 0;

    this.dataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI") {
        switch (el.SchemeCode) {
          case AccountType.SAVING_ACCOUNT:
            this.mySavingAccount.push(el);
            console.log("TESTTTTTTTTTTTTT ::: ", this.mySavingAccount )
            this.totalSavAmt = this.totalSavAmt + parseFloat(el.acctBalance);
            this.mySavingAccount = this.modeOperationCheck(this.mySavingAccount);
            break;
          case AccountType.CURRENT_ACCOUNT:
            this.myCurrentAccount.push(el);
            this.totalCurrentAmt = this.totalCurrentAmt + parseFloat(el.acctBalance);
            this.myCurrentAccount = this.modeOperationCheck(this.myCurrentAccount);
            break;
          case AccountType.OVER_DRAFT_ACCOUNT:
            this.myDepositeAccount.push(el);
            this.totalDepositeAmt = this.totalDepositeAmt + parseFloat(el.acctBalance);
            this.myDepositeAccount = this.modeOperationCheck(this.myDepositeAccount);
            break;
          case AccountType.CASH_CREDIT:
            this.myCashCreditAccount.push(el);
            this.totalCashCreditAmt = this.totalCashCreditAmt + parseFloat(el.acctBalance);
            this.myCashCreditAccount = this.modeOperationCheck(this.myCashCreditAccount);
            break;
        }

       
      
      }
  
    console.log("SAVING ACCOUNT :: ", this.mySavingAccount)
    });

    if (this.mySavingAccount.length == 0 && this.myCurrentAccount.length == 0 && this.myDepositeAccount.length == 0 && this.myCashCreditAccount.length == 0) {
      this.showNoRecords = true;
    }
    this.totalSavAcc = this.mySavingAccount.length < 10 ? '0' + this.mySavingAccount.length : this.mySavingAccount.length;

    if(this.dataService.isNRENRO){
      this.isSavingSingleCurrency = this.mySavingAccount.some((e) => e.currency.toLowerCase() != "inr");
      this.isCurrentSingleCurrency = this.myCurrentAccount.some((e) => e.currency.toLowerCase() != "inr");
      this.isDepositeSingleCurrency = this.myDepositeAccount.some((e) => e.currency.toLowerCase() != "inr");
      this.isCashCreditSingleCurrency = this.myCashCreditAccount.some((e) => e.currency.toLowerCase() != "inr");
    }
 
    this.totalCurrentAcc = this.myCurrentAccount.length < 10 ? '0' + this.myCurrentAccount.length : this.myCurrentAccount.length;
    this.totalDepositeAcc = this.myDepositeAccount.length < 10 ? '0' + this.myDepositeAccount.length : this.myDepositeAccount.length;
    this.totalCashCreditAcc = this.myCashCreditAccount.length < 10 ? '0' + this.myCashCreditAccount.length : this.myCashCreditAccount.length;



    // if (this.totalSavAcc != '00') { this.activeTab = 'savingAccount'; }
    // else if (this.totalCurrentAcc != '00') { this.activeTab = 'currentAccount'; }
    // else if (this.totalCashCreditAcc != '00') { this.activeTab = 'cashCreditAccount'; }
    // else { this.activeTab = 'odAccount'; }

    this.totalSavingAmt = this.totalSavAmt + this.totalCurrentAmt + this.totalDepositeAmt + this.totalCashCreditAmt;

  }


  

  /**
  * function to called on unsuccessfull responce
  * @subActionId
  * @resp
  */
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == "02") {
      showToastMessage(resp.Result, "error");
    }
  }
  breadcrumroute(routeName){
    this.dataService.updateBreadcrumb(this.router.url , routeName)
    this.router.navigateByUrl('/' + routeName);
  }

  gotoMyAccount(item) {
    console.log("ITEM :: ",item);
    if(item.Status.toLowerCase()=="active"){
      this.dataService.accDetails = item;
      
      this.dataService.accTypeSelected = "Operative"
      this.goToPage('myAccountsInfo');
    }
    else{
      this.commonMethod.openPopup('div.popup-bottom.inactive-account');
    }
  }

  _gotoFundTransfer() {
    this.goToPage('sendMoney');
  }

  _gotoMyAccount() {
    if (this.dataService.accDetails) {
      this.goToPage('myAccountsInfo');
    }
    else {
      showToastMessage("please select account to proceed", "error");
    }
  }

  gotoFundTransfer(item) {
    this.dataService.accDetails = item;
    if(item.Status.toLowerCase()=="active")
    this.goToPage('sendMoney');
    else
    this.commonMethod.openPopup('div.popup-bottom.inactive-account');

  }

  closePopUp(popupName){
    this.commonMethod.closePopup(popupName);
  }

  goToPage(page) {
    this.router.navigateByUrl('/' + page);
  }

  cardSelectAccount(cardValue) {
    this.cardSelectionSection = cardValue
  }

  selectedAccount(item) {
    this.dataService.accDetails = item;
  }

  goBack() {
    if (this.constant.getIsCordova() == "web") {
      this.router.navigateByUrl('/dashboard');
    }
    else {
      this.router.navigateByUrl('/dashboardMobile');
    }
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
