import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-remove-account-success',
  templateUrl: './remove-account-success.component.html',
  styleUrls: ['./remove-account-success.component.scss']
})
export class RemoveAccountSuccessComponent implements OnInit {
  accountDetails: any; 
  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 

  constructor(private dataService: DataService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    this.accountDetails = this.dataService.deletedAccountDetails;
    this.accountDetails.txnTime = moment(this.accountDetails.txnTime).format('DD MMM yyyy, hh:mm:ss a');
    if(this.accountDetails.accType == 'SOD' || this.accountDetails.accType == 'UOD') {
      this.accountDetails.actualAccType = 'Overdraft';
    } else {
      this.accountDetails.actualAccType = this.accountDetails.accType;
    }
    console.log("accountDetails = ", this.accountDetails);
    history.pushState({}, 'manageAccounts', this.location.prepareExternalUrl("manageAccounts"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  goBack() {
    this.dataService.isSetVpaDtl = true;
    // this.dataService.vpaDtls = this.selectedVpaDetails;
    this.dataService.routeWithNgZone("manageAccounts");
  }

}
