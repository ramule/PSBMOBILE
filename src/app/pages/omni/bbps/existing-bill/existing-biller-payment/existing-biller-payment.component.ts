import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Component({
  selector: 'app-existing-biller-payment',
  templateUrl: './existing-biller-payment.component.html',
  styleUrls: ['./existing-biller-payment.component.scss']
})
export class ExistingBillerPaymentComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }

  paymentTypeForm: FormGroup;

  ngOnInit(): void {
    this.DataService.setPageSettings('EXISTING_BILLER_PAYMENT');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('EXISTING_BILLER_PAYMENT', this.router.url)
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  deleteBiller(){
    this.commonMethod.openPopup('div.delete-biller-popup')
  }

  closePopup(){
    this.commonMethod.closeAllPopup() ;
  }

}
