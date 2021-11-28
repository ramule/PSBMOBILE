import { InwardChequeInquiryService } from './inward-cheque-inquiry.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';

import { DatePipe } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { Location } from '@angular/common'
declare var showToastMessage: any;
import * as moment from 'moment';
import { param } from 'jquery';
import { CommonMethods } from 'src/app/utilities/common-methods';


@Component({
  selector: 'app-inward-cheque-inquiry',
  templateUrl: './inward-cheque-inquiry.component.html',
  styleUrls: ['./inward-cheque-inquiry.component.scss']
})
export class InwardChequeInquiryComponent implements OnInit {

  inwardChequeInquiryForm: FormGroup;
  chNum: boolean = true;
  dateRange: boolean;
  accountNumber: any;
  dateChequeSelection = "date-range";
  cifNumber: any;
  toDate: any;
  currentDate: any = moment().toDate();
  todifference: any;
  inwardchecklist: any;
  tempInwardChequeInquiry: any = "";
  tempInwardcheckList: any = [];
  SchemeCode: any;
  selectedAccount: any;
  selectedAccName: any;
  selAccNo: any;
  platform: any;


  constructor(
    private router: Router,
    public DataService: DataService,
    private inwardChequeInquiryService: InwardChequeInquiryService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private location: Location,
    public commonMethods: CommonMethods
  ) {

  }

  buildForm() {
    this.inwardChequeInquiryForm = new FormGroup({
      selAcc: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      chequeNumber: new FormControl(''),
      accountNo: new FormControl(''),
    },
      // [Validators.required, this.dateRangeValidator]
    );

  }

  ngOnInit(): void {
    this.platform = this.constant.getPlatform()
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('INWARD_CHEQUE_INQUIRY', this.router.url)
    this.DataService.setPageSettings('INWARD_CHEQUE_INQUIRY');
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.buildForm();
    this.accountNumber = this.DataService.customerOperativeAccList
    console.log("account number", this.accountNumber,)
    this.cifNumber = this.DataService.userDetails.cifNumber;

    this.accountNumber = this.DataService.customerOperativeAccList;
    this.accountNumber = this.accountNumber.filter((obj) => (obj.accountType != 'CAPPI' && obj.Status.toLowerCase() == 'active'));
    var fromIndex = this.accountNumber.findIndex(e => e.accountFlag == 'P');
    var element = this.accountNumber[fromIndex];
    this.accountNumber.splice(fromIndex, 1);
    this.accountNumber.splice(0, 0, element);
    this.inwardChequeInquiryForm.patchValue({ selAcc: this.accountNumber[0].accountNo });
    this.inwardChequeInquiryForm.patchValue({ accountNo: this.accountNumber[0].SchemeCode + " " +  this.accountNumber[0].sbAccount });//for mobile
    this.selectedAccount = this.accountNumber[0].accountNo;

  }

  validateForm() {
    // if (this.inwardChequeInquiryForm.invalid) {
    //   this.inwardChequeInquiryForm.get('selAcc').markAsTouched();
    //   if(this.dateChequeSelection == 'date-range'){
    //     this.inwardChequeInquiryForm.get('fromDate').markAsTouched();
    //     this.inwardChequeInquiryForm.get('toDate').markAsTouched();
    //   }
    //   if(this.dateChequeSelection == 'ch-number'){
    //     this.inwardChequeInquiryForm.get('chequeNumber').markAsTouched();
    //   }
    //   return;
    // }
    if (this.inwardChequeInquiryForm.invalid) {
      this.inwardChequeInquiryForm.get('selAcc').markAsTouched();
      this.inwardChequeInquiryForm.get('toDate').markAsTouched();
      this.inwardChequeInquiryForm.get('fromDate').markAsTouched();
      this.inwardChequeInquiryForm.get('chequeNumber').markAsTouched();

    }
  }

  // private dateRangeValidator: ValidatorFn = (): {
  //   [key: string]: any;
  // } | null => {
  //   let invalid = false;
  //   const fromDate = this.inwardChequeInquiryForm && this.inwardChequeInquiryForm.get("fromDate").value;
  //   const toDate = this.inwardChequeInquiryForm && this.inwardChequeInquiryForm.get("toDate").value;
  //   if (fromDate && toDate) {
  //     invalid = new Date(fromDate).valueOf() > new Date(toDate).valueOf();
  //   }
  //   return invalid ? { invalidRange: { fromDate, toDate } } : null;
  // };

  // radioInputChange(e){
  //   console.log(e.target.value);
  //   let val = e.target.value;
  //   if(val == 'date-range'){
  //     this.chNum = false;
  //     this.dateRange = true;
  //   }else{
  //     this.chNum = true;
  //     this.dateRange = false;
  //   }
  // }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  // chequeNumberValidators(){
  //   if(this.dateChequeSelection == 'ch-number'){
  //     this.inwardChequeInquiryForm.get('chequeNumber').setValidators([Validators.required,Validators.minLength(1)]); // 5.Set Required Validator
  //     this.inwardChequeInquiryForm.get('chequeNumber').updateValueAndValidity();
  //   }
  //   else{
  //     this.inwardChequeInquiryForm.get('chequeNumber').clearValidators(); // 5.Set Required Validator
  //     this.inwardChequeInquiryForm.get('chequeNumber').updateValueAndValidity();
  //   }
  // }
  // submit(data){
  //   //  this.chequeNumberValidators()
  //   if (this.inwardChequeInquiryForm.valid  && this.toDate=='-1' ) {
  //   console.log(data);
  //    let tempInwardChequeInquiry ;



  //   tempInwardChequeInquiry={
  //         ["accountNumber"] : this.inwardChequeInquiryForm.value.selAcc,
  //         ["fromDate"] : this.convertDate(this.inwardChequeInquiryForm.value.fromDate),
  //         ["toDate" ]: this.convertDate(this.inwardChequeInquiryForm.value.toDate),
  //         ["chequeNumber"] : this.inwardChequeInquiryForm.value.chequeNumber,
  //         }

  //  console.log("Data :::::",  tempInwardChequeInquiry)


  //     this.serviceCall(tempInwardChequeInquiry);
  //     this.router.navigate(['/inwardChequeInquiryList']);
  //     // this.takeChecknumber();


  //   }
  //   else{
  //     this.validateForm();
  //   }
  // }

  // takeChecknumber(){
  //   this.inwardChequeInquiryForm.value.chequeNumber==this.inwardchecklist.cheque_Number;
  //   console.log("this.inwardChequeInquiryForm.value.chequeNumber;",this.inwardChequeInquiryForm.value.chequeNumber);
  // }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  // serviceCall(inwardChequeInquiryData){

  //   this.inwardChequeChequeApiCall(param);
  // }


  submit() {
    if (this.inwardChequeInquiryForm.valid) {
      this.inwarChequeApiCall();
    }
    else {
      this.validateForm();
    }
  }


  inwarChequeApiCall() {
    let tempInwardChequeInquiry;
    tempInwardChequeInquiry = {
      ["accountNumber"]: this.inwardChequeInquiryForm.value.selAcc,
      ["fromDate"]: this.convertDate(this.inwardChequeInquiryForm.value.fromDate),
      ["toDate"]: this.convertDate(this.inwardChequeInquiryForm.value.toDate),
      ["chequeNumber"]: this.inwardChequeInquiryForm.value.chequeNumber,
    }

    console.log("Data :::::", tempInwardChequeInquiry)
    var param = this.inwardChequeInquiryService.getInwardChequeInquiryParam(tempInwardChequeInquiry);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_INWARDCHEQUEINQUIRY).subscribe(data => {
      console.log(data);



      // this.serviceCall(tempInwardChequeInquiry);

      var resp = data.responseParameter;

      this.inwardchecklist = data.set.records;

      //  this.DataService.inwardchecklistvalue= this.inwardchecklist;
      if (this.inwardChequeInquiryForm.value.chequeNumber == "") {
        this.DataService.inwardchecklistvalue = this.inwardchecklist;
      }
      else {
        this.inwardchecklist.forEach(element => {
          if (this.inwardChequeInquiryForm.value.chequeNumber == element.cheque_Number) {

            this.tempInwardcheckList.push(element);
            this.DataService.inwardchecklistvalue = this.tempInwardcheckList;
          }
        });

      }
      console.log("dataservice inwarcheck::::::", this.DataService.inwardchecklistvalue)
      if (resp.opstatus == "00") {
        if (this.DataService.inwardchecklistvalue.length > 0)
          this.router.navigate(['/inwardChequeInquiryList']);
        else
          showToastMessage('No data to display.', 'success');
        console.log("Response ::", resp)
        // showToastMessage(resp.Result, 'Success');
        // this.stopCheques.reset();
      }
      else {
        // this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  ToDateChange(event) {
    console.log("eventsssssssssssssssss", event);

    var diff = Math.floor(this.inwardChequeInquiryForm.value.fromDate - this.inwardChequeInquiryForm.value.toDate);
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    this.toDate = Math.floor(months / 12);

    console.log("this.toDate: " + this.toDate)
    // if(this.toDate==0)
    // {
    //  alert("please selet right date")
    // }
  }

  fromDateChange(event) {
    console.log("eventsssssssssssssssss", event);

    var diff = Math.floor(this.inwardChequeInquiryForm.value.fromDate - this.inwardChequeInquiryForm.value.toDate);
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    this.toDate = Math.floor(months / 12);

    console.log("this.toDate: " + this.toDate)
    // if(this.toDate==0)
    // {
    //  alert("please selet right date")
    // }
  }

  // fromDateChange(event){
  //   console.log("eventsssssssssssssssss",event);
  //   this.todifference=event

  // }

  onCancel() {
    if (this.constant.getIsCordova() == "web") {
      this.router.navigateByUrl('/dashboard');
    }
    else {
      this.location.back();
    }
  }


  onAccountSelectType() {
    if (window.innerWidth < 767) {
      this.commonMethods.openPopup('div.popup-bottom.sel-account');
    }
  }

  closePopup() {
    this.commonMethods.closePopup('div.popup-bottom.sel-account');
  }


  onFromAccountSelect(accountNumber) {
    this.selectedAccount = "";
    console.log(this.selectedAccount);
    this.selectedAccount = accountNumber;
    this.selectedAccName = this.DataService.userDetails?.customerName;
    this.selAccNo = accountNumber;

    this.SchemeCode = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].SchemeCode;
    var accountNo = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].sbAccount;
    var userDtl = this.SchemeCode +" "+accountNo; 
    this.inwardChequeInquiryForm.patchValue({ accountNo: userDtl });

    this.inwardChequeInquiryForm.patchValue({ selAcc: this.selectedAccount });
  }


}
