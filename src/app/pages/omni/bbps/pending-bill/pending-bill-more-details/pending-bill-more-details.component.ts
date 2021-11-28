import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Component({
  selector: 'app-pending-bill-more-details',
  templateUrl: './pending-bill-more-details.component.html',
  styleUrls: ['./pending-bill-more-details.component.scss']
})
export class PendingBillMoreDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }


  ngOnInit(): void {
    this.DataService.setPageSettings('PENDING_BILL_REMINDER');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('PENDING_BILL_REMINDER' , this.router.url)
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
}
