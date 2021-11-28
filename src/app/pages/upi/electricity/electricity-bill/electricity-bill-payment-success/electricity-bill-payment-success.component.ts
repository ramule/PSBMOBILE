import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-electricity-bill-payment-success',
  templateUrl: './electricity-bill-payment-success.component.html',
  styleUrls: ['./electricity-bill-payment-success.component.scss']
})
export class ElectricityBillPaymentSuccessComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  constructor(  public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

}
