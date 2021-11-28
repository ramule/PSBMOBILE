import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';


@Component({
  selector: 'app-delete-bill-reminder-success',
  templateUrl: './delete-bill-reminder-success.component.html',
  styleUrls: ['./delete-bill-reminder-success.component.scss']
})
export class DeleteBillReminderSuccessComponent implements OnInit {


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
