import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

declare var boxCarousel4: any;


@Component({
  selector: 'app-add-bill-reminder',
  templateUrl: './add-bill-reminder.component.html',
  styleUrls: ['./add-bill-reminder.component.scss']
})
export class AddBillReminderComponent implements OnInit {

  headerdata = {
    'headerType': 'rechargeBillPay',
    'titleName':'Add Bill Reminder',
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
