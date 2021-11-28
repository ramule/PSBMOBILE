import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

declare var homeElectricity : any ;


@Component({
  selector: 'app-electricity-bill-payment',
  templateUrl: './electricity-bill-payment.component.html',
  styleUrls: ['./electricity-bill-payment.component.scss']
})
export class ElectricityBillPaymentComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Electricity',
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
