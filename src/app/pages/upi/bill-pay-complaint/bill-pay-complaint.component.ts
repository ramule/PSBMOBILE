import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

declare var billPayComplaint : any ;

@Component({
  selector: 'app-bill-pay-complaint',
  templateUrl: './bill-pay-complaint.component.html',
  styleUrls: ['./bill-pay-complaint.component.scss']
})
export class BillPayComplaintComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Complaint',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    billPayComplaint();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
