import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { BbpsService } from 'src/app/services/bbps.service';
import { CommonMethods } from '../../../../../../utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AccountType } from '../../../../../../../app/utilities/app-enum';
import { AppConstants } from 'src/app/app.constant';
import { DatePipe } from '@angular/common';
import {ExistingBillPayemtServiceService} from './existing-bill-payemt-service.service'
import { InitiateSendMoneyService } from '../../../../fund-transfer/initiate-send-money/initiate-send-money.service';
@Component({
  selector: 'app-existing-bill-payment',
  templateUrl: './existing-bill-payment.component.html',
  styleUrls: ['./existing-bill-payment.component.scss']
})
export class ExistingBillPaymentComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    private bbpsService: BbpsService,
    public commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private constant: AppConstants,
    public datepipe:DatePipe,
    private initiateSendMoneyService:InitiateSendMoneyService,
    private storage: LocalStorageService,
    private existingBillPayemtServiceService: ExistingBillPayemtServiceService) { }
    platformtype:any = '';
    accountNumber:any = '';
    selectedAccount: any = '';
    accountValue : any = '';
    accBalance: any = '';
    refreshedTime
    SchemeCode = "";
    viewData:any;
    maskedSelectedAccount =""
    billPaymentList =[]
    selectedFromAccMobile:any;
    billerdetailsList:any;
    accountList:any = [];
    remarkForm: FormGroup;
    companyName: 'BBPS';
    ifscNumber;
    toSelectedAcc:any;
    ID = 12
    insufficientbal:boolean =false;
    accountNameToggle  : boolean = false ;
    upiNameToggle  : boolean = false ;

    showAccountMessage : boolean = false ;
    showUpiMessage : boolean = false ;

    accountNameValue : any = '' ;
    upiNameValue : any = '' ;
    paymentType : any = 'account';

    upiValue = ['435578993@psb', '98345214541@psb', '9875214581@psb']

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.finalBilldata = ''
    this.DataService.setPageSettings('Payment');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('PAYMENT' , this.router.url)
    this.toSelectedAcc = this.constant.bbpsPoolAcc
    if (this.constant.getPlatform() == "web") {
      this.platformtype = 'InternetBanking'
    }else{
      this.platformtype = 'MobileBanking'
    }
    
    this.validatePaymentDetails();
  
    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag == "P") {
            this.accountList[0] = el;
          }
        }
      }
    })
    console.log("this.DataService.customerOperativeAccList: " + JSON.stringify(this.DataService.customerOperativeAccList))
    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag != "P") {
            this.accountList.push(el);
          }
        }
      }
    })
    console.log("this.accountList" + this.accountList) 
    this.accountNumber = this.accountList[0].accountNo;
    this.ifscNumber = this.accountList[0].ifscCode;
    this.selectedAccount = this.accountNumber;
    //this.onFromAccountSelect(this.selectedAccount);
    this.getAccountBalance(this.accountNumber);
    this.accBalance = this.accountList[0].acctBalance
    console.log("this.accountList" +  JSON.stringify(this.accountList));
    this.DataService.otpSessionPreviousPage = this.router.url;
    this.viewData = this.DataService.billerdata
    if(parseFloat(this.accBalance) > parseFloat(this.viewData.billamt)){
      this.insufficientbal = false
      }else{
        this.insufficientbal = true
      }
  }

  onAccountSelectType() {
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }
  buildForm() {
  this.remarkForm = new FormGroup({
    remark: new FormControl(''),
  
  });
}
  // onFromAccountSelect(selectedAccount){
  //   console.log(selectedAccount);
    
  //   var account = this.accountList.filter((objs) => objs.accountNo == selectedAccount)[0];
  //   this.SchemeCode= account.SchemeCode
  //   this.maskedSelectedAccount =  account.sbAccount;
  //   this.selectedAccount = selectedAccount;
  //   this.selectedFromAccMobile = selectedAccount;
  //   this.accountItem(selectedAccount)
  // }

  accountItem(value){
    console.log( JSON.stringify( value))
    this.accountNumber = value.accountNo
    this.selectedAccount =  value.accountNo
    this.ifscNumber = value.ifscCode;
    this.DataService.billerdata.ifsc =   this.ifscNumber
    console.log( ' this.accountNumber :' +   this.accountNumber + ' ' +  this.ifscNumber)
    this.getAccountBalance(this.accountNumber);
   
  }


  getAccountBalance(selectedAccount){
 

  var param = this.initiateSendMoneyService.getAccountBalanceParam(selectedAccount);
  this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
    console.log(data);
    var resp = data.responseParameter
    if (resp.opstatus == "00") {
      this.accBalance = data.set.records[0].ledgerBalance
      this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
      if(parseFloat(this.accBalance) > parseFloat(this.viewData.billamt)){
      this.insufficientbal = false
      }else{
        this.insufficientbal = true
      }
    
  }
    else {
      this.errorCallBack(data.subActionId, resp);
      
    }
  })
}

validatePaymentDetails(){

  var param = this.bbpsService.ValidatePaymentParam( this.DataService.billerdata );
  this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BBPSSERVICES).subscribe(data => {
    console.log(data);
    var resp = data.responseParameter
    console.log("ValidatePaymentService ===> " + JSON.stringify(resp))
    if (resp.opstatus == "00") {
    
      
    }
    else {
      this.errorCallBack(data.subActionId, resp);
    }
  })
}

errorCallBack(subActionId, resp) {
  //showToastMessage(resp.Result, "error");
}
getToAccValue(item){
  // this.accountValue = maskedAcctNo ;
  this.accountValue = item.SchemeCode.concat(' ', item.sbAccount) ;
 }

 closePopup(){
   this.commonMethod.closeAllPopup() ;
 }

 goToPage(routeName) {
  this.router.navigateByUrl('/' + routeName);
}

onSelectOption(e, type){
  if (e.stopPropagation) e.stopPropagation();
  switch(type){
    case 'account':
      this.accountNameToggle = !this.accountNameToggle
      if(this.accountNameToggle){
        $('#account-name').slideToggle();
        $('#account-name').parent().toggleClass('active')
      } else{
        $('#account-name').slideUp();
        $('#account-name').parent().removeClass('active')
      }
      break ;

    case 'upi' :
      this.upiNameToggle = !this.upiNameToggle
      if(this.upiNameToggle){
        $('#upi-name').slideToggle();
        $('#upi-name').parent().toggleClass('active')
      } else{
        $('#upi-name').slideUp();
        $('#upi-name').parent().removeClass('active')
      }
      break ;
  }
 

}


accountTypeSelection(item, type ){
  this.onSelectOption('', type)

  switch(type){
    case 'account':
      this.accountValue = item.SchemeCode.concat(' ', item.sbAccount) ;
      this.showAccountMessage = false ;
      break

    case 'upi':
      this.upiNameValue = item;
      this.showUpiMessage = false ;
      break ;
  }

}

clickedOut($event){
  switch(this.paymentType){
    case 'account' :
      $('#account-name').slideUp();
      $('#account-name').parent().removeClass('active')
    break;

    case 'upi':
      $('#upi-name').slideUp();
      $('#upi-name').parent().removeClass('active')
      break ;
  }

}

paymentSelection(e){
  this.paymentType = e ;
}

 proceedPaymentClick(){
   var balancecheck = parseFloat(this.accBalance) > parseFloat(this.viewData.billamt)

   if(parseFloat(this.accBalance) > parseFloat(this.viewData.billamt)){
     this.showAccountMessage = false ;
   var date = this.datepipe.transform(new Date().toISOString(), "dd MMM yyyy h:mm a" )
  var bbpsReqParam = this.existingBillPayemtServiceService.getBbpsTransferParam(this.viewData , this.accountNumber , this.toSelectedAcc , 'within' , this.ID, this.viewData.billerName);

  console.log("bbpsReqParam " + bbpsReqParam)
  this.DataService.request = bbpsReqParam;
  this.DataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;
  this.DataService.authorizeHeader = "BILL PAYMENT SEND MONEY";
  this.DataService.transactionReceiptObj.isScheduled = false;
  this.DataService.transactionReceiptObj.from_acc = this.selectedAccount;
  this.DataService.transactionReceiptObj.to_acc = this.toSelectedAcc;
  this.DataService.transactionReceiptObj.payee_name = this.viewData.billerName;
  this.DataService.transactionReceiptObj.amount = this.viewData.billamt;
  this.DataService.transactionReceiptObj.remarks = this.remarkForm.value.remark != '' ? this.remarkForm.value.remark : "-";
  
  this.DataService.transactionReceiptObj.date = this.datepipe.transform(new Date().toISOString(), "dd MMM yyyy h:mm a" );
  this.DataService.screenType = 'bbpsTransfer';
  this.DataService.finalBilldata = this.viewData;

  this.viewData.displayData.remark = this.remarkForm.value.remark != '' ? this.remarkForm.value.remark : "-";
  this.DataService.finalBilldata.displayData.push ({ "label":  'Remark','field' : this.remarkForm.value.remark != '' ? this.remarkForm.value.remark : "-"});
  this.DataService.finalBilldata.displayData.push ({ "label":  'From Account','field' :this.selectedAccount});
  this.DataService.finalBilldata.displayData.push ({ "label":  'Date','field' : date});
 
  console.log(JSON.stringify(this.DataService.finalBilldata))
  this.router.navigate(['/otpSession']);
   }
   else{
      this.insufficientbal = true
     this.showAccountMessage =true ;
     
   }
 
 }

 upiPaymentProceed(){
  if(this.upiNameValue != ''){
    this.showUpiMessage = false ;
    this.router.navigate(['/otpSession']);
  }
  else{
    this.showUpiMessage =true ;
  }
 }

}
