import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-bill-raise-duration-transaction-details',
  templateUrl: './bill-raise-duration-transaction-details.component.html',
  styleUrls: ['./bill-raise-duration-transaction-details.component.scss']
})
export class BillRaiseDurationTransactionDetailsComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Transaction Details',
    'footertype':'none'
  } 

  constructor( public router : Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }
  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
  
}
