import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-set-payment-reminder-confirmation',
  templateUrl: './set-payment-reminder-confirmation.component.html',
  styleUrls: ['./set-payment-reminder-confirmation.component.scss']
})
export class SetPaymentReminderConfirmationComponent implements OnInit {

  constructor(
    public DataService: DataService,
    private router : Router
  ) { }

  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'Confirmation',
    'footertype': 'none'
  }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
