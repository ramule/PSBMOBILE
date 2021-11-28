import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-open-rd-account-overview',
  templateUrl: './open-rd-account-overview.component.html',
  styleUrls: ['./open-rd-account-overview.component.scss']
})
export class OpenRdAccountOverviewComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('RD Account Overview');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('OVERVIEW' , this.router.url)
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

}
