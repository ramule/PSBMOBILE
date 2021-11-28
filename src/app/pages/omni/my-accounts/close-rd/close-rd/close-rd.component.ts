import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { CloseRdService } from './close-rd.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
declare var window: any;
declare var OSREC: any;
@Component({
  selector: 'app-close-rd',
  templateUrl: './close-rd.component.html',
  styleUrls: ['./close-rd.component.scss']
})
export class CloseRdComponent implements OnInit {
  selectedAccData: any = "";
  rdDetailsData: any = "";
  totalAccountList: any = [];
  accountDetailsList: any = [];
  accountDtls: any;
  selAccDtl: any;
  isTermsAndCondition: boolean;
  shareDtl:any = {
    'rdAccNumber' : false,
    'maturityDate' : false,
    'tenure' : false,
    'interestRate' : false,
    'modeOdRdOpening' : false,
    'maturityPayoutAcc' : false
  };
  constructor(
    private router:Router,
    public dataService: DataService,
    private location: Location,
    private constant: AppConstants,
    private closeFdService: CloseRdService,
    private commonMethod : CommonMethods,
  ) { }

  shareDetails : boolean = false ;
  closeRDForm : FormGroup

  ngOnInit(): void {
    this.selectedAccData = this.location.getState();
    console.log('selected acc data: ', this.selectedAccData);
    this.rdDetailsData = this.selectedAccData.FDRDData;
    console.log('FD RD data: ', this.rdDetailsData);
    this.totalAccountList = this.dataService.customerMyDepostie;
    this.selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.selectedAccData.account);
    console.log('selected account details : ', this.selAccDtl);
    this.accountDtls = this.selectedAccData.accountDtls;
    console.log('accountDtls: ', this.accountDtls);
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.getBreadcrumb('CLOSE_RD' , this.router.url)
    this.dataService.setPageSettings('CLOSE_RD');
    this.buildForm();
    this.closeRDForm.patchValue({
      fdAccount: this.selectedAccData.account,
      monthlyInstallment: this.convertCurrency(this.rdDetailsData.depositAmount),
      originalMaturityAmount: this.convertCurrency(this.rdDetailsData.maturityAmount),
      currentRDAccountBalance: this.convertCurrency(this.rdDetailsData.accountClearBalance),
      maturityPayoutAccount: this.rdDetailsData.repaymentAccountNumber
    })
  }

  convertCurrency(value) {
    return OSREC.CurrencyFormatter.format(value, { currency: 'INR', symbol: '₹' });
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  buildForm() {
    this.closeRDForm = new FormGroup({
      fdAccount: new FormControl('', [Validators.required]),
      monthlyInstallment: new FormControl(''),
      originalMaturityAmount: new FormControl(''),
      currentFDAccountBalance: new FormControl(''),
      currentRDAccountBalance: new FormControl(''),
      maturityPayoutAccount : new FormControl(''),
      remark : new FormControl(''),
      termsCondition : new FormControl('', [Validators.required]),
    });
  }

  validateForm(){
    if (this.closeRDForm.invalid) {
      this.closeRDForm.get('fdAccount').markAsTouched();
      this.closeRDForm.get('remark').markAsTouched();
      this.closeRDForm.get('termsCondition').markAsTouched();
    }
  }

  closeRdSubmit(formValue){
    if(this.closeRDForm.valid){
      console.log("Close RD", formValue);
      this.dataService.feedbackType = "closeFD";
      var param = this.closeFdService.getCloseRDCall(this.selectedAccData.account);
      this.dataService.request = param;
      this.dataService.endPoint = this.constant.serviceName_RDCLOSUREVALIDATION;
      var objCheckFlag = this.dataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.dataService.endPoint.split('/')[1]);
      if(this.dataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
        this.dataService.closeRDObj.depositType = this.rdDetailsData.accountType;
        this.dataService.closeRDObj.depositScheme = this.rdDetailsData.accountCategory + '-' + this.rdDetailsData.schemeDescription,
        this.dataService.closeRDObj.depositorType = this.rdDetailsData,
        this.dataService.closeRDObj.RDAccNumber = this.selectedAccData.account,
        this.dataService.closeRDObj.rateOfInterest = this.rdDetailsData.interest_Rate,
        this.dataService.closeRDObj.depositAmount = this.rdDetailsData.depositAmount,
        this.dataService.closeRDObj.currentMaturityAmount = this.rdDetailsData.maturityAmount,
        this.dataService.closeRDObj.creditToClose = this.rdDetailsData.maturityAmount,
        this.dataService.closeRDObj.maturityDate = this.rdDetailsData.maturityDate,
        this.dataService.closeRDObj.maturityPayoutAccount = this.rdDetailsData.repaymentAccountNumber,
        this.router.navigateByUrl('/closeRDAuthorization');
      }
    }
    else{
      this.validateForm();
    }
  }

  shareFdDetails(){
    this.shareDetails = !this.shareDetails ;
  }

  onCancel() {
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/myAccountsInfo');
    }
    else{
      this.location.back();
    }
  }

  openPopup(popup){
    if(this.closeRDForm.valid && this.isTermsAndCondition){
      this.commonMethod.openPopup('div.popup-bottom.'+popup);
    } else{
      this.validateForm();
    }
  }

  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  termsConditionPopup(type){
    switch(type){
      case 'closed' :
        this.commonMethod.openPopup('div.terms-conditions-popup')
        break ;
    default :
        break;
    }
  }

  closeTerms(){
    this.commonMethod.closeAllPopup();
  }

  onCheckboxChecked(event) {
    console.log(event);
    this.isTermsAndCondition = event.target.checked;
  }

  submitShare(){
    this.accountDetailsList = [];
    console.log(this.shareDtl);

    if(this.shareDtl.rdAccNumber){
      this.accountDetailsList.push({ label: 'RD Account Number', value: this.selectedAccData?.account});
    }
    if(this.shareDtl.maturityDate){
      this.accountDetailsList.push({ label: 'Maturity Date', value: this.rdDetailsData?.maturityDate});
    }
    if(this.shareDtl.tenure){
      this.accountDetailsList.push({ label: 'Tenure', value: this.rdDetailsData?.depositPeriodMonthsComponent + ' Months'});
    }
    if(this.shareDtl.interestRate){
      this.accountDetailsList.push({ label: 'Current Rate of Interest', value: this.rdDetailsData?.interest_Rate});
    }
    if(this.shareDtl.modeOdRdOpening){
      this.accountDetailsList.push({ label: 'Mode Of RD Opening', value: this.rdDetailsData?.account == 'ONLINE USE' ? 'Online' : 'Branch'});
    }
    if(this.shareDtl.maturityPayoutAcc){
      this.accountDetailsList.push({ label: 'Maturity Payout Account',value: this.rdDetailsData?.repaymentAccountNumber });
    }

    this.shareAccountDtl();
  }

  shareAccountDtl() {
    this.shareDetails = !this.shareDetails ;
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

  cancelShare(){
    this.shareDetails = false;
  }

}
