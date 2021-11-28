import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
declare var homeElectricity: any;

@Component({
  selector: 'app-gas-bill-payment',
  templateUrl: './gas-bill-payment.component.html',
  styleUrls: ['./gas-bill-payment.component.scss']
})
export class GasBillPaymentComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Gas',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    homeElectricity();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 
}
