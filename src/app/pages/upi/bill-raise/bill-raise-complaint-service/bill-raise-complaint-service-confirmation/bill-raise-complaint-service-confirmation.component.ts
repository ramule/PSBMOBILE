import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-bill-raise-complaint-service-confirmation',
  templateUrl: './bill-raise-complaint-service-confirmation.component.html',
  styleUrls: ['./bill-raise-complaint-service-confirmation.component.scss']
})
export class BillRaiseComplaintServiceConfirmationComponent implements OnInit {

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
