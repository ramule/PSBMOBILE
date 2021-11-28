import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-apy-success',
  templateUrl: './apy-success.component.html',
  styleUrls: ['./apy-success.component.scss']
})
export class ApySuccessComponent implements OnInit {
  profileDetailsData:any;
  apyPensionDetailsData:any;

  constructor(
    public DataService: DataService,
    public router : Router
  ) { }

  ngOnInit(): void {
    	 
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('RECEIPT' , this.router.url)
    console.log(this.DataService.profileDetails);
  console.log(this.DataService.apyPensionDetails);
  this.profileDetailsData = this.DataService.profileDetails;
  this.apyPensionDetailsData = this.DataService.apyPensionDetails;
  }

}
