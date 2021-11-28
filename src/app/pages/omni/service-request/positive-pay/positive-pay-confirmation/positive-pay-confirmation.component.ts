import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {Location} from '@angular/common'


@Component({
  selector: 'app-positive-pay-confirmation',
  templateUrl: './positive-pay-confirmation.component.html',
  styleUrls: ['./positive-pay-confirmation.component.scss']
})
export class PositivePayConfirmationComponent implements OnInit {

  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }
  formData:any=""
  constructor( private router:Router, public DataService: DataService,public location:Location) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('Confirmation');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true);
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('CONFIRMATION' , this.router.url)
    history.pushState({}, this.DataService.previousPageUrl, this.location.prepareExternalUrl(this.DataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.formData = this.DataService.postivePayData;
    console.log(this.formData)
  }

  goToPage(routeName){
       var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
      if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
        this.DataService.transactionReceiptObj.accountNo = this.formData.selectAccount
        this.DataService.transactionReceiptObj.payee_name = this.formData.payeeName
        this.DataService.transactionReceiptObj.amount = this.formData.amount
        this.DataService.transactionReceiptObj.chequeNo = this.formData.chequeNumber
        this.DataService.transactionReceiptObj.date = this.formData.datepicker1
        this.DataService.transactionReceiptObj.micr = this.formData.micr
        this.DataService.transactionReceiptObj.selectedName = this.formData.selectedName
        this.DataService.screenType = "positivePay"
        this.DataService.authorizeHeader = "Positive Pay"
        this.router.navigateByUrl('/'+routeName);
      }
  }


}
