import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
declare var homeElectricity: any;



@Component({
  selector: 'app-international-payment',
  templateUrl: './international-payment.component.html',
  styleUrls: ['./international-payment.component.scss']
})
export class InternationalPaymentComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'International Payment',
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
