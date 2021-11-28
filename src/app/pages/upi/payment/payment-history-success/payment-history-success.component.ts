import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-payment-history-success',
  templateUrl: './payment-history-success.component.html',
  styleUrls: ['./payment-history-success.component.scss']
})
export class PaymentHistorySuccessComponent implements OnInit {

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
