import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DatePipe, Location} from '@angular/common'
import * as moment from 'moment';

@Component({
  selector: 'app-nominee-success',
  templateUrl: './nominee-success.component.html',
  styleUrls: ['./nominee-success.component.scss']
})
export class NomineeSuccessComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService,  
    private date : DatePipe,
    private location : Location,
) { }

nomineeReceiptObj : any ;
now = new Date();

ngOnInit(): void {
  this.DataService.setPageSettings('Receipt');
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
  this.nomineeReceiptObj = this.DataService.nomineeReceiptObj
  console.log("RRN NOS :: ", this.nomineeReceiptObj)

// var dateString = moment(this.now).format('DDMMYYYY');
// console.log(dateString) 
var dateString = this.date.transform(this.now, 'd MMMM y ') ;
console.log(dateString) // Output: 2020-07-21
 
var dateStringWithTime = moment(this.now).format('HH:MM:SS');
console.log(dateStringWithTime) // Output: 2020-07-21 07:24:06

  history.pushState({}, "myAccountsInfo", this.location.prepareExternalUrl("myAccountsInfo"));
  history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 

 

}
