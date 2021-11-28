import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../../utilities/common-methods';

@Component({
  selector: 'app-raise-complaint-duration',
  templateUrl: './raise-complaint-duration.component.html',
  styleUrls: ['./raise-complaint-duration.component.scss']
})
export class RaiseComplaintDurationComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }

    ngOnInit(): void {
      this.DataService.setPageSettings('RAISE_COMPLAINT');
      this.DataService.setShowThemeObservable(true)
      this.DataService.setShowsideNavObservable(true)
      this.DataService.setShowNotificationObservable(true)
      this.DataService.getBreadcrumb('RAISE_COMPLAINT', this.router.url)
    }
  
    goToPage(routeName) {
      this.router.navigateByUrl('/' + routeName);
    }
}
