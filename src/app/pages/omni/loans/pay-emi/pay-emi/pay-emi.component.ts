import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { MyBorrowingService } from '../../../my-accounts/my-borrowings/my-borrowings.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Component({
  selector: 'app-pay-emi',
  templateUrl: './pay-emi.component.html',
  styleUrls: ['./pay-emi.component.scss']
})
export class PayEmiComponent implements OnInit {

  overDueAmt:any;
  selAccDtl:any;
  totalAccountList:any = [];
  payAdvEmi:any;
  payAmt:any;
  payMethod = 'overdue';
  emiDtl:any;

  advanceEmiForm : FormGroup ;
  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private myBorrowingService: MyBorrowingService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private dataService: DataService,
    private formValidation: FormValidationService,
    private commonMethod: CommonMethods
  ) { }

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

    this.DataService.getBreadcrumb('PAY_EMI' , this.router.url)
    this.DataService.setPageSettings('PAY_EMI');
    this.payAmt={ mode: "overDue" }

    this.totalAccountList = [];
    this.totalAccountList = this.dataService.customerBorrowingsList;
    this.dataService.otpSessionPreviousPage = "/payEmi";

    this.selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.dataService.loanDetails.accountNo)[0];
    this.getLoanEnq(this.dataService.loanDetails.accountNo);
    this.getLoanRepaymentSchedule();
  }

  buildForm(){
    this.advanceEmiForm = new FormGroup({
      amount: new FormControl('')
    })
  }

  validateForm(){
    if(this.advanceEmiForm.invalid){
      this.advanceEmiForm.get('amount').markAsTouched();
    }
  }

  getLoanRepaymentSchedule(){
    var param = this.myBorrowingService.getLoanRepaymentSchedule(this.dataService.loanDetails.accountNo);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANREPAYMENTSCHEDULE).subscribe(data => {
      console.log("loan enq resp===>",data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty("set")) {
          this.emiDtl = data.set.records[0];
          console.log(this.emiDtl);
        }
      }
    });
  }

  advanceEmiValidators(){
    if(this.payAmt.mode == 'advEmi'){
      this.advanceEmiForm.get('amount').setValidators([Validators.required]);
      this.advanceEmiForm.get('amount').updateValueAndValidity() ;
    } else{
      this.advanceEmiForm.get('amount').clearValidators();
      this.advanceEmiForm.get('amount').updateValueAndValidity() ;
    }
  }

  getLoanEnq(accNo){
    var param = this.myBorrowingService.getMyLoansInquiry(accNo,this.selAccDtl.branchCode);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_LOANACCOUNTINQUIRY).subscribe(data => {
        console.log("loan enq resp===>",data);
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          if (data.hasOwnProperty("set")) {
            var loanUserDtl = data.set.records[0]
            this.dataService.loanUserDtl = loanUserDtl;
            this.overDueAmt = parseFloat(loanUserDtl?.pricipalDemandArrears) + parseFloat(loanUserDtl?.interestDemandsArrears) + parseFloat(loanUserDtl?.chargesDemandArrears) + parseFloat(loanUserDtl?.otherChargesDemand);
            console.log(this.overDueAmt);
            if(this.overDueAmt == 0){
              this.payAmt={ mode: "emidue" }
              this.payMethod = "emidue";
              this.onTypeChange("emidue");
            }
          }
        }
      });
  }


  onTypeChange(value){
    this.payMethod = value
  }
  goToPage(routeName) {
    if( routeName == "sendMoneyLoan"){
      this.advanceEmiValidators() ;
      console.log(this.payAmt.mode);

      if(this.payAmt.mode == "overDue"){
        this.dataService.payEMIHeader = "Pay Overdue Amount"
        this.dataService.loanAmount = ""+this.overDueAmt;
        if(parseFloat(this.dataService.loanAmount.trim().replace(/[^0-9]+/g, ''))  == 0){
          return;
        }
        this.router.navigateByUrl('/' + routeName);
      }else if(this.payAmt.mode == "emiDue"){
        this.dataService.payEMIHeader = "Pay EMI"
        this.dataService.loanAmount = this.emiDtl.flowAmount;
        if(parseFloat(this.dataService.loanAmount.trim().replace(/[^0-9]+/g, ''))  == 0){
          return;
        }
        this.router.navigateByUrl('/' + routeName);
      }
      else if(this.payAmt.mode == "advEmi"){
       if(this.advanceEmiForm.valid){
        this.dataService.payEMIHeader = "Pay Advance EMI"
        this.dataService.loanAmount = this.payAdvEmi.trim().replace(/[^.0-9]+/g, '');
        if(parseFloat(this.dataService.loanAmount.trim().replace(/[^0-9]+/g, ''))  == 0){
          return;
        }
        this.router.navigateByUrl('/' + routeName);
       }else{
         this.validateForm() ;
       }
      }
    }
    else if(routeName == 'myBorrowings'){
      if(this.constant.getPlatform() != "web"){
        this.router.navigateByUrl('/myAccountMobile');
      }
      else{
        this.router.navigateByUrl('/' + routeName);
      }
    }
    else{
      this.router.navigateByUrl('/' + routeName);
    }
    //
  }



  /**
   * set update currency value
   * @param value
   */
   formatCurrency(value) {
    this.formValidation.formatCurrency(value, this.advanceEmiForm);
  }

  OnInput(evn){
    var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
    evn = evn.replace(regex, '$1');

    this.advanceEmiForm.patchValue({
      amount:evn
    })

  }

  closePopup(popupname){
    this.commonMethod.closePopup(popupname);
  }
}
