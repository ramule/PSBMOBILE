import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { DatePipe, Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import {TransactionStatusService} from '../transaction-status/transaction-status.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AccountType } from '../../../../../utilities/app-enum';
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.scss']
})
export class TransactionStatusComponent implements OnInit {

 selectedAccount: any = '';
  accountValue : any = '';
  accBalance: any = '';
  selectedTab: any = 'scheduled';
  scheduledTransactionList:any=[];
  tempscheduledTransactionList:any=[];
  completedTransactionList:any=[];
  sortedList:any=[];
  formAccList:any=[];
  refreshedTime:any;
  config1:any;
  config2:any;
  searchText: any = '';
  selectedAcc:any;

  constructor(
    private router: Router,
    public DataService: DataService,
    private commonMethod : CommonMethods,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    public datepipe : DatePipe,
    private location: Location,
    private transactionStatusService:TransactionStatusService,
   )
  { this.config1 = {id:"basicPaginate1", itemsPerPage:this.DataService.listCountObj.itemsPerPage, currentPage: this.DataService.listCountObj.currentPage};
    this.config2 = {id:"basicPaginate2", itemsPerPage:this.DataService.listCountObj.itemsPerPage, currentPage: this.DataService.listCountObj.currentPage};
  }
    pageChanged1(event){this.config1.currentPage= event;}
    pageChanged2(event){this.config1.currentPage= event;}


  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('TRANSACTION_STATUS' , this.router.url)
    this.DataService.setPageSettings('TRANSACTION_STATUS');
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile';
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.getScheduleTransaction();
    //this.getCompleteTransaction();

    this.formAccList = [];

    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag == "P") {
            this.formAccList[0] = el;
          }
        }
      }
    })

    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag != "P") {
            this.formAccList.push(el);
          }
        }
      }
    })


    this.selectedAccount = this.DataService.customerOperativeAccList[0].accountNo;
    this.accountValue = this.DataService.customerOperativeAccList[0].accountNo;
    console.log('selected from account: ', this.selectedAccount);
    this.accBalance = this.DataService.customerOperativeAccList[0].acctBalance;
    this.onFromAccountSelect(this.DataService.customerOperativeAccList[0].accountNo)

  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  onAccountSelectType() {
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(accountType, accountNo){
    //this.accountValue = accountType.concat(" ", accountNo);
    this.selectedAcc = accountNo;
    //this.commonMethod.closePopup('div.sel-account');
    //this.getAccountBalance(accountNo);
  }

  accountSelect(){
    this.accountValue = this.selectedAcc;
    this.commonMethod.closePopup('div.sel-account');
    this.onFromAccountSelect(this.accountValue);
  }

  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  onFromAccountSelect(event) {
    this.selectedAccount = "";
    console.log(this.selectedAccount);
    this.selectedAccount = event; 
    this.getAccountBalance(this.selectedAccount)

}
onTransactionTabChange(type) {
  this.selectedTab = type;
  this.searchText = '';
  if(this.selectedTab == 'scheduled' && this.selectedAccount != null && this.selectedAccount != "" && this.selectedAccount != undefined) {
   this.getScheduleTransaction();
  }
  else if(this.selectedTab == 'completed' && this.selectedAccount != null && this.selectedAccount != "" && this.selectedAccount != undefined) {
    this.getCompleteTransaction();
  }
}

getScheduleTransaction()
{
  var param = this.transactionStatusService.getScheduledTransParamasCall();
  this.getScheduledTransactions(param);
}

getScheduledTransactions(param){
  this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SCHEDULARTLIST).subscribe(data => {
    console.log(data);
    this.scheduledTransactionList = []
    var resp = data.responseParameter;
    if (resp.opstatus == "00") {
      //this.scheduledTransactionList = data.set.records;
      data.set.records.forEach(element => {
        if(this.selectedAccount ==element.fromAccNumber)
        {
          this.scheduledTransactionList.push(element)
          this.tempscheduledTransactionList.push(element)
        }
       
      });
      console.log('scheduled trans list: ', this.scheduledTransactionList);
      this.sortedList=this.scheduledTransactionList.filter(obj => obj.fromAccNumber == this.selectedAccount);
      console.log('final schedule by account number trans list: ',  this.sortedList);
    }
    else {
      this.errorCallBack(data.subActionId, resp);
    }
  })

}

getCompleteTransaction()
{
  var params = this.transactionStatusService.getCompletedTransParamasCall(this.selectedAccount);
  this.getCompletedTransactions(params);

}
getCompletedTransactions(params){
  this.http.callBankingAPIService(params, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SCHEDULARCOMPLETEDLIST).subscribe(data => {
    // console.log("sanal : " +JSON.stringify(data));
    console.log(data);
    var resp = data.responseParameter;
    console.log("completscheduled",resp)
    if (resp.opstatus == "00") {
      //this.completedTransactionList = JSON.parse(resp.data);
      this.completedTransactionList = data.set.records;
      console.log('success trans list: ', this.completedTransactionList);
    }
    else {
      this.errorCallBack(data.subActionId, resp);
    }
  })

}



searchAccount(event){
  switch(this.selectedTab){
    case 'scheduled':
    if(this.searchText != ''){
      var schedulelistArray = this.tempscheduledTransactionList ;
      var filterArray = schedulelistArray.filter((x) =>
            x.benefName.toLowerCase().includes(this.searchText.toLowerCase()) || x.toAccountNo.includes(this.searchText.toLowerCase())
          );
      this.scheduledTransactionList = []
      filterArray.forEach(element => {
        this.scheduledTransactionList.push(element)
      });
     
    }
    else{
     this.scheduledTransactionList = []
     this.tempscheduledTransactionList.forEach(element => {
      this.scheduledTransactionList.push(element)
    });
    }
    break;

  case 'completed':
    if(this.searchText != ''){
      var completedlistArray = this.completedTransactionList ;
      var filterArray = completedlistArray.filter((x) =>
            x.benefName.toLowerCase().includes(this.searchText.toLowerCase())
          );
    }
    else{

    }

}
}

getAccountBalance(selectedAccount)
{
  if(selectedAccount=="")
  {
    showToastMessage("Please select account")
    return;
  }

  var param = this.transactionStatusService.getAccountBalanceParam(selectedAccount);
  this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
    console.log(data);
    var resp = data.responseParameter
    if (resp.opstatus == "00") {
      this.accBalance = data.set.records[0].ledgerBalance
      this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
      this.getScheduleTransaction();
    }
    else {
      this.errorCallBack(data.subActionId, resp);
    }
  })
}
errorCallBack(subActionId, resp) {
  if (resp.opstatus == '02' || resp.opstatus == '01') {
    //this.getScheduleTransaction();
    // showToastMessage(resp.Result, 'error');
  }
}
}
