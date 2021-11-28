import { DataService } from '../../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-international-payment-success',
  templateUrl: './international-payment-success.component.html',
  styleUrls: ['./international-payment-success.component.scss']
})
export class InternationalPaymentSuccessComponent implements OnInit {

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
