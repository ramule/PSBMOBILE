import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { AppConstants } from 'src/app/app.constant';
declare var OSREC: any;
import * as jsPDF from 'jspdf';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe, Location } from '@angular/common';
import { FontBase64 } from 'src/app/utilities/app-enum';

@Component({
  selector: 'app-standing-instruction-success',
  templateUrl: './standing-instruction-success.component.html',
  styleUrls: ['./standing-instruction-success.component.scss']
})
export class StandingInstructionSuccessComponent implements OnInit {

  constructor(
    private router: Router,
    public dataService: DataService,
    public loader: pageLoaderService,
    public constant: AppConstants,
    private commonMethod: CommonMethods,
    private location : Location,
    private datepipe: DatePipe,) { }


  standingInstructionDtl: any;
  totalAccountList: any;
  todayDateTime = this.datepipe.transform(new Date(), 'ddMMyyyyhhmmss');
  refTransJson: any = [
    {
      'key': 'Transaction ID',
      'value': ''
    }
  ];
  receiptSIAddJson: any = [
    {
      'key': 'Debit Account',
      'value': ''
    },
    {
      'key': 'Credit Account',
      'value': ''
    },
    {
      'key': 'Amount',
      'value': ''
    },
    {
      'key': 'Start Date',
      'value': ''
    },
    {
      'key': 'Number of Payments',
      'value': ''
    },
    {
      'key': 'Payment Frequency',
      'value': ''
    },
    {
      'key': 'Remark',
      'value': ''
    },

  ];

  receiptSIDeleteJson: any = [
    {
      'key': 'Credit Account Name',
      'value': ''
    },
    {
      'key': 'Debit Account',
      'value': ''
    },
    {
      'key': 'Credit Account',
      'value': ''
    },
    {
      'key': 'Amount',
      'value': ''
    },
    {
      'key': 'Start Date',
      'value': ''
    },
    {
      'key': 'Next Date',
      'value': ''
    },
    {
      'key': 'Number of Payments',
      'value': ''
    },
    {
      'key': 'Payment Frequency',
      'value': ''
    },

  ];

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.getBreadcrumb('RECEIPT', this.router.url)
    this.standingInstructionDtl = this.dataService.standingInstructionDtl;
    console.log('Receipt standing instruction :: ', this.standingInstructionDtl)

    let backURL = this.dataService.isCordovaAvailable ? 'dashboardMobile' : 'dashboard';
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.dataService.setPageSettings('Receipt');
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  shareDetails() {
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

    selectedFields += "Debit Account :" + this.standingInstructionDtl.debitAccount + ", ";
    selectedFields += "Credit Account :" + this.standingInstructionDtl.creditAccount + ", ";
    //  OSREC.CurrencyFormatter.format( this.receiptResp.amount, { currency: 'INR', symbol: 'INR' });
    selectedFields += "Start Date :" + this.standingInstructionDtl.datepicker1 + ", ";
    selectedFields += "Number of Installments :" + this.standingInstructionDtl.installmentNumber + ", ";
    selectedFields += "Payment Frequency :" + this.standingInstructionDtl.paymentFrequency + ", ";
    selectedFields += "Amount :" + OSREC.CurrencyFormatter.format(this.standingInstructionDtl.amount, { currency: 'INR', symbol: 'INR' }); ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

  downloadPdfReceipt(type) {
    this.loader.showLoader();
    var imgColor;
    var pdfsize = 'a4';
    var doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    if (this.dataService.siReceiptObj.response == 'Successful') {
      imgColor = 'success';
    }
    else {
      imgColor = 'failed';
    }

    this.screenTypeMessage()

    this.refTransJson[0].value = this.dataService.siReceiptObj.rrn;
    this.totalAccountList = this.dataService.customerOperativeAccList;


    if (this.dataService.screenType == 'addStandingInstruction' || this.dataService.screenType == 'modifyStandingInstruction') {
      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.standingInstructionDtl.debitAccount);
      console.log('total account list 222:  ', selAccDtl);
      console.log('total account list: ', this.totalAccountList);
      var frequency = this.standingInstructionDtl.paymentFrequency == 'W' ? 'Weekly' :this.standingInstructionDtl.paymentFrequency == 'M' ? 'Monthly' : this.standingInstructionDtl.paymentFrequency == 'H' ? 'Half-Yearly' :this.standingInstructionDtl.paymentFrequency == 'Q' ? 'Quartely' :this.standingInstructionDtl.paymentFrequency == 'Y' ? 'Yearly' :this.standingInstructionDtl.paymentFrequency == 'D' ? 'Daily' : '-'
      this.receiptSIAddJson[0].value = this.standingInstructionDtl.debitAccount ? this.standingInstructionDtl.debitAccount : '-';
      this.receiptSIAddJson[1].value = this.standingInstructionDtl.creditAccount ? this.standingInstructionDtl.creditAccount : '-';
      this.receiptSIAddJson[2].value = this.standingInstructionDtl.amount ? this.standingInstructionDtl.amount : '-';
      this.receiptSIAddJson[3].value = this.standingInstructionDtl.datepicker1 ? this.standingInstructionDtl.datepicker1 : '-';
      this.receiptSIAddJson[4].value = this.standingInstructionDtl.installmentNumber ? this.standingInstructionDtl.installmentNumber : '-';
      this.receiptSIAddJson[5].value = frequency ;
      this.receiptSIAddJson[6].value = this.standingInstructionDtl.remarks ? this.standingInstructionDtl.remarks : '-';

      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        { 'key': 'Branch Address', 'value': selAccDtl[0].BRANCHADDRESS },
        { 'key': 'Branch Contact', 'value': selAccDtl[0].phone_number },
        { 'key': 'IFSC', 'value': selAccDtl[0].ifscCode },
      ];

      this.loader.hideLoader();
      this.generatePDF(imgColor, this.dataService.siReceiptObj.response, this.dataService.receiptmsg, this.refTransJson, this.receiptSIAddJson, 'Standing Instruction', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    } else {
      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.standingInstructionDtl.drAccountNumber);
      console.log('total account list 222:  ', selAccDtl);
      console.log('total account list: ', this.totalAccountList);
      var frequency = this.standingInstructionDtl.siFreq == 'W' ? 'Weekly' :this.standingInstructionDtl.siFreq == 'M' ? 'Monthly' : this.standingInstructionDtl.siFreq == 'H' ? 'Half-Yearly' :this.standingInstructionDtl.siFreq == 'Q' ? 'Quartely' :this.standingInstructionDtl.siFreq == 'Y' ? 'Yearly' :this.standingInstructionDtl.siFreq == 'D' ? 'Daily' : '-'

      this.receiptSIDeleteJson[0].value = this.standingInstructionDtl.crAcctName ? this.standingInstructionDtl.crAcctName : '-';
      this.receiptSIDeleteJson[1].value = this.standingInstructionDtl.drAccountNumber ? this.standingInstructionDtl.drAccountNumber : '-';
      this.receiptSIDeleteJson[2].value = this.standingInstructionDtl.crForacid ? this.standingInstructionDtl.crForacid : '-';
      this.receiptSIDeleteJson[3].value = this.standingInstructionDtl.flowAmount ? this.standingInstructionDtl.flowAmount : '-';
      this.receiptSIDeleteJson[4].value = this.standingInstructionDtl.siStartDate ? this.standingInstructionDtl.siStartDate : '-';
      this.receiptSIDeleteJson[5].value = this.standingInstructionDtl.nextDate ? this.standingInstructionDtl.nextDate : '-';
      this.receiptSIDeleteJson[6].value = this.standingInstructionDtl.numOfTimeSiExe ? this.standingInstructionDtl.numOfTimeSiExe : '-';
      this.receiptSIDeleteJson[7].value = frequency;

      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        { 'key': 'Branch Address', 'value': selAccDtl[0].BRANCHADDRESS },
        { 'key': 'Branch Contact', 'value': selAccDtl[0].phone_number },
        { 'key': 'IFSC', 'value': selAccDtl[0].ifscCode },
      ];

      this.loader.hideLoader();
      this.generatePDF(imgColor, this.dataService.siReceiptObj.response, this.dataService.receiptmsg, this.refTransJson, this.receiptSIDeleteJson, 'Standing Instruction', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    }

  }

  screenTypeMessage() {
    switch (this.dataService.screenType) {
      case 'modifyStandingInstruction':
        if (this.dataService.siReceiptObj.response == 'Successful') {
          this.dataService.receiptmsg = 'Standing Instruction Modified Successfully'
        } else {
          this.dataService.receiptmsg = 'Failed to modified Standing Instruction'
        }
        break;

      case 'addStandingInstruction':
        if (this.dataService.siReceiptObj.response == 'Successful') {
          this.dataService.receiptmsg = 'Standing Instruction Added Successfully'
        } else {
          this.dataService.receiptmsg = 'Failed to add Standing Instruction'
        }
        break;

      case 'deleteStandingInstruction':
        if (this.dataService.siReceiptObj.response == 'Successful') {
          this.dataService.receiptmsg = 'Deleted Standing Instruction Successfully'
        } else {
          this.dataService.receiptmsg = 'Failed to delete Standing Instruction'
        }
        break;


    }

    return this.dataService.receiptmsg;
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
      doc.text(submsg, 40, 95, 'left');
  
      doc.setFontSize(9)
      doc.text(reftransJSON[0].key+": "+reftransJSON[0].value, 40, 105, 'left');
  
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
      doc.rect(15, 70, doc.internal.pageSize.width - 30, 170, 'S');
  
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
