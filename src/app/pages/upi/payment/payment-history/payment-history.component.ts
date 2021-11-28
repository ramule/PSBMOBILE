import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

declare var paymentHistory: any;

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Payment History',
    'footertype':'none'
  } 

  constructor(private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    paymentHistory();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
}
