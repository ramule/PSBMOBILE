import { Component, OnInit, ElementRef, AfterViewInit   } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { AppConstants } from 'src/app/app.constant';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DonationsService } from '../donations/donations.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { InitiateSendMoneyService } from '../fund-transfer/initiate-send-money/initiate-send-money.service';
import { DatePipe } from '@angular/common';
import { DashboardService } from '../dashboard/dashboard.service';
import { DetailStatementService } from '../my-accounts/detailed-statement/detailed-statement.service';
import { Location } from '@angular/common';
import { AccountType } from '../../../../app/utilities/app-enum';
declare var showToastMessage: any;

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DonationsComponent implements OnInit,AfterViewInit {
  donationForm: FormGroup;
  ToDonateList = [];
  accountList:any = [];
  SchemeCode = "";
  maskedSelectedAccount = "";
  paymentType:any ='self';
  paymentMode:any = '';
  accountNumber:any = '';
  refreshedTime:any;
  toAccSelected = '';
  totalSavingAmt: any = 0;
  totalDepositeAmt: any = 0;
  totalBorrowingAmt: any = 0;
  totalWorth:any = 0;
  ID:any;
  companyName:any = '';
  selectedAccount:any;
  isDonneSelected = false;
  invalidAmount = false;
  selDontationAcc:any;
  selDonateAccount:any;
  selectedFromAccMobile:any;

  isSelected = false;
  accBalance:any=""
  commonPageComponent = {
    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'innerFooter',
    'currentpageRoute':  this.router.url
  }
  constructor(
    private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    public translate: TranslatePipe,
    private formBuilder: FormBuilder,
    public dataService: DataService,
    private formValidation: FormValidationService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private donationService: DonationsService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private commonMethod: CommonMethods,
    private initiateSendMoneyService:InitiateSendMoneyService,
    public datepipe:DatePipe,
    private detailStatementService:DetailStatementService,
    private location: Location,
    private _eref: ElementRef
  ) {}

  ngOnInit(): void {
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true)

    this.dataService.changeMessage(this.commonPageComponent);
    this.dataService.setPageSettings('DONATION');
    this.dataService.getBreadcrumb('DONATION' , this.router.url)
    this.buildForm();
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    // var data = this.dataService.customerOperativeAccList.filter(
    //   (obj) =>(obj.accountType!='CAPPI')
    // );

    // this.accountList = data.filter(
    //   (obj) =>(obj.Status.toLowerCase()=='active')
    // );

    this.dataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag == "P") {
            this.accountList[0] = el;
          }
        }
      }
    })

    this.dataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag != "P") {
            this.accountList.push(el);
          }
        }
      }
    })

    this.accountNumber = this.accountList[0].accountNo;
    this.selectedAccount = this.accountNumber;
    this.onFromAccountSelect(this.selectedAccount);
    this.getAccountBalance(this.accountNumber);
    this.accBalance = this.accountList[0].acctBalance
    console.log("this.accountList" +  JSON.stringify(this.accountList));
    this.dataService.otpSessionPreviousPage = this.router.url;
    
  }

  ngAfterViewInit(){
    var param = this.donationService.getDonationList();
    this.getDonationTypeList(param);
  }


  breadcrumroute(routeName){
    this.dataService.updateBreadcrumb(this.router.url , routeName)
    this.router.navigateByUrl('/' + routeName);
  }
  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)){
      $('#ToDonateList').slideUp();
      $('#ToDonateList').parent().removeClass('active')
    } // or some similar check

   }
  getDonationTypeList(param) {
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_DONATIONLIST
      )
      .subscribe((data) => {
        console.log('=========>', data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.ToDonateList = data.set.records;
        } else {
          this.ToDonateList = [];
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

    /**
    * function to called on unsuccessfull responce
    * @subActionId
    * @resp
    */
     errorCallBack(subActionId, resp) {
      showToastMessage(resp.Result, "error");
    }

  donationSubmit() {
    this.validateForm();
    this.onFundTransfer();
  }
  openList(e) {
    e.stopPropagation();
    $('#ToDonateList').slideToggle();
    $('#ToDonateList').parent().toggleClass('active')
  }

  selectToAcc(value) {
    console.log(JSON.stringify(value));
    this.isSelected = true
    this.donationForm.patchValue({
      toAccount: value.accountNumber,
    });

    this.toAccSelected = value.accountNumber;
    this.ID = value.ID;
   // alert( this.ID)
    this.companyName = value.companyName;
    $('#ToDonateList').slideUp();
    this.isSelected = true;
  }

  accountItem(accountNo){
    this.accountNumber = accountNo;
    this.getAccountBalance(accountNo);
  }

  buildForm() {
    this.donationForm = new FormGroup({
      toAccount: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required , Validators.min(1) , Validators.max(200000)]),
      remarks: new FormControl(this.dataService.profileDetails[0]?.panNumber, []),
      paymentMode: new FormControl(''),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    return ('' + str).slice(0, -n).replace(/./g, 'X') + ('' + str).slice(-n);
  }

  validateForm() {
    if (this.donationForm.invalid) {
      this.donationForm.get('toAccount').markAsTouched();
      this.donationForm.get('amount').markAsTouched();
      this.donationForm.get('paymentMode').markAsTouched();
      this.donationForm.get('acceptTerms').markAsTouched();
      return;
    }
  }


  onReset(){
    this.isDonneSelected = false;
    this.toAccSelected = ''
    this.donationForm.reset();
    this.companyName= ''
    this.donationForm.get('toAccount').markAsUntouched();
    this.donationForm.get('amount').markAsUntouched();
    this.donationForm.get('paymentMode').markAsUntouched();
    this.donationForm.get('acceptTerms').markAsUntouched();
    this.donationForm.get('acceptTerms').markAsPristine();
    // if(this.constant.getIsCordova() == "web"){
    //   this.router.navigateByUrl('/dashboard');
    // }
    // else{
    //   this.router.navigateByUrl('/dashboardMobile');
    // }
  }

  onFundTransfer() {

    this.isDonneSelected = true;
    this.dataService.request = ""

    console.log(this.donationForm.valid);
    if (this.donationForm.valid) {

      if(this.invalidAmount){
        return
      }
      this.dataService.resetTransactionObj();
      var donationReqParam = this.donationService.getDonationFundTransferParam(this.donationForm.value , this.accountNumber , this.toAccSelected , 'self' , this.ID,this.companyName);
      this.dataService.request = donationReqParam;
      this.dataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;

      this.dataService.authorizeHeader = "DONATION SEND MONEY";
      this.dataService.transactionReceiptObj.accountNumber = this.accountNumber;
      this.dataService.transactionReceiptObj.to_acc = this.toAccSelected;
      this.dataService.transactionReceiptObj.payeeName = this.companyName;

      this.dataService.transactionReceiptObj.amount = this.donationForm.value.amount;
      this.dataService.transactionReceiptObj.remarks = this.donationForm.value.remarks;
      this.dataService.transactionReceiptObj.date = this.datepipe.transform(new Date().toISOString(), "dd MMM yyyy h:mm a" );
      this.dataService.screenType = 'donationTransfer';
      this.router.navigate(['/otpSession']);

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

      var param = this.initiateSendMoneyService.getAccountBalanceParam(selectedAccount);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.accBalance = data.set.records[0].ledgerBalance
          this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.dataService.timeFormat);

        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      })
    }


    goBack(){
      if(this.constant.getIsCordova() == "web"){
        this.router.navigateByUrl("/dashboard");
      }
      else{
        this.location.back();
      }
    }

    clickedOut(event){
        $('#ToDonateList').slideUp();
        $('#ToDonateList').parent().removeClass('active')
    }

     /**
   * set update currency value
   * @param value
   */
   formatCurrency(value) {
    let amt = this.customCurrencyPipe.transform(value,  'decimal').replace(/[^.0-9]+/g,'');
    this.formValidation.formatCurrency(value,this.donationForm);
   }

   OnInput(evn , form:FormGroup){

    var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
    evn = evn.replace(regex, '$1');

    form.patchValue({
      amount:evn
    })

    if (Number(this.accBalance) >= Number((evn.trim().replace('₹', '')).replace(/,/g, ''))) {
    //if(Number(this.accBalance) > Number(evn.trim().replace(/[^.0-9]+/g, ''))){
      this.invalidAmount = false
    }else{
      this.invalidAmount = true
    }

  }

  onFocus(value){
    // this.amountInWords = "";
    let _amount = value.replace(/[^0-9.]+/g,'');
    this.donationForm.patchValue({ amount: _amount });
  }

  //designs for mobile
  selFromAccMobile(){
    this.commonMethod.openPopup('div.popup-bottom.sel-account');
  }

  onFromAccountSelect(selectedAccount){
    console.log(selectedAccount);
    
    var account = this.accountList.filter((objs) => objs.accountNo == selectedAccount)[0];
    this.SchemeCode= account.SchemeCode
    this.maskedSelectedAccount =  account.sbAccount;
    this.selectedFromAccMobile = selectedAccount;
    this.accountItem(selectedAccount)
  }


  closePopup(){
    this.commonMethod.closeAllPopup()
  }


  selDonateAcc(item){
    this.selDontationAcc = item;
  }

  selectDonateAccount(donateAcc){
    this.selDonateAccount = donateAcc.accountNumber;
    this.selectToAcc(donateAcc);
  }


  toDoneeAccMobile(){
    this.commonMethod.openPopup('div.popup-bottom.sel-account2');
  }

  openPopUp(){
    this.commonMethod.openPopup("div.tpin-popup")
  }

  closepopup(){
    this.commonMethod.closePopup("div.tpin-popup")
  }
}
