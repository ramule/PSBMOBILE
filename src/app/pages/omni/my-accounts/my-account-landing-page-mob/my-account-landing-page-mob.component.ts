import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DetailStatementService } from '../detailed-statement/detailed-statement.service';
import { AppConstants } from 'src/app/app.constant';
import { AccountType } from '../../../../utilities/app-enum';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-account-landing-page-mob',
  templateUrl: './my-account-landing-page-mob.component.html',
  styleUrls: ['./my-account-landing-page-mob.component.scss']
})
export class MyAccountLandingPageMobComponent implements OnInit,AfterViewInit {

  operative : boolean = false;
  deposit : boolean = false;
  borrowing : boolean = false;

  myOperativeAccount: any = [];
  totalOperativeAcc: any = '00';
  totalOperativeAmt: any = 0;

  myDepositeAccount: any = [];
  totalDepositeAcc: any = '00';
  totalDepositeAmt: any = 0;

  myBorrowingAccount: any = [];
  totalBorrowingAcc: any = '00';
  totalBorrowingAmt: any = 0;

  constructor(
    public dataService: DataService,
    private commonMethod: CommonMethods,
    private router: Router,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private detailStatementService: DetailStatementService,
    private constant: AppConstants,
    private location: Location,
  ) { }


  ngOnInit(): void {
    this.dataService.setPageSettings('My Accounts');
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  ngAfterViewInit(){
    this.getAccountList();
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  openUpSlide(accountType) {
    switch (accountType) {
      case 'operativeAccounts':
        this.operative = !this.operative
        break;

      case 'depositAccounts':
        this.deposit = !this.deposit
        break;

      case 'borrowingsAccounts':
        this.borrowing = !this.borrowing
        break;
    }
  }

  /**
  * function to get all the account list and filter
  *  data with respect to it
  */
   getAccountList(type?:any) {
    let param = this.detailStatementService.getMyAccountList(this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty("set")) {
          this.totalOperativeAmt = 0;
          this.totalDepositeAmt = 0;
          this.totalBorrowingAmt = 0;

          this.totalOperativeAcc = 0;
          this.totalDepositeAcc = 0;
          this.totalBorrowingAcc = 0;

          this.myOperativeAccount = [];
          this.myDepositeAccount = [];
          this.myBorrowingAccount = [];

          data.set.records.forEach(el => {
            if( el.accountType != "CAPPI"){
              switch (el.SchemeCode) {
                case AccountType.SAVING_ACCOUNT:
                  this.myOperativeAccount.push(el);
                  this.totalOperativeAmt = this.totalOperativeAmt + parseFloat(el.acctBalance);
                  break;
                case AccountType.CURRENT_ACCOUNT:
                  this.myOperativeAccount.push(el);
                  this.totalOperativeAmt = this.totalOperativeAmt + parseFloat(el.acctBalance);
                  break;
                case AccountType.OVER_DRAFT_ACCOUNT:
                  this.myOperativeAccount.push(el);
                  this.totalOperativeAmt = this.totalOperativeAmt + parseFloat(el.acctBalance);
                  break;
                case AccountType.CASH_CREDIT:
                  this.myOperativeAccount.push(el);
                  this.totalOperativeAmt = this.totalOperativeAmt + parseFloat(el.acctBalance);
                  break;
                case AccountType.FIXED_DEPOSITE_ACCOUNT:
                  this.myDepositeAccount.push(el);
                  this.totalDepositeAmt = this.totalDepositeAmt + parseFloat(el.acctBalance);
                  break;
                case AccountType.RECURRING_DEPOSITE_ACCOUNT:
                  this.myDepositeAccount.push(el);
                  this.totalDepositeAmt = this.totalDepositeAmt + parseFloat(el.acctBalance);
                  break;
                case AccountType.LOAN_ACCOUNT:
                  this.myBorrowingAccount.push(el);
                  this.totalBorrowingAmt = this.totalBorrowingAmt + parseFloat(el.acctBalance);
                  break;
                case AccountType.DEMAND_DRAFT :
                  this.myBorrowingAccount.push(el);
                  this.totalBorrowingAmt = this.totalBorrowingAmt + parseFloat(el.acctBalance);
                  break;
              }
            }
          });

          this.totalOperativeAcc = this.myOperativeAccount.length < 10 ? '0' + this.myOperativeAccount.length : this.myOperativeAccount.length;
          this.totalDepositeAcc = this.myDepositeAccount.length < 10 ? '0' + this.myDepositeAccount.length : this.myDepositeAccount.length;
          this.totalBorrowingAcc = this.myBorrowingAccount.length < 10 ? '0' + this.myBorrowingAccount.length : this.myBorrowingAccount.length;
        }
      }
      else {

      }
    });
  }


  selectedAccount(item,type){
    this.dataService.accDetails = item;
    switch(type){
      case 'Operative':
        if(item.Status.toLowerCase()=="active"){
          this.dataService.accTypeSelected = "Operative"
          this.goToPage('myAccountsInfo');
        }
        else{
          this.commonMethod.openPopup('div.popup-bottom.inactive-account');
        }
        break;
      case 'Deposits':
        this.dataService.accTypeSelected = "Deposits";
        if(item.accountNo.slice(4, 6) == "14"){ 
          this.dataService.subAccTypeSelected = 'fixedDeposit' ;
        }
        else if(item.accountNo.slice(4, 6) == "15"){
          this.dataService.subAccTypeSelected = 'recurringDeposit' ;

        }
        this.goToPage('myAccountsInfo');
        break;
      case 'Borrowings':
        this.dataService.loanDetails = item;
        this.dataService.accTypeSelected = "Loans"
        this.goToPage('loanDetails');
        break;
    }

    

  }


  closePopUp(popup){
    this.commonMethod.closePopup(popup);
  }

}
