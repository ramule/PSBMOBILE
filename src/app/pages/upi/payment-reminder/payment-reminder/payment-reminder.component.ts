import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-payment-reminder',
  templateUrl: './payment-reminder.component.html',
  styleUrls: ['./payment-reminder.component.scss']
})
export class PaymentReminderComponent implements OnInit {

  constructor(
    public DataService: DataService,
    private router : Router
  ) { }

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Payment Reminder',
    'footertype': 'none'
  }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
}
