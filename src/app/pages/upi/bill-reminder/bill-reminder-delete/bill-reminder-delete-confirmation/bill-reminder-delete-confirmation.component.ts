import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';


@Component({
  selector: 'app-bill-reminder-delete-confirmation',
  templateUrl: './bill-reminder-delete-confirmation.component.html',
  styleUrls: ['./bill-reminder-delete-confirmation.component.scss']
})
export class BillReminderDeleteConfirmationComponent implements OnInit {

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
