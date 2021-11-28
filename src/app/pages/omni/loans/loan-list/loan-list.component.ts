import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';

declare var loanListScript:any;

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  accountCarouselOptions: OwlOptions;
  activeTab = "home";
  refreshDate:Date;
  constructor(
    public dataService : DataService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.getBreadcrumb('LOAN_LIST' , this.router.url)
    this.dataService.setPageSettings('LOAN_LIST');
    this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();
    loanListScript();
    this.refreshDate = this.dataService.onRefreshDate;
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
