import { Component, OnInit } from '@angular/core';import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
declare var homeElectricity: any;

@Component({
  selector: 'app-home-electricity-bill-payment',
  templateUrl: './home-electricity-bill-payment.component.html',
  styleUrls: ['./home-electricity-bill-payment.component.scss']
})
export class HomeElectricityBillPaymentComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Home Electricity',
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
