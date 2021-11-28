import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingByPayer } from 'src/app/models/pending-request.model';
import { DataService } from '../../../../services/data.service';
declare var createGlobalNavMore : any;

@Component({
  selector: 'app-pending-request-payer-view-details',
  templateUrl: './pending-request-payer-view-details.component.html',
  styleUrls: ['./pending-request-payer-view-details.component.scss']
})

export class PendingRequestPayerViewDetailsComponent implements OnInit {
  pendingByPayer : PendingByPayer;
  defaultVPA:any;
  defaultVPAAccount:any;
  headerdata = {
    'headerType': 'TitleClose',
    'titleName':'VIEW_DETAILS',
    'footertype':'none'
  } 

  constructor(private router:Router, public DataService: DataService,private location : Location) {}

  ngOnInit(): void {
    // alert('2')
    this.DataService.changeMessage(this.headerdata);
    this.pendingByPayer = this.DataService.pendingByPayer;
    history.pushState({}, 'pendingRequestUpi', this.location.prepareExternalUrl("pendingRequestUpi"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    createGlobalNavMore();
    this.getLinkedAccount()
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  getLinkedAccount(){
    if(this.DataService.vpaAddressList.length > 0){
      this.defaultVPA = this.DataService.vpaAddressList.find(vpa=> vpa.default == 'Y');
     this.defaultVPAAccount = this.defaultVPA.accounts.find(account => account.isDefaultAccount == 'Y');
    }
  }

}
