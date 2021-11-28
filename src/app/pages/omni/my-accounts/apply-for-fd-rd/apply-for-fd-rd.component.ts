import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-for-fd-rd',
  templateUrl: './apply-for-fd-rd.component.html',
  styleUrls: ['./apply-for-fd-rd.component.scss']
})
export class ApplyForFdRdComponent implements OnInit {

  constructor( private router:Router, public dataService: DataService) { }


  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.setPageSettings('Apply FOR FD and RD');
  }

  goToPage(routeName, selTab){
    this.router.navigateByUrl('/'+routeName, {state: { openDepositTabSelection: selTab }});
  }


}
