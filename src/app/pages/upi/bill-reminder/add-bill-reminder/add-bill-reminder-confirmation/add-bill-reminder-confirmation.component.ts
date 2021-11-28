import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-add-bill-reminder-confirmation',
  templateUrl: './add-bill-reminder-confirmation.component.html',
  styleUrls: ['./add-bill-reminder-confirmation.component.scss']
})
export class AddBillReminderConfirmationComponent implements OnInit {

  headerdata = {
    'headerType': 'TitleClose',
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
