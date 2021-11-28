import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-raise-complaint-transaction-duration-success',
  templateUrl: './raise-complaint-transaction-duration-success.component.html',
  styleUrls: ['./raise-complaint-transaction-duration-success.component.scss']
})
export class RaiseComplaintTransactionDurationSuccessComponent implements OnInit {

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
