import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PluginService } from 'src/app/services/plugin-service';

declare var createGlobalNavMore: any;

@Component({
  selector: 'app-create-upi-success',
  templateUrl: './create-upi-success.component.html',
  styleUrls: ['./create-upi-success.component.scss']
})
export class CreateUpiSuccessComponent implements OnInit {
  
  upiIdDetails : any;
  prevPageUrl: any;

  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  constructor(public dataService: DataService, private translate: TranslatePipe, private location: Location, private router: Router,private pluginService : PluginService) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);

    this.prevPageUrl = this.dataService.prevUrlForCreateVpaSuccess;

    history.pushState({}, this.prevPageUrl, this.location.prepareExternalUrl(this.prevPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.upiIdDetails = this.dataService.upiIdDetails ? this.dataService.upiIdDetails : {};
    console.log('this.upiIdDetails', this.upiIdDetails);
    
    //TODO: show appropriate error message depending on API response
    console.log('regMobileAPIResponse => ', this.dataService.regMobileAPIResponse);
    console.log("Success Coming from = ", this.dataService.previousPageUrl);
    if(this.dataService.previousPageUrl == "createUpi") {
      this.pluginService.playUPIMogoSuccessTone(true);
    }
  }

  goToNextScreen() {
    console.log("goToNextScreen======>"+this.dataService.previousPageUrl);
    this.dataService.fromOmniLogin = false;
    if(this.dataService.previousPageUrl == "createUpi") {
      this.dataService.routeWithNgZone(this.dataService.prevUrlForCreateVpaSuccess);
    } else {
      // this.router.navigateByUrl('/upiDashboard');
      this.dataService.isVpaZero = false;
      this.dataService.routeWithNgZone('upiDashboard');
    }
  }
}
