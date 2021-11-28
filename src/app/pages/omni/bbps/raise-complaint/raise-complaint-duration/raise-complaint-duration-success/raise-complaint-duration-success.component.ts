import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../../utilities/common-methods';

@Component({
  selector: 'app-raise-complaint-duration-success',
  templateUrl: './raise-complaint-duration-success.component.html',
  styleUrls: ['./raise-complaint-duration-success.component.scss']
})
export class RaiseComplaintDurationSuccessComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }

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
