import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';


@Component({
  selector: 'app-generate-pin-authorization',
  templateUrl: './generate-pin-authorization.component.html',
  styleUrls: ['./generate-pin-authorization.component.scss']
})
export class GeneratePinAuthorizationComponent implements OnInit {

  constructor(    
    private router: Router, 
    public DataService: DataService,  
    private commonMethod : CommonMethods,) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('Generate Pin');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
  }

    
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
