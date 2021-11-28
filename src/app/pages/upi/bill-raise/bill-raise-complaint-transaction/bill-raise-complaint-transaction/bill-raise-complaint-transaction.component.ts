import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

declare var billRaiseTransactionComplaint : any ;


@Component({
  selector: 'app-bill-raise-complaint-transaction',
  templateUrl: './bill-raise-complaint-transaction.component.html',
  styleUrls: ['./bill-raise-complaint-transaction.component.scss']
})


export class BillRaiseComplaintTransactionComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Raise Complaint',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    billRaiseTransactionComplaint();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
