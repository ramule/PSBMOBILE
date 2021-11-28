import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-delete-upi-id-success',
  templateUrl: './delete-upi-id-success.component.html',
  styleUrls: ['./delete-upi-id-success.component.scss']
})
export class DeleteUpiIdSuccessComponent implements OnInit {
  
  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 
  successResponse:any;
  constructor(public DataService: DataService,
    private router : Router,
    private location : Location,
    translate: TranslatePipe) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'myProfile', this.location.prepareExternalUrl("myProfile"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.successResponse = this.DataService.deleteVpaObj;
    this.successResponse.responseParameter.txnTime = moment(this.successResponse.responseParameter.txnTime).format('DD MMM yyyy, hh:mm:ss a');
  }

  back(){
    // this.location.back();
    this.DataService.routeWithNgZone('myProfile');
  }
}
