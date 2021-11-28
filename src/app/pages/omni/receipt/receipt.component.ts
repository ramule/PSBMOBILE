import { CommonMethods } from './../../../utilities/common-methods';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from '../../../../app/services/data.service';
import { DatePipe, Location } from '@angular/common';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MyAccountInfoService } from '../my-accounts/my-accounts-info/my-account-info.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AccountType } from '../../../utilities/app-enum';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { FavoritepayeeService } from '../fund-transfer/favorite-payee/favoritepayee.service';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { BenificiaryService } from '../../upi/benificiary/benificiary.service';
import { OtherBankService } from '../fund-transfer/other-bank/other-bank.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var OSREC: any;
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  receiptType: any;
  freezereceiptType: any;
  receiptResp: any;
  billPayObj: any;
  receipdRefID: any;
  receiptmsg: any;
  maskAccountNo: any;
  todayDateTime: any;
  todayDateTime2:any;
  todayDateTimedisplay: any;
  totalAccountList: any = [];
  apyDataObj: any;
  information: "";
  branchcode:any;
  reqcheckbook:any;
  newdata:any
  refTransJson: any = [
    {
      'key': 'Transaction ID',
      'value': ''
    }
  ];


  withinBankPendingPayeeDetails: any = [];
  withinBankPayeeDetailsList: any = [];
  outsideBankPendingPayeeDetails: any = [];
  outsideBankPayeeDetailsList: any = [];
  mmidBankPendingPayeeDetails: any = [];
  mmidBankPayeeDetailsList: any = [];
  vpaBankPendingPayeeDetails: any = [];
  vpaBankPayeeDetailsList: any = [];
  withinBenificiaryList: any = [];
  outsideBenificiaryList: any = [];
  selfBenificiaryList: any = [];
  mmidBenificiaryList: any = [];
  vpaBenificiaryList: any = [];
  ownBenificiaryList: any = [];
  otherBenificiaryList: any = [];
  internationalBenificiaryList: any = [];


  tempMMIDPayeeList: any = [];
  tempSELFPayeeList: any = [];
  tempWITHINPayeeList: any = [];
  tempOUTSIDEPayeeList: any = [];
  tempVPAPayeeList: any = [];

  receiptFundTransferJson: any = [
    {
      'key': 'From Account',
      'value': ''
    },
    {
      'key': 'To Account',
      'value': ''
    },
    {
      'key': 'Payee Name',
      'value': ''
    },
    {
      'key': 'Amount',
      'value': ''
    },
    {
      'key': 'Remarks',
      'value': ''
    },
    {
      'key': 'Date',
      'value': ''
    },

  ];

  receiptFundTransferUPIJson: any = [
    {
      'key': 'UPI Id',
      'value': ''
    },
    {
      'key': 'To Payee',
      'value': ''
    },
    {
      'key': 'Payee Name',
      'value': ''
    },
    {
      'key': 'Amount',
      'value': ''
    },
    {
      'key': 'Remarks',
      'value': ''
    },
    {
      'key': 'Date',
      'value': ''
    }
  ];

  receiptApyJson: any = [
    {
      'key': 'Name',
      'value': ''
    },
    {
      'key': 'Date of Birth',
      'value': ''
    },
    {
      'key': 'Nominee Name',
      'value': ''
    },
    {
      'key': 'Debit Account',
      'value': ''
    },
    {
      'key': 'Pension Amount',
      'value': ''
    },
    {
      'key': 'Premium Frequency',
      'value': ''
    }
  ];

  receiptDonationJson: any = [
    {
      'key': 'From Account',
      'value': ''
    },
    {
      'key': 'Payee Name',
      'value': ''
    },
    {
      'key': 'To Account',
      'value': ''
    },
    {
      'key': 'Amount',
      'value': ''
    },
    {
      'key': 'Remarks',
      'value': ''
    },
    {
      'key': 'Date',
      'value': ''
    },

  ];


  receiptPhysicalCardJson: any = [
    {
      'key': 'DEBIT_CARD_NUMBER',
      'value': ''
    },
    {
      'key': 'LINK_ACCOUNT',
      'value': ''
    },
    {
      'key': 'CARD_TYPE',
      'value': ''
    }
  ];

  receiptReissueCardJson: any = [
    {
      'key': 'OLD_DEBIT_CARD_NUMBER',
      'value': ''
    },
    {
      'key': 'LINK_ACCOUNT',
      'value': ''
    }
  ];


  receiptBlockCardJson: any = [
    {
      'key': 'OLD_DEBIT_CARD_NUMBER',
      'value': ''
    },
    {
      'key': 'LINK_ACCOUNT',
      'value': ''
    },
    {
      'key': 'REASON_FOR_HOTLISTING',
      'value': ''
    }
  ];


  receiptChequeBookReqJson: any = [
    {
      'key': 'ACCOUNT_NUMBER',
      'value': ''
    },
    {
      'key': 'NUMBER_OF_LEAVES',
      'value': ''
    },
    {
      'key': 'DELIVERY_ADDRESS',
      'value': ''
    }
  ];

  receiptGeneratePINCardJson: any = [
    {
      'key': 'Card Number',
      'value': ''
    },
    {
      'key': 'Account Number',
      'value': ''
    },
    {
      'key': 'Card Type',
      'value': ''
    }
  ];

  receiptCardDetailsCardJson: any = [
    {
      'key': 'Card Variant',
      'value': ''
    },
    {
      'key': 'Account Number',
      'value': ''
    },
    {
      'key': 'Name On Card',
      'value': ''
    }
  ];

  receiptCardJson: any = [
    {
      'key': 'CARD_NUMBER',
      'value': ''
    },
    {
      'key': 'ACCOUNT_NO',
      'value': ''
    },
    {
      'key': 'OPERATION',
      'value': ''
    }
  ];

  addPayeeObj: any;
  positivePayObj: any;
  donationReceiptObj: any;
  physicalCardObj: any;
  reissueCardObj: any;
  hotlistCardObj: any;
  isFavourite: boolean = false;
  donationReceiptObjssss:any
  accountList:any = [];
  receiptName = "";
  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }
  headerdata = {
    'headerType': 'none',
    'titleName': '',
    'footertype': 'none'
  }
  constructor(
    public dataService: DataService,
    private router: Router,
    public constant: AppConstants,
    private location: Location,
    public commonMethod: CommonMethods,
    private myAccountInfoService: MyAccountInfoService,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private datepipe: DatePipe,
    private favouritePayeeService: FavoritepayeeService,
    private benificiaryService: BenificiaryService,
    private otherBankService: OtherBankService,
    public loader: pageLoaderService
  ) { }

  ngOnInit() {
    this.getBeneficiaryList();
    this.accountList = this.dataService.customerOperativeAccList.filter(
      (obj) =>(obj.accountType!='CAPPI')
    );
    console.log("accountList",this.accountList)
    this.branchcode = this.accountList[0].branchCode;
    console.log("branchcode",this.branchcode)
    this.todayDateTime = this.datepipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.todayDateTime2 = this.datepipe.transform(new Date(), 'dd MMM yyyy hh:mm a');
    if(this.dataService.screenType == 'donationTransfer' || this.dataService.screenType == 'donationTransfer' || this.dataService.screenType == 'debitCard' || this.dataService.screenType == 'reissuecard' ||  this.dataService.screenType == 'getPhysicalCard' || this.dataService.screenType == 'generatePin' || this.dataService.screenType == 'CardDetails' || this.dataService.screenType == 'blockCard'){
      this.donationReceiptObjssss = this.dataService.transactionReceiptObj?.accountNumber;
      this.AccountEnquiryDtl();
    }
    else if(this.dataService.screenType == 'instaPay')
    {
      this.donationReceiptObjssss = this.dataService.transactionReceiptObj?.from_acc
      this.AccountEnquiryDtl();
    }
    // else if(this.dataService.screenType == 'debitCard' || this.dataService.screenType == 'reissuecard' ||  this.dataService.screenType == 'getPhysicalCard' || this.dataService.screenType == 'generatePin' || this.dataService.screenType == 'CardDetails' || this.dataService.screenType == 'blockCard'){
    //   this.donationReceiptObjssss = this.dataService.transactionReceiptObj?.;
    //   this.AccountEnquiryDtl();
    // }

    if(this.dataService.receiptTransactionDate){
      this.todayDateTimedisplay = this.dataService.receiptTransactionDate
    }
    else{
      this.todayDateTimedisplay =  this.datepipe.transform(new Date(), 'dd MMM yyyy hh:mm a');
    }

    this.receiptName = this.dataService.screenType ? this.dataService.screenType : 'Receipt';

    this.totalAccountList = this.dataService.customerOperativeAccList;
    console.log('total account list: ', this.totalAccountList);
    this.receiptType = this.dataService.receiptType;
    this.refTransJson[0].value = this.dataService.receipdRefID;

    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    history.pushState({}, this.dataService.otpSessionPreviousPage, this.location.prepareExternalUrl(this.dataService.otpSessionPreviousPage));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.initialize();
  }

  initialize() {
    // this.dataService.setPageSettings('RECEIPT');
    this.totalAccountList = this.dataService.customerOperativeAccList;
    console.log('total account list: ', this.totalAccountList);
    this.receiptType = this.dataService.receiptType;
    this.receiptmsg = this.dataService.receiptmsg;
    console.log('receiptmsg',this.receiptmsg);
    this.reqcheckbook=this.dataService.reqcheqbookObj
    this.receipdRefID = this.dataService.transactionReceiptObj.type == 'vpa' ? this.dataService.transactionReceiptObj.rrn : this.dataService.receipdRefID;
    this.refTransJson[0].value = this.dataService.receipdRefID;
    this.receiptResp = this.dataService.transactionReceiptObj;


    this.maskAccountNo = this.commonMethod.maskAccNo(this.dataService.freezeReceiptObj.accountNumber);
    this.addPayeeObj = this.dataService.addPayeeObj;
    this.apyDataObj = this.dataService.apyObj;
    this.positivePayObj = this.dataService.positivePayReceiptObj
    this.donationReceiptObj = this.dataService.donationReceiptObj;
    this.physicalCardObj = this.dataService.physicalCardObj;
    this.reissueCardObj = this.dataService.reissuedCardObj;
    this.hotlistCardObj = this.dataService.hotlistCardObj;


    if (this.dataService.screenType == 'fundTransfer' && this.receiptResp.paymentType != 'self') {
      this.favourite();
    }
      if(this.receiptResp.isScheduled){
        this.receiptFundTransferJson= [
          {
            'key': 'From Account',
            'value': ''
          },
          {
            'key': 'To Account',
            'value': ''
          },
          {
            'key': 'Payee Name',
            'value': ''
          },
          {
            'key': 'Amount',
            'value': ''
          },
          {
            'key': 'Remarks',
            'value': ''
          },
          {
            'key': 'Date',
            'value': ''
          },
          {
            'key': 'Scheduled date',
            'value': ''
          },
          {
            'key': 'Scheduled Type',
            'value': ''
          }
        ];
      }

  }

  ngOnDestroy() {
    this.dataService.screenType = '';
    this.dataService.transactionReceiptObj.type = '';
    this.dataService.transactionReceiptObj.upiOmnifromAcc = '';
    this.dataService.fundTransferTabType = 'self';
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
  /**
   * Get selected values from account details
   */
  getValuesToSend() {
    let selectedFields = "";
    if (this.receiptResp.type == "vpa") {
      selectedFields += "UPI Id :" + this.receiptResp.payerAddr + ", ";
      selectedFields += "To Payee :" + this.receiptResp.payeeAddr + ", ";
    } else {
      selectedFields += "From Account :" + this.receiptResp.from_acc + ", ";
      selectedFields += "To Account :" + this.receiptResp.to_acc + ", ";
    }

    selectedFields += "Payee Name :" + this.receiptResp.payee_name + ", ";
    selectedFields += "Amount :"   +OSREC.CurrencyFormatter.format( this.receiptResp.amount, { currency: 'INR', symbol: 'INR' });", ";
    //  OSREC.CurrencyFormatter.format( this.receiptResp.amount, { currency: 'INR', symbol: 'INR' });
    selectedFields += "Remark :" + this.receiptResp.remarks + ", ";
    selectedFields += "Schedule Date :" + this.receiptResp.date + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

  goTofeedback() {
    this.router.navigate(['/feedback']);
  }
  gotoFundTransfer() {
    this.dataService.managePayeeToSend.selected = this.dataService.receiptBackPage;
    this.router.navigate(['/sendMoney']);
  }

  goBack() {
    if(this.dataService.screenType == 'debitCard' || this.dataService.screenType == 'reissuecard' ||  this.dataService.screenType == 'getPhysicalCard' || this.dataService.screenType == 'generatePin' || this.dataService.screenType == 'CardDetails' || this.dataService.screenType == 'blockCard'){
      this.router.navigateByUrl('/debitCards');
    }else{
      if (this.constant.getIsCordova() == "web"){
        this.router.navigateByUrl('/dashboard');
      }
      else{
        this.router.navigateByUrl('/dashboardMobile');
      }
    }
  }

  downloadReceipt(print?: any) {
    this.loader.showLoader();
    html2canvas(document.getElementById('receiptPDF'))
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.rect(20, 20, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 40, 'S');
        var img = new Image()
        img.src = 'assets/images/psb-logo-new.png';
        pdf.addImage(img, 'png', 100, 30, 100, 15);
        pdf.setFontSize(10);
        pdf.setFontStyle('italic');
        pdf.setTextColor(173, 170, 170);

        pdf.text("This is a system generated receipt, actual transaction is subject to realization", 147, pdf.internal.pageSize.height - 22, 'center');
        pdf.addImage(imgData, 'PNG', 34, 65, 230, 120);

        // pdf.save('download.pdf');

        if (print) {
          pdf.autoPrint();
          window.open(pdf.output('bloburl'));
        }
        else {
          this.loader.hideLoader();
          this.commonMethod.downloadPDF(pdf, 'Receipt');
        }
      });
  }
  AccountEnquiryDtl() {
    var param = this.myAccountInfoService.getAccountEnquiryParams(this.donationReceiptObjssss, this.branchcode);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log("Enqury",data);
       this.newdata=data.set.records
       console.log("datass",this.newdata[0].ifscCode)
      }
      else {

      }
    });
  }

  downloadPdfReceipt(type) {
    this.loader.showLoader();
    var pdfsize = 'a4';
    var doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    if (this.dataService.receiptType == this.constant.val_Successful) {
      var imgColor = 'success';
    }
    else {
      imgColor = 'failed';
    }

    if (this.dataService.screenType == 'fundTransfer') {

      if (this.receiptResp.type == "vpa") {
        var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.upiOmnifromAcc);
      } else {
        var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.from_acc);
      }
      console.log('selected account details : ', selAccDtl);
      if (this.receiptResp.type == "vpa") {
        this.receiptFundTransferUPIJson[0].value = this.receiptResp.payerAddr ? this.receiptResp.payerAddr : '-';
        this.receiptFundTransferUPIJson[1].value = this.receiptResp.payeeAddr ? this.receiptResp.payeeAddr : '-';
        this.receiptFundTransferUPIJson[2].value = this.receiptResp.payee_name ? this.receiptResp.payee_name : '-';
        this.receiptFundTransferUPIJson[3].value = this.receiptResp.amount ? this.receiptResp.amount.split('₹')[1] : '-';
        this.receiptFundTransferUPIJson[4].value = this.receiptResp.remarks ? this.receiptResp.remarks : '-';

        this.receiptFundTransferUPIJson[5].value = this.receiptResp.date ? this.datepipe.transform( new Date().toISOString(), 'dd MMM yyyy') : '-';
        if(this.receiptResp.isScheduled){
          this.receiptFundTransferUPIJson[6].value = this.receiptResp.scheduledDate ? this.receiptResp.scheduledDate  : '-';
          this.receiptFundTransferUPIJson[7].value = this.receiptResp.scheduledType ? this.receiptResp.scheduledType : '-';
        }
      } else {
        this.receiptFundTransferJson[0].value = this.receiptResp.from_acc ? this.receiptResp.from_acc : '-';
        this.receiptFundTransferJson[1].value = this.receiptResp.to_acc ? this.receiptResp.to_acc : '-';
        this.receiptFundTransferJson[2].value = this.receiptResp.payee_name ? this.receiptResp.payee_name : '-';
        this.receiptFundTransferJson[3].value = this.receiptResp.amount ? this.receiptResp.amount.split('₹')[1] : '-';
        this.receiptFundTransferJson[4].value = this.receiptResp.remarks ? this.receiptResp.remarks : '-';
        if(this.dataService.screenType == 'fundTransfer' || this.dataService.screenType == 'freezeAccount' || this.dataService.screenType == 'donationTransfer' || this.dataService.screenType == 'payemi' || this.dataService.screenType == 'vpa'){
          this.receiptFundTransferJson[5].value = this.todayDateTimedisplay;
        }
        else{
          this.receiptFundTransferJson[5].value = this.receiptResp.date ? this.datepipe.transform(new Date().toISOString(), 'dd MMM yyyy') : '-';
        }

        if(this.receiptResp.isScheduled){
          this.receiptFundTransferJson[6].value = this.receiptResp.scheduledDate ? this.receiptResp.scheduledDate  : '-';
          this.receiptFundTransferJson[7].value = this.receiptResp.scheduledType ? this.receiptResp.scheduledType : '-';
        }
      }



      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        { 'key': 'Branch Address', 'value': selAccDtl[0].BRANCHADDRESS },
        { 'key': 'Branch Contact', 'value': selAccDtl[0].phone_number },
        { 'key': 'IFSC', 'value': selAccDtl[0].ifscCode },
        // { 'key': 'Branch Address', 'value': this.newdata[0].BranchAddress },

        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
      ];
      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptResp.type == "vpa" ? this.receiptFundTransferUPIJson : this.receiptFundTransferJson, 'Fund Transfer', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
    }
    else if (this.dataService.screenType == 'donationTransfer') {
      //this.AccountEnquiryDtl();

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.accountNumber);
      this.receiptDonationJson[0].value = this.receiptResp.accountNumber;
      this.receiptDonationJson[1].value = this.receiptResp.payeeName;
      this.receiptDonationJson[2].value = this.receiptResp.to_acc;
      this.receiptDonationJson[3].value = this.receiptResp.amount.split('₹')[1];
      this.receiptDonationJson[4].value = this.receiptResp.remarks;
      this.receiptDonationJson[5].value = this.todayDateTime2
      var splitTitles = doc.splitTextToSize(" :"+ this.newdata[0].BranchAddress, 30);
      doc.text(splitTitles, pageWidth - 150, 25, 'left');
      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        // { 'key': 'Address', 'value': splitTitles },
        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].BranchAddress },
        // var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        // doc.text(splitTitles, pageWidth - 115, 25, 'left');
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null ? "" :  this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value':this.newdata == undefined || this.newdata == null ? "" :  this.newdata[0].ifscCode },
      ];



      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptDonationJson, 'Donation', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
    }

    else if (this.dataService.screenType == 'instaPay') {
      //this.AccountEnquiryDtl();

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.from_acc);
      this.receiptDonationJson[0].value = this.receiptResp.from_acc;
      this.receiptDonationJson[1].value = this.receiptResp.payee_name;
      this.receiptDonationJson[2].value = this.receiptResp.to_acc;
      this.receiptDonationJson[3].value = this.receiptResp.amount.split('₹')[1];
      this.receiptDonationJson[4].value = this.receiptResp.remarks;
      this.receiptDonationJson[5].value = this.todayDateTime2;
      if(this.newdata != undefined && this.newdata != null){
        var splitTitles = doc.splitTextToSize(" :"+ this.newdata[0].BranchAddress, 30);
        doc.text(splitTitles, pageWidth - 150, 25, 'left');
      }
      

      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        // { 'key': 'Address', 'value': splitTitles },
        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].BranchAddress },
        // var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        // doc.text(splitTitles, pageWidth - 115, 25, 'left');
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value':this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].ifscCode },
      ];



      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptDonationJson, 'InstaPay', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
    }
    else if (this.dataService.screenType == "apyOtpAuth") {

      console.log(this.totalAccountList);
      console.log(this.receiptResp.debitAcc);
      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.debitAcc);
      console.log('selected account details : ', selAccDtl);

      this.receiptApyJson[0].value = this.receiptResp.name;
      this.receiptApyJson[1].value = this.receiptResp.dob;
      this.receiptApyJson[2].value = this.receiptResp.nomineeName;
      this.receiptApyJson[3].value = this.receiptResp.debitAcc;
      this.receiptApyJson[4].value = this.receiptResp.pensionAmt;
      this.receiptApyJson[5].value = this.receiptResp.premiumFreq;

      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
      ];

      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptApyJson, 'APY', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    }else if(this.dataService.screenType == 'debitCard'){

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.accountNumber);

      this.receiptCardJson[0].value = this.receiptResp.cardNo;
      this.receiptCardJson[1].value = this.receiptResp.accountNo;
      this.receiptCardJson[2].value = this.receiptResp.operation;

      var splitTitles = doc.splitTextToSize(" :"+ this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress, 30);
      doc.text(splitTitles, pageWidth - 150, 25, 'left');
      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        // { 'key': 'Address', 'value': splitTitles },
        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress },
        // var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        // doc.text(splitTitles, pageWidth - 115, 25, 'left');
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].ifscCode },
      ];
      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptCardJson, 'Card', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);
 
    }else if(this.dataService.screenType == 'reissuecard'){

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.accountNumber);

      this.receiptReissueCardJson[0].value = this.receiptResp.MaskCardNumber;
      this.receiptReissueCardJson[1].value = this.receiptResp.AccountNo;

      var splitTitles = doc.splitTextToSize(" :"+ this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress, 30);
      doc.text(splitTitles, pageWidth - 150, 25, 'left');
      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        // { 'key': 'Address', 'value': splitTitles },
        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress },
        // var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        // doc.text(splitTitles, pageWidth - 115, 25, 'left');
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].ifscCode },
      ];
      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptReissueCardJson, 'Re Issue Card', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    }else if(this.dataService.screenType == 'getPhysicalCard'){

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.accountNumber);

      this.receiptPhysicalCardJson[0].value = this.receiptResp.cardNo;
      this.receiptPhysicalCardJson[1].value = this.receiptResp.AccountNo;
      this.receiptPhysicalCardJson[2].value = this.receiptResp.cardApplyType;

      var splitTitles = doc.splitTextToSize(" :"+ this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress, 30);
      doc.text(splitTitles, pageWidth - 150, 25, 'left');
      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        // { 'key': 'Address', 'value': splitTitles },
        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].BranchAddress },
        // var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        // doc.text(splitTitles, pageWidth - 115, 25, 'left');
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].ifscCode },
      ];
      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptPhysicalCardJson, 'Physical Card', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    }else if(this.dataService.screenType == 'generatePin'){

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.accountNumber);

      this.receiptGeneratePINCardJson[0].value = this.receiptResp.cardNo;
      this.receiptGeneratePINCardJson[1].value = this.receiptResp.AccountNo;
      this.receiptGeneratePINCardJson[2].value = this.receiptResp.cardType;

      var splitTitles = doc.splitTextToSize(" :"+ this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress, 30);
      doc.text(splitTitles, pageWidth - 150, 25, 'left');
      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        // { 'key': 'Address', 'value': splitTitles },
        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress },
        // var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        // doc.text(splitTitles, pageWidth - 115, 25, 'left');
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].ifscCode },
      ];
      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptGeneratePINCardJson, 'Generate PIN', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    }else if(this.dataService.screenType == 'CardDetails'){

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.accountNumber);

      this.receiptCardDetailsCardJson[0].value = this.receiptResp.cardVariant;
      this.receiptCardDetailsCardJson[1].value = this.receiptResp.accountNumber;
      this.receiptCardDetailsCardJson[2].value = this.receiptResp.name;

      var splitTitles = doc.splitTextToSize(" :"+ this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress, 30);
      doc.text(splitTitles, pageWidth - 150, 25, 'left');
      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        // { 'key': 'Address', 'value': splitTitles },
        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress },
        // var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        // doc.text(splitTitles, pageWidth - 115, 25, 'left');
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].ifscCode },
      ];
      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptCardDetailsCardJson, 'Card Details', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    }else if(this.dataService.screenType == 'blockCard'){

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.accountNumber);

      this.receiptBlockCardJson[0].value = this.receiptResp.MaskCardNumber;
      this.receiptBlockCardJson[1].value = this.receiptResp.AccountNo;
      this.receiptBlockCardJson[2].value = this.receiptResp.reason;

      var splitTitles = doc.splitTextToSize(" :"+ this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress, 30);
      doc.text(splitTitles, pageWidth - 150, 25, 'left');
      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        // { 'key': 'Address', 'value': splitTitles },
        // { 'key': 'Branch Contact', 'value': this.newdata[0].phone_number },
        // { 'key': 'IFSC', 'value':this.newdata[0].ifscCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress },
        // var splitTitles = doc.splitTextToSize("Address : "+this.loanUserDtl.BRANCHADDRESS, 50);
        // doc.text(splitTitles, pageWidth - 115, 25, 'left');
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value': this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].ifscCode },
      ];
      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptBlockCardJson, 'Block Card', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    }else if(this.dataService.screenType == 'chequeBookRequest'){

      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.receiptResp.accNumber);

      this.receiptChequeBookReqJson[0].value = this.receiptResp.accNumber;
      this.receiptChequeBookReqJson[1].value = this.receiptResp.checkPageNo;
      this.receiptChequeBookReqJson[2].value = this.receiptResp.commAddress;

      var splitTitles = doc.splitTextToSize(" :"+ this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress, 30);
      doc.text(splitTitles, pageWidth - 150, 25, 'left');
      var branchJSON = [
        { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
        { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
        { 'key': 'Branch Address', 'value': this.newdata == undefined || this.newdata == null  ? "" : this.newdata[0].BranchAddress },
        { 'key': 'Branch Contact', 'value': this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].phone_number },
        { 'key': 'IFSC', 'value': this.newdata == undefined || this.newdata == null ? "" : this.newdata[0].ifscCode },
      ];
      this.loader.hideLoader();
      this.commonMethod.generatePDF(imgColor, this.receiptType, this.dataService.receiptmsg, this.refTransJson, this.receiptChequeBookReqJson, 'Chequebook request', branchJSON, type, selAccDtl[0].accountNo, this.todayDateTime);

    }

  }


  addAndDeleteFav() {
    if (this.receiptResp.type == "vpa") {
      this.addPayeeToFavorite()
    } else {
      if (this.isFavourite) {
        this.deleteFavourite();
      }
      else {
        this.saveAsFavorite();
      }
    }

  }

  saveAsFavorite() {
    this.closePopup('fav-popup');
    var param = this.favouritePayeeService.AddfavouritePayee(this.receiptResp.payee_id, this.receiptResp.paymentType);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceNmae_ADDFAVORITETRANSACTIONS).subscribe((data) => {
      var resp = data.responseParameter;
      if (resp.opstatus == '00') {
        this.isFavourite = !this.isFavourite;
        this.information = resp.Result;
        this.commonMethod.openPopup('div.popup-bottom.show-fav-info');
      } else {
      }
    });

  }

  favourite() {
    var param = this.favouritePayeeService.getFavouritePayee();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceNmae_GETFAVORITETRANSACTIONS).subscribe((data) => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        var selPayee = data.set.records.filter(obj => obj.ID == this.receiptResp.payee_id);
        if (selPayee) { this.isFavourite = true; } else { this.isFavourite = false; }
        console.log(selPayee);
        //this.favroutelist = data.set['records'];
      }
      else {
      }
    })
  }


  deleteFavourite() {
    this.closePopup('fav-popup');
    var param = this.favouritePayeeService.DeletefavouritePayee(this.receiptResp.payee_id, this.receiptResp.paymentType);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceNmae_DELETEFAVORITETRANSACTIONS).subscribe((data) => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == '00') {
        this.isFavourite = !this.isFavourite;
        this.information = resp.Result;
        this.commonMethod.openPopup('div.popup-bottom.show-fav-info');
      } else {
      }
    });
  }

  /**
   * Api call for adding payee as favorite payee
   */
  addPayeeToFavorite() {
    this.isFavourite = !this.isFavourite;
    let favorite = this.isFavourite ? 'Y' : 'N';
    let addBenificiary: AddBenificiary = new AddBenificiary().deserialize({ isFavourite: favorite, payeeName: this.dataService.validateAddressResp.MASKNAME, nickName: this.dataService.validateAddressResp.MASKNAME, payeeVPA: this.dataService.validateAddressResp.validatedVpa });
    // this.benificiaryService.getUserLocation();
    var isMMid = false, isAccIFsc = false, isVPA = false;
    if (this.dataService.verifyAddressResp.payType == "MMID") {
      isMMid = true;
    } else if (this.dataService.verifyAddressResp.payType == "BNK_ACT") {
      isAccIFsc = true;
    } else {
      isVPA = true;
    }
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary, isAccIFsc, isVPA, isMMid);
    // this.closePopup('fav-popup');
    this.UpiApiCall(reqParams);
  }

  /**
  * Common Api Call for collect
  * @param request
  */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, false, { showErrorPopup: false }).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ADDBENIFICIARY:
            console.log('favorite ' + this.isFavourite ? 'added' : 'removed')
            this.information = response.msg;
            this.commonMethod.openPopup('div.popup-bottom.show-fav-info');
            break;
          default:
            break;
        }
      } else {
        // showToastMessage(data.msg, "error");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  /**
   * Download Image in desktop
   * @param name
   * @param type
   */
  downloadPdf() {
    if (this.dataService.isCordovaAvailable) {
      var self = this;
      //   var options = {
      //     documentSize: 'A4',
      //     type: 'base64'
      // };
      // The name of your file, note that you need to know if is .png,.jpeg etc
      var filename = this.receiptName + "_" + Date.now() + '.png';
      console.log('filename', filename);
      let section = document.querySelector('#receiptPDF');

      if (self.dataService.platform.toLowerCase() == self.constant.val_android) {
        self.commonMethod.savePDFInDevice(section, filename);
      } else if (self.dataService.platform.toLowerCase() == self.constant.val_ios) {
        self.commonMethod.takeScreenshot();
      } else {
        console.log("Unknown Platform...");
      }
    }
  }

  /**
  * Share Receipt via available methods in device
  */
  shareReceipt() {
    if (this.dataService.isCordovaAvailable) {
      var filename = this.receiptName + "_" + Date.now();
      let section = document.querySelector('#receiptPDF');
      // if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.commonMethod.shareImageInDevice(section, filename);
      // } else if(this.DataService.platform.toLowerCase() == this.constant.val_ios){
      // this.commonMethod.takeScreenshot();
      // } else {
      // console.log("Unknown Platform...");
      // }
    }
  }

  openPopup(popup) {
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }

  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }

  goToAddPayee(){

    this.dataService.previousPageUrl = 'instantPay';
    this.dataService.managePayeeToAddpayee = 'within';

    this.dataService.fromInstantPay = true;
    this.dataService.isEditPayee = false;
    this.dataService.withinBankPayeeList  = [ ...this.withinBankPayeeDetailsList , ...this.withinBankPendingPayeeDetails ]
    this.dataService.outsideBankPayeeList  = [ ...this.outsideBankPayeeDetailsList , ...this.outsideBankPendingPayeeDetails ]
    this.dataService.mmidBankPayeeList  = [ ...this.mmidBankPayeeDetailsList , ...this.mmidBankPendingPayeeDetails ]
    this.dataService.vpainBankPayeeList  = [ ...this.vpaBankPayeeDetailsList , ...this.vpaBankPendingPayeeDetails ]

    this.router.navigateByUrl('/addPayee');
  }


  getBeneficiaryList() {
    var param = this.otherBankService.benificiaryListParam();
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_BENIFICIARYLIST
      )
      .subscribe((data) => {
        console.log(data);

        let payeeDetailsListData = data.set['records'];
        console.log('Temp Manage beneficiary Data :: ', payeeDetailsListData);

        this.dataService.beneficiaryList.payeeAccNumber =
          payeeDetailsListData.ID;

        // Payee List Data Collection
        this.getBeneficiaryListData(payeeDetailsListData);

        var resp = data.responseParameter;
        // this.ownBenificiaryList =[];

        // console.log("own",this.ownBenificiaryList)

        // this.otherBenificiaryList= [];

        // console.log("otherBenificiaryList",this.otherBenificiaryList)
        // this.internationalBenificiaryList=[];

        // console.log("internationalBenificiaryList",this.internationalBenificiaryList)
        if (resp.opstatus == '00') {
          /****** Beneficiary list is categorised on the basis of type  ******/
          // data.set.records.forEach(el => {
          //   if (el.beneficiaryType == "INTRA") {
          //     this.ownBenificiaryList.push(el);
          //     console.log(el);
          //   }
          //   else if (el.beneficiaryType == "INTER" || el.beneficiaryType == "INTERBANK" ) {
          //     this.otherBenificiaryList.push(el);
          //     console.log(el);
          //   }
          //   else if(el.beneficiaryType == "INTERNATIONAL"){
          //     this.internationalBenificiaryList.push(el);
          //     console.log(el);
          //   }
          // });

          console.log(this.ownBenificiaryList.length);
          /******* configure pagination ******/
          // this.ownPaginateConfig = {
          //   id: 'own',
          //   itemsPerPage: this.ownmaxselrow,
          //   currentPage: 1,
          //   totalItems: this.ownBenificiaryList.length,
          // };
          // this.otherPaginateConfig = {
          //   id: 'other',
          //   itemsPerPage: this.othermaxselrow,
          //   currentPage: 1,
          //   totalItems: this.otherBenificiaryList.length,
          // };
          // this.interPaginateConfig = {
          //   id: 'inter',
          //   itemsPerPage: this.intermaxselrow,
          //   currentPage: 1,
          //   totalItems: this.internationalBenificiaryList.length,
          // };
        } else {
          // this.errorCallBack(data.subActionId, resp);
        }
      });
  }

    //Collecting data for all beneficiary of different types mode
    getBeneficiaryListData(payeeDetailsListData) {
      this.withinBankPendingPayeeDetails = [];
      this.withinBankPayeeDetailsList = [];
      this.outsideBankPendingPayeeDetails = [];
      this.outsideBankPayeeDetailsList = [];
      this.mmidBankPendingPayeeDetails = [];
      this.mmidBankPayeeDetailsList = [];
      this.vpaBankPendingPayeeDetails = [];
      this.vpaBankPayeeDetailsList = [];

      for (let i = 0; i < payeeDetailsListData.length; i++) {
        //Within Bank
        if (
          payeeDetailsListData[i]['statusId'] == '8' &&
          payeeDetailsListData[i]['beneficiaryType'] == 'INTRA'
        ) {
          this.withinBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
        }
        if (
          payeeDetailsListData[i]['statusId'] == '3' &&
          payeeDetailsListData[i]['beneficiaryType'] == 'INTRA'
        ) {
          this.withinBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
        }

        //Outside Bank
        if (
          payeeDetailsListData[i]['statusId'] == '8' &&
          payeeDetailsListData[i]['beneficiaryType'] == 'INTERBANK'
        ) {
          this.outsideBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
        }
        if (
          payeeDetailsListData[i]['statusId'] == '3' &&
          payeeDetailsListData[i]['beneficiaryType'] == 'INTERBANK'
        ) {
          this.outsideBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
        }

        //mmid Bank
        if (
          payeeDetailsListData[i]['statusId'] == '8' &&
          payeeDetailsListData[i]['MMID'] != 'null'
        ) {
          this.mmidBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
        }
        if (
          payeeDetailsListData[i]['statusId'] == '3' &&
          payeeDetailsListData[i]['MMID'] != 'null'
        ) {
          this.mmidBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
        }
        //Vpa Bank
        if (
          payeeDetailsListData[i]['statusId'] == '8' &&
          payeeDetailsListData[i]['VPA'] != 'null'
        ) {
          this.vpaBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
        }
        if (
          payeeDetailsListData[i]['statusId'] == '3' &&
          payeeDetailsListData[i]['VPA'] != 'null'
        ) {
          this.vpaBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
        }
      }

      this.withinBankPendingPayeeDetails =
        this.withinBankPendingPayeeDetails.filter(
          (obj) =>
            !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
        );
      this.withinBankPayeeDetailsList = this.withinBankPayeeDetailsList.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.outsideBankPendingPayeeDetails =
        this.outsideBankPendingPayeeDetails.filter(
          (obj) =>
            !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
        );
      this.outsideBankPayeeDetailsList = this.outsideBankPayeeDetailsList.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.mmidBankPendingPayeeDetails = this.mmidBankPendingPayeeDetails.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.mmidBankPayeeDetailsList = this.mmidBankPayeeDetailsList.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.vpaBankPendingPayeeDetails = this.vpaBankPendingPayeeDetails.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.vpaBankPayeeDetailsList = this.vpaBankPayeeDetailsList.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );

      console.log(
        'Within PendingPayeeList :: ',
        this.withinBankPendingPayeeDetails
      );
      console.log('Within PayeeDetailsList :: ', this.withinBankPayeeDetailsList);
      console.log(
        'Outside PendingPayeeList :: ',
        this.outsideBankPendingPayeeDetails
      );
      console.log(
        'Outside PayeeDetailsList :: ',
        this.outsideBankPayeeDetailsList
      );
      console.log(
        'mmid PendingPayeeDetailsList :: ',
        this.mmidBankPendingPayeeDetails
      );
      console.log('mmid PayeeDetailsList :: ', this.mmidBankPayeeDetailsList);
      console.log(
        'vpa PendingPayeeDetailsList :: ',
        this.vpaBankPendingPayeeDetails
      );
      console.log('vpa PayeeDetailsList :: ', this.vpaBankPayeeDetailsList);

      this.tempMMIDPayeeList = this.mmidBankPayeeDetailsList;
      this.tempVPAPayeeList = this.vpaBankPayeeDetailsList;
      this.tempWITHINPayeeList = this.withinBankPayeeDetailsList;
      this.tempOUTSIDEPayeeList = this.outsideBankPayeeDetailsList;

      // this.searchFilter();
    }

  /**
*
* @param routeName
*/
  navigate(routeName: string) {
    this.dataService.routeWithNgZone(routeName);
  }

}
