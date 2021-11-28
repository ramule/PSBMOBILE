import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { OtpSessionService } from '../../../otp-session/otp-session.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import {DatePipe, Location} from '@angular/common';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { StandingInstructionAuthService } from './standing-instruction-auth.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Subscription, timer } from 'rxjs';

declare var showToastMessage : any

@Component({
  selector: 'app-standing-instruction-overview',
  templateUrl: './standing-instruction-overview.component.html',
  styleUrls: ['./standing-instruction-overview.component.scss']
})
export class StandingInstructionOverviewComponent implements OnInit {
  type = "password";
  standingInstructionDtl:any;
  tempDecryptedReq: any;
  dateOfBirth : any ;
  counter = 120;
  tick = 1000;
  countDown: Subscription;
  mobNumber : any ;

  constructor( 
    private router:Router, 
    public dataService: DataService,
    public otpSessionService : OtpSessionService,
    public http : HttpRestApiService,
    public storage : LocalStorageService,
    public constant : AppConstants,
    private date : DatePipe,
    private encryptDecryptService: EncryptDecryptService,
    private standingInstructionAuthService : StandingInstructionAuthService,
    public commonMethod:CommonMethods,

    ) { }

  tpinForm : FormGroup;
  invalidOtp: boolean = false;
  serviceNameType : any ;
  serviceName : any ;
  @ViewChildren('sTpin') sTpin: any;

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.type = this.dataService.isCordovaAvailable ? 'tel' : 'password'
    this.mobNumber = this.commonMethod.maskMobileNumber(this.storage.getLocalStorage(this.constant.storage_mobileNo));
    this.dataService.getBreadcrumb('OVERVIEW' , this.router.url)
    this.dataService.setPageSettings('Standing Instruction');
    this.standingInstructionDtl = this.dataService.standingInstructionDtl ;
    console.log("standingInstructionDtl :: ", this.standingInstructionDtl)
    console.log("delete standing instruction : : ",  this.dataService.standingInstructionDelete )

    this.screenTypeValue() ;
    this.resendOTP(1);
    this.buildForm();
  
  }

  screenTypeValue(){
    switch (this.dataService.screenType){
      case 'modifyStandingInstruction' : 
        this.serviceNameType = this.constant.val_MODIFYSTANDINGINSTRUCTIONS
        this.serviceName = this.constant.serviceName_MODIFYSTANDINGINSTRUCTIONS
      break ;

      case 'addStandingInstruction' :
        this.serviceNameType = this.constant.val_ADDSTANDINGINSTRUCTION
        this.serviceName = this.constant.serviceName_ADDSTANDINGINSTRUCTION
      break ;

      case 'deleteStandingInstruction' :
        this.serviceNameType = this.constant.val_DELETESTANDINGINSTRUCTION
        this.serviceName = this.constant.serviceName_DELETESTANDINGINSTRUCTION;
      break ;


    }
  }
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

  tpinConfirm(){
    var otpValue;
    this.validateForm();
    if (this.tpinForm.valid) {
      otpValue = this.tpinForm.value.tpin1 + this.tpinForm.value.tpin2 + this.tpinForm.value.tpin3 + this.tpinForm.value.tpin4 + this.tpinForm.value.tpin5 + this.tpinForm.value.tpin6;
      var param = this.standingInstructionAuthService.getSendOTPSessionReq(otpValue);
      console.log(param);
      this.submitOtpSession(param);
    }
  }

  submitTpin(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.serviceName).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.goToPage('standingInstructionSuccess');
      } else    {
        this.errorCallBack(data.subActionId, resp);
      }
      
    });
  }

  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }
  /**
   * OTP form build
   */
   buildForm() {
    this.tpinForm = new FormGroup({
      tpin1: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      tpin2: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      tpin3: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      tpin4: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      tpin5: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      tpin6: new FormControl('', [ Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    });
  }

  /**
   * Validate Form
   */
  validateForm() {
    if (this.tpinForm.invalid) {
      this.tpinForm.get('tpin1').markAsTouched();
      this.tpinForm.get('tpin2').markAsTouched();
      this.tpinForm.get('tpin3').markAsTouched();
      this.tpinForm.get('tpin4').markAsTouched();
      this.tpinForm.get('tpin5').markAsTouched();
      this.tpinForm.get('tpin6').markAsTouched();
    }
  }


  onKeyUp(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index).value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1).focus();
      } else {
        this.getSpasswordElement(index).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1).focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      // this.MPINForm.get('upassword1').reset();
      // this.MPINForm.get('upassword2').reset();
      // this.MPINForm.get('upassword3').reset();
      // this.MPINForm.get('upassword4').reset();
      // this.MPINForm.get('upassword5').reset();
      // this.MPINForm.get('upassword6').reset();
      // this.mPinRows._results[0].nativeElement.focus();
      if (event.key != "Unidentified") {
        //this.otpForm.get(this.uFormInput[index]).setValue("");
        this.getSpasswordElement(index - 1).focus();
      }
    }
  }
  
  onFocus(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index) {
    //console.log(this.mPinRows);
    if (index <= 5)
      return this.sTpin._results[index].nativeElement;

  }

  submitOtpSession(param) {
    console.log("this.DataService.request" + this.dataService.request);

    this.tempDecryptedReq = JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), this.dataService.request));
    console.log("si auth ", this.tempDecryptedReq)
    console.log(this.tempDecryptedReq);
    this.tempDecryptedReq.methodName = this.dataService.endPoint.split('/')[1];
    if(this.dataService.otpName == 'OTP')
    this.tempDecryptedReq.value = this.tpinForm.value.tpin1 + this.tpinForm.value.tpin2 +  this.tpinForm.value.tpin3 + this.tpinForm.value.tpin4 + this.tpinForm.value.tpin5 + this.tpinForm.value.tpin6;
    else{
      this.tempDecryptedReq.value =this.encryptDecryptService.createMD5Value(this.tpinForm.value.tpin1 + this.tpinForm.value.tpin2 +  this.tpinForm.value.tpin3 + this.tpinForm.value.tpin4 + this.tpinForm.value.tpin5 + this.tpinForm.value.tpin6); 
      this.tempDecryptedReq.customerID = this.dataService.userDetails.customerId;
    }
    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.dataService.request = encryptData;
    console.log(this.dataService.request);
    
    this.submitReq();
  }


  submitReq(){
    console.log("this.DataService.request" + this.dataService.request);
    this.http.callBankingAPIService(this.dataService.request,this.storage.getLocalStorage(this.constant.storage_deviceId), this.dataService.endPoint).subscribe(data => {
      console.log(data);
      
      switch(data.responseParameter.opstatus){
        case '00' :
          console.log(data);
          this.dataService.siReceiptObj.response = 'Successful';
          this.dataService.siReceiptObj.msg = data.responseParameter.Result;
          this.dataService.siReceiptObj.rrn = data.RRN == "" ? "-" : data.RRN ;
          this.router.navigate(['/standingInstructionSuccess']);
        break ;

        case '11':
          this.invalidOtp = true;
        break ;

        case '12':
           this.dataService.isOTPMaxAttempts = true;
            this.commonMethod.openPopup('div.popup-bottom.otp-attempt-expired');
        break;

        case '03':
          this.dataService.isOTPMaxAttempts = true;
        break;

        default :
          this.dataService.siReceiptObj.response = 'Failed';
          this.dataService.siReceiptObj.msg = data.responseParameter.Result;
          this.dataService.siReceiptObj.rrn = data.RRN == "" ? "-" : data.RRN ;
          this.router.navigate(['/standingInstructionSuccess']);
      }




        // if (data.responseParameter.opstatus == '00') {
        //   console.log(data);
        //   this.dataService.siReceiptObj.response = 'Successful';
        // } else {
        //   this.dataService.siReceiptObj.response = 'Failed';
        // }
  
      
      
  
      })
  }

  resendOTP(numCount?: any) {
    this.invalidOtp = false;
    // this.tpinForm.reset();
    var resendOTPReq = this.standingInstructionAuthService.getResendOTPSessionReq(this.serviceNameType);
    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_RESENDOTPSESSION
      )
      .subscribe((data) => {
        if (data.responseParameter.opstatus == '00') {
          this.startCounter();
          if (numCount == 2)
            showToastMessage(data.responseParameter.Result, 'success');
        }
      });
  }

  startCounter() {
    this.tick = 1000;
    this.counter = 120;
    if (this.countDown && !this.countDown.closed) {
      this.countDown.unsubscribe();
    }
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter == 1) this.countDown.unsubscribe();
      --this.counter;
    });
  }

  closePopup(){
    this.commonMethod.closeAllPopup()
  }


}
