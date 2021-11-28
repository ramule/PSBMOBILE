import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-bill-reminder-success',
  templateUrl: './add-bill-reminder-success.component.html',
  styleUrls: ['./add-bill-reminder-success.component.scss']
})
export class AddBillReminderSuccessComponent implements OnInit {
  constructor( private router:Router, public DataService: DataService) { }

  ngOnInit(): void {

    this.DataService.setPageSettings('RECEIPT');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
