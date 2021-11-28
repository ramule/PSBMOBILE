import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payee-add-success',
  templateUrl: './payee-add-success.component.html',
  styleUrls: ['./payee-add-success.component.scss']
})
export class PayeeAddSuccessComponent implements OnInit {
  receiptType:any;
  receiptResp:any;
  constructor(private dataService:DataService,private router:Router) { }

  ngOnInit(): void {
    this.initialization();
  }

  initialization(){
    this.receiptType = this.dataService.transactionReceiptObj.receiptType;
    this.receiptResp = this.dataService.transactionReceiptObj;
    this.dataService.setPageSettings('RECEIPT');
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
