import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';

declare var createGlobalNavMore: any;
declare var window: any;

@Component({
  selector: 'app-refer-friend',
  templateUrl: './refer-friend.component.html',
  styleUrls: ['./refer-friend.component.scss']
})
export class ReferFriendComponent implements OnInit {
  link="";
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'REFER_A_FRIEND',
    'footertype':'none'
  } 
 
  customerName = "NA";
  constructor( private router:Router, public DataService: DataService, private location: Location, private constants: AppConstants, private localStorage : LocalStorageService) { }

  ngOnInit(): void {
    history.pushState({}, "upiDashboard", this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.link = this.DataService.platform.toLowerCase() == "android" ? this.constants.playStoreLink : this.DataService.platform.toLowerCase() == "ios" ? this.constants.appStoreLink : "NA";
    this.DataService.changeMessage(this.headerdata);
    createGlobalNavMore();
  }

  goToPage(routeName){
    if(routeName == "searchContactList") {
      this.DataService.contactPrevURL = this.router.url;
    }
    this.DataService.routeWithNgZone(routeName);
  }
  
  shareLink(){
    window.plugins.socialsharing.share(this.DataService.getAppShareLink());
  }
}
