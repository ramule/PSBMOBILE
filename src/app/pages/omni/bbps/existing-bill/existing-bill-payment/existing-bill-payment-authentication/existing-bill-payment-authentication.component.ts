import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../../utilities/common-methods';

@Component({
  selector: 'app-existing-bill-payment-authentication',
  templateUrl: './existing-bill-payment-authentication.component.html',
  styleUrls: ['./existing-bill-payment-authentication.component.scss']
})
export class ExistingBillPaymentAuthenticationComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }

    otpFormInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6'] ;

    @ViewChildren('OTPFormRow') otpPinRows: any;

    otpForm : FormGroup ;

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setPageSettings('AUTHENTICATION');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('AUTHENTICATION' , this.router.url)
  }

  buildForm(){
    this.otpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    });
  }
  
  validateForm(){
    if(this.otpForm.invalid){
      this.otpForm.get('otp1').markAsTouched();
      this.otpForm.get('otp2').markAsTouched();
      this.otpForm.get('otp3').markAsTouched();
      this.otpForm.get('otp4').markAsTouched();
      this.otpForm.get('otp5').markAsTouched();
      this.otpForm.get('otp6').markAsTouched();
      return;
     }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  otpSubmit(value){
    if(this.otpForm.valid){
      this.goToPage(value)
    }else{
      this.validateForm() ;
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
          this.otpForm.get(this.otpFormInput[index])?.setValue("");
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
      return this.otpPinRows._results[index].nativeElement;
    }
  }

}
