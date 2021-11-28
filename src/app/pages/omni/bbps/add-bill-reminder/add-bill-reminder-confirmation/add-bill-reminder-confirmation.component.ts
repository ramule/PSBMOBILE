import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-add-bill-reminder-confirmation',
  templateUrl: './add-bill-reminder-confirmation.component.html',
  styleUrls: ['./add-bill-reminder-confirmation.component.scss']
})
export class AddBillReminderConfirmationComponent implements OnInit {

  constructor( private router:Router, public DataService: DataService) { }


  ngOnInit(): void {
    this.DataService.setPageSettings('CONFIRMATION');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('CONFIRMATION' , this.router.url)
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
