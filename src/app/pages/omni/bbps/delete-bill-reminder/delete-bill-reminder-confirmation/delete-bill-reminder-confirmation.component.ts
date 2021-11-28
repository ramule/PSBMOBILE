import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';


@Component({
  selector: 'app-delete-bill-reminder-confirmation',
  templateUrl: './delete-bill-reminder-confirmation.component.html',
  styleUrls: ['./delete-bill-reminder-confirmation.component.scss']
})
export class DeleteBillReminderConfirmationComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('CONFIRMATION');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('CONFIRMATION', this.router.url)
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }


}
