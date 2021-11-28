import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-apy-authorization',
  templateUrl: './apy-authorization.component.html',
  styleUrls: ['./apy-authorization.component.scss']
})
export class ApyAuthorizationComponent implements OnInit {

  profileDetailsData:any;
  apyPensionDetailsData:any;

  constructor( 
    private router: Router, 
    public DataService: DataService,  
) { }

apyForm : FormGroup ;
@ViewChildren('pmjjbyOTPRow') pmjjbyRows : any;

pmjjbyOtpInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6']

ngOnInit(): void {
  this.DataService.setPageSettings('APY Authorization');
  this.DataService.setShowThemeObservable(true)
  this.DataService.setShowsideNavObservable(true)
  this.DataService.setShowNotificationObservable(true);
  this.DataService.getBreadcrumb('AUTHORIZATION' , this.router.url)
  this.buildForm();

  console.log(this.DataService.profileDetails);
  console.log(this.DataService.apyPensionDetails);
  this.profileDetailsData = this.DataService.profileDetails;
  this.apyPensionDetailsData = this.DataService.apyPensionDetails;
}

buildForm(){
  this.apyForm = new FormGroup({
    otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
  });
}

validateForm(){
  if(this.apyForm.invalid){
    this.apyForm.get('otp1').markAsTouched();
    this.apyForm.get('otp2').markAsTouched();
    this.apyForm.get('otp3').markAsTouched();
    this.apyForm.get('otp4').markAsTouched();
    this.apyForm.get('otp5').markAsTouched();
    this.apyForm.get('otp6').markAsTouched();
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
        this.apyForm.get(this.pmjjbyOtpInput[index])?.setValue("");
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
    return this.pmjjbyRows._results[index].nativeElement;
  }
}

apySubmit(){
  let otpValue;
  if(this.apyForm.valid){
    console.log('in');
    this.DataService.screenType = 'apyOtpAuth';
    // this.goToPage('nomineeSuccess') ;
    otpValue =
    this.apyForm.value.otp1 +
    this.apyForm.value.otp2 +
    this.apyForm.value.otp3 +
    this.apyForm.value.otp4 +
    this.apyForm.value.otp5 +
    this.apyForm.value.otp6  ;

    console.log(otpValue);

    //this.goToPage('apySuccess')
    // var param = this.nomineeAuthorizationService.getSendOTPSessionReq(otpValue);
    // this.submitOtpSession(param);

  } else{
    this.validateForm() ;
  }


}

goToPage(routeName){
  this.router.navigateByUrl('/'+routeName);
} 

}
