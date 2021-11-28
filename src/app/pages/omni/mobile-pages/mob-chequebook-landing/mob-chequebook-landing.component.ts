import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mob-chequebook-landing',
  templateUrl: './mob-chequebook-landing.component.html',
  styleUrls: ['./mob-chequebook-landing.component.scss']
})
export class MobChequebookLandingComponent implements OnInit {

  constructor(
    public dataService : DataService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.dataService.setPageSettings('CHEQUEBOOK');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('CHEQUEBOOK' , this.router.url)
  }

  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
