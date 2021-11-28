import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-mandate-upi-id-list',
  templateUrl: './mandate-upi-id-list.component.html',
  styleUrls: ['./mandate-upi-id-list.component.scss']
})
export class MandateUpiIdListComponent implements OnInit {
  // vpaAddressList:addresslist[]=[];
  vpaAddressList=[];
  selectedVpa:any;
  headerdata = {
    'headerType': 'TitleCloseHeader',  
    'titleName':'SELECT_ACCOUNT',           
    'footertype':'none', 
  } 
  constructor(private router:Router, public DataService: DataService,private location : Location) { }
    

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, this.DataService.mandateTypeRouteName, this.location.prepareExternalUrl(this.DataService.mandateTypeRouteName));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.vpaAddressList = this.DataService.upiMandateVpaList;
  }

  getSelectedAccount(vpaIdx, accountIdx){
    this.DataService.upiMandateVpaList.map((vpaAddress,vpaIndex)=>{
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
    this.location.back();
  }

}
