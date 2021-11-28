import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-gas-bill-payment-success',
  templateUrl: './gas-bill-payment-success.component.html',
  styleUrls: ['./gas-bill-payment-success.component.scss']
})
export class GasBillPaymentSuccessComponent implements OnInit {

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
