import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common'

@Component({
  selector: 'app-pmjjby-overview',
  templateUrl: './pmjjby-overview.component.html',
  styleUrls: ['./pmjjby-overview.component.scss']
})
export class PmjjbyOverviewComponent implements OnInit {

  overviewDetails: any;
  constructor(
    private router: Router,
    public DataService: DataService,
    private location : Location,
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('PMJJBY Overview');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('OVERVIEW' , this.router.url);
    this.overviewDetails = this.DataService.pmjjbyDetailsOverviewObj;

    history.pushState({}, 'pmjjby', this.location.prepareExternalUrl('pmjjby'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
   // this.overviewDetails.premiumAmount = this.overviewDetails.premiumAmount+"00"
  }

}
