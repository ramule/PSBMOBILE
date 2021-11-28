import { Location } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { addresslist } from 'src/app/utilities/app-interface';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-collect-upi-id-list',
  templateUrl: './collect-upi-id-list.component.html',
  styleUrls: ['./collect-upi-id-list.component.scss']
})
export class CollectUpiIdListComponent implements OnInit {
  // vpaAddressList:addresslist[]=[];
  vpaAddressList=[];
  selectedVpa:any;
  headerdata = {
    'headerType': 'TitleCloseHeader',  
    'titleName':'SELECT_ACCOUNT',           
    'footertype':'none', 
  } 
  constructor(private router:Router, public DataService: DataService,private location : Location, private ngZone: NgZone) { }
    

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, this.DataService.backURLCollectVPAList , this.location.prepareExternalUrl(this.DataService.backURLCollectVPAList));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.vpaAddressList = this.DataService.upiCollectVpaList;
  }

  getSelectedAccount(vpaIdx, accountIdx){
    this.ngZone.run(() => {
      this.DataService.upiCollectVpaList.map((vpaAddress,vpaIndex)=>{
        if(vpaIndex == vpaIdx) { 
          vpaAddress.isSelected = true ;
          vpaAddress.accounts.map((accDetails,accIndex)=>{
            accIndex == accountIdx? accDetails.isSelected = true : accDetails.isSelected = false;
            return accDetails;
          })
        }else{
          vpaAddress.isSelected = false;
          vpaAddress.accounts.map((accDetails)=>{
            accDetails.isSelected = false;
            return accDetails;
          })
        } 
        return vpaAddress;
      })  
      this.DataService.routeWithNgZone(this.DataService.backURLCollectVPAList);
    });
  }

}
