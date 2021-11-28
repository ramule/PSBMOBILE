import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mob-service-landing',
  templateUrl: './mob-service-landing.component.html',
  styleUrls: ['./mob-service-landing.component.scss']
})
export class MobServiceLandingComponent implements OnInit {
  constructor(
    public dataService : DataService,
    private commonMethod:CommonMethods,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.dataService.setPageSettings('SERVICE');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('SERVICE' , this.router.url)
  }

  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
