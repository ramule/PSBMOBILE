import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
declare var billRaise: any;

@Component({
  selector: 'app-bill-raise-complaint',
  templateUrl: './bill-raise-complaint.component.html',
  styleUrls: ['./bill-raise-complaint.component.scss']
})
export class BillRaiseComplaintComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Raise Complaint',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    billRaise();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
