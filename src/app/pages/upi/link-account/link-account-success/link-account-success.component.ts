import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-link-account-success',
  templateUrl: './link-account-success.component.html',
  styleUrls: ['./link-account-success.component.scss']
})
export class LinkAccountSuccessComponent implements OnInit {
  successResponse:any;
  prevPageUrl: any;

  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  constructor(public DataService: DataService,private router:Router,private location : Location) { }

  ngOnInit(): void {
   this.prevPageUrl = this.DataService.prevUrlForCreateVpaSuccess;

    console.log("Link Account Previous URL  => ", this.prevPageUrl);

    history.pushState({}, this.prevPageUrl, this.location.prepareExternalUrl(this.prevPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    this.successResponse = this.DataService.linkedAccountDetails;
    this.successResponse.responseParameter.txnTime = moment(this.successResponse.responseParameter.txnTime).format('DD MMM yyyy, hh:mm:ss a');
    console.log('this.successResponse');
    console.log(this.successResponse);
  }

  goBack() {
    if(this.prevPageUrl == 'manageAccounts') {
      this.DataService.isSetVpaDtl = true;
      this.DataService.vpaDtls = this.DataService.linkAccSelectedVpaDetails;
    }

    this.DataService.routeWithNgZone(this.prevPageUrl);
  }
}
