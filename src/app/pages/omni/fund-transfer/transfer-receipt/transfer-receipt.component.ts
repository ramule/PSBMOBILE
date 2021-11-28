import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transfer-receipt',
  templateUrl: './transfer-receipt.component.html',
  styleUrls: ['./transfer-receipt.component.scss']
})
export class TransferReceiptComponent implements OnInit {
  receiptType:any;
  receiptResp:any;
  constructor(public dataService: DataService, private router : Router) { }

  ngOnInit() {
    this.initialize()
  }

  initialize(){
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('RECEIPT' , this.router.url)
    this.receiptType = this.dataService.transactionReceiptObj.receiptType;
    this.receiptResp = this.dataService.transactionReceiptObj;
    this.dataService.setPageSettings('RECEIPT');
  }

}
