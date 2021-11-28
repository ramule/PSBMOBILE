import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-raise-complaint-transaction-success',
  templateUrl: './raise-complaint-transaction-success.component.html',
  styleUrls: ['./raise-complaint-transaction-success.component.scss']
})
export class RaiseComplaintTransactionSuccessComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    'titleName': '',
    'footertype': 'none'
  }

  constructor(public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }
}
