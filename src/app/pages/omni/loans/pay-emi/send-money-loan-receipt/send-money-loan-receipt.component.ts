import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';


@Component({
  selector: 'app-send-money-loan-receipt',
  templateUrl: './send-money-loan-receipt.component.html',
  styleUrls: ['./send-money-loan-receipt.component.scss']
})
export class SendMoneyLoanReceiptComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService,  
) { }

ngOnInit(): void {
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true)

  this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
  this.DataService.setPageSettings('RECEIPT');
}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 

}
