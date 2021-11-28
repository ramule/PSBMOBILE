import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

declare var createGlobalNavMore : any ;


@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.scss']
})
export class ElectricityComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Electricity',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    createGlobalNavMore();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
