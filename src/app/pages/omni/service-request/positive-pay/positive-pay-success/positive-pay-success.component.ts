import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { AppConstants } from 'src/app/app.constant';
import { DatePipe } from '@angular/common';
import { AccountType } from '../../../../../utilities/app-enum';
import { MyAccountInfoService } from '../../../my-accounts/my-accounts-info/my-account-info.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';

@Component({
  selector: 'app-positive-pay-success',
  templateUrl: './positive-pay-success.component.html',
  styleUrls: ['./positive-pay-success.component.scss']
})
export class PositivePaySuccessComponent implements OnInit {
  totalAccountList: any = [];
  todayDateTime: any;
  newcheckbook:any;
  refTransJson: any = [
    {
    'key': 'Reference ID',
    'value': ''
    }
  ];

  receiptPositivePayJson: any = [
    {
    'key': 'Account Number',
    'value': ''
    },
    {
    'key': 'Issuer Name',
    'value': ''
    },
    {
    'key': 'Payee Name',
    'value': ''
    },
    {
    'key': 'Cheque Number',
    'value': ''
    },
    {
    'key': 'Amount',
    'value': ''
    },
    {
    'key': 'Cheque Issuer Date',
    'value': ''
    },
    {
    'key': 'MICR',
    'value': ''
    }
  ];
  positivePayResponseObj:any=""
  constructor( private router:Router,
    public dataService: DataService,
    public commonMethod: CommonMethods,
    public constant: AppConstants,
    private datepipe: DatePipe,
    private myAccountInfoService: MyAccountInfoService,
    private storage: LocalStorageService,
    private http: HttpRestApiService,) { }

  ngOnInit(): void {
    this.dataService.setPageSettings('Success');
    this.todayDateTime = this.datepipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.dataService.setShowThemeObservable(true);
    this.dataService.setShowsideNavObservable(true);
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('RECEIPT' , this.router.url)
    this.totalAccountList = this.dataService.customerOperativeAccList;
    this.refTransJson[0].value = this.dataService.receipdRefID;
    this.positivePayResponseObj = this.dataService.positivePayReceiptObj
    console.log("posistivepayconfirm",this.positivePayResponseObj);

    this.newcheckbook=this.dataService.postivePayData
    console.log("postivePayData", this.dataService.postivePayData)

    
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }
  feedback(){
    this.router.navigate(['/feedback']);
    this.dataService.feedbackType = "positivePay";
  }

  downloadPdfReceipt(type) {
    if(this.positivePayResponseObj.response == this.constant.val_Successful) {
      var imgColor = 'success';
    }
    else {
      imgColor = 'failed';
    }

    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.positivePayResponseObj.accountNo);
    console.log('selected account details : ', selAccDtl);

    this.receiptPositivePayJson[0].value = this.positivePayResponseObj.accountNo ? this.positivePayResponseObj.accountNo : '-';
    this.receiptPositivePayJson[1].value = this.positivePayResponseObj.selectedName ? this.positivePayResponseObj.selectedName : '-';
    this.receiptPositivePayJson[2].value = this.positivePayResponseObj.payee_name ? this.positivePayResponseObj.payee_name : '-';
    this.receiptPositivePayJson[3].value = this.positivePayResponseObj.chequeNo ? this.positivePayResponseObj.chequeNo : '-';
    this.receiptPositivePayJson[4].value = this.positivePayResponseObj.amount ? this.positivePayResponseObj.amount: '-';
    this.receiptPositivePayJson[5].value = this.positivePayResponseObj.date ?  this.datepipe.transform(this.positivePayResponseObj.date, 'dd MMM yyyy') : '-';
    this.receiptPositivePayJson[6].value = this.positivePayResponseObj.micr ? this.positivePayResponseObj.micr : '-';

    var branchJSON =[
      {'key':'Branch Name','value': selAccDtl[0].branch_name},
      {'key':'Branch Code','value': selAccDtl[0].branchCode},
      {'key':'Branch Address','value': selAccDtl[0].BRANCHADDRESS},
      {'key':'Branch Contact','value': selAccDtl[0].phone_number},
      {'key':'IFSC','value': selAccDtl[0].ifscCode},
    ];
    this.commonMethod.generatePDF(imgColor, 'Successful', this.dataService.receiptmsg, this.refTransJson, this.receiptPositivePayJson, 'Positive Pay', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

  }

  shareDetails(){
    this.shareViaMail();
  }
  /**
   * share details via mail in desktop
   */
   shareViaMail() {
    let details = this.getValuesToSend();
    window.open('mailto:?subject=Receipt&body=' + details);
  }

  getValuesToSend() {
    let selectedFields = "";

    selectedFields += "Account Number :" + this.positivePayResponseObj.accountNo + ", ";
    selectedFields += "Issuer Name :" + this.positivePayResponseObj.selectedName + ", ";
    selectedFields += "Payee Name :" + this.positivePayResponseObj.payee_name + ", ";
    selectedFields += "Cheque Name :" + this.positivePayResponseObj.chequeNo + ", ";
    selectedFields += "Amount :" + this.positivePayResponseObj.amount + ", ";
    selectedFields += "Issued Date :" + this.positivePayResponseObj.date + ", ";
    selectedFields += "MICR :" + this.positivePayResponseObj.micr + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

  goBack(){
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/dashboardMobile');
    }
  }

}
