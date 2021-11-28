import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportAsConfig, ExportAsService, SupportedExtensions } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { LoanDetailsService } from '../loan-details/loan-details-service';
import * as jsPDF from 'jspdf';
import * as Chart from 'chart.js'
import { CommonMethods } from '../../../../utilities/common-methods';
import { Router } from '@angular/router';
import { MyAccountInfoService } from '../../my-accounts/my-accounts-info/my-account-info.service';
import { MyBorrowingService } from '../../my-accounts/my-borrowings/my-borrowings.service';
import { DatePipe, Location, getCurrencySymbol } from '@angular/common';
import { FontBase64 } from 'src/app/utilities/app-enum';
import { newArray } from '@angular/compiler/src/util';

declare var showToastMessage: any;
declare var window: any;
declare var OSREC: any;
@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent implements OnInit {

  constructor(
            public dataService: DataService,
            private http: HttpRestApiService,
            private storage: LocalStorageService,
            private constant: AppConstants,
            private loanDetailsService: LoanDetailsService,
            private exportAsService: ExportAsService,
            private commonMethod : CommonMethods,
            private router : Router,
            private myAccountInfoService : MyAccountInfoService,
            private myBorrowingService : MyBorrowingService,
            private datePipe:DatePipe
    ) { }

  loanType: any;
  loanDetails: any;
  canvasDonot: any;
  _canvasDonot: any;
  ctxDonot: any;
  _ctxDonot: any;
  selAccDtl: any;
  overDueAmt:any;
  intCertificate:any;
  currentdate:any;
  nextdate:any;
  currentDate:any;
  today:any;
  tommordate:any;
  todayDateTime: any;
  loantypess:any;
  loanTypesnew:any;
  provionalrate:any;
  totalActualamount:any;
  nextyear:any;
  todays:any;
  interestCertficatelatradatea:any;
  interestCertificatelatrs:any;
  showListAccount: boolean = true;
  totalAvailableBalance: boolean = false;
  selectionValue: any = 'miniStatement';
  totalAccountList:any = [];
  savingAccountList:any = [];
  loanMiniStatemnt:any = [];
  pdfTransactionData: any = [];
  selectedAccountNo:any;
  loanUserDtl:any;
  accountOpeningdate:any;
  totalProvisionlaAmountLastcoulumn:any;
  totalProjectedamount:any
  totalProvisionalprinciple:any;
  totalProvisionalpenale:any;
  Date:any
  branchCode:any;
  assessmentYearList:any;
  totalProvisionalinterest:any;
  interestCertficate:any;
  fromyear:any;
  customerid:any;
  date:any
  year:any;
  toyear:any;
  startDate="April 01, "
  endDate="March 31, "
  interestCertificateForm: FormGroup;
  // balanceCertificateForm: FormGroup;

  interestCertificateData: any = [];
  balanceCertificateData: any = [];
  downloadBalCertDateOfIssue: any;
  interestCertificateDataanother:any=[]
  interestCertificatetotalrecovry:any=[]
  provisionlaInterestCertificateData:any=[]

  accountDetailsList: any = [];
  showShare : boolean = false;
  todaydate = new Date().toISOString();
  selectedate:any;
  loanTypes:any;
  newdate:any;
  loanAccIssueDate: any = "";
  refreshDate:any;
  currency:any;

  shareDtl:any = {
    'name' : false,
    'accType' : false,
    'accStatus' : false,
    'accNo' : false,
    'interest' : false,
    'branchAdd' : false,
    'ifsc' : false,
    'custId' : false
  };

  recordNotFound : any = '' ;


  offerList = [];
  @ViewChild('statementAcc') statementAcc: ElementRef;
  @ViewChild('interestCert') interestCert: ElementRef;
  @ViewChild('repaySchedule') repaymentSchedule: ElementRef;

  AccStatementconfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'statementAcc',
    options: {
      jsPDF: {
        orientation: 'portrait'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  }

  InterestCertconfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'interestCert',
    options: {
      jsPDF: {
        orientation: 'portrait'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  }

  RepaymentScheduleCertConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'repaymentCert',
    options: {
      jsPDF: {
        orientation: 'portrait'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  }


  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.profiledateDetails;
    console.log("profiledata",this.dataService.profiledateDetails)
    this.dataService.getBreadcrumb('LOAN_DETAILS' , this.router.url)
    this.todayDateTime = this.datePipe.transform(new Date(), 'ddMMyyyyhhmmss');
    console.log(this.datePipe.transform(new Date(), 'ddMMyyyy'));
    // this.currentdate = this.datePipe.transform(new Date().toISOString(), "dd-mm-yyyy");
    this.currentdate= this.datePipe.transform(new Date().toISOString(), "dd-MM-yyyy");
    this.nextdate=this.datePipe.transform(new Date().toISOString(), "dd-MM-yyyy");
    console.log("nextdate",  this.nextdate);
    this.year = this.datePipe.transform(new Date().toISOString(), "yyyy");
    this.nextyear= Number(this.year) + 1;
    console.log("nextyear", this.nextyear);
    this.today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1, )
     this.tommordate = this.datePipe.transform(this.today.toISOString(),"dd-MM-yyyy");
    // this.tommordate= (this.today).getDate()+1;
     console.log("nextdatessss",    this.tommordate);
//     this.tommordate = new Date(new Date().toISOString().getTime(), "dd-MM-yyyy");
// var day = this.tommordate.getDate()
// var month = this.tommordate.getMonth() + 1
// var year = this.tommordate.getFullYear()
// document.write("<b>" + day + "/" + month + "/" + year + "</b>")
// console.log("nextdatessss",   this.tommordate);
   var width = $(window).width()

    if(width < 767){
      this.showListAccount = true ;
     }
     this.buildForm()
    this.initialization();
  }

  buildForm() {
    this.interestCertificateForm = new FormGroup({
      accNo: new FormControl('', [Validators.required]),
      period: new FormControl('', [Validators.required])
    });

    // this.balanceCertificateForm = new FormGroup({
    //   accNo: new FormControl('', [Validators.required]),
    //   period: new FormControl('', [Validators.required])
    // });
  }


  /**
   * Initialization function
   */
  initialization() {
    this.loanType = this.dataService.loanType;
    this.dataService.setPageSettings(this.loanType + ' Details');

    this.loanDetails = this.dataService.loanDetails;
    this.getAccountList('onload');
    let req = this.loanDetailsService.getRecommendedOffersReq();
    this.getRecommendedOffers(req);
    let param = this.loanDetailsService.getRepaymentStatusParam(this.loanDetails.accountNo);
    this.getRepaymentStatus(param);

    var assessmentParam = this.loanDetailsService.getAssessmentYearCall();
    this.getAssessmentYear(assessmentParam);
    this.refreshDate = this.datePipe.transform(this.dataService.onRefreshDate.toISOString(), this.dataService.timeFormat);
  }

  onRefresh(){
    this.dataService.onRefreshDate = new Date();
    this.refreshDate = this.datePipe.transform(this.dataService.onRefreshDate.toISOString(), this.dataService.timeFormat);
    this.getSelectedAccount(this.selAccDtl.accountNo);
  }


  getAccountList(type?: any) {
    this.totalAccountList = [];
    this.totalAccountList = this.dataService.customerBorrowingsList;
    if (type == 'onload') {
      this.selectedAccountNo = this.dataService.loanDetails.accountNo;
      this.getSelectedAccount(this.selectedAccountNo)
    }
  }

  openAccountList(){
    this.commonMethod.openPopup('div.popup-bottom.sel-account');
  }

  getSelectedAccount(accNo){
    this.commonMethod.closePopup('div.popup-bottom.sel-account');
    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == accNo);
    this.selAccDtl = selAccDtl[0];
    console.log('selected account: ', this.selAccDtl);
    this.dataService.selLoanAccDtlNo = this.selAccDtl;
    this.currency = getCurrencySymbol( this.selAccDtl?.currency , 'narrow')
    this.getLoanEnq(accNo);
    this.getLoanMiniStatement(accNo);
  }


  getLoanEnq(accNo){
    var param = this.myBorrowingService.getMyLoansInquiry(accNo,this.selAccDtl.branchCode);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANACCOUNTINQUIRY).subscribe(data => {
        console.log("loan enq resp===>",data);
        this.customerid = data.set.records[0].customerID
        console.log("loanenqconstumer===>",this.customerid);
        var resp = data.responseParameter;
        this.branchCode = data.set.records[0]['001']
        if (resp.opstatus == "00") {
          if (data.hasOwnProperty("set")) {
            this.loanUserDtl = data.set.records[0]
            this.loanUserDtl.interest_Rate = parseFloat(this.loanUserDtl.interest_Rate).toFixed(2);
            this.loanUserDtl.accountOpenDate = this.setDate(this.loanUserDtl.accountOpenDate);
            this.dataService.loanUserDtl = this.loanUserDtl;
            this.overDueAmt = parseFloat(this.loanUserDtl?.pricipalDemandArrears) + parseFloat(this.loanUserDtl?.interestDemandsArrears) + parseFloat(this.loanUserDtl?.chargesDemandArrears) + parseFloat(this.loanUserDtl?.otherChargesDemand);
            this.loanUserDtl.repaymentPeriodMonthsComponent = parseInt(this.loanUserDtl?.repaymentPeriodMonthsComponent);
          }
        }
      });
  }


  getLoanMiniStatement(accNo){
    this.loanMiniStatemnt = [];
    this.recordNotFound = '' ;
    var param = this.myBorrowingService.getMyLoansMiniStatement(accNo);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANMINISTATEMENT ).subscribe(data => {
        console.log("getMyLoansMiniStatement===>",data);

        var resp = data.responseParameter;
        //if (resp.opstatus == "00") {


          if (data.hasOwnProperty("set")) {
            this.loanMiniStatemnt = data.set.records;
            if(data.set.records[0]['responseCode'] == "119"){
              this.recordNotFound = this.loanMiniStatemnt[0]['CBS_RES_FAIL_MSG']
            } else{
                console.log("this.loanMiniStatemnt" + JSON.stringify(this.loanMiniStatemnt))
                this.pdfTransactionData = [];
                this.loanMiniStatemnt.forEach(el => {
                  console.log('loanMiniStatementValues',el);
                  el.loanMiniStatementData.forEach(val => {
                    console.log('foreachVal',val);
                  });
                  var crDr = el.creditDebitFlag == 'D' ? 'DR' : 'CR';
                  var _data = [];
                  _data.push(this.formatDate(el.TransactionDate));
                  _data.push(el.transactionDetails);
                  _data.push(crDr);
                  _data.push(this.convertCurrency(el.TransactionAmount));
                  this.pdfTransactionData.push(_data);
                  console.log('pdfTransaction',this.pdfTransactionData);
                });

          }

            // this.loanMiniStatemnt.forEach(element => {
            //   var finalDate = this.formatDate(element.TransactionDate);
            //   console.log('final date: ', finalDate);
            //   element.TransactionDate = finalDate;
            // });

          }
        //}
      });
  }

  formatDate(str) {
    var year = "";
    var month = "";
    var day = "";
    var newString = "";
    for (var i = 0; i < str.length; i++) {
      if(i >= 0 && i <= 3) {
        year += str[i];
      }
      else if(i > 3 && i <= 5) {
        month += str[i];
      }
      else if(i > 5) {
        day += str[i];
      }
    }
    console.log('year: ', year);
    console.log('month: ', month);
    console.log('day: ', day);

    newString = day + '/' + month + '/' + year;
    console.log('formatted date: ', newString);
    return newString;
  }


  setDate(date){
    var validDate;
    var urDate = date.match(/(\d{4})(\d{2})(\d{2})/);
    validDate = urDate[3]+"/"+urDate[2]+"/"+urDate[1];
    return validDate
  }



  /**
  * api call to get recommended offers
  * @param
  */
  getRecommendedOffers(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETRECOMMENDEDOFFERS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.offerList = data.set.records;
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  /**
  * api call to get repayment status
  * plot graph according to it
  * @param
  */
  getRepaymentStatus(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETREPAYMENTSTATUS).subscribe(data => {
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(resp);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == "02") {
      showToastMessage(resp.Result, "error");
    }
  }

  public SavePDF(elementRef,fileName): void {
    let content=elementRef.nativeElement;
    let doc = new jsPDF('p','pt','a4');
    let _elementHandlers =
    {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(content.innerHTML,20,20,{
      width:500,
      'elementHandlers':_elementHandlers
    });

    doc.save(fileName+'.pdf');
  }

  downloadCertificate(type) {
    switch (type) {
      case "1":
        // this.exportAs(this.AccStatementconfig, 'Account_of_statment');
        this.SavePDF(this.statementAcc,'Account_of_statment')
        break;
      case "2":
        // this.exportAs(this.RepaymentScheduleCertConfig, 'REPAYMENT_SCHEDULE');
        this.SavePDF(this.repaymentSchedule,'REPAYMENT_SCHEDULE')
        break;
      case "3":
        // this.exportAs(this.InterestCertconfig, 'Interest_certificate');
        this.SavePDF(this.interestCert,'Interest_certificate')
        break;
      default:
        break;
    }
  }

  pdfCallbackFn(pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

  exportAs(config, fileName) {
    this.exportAsService.save(config, fileName).subscribe(() => {
      // save started
      console.log("save started");
    });
  }

  //NEW
  openSelectedAccountList(value) {
    this.selectionValue = value;
  }

  listExpander(value) {
    switch (value) {
      case 'list':
        this.showListAccount = !this.showListAccount  ;
        break;

      case 'balanceList':
        this.totalAvailableBalance = !this.totalAvailableBalance
        break;
    }

  }

  goToPage(routeName,item?:any){
    if(routeName == 'interestCertificate'){
      return;
    }
    if(routeName == 'borrowerGuarantorDetails'){
      this.dataService.loanAccNo = this.selectedAccountNo
    }
    if(routeName == 'payEmi'){
      this.dataService.accDetails = this.selAccDtl;
      this.dataService.loanDetails = this.selAccDtl;//accountNo
    }
    this.router.navigateByUrl('/'+routeName);
  }
  openPopup(popUpName) {
    this.buildForm();
    switch (popUpName) {
      case 'lienEnquiry':
        this.commonMethod.openPopup('div.lien-enquiry-popup');
        break;
      case 'balanceEnquiry':
        // this.balanceCertificateForm.patchValue({
        //   accNo: this.selectedAccountNo
        // });
        this.commonMethod.openPopup('div.balance-popup');
        break;
      case 'interestCertificate':
        //TODO: enable if service available
        this.interestCertificateForm.patchValue({
          accNo: this.selectedAccountNo
        });
        this.commonMethod.openPopup('div.interest-popup');
        break;
    }
  }

  closePopUp(type?:any) {
    if(type == 'selectAcc'){
      console.log('selectAcc ====> '+this.selectedAccountNo);
      this.getSelectedAccount(this.selectedAccountNo);
    }
    this.commonMethod.closeAllPopup();
  }

  generatePDF(print?: any) {

    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = this.constant.psbNewLogo;
    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line


    doc.setFontSize(7);
    doc.text("Branch Name : "+this.selAccDtl.branch_name, pageWidth - 110, 10, 'left');
    doc.text("Branch Code : "+this.loanUserDtl.branchPinCode, pageWidth - 110, 15, 'left');
    doc.text("Branch Address : "+this.loanUserDtl.BRANCHADDRESS, pageWidth - 110, 20, 'left');
    doc.text("Branch Contact : "+this.loanUserDtl.phone_number, pageWidth - 110, 25, 'left');
    doc.text("IFSC : " + this.loanUserDtl.ifscCode, pageWidth - 110, 30, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(20);
    doc.text("Mini Statement ", 20, 60, 'left');
    doc.setFontSize(10);
    doc.text("as on date : " +this.datePipe.transform(new Date(), 'dd/MM/yyyy'),70,60,'left')

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 50, 'S');

    doc.setFontSize(15);
    // doc.text("Account Name :"+this.loanUserDtl?.customerName, 20, 80, 'left');

    doc.setFontSize(10);
    doc.text("Customer ID : "+this.loanUserDtl?.customerID,20, 85, 'left');
    doc.text("Account Number : " +this.selectedAccountNo, 20, 90, 'left');
    doc.text("Account Holder Name : " +this.loanUserDtl?.accountName, 20, 95, 'left');

    var splitTitle = doc.splitTextToSize("Address : "+this.dataService.profileDetails[0].add1 +","+this.dataService.profileDetails[0].add2 +","+ this.dataService.custProfileStateCityObj.city +" "+ this.dataService.custProfileStateCityObj.state +" "+ this.dataService.profileDetails[0].pin, 80);
    doc.text(splitTitle, 20, 100, 'left');

    // doc.text("Account Open Date : "+ this.Date, 20, 115, 'left');

    // doc.setLineWidth(0.5);
    // doc.line(pageWidth/2, 80, pageWidth/2, 110);

    doc.text("Account Category : "+this.selAccDtl?.accountType+"-"+this.selAccDtl?.schemeDescription,pageWidth - 100, 85, 'left');
    doc.text("Date : "+this.datePipe.transform(new Date(), 'dd/MM/yyyy'), pageWidth - 100, 90, 'left');


    doc.setFontSize(5);
    var rowsData = []
    rowsData = this.loanMiniStatemnt
    var newData = []
    var newArray = []
     // add the font to jsPDF

     for(var i=0;i<this.loanMiniStatemnt.length;i++)
     {
      newData = []
      var date = this.loanMiniStatemnt[i].TransactionDate.split('-')[0] + '/' + this.loanMiniStatemnt[i].TransactionDate.split('-')[1] + '/' + this.loanMiniStatemnt[i].TransactionDate.split('-')[2]
      var ref = this.loanMiniStatemnt[i].transactionParticulars
      var cd = this.loanMiniStatemnt[i].TransactionType
      var amt = this.convertCurrency(this.loanMiniStatemnt[i].TransactionAmount)
      newData.push(date,ref,cd,amt)
      newArray.push(newData)
     }
     console.log("datatatatat",newArray)

    doc.setFontSize(7);
    var _columns = ["Transaction Date", "Transaction Reference", "CR/DR", "Amount (INR)"];
    var _rows = newArray;
    console.log(_rows);


    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");
    doc.autoTable(_columns, _rows, {
      theme: 'grid', // 'striped', 'grid' or 'plain',
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      margin: { top: 130 },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        halign: 'center',
        horizontalPageBreak:true,
        font:"Sakalbharati",
      },
      columnStyles: {
        1: { cellWidth: 'auto' },
        3: { cellWidth: 40, halign: 'right' }

      }
    });
    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setLineWidth(0.1);
      doc.text('Please examine your receipt immediately on receipt. If no error is reported in the printed statement with in 15 days, the acount will be considered correct.', 15, 278, 'left')
      doc.text('This is computer generated statement and does not require any signature. ', 15, 281, 'left')
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth-15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

    if (print) {
      doc.autoPrint();
      window.open(doc.output('bloburl'));
    }
    else {
      this.commonMethod.downloadPDF(doc, 'My-Account-Info_XX'+ this.maskCharacter(this.selAccDtl?.accountNo, 4)+ '_' +this.todayDateTime);
    }
  }

  getAssessmentYear(param) {
    this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_CERTIFICATECONFIGS).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
        if (resp.opstatus == "00") {
          console.log(data.responseParameter);
          this.assessmentYearList = data.listofDataset[0].records;
          console.log('assessment year list: ', this.assessmentYearList);
        }
        else {
          showToastMessage(resp.result);
        }
      });
  }
  dnldInterestCertificatelatra() {

     this.interestCertificatelatrs=[]
      var param = this.loanDetailsService.getInterestCertificateParamlatra(this.selAccDtl.accountNo);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LAIRACCOUNTINQUIRY).subscribe(data => {
        var resp = data.responseParameter;


        if (resp.opstatus == "00") {
          this.loanAccIssueDate = resp.TransactionDate;
          this.intCertificate=data.set.records;
          console.log(data);
          this.accountOpeningdate=data.set.records[0].accountOpenDate;
            console.log("Openingdate::", this.accountOpeningdate);
            this.Date=this.openingDate()
            console.log("Date",this.openingDate());
          this.interestCertficatelatradatea=data.set.records[0];
          this.loantypess= this.interestCertficatelatradatea.loanType
          if(this.loantypess=="E")
          {
            this.loanTypesnew="EMI"
          }
          else if(this.loantypess=="F")
          {
            this.loanTypesnew="Fixed"
          }

          this.provionalrate=(OSREC.CurrencyFormatter.format( this.interestCertficatelatradatea.interest_Rate, { currency: 'INR', symbol: ' ' }) + ' %')

          if (data.hasOwnProperty("set")) {

            // data.set.records.forEach(el => {
            //   var _data = [];
            //   if(el.loanType=="E"){
            //     this.loanTypes="EMI"
            //   }
            //   else if(el.loanType=="F")
            //   {
            //     this.loanTypes="Fixed"
            //   }
            //   _data.push( this.loanTypes);
            //   _data.push( this.Date);
            //   _data.push(this.convertCurrency(el.sanctionedAmount));
            //   // _data.push(el.interest_Rate + ' %');
            //   _data.push(OSREC.CurrencyFormatter.format(el.interest_Rate, { currency: 'INR', symbol: ' ' }) + ' %');
            //   _data.push(this.convertCurrency(el.installmentAmount));
            //   this.interestCertificatelatrs.push(_data)
            // });

            this.interestCertificateForm.reset();

          }
        }
        else {
          this.commonMethod.closePopup('div.popup-bottom.interest-popup');
        }
      });

  }
      provisionalCertificate(){
        return;
         this.dnldInterestCertificatelatra()
         this.provisionlaInterestCertificateData=[]
        var param = this.loanDetailsService.getprovisionalCertificate(this.selAccDtl.accountNo,this.customerid);
        console.log("accountnumber",this.selAccDtl.accountNo)
        this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_PROVISIONALINTERESTCERT).subscribe(data => {
          var resp = data.responseParameter;
          if (resp.opstatus == "00") {
            this.dnldInterestCertificateSecond();
            console.log("provisionaldata",data);
            this.interestCertficate=data.set.records;
            this.totalActualamount=parseInt( this.interestCertficate[0].principalAmount)+parseInt(this.interestCertficate[0].totalInterestAmount)+parseInt(this.interestCertficate[0].totalRenalInterest)
            this.totalProjectedamount=parseInt( this.interestCertficate[0].totalProjectedPrincipal)+parseInt(this.interestCertficate[0].totalProjectedInterest)
            this.totalProvisionalprinciple=parseInt( this.interestCertficate[0].principalAmount)+parseInt(this.interestCertficate[0].totalProjectedPrincipal)
            this.totalProvisionalinterest=parseInt( this.interestCertficate[0].totalInterestAmount)+parseInt(this.interestCertficate[0].totalProjectedInterest)
            this.totalProvisionalpenale=parseInt( this.interestCertficate[0].totalRenalInterest)
            this.totalProvisionlaAmountLastcoulumn= this.totalActualamount+ this.totalProjectedamount
            console.log("totalActualamount",this.totalActualamount);
            if (data.hasOwnProperty("set")) {
              data.set.records.forEach(el => {
                var _data = [];
                _data[0]="Actual";
                _data[1]="01-04-21";
                _data[2]="04-10-21";
                _data.push(el.principalAmount);
                _data.push(el.totalInterestAmount);
                _data.push(el.totalRenalInterest);
                _data.push(el.totalInterestAmount);
                _data.push(el.totalProjectedPrincipal);
                _data.push(el.totalRepayment);
                _data.push(el.totalProjectedInterest);



                this.provisionlaInterestCertificateData.push(_data)
              });

              this.dwnldloanprovisional();
              this.interestCertificateForm.reset();
              console.log("newprovidaus",this.provisionlaInterestCertificateData)

            }

          }
          else {
            this.commonMethod.closePopup('div.popup-bottom.interest-popup');
          }
        });


      }


      dwnldloanprovisional() {
        var pdfsize = 'a4';
        var doc = new jsPDF();

        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        var img = new Image()
        img.src = 'assets/images/psb-logo-new.png';
        doc.addImage(img, 'png', 15, 16, 60, 15);
        doc.setLineWidth(0.2);
        doc.line(150, 10, 150, 40); // vertical line
        doc.setFontSize(10);
        // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");
         doc.text("Branch Name : "+this.loanUserDtl.branch_name, pageWidth - 115, 20, 'left');
        var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        doc.text(splitTitles, pageWidth - 115, 25, 'left');
        // doc.text("Address : "+this.loanUserDtl.branch_name, pageWidth - 115, 25, 'left');
        doc.setLineWidth(0.2);
        doc.line(90, 10, 90, 40); // vertical line
        doc.setFontSize(10);

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");
        doc.text("Branch Code : "+this.branchCode, pageWidth -55, 20, 'left');
        doc.text("IFSC Code : "+this.loanUserDtl.ifscCode, pageWidth - 55, 25, 'left');
        doc.text("MICR Code : "+this.loanUserDtl.micrCode, pageWidth - 55, 30, 'left');
        doc.text("Telephone: "+this.loanUserDtl.phone_number, pageWidth - 55, 35, 'left');

        doc.setLineWidth(0.1);
        doc.line(15, 45, pageWidth-15, 45);

        doc.setFontSize(12);
        // doc.setFontType("bold");
        // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "bold");
    doc.setFont("Sakalbharati");
        doc.text("Provisional Loan Interest Certificate", pageWidth/2, 60, 'center');

        doc.setFontSize(10);
        // doc.setFontType("normal")
        doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
        doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
        doc.setFont("Sakalbharati");
        doc.text(this.loanAccIssueDate, 155, 65, 'left');
        // doc.text(this.interestCertficate[0].custName, 15, 70, 'left');
        doc.text("Cusomer Name: "+this.interestCertficatelatradatea.customerName, 15, 75, 'left');
        doc.text(this.loanUserDtl?.branch_name, 15, 80, 'left');
        doc.text("Customer Id: "+this.interestCertficatelatradatea.customerId, 15, 85, 'left');
        doc.text("PAN: "+this.dataService.profiledateDetails[0].panNumber, 15, 90, 'left');
        doc.text("Dear Customer,", 15, 100, 'left');
        // doc.text("Please find below the provisional figure of the repayment done/to be done against Loan Account Number 01231200000123 in the name Borrower Name Co=Borrower name for the period April 01,2021 to March 31,2022,", 15, 105, 'left');
        var reportTitle = "Please find below the provisional figure of the repayment done/to be done against Loan Account Number " +this.selAccDtl.accountNo+" " +"in the name"+this.interestCertficatelatradatea.customerName+ " "+this.interestCertficatelatradatea.JointHolderName1+  " "+this.interestCertficatelatradatea.JointHolderName2+  " "+this.interestCertficatelatradatea.JointHolderName3+ " for the period April 01,"+ this.year+ "to March 31, "+ "  "+ this.nextyear
        var splitTitle = doc.splitTextToSize(reportTitle, 180);
        doc.text(splitTitle, 15, 105, 'left');

           doc.setFontSize(10);
           doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
           doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
           doc.setFont("Sakalbharati");
        // var _columns = ["Loan Account Type", "Sanction Date", "Sanctioned Amount", "Rate of Interest", "Installment Amount","Balance as on"+'01-04-'+this.year,"Balance as on "+ this.currentdate];
        var _data1 = [];

        var array =[]
        _data1.push("0.0");
        _data1.push("0.0");
        _data1.push("0.0");
        _data1.push("0.0");
        _data1.push("0.0");
        _data1.push("0.0");
        _data1.push("0.0");



        array.push(_data1)

        var _rowss =this.interestCertificatelatrs;
        // console.log(_rows);

        doc.autoTable( {
          head: [["Loan Account Type", "Sanction Date", "Sanctioned Amount", "Rate of Interest", "Installment Amount","Balance as on"+'01-04-'+this.year,"Balance as on "+ this.currentdate]],
          body: [
            [ this.loanTypesnew, this.Date, this.convertCurrency(this.interestCertficatelatradatea.sanctionedAmount), this.provionalrate, this.convertCurrency(this.interestCertficatelatradatea.installmentAmount),this.convertCurrency(this.interestCertficate[0].openingBalance),this.convertCurrency(this.interestCertficate[0].closingBalance)],

            // ...
          ],
          theme: 'grid', // 'striped', 'grid' or 'plain',
          didDrawPage: function (data) {
            // Reseting top margin. The change will be reflected only after print the first page.
            data.settings.margin.top = 10;
          },
          margin: { top: 115 },
          styles: {
            overflow: 'linebreak',
            cellWidth: 'wrap',
            horizontalPageBreak:true,
            halign: 'center',
            // font: "Sakalbharati"
            font: "Sakalbharati"
          },
          columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 30 ,halign: 'right' },
            2: { cellWidth: 30 ,halign: 'right' },
            3: { cellWidth: 20 ,halign: 'right' },
            4: { cellWidth: 30 ,halign: 'right' },
            5: { cellWidth: 30 ,halign: 'right' },
            6: { cellWidth: 30 ,halign: 'right' }

          }
        });

        doc.setFontSize(10);



        doc.setFontSize(10);
        doc.text("The breakup towards the principal and interest is given below: ", 15, 143, 'left');

        doc.setFontSize(10);
        doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
        doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
        doc.setFont("Sakalbharati");
          // var _columnss = ["                      ","From Period ","To Period ","Recovery towards Principle ", "Recovery towards interest ","Penal Interest Amount ","Total Amount "];

        var _data = [];
         var array1 =[]
        _data.push("0.00");
        _data.push("0.00");
        _data.push("0.00");
        _data.push("0.00");
        _data.push("0.00");
        _data.push("0.00");
        _data.push("0.00");




        array.push(_data)

        var _rowss = this.provisionlaInterestCertificateData;
        // console.log(_rows);

        doc.autoTable( {

          head: [["      ","From Period ","To Period ","Recovery towards Principle ", "Recovery towards interest ","Penal Interest Amount ","Total Amount "]],
          body: [
            ['Actual', '01-04-'+this.year,  this.currentdate, this.convertCurrency(this.interestCertficate[0].principalAmount), this.convertCurrency(this.interestCertficate[0].totalInterestAmount), this.convertCurrency(this.interestCertficate[0].totalRenalInterest), this.convertCurrency(this.interestCertficate[0].totalRepayment)],
            ['Projected', this.tommordate,  '31-03-'+this.nextyear, this.convertCurrency(this.interestCertficate[0].totalProjectedPrincipal),this.convertCurrency(this.interestCertficate[0].totalProjectedInterest),"-",this.convertCurrency(this.totalProjectedamount)],
            ['Total Provisional', '01-04-'+this.year, '31-03-'+this.nextyear,this.convertCurrency(this.totalProvisionalprinciple),this.convertCurrency(this.totalProvisionalinterest),this.convertCurrency(this.totalProvisionalpenale),this.convertCurrency(this.totalProvisionlaAmountLastcoulumn) ],
            // ...
          ],
          theme: 'grid', // 'striped', 'grid' or 'plain',
          didDrawPage: function (data) {
            // Reseting top margin. The change will be reflected only after print the first page.
            data.settings.margin.top = 10;
          },
          margin: { top: 230 },
          styles: {
            overflow: 'linebreak',
            cellWidth: 'wrap',
            horizontalPageBreak:true,
            halign: 'center',
            font: "Sakalbharati"
          },
          columnStyles: {
            0: { cellWidth: 20 , },
            1: { cellWidth: 25 , },
            2: { cellWidth: 25 , },
            3: { cellWidth: 30 ,halign: 'right' },
            4: { cellWidth: 30 ,halign: 'right' },
            5: { cellWidth: 30 ,halign: 'right' },
            6: { cellWidth: 30 ,halign: 'right' },

          }
          // columnStyles: {
          //   4: {
          //     cellWidth: 'auto'
          //   }
          // }

        });

        const pageCount = doc.internal.getNumberOfPages()
        doc.setFontSize(6)
        for (var i = 1; i <= pageCount; i++) {
          doc.setPage(i)
          doc.setLineWidth(0.1);
          doc.text('Please examine your receipt immediately on receipt. If no error is reported in the printed statement with in 15 days, the acount will be considered correct.', 15, 278, 'left')
          doc.text('This is computer generated statement and does not require any signature. ', 15, 281, 'left')
          doc.setLineWidth(0.1);
          doc.line(15, 282, pageWidth-15, 282);
          doc.setFontSize(8)
          doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
          doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
        }
        this.commonMethod.downloadPDF(doc, 'Loan_Interest-Certificate_XX'+ this.maskCharacter(this.selAccDtl?.accountNo, 4)+ '_' +this.todayDateTime);
      }


  dnldInterestCertificate() {
     this.closePopUp();
      this.interestCertificateData = [];
      this.interestCertificatetotalrecovry = [];
      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.interestCertificateForm.value.accNo );
      var param = this.myAccountInfoService.getInterestCertificateParam(this.interestCertificateForm.value,selAccDtl);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANINTERESTCERTIFICATE).subscribe(data => {
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          console.log(data);
          this.interestCertficate=data.set.records;
          if (data.hasOwnProperty("set")) {
            data.set.records.forEach(el => {
              var _data = [];
              _data.push(this.convertCurrency(el.openingBalance));
              _data.push(this.convertCurrency(el.closingBalance));

              this.interestCertificateData.push(_data)
            });
            data.set.records.forEach(el => {
              var _data = [];
              _data.push(this.convertCurrency(el.principalAmount));
              _data.push(this.convertCurrency(el.totalInterestAmount));
              _data.push(this.convertCurrency(el.totalRenalInterest));
              _data.push(this.convertCurrency(el.totalRepayment));

              this.interestCertificatetotalrecovry.push(_data)
            });
            this.dnldInterestCertificateSecond();
            this.interestCertificateForm.reset();

          }

        }
        else {
          this.commonMethod.closePopup('div.popup-bottom.interest-popup');
        }
      });
    }

    openingDate()
    {
    var x = this.accountOpeningdate;
    var day = x % 100;
    var month = Math.floor(x % 10000 / 100);
    var year = Math.floor(x / 10000);
    var date = new Date(year, month - 1, day);
    var OpDate=this.datePipe.transform(date, 'dd-MM-yyyy');
    return OpDate;
    }

    // provisionalCertificate(){
    //   // this.commonMethod.openPopup('div.interest-popup');
    // }

  dnldInterestCertificateSecond() {
    this.closePopUp();
    if (this.interestCertificateForm.valid) {
      this.interestCertificateDataanother = [];
      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.interestCertificateForm.value.accNo );
      var param = this.loanDetailsService.getInterestCertificateParamSecond(this.interestCertificateForm.value,selAccDtl);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LAIRACCOUNTINQUIRY).subscribe(data => {
        var resp = data.responseParameter;

        if (resp.opstatus == "00") {
          this.loanAccIssueDate = resp.TransactionDate;
          this.intCertificate=data.set.records;
          console.log(data);
          this.accountOpeningdate=data.set.records[0].accountOpenDate;
            console.log("Openingdate::", this.accountOpeningdate);
            this.Date=this.openingDate()
            console.log("Date",this.openingDate());
          this.interestCertficate=data.set.records;
          if (data.hasOwnProperty("set")) {

            data.set.records.forEach(el => {
              var _data = [];
              if(el.loanType=="E"){
                this.loanTypes="EMI"
              }
              else if(el.loanType=="F")
              {
                this.loanTypes="Fixed"
              }
              _data.push( this.loanTypes);
              _data.push( this.Date);
              _data.push(this.convertCurrency(el.sanctionedAmount));
              // _data.push(el.interest_Rate + ' %');
              _data.push(OSREC.CurrencyFormatter.format(el.interest_Rate, { currency: 'INR', symbol: ' ' }) + ' %');
              _data.push(this.convertCurrency(el.installmentAmount));
              this.interestCertificateDataanother.push(_data)
            });
             this.dwnldInterestCertificate();
            this.interestCertificateForm.reset();

          }
        }
        else {
          this.commonMethod.closePopup('div.popup-bottom.interest-popup');
        }
      });
    }
  }

  dwnldInterestCertificate() {
    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = 'assets/images/psb-logo-new.png';
    doc.addImage(img, 'png', 15, 16, 60, 15);
    doc.setLineWidth(0.2);
    doc.line(150, 10, 150, 40); // vertical line
    doc.setFontSize(10);

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

     doc.text("Branch Name : "+this.loanUserDtl.branch_name, pageWidth - 115, 20, 'left');
    var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
    doc.text(splitTitles, pageWidth - 115, 25, 'left');
    doc.setLineWidth(0.2);
    doc.line(90, 10, 90, 40); // vertical line
    doc.setFontSize(10);


    doc.text("Branch Code : "+this.branchCode, pageWidth -55, 20, 'left');
    doc.text("IFSC Code : "+this.loanUserDtl.ifscCode, pageWidth - 55, 25, 'left');
    doc.text("MICR Code : "+this.loanUserDtl.micrCode, pageWidth - 55, 30, 'left');
    doc.text("Telephone: "+this.loanUserDtl.phone_number, pageWidth - 55, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.setFont("Sakalbharati");
    doc.text("Loan Interest Certificate", pageWidth/2, 60, 'center');

    doc.setFontSize(10);
    doc.setFontType("normal");
    doc.setFont("Sakalbharati");
    // doc.text(this.datePipe.transform(new Date(), 'dd-MMM-yyyy'), 155, 65, 'left');
    doc.text(this.loanAccIssueDate, pageWidth - 60, 65, 'left');
    // doc.text(this.interestCertficate[0].custName, 15, 70, 'left');
    doc.text(this.intCertificate[0]?.customerName, 15, 75, 'left');
    doc.text(this.loanUserDtl?.branch_name, 15, 80, 'left');
    doc.text("Customer Id: "+this.intCertificate[0].customerId, 15, 85, 'left');
    doc.text("PAN: "+this.dataService.profiledateDetails[0].panNumber, 15, 90, 'left');
    doc.text("Dear Customer,", 15, 100, 'left');

    var reportTitle = "Please find below confirmation of the Interest collected against Loan Account Number "+this.selAccDtl.accountNo+" in the name of "+this.intCertificate[0].customerName+" "+this.intCertificate[0].JointHolderName1+ " " +this.intCertificate[0].JointHolderName2+ " " +this.intCertificate[0].JointHolderName1+" for the period " +this.startDate+ this.fromyear +" to "+ this.endDate+ this.toyear
    var splitTitle = doc.splitTextToSize(reportTitle, 180);
    doc.text(splitTitle, 15, 105, 'left');
       doc.setFontSize(10);
    var _columns = ["Loan Account Type", "Sanction Date", "Sanctioned Amount", "Rate of Interest", "Installment Amount"];
    var _rows = this.interestCertificateDataanother;
    console.log(_rows);

    doc.autoTable(_columns, _rows, {
      theme: 'grid', // 'striped', 'grid' or 'plain',
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      margin: { top: 115 },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        halign: 'center',
        horizontalPageBreak:true,
        font: "Sakalbharati"
      },
      columnStyles: {
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' ,halign: 'right' },
        3: { cellWidth: 'auto' ,halign: 'right' },
        4: { cellWidth: 'auto' ,halign: 'right' }
      }
    });

    doc.setFontSize(10);

    var reportTitle = "The loan Statistics for period "  +this.startDate+ this.fromyear + " "+ this.endDate+ this.toyear+" "+" are as below:"
    var splitTitle = doc.splitTextToSize(reportTitle, 200);
    doc.text(splitTitle, 15, 135, 'left');

    doc.setFontSize(10);
    var _columns = ["Opening Balance as on "+this.startDate+ this.fromyear, "Closing Balance as on " +this.endDate+ this.toyear];
    var _rows = this.interestCertificateData;
    // console.log(_rowsss);

    doc.autoTable(_columns, _rows, {
      theme: 'grid', // 'striped', 'grid' or 'plain',
      margin: { top: 180 },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        halign: 'center',
        horizontalPageBreak:true,
        font: "Sakalbharati"
      },
      columnStyles: {
        0: { cellWidth: 'auto',halign: 'right' },
        1: { cellWidth: 'auto' ,halign: 'right' },
      }
    });

    doc.setFontSize(10);
    doc.text("The breakup towards the principal and interest is given below: ", 15, 157, 'left');

    doc.setFontSize(10);
    var _columns = ["Recovery towards Principle ", "Recovery towards interest ","Penal Interest Charged during the period ","Total Recovery "];
    var _rows = this.interestCertificatetotalrecovry;
    console.log(_rows);

    doc.autoTable(_columns, _rows, {
      theme: 'grid', // 'striped', 'grid' or 'plain',
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      margin: { top: 230 },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        halign: 'center',
        horizontalPageBreak:true,
        font: "Sakalbharati"
      },
      columnStyles: {
        0: { cellWidth: "auto" ,halign: 'right' },
        1: { cellWidth: 40 ,halign: 'right' },
        2: { cellWidth: 40 ,halign: 'right' },
        3: { cellWidth: 40 ,halign: 'right' }
      }
    });

    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setLineWidth(0.1);
      doc.text('Please examine your receipt immediately on receipt. If no error is reported in the printed statement with in 15 days, the acount will be considered correct.', 15, 278, 'left')
      doc.text('This is computer generated statement and does not require any signature. ', 15, 281, 'left')
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth-15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }
    this.commonMethod.downloadPDF(doc, 'Loan_Interest-Certificate_XX'+ this.maskCharacter(this.selAccDtl?.accountNo, 4)+ '_' +this.todayDateTime);
  }

  dwnldBalanceCertificate(){
    this.balanceCertificateData = [];
    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.selectedAccountNo );
    console.log("selAccDtl ====>",selAccDtl);
    var param = this.myAccountInfoService.getBalanceCertificateParam(selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ISSUEBALANCECERTIFICATE).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.downloadBalCertDateOfIssue = resp.dateOfIssue;
        console.log('date of issue: ', this.downloadBalCertDateOfIssue);
        // this.commonMethod.closePopup('div.popup-bottom.balance-popup');
        // this.balanceCertificateForm.reset();
        console.log(data);
        if (data.hasOwnProperty("set")) {
          data.set.records.forEach(el => {
            console.log('element currency code: ', el.currencyCode);
            var currencySymbol = getCurrencySymbol(el.currencyCode, 'wide');
            console.log('currency symbol: ', currencySymbol);
            var _data = [];
            _data.push(selAccDtl[0].accountNo);
            _data.push(selAccDtl[0].accountHoldeType);
            _data.push(selAccDtl[0].accountDescription);
            _data.push(el.currencyCode);
            _data.push(el.availableBalance);
            this.balanceCertificateData.push(_data)
          });
          console.log('balance certificate array: ', this.balanceCertificateData);
          this.dwnldBalanceCertificatePdf();
          // this.balanceCertificateForm.reset();
        }
      }
      // else {
      //   this.commonMethod.closePopup('div.popup-bottom.balance-popup');
      // }
    });
  }

  convertCurrency(value) {
    return OSREC.CurrencyFormatter.format(value, { currency: 'INR', symbol: '₹' });
  }

  dwnldBalanceCertificatePdf() {

    var curDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');
    var curTime = this.datePipe.transform(new Date(), 'h:mm a');
    var curDateTime = this.datePipe.transform(new Date(), 'dd MMM yyyy hh:mm:ss a')
    console.log('current date: ', curDate);
    console.log('current time: ', curTime);
    console.log('current date time: ', curDateTime);
    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = 'assets/images/psb-logo-new.png';
    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line

    doc.setFontSize(7);
    doc.text("Branch Name : "+this.selAccDtl.branch_name, pageWidth - 110, 10, 'left');
    doc.text("Branch Code : "+this.selAccDtl.branchCode, pageWidth - 110, 15, 'left');
    doc.text("Branch Address : "+this.selAccDtl.BRANCHADDRESS, pageWidth - 110, 20, 'left');
    doc.text("Branch Contact : "+this.selAccDtl.phone_number, pageWidth - 110, 25, 'left');
    doc.text("IFSC : " +this.selAccDtl.ifscCode, pageWidth - 110, 30, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(20);
    doc.text("Balance Certificate (Account wise)", 20, 60, 'left');
    doc.setFontSize(10);
    doc.text(this.downloadBalCertDateOfIssue, pageWidth - 60, 60, 'left');

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 45, 'S');

    doc.setFontSize(15);
    doc.text("Account Name :"+ this.dataService.userDetails?.customerName, 20, 80, 'left');

    doc.setFontSize(10);
    var splitTitle = doc.splitTextToSize("Address : "+this.dataService.profileDetails[0].add1 +","+this.dataService.profileDetails[0].add2 +","+ this.dataService.custProfileStateCityObj.city +" "+ this.dataService.custProfileStateCityObj.state +" "+ this.dataService.profileDetails[0].pin, 150);
    doc.text(splitTitle, 20, 90, 'left');
    doc.text("Customer ID : "+ this.dataService.userDetails.cifNumber, 20, 100, 'left');

    doc.text("Dear Sir /Madam", 20, 130, 'left');
    doc.text("This is to certify that the undernoted balance /s in the account number "+ this.balanceCertificateData[0]['0'] +" of the", 20, 140, 'left');
    doc.text("Above mentioned is available as on date "+ this.downloadBalCertDateOfIssue.split(' ')[0] + " at :"+ this.downloadBalCertDateOfIssue.split(' ')[1], 20, 145, 'left');

    doc.setFontSize(7);
    var _columns = ["ACCOUNT NO", "Mode Of Operation", "Account Type", "Currency", "Available Balance"];
    var _rows = this.balanceCertificateData;
    console.log(_rows);

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    doc.autoTable(_columns, _rows, {
      theme: 'grid', // 'striped', 'grid' or 'plain',
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      margin: { top: 150 },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        halign: 'center',
        horizontalPageBreak:true,
        font: "Sakalbharati"
      },
      columnStyles: {
        1: { cellWidth: 'auto' },
        4: { cellWidth: 40, halign: 'right' }
      }
    });

    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setLineWidth(0.1);
      doc.text('This is computer generated statement and does not require any signature. ', 15, 281, 'left')
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth-15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

    this.commonMethod.downloadPDF(doc, 'Balance-Certificate_XX'+ this.maskCharacter(this.selAccDtl?.accountNo, 4)+ '_' +this.todayDateTime);
  }


  shareAccount(){
    this.showShare = !this.showShare ;
  }


  submitShare(){
    this.accountDetailsList = [];
    if(this.shareDtl.custName){
      this.accountDetailsList.push({ label: 'Customer Name',value: this.loanUserDtl?.accountName });
    }
    if(this.shareDtl.loanAccNo){
      this.accountDetailsList.push({ label: 'Loan Account Number',value: this.selAccDtl?.accountNo});
    }
    if(this.shareDtl.loanType){
      this.accountDetailsList.push({ label: 'Loan Type',value: this.selAccDtl?.accountType+ "-"+ this.selAccDtl?.schemeDescription});
    }
    if(this.shareDtl.accStatus){
      this.accountDetailsList.push({ label: 'Account Status',value: this.loanUserDtl?.accountStatus == "O" ? "Open" : "Close" });
    }
    if(this.shareDtl.branchAddress){
      this.accountDetailsList.push({ label: 'Branch Address',value: this.selAccDtl?.BRANCHADDRESS});
    }
    if(this.shareDtl.ifsc){
      this.accountDetailsList.push({ label: 'IFSC code',value: this.selAccDtl?.ifscCode});
    }
    if(this.shareDtl.loanOpenDate){
      this.accountDetailsList.push({ label: 'Loan Open Date',value: this.loanUserDtl?.accountOpenDate });
    }
    if(this.shareDtl.modeOfOpp){
      this.accountDetailsList.push({ label: 'Mode of Operation',value: this.selAccDtl?.accountHoldeType });
    }
    if(this.shareDtl.interestRate){
      this.accountDetailsList.push({ label: 'Interest Rate',value: this.loanUserDtl?.interest_Rate });
    }
    if(this.shareDtl.lrp){
      this.accountDetailsList.push({ label: 'Loan Repayment Period',value: this.loanUserDtl?.repaymentPeriodMonthsComponent + " Months" });
    }
    this.shareAccountDtl();
  }


  cancelShare(){
    this.showShare = false;
  }

  shareAccountDtl() {
    this.showShare = !this.showShare ;
    var details = this.getSelectedValues();
    if (this.constant.getPlatform() != "web") {
      window.plugins.socialsharing.share(details);
    }
    else {
      window.open('mailto:?subject=Account Details&body=' + details);
      //this.shareAccountDtl()
      // var details = "test";
      // window.open('https://www.facebook.com/sharer/sharer.php?u=' + details);
    }
  }

   /**
   * Get selected values from account details
   */
  getSelectedValues() {
    let selectedFields = "";
    this.accountDetailsList.forEach((customer, index) => {
      selectedFields += customer.label + " : " + customer.value + ", ";
    })
    return selectedFields.replace(/,\s*$/, "");
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    // return ('' + str).slice(0, -n).replace(/./g, "*")+ ('' + str).slice(-n);
    return str.slice(-n);
  }

  selectedrop(event)
  {

   console.log("selectedvalue",event.target.value);
   this.selectedate=event.target.value
   this.fromyear=this.selectedate.split('-')[0];
   this.toyear=Number(this.fromyear) + 1;
   console.log("fromyear",this.fromyear);
   console.log("toyear",this.toyear);
  }



}
