import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-set-payment-reminder-success',
  templateUrl: './set-payment-reminder-success.component.html',
  styleUrls: ['./set-payment-reminder-success.component.scss']
})
export class SetPaymentReminderSuccessComponent implements OnInit {

  constructor(public DataService: DataService) { }

  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

}
