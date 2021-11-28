import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { SendMoneyLoanService } from './send-money-loan-service';
import { InitiateSendMoneyService } from '../../../fund-transfer/initiate-send-money/initiate-send-money.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { AccountType } from 'src/app/utilities/app-enum';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';


@Component({
  selector: 'app-send-money-loan',
  templateUrl: './send-money-loan.component.html',
  styleUrls: ['./send-money-loan.component.scss']
})
export class SendMoneyLoanComponent implements OnInit {

  accountList =[] ;

  sendMoneyLoanForm : FormGroup
  accountValue : any = '';
  accBalance;
  selAccNo:any;
  inSufficientBalance:boolean = false;
  constructor(
    private router: Router,
    public DataService: DataService,
    private commonMethod : CommonMethods,
    private location: Location,
    private constant: AppConstants,
    private sendMoneyLoanService: SendMoneyLoanService,
    private initiateSendMoneyService : InitiateSendMoneyService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private customCurrencyPipe: CustomCurrencyPipe
) { }



  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb(this.DataService.payEMIHeader , this.router.url)
    this.DataService.setPageSettings('SEND_MONEY');
    // this.accountList = this.DataService.customerOperativeAccList;
    // console.log(this.accountList);

    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag == "P") {
            this.accountList[0] = el;
          }
        }
      }
    })

    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag != "P") {
            this.accountList.push(el);
          }
        }
      }
    })


    console.log("loanDetails===>"+this.DataService.loanDetails);
    console.log("loanUserDetails===>"+this.DataService.loanUserDtl);
    this.initialize()
  }

  buildForm(){
    this.sendMoneyLoanForm = new FormGroup ({
      fromAccount: new FormControl('',[Validators.required]),
      amount: new FormControl('',[Validators.required]),
      remark: new FormControl(''),
    })
  }

  validateForm(){
    if (this.sendMoneyLoanForm.invalid) {
      this.sendMoneyLoanForm.get('fromAccount').markAsTouched();
      this.sendMoneyLoanForm.get('amount').markAsTouched();
    }
  }


  initialize(){
    //reset account
    var primaryAccIndex = this.accountList.findIndex(obj=> obj.accountFlag == "P");
    // delete:
    if(primaryAccIndex != 0){
      var deleted = this.accountList.splice(primaryAccIndex, 1);
      this.accountList.unshift(deleted[0]);
    }
    this.onAccSelect(this.accountList[0].accountNo);
    //add amount
    this.sendMoneyLoanForm.patchValue({
      amount : this.customCurrencyPipe.transform(this.DataService.loanAmount , 'symbol','INR')
    });

    console.log(" send loan =========>");
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
    this.accountValue = accountType.concat(" ", accountNo);
    this.onAccSelect(accountNo);
   }

  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  sendMoneyLoanSubmit() {
    if(parseFloat(this.DataService.loanAmount.trim().replace(/[^0-9]+/g, '')) >  parseFloat(this.accBalance.trim().replace(/[^0-9]+/g, '')) ){
      this.inSufficientBalance = true;
    }
    if(this.sendMoneyLoanForm.valid && !this.inSufficientBalance){
      var param = this.sendMoneyLoanService.getSendMoneyLoanReq(this.selAccNo,this.DataService.loanDetails.accountNo,this.DataService.loanAmount,this.sendMoneyLoanForm.value.remark);
      this.DataService.request = param;
      this.DataService.endPoint = this.constant.serviceName_LOANCREDITS;

      this.DataService.transactionReceiptObj.from_acc = this.selAccNo;
      this.DataService.transactionReceiptObj.to_acc = this.DataService.loanDetails.accountNo;
      this.DataService.transactionReceiptObj.payee_name = this.DataService.loanUserDtl.accountName;
      this.DataService.transactionReceiptObj.amount = this.DataService.loanAmount;
      this.DataService.transactionReceiptObj.ifscCode = this.DataService.loanUserDtl.ifscCode;
      this.DataService.transactionReceiptObj.branchName = "PSB";
      this.DataService.transactionReceiptObj.remarks = this.sendMoneyLoanForm.value.remark;
      this.DataService.transactionReceiptObj.date = new Date().toISOString();
      this.DataService.transactionReceiptObj.loanType = this.DataService.loanDetails.accountType + "-" +this.DataService.loanDetails.schemeDescription;

      this.DataService.authorizeHeader = "PAY EMI";
      this.DataService.screenType = 'payemi';

      this.goToPage('sendMoneyLoanOverview') ;
    }else{
      this.validateForm();
    }
  }

  cancle()
  {

    if(this.constant.getPlatform() == "web"){
      this.goToPage('payEmi') ;
    }
    else{
      this.goToPage('payEmi') ;
    }

  }


  onAccSelect(acc){
    console.log(acc);
    this.selAccNo = acc
    var selAcc = this.accountList.filter((obj)=>obj.accountNo == acc);
    // this.accBalance = selAcc[0].acctBalance;
    this.sendMoneyLoanForm.patchValue({
      fromAccount : acc
    })

    this.getAccountBalance(this.selAccNo);
  }


  getAccountBalance(selectedAccount){
    var param = this.initiateSendMoneyService.getAccountBalanceParam(selectedAccount);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.accBalance = data.set.records[0].ledgerBalance;
          this.inSufficientBalance = false;
        }
        else {
        }
      })
  }




}
