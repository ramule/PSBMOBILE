import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { DataService } from 'src/app/services/data.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { ForgotUsernameService } from '../forgot-username/forgot-username.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-username-success',
  templateUrl: './username-success.component.html',
  styleUrls: ['./username-success.component.scss']
})
export class UsernameSuccessComponent implements OnInit {

  refId:any;
  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/ForgotUsername'
  }

  constructor(private router: Router,

    public loader: pageLoaderService,
    public commonMethod: CommonMethods,
    private constant: AppConstants,
    public  translate: TranslatePipe,
    private location: Location,
    private dataservice: DataService
    ) { }

  ngOnInit(): void
  {
    var route = this.constant.getPlatform()== 'web'? "login" : "loginMobile"
    history.pushState({}, route, this.location.prepareExternalUrl(route));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.refId = this.dataservice.refId;
    this.dataservice.changeMessage(this.commonPageComponent);
  }


  goToLogin(){
    if(this.constant.getPlatform()== 'web'){
      var route = "login";
      this.router.navigateByUrl('/'+route);
    }
    else{
      this.location.back();
    }
  }

}
