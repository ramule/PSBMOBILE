import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { AppConstants } from 'src/app/app.constant';
import { DatePipe, Location, getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-stop-cheque-receipt',
  templateUrl: './stop-cheque-receipt.component.html',
  styleUrls: ['./stop-cheque-receipt.component.scss']
})
export class StopChequeReceiptComponent implements OnInit {
  stopChequeReceiptObj: any = "";
  todayDateTime: any;
  totalAccountList: any = [];
  refTransJson: any = [
    {
    'key': 'Reference ID',
    'value': ''
    }
  ];
  receiptStopChequeJson: any = [
    {
      'key': 'Account Number',
      'value': ''
    },
    {
      'key': 'Cheque Number',
      'value': ''
    },
    {
      'key': 'Remarks',
      'value': ''
    }
  ];

  receiptStopBulkChequeJson: any = [
    {
      'key': 'Account Number',
      'value': ''
    },
    {
      'key': 'Remarks',
      'value': ''
    },
    {
      'key': 'From Cheque Number',
      'value': ''
    },
    {
      'key': 'To Cheque Number',
      'value': ''
    }
  ];

  constructor(
    private router:Router,
    public dataService: DataService,
    public commonMethod: CommonMethods,
    public constant: AppConstants,
    private datepipe: DatePipe,
    private location:Location,
    ) { }

  ngOnInit(): void {
    this.dataService.setPageSettings('OTP');
    this.todayDateTime = this.datepipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.dataService.setShowThemeObservable(true);
    this.dataService.setShowsideNavObservable(true);
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('RECEIPT' , this.router.url)
    this.totalAccountList = this.dataService.customerOperativeAccList;
    this.refTransJson[0].value = this.dataService.stopChequeReceiptObj.rrn;
    this.stopChequeReceiptObj = this.dataService.stopChequeReceiptObj;
  }

  goToPage(routeName){
    if(routeName == "dashboard"){
      if(this.constant.getPlatform() == "web"){
        this.router.navigateByUrl('/'+routeName);
      }
      else{
        this.router.navigateByUrl('/dashboardMobile');
      }
    }
    else{
      this.router.navigateByUrl('/'+routeName);
    }
    
  }

  goTofeedback(){
    this.router.navigate(['/feedback']);
    this.dataService.feedbackType = "stopCheque";
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
    selectedFields += "Account Number :" + this.stopChequeReceiptObj.accountNo + ", ";
    selectedFields += "Cheque Number :" + this.stopChequeReceiptObj.chequeNo + ", ";
    selectedFields += "Reason :" + this.stopChequeReceiptObj.remark + ", ";
    return selectedFields.replace(/,\s*$/, "");
  }

  downloadPdfReceipt(type) {
    if(this.stopChequeReceiptObj.response == this.constant.val_Successful) {
      var imgColor = 'success';
    }
    else {
      imgColor = 'failed';
    }

    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.stopChequeReceiptObj.accountNo);
    console.log('selected account details : ', selAccDtl);

    var branchJSON = [
      {'key':'Branch Name','value': selAccDtl[0].branch_name},
      {'key':'Branch Code','value': selAccDtl[0].branchCode},
      {'key':'Branch Address','value': selAccDtl[0].BRANCHADDRESS},
      {'key':'Branch Contact','value': selAccDtl[0].phone_number},
      {'key':'IFSC','value': selAccDtl[0].ifscCode},
    ];

    if(this.dataService.stopChequeReceiptObj.chequeNo != '-') {
      this.receiptStopChequeJson[0].value = this.stopChequeReceiptObj.accountNo ? this.stopChequeReceiptObj.accountNo : '-';
      this.receiptStopChequeJson[1].value = this.stopChequeReceiptObj.chequeNo ? this.stopChequeReceiptObj.chequeNo : '-';
      this.receiptStopChequeJson[2].value = this.stopChequeReceiptObj.remark ? this.stopChequeReceiptObj.remark : '-';
      this.commonMethod.generatePDF(imgColor, 'Successful', this.dataService.receiptmsg, this.refTransJson, this.receiptStopChequeJson, 'Stop Cheque', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
    }
    else {
      this.receiptStopBulkChequeJson[0].value = this.stopChequeReceiptObj.accountNo ? this.stopChequeReceiptObj.accountNo : '-';
      this.receiptStopBulkChequeJson[1].value = this.stopChequeReceiptObj.remark ? this.stopChequeReceiptObj.remark : '-';
      this.receiptStopBulkChequeJson[2].value = this.stopChequeReceiptObj.fromChequeNo ? this.stopChequeReceiptObj.fromChequeNo : '-';
      this.receiptStopBulkChequeJson[3].value = this.stopChequeReceiptObj.toChequeNo ? this.stopChequeReceiptObj.toChequeNo : '-';
      this.commonMethod.generatePDF(imgColor, 'Successful', this.dataService.receiptmsg, this.refTransJson, this.receiptStopBulkChequeJson, 'Stop Cheque', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
    }

  }
}
