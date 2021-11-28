import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';


@Component({
  selector: 'app-send-money-loan-auth',
  templateUrl: './send-money-loan-auth.component.html',
  styleUrls: ['./send-money-loan-auth.component.scss']
})
export class SendMoneyLoanAuthComponent implements OnInit {

  constructor( 
    private router: Router, 
    public DataService: DataService,  
) { }

sendMoneyLoanAuthForm : FormGroup ;

@ViewChildren('sendMoneyOtpRow') sendMoneyOtpRow: any;

aggreePaymentOtp = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6']

ngOnInit(): void {
  this.buildForm() ;
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true)

  this.DataService.getBreadcrumb('SEND_MONEY_LOAN' , this.router.url)
  this.DataService.setPageSettings('SEND_MONEY_LOAN');
}

buildForm(){
  this.sendMoneyLoanAuthForm = new FormGroup({
    otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
  });
}

validateForm(){
  if(this.sendMoneyLoanAuthForm.invalid){
    this.sendMoneyLoanAuthForm.get('otp1').markAsTouched();
    this.sendMoneyLoanAuthForm.get('otp2').markAsTouched();
    this.sendMoneyLoanAuthForm.get('otp3').markAsTouched();
    this.sendMoneyLoanAuthForm.get('otp4').markAsTouched();
    this.sendMoneyLoanAuthForm.get('otp5').markAsTouched();
    this.sendMoneyLoanAuthForm.get('otp6').markAsTouched();
    return;
   }
}
  onKeyUpEvent(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 7) {
        this.getSpasswordElement(index + 1, type).focus();
      } else {
        this.getSpasswordElement(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }


    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'otp') {
          this.sendMoneyLoanAuthForm.get(this.aggreePaymentOtp[index])?.setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }

  }

  onFocusEvent(index: any, type: any) {

    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index: any, type: any) {
    if (type == 'otp') {
      return this.sendMoneyOtpRow._results[index].nativeElement;
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

  sendMoneyLoanAuthSubmit(){
    if(this.sendMoneyLoanAuthForm.valid){
      this.goToPage('sendMoneyLoanReceipt') ;
    } else{
      this.validateForm() ;
    }
  }
}
