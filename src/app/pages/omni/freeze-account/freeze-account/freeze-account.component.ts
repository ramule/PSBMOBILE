import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FreezeAccountService } from  './freeze-account.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common';


declare var freezeAccountconfirmation: any;
declare var showToastMessage: any;

@Component({
  selector: 'app-freeze-account',
  templateUrl: './freeze-account.component.html',
  styleUrls: ['./freeze-account.component.scss'],
})
export class FreezeAccountComponent implements OnInit {
  freezeAccountForm: FormGroup;
  selectedAccountData: any;
  accountList:any;
  accountNumber;
  selectedAccount:any;
  type:any;
  selectedAccountNo ='SELECT';
  selected : any ;

  commonPageComponent = {

    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'innerFooter',
    'currentpageRoute':  this.router.url
  };

  constructor(
    private router: Router,
    private form: FormBuilder,
    public dataService: DataService,
    private freezeAccountService:FreezeAccountService,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private commonmenthod: CommonMethods,
    private location: Location,

  ) {}

  buildForm() {
    this.freezeAccountForm = new FormGroup({
      accountNumber: new FormControl('', { validators: Validators.required }),
      typeoffreeze: new FormControl('', { validators: Validators.required }),
      remarks: new FormControl(''),
    });

  }

  /**
   * Initialization functionality
   */
  initialization() {
    this.selectedAccountData = this.location.getState();
    console.log(this.selectedAccountData);
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.setPageSettings('FREEZE_ACCOUNTS');
    this.dataService.getBreadcrumb('FREEZE_ACCOUNTS' , this.router.url )

    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile';
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    //this.dataService.changeMessage(this.commonPageComponent);
    this.buildForm();

    this.accountList = this.dataService.customerOperativeAccList.filter(
      (obj) =>(obj.accountType!='CAPPI')
    );
    console.log("accountListttttttt:::::::::::",this.accountList);

    if(this.selectedAccountData.account) {
      this.freezeAccountForm.patchValue({
        accountNumber : this.selectedAccountData.account,
        typeoffreeze: 'Debit'
      })
    }
    else {
      this.freezeAccountForm.patchValue({
        accountNumber : this.accountList[0].accountNo,
        typeoffreeze: 'Debit'
      })
    }

    this.dataService.otpSessionPreviousPage = "/freezeAccount"

  }

  ngOnInit(): void {

    this.initialization();

    // this.dataService.changeMessage(this.commonPageComponent);
  }

  validateForm(){
    //within bank
    if (this.freezeAccountForm.invalid) {
      this.freezeAccountForm.get('accountNumber').markAsTouched();
      this.freezeAccountForm.get('typeoffreeze').markAsTouched();
      this.freezeAccountForm.get('remarks').markAsTouched();
      return;
    }
  }
  breadcrumroute(routeName){
    this.dataService.updateBreadcrumb(this.router.url , routeName)
    this.router.navigateByUrl('/' + routeName);
  }
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  submit(){

    console.log("this.freezeAccountForm.value.remarks" + this.freezeAccountForm.value.remarks);

    this.validateForm();
    if(this.freezeAccountForm.valid){
      this.type = "";
      if(this.freezeAccountForm.value.typeoffreeze == 'D'){
        this.type = "Debit"
      }
      else if(this.freezeAccountForm.value.typeoffreeze == 'C'){
        this.type = "Credit"
      }
      else if(this.freezeAccountForm.value.typeoffreeze == 'T'){
        this.type = "Total"
      }
      this.commonmenthod.openPopup('div.confirmation1');
      // $('.popup-bottom .sm-popup .confirmation1').show();
    }
  }

  cancel(){
    this.commonmenthod.closePopup('div.confirmation1');
  }

  proceed(){
    this.selectedAccount = []
    this.accountList.forEach(element => {
      if(element.accountNo == this.freezeAccountForm.value.accountNumber)
      {
          var data = {
            'accountNo':element.accountNo,
            'branchCode':element.branchCode
          }
          this.selectedAccount.push(data)
      }
    });

    if(this.freezeAccountForm.value.accountNumber == 'all'){
      this.freezeAccount()
      return;
    }

    var param = this.freezeAccountService.getAccountEnquiryParam(this.selectedAccount);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data);
        if (data.hasOwnProperty("set")) {
          var data = data.set.records[0].statement.split(',')
          var freezdata = data[6].trim()
          if(freezdata=='D' || freezdata=='F' || freezdata=='R')
          {
            this.cancel();
            //showToastMessage('Account already frozen','error')
            this.commonmenthod.openPopup('div.popup-bottom.acc-already-freeze');
          }
          else
          {
            this.freezeAccount();
          }

        }
      }
      else {

      }
    });
   // this.freezeAccount();
  }

  freezeAccount() {
    this.dataService.resetTransactionObj();
    let param;
    if(this.freezeAccountForm.value.accountNumber == "all"){
      param = this.freezeAccountService.freezeAccountParamCIF(this.freezeAccountForm.value);
      this.dataService.endPoint = this.constant.serviceName_FREEZACCOUNTCIF;
    }else{
      param = this.freezeAccountService.freezeAccountParam(this.freezeAccountForm.value);
      this.dataService.endPoint = this.constant.serviceName_FreezeAccount;
    }

    this.dataService.screenType = 'freezeAccount';
    this.dataService.feedbackType = "freezeAccount"
    this.dataService.authorizeHeader = "FREEZE ACCOUNT";

    var totalAcc  = "";
    this.accountList.forEach(el => {
      totalAcc += ", "+el.accountNo
    });
    this.dataService.transactionReceiptObj.accountNumber = this.freezeAccountForm.value.accountNumber == "all" ? totalAcc.substring(1) : this.freezeAccountForm.value.accountNumber ;
    // this.dataService.transactionReceiptObj.typeOfFreeze = this.freezeAccountForm.value.typeoffreeze;
    this.dataService.transactionReceiptObj.typeOfFreeze = 'Debit Freeze Only';
    this.dataService.transactionReceiptObj.remarks = this.freezeAccountForm.value.remarks ? this.freezeAccountForm.value.remarks : "Freezed by customer";
    this.dataService.request = param;
    this.dataService.otpSessionPreviousPage = "/freezeAccount"

    this.router.navigateByUrl("/otpSession");
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
   errorCallBack(subActionId, resp) {
    if (resp.opstatus == '02') {
      showToastMessage(resp.Result, 'error');
    }
  }

  goBack(){
    if(this.constant.getIsCordova() == "web"){
      if(this.dataService.fromAccountInfo){
        this.dataService.fromAccountInfo = false;
        this.router.navigateByUrl("/" + this.dataService.previousPageUrl);
      }else{
        this.router.navigateByUrl("/dashboard");
      }
    }
    else{
      this.location.back();
    }
  }

  closePopup(popup){
    this.commonmenthod.openPopup(popup);
  }

  closePopups(){
    this.commonmenthod.closePopup('div.popup-bottom.sel-account');
  }

  selectAccount(){
    this.commonmenthod.openPopup('div.popup-bottom.sel-account');
  }
  getSelectedAccount(accNo){
    this.selectedAccountNo = accNo.SchemeCode +" "+ accNo.sbAccount;
    this.selected = this.selectedAccountNo;

    this.freezeAccountForm.patchValue({
      accountNumber : accNo.accountNo
    })
  }

}
