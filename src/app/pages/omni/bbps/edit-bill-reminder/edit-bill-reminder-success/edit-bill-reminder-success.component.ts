import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';


@Component({
  selector: 'app-edit-bill-reminder-success',
  templateUrl: './edit-bill-reminder-success.component.html',
  styleUrls: ['./edit-bill-reminder-success.component.scss']
})
export class EditBillReminderSuccessComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('RECEIPT');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('RECEIPT', this.router.url)
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }
}
