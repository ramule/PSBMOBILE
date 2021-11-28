import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-bill-raise-complaint-assign-confirmation',
  templateUrl: './bill-raise-complaint-assign-confirmation.component.html',
  styleUrls: ['./bill-raise-complaint-assign-confirmation.component.scss']
})
export class BillRaiseComplaintAssignConfirmationComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPayClose',
    'titleName':'Confirmation',
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
