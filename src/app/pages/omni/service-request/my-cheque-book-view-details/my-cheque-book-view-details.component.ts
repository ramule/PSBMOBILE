import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-cheque-book-view-details',
  templateUrl: './my-cheque-book-view-details.component.html',
  styleUrls: ['./my-cheque-book-view-details.component.scss']
})
export class MyChequeBookViewDetailsComponent implements OnInit {

  constructor( private router:Router, public dataService: DataService) { }


  ngOnInit(): void {
    this.dataService.setPageSettings('CHEQUE_BOOK_DETAILS');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('CHEQUE_BOOK_DETAILS' , this.router.url)
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
