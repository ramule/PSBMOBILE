import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AppConstants } from '../../../../../app.constant';

@Component({
  selector: 'app-forgot-password-success',
  templateUrl: './forgot-password-success.component.html',
  styleUrls: ['./forgot-password-success.component.scss']
})
export class ForgotPasswordSuccessComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService,  
    public location : Location,
    private constant: AppConstants,
) { }

commonPageComponent = {
  'headerType': 'preloginHeader',
  'sidebarNAv': false,
  'footer': 'innerFooter',
}

ngOnInit(): void {

  var route = this.constant.getPlatform()== 'web'? "login" : "loginMobile"
  history.pushState({}, route, this.location.prepareExternalUrl(route));
  history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  this.DataService.changeMessage(this.commonPageComponent);
}

goToPage(routeName){
  if(routeName == "login"){
    if(this.constant.getPlatform()== 'web'){
      routeName = "login";
    }
    else{
      routeName = "loginMobile";
    }
  }
  this.router.navigateByUrl('/'+routeName);
} 
}
