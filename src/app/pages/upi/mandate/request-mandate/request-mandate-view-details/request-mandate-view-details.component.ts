import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-request-mandate-view-details',
  templateUrl: './request-mandate-view-details.component.html',
  styleUrls: ['./request-mandate-view-details.component.scss']
})
export class RequestMandateViewDetailsComponent implements OnInit {

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'VIEW_DETAILS',
    'footertype':'none'
  } 

  constructor( private router:Router, public DataService: DataService,private location : Location) { }

  ngOnInit(): void {
    history.pushState({}, 'upiMandate', this.location.prepareExternalUrl("upiMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 


}
