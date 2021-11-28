import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from '../../../../../services/data.service';
declare  var  sssCarousel : any



@Component({
  selector: 'app-account-opening-landing',
  templateUrl: './account-opening-landing.component.html',
  styleUrls: ['./account-opening-landing.component.scss']
})
export class AccountOpeningLandingComponent implements OnInit {

  constructor(private router: Router,private constant : AppConstants, public DataService: DataService) { }

  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
  }

  ngOnInit(): void {
    sssCarousel() ;
    this.DataService.changeMessage(this.commonPageComponent);
  }
  routeTo(location){
    console.log('location', location);
    this.router.navigateByUrl(location);
  }


  goBack(){
    if(this.constant.getPlatform() == 'web'){
      this.router.navigateByUrl("/nliLanding");
    }
    else{
      this.router.navigateByUrl("/LandingPage");
    }
    
  }

}
