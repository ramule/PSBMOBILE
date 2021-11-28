import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mob-social-landing',
  templateUrl: './mob-social-landing.component.html',
  styleUrls: ['./mob-social-landing.component.scss']
})
export class MobSocialLandingComponent implements OnInit {

  constructor(
    public dataService : DataService,
    private commonMethod:CommonMethods,
    private router : Router,
    private location : Location
  ) { }

  ngOnInit(): void {
    var backURL = this.dataService.isCordovaAvailable ? 'dashboardMobile' : 'dashboard';
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, this.router.url, this.location.prepareExternalUrl(this.router.url));
    this.dataService.setPageSettings('Social Security');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('Social Security' , this.router.url)
  }

  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }


}
