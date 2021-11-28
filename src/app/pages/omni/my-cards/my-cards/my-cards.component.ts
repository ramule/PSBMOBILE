import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DetailStatementService } from '../../my-accounts/detailed-statement/detailed-statement.service';
import { Location } from '@angular/common';

declare var showToastMessage: any;

@Component({
  selector: 'app-cardspage',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent implements OnInit {

  isActive:boolean = true;
  isActiveCurrent:boolean = false;
  isDeposite:boolean = false;
  mySavingAccount:any=[];
  totalSavAcc:any = '00';
  totalSavAmt:any = 0;
  myCurrentAccount:any=[];
  totalCurrentAcc:any = '00';
  totalCurrentAmt:any = 0;
  myDepositeAccount:any=[];
  totalDepositeAcc:any = '00';
  totalDepositeAmt:any = 0;
  accountCarouselOptions: OwlOptions;
  totalSavingAmt:any;
  activeTab="saving";

  constructor(
    public dataService : DataService,
    private commonMethod:CommonMethods,
    private router : Router,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private detailStatementService: DetailStatementService,
    private constant: AppConstants,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('MY_CARDS' , this.router.url)
    this.initialize();
  }


   /**
   * filter and load data at the time of intialization
   */
  initialize(){
    //console.log(this.dataService.customerAccountList);
    this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    // this.dataService.customerAccountList.forEach(el => {
    //   if(el.accountCategory == "SAVING" ){
    //     this.mySavingAccount.push(el);
    //   }
    //   else if(el.accountCategory == "CURRENT"){
    //     this.myCurrentAccount.push(el);
    //   }
    //   else if(el.accountCategory == "FIXED DEPOSIT" || el.accountCategory == "RECURRING DEPOSIT" || el.accountCategory == "TERM DEPOSIT"){
    //     this.myDepositeAccount.push(el);
    //   }
    // });

    this.dataService.setPageSettings('MY_ACCOUNTS');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    // this.mySavingAccount.forEach(el => {
    //   el.maskLedgerBalance = this.commonMethod.maskBalance(el.LedgerBalance);
    //   el.maskAvlBalance = this.commonMethod.maskBalance(el.sbBalance);
    // });
    // this.myCurrentAccount.forEach(el => {
    //   el.maskLedgerBalance = this.commonMethod.maskBalance(el.LedgerBalance);
    //   el.maskAvlBalance = this.commonMethod.maskBalance(el.sbBalance);
    // });

    // this.myDepositeAccount.forEach(el => {
    //   el.maskCurrentBalance = el.sbBalance != undefined && el.sbBalance != null && el.sbBalance != "" ? this.commonMethod.maskBalance(el.sbBalance) : "";
    //   el.maskMaturityBalance = el.maturityAmount != undefined && el.maturityAmount != null && el.maturityAmount != "" ? this.commonMethod.maskBalance(el.maturityAmount) : "";
    //   console.log(typeof (el.depositStartDate));
    //   if(el.depositStartDate != undefined && typeof (el.depositStartDate) == "string" && el.depositStartDate.indexOf("/") != -1){
    //     let depositStartDate = el.depositStartDate;
    //     let _depositStartDate = depositStartDate.split("/");
    //     el.depositStartDate = new Date(_depositStartDate[1],_depositStartDate[2],_depositStartDate[0]);
    //   }

    //   if(el.depositStartDate != undefined && typeof (el.maturityDate) == "string" && el.maturityDate.indexOf("/") != -1){
    //     let maturityDate = el.maturityDate;
    //     let _maturityDate = maturityDate.split("/");
    //     el.maturityDate = new Date(_maturityDate[1],_maturityDate[2],_maturityDate[0]);
    //   }

    //   if(el.accountOpeningDate != undefined && typeof (el.accountOpeningDate) == "string" && el.accountOpeningDate.indexOf("/") != -1){
    //     let accountOpeningDate = el.accountOpeningDate;
    //     let _accountOpeningDate = accountOpeningDate.split("/");
    //     el.accountOpeningDate = new Date(_accountOpeningDate[1],_accountOpeningDate[2],_accountOpeningDate[0]);
    //   }



    // });

    //new design changes
    this.totalSavingAmt = 0;
    this.totalSavingAmt = this.dataService.totalSaving;
    this.totalSavAmt = 0;
    this.totalCurrentAmt = 0;
    this.totalDepositeAmt = 0;
    this.totalSavAcc = 0;
    this.totalCurrentAcc = 0;
    this.totalDepositeAcc = 0;
    this.mySavingAccount = [];
    this.myCurrentAccount = [];
    this.myDepositeAccount = [];


    console.log(this.dataService.customerCanTransferAccountList);
    this.dataService.customerCanTransferAccountList.forEach(el => {
      if(el.accountCategory == "SAVING"){
        this.mySavingAccount.push(el);
        this.totalSavAmt = this.totalSavAmt + parseFloat(el.sbBalance);
      }
      else if(el.accountCategory == "CURRENT"){
        this.myCurrentAccount.push(el);
        this.totalCurrentAmt = this.totalCurrentAmt + parseFloat(el.sbBalance);
      }
      else if(el.accountCategory == "OVER DRAFT"){
        this.myDepositeAccount.push(el);
        this.totalDepositeAmt = this.totalDepositeAmt + parseFloat(el.sbBalance);
      }
    });

    this.totalSavAcc = this.mySavingAccount.length < 10 ? '0' + this.mySavingAccount.length : this.mySavingAccount.length;
    this.totalCurrentAcc = this.myCurrentAccount.length < 10 ? '0' + this.myCurrentAccount.length : this.myCurrentAccount.length;
    this.totalDepositeAcc = this.myDepositeAccount.length < 10 ? '0' + this.myDepositeAccount.length : this.myDepositeAccount.length;

    console.log(this.mySavingAccount);
    console.log(this.myDepositeAccount);
    console.log(this.myCurrentAccount);

  }


  refreshDetails(){
    this.getBalanceEnquiry(this.dataService.customerCanTransferAccountList[0].accountNumber);
  }


  /**
   * This function is called when refresh icon is clicked to check the balance
   * @param customerAccDetails
   * @param index
   */
  getBalanceEnquiry(customerAccDetails) {
    let balEnquiryReq = this.detailStatementService.getBalEnqParam(customerAccDetails);
    this.http.callBankingAPIService(balEnquiryReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEENQUIRY).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      this.dataService.customerCanTransferAccountList = [];
      this.dataService.totalSaving = 0;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        data.set.records.forEach(el => {
          if(el.accountCategory == "SAVING" || el.accountCategory == "CURRENT" || el.accountCategory == "OVER DRAFT"){
            this.dataService.customerCanTransferAccountList.push(el);
            this.dataService.totalSaving = this.dataService.totalSaving + parseFloat(el.sbBalance);
          }
        });
        this.initialize();
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
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


  /**
   * will nativage to account detail page
   * @accountDetails selected account list
   */

  goToAccountDetails(accountDetails,index){
    this.dataService.accDetails = accountDetails;
    this.dataService.accDetails.showBal = false;
    this.dataService.accDetailsIdx = index
    this.dataService.accDetails.maskBalance = this.commonMethod.maskBalance(accountDetails.sbBalance);
    this.router.navigateByUrl('/myAccountDetails');
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


  gotoMyAccount(item){
    console.log(item);
    this.dataService.accDetails = item;
    this.router.navigateByUrl('/myAccountDetails');
  }


  gotoFundTransfer(item){
    this.router.navigateByUrl('/ownBanks');
  }

}
