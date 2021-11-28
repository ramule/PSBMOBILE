import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from '../../dashboard/dashboard.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { AppConstants } from '../../../../app.constant';
import { DataService } from '../../../../services/data.service';
import { PrintingService } from '../../../../services/print.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare function cardCarousel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  transactionList = [];
  ShareViaList = [];
  @ViewChild('printEl') printEl: ElementRef;
  showAccountDetails = false;
  accountCarouselOptions: OwlOptions;
  setHeader:any;
  title:string="";
  accountList = [];
  accountDetailsList = [];
  selectedAccount:any;

  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'dt-sample3',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  }

  // commonPageComponent = {
  //   'headerType': 'innerHeader',
  //   'sidebarNAv': 'OmniNAv',
  //   'footer': 'innerFooter',
  // }

  constructor(private http: HttpRestApiService,
    public commonMethod: CommonMethods,
    private accountDetailService: DashboardService,
    private constant: AppConstants, public dataService: DataService,
    private storage: LocalStorageService,
    private dashboardService: DashboardService,
    private printingService: PrintingService,
    private exportAsService: ExportAsService,
    private router: Router,
    private translate : TranslatePipe
  ) { }

  ngOnInit() {

    this.Initialize();
    this.dataService.setPageSettings('Account Details');

  }



  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, 'account statement').subscribe(() => {
      // save started
      console.log("save started");
      $('#downloadTransaction').modal('hide');
    });
  }

  pdfCallbackFn (pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

  downloadPopup(){
    $('#downloadTransaction').modal('show');
  }

  breadcrumroute(routeName){
    this.dataService.updateBreadcrumb(this.router.url , routeName)
    this.router.navigateByUrl('/' + routeName);
  }


  /**
   *
   * For Initiialization this function is called
   */
  Initialize() {
    this.dataService.setPageSettings('ACCOUNT_DETAILS');
    this.dataService.getBreadcrumb('ACCOUNT_DETAILS' , this.router.url)

    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    //account Details new design
    console.log(this.dataService.customerCanTransferAccountList);
    this.accountList = this.dataService.customerCanTransferAccountList
    this.getAccountDetails(this.dataService.accDetails.accountNumber);
    // var transactionParam = this.accountDetailService.getTransactionParam(this.dataService.accDetails.accountNumber);
    // this.getTransactionHistory(transactionParam);

    let accountDetailsLists = this.dataService.getAccountListByAccountType(this.dataService.accDetails);
    this.accountDetailsList = accountDetailsLists.map((accDetails)=>{
      accDetails.label = this.translate.transform(accDetails.label);
      return accDetails;
    })

    //old account details design
    // console.log(this.dataService.accDetails);
    // this.setHeader = this.dataService.accDetails.accountType;
    // this.title = this.setHeader == 'SAVING' ? 'SAVING_ACC' : this.setHeader == 'CURRENT' ? 'CURRENT_ACC' : this.setHeader == 'FIXED DEPOSIT' ? 'FIX_DEPOSIT' : this.setHeader == 'RECURRING DEPOSIT' ? 'RECURRING_DEPOSIT' : this.setHeader == 'TERM DEPOSIT' ? 'TERM_DEPOSIT':'';
    // this.dataService.setPageSettings(this.title);
    // this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();
    // var transactionParam = this.accountDetailService.getTransactionParam(this.dataService.accDetails.accountNumber);
    // this.getTransactionHistory(transactionParam);
    // this.setShareLists();
  }


  getAccountDetails(account){
    this.accountList.forEach((el)=>{
      if(el.accountNumber == account){
        console.log("get account details====>",el);
        this.selectedAccount = el;
        this.accountDetailsList = [];
        var transactionParam = this.accountDetailService.getTransactionParam(this.selectedAccount.accountNumber);
        this.getTransactionHistory(transactionParam);
        let accountDetailsLists = this.dataService.getAccountListByAccountType(el);
        this.accountDetailsList = accountDetailsLists.map((accDetails)=>{
          accDetails.label = this.translate.transform(accDetails.label);
          return accDetails;
        })
      }
    })
  }


  gotoDetailStatement(){
    this.router.navigateByUrl('/detailedStatement');
  }

  gotoFundtransfer(){
    this.router.navigateByUrl('/ownBanks');
  }


  refreshDetails(){
    this.getBalanceEnquiry(this.dataService.accDetails.accountNumber);
  }

  /**
   * This function is called to get the particular object updated from array
   */
  getBalanceEnquiryObj(array, obj) {
    return array.find(i => i.accountNumber == obj.accountNumber);
  }


  /**
   * This function is called when refresh icon is clicked to check the balance
   * @param customerAccDetails
   * @param index
   */
  getBalanceEnquiry(customerAccDetails) {
    let balEnquiryReq = this.accountDetailService.getBalEnqParam(customerAccDetails);
    this.http.callBankingAPIService(balEnquiryReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEENQUIRY).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      this.dataService.customerCanTransferAccountList = [];
      this.dataService.totalSaving = 0;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        data.set.records.forEach(el => {
          if(el.accountCategory == "SAVING" || el.accountCategory == "CURRENT" || el.accountCategory == "OVER DRAFT"){
            this.dataService.customerCanTransferAccountList.push(el);
            this.dataService.totalSaving = this.dataService.totalSaving + parseFloat(el.sbBalance);
          }
        });
        this.getAccountDetails(this.selectedAccount.accountNumber);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }


    });
  }






//old design

  /**
   * api call to get transaction history
   * @param
   */
  getTransactionHistory(param) {
    this.showAccountDetails = false;
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_TRANSACTIONHISTORY).subscribe(data => {
      console.log("Transaction history",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.set !== undefined && data.set !== undefined && data.set.records !== undefined) {
          this.transactionList = data.set.records;
        }
        else {
          this.transactionList = [];
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
      this.showAccountDetails = true;
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

  /**
    * This function is called when refresh icon is clicked to check the balance
    * @param customerAccDetails
    * @param index
    */
  _getBalanceEnquiry(customerAccDetails, selectedIndex) {
    let balEnquiryReq = this.dashboardService.getBalEnqParam(customerAccDetails);
    this.http.callBankingAPIService(balEnquiryReq, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEENQUIRY).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.dataService.customerAccountList = data.set.records;
        this.dataService.customerAccountList.map((customer, index) => {
          customer.maskBalance = this.commonMethod.maskBalance(customer.sbBalance);
          selectedIndex === index ? customer.showBal = true : customer.showBal = false;
          this.setCardColor(customer, index);
          return customer;
        });
        this.dataService.accDetails = this.dataService.customerAccountList[this.dataService.accDetailsIdx];
        // showToastMessage(resp.Result, 'success');
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }



  /**
   * To set the card colot dynamically this function is invoked
   * @param customerDetails
   * @param index
   */
  setCardColor(customerDetails, index) {
    customerDetails.cardColor = this.constant.cardColorsArr[index].cardColor;
    customerDetails.cardDetailsColor = this.constant.cardColorsArr[index].cardDetailsColor;
    return customerDetails;
  }

  /**
   * To print html contents this function is called
   */
  printPage() {
    this.printingService.print(this.printEl.nativeElement);
  }

  setShareLists() {
    let accDetails = this.dataService.accDetails;
    this.ShareViaList = [
      { 'label': "ACCOUNT_NAME", 'details': accDetails.accountHolderName, isChecked: false },
      { 'label': "ACCOUNT_NUMBER", 'details': accDetails.accountNumber, isChecked: false },
      { 'label': "ACCOUNT_NICK_NAME", 'details': accDetails.beneficiary_nick_name, isChecked: false },
      { 'label': "IFSC", 'details': accDetails.ifscCode, isChecked: false },
      { 'label': "ACCOUNT_TYPE", 'details': accDetails.accountCategory, isChecked: false },
      { 'label': "BRANCH_NAME", 'details': accDetails.branch_name, isChecked: false },
      { 'label': "BRANCH_ADDRESS", 'details': accDetails.BranchAddress, isChecked: false },
      { 'label': "CURRENCY", 'details': accDetails.currency, isChecked: false },
      { 'label': "LINKED_UPI_ADD", 'details': accDetails.UPI_ADDRESS, isChecked: false }
    ]
  }

  shareViaMail(){
      if(this.checkIfSelected()){
        showToastMessage("Please select the fields")
      }else{
       let details = this.getSelectedValues();
       window.open('mailto:?subject=Account Details&body='+details);
      }
  }

  copyToClipboard() {
    if(this.checkIfSelected()){
      showToastMessage("Please select the fields")
    }else{
      document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', (this.getSelectedValues()));
        e.preventDefault();
        document.removeEventListener('copy', null);
      });
      document.execCommand('copy');
      showToastMessage("Copied to clipboard",'success');
    }

  }

  getSelectedValues(){
    let selectedFields = "";
    this.ShareViaList.forEach((customer)=>{
      if(customer.isChecked){
         selectedFields += customer.label +" : " +customer.details +","
      }
    })
    return selectedFields;
  }

  checkIfSelected(){
    return this.ShareViaList.every(v=> v.isChecked=== false);
  }

  showShareModal(){
    this.ShareViaList.map((value)=> value.isChecked = false);
    $('#shareModal').modal('show');
  }
  transferRoute(path){
    $('#fundTransfer').modal('hide');
    this.router.navigateByUrl(path);
}
detailedStatement(){
  this.router.navigateByUrl('/detailedStatement');
}


fundTransfer(){

  $('#fundTransfer').modal('show');
}

 goBack(){
   if(this.constant.getIsCordova() == "web"){
     this.router.navigateByUrl("/dashboard");
   }
   else{
     this.router.navigateByUrl("/dashbordMobile");
   }
 }
}

