import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-biller-view',
  templateUrl: './register-biller-view.component.html',
  styleUrls: ['./register-biller-view.component.scss']
})
export class RegisterBillerViewComponent implements OnInit {

  constructor( private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods) { }
    renderDataList:any;
    renderValue:any
  ngOnInit(): void {
    this.DataService.setPageSettings('REGISTERED_BILLER');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('REGISTERED_BILLER' , this.router.url)
    this.renderDataList =  this.DataService.allregisteredBillerList;
    
    console.log(" this.renderDataList" + JSON.stringify( this.renderDataList))
  }
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
  moreDetails(item){
    this.DataService.unpaidbilldetail = item
    this.router.navigateByUrl('/unpaidBill');
  }
}
