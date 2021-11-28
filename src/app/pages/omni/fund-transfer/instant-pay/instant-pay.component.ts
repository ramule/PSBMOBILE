import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../utilities/common-methods';
import { InstantPayService } from './instant-pay.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { InitiateSendMoneyService } from '../../fund-transfer/initiate-send-money/initiate-send-money.service';
import { DatePipe, Location } from '@angular/common';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { AccountType } from '../../../../utilities/app-enum';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { AddPayeeService } from '../add-payee/add-payee.service';
import {MyAccountInfoService} from '../../my-accounts/my-accounts-info/my-account-info.service'
import { OtherBankService } from '../other-bank/other-bank.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-instant-pay',
  templateUrl: './instant-pay.component.html',
  styleUrls: ['./instant-pay.component.scss'],
})
export class InstantPayComponent implements OnInit {
  accountList: any = [];
  refreshedTime: any;
  accountValue: any = '';
  accBalance: any = '';
  selectedTab: any = 'withinbank';
  upidForm: FormGroup;
  mmidForm: FormGroup;
  withinBankForm: FormGroup;
  isIFSCVerified: boolean = false;
  isMMIDVerified: boolean = false;
  bankAddress:any;
  bankDtl: any;
  invalidAmount: any = false;
  exceedMinAmt: boolean = false;
  searchIfscForm: FormGroup;
  searchIfsc: any = [];
  selAcc:any;
  invalidAccount = false;
  selectedAccount: any = '';
  isPSBCustomer:boolean = false;
  errorMsg = '';
  requiredDataforIfsc
  selectedAccIfsc
  resp: any;
  isUPIId = false;
  accountMatchError : any ;
  maskedSelectedAccountNo: any = '';
  isMMIDValid:boolean = false;
  constructor(
    private router: Router,
    public DataService: DataService,
    private commonMethod: CommonMethods,
    private instantPayService: InstantPayService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    public instaService: InitiateSendMoneyService,
    private location: Location,
    private customCurrencyPipe: CustomCurrencyPipe,
    private formValidation: FormValidationService,
    private datepipe: DatePipe,
    private addPayeeService:AddPayeeService,
    private myAccountInfoService : MyAccountInfoService,
    private otherBankService:OtherBankService
  ) {}

  buildForm() {
    if(this.selectedTab == 'outsidebank') {
      this.upidForm = new FormGroup({
        accountNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.min(1), Validators.pattern("^[A-Z0-9_]*$")]),
        confirmAccountNumber: new FormControl('', [Validators.required, Validators.pattern("^[A-Z0-9_]*$")]),
        ifsc: new FormControl('', [Validators.required, Validators.pattern("^[A-Z0-9_]*$"), Validators.minLength(11)]),
        payeeName: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required,Validators.min(1)]),
        remark: new FormControl(''),
      },
      { validators: [this.accountNo.bind(this)]});
    }
    else if(this.selectedTab == 'mmid') {
      this.mmidForm = new FormGroup({
        mobileNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.minLength(10)]),
        confirmMobileNumber: new FormControl('', [Validators.required]),
        mmid: new FormControl('', [Validators.required]),
        payeeName: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required,Validators.min(1)]),
        remark: new FormControl(''),
      },
      { validators: [this.validMobileNo.bind(this)]});
    }
    else if(this.selectedTab == 'withinbank') {
      this.withinBankForm = new FormGroup({
        accountNumber: new FormControl('', [Validators.required, Validators.minLength(14), Validators.min(1), Validators.pattern("^[A-Z0-9_]*$")]),
        confirmAccountNumber: new FormControl('', [Validators.required, Validators.pattern("^[A-Z0-9_]*$")]),
        payeeName: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required,Validators.min(1)]),
        remark: new FormControl(''),
      },
      { validators: [this.accountNo.bind(this)]});
    }

    this.searchIfscForm = new FormGroup({
      enterBank: new FormControl(''),
      enterBranch: new FormControl(''),
    });

  }

  validateForm(formType) {
    switch (formType) {
      case 'upid':
        if (this.upidForm.invalid) {
          this.upidForm.get('accountNumber').markAsTouched();
          this.upidForm.get('confirmAccountNumber').markAsTouched();
          this.upidForm.get('ifsc').markAsTouched();
          this.upidForm.get('payeeName').markAsTouched();
          this.upidForm.get('amount').markAsTouched();
          return;
        }
        break;

      case 'mmid':
        if (this.mmidForm.invalid) {
          this.mmidForm.get('mobileNumber').markAsTouched();
          this.mmidForm.get('confirmMobileNumber').markAsTouched();
          this.mmidForm.get('mmid').markAsTouched();
          this.mmidForm.get('payeeName').markAsTouched();
          this.mmidForm.get('amount').markAsTouched();
          return;
        }
        break;

      case 'withinbank':
        if (this.withinBankForm.invalid) {
          this.withinBankForm.get('accountNumber').markAsTouched();
          this.withinBankForm.get('confirmAccountNumber').markAsTouched();
          this.withinBankForm.get('payeeName').markAsTouched();
          this.withinBankForm.get('amount').markAsTouched();
          return;
        }
        break;
    }
  }

  ngOnInit(): void {
    this.DataService.setPageSettings('INSTA_PAY');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('INSTA_PAY' , this.router.url)

    var backUrl = this.constant.getPlatform() == 'web'  ? 'dashboard' : 'dashboardMobile';
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({},'self',this.location.prepareExternalUrl(this.router.url));

    console.log("====>"+this.storage.getLocalStorage(this.constant.storage_mobileNo));

    this.buildForm();
  }


  ngAfterViewInit(){
    
    this.DataService.customerOperativeAccList.forEach(el => {
      if( el.accountType != "CAPPI" && el.Status == "Active"){
        if(el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT){
          if(el.accountFlag == "P"){
            this.accountList[0] = el;
          }
        }
      }
    })

    this.DataService.customerOperativeAccList.forEach(el => {
      if( el.accountType != "CAPPI" && el.Status == "Active"){
        if(el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT){
          if(el.accountFlag != "P"){
            this.accountList.push(el);

          }
        }
      }
    })
    console.log('this.accountList' + JSON.stringify(this.accountList));

    if(this.accountList[0].accountNo) {
      this.selectedAccount = this.accountList[0].accountNo;
      this.DataService.transactionReceiptObj.upiOmnifromAcc = this.selectedAccount;
      console.log('selected from account: ', this.selectedAccount);
      this.accountValue = this.accountList[0].accountNo;
      this.maskedSelectedAccountNo = this.accountList[0].SchemeCode.concat(" ",this.accountList[0].sbAccount )
      console.log(this.maskedSelectedAccountNo)
    }

    //this.accBalance = this.DataService.customerOperativeAccList[0].acctBalance;

    console.log(JSON.stringify('this.accountList' + this.accountList));
    this.getAccountBalance(this.selectedAccount)
    this.refreshedTime = this.datepipe.transform(
      new Date().toISOString(),
      this.DataService.timeFormat
    );


    this.requiredDataforIfsc = {
      "accountNo" : this.accountList[0].accountNo,
      "branchCode" : this.accountList[0].branchCode,
    }




    this.getifsc();
  }


  getifsc(){
    console.log('this.accountList2' + JSON.stringify(this.requiredDataforIfsc))
    var param = this.myAccountInfoService.getAccountEnquiryParam(this.requiredDataforIfsc);

    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
      var resp = data.responseParameter;
      console.log("respresp" + JSON.stringify(resp))
      if (resp.opstatus == "00") {
        this.selectedAccIfsc = data.set.records[0].ifscCode

      }
    });
  }
  outsidepayeeSearch() {
      var  param = this.instantPayService.validateOutsidePayee(this.upidForm.value , this.selectedAccIfsc , this.selectedAccount);

      this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_NAMEINQUIRYACCOUNTIFSC).subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {

                this.upidForm.patchValue({
                  payeeName : data.set.records[0].accountName
                })

            this.invalidAccount = false;
          } else {
            this.invalidAccount = true;
            this.errorCallBack(data.subActionId, resp);
          }
        });
  }
//   mmidpayeeSearch() {
//     var  param = this.instantPayService.validatemmidPayee(this.upidForm.value , this.selectedAccIfsc , this.selectedAccount);

//     this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_NAMEINQUIRYMMID).subscribe((data) => {
//         console.log(data);
//         var resp = data.responseParameter;
//         if (resp.opstatus == '00') {

//               this.upidForm.patchValue({
//                 payeeName : data.set.records[0].accountName
//               })

//           this.invalidAccount = false;
//         } else {
//           this.invalidAccount = true;
//           this.errorCallBack(data.subActionId, resp);
//         }
//       });
// }



  onConfirmAccountChange(number , from) {

    if(this.withinBankForm.hasError("accountNotMatch")){
      this.withinBankForm.patchValue({
        payeeName :''
      })
      return;
    }

    if (number.length == 14) {


      var param = this.instantPayService.validatePayee(this.withinBankForm.value);
      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_ACCOUNTNAME
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {
            switch(from){
              case "within":
                console.log("testttttttt ::::",data.set.records[0].accountName)
                  this.withinBankForm.patchValue({
                    payeeName : data.set.records[0].accountName
                  })

                break;
              case "outside":
                // this.outsideBankForm.patchValue({
                //   payeeName : data.set.records[0].accountName
                // })
                break;
            }
            this.invalidAccount = false;
          } else if(resp.opstatus == '01'){
            this.invalidAccount = true;
            this.accountMatchError = resp.Result
              this.commonMethod.openPopup('div.popup-bottom.sm-popup.error-popup')
          }
          else {
            this.invalidAccount = true;
            this.errorCallBack(data.subActionId, resp);
          }
        });

      // this.accountindex = this.accountList.findIndex(x => x.accountNo == number);
      // this.payeeIndex = this.payeeList.findIndex(x => x.beneficiary_account_no == number);
    // if(this.accountindex == -1 && this.payeeIndex == -1){
    //   this.invalidAccount = false;
    // }else{
    //   this.invalidAccount = true;
    // }

  }
}

closeAccountPopup(){
  this.commonMethod.closeAllPopup();
  this.withinBankForm.reset();
}

  /**
  * Validation if accountNo & confirm accountNo doesn't match
  * @param formGroup
  */
  accountNo(formGroup: FormGroup) {
    const { value: payeeAccNo } = formGroup.get('accountNumber');
    const { value: payeeCnfAccNo } = formGroup.get('confirmAccountNumber');
    return payeeAccNo === payeeCnfAccNo ? null : { accountNotMatch: true };
  }

  validMobileNo(formGroup: FormGroup){
    const { value: payeeMobileNo } = formGroup.get('mobileNumber');
    const { value: payeeCnfMobileNo } = formGroup.get('confirmMobileNumber');
    return payeeMobileNo === payeeCnfMobileNo ? null : { mobileNoNotMatch: true };
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  onAccountSelectType() {
    if (window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(selAcc,type) {
    this.selAcc = selAcc;
    if(type == "ifsc") {
      this.upidForm.patchValue({ ifsc: selAcc.IFSC });
      this.commonMethod.closePopup('div.popup-bottom.search-ifsc2');
      this.bankAddress = selAcc.bank + "," + selAcc.city + "," + selAcc.cust_address ;
    }
    this.bankDtl = selAcc;
    this.maskedSelectedAccountNo = selAcc.SchemeCode.concat(" ", selAcc.sbAccount);
    this.selectedAccount = selAcc.accountNo;
  }

  selectAccount(selAcc){
    this.accountValue = selAcc.accountNo;
    this.maskedSelectedAccountNo = this.accountList[0].SchemeCode + ' ' + selAcc.sbAccount
    this.getAccountBalance(this.selectedAccount);
  }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  onFromAccountSelect(event) {
    this.selectedAccount = '';
    var formValue
    console.log(this.selectedAccount);
    this.selectedAccount = event;
    this.getAccountBalance(event);
    this.DataService.transactionReceiptObj.upiOmnifromAcc = event;
    // formValue = this.selectedTab == 'withinbank' ? this.withinBankForm : this.selectedTab == 'mmid' ? this.mmidForm : this.selectedTab == 'outsidebank' ? this.upidForm : '' ;
    // this.OnInput(formValue.value.amount, formValue)
  }

verifyMMID(){
 
  if (this.mmidForm.value.mmid.length == 7) {
   
    this.verifyBranch('mmid')
  }
}

  verifyBranch(formType) {
    switch (formType) {
      case 'ifsc':
        if(this.upidForm.get('ifsc').valid) {
          if(this.upidForm.get('accountNumber').valid) {
            this.getNameInquiryAccountIFSCList();
          }
          else {
            this.upidForm.get('accountNumber').markAsTouched();
          }
        }
        else {
          this.upidForm.get('ifsc').markAsTouched();
        }
        break;
      case 'mmid':

        if(this.mmidForm.get('mmid').valid) {
          if(this.mmidForm.get('mobileNumber').valid) {
            this.getNameInquiryMMIDList();
            this.isMMIDVerified  = true
          }
          else {
            this.mmidForm.get('mobileNumber').markAsTouched();
          }
        }
        else {
          this.mmidForm.get('mmid').markAsTouched();
        }
        break;
    }
  }

  instantpaySubmit(formvalue, formType) {
    if(this.invalidAmount){
      return
    }
    if(this.exceedMinAmt){
      return;
    }

    this.DataService.instaSelectedTab = this.selectedTab
    this.DataService.screenType = 'instaPay';
    this.DataService.resetTransactionObj();
    switch (formType) {
      case 'upid':
        if (this.upidForm.valid && this.isPSBCustomer == false) {
          // if(this.isIFSCVerified) {
            console.log('UPID : ', formvalue);

            let param = this.instantPayService.getIFSCFundTransferParam(
              this.upidForm.value,
              this.selectedAccount,
              this.upidForm.value.payeeName
            );

            this.DataService.authorizeHeader = 'INSTA MONEY';
            this.DataService.transactionReceiptObj.from_acc =
              this.selectedAccount;
            this.DataService.transactionReceiptObj.to_acc =
              this.upidForm.value.confirmAccountNumber;
            this.DataService.transactionReceiptObj.payee_name =
              this.upidForm.value.payeeName;
            this.DataService.transactionReceiptObj.ifscCode = this.upidForm.value.ifsc;
            this.DataService.transactionReceiptObj.benificaryBankName = this.bankDtl.bank;
            this.DataService.transactionReceiptObj.modeOfTransfer = "IMPS";

            // .trim().replace(/[^0-9]+/g, '')
            this.DataService.transactionReceiptObj.amount =
              this.upidForm.value.amount;
            this.DataService.transactionReceiptObj.remarks = this.upidForm.value
              .remark
              ? this.upidForm.value.remark
              : '-';
            this.DataService.transactionReceiptObj.date =
              new Date().toISOString();

            this.DataService.request = param;
            this.DataService.endPoint =
              this.constant.serviceName_PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER;



            var objCheckFlag = this.DataService.activitySettingData.findIndex(
              (x) => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]
            );
            //  if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {

            //  }
            this.DataService.otpSessionPreviousPage = "/instantPay";
            this.router.navigate(['/otpSession']);
          // }
          // else {
          //   return;
          // }
        } else {
          this.validateForm(formType);
        }

        break;
      case 'mmid':
        if (this.mmidForm.valid) {
          if(this.isMMIDVerified && this.isMMIDValid) {

            console.log('MMID : ', formvalue);
            let param = this.instantPayService.getMMIDFundTransferParam( this.mmidForm.value,this.selectedAccount, this.mmidForm.value.payeeName );

            this.DataService.authorizeHeader = 'INSTA MONEY';
            this.DataService.transactionReceiptObj.from_acc =
              this.selectedAccount;
            this.DataService.transactionReceiptObj.to_acc = '-';
            this.DataService.transactionReceiptObj.payee_name =
              this.mmidForm.value.payeeName;

            this.DataService.transactionReceiptObj.mmid =  this.mmidForm.value.mmid;;
            this.DataService.transactionReceiptObj.confirmmobilenumber =  this.mmidForm.value.confirmMobileNumber;;

            // .trim().replace(/[^0-9]+/g, '')
            this.DataService.transactionReceiptObj.amount =
              this.mmidForm.value.amount;
            this.DataService.transactionReceiptObj.remarks = '-';
            this.DataService.transactionReceiptObj.date =
              new Date().toISOString();

            this.DataService.request = param;
            this.DataService.endPoint = this.constant.serviceName_MMID;
            this.DataService.otpSessionPreviousPage = "/instantPay";
            this.router.navigate(['/otpSession']);
          }
          else {
            return;
          }
        } else {
          this.validateForm(formType);
        }

        case 'withinbank':
          // this.OnInput(formvalue.value.amount, formvalue)
          if (this.withinBankForm.valid ) {
            console.log('withinbankform : ', formvalue);
            let param = this.instantPayService.getFundTransferParam( this.withinBankForm.value, this.selectedAccount, 'within' ,this.withinBankForm.value.payeeName);

            this.DataService.authorizeHeader = 'INSTA MONEY';
            this.DataService.transactionReceiptObj.from_acc = this.selectedAccount;
            this.DataService.transactionReceiptObj.to_acc = this.withinBankForm.value.accountNumber;
            this.DataService.transactionReceiptObj.payee_name = this.withinBankForm.value.payeeName;
            // .trim().replace(/[^0-9]+/g, '')
            this.DataService.transactionReceiptObj.amount = this.withinBankForm.value.amount;
            this.DataService.transactionReceiptObj.remarks = this.withinBankForm.value.remark ? this.withinBankForm.value.remark : '-';
            this.DataService.transactionReceiptObj.date = new Date().toISOString();
            this.DataService.request = param;
            this.DataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;
            this.DataService.otpSessionPreviousPage = "/instantPay";
            this.router.navigate(['/otpSession']);
          } else {
            this.validateForm(formType);
          }
    }
  }

  getNameInquiryAccountIFSCList() {
    var param = this.instantPayService.getNameInquiryAccountIFSC(
      this.upidForm.value,
      this.selectedAccount
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_NAMEINQUIRYACCOUNTIFSC
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.isIFSCVerified = true;
          this.upidForm.patchValue({
            payeeName: resp.npciPayeeName,
          });
        }
        // else {
        //   this.errorCallBack(data.subActionId, resp);
        // }
      });
  }

  getNameInquiryMMIDList() {
    var param = this.instantPayService.getNameInquiryMMID(
      this.mmidForm.value,
      this.selectedAccount
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_NAMEINQUIRYMMID
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.isMMIDValid = false;
          this.mmidForm.patchValue({
            payeeName: resp.NpciPayeeName,
          });
        }else{
          this.isMMIDValid = true;
        }
        // else {
        //   this.errorCallBack(data.subActionId, resp);
        // }
      });
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    console.log(subActionId);
    if (subActionId == 'NAMEINQUIRYACCOUNTIFSC' && resp.opstatus == "08") {
      this.errorMsg = 'Payee name not found';
      this.commonMethod.openPopup('div.popup-bottom.error-popup-searchpayee');
    } else {
      showToastMessage(resp.Result, 'error');
    }
  }

  /**
   * on cancel click
   */
  cancel() {
    if (this.constant.getIsCordova() == 'web') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboardMobile']);
    }
  }

  /**
   * set update currency value
   * @param value
   */
  formatCurrency(value, type) {
    let amt = this.customCurrencyPipe
      .transform(value, 'decimal')
      .replace(/[^.0-9]+/g, '');
      if(type == 'upidForm') {
        this.formValidation.formatCurrency(value, this.upidForm);
      }
      else if(type == 'mmidForm') {
        this.formValidation.formatCurrency(value, this.mmidForm);
      }
      else if(type == 'withinBankForm') {
        this.formValidation.formatCurrency(value, this.withinBankForm);
      }
  }

  /**
   * This function is use to call api to fetch
   * accounts balance
   */
  getAccountBalance(selectedAccount) {
    this.invalidAmount = false;
    var formValue ;
    if (selectedAccount == '') {
      showToastMessage('Please select account');
      return;
    }

    var param = this.instantPayService.getAccountBalanceParam(selectedAccount);
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_BALANCEINQUIRY
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.accBalance = data.set.records[0].ledgerBalance;
          this.refreshedTime = this.datepipe.transform(
            new Date().toISOString(),
            this.DataService.timeFormat
          );

          formValue = this.selectedTab == 'withinbank' ? this.withinBankForm : this.selectedTab == 'mmid' ? this.mmidForm : this.selectedTab == 'outsidebank' ? this.upidForm : '' ;
          this.OnInput(formValue.value.amount, formValue)
          if(!this.exceedMinAmt && !this.invalidAmount ){
            this.validateForm(formValue)
          }
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  goBack() {
    this.location.back();
  }

  onTabChange(type) {
    if(type =='vpa'){
      this.DataService.isUPIInstantPay = true;
      this.isUPIId = true;
      // this.router.navigateByUrl('/bhimUpiPay');
      // return;
    }else{
      this.isUPIId = false;
    }
    this.selectedTab = type;
    console.log('selected tab: ', this.selectedTab);
    this.buildForm();
    this.isIFSCVerified = false;
    this.isMMIDVerified = false;
  }

  clearIfscPrevData(){
    if(this.upidForm.value.ifsc.length != 0 &&  this.upidForm.controls.ifsc.invalid){
      this.upidForm.patchValue({
        ifsc : ''
      })
      this.bankAddress = ''
    }
  }

  getBranchDtlFromIfsc() {
  
    this.isPSBCustomer = false;
    if (this.upidForm.value.ifsc.length != 11) {
      this.bankAddress = ''
      return;
    }

    if (
      this.upidForm.value.ifsc.length == 11 &&
      this.upidForm.value.ifsc.slice(0, 4).toLowerCase() == 'psib'
    ) {
      this.isPSBCustomer = true;
      return;
    }

    this.upidForm.patchValue({
      ifsc: this.upidForm.value.ifsc.toUpperCase()
    })

    var param = this.addPayeeService.getBranchFromIFSC(
      this.upidForm.value.ifsc
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_GETIMPSMASTERBYIFSC
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          if (data.hasOwnProperty('set')) {
            this.bankAddress = data.set.records[0].bank + "," + data.set.records[0].city + "," + data.set.records[0].cust_address ;
            this.bankDtl = data.set.records[0];
            this.upidForm.patchValue({
              ifsc: this.bankDtl.IFSC
            })
          }
        } else {
          this.upidForm.patchValue({
            ifsc : ''
          })
          this.bankAddress = ''
        }
      });
  }

  goToSendMoneyPayee(value){

  }


  OnInput(evn , form:FormGroup){
    var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
    evn = evn.replace(regex, '$1');

    form.patchValue({
      amount:evn
    })

    console.log(evn);
    if(Number(this.accBalance) > Number((evn.trim().replace('₹', '')).replace(/,/g, ''))){
      this.invalidAmount = false
    }else{
      this.invalidAmount = true
    }

    var amt = evn
    if(parseFloat(amt.trim().replace(/[^.0-9]+/g, '')) > 10000){
      this.exceedMinAmt = true;
    }
    else{
      this.exceedMinAmt = false;
    }

  }

  inputClick() {
    this.commonMethod.openPopup('div.popup-bottom.search-ifsc1');
  }

  gotoContinue() {
    this.commonMethod.closePopup('div.popup-bottom.search-ifsc1');
    console.log('Star form:', this.searchIfscForm.value);
    var param = this.addPayeeService.getIFSCCodeParams(
      this.searchIfscForm.value
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_GETBRANCHLISTBYBRANCHBANK
      )
      .subscribe((data) => {
        console.log(data);
        console.log('get favourite list', this.searchIfsc);
        var resp = data.responseParameter;
        // console.log("data.responseParameter " + data.responseParameter.bankName)
        if (resp.opstatus == '00') {
          this.commonMethod.openPopup('div.search-ifsc2');
          this.searchIfsc = data.set['records'];
        } else {
          this.errorCallBack(data.subActionId, this.resp);
        }
      });
  }

  closepopup() {
    this.commonMethod.closePopup('div.search-ifsc2');
  }


  closeSelpopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.'+popupName);
  }
  
}
