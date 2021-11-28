import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { MyAccountInfoService } from './my-account-info.service'
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { AccountType, FontBase64 } from '../../../../utilities/app-enum';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe, Location, getCurrencySymbol, TitleCasePipe } from '@angular/common';
import { MydepositeService } from '../my-deposits/mydeposite.service';
import { MyBorrowingService } from '../my-borrowings/my-borrowings.service';
declare var window: any;
declare var lienEnquiryModal: any;
declare var OSREC: any;
// declare var lienEnquiryModal:any;
declare var accountInfoModals: any;
declare var showToastMessage: any;

@Component({
  selector: 'app-my-accounts-info',
  templateUrl: './my-accounts-info.component.html',
  styleUrls: ['./my-accounts-info.component.scss']
})

export class MyAccountsInfoComponent implements OnInit,AfterViewInit {

  totalAccountList: any = [];
  selectedAccountNo: any;
  selAccDtl: any = {};
  selAvlBal: any;
  refreshDate: Date;
  miniStatement: any = [];
  fdminiStatement: any = [];
  accountDtls: any;
  accountDetailsList: any = [];
  pdfTransactionData: any = [];
  showListAccount: boolean = false;
  totalAvailableBalance: boolean = false;
  selectionValue: any = 'miniStatement';
  lienEnqData: any;
  interestCertificateData: any = [];
  balanceCertificateData: any = [];
  periodList: any;
  showShare : boolean = false;
  accountOpeningdate:any;
  Date:any;
  recordNotFound = '';
  interestCertificateForm: FormGroup;
  // balanceCertificateForm: FormGroup;
  depositsDtl: any={};
  assuredIntetest:any;
  maturityInstruction:any;
  downloadBalCertDateOfIssue: any;
  todayDateTime: any;
  depositAccType:any;
  dateOfBalanceCertificate : any ;
  mmidResult : any = '' ;
  currency: any;

   sanctionLimit;
   drawingPower;
   mmid ;
   drawingSanctionPower : any ; ;

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

  shareDtlFD:any = {
    'accStatue' : false,
    'accType' : false,
    'accScheme' : false,
    'accHolderName' : false,
    'openDate' : false,
    'maturityDate' : false,
    'tenure' : false,
    'interestRate' : false,
    'modeOfFDOpening' : false,
    'modeOfOpperation' : false,
    'payoutAmt' : false,
    'maturityInstruction' : false,
    'nonimeeDtl' : false,
  }
  branchCode:any=""

  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }

  constructor(
    private router: Router,
    public dataService: DataService,
    private form: FormBuilder,
    private myAccountInfoService: MyAccountInfoService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private commonMethod: CommonMethods,
    private location:Location,
    public datePipe : DatePipe,
    private mydepositeService : MydepositeService,
    private myBorrowingService : MyBorrowingService,
    private titlecasePipe:TitleCasePipe
  ) { }

  ngOnInit(): void {

   var width = $(window).width()
  //   alert (width)
    if(width < 767){
     this.showListAccount = true ;
    }
    this.dataService.setPageSettings('ACCOUNT_DETAILS');
    this.dataService.getBreadcrumb('ACCOUNT_DETAILS' , this.router.url)
    this.todayDateTime = this.datePipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    console.log(this.dataService.previousPageUrl);
    var prevUrl = this.constant.getPlatform() == 'web' ? 'myAccount' : 'myAccountMobile'
    history.pushState({}, prevUrl, this.location.prepareExternalUrl(prevUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    console.log("Customer account list::",this.dataService.customerAccountList);


    // this.dataService.changeMessage(this.commonPageComponent);
    //lienEnquiryModal();
    accountInfoModals();
    this.refreshDate = this.dataService.onRefreshDate;
    this.periodList = [
      {
        'year': '2021',
        'displayYear': '2020-2021'
      },
      {
        'year': '2020',
        'displayYear': '2019-2020'
      },
      {
        'year': '2019',
        'displayYear': '2018-2019'
      },
      {
        'year': '2018',
        'displayYear': '2017-2018'
      },
      {
        'year': '2017',
        'displayYear': '2016-2017'
      },
    ];
    this.buildForm();
    console.log('INR currency symbol: ', getCurrencySymbol('INR', 'wide'));
    var curDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');
    var curTime = this.datePipe.transform(new Date(), 'h:mm a');
    var curDateTime = this.datePipe.transform(new Date(), 'dd MMM yyyy hh:mm:ss a')
    console.log('current date: ', curDate);
    console.log('current time: ', curTime);
    console.log('current date time: ', curDateTime);
  }

  ngAfterViewInit(){
    this.getAccountList('onload');
    //this.dataService.nomineeBackUrl = this.router.url.substring(1);
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

  goToPage(routeName) {
    // if(routeName == 'closeFD' || routeName == 'closeRD') return;

    if(routeName == 'sendMoney' && this.selAccDtl?.Status != "Active"){
      this.commonMethod.openPopup('div.popup-bottom.inactive-account')
      return;
    }else if(routeName == 'sendMoney' && this.selAccDtl?.Status == "Active"){
      this.dataService.isFromAccountDetails = true;
    }

    if(routeName == 'lienEnquiry'){
      this.dataService.lienAccSel = this.selAccDtl;
    }
    this.dataService.fromAccountInfo = true;
    this.dataService.fromAccInfoAccNumber = this.selectedAccountNo;
    this.dataService.loanAccNo = this.selectedAccountNo;

    if(routeName == 'closeFD' || routeName == 'closeRD') {
      if(this.depositsDtl.account == 'ONLINE USE') {
        if(this.depositsDtl.accountStatus == 'O') {
          this.router.navigateByUrl('/' + routeName, {state : { account : this.selectedAccountNo, FDRDData: this.depositsDtl, accountDtls: this.accountDtls }});
        }
        else {
          this.commonMethod.openPopup('div.popup-bottom.closed-fd-rd-account')
        }
      }
      else {
        this.commonMethod.openPopup('div.popup-bottom.offline-fd-rd-account')
      }
    }
    else {
      this.router.navigateByUrl('/' + routeName, {state : { account : this.selectedAccountNo }});
    }
  }
  breadcrumroute(routeName){
    this.dataService.updateBreadcrumb(this.router.url , routeName)
    this.router.navigateByUrl('/' + routeName);
  }

  getAccountList(type?: any) {
    this.totalAccountList = [];

    if(this.dataService.accTypeSelected == "Operative")
    {
      this.totalAccountList = this.dataService.customerOperativeAccList;
    }
    else if(this.dataService.accTypeSelected == "Deposits")
    {
      this.totalAccountList = this.dataService.customerMyDepostie;
    }
    else if(this.dataService.accTypeSelected == "Borrowings")
    {
      this.totalAccountList = this.dataService.customerBorrowingsList;
    }

    if (type == 'onload') {
      this.selectedAccountNo = this.dataService.accDetails.accountNo;
      this.getSelectedAccount(this.selectedAccountNo);
      console.log('selected account no: ', this.selectedAccountNo);
    }
  }

  openAccountList(){
    this.commonMethod.openPopup('div.popup-bottom.sel-account');
  }

  getSelectedAccount(accNo) {

    this.commonMethod.closePopup('div.popup-bottom.sel-account');
    console.log(accNo);
    this.selectedAccountNo = accNo;
    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.selectedAccountNo);
    this.selAccDtl = selAccDtl[0];
    console.log('selAcc',this.selAccDtl);
    this.currency = getCurrencySymbol( this.selAccDtl?.currency , 'narrow')
    this.lienAccountData();
    this.dataService.fromAccInfoAccNumber = accNo;
    console.log('account type selected: ', this.dataService.accTypeSelected);
    if(this.dataService.accTypeSelected == "Operative"){

      this.AccountEnquiryDtl();
      this.getMiniStatement();
      this.balanceEnquiry();
      // console.log("acoooounnttsss ::: ", this.totalAccountList)
      this.getCashCreditAccountInquiry(accNo);
    }
    else{
      //for desposit
       this.AccountEnquiryDtl();
      this.DepositeAccountEnquery();
      this.getFDRDMiniStatement();
      //getAccType
      let selAcc = accNo
      if(selAcc.slice(4, 6) == "14" || selAcc.slice(4, 6) == "17"){ //"00501400002133" FD
        this.depositAccType = "FD";
      }
      else if(selAcc.slice(4, 6) == "15"){ //"00501500002183" RD
        this.depositAccType = "RD";
      }
    }
  }

  getCashCreditAccountInquiry(accno){
    var param = this.myAccountInfoService.getCashCreditHistory(accno);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CASHCREDITACCOUNTINQUIRY ).subscribe(data => {
      console.log("serviceName_CASHCREDITACCOUNTINQUIRY===>",data);
      this.fdminiStatement = [];
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {

        if (data.hasOwnProperty("set")) {
          this.sanctionLimit = data.set.records[0].SanctionLimit;
          this.drawingPower = data.set.records[0].DrawingPower;

        }
      }
    });

  }

  getMMIDGenerate(){
    let accno = this.dataService.fromAccInfoAccNumber ;
    var param = this.myAccountInfoService.getGenerateMMID(accno , this.accountDtls.ifscCode, this.accountDtls.customerName);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GENERATEMMID ).subscribe(data => {
      console.log("serviceName_GENERATEMMID===>",data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.commonMethod.openPopup('div.mmid-success')
        this.mmidResult = resp.Result ;
        this.mmid = resp.MMID ;
      }
    });

  }

  getMMIDCancel(){
    let accno = this.dataService.fromAccInfoAccNumber ;
    var param = this.myAccountInfoService.getCancelMMID(accno, this.accountDtls.ifscCode, this.accountDtls.customerName);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CANCLEMMID ).subscribe(data => {
      console.log("serviceName_CANCLEMMID===>",data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.commonMethod.openPopup('div.mmid-success')
        this.mmidResult = resp.Result ;
        this.mmid = '' ;
      }
    });
  }

  getFDRDMiniStatement(){
    var param = this.myBorrowingService.getMyLoansMiniStatement(this.selAccDtl.accountNo);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANMINISTATEMENT ).subscribe(data => {
        console.log("getMyLoansMiniStatement===>",data);
        this.fdminiStatement = [];
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          // if (data.hasOwnProperty("set")) {
          //   this.fdminiStatement = data.set.records;

          // }
          if (data.hasOwnProperty("set")) {
            this.fdminiStatement = data.set.records;
            if(data.set.records[0]['responseCode'] == "119"){
              this.recordNotFound = data.set.records[0]['CBS_RES_FAIL_MSG']
            }
            this.pdfTransactionData = [];
            this.fdminiStatement.forEach(el => {
              var crDr = el.creditDebitFlag == 'D' ? 'DR' : 'CR';
              var _data = [];
              _data.push(el.TransactionDate.split('-')[0]+"/"+el.TransactionDate.split('-')[1]+"/"+el.TransactionDate.split('-')[2]);
              _data.push(el.transactionDetails);
              _data.push(crDr);
              _data.push(this.convertCurrency(el.TransactionAmount));
              this.pdfTransactionData.push(_data);
              console.log(this.pdfTransactionData);
            });

            // this.fdminiStatement.forEach(element => {
            //   var finalDate = this.formatDate(element.TransactionDate);
            //   console.log('final date: ', finalDate);
            //   element.TransactionDate = finalDate;
            // });
          }
        }else {
          if (data.hasOwnProperty("set")) {
            var depositAccInfo = data.set.records;
            if(data.set.records[0]['responseCode'] == "119"){
              this.recordNotFound = depositAccInfo[0]['CBS_RES_FAIL_MSG']
            }
        }
      }
      });
  }

  onRefresh() {
    this.getSelectedAccount(this.selectedAccountNo);
  }


  balanceEnquiry() {
    this.drawingSanctionPower = ''
    console.log("selAccDtl =====>", this.selAccDtl);
    var param = this.myAccountInfoService.getBalEnqParam(this.selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log("baalance",data);
        if (data.hasOwnProperty("set")) {
          this.selAvlBal = data.set.records[0]
          console.log(this.totalAccountList)
          var objIndex = this.totalAccountList.findIndex(
            (obj) => obj.accountNo == this.selectedAccountNo
          );
          this.totalAccountList[objIndex].acctBalance = this.selAvlBal.ledgerBalance
          this.drawingSanctionPower = this.totalAccountList[objIndex].SchemeCode
            // alert(this.drawingSanctionPower)

        }
      }
      else {

      }
    });
  }

  getMiniStatement() {
    var param = this.myAccountInfoService.getMiniStatementParam(this.selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_MINISTATEMENT).subscribe(data => {
      console.log('accountInfoMiniStatement', data);
      var resp = data.responseParameter;
      this.miniStatement = [];
      if (resp.opstatus == "00") {
        console.log(data);
        if (data.hasOwnProperty("set")) {
          this.miniStatement = data.set.records;
          this.pdfTransactionData = [];
          this.miniStatement.forEach(el => {
            var crDr = el.creditDebitFlag == 'D' ? 'DR' : 'CR';
            var _data = [];
            _data.push(this.formatDate(el.TransactionDate));
            _data.push(el.transactionDetails);
            _data.push(crDr);
            _data.push(this.convertCurrency(el.TransactionAmount));
            this.pdfTransactionData.push(_data);
            console.log(this.pdfTransactionData);
          });

          this.miniStatement.forEach(element => {
            var finalDate = this.formatDate(element.TransactionDate);
            console.log('final date: ', finalDate);
            element.TransactionDate = finalDate;
          });
        }
      }
      else {

      }
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

  AccountEnquiryDtl() {
    var param = this.myAccountInfoService.getAccountEnquiryParam(this.selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
          this.branchCode = data.set.records[0]['001']
        console.log(data);
        if (data.hasOwnProperty("set")) {
          this.accountDtls = data.set.records[0];
          this.mmid = this.accountDtls.MMID ;
          console.log("MMMMMMIIIDDDD :::: ", this.mmid)
          console.log('Account DTLS ::: ', this.accountDtls)
          this.accountOpeningdate=data.set.records[0].statement.split(',')[3];
          console.log("Opening date::", this.accountOpeningdate);
          this.Date=this.openingDate()
          console.log("Date",this.openingDate());
          console.log("Account details::",this.accountDtls);
          //hardcoded for now need to be changed later
          if(this.accountDtls?.accountType == AccountType.SAVING_ACCOUNT){
            this.accountDtls.CurrentRateofInterest = "3* %";
          }
          else if(this.accountDtls?.accountType == AccountType.CURRENT_ACCOUNT ){
            this.accountDtls.CurrentRateofInterest = "00 %";
          }
          else if(this.accountDtls?.accountType == AccountType.CASH_CREDIT){
            this.accountDtls.CurrentRateofInterest = "-";
          }
          else if(this.accountDtls?.accountType == AccountType.OVER_DRAFT_ACCOUNT){
            this.accountDtls.CurrentRateofInterest = "-";
          }
        }
      }
      else {

      }
    });
  }
  applyppf(){
    // showToastMessage("Coming soon", "success");
  }
  openPopup(popUpName) {
    this.buildForm();
    switch (popUpName) {
      case 'lienEnquiry':
        // this.commonMethod.openPopup('div.lien-enquiry-popup');
        break;
      case 'balanceEnquiry':
        // this.balanceCertificateForm.patchValue({
        //   accNo: this.selectedAccountNo
        // });
        this.commonMethod.openPopup('div.balance-popup');
        break;
      case 'interestCertificate':
        this.interestCertificateForm.patchValue({
          accNo: this.selectedAccountNo
        });
        this.commonMethod.openPopup('div.interest-popup');
        break;
    }

  }

  _closePopUp(popup){
    this.commonMethod.closePopup(popup);
  }

  closePopUp() {
    this.commonMethod.closeAllPopup();
  }

  closeCertPopUp(type) {
    if(type == 'balanceCert') {
      // this.balanceCertificateForm.reset();
    }
    else if(type == 'interestCert') {
      this.interestCertificateForm.reset();
    }
    this.commonMethod.closeAllPopup();
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

  shareViaFb() {
    var details = this.getSelectedValues();
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + details);
  }

  lienAccountData() {
    var param = this.myAccountInfoService.getLienAccountParam(this.selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LIENACCOUNTENQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data);
        if (data.hasOwnProperty("set")) {
          this.lienEnqData = data.set.records[0];
          this.dataService.totalLienAmount = this.lienEnqData?.totalLienAmount
        }
      }
      else {

      }
    });
  }

  DepositeAccountEnquery() {
    let param =  this.mydepositeService.depositeAccountEquirey(this.selAccDtl.accountNo);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DEPOSITACCOUNTINQUIRY).subscribe(data => {
      console.log(data);
      console.log('Temp Deposite Data :: ');
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data);
        this.depositsDtl = data.set.records[0];
        console.log('depositsDtl: ', this.depositsDtl);
        this.dataService.fdrdNomineeName = resp.nomineeName;
        console.log('Nominee Name: ', this.dataService.fdrdNomineeName);
        this.depositsDtl.interest_Rate = parseFloat(this.depositsDtl.interest_Rate).toFixed(2);
        this.depositsDtl.accountOpenDate = this.setDate(this.depositsDtl.accountOpenDate);
        this.depositsDtl.maturityDate = this.setDate(this.depositsDtl.maturityDate);
        this.depositsDtl.depositPeriodMonthsComponent = parseInt(this.depositsDtl.depositPeriodMonthsComponent);
        this.assuredIntetest = parseFloat(this.depositsDtl?.accountClearBalance) - parseFloat(this.depositsDtl?.depositAmount);
        this.maturityInstruction = this.getMaturityInstruction(this.depositsDtl);
      }
      else {

      }
    });
  }

  setDate(date){
    var validDate;
    var urDate = date.match(/(\d{4})(\d{2})(\d{2})/);
    validDate = urDate[3]+"/"+urDate[2]+"/"+urDate[1];
    return validDate
  }

  /**
   *
   * @param print
   */

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
    doc.text("Branch Code : "+this.branchCode, pageWidth - 110, 15, 'left');
    var splitTitles = doc.splitTextToSize("Branch Address : "+this.accountDtls.BranchAddress, 80);
    doc.text(splitTitles, pageWidth - 110, 20, 'left');
    // doc.text("Branch Address : "+this.accountDtls.BranchAddress, pageWidth - 110, 20, 'left');
    doc.text("Branch Contact : "+this.accountDtls.phone_number, pageWidth - 110, 30, 'left');
    doc.text("IFSC : " +this.accountDtls.ifscCode, pageWidth - 110, 35, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(20);
    doc.text("Mini Statement", 20, 60, 'left');

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 55, 'S');

    doc.setFontSize(15);
    doc.text("Account Name :"+this.accountDtls?.customerName, 20, 80, 'left');
    doc.setFontSize(10);
    doc.text("Account Number : " +this.accountDtls.accountNo, 20, 90, 'left');
    doc.text("Account Type : " +this.selAccDtl?.accountDescription, 20, 95, 'left');
    var splitTitle = doc.splitTextToSize("Address : "+this.accountDtls.BranchAddress, 80);
    doc.text(splitTitle, 20, 100, 'left');
   // doc.text(, 20, 100, 'left');
    doc.text("Mode of Operation : "+this.selAccDtl.accountHoldeType, 20, 112, 'left');
    // doc.text("Nominee Registered : "+this.accountDtls?.NomanieName, 20, 115, 'left');
    if(this.dataService.accTypeSelected == 'Operative') {
      doc.text("Account Open Date : "+this.Date, 20, 117, 'left');
    } else {
      doc.text("Account Open Date : "+this.depositsDtl.accountOpenDate, 20, 117, 'left');
    }

    // doc.setLineWidth(0.5);
    // doc.line(pageWidth/2, 80, pageWidth/2, 110);

    doc.text("Customer ID : "+ this.dataService.userDetails.cifNumber, pageWidth - 100, 90, 'left');
    doc.text("Account Holder : "+this.accountDtls?.customerName, pageWidth - 100, 95, 'left');
    // doc.text("Address : ", pageWidth - 100, 100, 'left');
    // doc.text("Joint Holder : ", pageWidth - 100, 105, 'left');
    // doc.text("Nominee Name : "+this.accountDtls?.NomanieName, pageWidth - 100, 100, 'left');
    doc.text("Date : "+this.datePipe.transform(new Date(), 'dd/MM/yyyy'), pageWidth - 100, 100, 'left');



    doc.setFontSize(7);

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");



    var _columns = ["Transaction Date", "Transaction Reference", "CR/DR", "Amount (INR)"];
    var _rows = this.pdfTransactionData;
    console.log(_rows);

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
        font: "Sakalbharati"
      },
      columnStyles: {
        1: { cellWidth: 'auto' },
        3: { cellWidth: 40, halign: 'right' }
      }
    });
    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6);
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
      this.commonMethod.downloadPDF(doc, 'My-Account-Info_XX'+ this.maskCharacter(this.selectedAccountNo, 4)+ '_' +this.todayDateTime);
    }
  }

  listExpander(value) {
    switch (value) {
      case 'list':
        // this.showListAccount = !this.showListAccount;
        this.showListAccount = !this.showListAccount  ;
        // if(this.showListAccount){
        //   $('.shortlink-control.show-links').slideToggle();
        // }
        break;

      case 'balanceList':
        this.totalAvailableBalance = !this.totalAvailableBalance
        break;
    }

  }

  openSelectedAccountList(value) {
    this.selectionValue = value;
  }


  dnldInterestCertificate() {
    if (this.interestCertificateForm.valid) {
      //alert('in');
      this.interestCertificateData = [];
      var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.interestCertificateForm.value.accNo );
      var param = this.myAccountInfoService.getInterestCertificateParam(this.interestCertificateForm.value,selAccDtl);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_INTERESTCERTFORDEPOSITANDSAVING).subscribe(data => {
        //alert('inside');
        //console.log('correct');
        var resp = data.responseParameter;
        this.downloadBalCertDateOfIssue = resp.TransactionDate;
        if (resp.opstatus == "00") {
          console.log(data);
          if (data.hasOwnProperty("set")) {
            data.set.records.forEach(el => {
              var _data = [];
              _data.push(el.TransactionDate);
              _data.push(this.convertCurrency(el.interestAmt));
              _data.push(this.convertCurrency(el.tdsAmt));
              this.interestCertificateData.push(_data)
            });
            var intAmt = []
            var tdsAmt = []
            for(var i=0;i<this.interestCertificateData.length;i++)
            {
               intAmt.push(parseFloat(this.interestCertificateData[i][1].replace('₹','').replace(/,/g, '')))
               tdsAmt.push(parseFloat(this.interestCertificateData[i][2].replace('₹','').replace(/,/g, '')))
            }
            var newData = []
            newData.push('Total');
            newData.push(this.convertCurrency(intAmt.reduce(function(a, b) { return a + b; }, 0)))
            newData.push(this.convertCurrency(tdsAmt.reduce(function(a, b) { return a + b; }, 0)));
            this.interestCertificateData.push(newData)
            this.commonMethod.closeAllPopup()
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

    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.selectedAccountNo );

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
    img.src = this.constant.psbNewLogo;
    doc.addImage(img, 'png', 15, 16, 60, 15);
    doc.setLineWidth(0.2);
    // doc.line(150, 10, 150, 40); // vertical line

    doc.setFontSize(9);
    // doc.text( "Branch Name : "+this.selAccDtl.branch_name, pageWidth - 115, 20, 'left');
   // doc.text( doc.splitTextToSize("Branch Name : "+this.selAccDtl.branch_name,50) , pageWidth - 115, 20, 'left');
    // doc.text("Branch Code : "+this.selAccDtl.branchPinCode, pageWidth - 115, 20, 'left');
    var splitTitles = doc.splitTextToSize("Branch Address : "+this.accountDtls.BranchAddress, 50);
    doc.text(splitTitles, pageWidth - 115, 20, 'left');

    doc.setLineWidth(0.2);
    // doc.line(90, 10, 90, 40); // vertical line
    doc.setFontSize(9);

    // doc.text("Branch Code : "+this.branchCode, pageWidth -55, 20, 'left');
    // doc.text("IFSC Code : "+this.accountDtls.ifscCode, pageWidth - 55, 25, 'left');
    // doc.text("MICR Code : "+this.accountDtls.micrCode, pageWidth - 55, 30, 'left');
    // doc.text("Telephone: "+this.accountDtls.phone_number, pageWidth - 55, 35, 'left');

    // doc.text("Branch Address : "+this.accountDtls.BranchAddress, pageWidth - 110, 20, 'left');
    // doc.text("Branch Contact : "+this.accountDtls.phone_number, pageWidth - 110, 30, 'left');
    // doc.text("IFSC : " +this.accountDtls.ifscCode, pageWidth - 110, 35, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text("Interest Certificate", pageWidth/2, 60, 'center');


    doc.setFontSize(10);
    doc.setFontType("normal")
    // doc.text(this.downloadBalCertDateOfIssue.split(' ')[0], pageWidth - 15, 75, 'left');
    // doc.text(this.downloadBalCertDateOfIssue.split(' ')[1], pageWidth - 60, 80, 'left');

    doc.text(this.downloadBalCertDateOfIssue?.split(' ')[0], 155, 75, 'left');
    //doc.text(this.downloadBalCertDateOfIssue.split(' ')[1], 155, 80, 'left');

    doc.text(this.dataService.userDetails?.customerName, 15, 75, 'left');

    doc.text("Account Type : "+ this.selAccDtl?.accountType, 15, 80, 'left');
    doc.text("Account Number : "+ this.selectedAccountNo, 15, 85, 'left');
    doc.text("Mobile Number : "+ this.dataService.userDetails.MobileNo, 15, 90, 'left');
    doc.text("PAN Number: "+this.dataService.profiledateDetails[0]?.panNumber, 15, 95, 'left');
    var splitTitle = doc.splitTextToSize("Address : "+this.titlecasePipe.transform(this.dataService.profileDetails[0].add1 +","+this.dataService.profileDetails[0].add2 +"," +this.dataService.profileDetails[0].pin),90);
    doc.text(splitTitle, 15, 100, 'left');
    // doc.setLineWidth(0.1);
    // doc.rect(15, 70, doc.internal.pageSize.width - 30, 45, 'S');

    // doc.setFontSize(15);
    // doc.text("Account Name :"+ this.dataService.userDetails?.customerName, 20, 80, 'left');

    // doc.setFontSize(10);
    // doc.text("Address : "+this.dataService.profileDetails[0].add1 +" "+this.dataService.profileDetails[0].add2, 20, 90, 'left');

    // var splitTitle = doc.splitTextToSize("Address : "+this.accountDtls.BranchAddress, 150);
    // doc.text(splitTitle, 20, 90, 'left');

    // doc.text("Customer ID : "+ this.dataService.userDetails.cifNumber, 20, 100, 'left');

    var toDate = "01-01-"+(+this.interestCertificateForm.value.period.split('-')[0] + 1);
    var fromDate = "01-01-"+this.interestCertificateForm.value.period.split('-')[0]

    doc.text("Dear Customer,", 15, 113, 'left');
    var reportTitle = "The entry wise breakup of Interest Paid and TDS Deducted (if any) for deposit account "+ this.selectedAccountNo +"  during period "+ fromDate +" to " + toDate + " is as below: ";
    var splitTitle = doc.splitTextToSize(reportTitle, 180);
    doc.text(splitTitle, 15, 120, 'left');


    // doc.text("Dear Sir /Madam", 15, 100, 'left');
    // doc.text("This is to certify that the undernoted balance /s in the account number "+ this.balanceCertificateData[0] +" of the", 15, 100, 'left');
    // doc.text("above mentioned is available as on date "+ this.downloadBalCertDateOfIssue.split(' ')[0] + " at "+ this.downloadBalCertDateOfIssue.split(' ')[1], 15,105, 'left');

    doc.setFontSize(7);

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    var _columns = ["Date of Transaction", "Gross Interest Paid", "TDS Collected"];
    var _rows = this.interestCertificateData;
    console.log(_rows);

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

    this.commonMethod.downloadPDF(doc, 'Interest-Certificate_XX'+ this.maskCharacter(this.selectedAccountNo, 4)+ '_' +this.todayDateTime);

    // if(this.dataService.accTypeSelected == "Operative"){
    //   this.commonMethod.downloadPDF(doc, 'Balance-Certificate_XX'+ this.maskCharacter(this.accountDtls?.accountNo, 4)+ '_' +this.todayDateTime);
    // }
    // else {
    //   this.commonMethod.downloadPDF(doc, 'Balance-Certificate_XX'+ this.maskCharacter(this.selectedAccountNo, 4)+ '_' +this.todayDateTime);
    // }

  }

  dwnldBalanceCertificate(){
    this.balanceCertificateData = [];
    // var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.balanceCertificateForm.value.accNo );
    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.selectedAccountNo );
    console.log("selAccDtl ====>",selAccDtl);
    var param = this.myAccountInfoService.getBalanceCertificateParam(selAccDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ISSUEBALANCECERTIFICATE).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.commonMethod.closeAllPopup();
        this.downloadBalCertDateOfIssue = resp.dateOfIssue;
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
            _data.push(this.convertCurrency(el.ledgerBalance));
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
    doc.addImage(img, 'png', 15, 16, 60, 15);
    doc.setLineWidth(0.2);
    doc.line(150, 10, 150, 40); // vertical line

    doc.setFontSize(9);
    // doc.text( "Branch Name : "+this.selAccDtl.branch_name, pageWidth - 115, 20, 'left');
    doc.text( doc.splitTextToSize("Branch Name : "+this.selAccDtl.branch_name,50) , pageWidth - 115, 20, 'left');
    // doc.text("Branch Code : "+this.selAccDtl.branchPinCode, pageWidth - 115, 20, 'left');
    var splitTitles = doc.splitTextToSize("Branch Address : "+this.accountDtls.BranchAddress, 50);
    doc.text(splitTitles, pageWidth - 115, 30, 'left');

    doc.setLineWidth(0.2);
    doc.line(90, 10, 90, 40); // vertical line
    doc.setFontSize(9);

    doc.text("Branch Code : "+this.branchCode, pageWidth -55, 20, 'left');
    doc.text("IFSC Code : "+this.accountDtls.ifscCode, pageWidth - 55, 25, 'left');
    doc.text("MICR Code : "+this.accountDtls.micrCode, pageWidth - 55, 30, 'left');
    doc.text("Telephone: "+this.accountDtls.phone_number, pageWidth - 55, 35, 'left');

    // doc.text("Branch Address : "+this.accountDtls.BranchAddress, pageWidth - 110, 20, 'left');
    // doc.text("Branch Contact : "+this.accountDtls.phone_number, pageWidth - 110, 30, 'left');
    // doc.text("IFSC : " +this.accountDtls.ifscCode, pageWidth - 110, 35, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text("Balance Certificate (Account wise)", pageWidth/2, 60, 'center');


    doc.setFontSize(10);
    doc.setFontType("normal")
    // doc.text(this.downloadBalCertDateOfIssue.split(' ')[0], pageWidth - 15, 75, 'left');
    // doc.text(this.downloadBalCertDateOfIssue.split(' ')[1], pageWidth - 60, 80, 'left');

    doc.text(this.downloadBalCertDateOfIssue.split(' ')[0], 155, 75, 'left');
    //doc.text(this.downloadBalCertDateOfIssue.split(' ')[1], 155, 80, 'left');



    doc.text(this.dataService.userDetails?.customerName, 15, 75, 'left');
    doc.text(this.selAccDtl.branch_name, 15, 80, 'left');
    doc.text("Customer Id : "+this.dataService.userDetails.cifNumber, 15, 85, 'left');
    doc.text("PAN : "+this.dataService.profiledateDetails[0].panNumber, 15, 90, 'left');

    // doc.setLineWidth(0.1);
    // doc.rect(15, 70, doc.internal.pageSize.width - 30, 45, 'S');

    // doc.setFontSize(15);
    // doc.text("Account Name :"+ this.dataService.userDetails?.customerName, 20, 80, 'left');

    // doc.setFontSize(10);
    // doc.text("Address : "+this.dataService.profileDetails[0].add1 +" "+this.dataService.profileDetails[0].add2, 20, 90, 'left');

    // var splitTitle = doc.splitTextToSize("Address : "+this.accountDtls.BranchAddress, 150);
    // doc.text(splitTitle, 20, 90, 'left');

    // doc.text("Customer ID : "+ this.dataService.userDetails.cifNumber, 20, 100, 'left');
    doc.text("Dear Sir /Madam", 15, 100, 'left');
    var reportTitle = "This is to certify that the undernoted balance /s in the account number    "+ this.balanceCertificateData[0]['0'] +"  of the above mentioned is available as on date "+this.downloadBalCertDateOfIssue.split(' ')[0]+" at " + this.downloadBalCertDateOfIssue.split(' ')[1]
    var splitTitle = doc.splitTextToSize(reportTitle, 180);
    doc.text(splitTitle, 15, 105, 'left');


    // doc.text("Dear Sir /Madam", 15, 100, 'left');
    // doc.text("This is to certify that the undernoted balance /s in the account number "+ this.balanceCertificateData[0] +" of the", 15, 100, 'left');
    // doc.text("above mentioned is available as on date "+ this.downloadBalCertDateOfIssue.split(' ')[0] + " at "+ this.downloadBalCertDateOfIssue.split(' ')[1], 15,105, 'left');

    doc.setFontSize(7);

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    var _columns = ["ACCOUNT NO", "Mode Of Operation", "Account Type", "Currency", "Available Balance"];
    var _rows = this.balanceCertificateData;
    console.log(_rows);

    doc.autoTable(_columns, _rows, {
      theme: 'grid', // 'striped', 'grid' or 'plain',
      didDrawPage: function (data) {
        // Reseting top margin. The change will be reflected only after print the first page.
        data.settings.margin.top = 10;
      },
      margin: { top: 120 },
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

    this.commonMethod.downloadPDF(doc, 'Balance-Certificate_XX'+ this.maskCharacter(this.selectedAccountNo, 4)+ '_' +this.todayDateTime);

    // if(this.dataService.accTypeSelected == "Operative"){
    //   this.commonMethod.downloadPDF(doc, 'Balance-Certificate_XX'+ this.maskCharacter(this.accountDtls?.accountNo, 4)+ '_' +this.todayDateTime);
    // }
    // else {
    //   this.commonMethod.downloadPDF(doc, 'Balance-Certificate_XX'+ this.maskCharacter(this.selectedAccountNo, 4)+ '_' +this.todayDateTime);
    // }
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

  getMaturityInstruction(depositsDtl){
    var type ="";
    if(depositsDtl.autoClosureFlag == 'N' && depositsDtl.autoRenewalFlag == 'N'){
      type = "No Auto Renewal/No Auto Closure"
    }
    else if(depositsDtl.autoClosureFlag == 'Y' && depositsDtl.autoRenewalFlag == 'N'){
      type = "Auto Closure on Maturity"
    }
    else if(depositsDtl.autoClosureFlag == 'L' && depositsDtl.autoRenewalFlag == 'N'){
      type = "Limited Auto Renewal"
    }
    else if(depositsDtl.autoClosureFlag == 'U' && depositsDtl.autoRenewalFlag == 'N'){
      type = "Unlimited Auto Renewal"
    }

    return type;
  }

  //Nominee function
  getNomineeDetails(){

    this.selectedAccountNo = this.accountDtls?.accountNo;
    this.dataService.selectedNomineeAccNo = this.selectedAccountNo;
    var param = this.myAccountInfoService.getNomineeData(this.selectedAccountNo, this.dataService.userDetails.cifNumber);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_InquiryNomineeValidation).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log( "Nominneeeeeeeeee ka data:::::", data.set['records']);
        let nomineeData = data.set['records']

        if(nomineeData.length == 0){
          this.commonMethod.openPopup("div.add-nominee")
        }else{
          //this.dataService.nomineeOverViewPrevUrl =
          this.router.navigateByUrl('/' + 'nomineeOverview', {state : { account : this.selectedAccountNo }});
        }

      }
      else if (resp.opstatus == "03") {
        this.commonMethod.openPopup("div.add-nominee")
      }
    });
  }

  addNomineePopup(){
    this.dataService.selectedNomineeAccNo = this.selectedAccountNo;
    this.router.navigateByUrl('/' + 'addNomineeDetails', {state : { account : this.selectedAccountNo }});
  }

  close(){
    this.commonMethod.closeAllPopup() ;
  }

  cancelShare(type){
    this.showShare = false;
  }

  submitShare(type){
    this.accountDetailsList = [];
    if(type == 'Operative'){
      console.log(this.shareDtl);

      if(this.shareDtl.accNo){
        this.accountDetailsList.push({ label: 'Account Number',value: this.accountDtls?.accountNo});
      }
      if(this.shareDtl.accStatus){
        this.accountDetailsList.push({ label: 'Account Status',value: this.selAccDtl?.Status});
      }
      if(this.shareDtl.accType){
        this.accountDetailsList.push({ label: 'Account Type',value: this.selAccDtl?.accountType + "-" + this.selAccDtl?.schemeDescription});
      }
      if(this.shareDtl.branchAdd){
        this.accountDetailsList.push({ label: 'Branch Address',value: this.selAccDtl?.BRANCHADDRESS});
      }
      if(this.shareDtl.ifsc){
        this.accountDetailsList.push({ label: 'IFSC code',value: this.selAccDtl?.ifscCode});
      }
      if(this.shareDtl.interest){
        this.accountDetailsList.push({ label: 'Current Rate of Interest',value: this.accountDtls?.CurrentRateofInterest});
      }
      if(this.shareDtl.name){
        this.accountDetailsList.push({ label: 'Customer Name',value: this.accountDtls?.customerName });
      }
      if(this.shareDtl.custId){
        this.accountDetailsList.push({ label: 'Customer ID',value: this.accountDtls?.customerId });
      }
    }
    else{
      if(this.shareDtlFD.accNo){
        this.accountDetailsList.push({ label: 'FD Account Number',value: this.selAccDtl?.accountNo});
      }
      if(this.shareDtlFD.accStatue){
        this.accountDetailsList.push({ label: 'Account State',value: this.depositsDtl?.accountStatus == 'O' ? 'open' : 'closed'});
      }
      if(this.shareDtlFD.accType){
        this.accountDetailsList.push({ label: 'FD Account Type',value:this.depositsDtl?.accountType});
      }
      if(this.shareDtlFD.accScheme){
        this.accountDetailsList.push({ label: 'FD Account Scheme',value: this.depositsDtl?.accountCategory});
      }
      if(this.shareDtlFD.accHolderName){
        this.accountDetailsList.push({ label: 'Account Holder Name',value: this.depositsDtl?.accountName});
      }
      if(this.shareDtlFD.openDate){
        this.accountDetailsList.push({ label: 'Open Date',value: this.depositsDtl?.accountOpenDate});
      }
      if(this.shareDtlFD.maturityDate){
        this.accountDetailsList.push({ label: 'Maturity Date',value: this.depositsDtl?.maturityDate });
      }
      if(this.shareDtlFD.tenure){
        this.accountDetailsList.push({ label: 'Tenure',value: this.depositsDtl?.depositPeriodMonthsComponent});
      }
      if(this.shareDtlFD.interestRate){
        this.accountDetailsList.push({ label: 'Interest Rate',value: this.depositsDtl?.interest_Rate });
      }
      if(this.shareDtlFD.modeOfFDOpening){
        this.accountDetailsList.push({ label: 'Mode of FD Opening',value:this.depositsDtl?.account});
      }
      if(this.shareDtlFD.modeOfOpperation){
        this.accountDetailsList.push({ label: 'Mode of Operation',value: this.selAccDtl?.accountHoldeType });
      }
      if(this.shareDtlFD.payoutAmt){
        this.accountDetailsList.push({ label: 'Maturity Payout Amount',value: this.depositsDtl?.repaymentAccountNumber });
      }
      if(this.shareDtlFD.maturityInstruction){
        this.accountDetailsList.push({ label: 'Maturity Instructions',value: this.maturityInstruction });
      }
      if(this.shareDtlFD.nonimeeDtl){
        this.accountDetailsList.push({ label: 'Nominee Details',value: "-" });
      }
    }

    this.shareAccountDtl();
  }


  shareAccount(){
    this.showShare = !this.showShare ;
  }

  delinkAccount(){
    this.dataService.resetTransactionObj();
    this.dataService.request = '';
    let param = this.myAccountInfoService.delinkAccountParam(this.selectedAccountNo);
    this.dataService.endPoint = this.constant.serviceName_LINKDELINKACCOUNTS;
    this.dataService.request = param;
    // this.dataService.linkingMobileNumber = this.linkDelinkItem.MobileNo;
    this.dataService.authorizeHeader = 'DeLink Account';
    this.dataService.feedbackType = "delinkAccount"
    this.dataService.screenType = 'myAccountsInfo';
    this.dataService.otpSessionPreviousPage = "/delinkAccount";
    this.router.navigate(['/otpSession']);

  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    // return ('' + str).slice(0, -n).replace(/./g, "*")+ ('' + str).slice(-n);
    return str.slice(-n);
  }
  openFd(){
    this.router.navigate(['/openDeposit']);
  }

}
