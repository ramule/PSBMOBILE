import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../utilities/common-methods';
import { DatePipe, Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import {TransactionStatusService} from './transaction-status.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { CustomCurrencyPipe } from '../../../../pipes/custom-currency.pipe';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AccountType } from '../../../../utilities/app-enum';
import * as jsPDF from 'jspdf';
import { InitiateSendMoneyService } from '../initiate-send-money/initiate-send-money.service';
declare var showToastMessage: any;
declare var $: any;


@Component({
  selector: 'app-transaction-status-page',
  templateUrl: './transaction-status-page.component.html',
  styleUrls: ['./transaction-status-page.component.scss']
})
export class TransactionStatusPageComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    private commonMethod : CommonMethods,
    private http: HttpRestApiService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private storage: LocalStorageService,
    private constant: AppConstants,
    public datepipe : DatePipe,
    private location: Location,
    private transactionStatusService:TransactionStatusService,
    private initiateSendMoneyService : InitiateSendMoneyService
) {
  this.config1 = {id:"basicPaginate1", itemsPerPage:this.DataService.listCountObj.itemsPerPage, currentPage: this.DataService.listCountObj.currentPage};
  this.config2 = {id:"basicPaginate2", itemsPerPage:this.DataService.listCountObj.itemsPerPage, currentPage: this.DataService.listCountObj.currentPage};

}


deleterecord: any='';
selectedAccount: any = '';
selectedAccountData: any = '';
  deleteSchedulername:any="";
  accountValue : any = '';
  accBalance: any = '';
  editedAmount;
  amountInWords;
  selectedTab: any = 'recent';
  scheduledTransactionList:any=[];
  tempscheduledTransactionList:any=[];
  completedTransactionList:any=[];
  sortedList:any=[];
  formAccList:any=[];
  unfliteredTransactionList:any=[]
  refreshedTime:any;
  config1:any;
  config2:any;
  invalidAmount:boolean =false;
  searchText: any = '';
  selectedAcc:any;
  downloadData:any=[]
filterType : any = 'recent'
updateschedularform: FormGroup;
  ngOnInit(): void {
    this.DataService.setPageSettings('TRANSACTION_STATUS');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('TRANSACTION_STATUS' , this.router.url)
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('TRANSACTION_STATUS' , this.router.url)
    this.DataService.setPageSettings('TRANSACTION_STATUS');
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile';
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
    // this.getScheduleTransaction();
    this.getCompleteTransaction();

    this.formAccList = [];

    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag == "P") {
            this.formAccList[0] = el;
            this.selectedAccountData = el
          }
        }
      }
    })
    console.log("this.formAccList[0]" + this.formAccList[0])
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
    //this.accBalance = this.DataService.customerOperativeAccList[0].acctBalance;
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

  filterOpenPopup(){
    this.commonMethod.openPopup('div.popup-bottom.filterPopup');
  }




  closePopup(){
    this.commonMethod.closeAllPopup();
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



onFromAccountSelect(event) {

  this.DataService.customerOperativeAccList.forEach(el => {
    if (el.accountType != "CAPPI" && el.Status == "Active") {
      if (el.accountNo == event) {
        this.selectedAccountData = el;
      }
    }
  })

 
  console.log(event + "this.selectedAccount");
  this.selectedAccount = event;
  // this.getAccountBalance(this.selectedAccount)
  this.getfilteredDate(event);
  this.getBalanceEqry(event);
}

getBalanceEqry(accNo){
  var param = this.initiateSendMoneyService.getAccountBalanceParam(accNo);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.accBalance = data.set.records[0].ledgerBalance
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      })
}




onTransactionTabChange(type) {
this.selectedTab = type;
this.searchText = '';
// if(this.selectedTab == 'scheduled' && this.selectedAccount != null && this.selectedAccount != "" && this.selectedAccount != undefined) {
//  this.getScheduleTransaction();
// }
// else if(this.selectedTab == 'completed' && this.selectedAccount != null && this.selectedAccount != "" && this.selectedAccount != undefined) {
//   this.getCompleteTransaction();
// }
}

// getScheduleTransaction()
// {
// var param = this.transactionStatusService.getScheduledTransParamasCall();
// this.getScheduledTransactions(param);
// }

// getScheduledTransactions(param){
// this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SCHEDULARTLIST).subscribe(data => {
//   console.log(data);
//   this.scheduledTransactionList = []
//   var resp = data.responseParameter;
//   if (resp.opstatus == "00") {
//     //this.scheduledTransactionList = data.set.records;
//     data.set.records.forEach(element => {
//       if(this.selectedAccount ==element.fromAccNumber)
//       {
//         this.scheduledTransactionList.push(element)
//         this.tempscheduledTransactionList.push(element)
//       }
//     });
//     console.log('scheduled trans list: ', this.scheduledTransactionList);
//     this.sortedList=this.scheduledTransactionList.filter(obj => obj.fromAccNumber == this.selectedAccount);
//     console.log('final schedule by account number trans list: ',  this.sortedList);
//   }
//   else {
//     this.errorCallBack(data.subActionId, resp);
//   }
// })

// }

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
     this.unfliteredTransactionList = data.set.records;
     console.log("unfliteredTransactionList2" + this.unfliteredTransactionList)
     
     this.getfilteredDate(this.formAccList[0].accountNo);
    console.log('success trans list: ', this.completedTransactionList);
  }
  else {
    this.errorCallBack(data.subActionId, resp);
  }
})

}
getfilteredDate(event){
  this.scheduledTransactionList =[]
  this.completedTransactionList= []

  this.unfliteredTransactionList.forEach(element => {
    if("PENDING" ==element.statusId && element.fromAccNumber ==  event )
    {
      this.scheduledTransactionList.push(element)
    }else{
      if(element.fromAccNumber ==  event){
          this.completedTransactionList.push(element)
      }
    }
  })

  // alert(this.scheduledTransactionList.length)

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

// getAccountBalance(selectedAccount)
// {
// if(selectedAccount=="")
// {
//   showToastMessage("Please select account")
//   return;
// }

// var param = this.transactionStatusService.getAccountBalanceParam(selectedAccount);
// this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
//   console.log(data);
//   var resp = data.responseParameter
//   if (resp.opstatus == "00") {
//     this.accBalance = data.set.records[0].ledgerBalance
//     this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
//     this.getScheduleTransaction();
//   }
//   else {
//     this.errorCallBack(data.subActionId, resp);
//   }
// })
// }
errorCallBack(subActionId, resp) {
if (resp.opstatus == '02' || resp.opstatus == '01') {
  //this.getScheduleTransaction();
  // showToastMessage(resp.Result, 'error');
}
}

openDeletePopup(value){
  this.commonMethod.openPopup('.delete-schedular');
  this.deleteSchedulername = value.benefName;
  this.deleterecord = value
  console.log( "valueopenDeletePopup" +  JSON.stringify(this.deleterecord))
}


openUpdatePopup(value){
  this.commonMethod.openPopup('.update-schedular');
  this.deleteSchedulername = value.benefName;
  this.deleterecord = value
 
  console.log( "valueopenDeletePopup" +  JSON.stringify(this.deleterecord))
}



deleteScheduler(){
 
  var param = this.transactionStatusService.deleteSchParam(this.deleterecord.SISetId);
  this.deleteSchedular(param);

}


OnInput(evn) {

  var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
  evn = evn.replace(regex, '$1');

  this.editedAmount = evn;

  if (Number(this.accBalance) >= Number((evn.trim().replace('₹', '')).replace(/,/g, ''))) {
    this.invalidAmount = false
  } else {
    this.invalidAmount = true
  }

}


/**
   * set update currency value
   * @param value
   */
 formatCurrency(value) {
  if (value == '0') {
    this.editedAmount = "";
    return;
  }
  if (value != '') {
    let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'decimal');
    if (updatedCurrency == ' 0.00') {
      this.editedAmount = "";
    } else {
      if(updatedCurrency.trim() == '0'){
        this.editedAmount = "";
      }else{
        console.log(updatedCurrency);
        this.editedAmount = "₹" + updatedCurrency;
        //formGroup.patchValue({ amount: updatedCurrency });

      }
    }
    // this.amountInWords = this.commonMethod.convertNumberToWords(value);
  } else {
    this.editedAmount = "";
  }
}


 deleteSchedular(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DELETESCHEDULAR).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        showToastMessage(resp.Result,"success");
        this.getCompleteTransaction();
        this.commonMethod.closeAllPopup();
      }
      else {
        this.errorCallBack(data.subActionId, resp);
        showToastMessage(resp.Result,"error");
      }
    })
  }


  updateScheduler(){
    if(this.invalidAmount){
      return;
    }

    var param = this.transactionStatusService.updateSiParam(this.deleterecord.SISetId ,  this.editedAmount);
     this.updateSchedular(param);

  
  }

  updateSchedular(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_MODIFYSCHEDULAR).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        showToastMessage(resp.Result,"success");
        this.getCompleteTransaction();
        this.commonMethod.closeAllPopup();
      }
      else {
        this.errorCallBack(data.subActionId, resp);
        showToastMessage(resp.Result,"error");
      }
    })
  }










  /**
   *
   * @param print
   */

   generatePDF(print?: any) {
     console.log("selectedAccountData " + JSON.stringify(this.selectedAccountData))
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
    doc.text("Branch Name : "+this.selectedAccountData.branch_name, pageWidth - 110, 10, 'left');
    doc.text("Branch Code : "+this.selectedAccountData.branchCode, pageWidth - 110, 15, 'left');
    doc.text("Branch Address : "+this.selectedAccountData.BRANCHADDRESS, pageWidth - 110, 20, 'left');
    doc.text("Branch Contact : "+this.selectedAccountData.phone_number, pageWidth - 110, 25, 'left');
    doc.text("IFSC : " +this.selectedAccountData.ifscCode, pageWidth - 110, 30, 'left');
    doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(20);
    doc.text("Transaction Status", 20, 60, 'left');

    doc.setLineWidth(0.2);


    // doc.setLineWidth(0.5);
    // doc.line(pageWidth/2, 80, pageWidth/2, 110);

    if(this.selectedTab == "recent"){
        this.downloadData = this.completedTransactionList 
    }else{
      this.downloadData =this.scheduledTransactionList
    }

    doc.setFontSize(7);
    var newArray:any = []
    
      for(var i=0;i<this.downloadData.length;i++)
      {
      var newData:any=[]
      var benefName = this.downloadData[i].benefName
      var fromAccNumber = this.downloadData[i].fromAccNumber
      var paymentStartDate = this.downloadData[i].paymentStartDate
      var paymentEndDate = this.downloadData[i].paymentEndDate
      var emiAmount = this.downloadData[i].emiAmount
      var emiExecuted = this.downloadData[i].emiExecuted
      var paymentFrequency = this.downloadData[i].paymentFrequency
      var statusId = this.downloadData[i].statusId
     
      var closing = this.downloadData[i].closingBalance
      newData.push(benefName,fromAccNumber,paymentStartDate,paymentEndDate,emiAmount,emiExecuted,paymentFrequency,statusId)
      newArray.push(newData)

    }
    var _columns = ["Beneficiary", "From Account", "Start date ","IFSC", "EMI Amount", "EMI Paid", "Frequency","Status"];
    var _rows = newArray;
    console.log(_rows);

    doc.autoTable(_columns, _rows, {
      theme: 'grid', // 'striped', 'grid' or 'plain',
      margin: { top: 70 },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        horizontalPageBreak:true
      },
      columnStyles: {
        1: { cellWidth: 'auto' }
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

  //  var poc = this.newpages(doc,pageWidth)
  
    if (print) {
      doc.autoPrint();
      window.open(doc.output('bloburl'));
    }
    else {
      this.commonMethod.downloadPDF(doc, 'Transaction Status');
    }
  }


}
