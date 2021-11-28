import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-status-receipt',
  templateUrl: './transaction-status-receipt.component.html',
  styleUrls: ['./transaction-status-receipt.component.scss']
})
export class TransactionStatusReceiptComponent implements OnInit {
  impsResp:any;
  constructor( 
    private router: Router, 
    public DataService: DataService,  
) { }


  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
    this.impsResp = this.DataService.impsTransactionReceiptObj
    this.DataService.setPageSettings('RECEIPT');
  }
  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
