import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { PositivePayService } from './positive-pay.service';
import { AppConstants } from '../../../../../app.constant';
import { DatePipe } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common'
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
declare var showToastMessage: any;
import * as moment from 'moment';


@Component({
  selector: 'app-positive-pay',
  templateUrl: './positive-pay.component.html',
  styleUrls: ['./positive-pay.component.scss']
})
export class PositivePayComponent implements OnInit {

  positivePayForm : FormGroup ;
  accountList:any=[]
  selectedAccount:any=[]
  selectedAccName:any="";
  todayDate: any;
  threeMonthsBackDate: any;
  status:boolean = false;
  selAccNo:any ="";
  SchemeCode:any;
  platform:any;

  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }
  constructor( private router:Router,
    public DataService: DataService,
    public positivePayService:PositivePayService,
    public constant:AppConstants,
    public datepipe:DatePipe,
    private commonMethods:CommonMethods,
    private location: Location,
    private storage : LocalStorageService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    ) { }

  ngOnInit(): void {
    this.platform = this.constant.getPlatform();
    this.DataService.setPageSettings('Positive Pay');
    this.DataService.otpSessionPreviousPage='positivePay'
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.buildForm();
    this.selAccNo = "";
    this.accountList = this.DataService.customerOperativeAccList;
    this.accountList = this.accountList.filter( (obj) =>(obj.accountType!='CAPPI' && obj.Status.toLowerCase()=='active'));
    var fromIndex = this.accountList.findIndex(e => e.accountFlag == 'P');
    var element = this.accountList[fromIndex];
    this.accountList.splice(fromIndex, 1);
    this.accountList.splice(0, 0, element);

    this.positivePayForm.patchValue({ selectAccount : this.accountList[0].accountNo });
    this.positivePayForm.patchValue({ accountNo : this.accountList[0].SchemeCode +" "+ this.accountList[0].sbAccount }); //for mobile
    this.selectedAccount = this.accountList[0].accountNo;
    if(this.DataService.isCordovaAvailable){
      this.onFromAccountSelect(this.selectedAccount)
    }else{
      this.onAccountNoChange(this.selectedAccount);
    }

    //this.todayDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.todayDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    // this.threeMonthsBackDate = this.todayDate.setDate(this.todayDate.getDate() - 1);
    // console.log('three months back date: ', this.threeMonthsBackDate);

    const today = new Date();
    const backdate = new Date();

    this.threeMonthsBackDate =this.datepipe.transform(backdate.setMonth(backdate.getMonth() - 3), 'yyyy-MM-dd');
    console.log('three months back date: ', this.threeMonthsBackDate);

    var backURL = '';
    if(this.DataService.isCordovaAvailable){
      if(this.DataService.quickAccessFromDashboard){
        backURL = 'mobQuickAccessLanding';
      }else{
        backURL = 'dashboardMobile';
      }
    }else{
      backURL = 'dashboard';
    }
    // var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  buildForm(){
    // Validators.pattern("[a-zA-Z ]*$")
    this.positivePayForm = new FormGroup({
      selectAccount: new FormControl('', [Validators.required]),
      payeeName: new FormControl('', [Validators.required]),
      chequeNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.min(1)]),
      amount: new FormControl('', [Validators.required]),
      datepicker1: new FormControl('', [Validators.required]),
      transactionCode: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(3)]),
      micr: new FormControl('', [Validators.required,Validators.minLength(9)]),
      accountNo: new FormControl('')
    },{ validators: Validators.compose([this.validateMICR.bind(this)])});
  }


  validateMICR(formGroup){
    const { value: micr } = formGroup.get('micr');
    console.log('micr',micr);
    let micrNo = micr.slice(3,6)
    return micrNo != '023' ? { invalidmicr: true } : null;
  }

  validateForm(){
    if (this.positivePayForm.invalid) {
      this.positivePayForm.get('selectAccount').markAsTouched();
      this.positivePayForm.get('payeeName').markAsTouched();
      this.positivePayForm.get('chequeNumber').markAsTouched();
      this.positivePayForm.get('amount').markAsTouched();
      this.positivePayForm.get('datepicker1').markAsTouched();
      this.positivePayForm.get('transactionCode').markAsTouched();
      this.positivePayForm.get('micr').markAsTouched();

      return;
    }
  }

  positvePaySubmit(formData){

    formData.datepicker1 = moment(formData.datepicker1).format('DD-MMM-YYYY')
    console.log(formData)
    if(this.positivePayForm.valid && this.status != true){
      this.DataService.resetTransactionObj();

      this.DataService.feedbackType = "positivePay";
     // this.router.navigate(['/positivePayConfirmation'])
     var param = this.positivePayService.getPositivePayParam(formData);
     this.DataService.request = param;
     this.DataService.endPoint = this.constant.serviceName_POSITIVEPAY;
     formData.selectedName = this.selectedAccName != '' ? this.selectedAccName : '-'
     formData.datepicker1 = this.datepipe.transform(formData.datepicker1, this.DataService.dateFormat);
      this.DataService.screenType = "positivePay"
      this.DataService.authorizeHeader = "Positive Pay";

      // else if(this.DataService.activitySettingData[objCheckFlag].TPINALLOWD == 'Y')
      // {
      //   // this.DataService.screenType = "positivePay"
      //   // this.DataService.authorizeHeader = "Positive Pay"
      //   this.router.navigate(['/otpSession']);
      //  this.DataService.otpName = "TPIN"
      // }

    this.DataService.screenType = 'positivePay'
    // this.DataService.postivePayData = formData;
    this.DataService.transactionReceiptObj=formData
    this.DataService.transactionReceiptObj.amount = ((formData.amount).trim().replace(/[^.0-9]+/g, ''))
    this.router.navigateByUrl('/otpSession');
    }
    else{
     this.validateForm();
    }
  }

 /**
   * On account number change this function is invoked
   * @param account
   */
  onAccountNoChange(accountNumber) {
    if (accountNumber != '') {
      this.selectedAccount = this.accountList.find(i => i.accountNo == accountNumber);
      this.selectedAccName = this.DataService.userDetails?.customerName;
      this.selAccNo = accountNumber;
    }
    else{
      this.selAccNo = "";
    }
  }

  goBack(){
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/dashboardMobile');
    }
  }


  checkEnquiry(){
    this.status = false;
    if(this.positivePayForm.value.chequeNumber.length == 6){
      let param = this.positivePayService.getSingleChequeInquiryParam(this.DataService.isCordovaAvailable ?  this.selAccNo : this.selectedAccount.accountNo,this.positivePayForm.value.chequeNumber);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CHEQUESTATUSINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.status = data.set.records[0].status == "UNUSED" ? false : true;
        }
        else {
          this.positivePayForm.patchValue({chequeNumber: ""})
          //this.errorCallBack(data.subActionId, resp);
        }
      })
    }
}

formatCurrency(value) {
  //TODO: this.selectedAccount.currency -- to be added for nir and nro
  this.formValidation.formatCurrency(value, this.positivePayForm);
}

OnInput(evn) {

  var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
  evn = evn.replace(regex, '$1');

  this.positivePayForm.patchValue({
    amount: evn
  })

  // if (Number(this.accBalance) >= Number((evn.trim().replace('₹', '')).replace(/,/g, ''))) {
  //   this.invalidAmount = false
  // } else {
  //   this.invalidAmount = true
  // }

}

  onAccountSelectType(){
    if(window.innerWidth < 767) {
      this.commonMethods.openPopup('div.popup-bottom.sel-account');
    }
  }

  closePopup(){
    this.commonMethods.closePopup('div.popup-bottom.sel-account');
  }


  onFromAccountSelect(accountNumber){
    this.selectedAccount = "";
    console.log(this.selectedAccount);
    this.selectedAccount = accountNumber;
    this.selectedAccName = this.DataService.userDetails?.customerName;
    this.selAccNo = accountNumber;

    this.SchemeCode = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].SchemeCode;
    var accountNo = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].sbAccount;
    var userDtl = this.SchemeCode +" "+accountNo; 
    this.positivePayForm.patchValue({ accountNo: userDtl });
    this.positivePayForm.patchValue({ selectAccount: this.selectedAccount });
  }

}
