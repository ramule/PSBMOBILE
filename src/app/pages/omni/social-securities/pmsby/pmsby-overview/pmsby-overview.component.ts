import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common'

@Component({
  selector: 'app-pmsby-overview',
  templateUrl: './pmsby-overview.component.html',
  styleUrls: ['./pmsby-overview.component.scss']
})
export class PmsbyOverviewComponent implements OnInit {
  overviewDetails: any;
  constructor(
    private router: Router,
    public DataService: DataService,
    private location : Location,
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('PMSBY Overview');
    this.DataService.setShowThemeObservable(true);
    this.DataService.setShowsideNavObservable(true);
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('OVERVIEW' , this.router.url);
    this.overviewDetails = this.DataService.pmsbyDetailsOverviewObj;
    console.log('overview details: ', this.overviewDetails);

    history.pushState({}, 'pmsby', this.location.prepareExternalUrl('pmsby'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

}
