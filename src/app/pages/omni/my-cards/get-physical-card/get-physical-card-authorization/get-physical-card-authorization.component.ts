import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-physical-card-authorization',
  templateUrl: './get-physical-card-authorization.component.html',
  styleUrls: ['./get-physical-card-authorization.component.scss']
})
export class GetPhysicalCardAuthorizationComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('Get Physical Card');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

}
