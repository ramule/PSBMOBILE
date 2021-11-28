import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../services/data.service';
import { AppConstants } from '../../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';


@Component({
  selector: 'app-nre-deposite',
  templateUrl: './nre-deposite.component.html',
  styleUrls: ['./nre-deposite.component.scss']
})
export class NreDepositeComponent implements OnInit {

  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethod: CommonMethods,
    private http: HttpRestApiService
  ) { }

  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.setPageSettings('NRE DEPOSITE');
    this.DataService.getBreadcrumb('NRE DEPOSITE' , this.router.url)
  }

  goToPage(routeName){
    this.router.navigateByUrl('/' + routeName);
  }

}
