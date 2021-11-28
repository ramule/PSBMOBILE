import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { AppConstants } from 'src/app/app.constant';
import { FontBase64 } from 'src/app/utilities/app-enum';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { DetailStatementService } from '../../../detailed-statement/detailed-statement.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AccountType } from '../../../../../../utilities/app-enum';

import * as jsPDF from 'jspdf';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
@Component({
  selector: 'app-open-rd-account-success-receipt',
  templateUrl: './open-rd-account-success-receipt.component.html',
  styleUrls: ['./open-rd-account-success-receipt.component.scss']
})
export class OpenRdAccountSuccessReceiptComponent implements OnInit {
  openRDReceiptObj:any;
  receiptType: any;
  receipdRefID: any;
  receiptResp: any;
  todayDateTime: any;
  receiptMsg: any;
  totalAccountList: any = [];
  receiptOpenRDJson: any = [
    {
    'key': 'Deposit Type',
    'value': ''
    },
    {
    'key': 'Depositor Type',
    'value': ''
    },
    {
    'key': 'Installment Amount',
    'value': ''
    },
    {
    'key': 'Tenure',
    'value': ''
    },
    {
    'key': 'Interest Rate',
    'value': ''
    },
    {
    'key': 'Monthly Auto Debit Start Date',
    'value': ''
    },
    {
    'key': 'Maturity Amount',
    'value': ''
    },
    {
    'key': 'Maturity Date',
    'value': ''
    },
    {
    'key': 'Mode of Operation',
    'value': ''
    },
    {
    'key': 'Debit Account',
    'value': ''
    },
    {
    'key': 'Maturity Payout Account',
    'value': ''
    },
    {
    'key': 'Nominee Name',
    'value': ''
    },
  ];
  refTransJson: any = [
    {
    'key': 'Transaction ID',
    'value': ''
    }
  ];
  constructor(
    private router: Router,
    public DataService: DataService,
    public constant: AppConstants,
    private commonMethod: CommonMethods,
    private datepipe: DatePipe,
    private http: HttpRestApiService,
    private detailStatementService: DetailStatementService,
    private storage: LocalStorageService,
    private customCurrencyPipe:CustomCurrencyPipe,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('RD Account Overview');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('RECEIPT' , this.router.url);
    this.getOmniDashboardData();
    this.todayDateTime = this.datepipe.transform(new Date(), 'ddMMyyyyhhmmss');
    
    let backURL = this.DataService.isCordovaAvailable ? 'dashboardMobile' : 'dashboard';
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.openRDReceiptObj = this.DataService.openRDReceiptObj;
    this.totalAccountList = this.DataService.customerOperativeAccList;
    this.receiptType = this.DataService.receiptType;
    this.receipdRefID = this.DataService.receipdRefID;
    this.receiptResp = this.DataService.openRDReceiptObj;
    this.receiptMsg = this.DataService.receiptmsg;
    this.refTransJson[0].value = this.DataService.receipdRefID;
  }

  getOmniDashboardData(){
    let param = this.detailStatementService.getMyAccountList(this.DataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OMNIDASHBOARD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        // this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
        // this.accountList = data.set.records;
        this.DataService.fetchTotalBalance(data.set.records , "dashboard");

        this.DataService.customerMyDepostie = [];
        this.DataService.customerOperativeAccList =[];
        this.DataService.customerBorrowingsList= [];
          this.DataService.totalMyDepositBalance = 0;
          this.DataService.totalMyOperativeBalance = 0;
          this.DataService.totalMyBorrowingsBalance = 0;
          data.set.records.forEach(el => {
            if( el.accountType != "CAPPI"){
              if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
                this.DataService.customerMyDepostie.push(el);
                this.DataService.totalMyDepositBalance = this.DataService.totalMyDepositBalance + parseFloat(el.acctBalance);
              }
              else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
                this.DataService.customerOperativeAccList.push(el);
                this.DataService.totalMyOperativeBalance = this.DataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
              }
              else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
                this.DataService.customerBorrowingsList.push(el);
                this.DataService.totalMyBorrowingsBalance = this.DataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
              }
            }
          });

        // this.totalSavingAmt = this.dataService.totalMyOperativeBalance.toFixed(2);
        // this.totalDepositeAmt = this.dataService.totalMyDepositBalance.toFixed(2);

      }
    });
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
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

  /**
 * Get selected values from account details
 */
    getValuesToSend() {
    let selectedFields = "";

    selectedFields += "Deposit Type :" + this.receiptResp.depositType + ", ";
    selectedFields += "Depositor Type :" + this.receiptResp.depositorType + ", ";
    selectedFields += "Installment Amount :" + this.receiptResp.installmentAmount + ", ";
    selectedFields += "Tenure :" + this.receiptResp.tenure + ", ";
    selectedFields += "Interest Rate :" + this.receiptResp.interestRate + ", ";
    selectedFields += "Monthly Auto Debit Start Date :" + this.receiptResp.monthlyDebitDate + ", ";
    selectedFields += "Maturity Amount :" + this.customCurrencyPipe.transform(this.receiptResp.maturityAmount , 'decimal').replace(/[^.0-9]+/g, ''); + ", ";
    selectedFields += "Maturity Date :" + this.receiptResp.maturityDate + ", ";
    selectedFields += "Mode Of Operation :" + this.receiptResp.modeOfOperation + ", ";
    selectedFields += "Debit Account :" + this.receiptResp.debitAccount + ", ";
    selectedFields += "Maturity Payout Account :" + this.receiptResp.maturityPayoutAccount + ", ";
    selectedFields += "Nominee Name :" + this.receiptResp.nomineeName + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

  downloadPdfReceipt(type) {
    console.log(this.DataService.receiptType);
    if(this.DataService.receiptType == this.constant.val_Successful) {
      var imgColor = 'success';
    }
    else {
      imgColor = 'failed';
    }

    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.maturityPayoutAccount);
    console.log('selected account details : ', selAccDtl);

    this.receiptOpenRDJson[0].value = this.receiptResp.depositType ? this.receiptResp.depositType : '-';
    this.receiptOpenRDJson[1].value = this.receiptResp.depositorType ? this.receiptResp.depositorType : '-';
    this.receiptOpenRDJson[2].value = this.receiptResp.installmentAmount ? this.receiptResp.installmentAmount : '-';
    this.receiptOpenRDJson[3].value = this.receiptResp.tenure ? this.receiptResp.tenure : '-';
    this.receiptOpenRDJson[4].value = this.receiptResp.interestRate ? this.receiptResp.interestRate+' %' : '-';
    this.receiptOpenRDJson[5].value = this.receiptResp.monthlyDebitDate ? this.receiptResp.monthlyDebitDate : '-';
    this.receiptOpenRDJson[6].value = this.receiptResp.maturityAmount ? '₹ '+ this.receiptResp.maturityAmount : '-';
    this.receiptOpenRDJson[7].value = this.receiptResp.maturityDate ? this.receiptResp.maturityDate : '-';
    this.receiptOpenRDJson[8].value = this.receiptResp.modeOfOperation ? this.receiptResp.modeOfOperation : '-';
    this.receiptOpenRDJson[9].value = this.receiptResp.debitAccount ? this.receiptResp.debitAccount : '-';
    this.receiptOpenRDJson[10].value = this.receiptResp.maturityPayoutAccount ? this.receiptResp.maturityPayoutAccount : '-';
    this.receiptOpenRDJson[11].value = this.receiptResp.nomineeName ? this.receiptResp.nomineeName : '-';

    var branchJSON =[
      {'key':'Branch Name','value': selAccDtl[0].branch_name ? selAccDtl[0].branch_name : '-'},
      {'key':'Branch Code','value': selAccDtl[0].branchCode ? selAccDtl[0].branchCode : '-'},
      {'key':'Branch Address','value': selAccDtl[0].BRANCHADDRESS ? selAccDtl[0].BRANCHADDRESS : '-'},
      {'key':'Branch Contact','value': selAccDtl[0].phone_number ? selAccDtl[0].phone_number : '-'},
      {'key':'IFSC','value': selAccDtl[0].ifscCode ? selAccDtl[0].ifscCode : '-'},
    ];

    this.generatePDF(imgColor, this.receiptType, this.DataService.receiptmsg, this.refTransJson, this.receiptOpenRDJson, 'Open_RD_Receipt', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
  }


  /*** Generate E-Receipt PDF */

  generatePDF(imageColor,msg,submsg,reftransJSON,receiptJSON,receiptName,branchJSON,printPDF, accountNo, todayDateTime) {
    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = 'assets/images/psb-logo-new.png';
    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    doc.setFontSize(7);
    var count1 = 10
    for(i=0;i<branchJSON.length;i++)
    {
      var data = branchJSON[i].key+": "+branchJSON[i].value
      doc.text(data, pageWidth - 110, count1, 'left');
      count1 = count1 + 5
    }
    // doc.text("Branch Name : ", pageWidth - 110, 10, 'left');
    // doc.text("Branch Code : ", pageWidth - 110, 15, 'left');
    // doc.text("Branch Address : ", pageWidth - 110, 20, 'left');
    // doc.text("Branch Contact : ", pageWidth - 110, 25, 'left');
    // doc.text("IFSC : " , pageWidth - 110, 30, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(20);

    doc.text("E-Receipt", pageWidth/2, 60, 'center');



    var img = new Image()
    if(imageColor=='success')
    img.src = 'assets/images/success-arrow.png';
    else
    img.src = 'assets/images/fail-arrow.png';
    doc.addImage(img, 'png', 20, 75, 16, 16);

    doc.setFontSize(20);

    doc.text(msg, 40, 85, 'left');

    doc.setFontSize(12)
    doc.text(submsg, 40, 92, 'left');

    if(this.DataService.FDRDAccNumber) {
      doc.setFontSize(9)
      doc.text('RD Account Number: '+this.DataService.FDRDAccNumber, 40, 99, 'left');

      doc.setFontSize(9)
      doc.text(reftransJSON[0].key+": "+reftransJSON[0].value, 40, 105, 'left');
    }
    else {
      doc.setFontSize(9)
      doc.text(reftransJSON[0].key+": "+reftransJSON[0].value, 40, 100, 'left');
    }

    doc.setLineWidth(0.1);
    doc.line(17, 110, pageWidth-17, 110);


    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    doc.setFontSize(11);
    var count = 120
    for(i=0;i<receiptJSON.length;i++)
    {
      var data = receiptJSON[i].key+": "+receiptJSON[i].value
      doc.text(data, 25, count, 'left');
      count = count + 10
    }

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 190, 'S');

    doc.setFontSize(8)
    doc.text("This is computer generated statement and does not require any signature.", 15, 277, 'left');

    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth-15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

    if (printPDF=='Y') {
      doc.autoPrint();
      window.open(doc.output('bloburl'));
    }
    else {
      this.commonMethod.downloadPDF(doc, receiptName+'_xx'+ this.maskCharacter(accountNo, 4)+ '_' +todayDateTime);
    }
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    // return ('' + str).slice(0, -n).replace(/./g, "*")+ ('' + str).slice(-n);
    return str.slice(-n);
  }

}
