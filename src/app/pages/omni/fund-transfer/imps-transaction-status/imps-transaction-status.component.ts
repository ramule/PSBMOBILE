import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { ImpsTransactionStatusService } from './imps-transaction-status.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-transaction-status',
  templateUrl: './imps-transaction-status.component.html',
  styleUrls: ['./imps-transaction-status.component.scss']
})
export class ImpsTransactionStatusComponent implements OnInit {
  accountValue : any = '';
  selectedAccount: any = '';
  successTransactionList: any = [];
  deemedTransactionList: any = [];
  selectedTab: any = 'complete';
  accBalance:any;
  refreshedTime:any;
  selectedAcc:any;

  constructor(
    private router: Router,
    public DataService: DataService,
    private commonMethod : CommonMethods,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private impsTransStatusService: ImpsTransactionStatusService,
    public datepipe : DatePipe,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('TRANSACTION_STATUS' , this.router.url)
    console.log('operative accounts: ', this.DataService.customerOperativeAccList);
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile';
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.DataService.setPageSettings('TRANSACTION_STATUS');
    this.accBalance = this.DataService.customerOperativeAccList[0].acctBalance
   // this.getAccountBalance(this.DataService.customerOperativeAccList[0].accountNo)
   this.onFromAccountSelect(this.DataService.customerOperativeAccList[0].accountNo)
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/'+routeName);
  }

  onAccountSelectType() {
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(accountNo) {
    this.selectedAcc = accountNo;
    //this.accountValue = accountNo;
    //this.getAccountBalance(this.accountValue);
  }

  accountSelect(){
    this.accountValue = this.selectedAcc;
    this.commonMethod.closePopup('div.sel-account');
    this.getAccountBalance(this.accountValue);
  }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  onFromAccountSelect(event) {
    this.selectedAccount = "";
    console.log(this.selectedAccount);
    this.selectedAccount = event;
    this.getAccountBalance(this.selectedAccount)
    if(this.selectedTab == 'complete') {
      var param = this.impsTransStatusService.getSuccessTransParamasCall(this.selectedAccount);
      this.getImpsSuccessTransactions(param);
    }
    else {
      var param = this.impsTransStatusService.getDeemedTransParamasCall(this.selectedAccount);
      this.getImpsDeemedTransactions(param);
    }
  }

  onTransactionTabChange(type) {
    this.selectedTab = type;
    if(this.selectedTab == 'complete' && this.selectedAccount != null && this.selectedAccount != "" && this.selectedAccount != undefined) {
      var param = this.impsTransStatusService.getSuccessTransParamasCall(this.selectedAccount);
      this.getImpsSuccessTransactions(param);
    }
    else if(this.selectedTab == 'deemed' && this.selectedAccount != null && this.selectedAccount != "" && this.selectedAccount != undefined) {
      var param = this.impsTransStatusService.getDeemedTransParamasCall(this.selectedAccount);
      this.getImpsDeemedTransactions(param);
    }
  }
  impsTransactionStatus(item)
  {
    let param =  this.impsTransStatusService.getIMPSTransactionParam(item, this.selectedAccount);
    this.DataService.request = param;
    this.DataService.endPoint = this.constant.serviceName_TRANSACTIONSTATUS;
    this.DataService.authorizeHeader = "IMPS Transaction Status";
    this.DataService.screenType = 'impsfundTransfer';

    this.DataService.impsTransactionReceiptObj.accName= this.selectedAccount,
    this.DataService.impsTransactionReceiptObj.accNumber= item.channel
    this.DataService.impsTransactionReceiptObj.remark= item.transactionDate
    this.DataService.impsTransactionReceiptObj.installment= item.bankRRN
    this.DataService.impsTransactionReceiptObj.frequency= item.indicator
    this.DataService.impsTransactionReceiptObj.amount= item.amount

    this.impsApiCall(param)
  }
  getImpsSuccessTransactions(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETIMPSSUCCESSTRANSACTION).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.successTransactionList = JSON.parse(resp.data);
        console.log('success trans list: ', this.successTransactionList);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  getImpsDeemedTransactions(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETIMPSDEEMEDTRANSACTION).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.deemedTransactionList = JSON.parse(resp.transactionDetails);
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }
  impsApiCall(param)
  {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_TRANSACTIONSTATUS).subscribe(data => {
      console.log("data  " + JSON.stringify(data));
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
      var dataObj = JSON.parse(resp.TransactionDetail)
      this.DataService.screenType = "impsTransactionStatus"
      this.DataService.impsTransactionReceiptObj.status = "Success";
      this.DataService.impsTransactionReceiptObj.date = dataObj.transactionDate != "" ? dataObj.transactionDate : "-"
      this.DataService.impsTransactionReceiptObj.RRN = resp.RRN != "" ? resp.RRN : "-"
      this.DataService.impsTransactionReceiptObj.message = resp.response != "" ? resp.response : "-"
      this.router.navigateByUrl('/transactionStatusReceipt')
      console.log(resp)
      }
      else {
        // this.DataService.impsTransactionReceiptObj.status = "Failed"
        // this.DataService.impsTransactionReceiptObj.date = resp.TransactionDate != "" ? resp.TransactionDate : "-"
        // this.DataService.impsTransactionReceiptObj.RRN = resp.RRN != "" ? resp.RRN : "-"
        // this.router.navigateByUrl('/transactionStatusReceipt')
        showToastMessage(resp.response)
      }
    })
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
   * This function is use to call api to fetch
   * accounts balance
   */
  getAccountBalance(selectedAccount)
  {
    if(selectedAccount=="")
    {
      showToastMessage("Please select account")
      return;
    }
    
    var param = this.impsTransStatusService.getAccountBalanceParam(selectedAccount);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.accBalance = data.set.records[0].ledgerBalance
        this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }
  }
