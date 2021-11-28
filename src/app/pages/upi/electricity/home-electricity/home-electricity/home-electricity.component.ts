import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-home-electricity',
  templateUrl: './home-electricity.component.html',
  styleUrls: ['./home-electricity.component.scss']
})
export class HomeElectricityComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Home Electricity',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 


}
