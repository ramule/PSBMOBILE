import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

declare var boxCarousel4: any;



@Component({
  selector: 'app-add-new-register-biller',
  templateUrl: './add-new-register-biller.component.html',
  styleUrls: ['./add-new-register-biller.component.scss']
})
export class AddNewRegisterBillerComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Register Biller',
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
