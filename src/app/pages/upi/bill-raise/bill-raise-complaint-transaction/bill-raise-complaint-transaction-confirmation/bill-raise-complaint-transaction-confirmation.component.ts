import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-bill-raise-complaint-transaction-confirmation',
  templateUrl: './bill-raise-complaint-transaction-confirmation.component.html',
  styleUrls: ['./bill-raise-complaint-transaction-confirmation.component.scss']
})
export class BillRaiseComplaintTransactionConfirmationComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPayClose',
    'titleName':'Confirmation',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
