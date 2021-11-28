import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import {DatePipe, Location} from '@angular/common'
import * as moment from 'moment';

@Component({
  selector: 'app-form-fifteen-gh-success',
  templateUrl: './form-fifteen-gh-success.component.html',
  styleUrls: ['./form-fifteen-gh-success.component.scss']
})
export class FormFifteenGhSuccessComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService,  
    private date : DatePipe
) { }

  ngOnInit(): void {
  this.DataService.setPageSettings('Receipt');
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
}
goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 

}
