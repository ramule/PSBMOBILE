import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

declare var electricityPay : any ;

@Component({
  selector: 'app-electricity-pay-bill',
  templateUrl: './electricity-pay-bill.component.html',
  styleUrls: ['./electricity-pay-bill.component.scss']
})
export class ElectricityPayBillComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Electricity',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    electricityPay();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
