import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-home-electricity-bill-payment-success',
  templateUrl: './home-electricity-bill-payment-success.component.html',
  styleUrls: ['./home-electricity-bill-payment-success.component.scss']
})
export class HomeElectricityBillPaymentSuccessComponent implements OnInit {

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
