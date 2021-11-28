import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';


@Component({
  selector: 'app-send-money-loan-overview',
  templateUrl: './send-money-loan-overview.component.html',
  styleUrls: ['./send-money-loan-overview.component.scss']
})
export class SendMoneyLoanOverviewComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService,  
) { }

ngOnInit(): void {
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true)

  this.DataService.getBreadcrumb('OVERVIEW' , this.router.url)
  this.DataService.setPageSettings('Send Money Loan');
}

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 
}
