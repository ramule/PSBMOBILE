import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { NomineeAuthorizationService } from 'src/app/pages/omni/nominee/nominee-authorization/nominee-authorization.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { StandingInstructionService } from 'src/app/pages/omni/loans/standing-instruction/add-standing-instruction/standing-instruction.service';
import { DatePipe } from '@angular/common';
declare var showToastMessage : any
@Component({
  selector: 'app-open-rd-account-authorization',
  templateUrl: './open-rd-account-authorization.component.html',
  styleUrls: ['./open-rd-account-authorization.component.scss']
})
export class OpenRdAccountAuthorizationComponent implements OnInit {

  openRDReceiptObj:any;
  counter = 120;
  tick = 1000;
  countDown: Subscription;
  mobNumber: any;
  invalidOtp: boolean = false;
  otpForm : FormGroup ;
  tempDecryptedReq: any;
  @ViewChildren('openFDOTPRow') pmjjbyRows : any;
  otpInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6'];
  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    public commonMethod:CommonMethods,
    private nomineeAuthorizationService : NomineeAuthorizationService,
    private addStandingInstructionService: StandingInstructionService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.DataService.setPageSettings('RD Authorization');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('AUTHORIZATION' , this.router.url);
    this.resendOTP(1);
    this.openRDReceiptObj = this.DataService.openRDReceiptObj;
    console.log('openFDReceiptObj: ', this.DataService.openFDReceiptObj);
    this.mobNumber = this.maskCharacter(this.storage.getLocalStorage(this.constant.storage_mobileNo), 4);

    this.openRDReceiptObj = this.DataService.openRDReceiptObj
  }

  buildForm() {
    this.otpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });
  }

  goToPage(routeName, selTab) {
    this.router.navigateByUrl('/' + routeName, {state: { openDepositTabSelection: selTab }});
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
          this.otpForm.get(this.otpInput[index])?.setValue("");
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

  openDepositSubmit() {
    let otpValue;
    if(this.otpForm.valid){
      // this.goToPage('nomineeSuccess') ;
      otpValue =
      this.otpForm.value.otp1 +
      this.otpForm.value.otp2 +
      this.otpForm.value.otp3 +
      this.otpForm.value.otp4 +
      this.otpForm.value.otp5 +
      this.otpForm.value.otp6  ;

      // this.goToPage('pmjjbySuccess')
      var param = this.nomineeAuthorizationService.getSendOTPSessionReq(otpValue);
      this.submitOtpSession(param);

    } else{
      this.validateForm() ;
    }
  }

  submitOtpSession(param) {
    console.log("this.DataService.request" + this.DataService.request);

    this.tempDecryptedReq = JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), this.DataService.request));
    console.log("tempDecryptedReq: ", this.tempDecryptedReq)
    console.log(this.tempDecryptedReq);
    this.tempDecryptedReq.methodName = this.DataService.endPoint.split('/')[1];
    this.tempDecryptedReq.value = this.otpForm.value.otp1 + this.otpForm.value.otp2 +  this.otpForm.value.otp3 + this.otpForm.value.otp4 + this.otpForm.value.otp5 + this.otpForm.value.otp6;
    this.tempDecryptedReq.customerID = this.DataService.userDetails.customerId;

    console.log("FD RD Request params: ",this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.DataService.request = encryptData;
    console.log(this.DataService.request);
    this.submitReq();
  }


  submitReq(){
    console.log("this.DataService.request" + this.DataService.request);
    this.http.callBankingAPIService( this.DataService.request, this.storage.getLocalStorage(this.constant.storage_deviceId),this.DataService.endPoint).subscribe(data => {
      console.log(data);
      this.otpForm.reset();
      switch (data.responseParameter.opstatus) {
        case this.constant.val_InvalidCredentials:
          break;
        case "03":
          this.DataService.isOTPMaxAttempts = true;
          break;
        case "11":
          //invaild otp
          this.invalidOtp = true;
          break;
        case "12":
          //otp attempt expired
          this.DataService.isOTPMaxAttempts = true;
          this.commonMethod.openPopup('div.popup-bottom.otp-attempt-expired');
          break;
        default:
          if (data.responseParameter.opstatus == '00') {
            this.DataService.FDRDAccNumber = data.set.records[0].accountNumber;
            console.log(data);
            this.DataService.receiptType = 'Successful';
            this.DataService.FDRDAccNumber = data.set.records[0].accountNumber;
            this.openRDReceiptObj.interestRate = data.set.records[0].roi
            this.openRDReceiptObj.maturityAmount = data.set.records[0].maturityAmount
            this.openRDReceiptObj.maturityDate = data.set.records[0].maturityDate;
            this.DataService.openFDReceiptObj.interestRate == data.set.records[0].roi;
            this.DataService.openFDReceiptObj.maturityAmount = data.set.records[0].maturityAmount;
            this.DataService.openFDReceiptObj.maturityDate = data.set.records[0].maturityDate;
            this.createStandingInstruction();
          } else {
            this.DataService.FDRDAccNumber = "";
            this.DataService.receiptType = 'Failed';
          }

          this.DataService.receiptmsg = data.responseParameter.Result;
          this.DataService.receipdRefID = data.RRN =="" ? "-" : data.RRN ;
          this.router.navigate(['/openRdAccountSuccessReceipt']);
      }

    })
  }

  createStandingInstruction(){
    var formData = {
      amount : this.DataService.openRDReceiptObj.installmentAmount,
      debitAccount : this.DataService.openRDReceiptObj.debitAccount,
      creditAccount : this.DataService.FDRDAccNumber,
      paymentFrequency :  this.DataService.openRDReceiptObj.paymentFrequency,
      installmentNumber : this.DataService.openRDReceiptObj.tenureMonths,
      datepicker1 : this.getDate(),
      remarks : "Open RD",
    };
    console.log("standing instrunction form data =====> "+formData);
    var param = this.addStandingInstructionService.getStandingInstructionService(formData,'N');
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ADDSTANDINGINSTRUCTION)
    .subscribe((data) => {
      console.log("standing instruction data =====>");
      if (data.responseParameter.opstatus == '00') {

      }
    });

  }

  getDate(){
    var date = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    var dateValue = date.split("-");
    if(dateValue[0] == "29" || dateValue[0] == "30" || dateValue[0] == "31"){
      dateValue[0] = "28"
    }

    if(dateValue[1] == '12'){
      dateValue[2] = ''+ (parseInt(dateValue[2])+1);
    }


    if(dateValue[1] == '12'){
      dateValue[1] = '01';
    }
    else if(parseInt(dateValue[1]) >= 9 && parseInt(dateValue[1]) <= 11){
      dateValue[1] = '' + (parseInt(dateValue[1]) + 1);
    }
    else{
      dateValue[1] = '0' + (parseInt(dateValue[1])+1);
    }



    return (dateValue[0]+"-"+dateValue[1]+"-"+dateValue[2])


  }

  resendOTP(numCount?: any) {
    this.invalidOtp = false;
    this.otpForm.reset();
    var resendOTPReq = this.nomineeAuthorizationService.getResendOTPSessionReq(this.constant.val_OPENRD);
    this.http.callBankingAPIService(resendOTPReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_RESENDOTPSESSION)
    .subscribe((data) => {
      if (data.responseParameter.opstatus == '00') {
        this.startCounter();
        if (numCount == 2) {
          showToastMessage(data.responseParameter.Result, 'success');
        }
      }
    });
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
      // mask then add remaining string
    return ('' + str).slice(0, -n).replace(/./g, "*")+ ('' + str).slice(-n);
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

  closePopup(popup){
    this.commonMethod.closePopup(popup);
    this.router.navigateByUrl('/openDeposit');
  }

}
