import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mob-tax-landing',
  templateUrl: './mob-tax-landing.component.html',
  styleUrls: ['./mob-tax-landing.component.scss']
})
export class MobTaxLandingComponent implements OnInit {

  constructor(
    public dataService : DataService,
    private commonMethod:CommonMethods,
    private router : Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.dataService.setPageSettings('TAX');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('TAX' , this.router.url)
  }

  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
