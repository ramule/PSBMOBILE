import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-physical-card-success',
  templateUrl: './get-physical-card-success.component.html',
  styleUrls: ['./get-physical-card-success.component.scss']
})
export class GetPhysicalCardSuccessComponent implements OnInit {


  constructor(
    private router: Router,
    public DataService: DataService,
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('RECEIPT');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }
}
