import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-apy-overview',
  templateUrl: './apy-overview.component.html',
  styleUrls: ['./apy-overview.component.scss']
})
export class ApyOverviewComponent implements OnInit {

  profileDetailsData:any;
  apyPensionDetailsData:any;
  apyFormData:any;

  constructor( 
    private router: Router, 
    public DataService: DataService,  
    public customCurrencyPipe: CustomCurrencyPipe,
    private formValidation: FormValidationService,
    private location : Location
) { }

ngOnInit(): void {
  this.DataService.setPageSettings('APY Overview');
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('OVERVIEW' , this.router.url);
  this.apyFormData = this.DataService.transactionReceiptObj;
  console.log(this.DataService.profileDetails);
  console.log(this.DataService.apyPensionDetails);
  this.profileDetailsData = this.DataService.profileDetails;
  this.apyPensionDetailsData = this.DataService.apyPensionDetails;
  var backURL = '';
  if(this.DataService.isCordovaAvailable){
    if(this.DataService.socialSecFromDashboard){
      backURL = 'mobSocialLanding';
    }else{
      backURL = 'dashboardMobile';
    }
  }else{
    backURL = 'dashboard';
  }
  history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
  history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 
   /**
   * set update currency value
   * @param value
   */
    // formatCurrency(value, type) {
    //   let amt = this.customCurrencyPipe
    //     .transform(value, 'decimal')
    //     .replace(/[^.0-9]+/g, '');
    //     this.formValidation.formatCurrency(value, this.instaAccountForm);
    // }
}
