import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';

import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-close-details',
  templateUrl: './loan-close-details.component.html',
  styleUrls: ['./loan-close-details.component.scss']
})
export class LoanCloseDetailsComponent implements OnInit {
  showListAccount: boolean = true;
  totalAvailableBalance: boolean = false;
  selectionValue: any = 'miniStatement';

  constructor( 
    private router: Router, 
    public DataService: DataService,  
    private commonMethod : CommonMethods,
) { }

ngOnInit(): void {
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true)

  this.DataService.getBreadcrumb('TRACK_CARD_APPLICATION' , this.router.url)
  var width = $(window).width()

  if(width < 767){
    this.showListAccount = true ;
   }
  this.DataService.setPageSettings('TRACK_CARD_APPLICATION');
}

   openSelectedAccountList(value) {
    this.selectionValue = value;
  }

  listExpander(value) {
    switch (value) {
      case 'list':
        this.showListAccount = !this.showListAccount  ;
        break;

      case 'balanceList':
        this.totalAvailableBalance = !this.totalAvailableBalance
        break;
    }

  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
  openPopup(popUpName) {

    switch (popUpName) {
      case 'lienEnquiry':
        this.commonMethod.openPopup('div.lien-enquiry-popup');
        break;
      case 'balanceEnquiry':
        this.commonMethod.openPopup('div.balance-popup');
        break;
      case 'interestCertificate':
        this.commonMethod.openPopup('div.interest-popup');
        break;
    }

  }

  
  closePopUp() {
    this.commonMethod.closeAllPopup();
  }

}

