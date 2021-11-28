import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Component({
  selector: 'app-raise-complaint-transaction-confirmation',
  templateUrl: './raise-complaint-transaction-confirmation.component.html',
  styleUrls: ['./raise-complaint-transaction-confirmation.component.scss']
})
export class RaiseComplaintTransactionConfirmationComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }

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
