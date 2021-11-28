import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { CommonMethods } from '../../../../utilities/common-methods';
import { AppConstants } from 'src/app/app.constant';


@Component({
  selector: 'app-direct-tax-payment-history',
  templateUrl: './direct-tax-payment-history.component.html',
  styleUrls: ['./direct-tax-payment-history.component.scss']
})
export class DirectTaxPaymentHistoryComponent implements OnInit {

  accountList:any;
  totalWorth:any;
  totalWorthMask:any;

  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }

  constructor( private router:Router, public DataService: DataService, public customCurrencyPipe: CustomCurrencyPipe, public commonMethod: CommonMethods,private constant :AppConstants) { }

  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('DIRECT_TAX_PAYMENT_HISTORY' , this.router.url)
    this.DataService.setPageSettings('DIRECT_TAX_PAYMENT_HISTORY');
    this.initialization();
  }

  initialization() {
    // this.buildForm();

    this.accountList = this.DataService.customerOperativeAccList;
    console.log("accountListttttttt:::::::::::",this.accountList);
    let _totalWorth :any = this.DataService.totalMyOperativeBalance + this.DataService.totalMyDepositBalance + this.DataService.totalMyBorrowingsBalance;
    this.totalWorth = this.customCurrencyPipe.transform(_totalWorth.toString().trim(), 'decimal').replace(/(\.[0-9]*?)0+/g, '');
    this.totalWorthMask = this.commonMethod.maskAccNo(this.accountList);
    console.log("totalWorthtttttttt:::::::::::",this.totalWorth);
    console.log("maskkkkkkkktotalWorthtttttttt:::::::::::",this.totalWorth);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  goBack(){
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/dashboardMobile');
    }
  }


}
