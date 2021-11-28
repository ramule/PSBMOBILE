import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Component({
  selector: 'app-pending-bill-reminder',
  templateUrl: './pending-bill-reminder.component.html',
  styleUrls: ['./pending-bill-reminder.component.scss']
})
export class PendingBillReminderComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods) { }
    pendingbillList:any
  ngOnInit(): void {
    this.DataService.setPageSettings('PENDING_BILL');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('PENDING_BILL' , this.router.url)
    this.pendingbillList = this.DataService.allUnpaidBillerList
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
  moreDetails(item){
    this.DataService.unpaidbilldetail = item
    this.router.navigateByUrl('/unpaidBill');
  }
}
