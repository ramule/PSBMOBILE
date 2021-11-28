import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }

  transactionForm: FormGroup;
  durationForm: FormGroup;

  searchOptions = 'transaction'

  ngOnInit(): void {
    this.buildForm();
    this.DataService.setPageSettings('PAYMENT_HISTORY');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('PAYMENT_HISTORY', this.router.url)
  }

  buildForm() {
    this.transactionForm = new FormGroup({
      transactionNumber: new FormControl('', [Validators.required]),
    });
    this.durationForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      boardName: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });
  }

  validateForm(value) {
    switch (value) {
      case 'transaction':
        if (this.transactionForm.invalid) {
          this.transactionForm.get('transactionNumber').markAsTouched();
        }
        break;

      case 'duration':
        if (this.durationForm.invalid) {
          this.durationForm.get('state').markAsTouched();
          this.durationForm.get('boardName').markAsTouched();
          this.durationForm.get('startDate').markAsTouched();
          this.durationForm.get('endDate').markAsTouched();
        }
        break;
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  openFilter() {
    this.commonMethod.openPopup('div.filter1');
  }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  trackFilterSubmit(value) {

    switch (value) {
      case 'transaction':
        this.trackFormValidationAfterSelection() ;
        if (this.transactionForm.valid) {
          this.goToPage('retailPaymentSuccess')
        } else {
          this.validateForm(value)
        }
        break;

      case 'duration':
        this.trackFormValidationAfterSelection() ;
        if (this.durationForm.valid) {
          this.goToPage('retailPaymentSuccess')
        } else {
          this.validateForm(value)
        }
        break;
    }
  }

  reset(){
    if(this.searchOptions == 'duration'){
      this.durationForm.reset() ;
    }else{
      this.transactionForm.reset() ;
    }
  }

  trackFormValidationAfterSelection(){
    if(this.searchOptions == 'duration'){
      this.transactionForm.get('transactionNumber').clearValidators();
      this.durationForm.get('state')?.setValidators([Validators.required]);
      this.durationForm.get('boardName')?.setValidators([Validators.required]);
      this.durationForm.get('startDate')?.setValidators([Validators.required]);
      this.durationForm.get('endDate')?.setValidators([Validators.required]);

      this.transactionForm.get('transactionNumber').updateValueAndValidity();
      this.durationForm.get('state').updateValueAndValidity();
      this.durationForm.get('boardName').updateValueAndValidity();
      this.durationForm.get('startDate').updateValueAndValidity();
      this.durationForm.get('endDate').updateValueAndValidity();

    } else {
      this.transactionForm.get('transactionNumber').setValidators([Validators.required]);
      this.durationForm.get('state')?.clearValidators();
      this.durationForm.get('boardName')?.clearValidators();
      this.durationForm.get('startDate')?.clearValidators();
      this.durationForm.get('endDate')?.clearValidators();

      this.transactionForm.get('transactionNumber').updateValueAndValidity();
      this.durationForm.get('state').updateValueAndValidity();
      this.durationForm.get('boardName').updateValueAndValidity();
      this.durationForm.get('startDate').updateValueAndValidity();
      this.durationForm.get('endDate').updateValueAndValidity();
    }

  }

}
