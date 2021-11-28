import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { FontBase64 } from 'src/app/utilities/app-enum';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-close-rd-success',
  templateUrl: './close-rd-success.component.html',
  styleUrls: ['./close-rd-success.component.scss']
})
export class CloseRDSuccessComponent implements OnInit {
  receiptType: any;
  receipdRefID: any;
  receiptResp: any;
  todayDateTime: any;
  receiptMsg: any;
  totalAccountList: any = [];
  // receiptCloseRDJson: any = [
  //   {
  //   'key': 'Deposit Type',
  //   'value': ''
  //   },
  //   {
  //   'key': 'Deposit Scheme',
  //   'value': ''
  //   },
  //   {
  //   'key': 'Depositer Type',
  //   'value': ''
  //   },
  //   {
  //   'key': 'RD Account Number',
  //   'value': ''
  //   },
  //   {
  //   'key': 'Applicable Rate of Interest',
  //   'value': ''
  //   },
  //   {
  //   'key': 'Effective Rate of Interest',
  //   'value': ''
  //   },
  //   {
  //   'key': 'Current Maturity Amount',
  //   'value': ''
  //   },
  //   {
  //   'key': 'Credit to close',
  //   'value': ''
  //   },
  //   {
  //   'key': 'Maturity Date',
  //   'value': ''
  //   },
  //   {
  //   'key': 'Maturity Payout Account',
  //   'value': ''
  //   }
  // ];

  receiptCloseRDJson: any = [
    {
    'key': 'Deposit Type',
    'value': ''
    },
    {
    'key': 'RD Account Number',
    'value': ''
    },
    {
    'key': 'Contracted Rate of Interest',
    'value': ''
    },
    {
      'key': 'Deposit Amount',
      'value': ''
    },
    {
    'key': 'Maturity Payout Account',
    'value': ''
    }
  ];

  refTransJson: any = [
    {
    'key': 'Transaction ID',
    'value': ''
    }
  ];
  constructor(
    private router: Router,
    public dataService: DataService,
    public constant: AppConstants,
    private commonMethod: CommonMethods,
    private datepipe: DatePipe,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.getBreadcrumb('RECEIPT' , this.router.url)
    this.dataService.setPageSettings('RECEIPT');
    this.todayDateTime = this.datepipe.transform(new Date(), 'ddMMyyyyhhmmss');

    let backURL = this.dataService.isCordovaAvailable ? 'dashboardMobile' : 'dashboard';
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.totalAccountList = this.dataService.customerMyDepostie;
    this.receiptType = this.dataService.receiptType;
    this.receipdRefID = this.dataService.receipdRefID;
    this.receiptResp = this.dataService.closeRDObj;
    this.receiptMsg = this.dataService.receiptmsg;
    this.refTransJson[0].value = this.dataService.receipdRefID;
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
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
    // selectedFields += "Deposit Type :" + this.receiptResp.depositType + ", ";
    // selectedFields += "Deposit Scheme :" + this.receiptResp.depositScheme + ", ";
    // selectedFields += "Depositer Type :" + this.receiptResp.RDAccNumber + ", ";
    // selectedFields += "RD Account Number :" + this.receiptResp.RDAccNumber + ", ";
    // selectedFields += "Applicable Rate of Interest :" + this.receiptResp.rateOfInterest + ", ";
    // selectedFields += "Effective Rate of Interest :" + this.receiptResp.rateOfInterest + ", ";
    // selectedFields += "Current Maturity Amount :" + this.receiptResp.currentMaturityAmount + ", ";
    // selectedFields += "Credit to close :" + this.receiptResp.creditToClose + ", ";
    // selectedFields += "Maturity Date :" + this.receiptResp.maturityDate + ", ";
    // selectedFields += "Maturity Payout Account :" + this.receiptResp.maturityPayoutAccount + ", ";

    selectedFields += "Deposit Type :" + this.receiptResp.depositType + ", ";
    selectedFields += "RD Account Number :" + this.receiptResp.RDAccNumber + ", ";
    selectedFields += "Contracted Rate of Interest :" + this.receiptResp.rateOfInterest + ", ";
    selectedFields += "Deposit Amount :" + this.receiptResp.depositAmount + ", ";
    selectedFields += "Maturity Payout Account :" + this.receiptResp.maturityPayoutAccount + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

  downloadPdfReceipt(type) {
    console.log(this.dataService.receiptType);
    if(this.dataService.receiptType == this.constant.val_Successful) {
      var imgColor = 'success';
    }
    else {
      imgColor = 'failed';
    }

    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.RDAccNumber);
    console.log('selected account details : ', selAccDtl);

    // this.receiptCloseRDJson[0].value = this.receiptResp.depositType ? this.receiptResp.depositType : '-';
    // this.receiptCloseRDJson[2].value = this.receiptResp.RDAccNumber?  this.receiptResp.RDAccNumber: '-';
    // this.receiptCloseRDJson[3].value = this.receiptResp.RDAccNumber ?  this.receiptResp.RDAccNumber : '-';
    // this.receiptCloseRDJson[4].value = this.receiptResp.rateOfInterest ? this.receiptResp.rateOfInterest + '%' : '-';
    // this.receiptCloseRDJson[5].value = this.receiptResp.rateOfInterest ? this.receiptResp.rateOfInterest + '%': '-';
    // this.receiptCloseRDJson[6].value = this.receiptResp.currentMaturityAmount ? '₹ '+ this.receiptResp.currentMaturityAmount : '-';
    // this.receiptCloseRDJson[7].value = this.receiptResp.creditToClose ? '₹ '+ this.receiptResp.creditToClose : '-';
    // this.receiptCloseRDJson[8].value = this.receiptResp.maturityDate ? this.receiptResp.maturityDate : '-';
    // this.receiptCloseRDJson[9].value = this.receiptResp.maturityPayoutAccount ? this.receiptResp.maturityPayoutAccount : '-';

    this.receiptCloseRDJson[0].value = this.receiptResp.depositType ? this.receiptResp.depositType : '-';
    this.receiptCloseRDJson[1].value = this.receiptResp.RDAccNumber ?  this.receiptResp.RDAccNumber : '-';
    this.receiptCloseRDJson[2].value = this.receiptResp.rateOfInterest ? this.receiptResp.rateOfInterest + '%' : '-';
    this.receiptCloseRDJson[3].value = '₹ ' + this.receiptResp.depositAmount ? this.receiptResp.depositAmount : '-';
    this.receiptCloseRDJson[4].value = this.receiptResp.maturityPayoutAccount ? this.receiptResp.maturityPayoutAccount : '-';

    var branchJSON =[
      {'key':'Branch Name','value': selAccDtl[0].branch_name},
      {'key':'Branch Code','value': selAccDtl[0].branchCode},
      {'key':'Branch Address','value': selAccDtl[0].BRANCHADDRESS},
      {'key':'Branch Contact','value': selAccDtl[0].phone_number},
      {'key':'IFSC','value': selAccDtl[0].ifscCode},
    ];

    // this.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptCloseRDJson, 'Close_RD_Receipt', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
    this.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptCloseRDJson, 'Close_RD_Receipt', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
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
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 115, 'S');

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

  onHomeClick() {
    this.router.navigateByUrl('/myDeposits');
  }
}
