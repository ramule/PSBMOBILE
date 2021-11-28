import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
declare var boxCarousel4: any;

@Component({
  selector: 'app-recharge-billpay',
  templateUrl: './recharge-billpay.component.html',
  styleUrls: ['./recharge-billpay.component.scss']
})
export class RechargeBillpayComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Recharge & Bill Pay',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    boxCarousel4();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
