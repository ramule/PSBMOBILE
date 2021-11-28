import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AppConstants } from 'src/app/app.constant';
import { CloseFdService } from './close-fd.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import * as moment from 'moment';
declare var window: any;
declare var OSREC: any;
@Component({
  selector: 'app-close-fd',
  templateUrl: './close-fd.component.html',
  styleUrls: ['./close-fd.component.scss']
})
export class CloseFdComponent implements OnInit {

  selectedAccData: any = "";
  fdDetailsData: any = "";
  totalAccountList: any = [];
  accountDtls: any;
  selAccDtl: any;
  accountDetailsList: any = [];
  isTermsAndCondition: boolean;
  shareDtl:any = {
    'fdAccNumber' : false,
    'accType' : false,
    'accScheme' : false,
    'interestRate' : false,
    'branchAddress' : false,
    'custId' : false,
    'nomineeName' : false
  };

  constructor(
    private router:Router,
    public dataService: DataService,
    private location: Location,
    private constant: AppConstants,
    private commonMethod : CommonMethods,
    private closeFdService: CloseFdService) { }

  closeFDForm : FormGroup;
  shareDetails : boolean = false ;

  ngOnInit(): void {
    this.selectedAccData = this.location.getState();
    console.log('selected acc data: ', this.selectedAccData);
    this.fdDetailsData = this.selectedAccData.FDRDData;
    console.log('FD RD data: ', this.fdDetailsData);
    this.totalAccountList = this.dataService.customerMyDepostie;
    this.selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.selectedAccData.account);
    console.log('selected account details : ', this.selAccDtl);
    this.accountDtls = this.selectedAccData.accountDtls;
    console.log('accountDtls: ', this.accountDtls);
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)
    this.dataService.getBreadcrumb('CLOSE_FD' , this.router.url)
    this.dataService.setPageSettings('CLOSE_FD');
    this.buildForm();
    this.closeFDForm.patchValue({
      fdAccount: this.selectedAccData.account,
      depositAccount: this.convertCurrency(this.fdDetailsData.depositAmount),
      originalMaturityAmount: this.convertCurrency(this.fdDetailsData.maturityAmount),
      currentFDAccountBalance: this.convertCurrency(this.fdDetailsData.accountClearBalance),
      maturityPayoutAccount: this.fdDetailsData.repaymentAccountNumber,
      fdOpenDate: this.fdDetailsData.accountOpenDate,
      // fdRenewalDate: this.fdDetailsData,
      fdMaturityDate: this.fdDetailsData.maturityDate
    })
  }

  convertCurrency(value) {
    return OSREC.CurrencyFormatter.format(value, { currency: 'INR', symbol: '₹' });
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  buildForm() {
    this.closeFDForm = new FormGroup({
      fdAccount: new FormControl('', [Validators.required]),
      depositAccount: new FormControl(''),
      originalMaturityAmount: new FormControl(''),
      currentFDAccountBalance: new FormControl(''),
      maturityPayoutAccount : new FormControl(''),
      remark : new FormControl(''),
      fdOpenDate :new FormControl(''),
      fdMaturityDate :new FormControl(''),
      termsCondition : new FormControl('', [Validators.required]),
    });
  }

  validateForm(){
    if (this.closeFDForm.invalid) {
      this.closeFDForm.get('fdAccount').markAsTouched();
      this.closeFDForm.get('remark').markAsTouched();
      this.closeFDForm.get('termsCondition').markAsTouched();
    }
  }

  closeFdSubmit(formValue){
    if(this.closeFDForm.valid){
      // console.log("Close RD", formValue);

      let date = this.fdDetailsData.accountOpenDate.split("/")[0];
      let month = this.fdDetailsData.accountOpenDate.split("/")[1];
      let year = this.fdDetailsData.accountOpenDate.split("/")[2];
      var maturityDiff = parseInt(""+moment().diff(year+"-"+month+"-"+date,'years',true))

      if(maturityDiff < 5 && this.fdDetailsData.SchemeCode=='FDTXO' || 
      this.fdDetailsData.SchemeCode=='FDTXC' || 
      this.fdDetailsData.SchemeCode=='FDTSF' || 
      this.fdDetailsData.SchemeCode=='FDTXS' || 
      this.fdDetailsData.SchemeCode=='FDTXZ' || 
      this.fdDetailsData.SchemeCode=='FDTSS'
      )
      {
        this.commonMethod.openPopup('div.popup-bottom.FD')
        return;
      }

      this.dataService.feedbackType = "closeFD";
      var param = this.closeFdService.getCloseFDCall(this.selectedAccData.account);
      this.dataService.request = param;
      this.dataService.endPoint = this.constant.serviceName_TDCLOSUREVALIDATION;
      var objCheckFlag = this.dataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.dataService.endPoint.split('/')[1]);
      if(this.dataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
        this.dataService.closeFDObj.depositType = this.fdDetailsData.accountType;
        this.dataService.closeFDObj.depositScheme = this.fdDetailsData.accountCategory + '-' + this.fdDetailsData.schemeDescription,
        this.dataService.closeFDObj.depositorType = this.fdDetailsData,
        this.dataService.closeFDObj.FDAccNumber = this.selectedAccData.account,
        this.dataService.closeFDObj.rateOfInterest = this.fdDetailsData.interest_Rate,
        this.dataService.closeFDObj.depositAmount = this.fdDetailsData.depositAmount,
        this.dataService.closeFDObj.currentMaturityAmount = this.fdDetailsData.maturityAmount,
        this.dataService.closeFDObj.creditToClose = this.fdDetailsData.maturityAmount,
        this.dataService.closeFDObj.maturityDate = this.fdDetailsData.maturityDate,
        this.dataService.closeFDObj.maturityPayoutAccount = this.fdDetailsData.repaymentAccountNumber,
        this.dataService.closeFDObj.remarks = this.closeFDForm.value.remark,
        this.router.navigateByUrl('/closeFDAuthorization');
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

  submitShare(){
    this.accountDetailsList = [];
    console.log(this.shareDtl);

    if(this.shareDtl.fdAccNumber){
      this.accountDetailsList.push({ label: 'FD Account Number',value: this.selectedAccData?.account});
    }
    if(this.shareDtl.accType){
      this.accountDetailsList.push({ label: 'Account Type',value: 'Term Deposit Account'});
    }
    if(this.shareDtl.accScheme){
      this.accountDetailsList.push({ label: 'Account Scheme',value: this.fdDetailsData?.SchemeCode + "-" + this.selAccDtl?.schemeDescription});
    }
    if(this.shareDtl.interestRate){
      this.accountDetailsList.push({ label: 'Current Rate of Interest',value: this.fdDetailsData?.interest_Rate});
    }
    if(this.shareDtl.branchAddress){
      this.accountDetailsList.push({ label: 'Branch Address',value: this.accountDtls?.BranchAddress});
    }
    if(this.shareDtl.custId){
      this.accountDetailsList.push({ label: 'Customer ID',value: this.dataService.userDetails.cifNumber });
    }
    if(this.shareDtl.nomineeName){
      this.accountDetailsList.push({ label: 'Nominee Name',value: '' });
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

  openPopup(popup){
    if(this.closeFDForm.valid && this.isTermsAndCondition){
      this.commonMethod.openPopup('div.popup-bottom.'+popup);
    } else{
      this.validateForm();
    }
  }

  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  onCheckboxChecked(event) {
    console.log(event);
    this.isTermsAndCondition = event.target.checked;
  }
}
