import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-bill-raise-complaint-transaction-success',
  templateUrl: './bill-raise-complaint-transaction-success.component.html',
  styleUrls: ['./bill-raise-complaint-transaction-success.component.scss']
})
export class BillRaiseComplaintTransactionSuccessComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  constructor( public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

}
