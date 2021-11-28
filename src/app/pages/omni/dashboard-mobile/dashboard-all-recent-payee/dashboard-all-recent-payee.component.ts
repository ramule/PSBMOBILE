import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../app.constant';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';

@Component({
  selector: 'app-dashboard-all-recent-payee',
  templateUrl: './dashboard-all-recent-payee.component.html',
  styleUrls: ['./dashboard-all-recent-payee.component.scss']
})
export class DashboardAllRecentPayeeComponent implements OnInit {
  searchPayee = '';
  payeeList = [];
  information="";
  payeeDetails:any;
  constructor(private router:Router, public DataService: DataService, private location : Location,private commonMethods : CommonMethods, private constant : AppConstants,) { }

  ngOnInit(): void {
    var headerName = 'RECENT_PAYEE';
    history.pushState({}, this.DataService.previousPageUrl, this.location.prepareExternalUrl(this.DataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.setPageSettings(headerName);
    this.payeeList = this.DataService.omniAllRecentPayeeList;
  }
  
  
  transactiondetails(data){
    console.log(JSON.stringify(data))
    this.DataService.recentTransData = data;
    this.router.navigate(['/sendMoney']);
  }

  
  closePopup(popup) {
    this.commonMethods.closePopup('div.popup-bottom.' + popup)
  }

  openPopup(payee,popup) {
    if(popup == 'fav-popup'){
      this.payeeDetails = payee;
    }
    this.commonMethods.openPopup('div.popup-bottom.' + popup)
  }

}
