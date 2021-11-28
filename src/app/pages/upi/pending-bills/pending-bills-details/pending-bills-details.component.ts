import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-pending-bills-details',
  templateUrl: './pending-bills-details.component.html',
  styleUrls: ['./pending-bills-details.component.scss']
})
export class PendingBillsDetailsComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Mahanagar Gas',
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
