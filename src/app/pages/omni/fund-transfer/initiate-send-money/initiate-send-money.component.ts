import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { FormValidationService } from '../../../../services/form-validation.service';
import { InitiateSendMoneyService } from './initiate-send-money.service';
import { OtherBankService } from '../other-bank/other-bank.service';
import { CustomCurrencyPipe } from '../../../../pipes/custom-currency.pipe';
import { CommonMethods } from '../../../../utilities/common-methods';
import { DatePipe, Location } from '@angular/common';
import { FavoritepayeeService } from '../favorite-payee/favoritepayee.service';
import { DetailStatementService } from '../../my-accounts/detailed-statement/detailed-statement.service';
import { AccountType } from '../../../../utilities/app-enum';
import { VirtualTimeScheduler } from 'rxjs';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { AlreadyRegisteredComponent } from '../../pre-login/already-registered/already-registered.component';
declare var showToastMessage: any;
declare var sendMoney: any;
import * as moment from 'moment'

@Component({
  selector: 'app-initiate-send-money',
  templateUrl: './initiate-send-money.component.html',
  styleUrls: ['./initiate-send-money.component.scss']
})
export class InitiateSendMoneyComponent implements OnInit,OnDestroy {
  showDetails = false;
  selAccOfBenificiary = "";
  selBankOfBenificiary = "";
  query = " ";
  favroutelist: any;
  minFrom: any;
  selPayee: any;
  amountEnterError: boolean = false;
  amntErrMsg = "";
  isFrequency = false;
  selectedFavPayee: any;
  paymentMethod: any;
  fundTransfer: FormGroup;
  schedulePaymentForm: FormGroup;
  schedulecheck: boolean = false;
  accountList = [];
  withinBenificiaryList: any = [];
  outsideBenificiaryList: any = [];
  selfBenificiaryList: any = [];
  mmidBenificiaryList: any = [];
  vpaBenificiaryList: any = [];
  ownBenificiaryList: any = [];
  otherBenificiaryList: any = [];
  internationalBenificiaryList: any = [];
  selectedPayee;
  benificiaryListForprefill:any =[]
  withinBankPendingPayeeDetails: any = [];
  withinBankPayeeDetailsList: any = [];
  outsideBankPendingPayeeDetails: any = [];
  outsideBankPayeeDetailsList: any = [];
  mmidBankPendingPayeeDetails: any = [];
  mmidBankPayeeDetailsList: any = [];
  vpaBankPendingPayeeDetails: any = [];
  vpaBankPayeeDetailsList: any = [];

  invalidAmount = false

  payeeAccountNo: any;

  fromFavPayee = false;

  tempMMIDPayeeList: any = [];
  tempSELFPayeeList: any = [];
  tempWITHINPayeeList: any = [];
  tempOUTSIDEPayeeList: any = [];
  tempVPAPayeeList: any = [];

  typeOfPayment: any = [];
  frequency: any = [];
  noOfInstallation: any = [];

  selectedAccount: any = '';
  selectedAccBal: any;
  isAccountSelected: boolean = false;
  selectedBenificiary: any;
  amountInWords: string = "";
  paymentType: any = 'self';
  onAccountSel: boolean = false;
  isFormValid: boolean = false;
  selBenificiary: any = "";
  favBenificiary: any = ""
  isScheduleChecked: boolean = false;
  offersOnCard: any;
  showAmount: boolean = false;
  searchPayeeSection: boolean = false;
  amntErrSelfMsg = "";
  amntErrMmidMsg = "";
  typeOfFrequency = "";
  SchemeCode:any;
  onSelAccNo: any;


  isSelected = false;
  public formErrors = {
    fromAccount: '',
    toAccount: '',
    amount: '',
    paymentMethod: '',
    remark: ''
  };

  public sechduleFormErrors = {
    date: '',
    paymentType: '',
    frequency: '',
    noOfInstalment: ''
  };

  //New
  mmidSendMoneyForm: FormGroup;
  selfForm: FormGroup;
  withinBankForm: FormGroup;
  outsideBankForm: FormGroup;
  upiIdForm: FormGroup

  frequencyArraySet: any = []
  frequencyTypeArraySet: any = []
  installmentArraySet: any = []

  payeeList: any = [];
  benificiaryList: any = [];

  commonPageComponent = {
    'headerType': 'innerHeader',
    'sidebarNAv': 'OmniNAv',
    'footer': 'none',
  }
  openSection: boolean = false;
  selfSchedulePayment: boolean = false;
  withinSchedulePayment: boolean = false;
  outsideSchedulePayment: boolean = false;
  upidPayment: boolean = false;
  payType: any = ""
  frequencyType: any = ""
  installType: any = ""
  refreshedTime: any;
  list = [];
  tomorrow;


  beneficiaryAccountDetails = [
    { "beneficiary_bank_name": "HDFC", "benefName": "Ravi Jhadav", "beneficiary_account_no": "0359 3797 3727 2912", "IFSC": "HDFC000045" },
    { "beneficiary_bank_name": "IDFC", "benefName": "Rakesh Seth", "beneficiary_account_no": "3350 3797 3727 2913", "IFSC": "IDFC000045" },
    { "beneficiary_bank_name": "SBI", "benefName": "Minal Sawant", "beneficiary_account_no": "4359 3898 3725 2914", "IFSC": "SBI000012" }]
  openSection1: any;
  selfSearchPayee: boolean = false;
  accBalance: any;
  pageType: any;
  isUPIId = false;
  maskedSelectedAccount: any = '';
  constructor(
    private router: Router,
    private form: FormBuilder,
    public DataService: DataService,
    private initiateSendMoneyService: InitiateSendMoneyService,
    private otherBankService: OtherBankService,
    private constant: AppConstants,
    private http: HttpRestApiService,

    private storage: LocalStorageService,
    private formValidation: FormValidationService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private commonMethod: CommonMethods,
    public datepipe: DatePipe,
    private location: Location,
    private favouritePayeeService: FavoritepayeeService,
    private detailStatementService: DetailStatementService
  ) {
   }


   navigating(){
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)

     this.DataService.setPageSettings('INITIATE_SEND_MONEY');
     if(this.constant.getPlatform() == "web"){
       this.DataService.getBreadcrumb('INITIATE_SEND_MONEY', this.router.url);
     }

   }

  ngOnInit(): void {
    this.navigating();
    this.buildForm();
    this.onloadStaticData();
  }


  isFromResentPayee(){
    try{
      if(Object.keys(this.DataService.recentTransData).length !== 0){
        this.paymentType = this.DataService.recentTransData.transactionType.toLowerCase();
        this.selAccOfBenificiary = "" + this.DataService.recentTransData?.benefName + "," + this.DataService.recentTransData?.toAccNumber;
        this.selBankOfBenificiary = "" + this.DataService.recentTransData?.beneficiary_bank_name + "," + this.DataService.recentTransData?.ifsc_code;

        this.selBenificiary = {
          ID : this.DataService.recentTransData?.ID,
          benefName : this.DataService.recentTransData?.benefName,
          beneficiary_bank_name : this.DataService.recentTransData?.beneficiary_bank_name,
          branch_name : this.DataService.recentTransData?.branch_name,
          ifsc_code : this.DataService.recentTransData?.ifsc_code
        }

        switch (this.paymentType) {
          case 'self':
            this.selfForm.patchValue({ sendTo: this.DataService.recentTransData?.accountNo });
            this.payeeAccountNo = this.DataService.recentTransData?.accountNo;
            break;
          case 'within':
            this.withinBankForm.patchValue({ sendTo: this.DataService.recentTransData?.beneficiary_account_no });
            this.payeeAccountNo = this.DataService.recentTransData?.beneficiary_account_no;
            break;
          case 'outside':
            this.outsideBankForm.patchValue({ sendTo: this.DataService.recentTransData?.beneficiary_account_no });
            this.payeeAccountNo = this.DataService.recentTransData?.beneficiary_account_no;
            break;
          case 'upid':
            break;
          case 'mmid':
            this.mmidSendMoneyForm.patchValue({ sendTo: this.DataService.recentTransData?.MMID });
            this.payeeAccountNo = this.DataService.recentTransData?.MMID;
            break;
        }

        this.payeeAccountNo = this.DataService.recentTransData.toAccNumber;
        this.showDetails = true;
        this.withinBankForm.patchValue({ sendTo: this.DataService.recentTransData.toAccNumber });
      }
    }
    catch(ex){

    }
  }


  ngAfterViewInit(){
    var self = this;
    setTimeout(()=>{
      self.initialize();
    },200)
  }


  onloadStaticData(){

    var backUrl ="";
    if(this.constant.getPlatform() == 'web'){
      if(this.DataService.isFromAccountDetails){ backUrl = 'myAccountDetails';
      }else{ backUrl = 'dashboard'; }
    }else{
      if(this.DataService.isFromAccountDetails){
        backUrl = 'myAccountsInfo';
      }else{
        backUrl = 'dashboardMobile';
      }
    }
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.DataService.otpSessionPreviousPage = '/sendMoney';
    this.selBenificiary = '';

    this.getScheduleFrequency('SI_FREQUENCY')
    this.getScheduleFrequency('SI_FREQUENCY_TYPE')
    this.getScheduleFrequency('SI_TENURE')
    const today = new Date();
    this.tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);

  }


  /**
   * Initialization functionality
   */
  initialize() {
    this.getBeneficiaryList()
    this.paymentMethod = [];
    this.list = [];
    setTimeout(()=>{
      if(!this.DataService.isCordovaAvailable){
        this.showDetails = true;
      }
    })

    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag == "P") {
            this.list[0] = el;
          }
        }
      }
    })

    this.DataService.customerOperativeAccList.forEach(el => {
      if (el.accountType != "CAPPI" && el.Status == "Active") {
        if (el.SchemeCode == AccountType.SAVING_ACCOUNT || el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT) {
          if (el.accountFlag != "P") {
            this.list.push(el);
          }
        }
      }
    })


    this.changePaymentType(this.DataService.fundTransferTabType)

    if (this.list.length != 0) {
      setTimeout(() => {
        this.selectedAccount = this.list[0].accountNo;
        this.SchemeCode = this.list[0].SchemeCode ;
        this.maskedSelectedAccount =  this.list[0].sbAccount
        this.accBalance = this.list[0].acctBalance
        switch (this.paymentType) {
          case 'self':
            this.payeeList = this.list.filter(obj => (obj.accountNo != this.selectedAccount && obj?.Status == 'Active'));
            break;
        }
      });
      this.DataService.transactionReceiptObj.upiOmnifromAcc = this.list[0].accountNo;
      this.getAccountBalance(this.list[0].accountNo)
    }

    //select account if from my account
    if (this.DataService.previousPageUrl == "myAccount" || this.DataService.previousPageUrl == "myAccountsInfo") {
      this.setAccountNoFromMyAcc();
    }

    if (this.DataService.managePayeeToFundTransferData != '') {

      switch (this.DataService.managePayeeToFundTransferData.beneficiaryType) {
        case "INTRA":
          this.paymentType = "within"
          this.selAccOfBenificiary = "" + this.DataService.managePayeeToFundTransferData.benefName + "," + this.DataService.managePayeeToFundTransferData.beneficiary_account_no;
          this.selBankOfBenificiary = "" + this.DataService.managePayeeToFundTransferData?.beneficiary_bank_name + "," + this.DataService.managePayeeToFundTransferData?.ifsc_code;
          this.withinBankForm.patchValue({ sendTo: this.selAccOfBenificiary })
          this.payeeAccountNo = this.DataService.managePayeeToFundTransferData.beneficiary_account_no;
          break;
        case "INTERBANK":
          this.paymentType = "outside"
          this.selAccOfBenificiary = "" + this.DataService.managePayeeToFundTransferData.benefName + "," + this.DataService.managePayeeToFundTransferData.beneficiary_account_no;
          this.selBankOfBenificiary = "" + this.DataService.managePayeeToFundTransferData?.beneficiary_bank_name + "," + this.DataService.managePayeeToFundTransferData?.ifsc_code;
          this.outsideBankForm.patchValue({ sendTo: this.selAccOfBenificiary })
          this.payeeAccountNo = this.DataService.managePayeeToFundTransferData.beneficiary_account_no;
          break;
        case "VPA":
          this.paymentType = "vpa"
          this.selAccOfBenificiary = "" + this.DataService.managePayeeToFundTransferData.benefName + "," + this.DataService.managePayeeToFundTransferData.beneficiary_account_no;
          this.selBankOfBenificiary = "" + this.DataService.managePayeeToFundTransferData?.beneficiary_bank_name + "," + this.DataService.managePayeeToFundTransferData?.ifsc_code;
          this.upiIdForm.patchValue({ sendTo: this.selAccOfBenificiary })
          this.payeeAccountNo = this.DataService.managePayeeToFundTransferData.VPA;
          break;
        case "MMID":
          this.paymentType = "mmid"
          this.selAccOfBenificiary = "" + this.DataService.managePayeeToFundTransferData.benefName + "," + this.DataService.managePayeeToFundTransferData.MMID;
          this.payeeAccountNo = this.DataService.managePayeeToFundTransferData.MMID;
          this.mmidSendMoneyForm.patchValue({ sendTo: this.selAccOfBenificiary })
          break;
      }
      this.selBenificiary = this.DataService.managePayeeToFundTransferData;
      this.selectedPayee = this.selBenificiary;
      this.DataService.managePayeeToFundTransferData = '';
      this.showDetails = true;
    } else {
      this.changePaymentType(this.paymentType)
    }

    this.getBenefListAPICall()
    this.favourite();
    this.isFromResentPayee();
  }

  setAccountNoFromMyAcc() {
    this.onSelAccNo = this.DataService.accDetails.accountNo;
    this.onFromAccountSelect(this.onSelAccNo);
  }


  backbtnClick(){
    this.location.back();
  }


  goToDashboard(){
    this.router.navigateByUrl('/dashboardMobile');
  }


  // prefilldata(data){
  //   var self = this


  //   if(data.transType == '2'){

  //     this.paymentType = "within"
  //     self.getBenefListAPICall()
  //     self.payeeListOnPaymentType()
  //     console.log("this.payeeList " + JSON.stringify(self.payeeList))
  //     console.log(" data.accNo " +  data.accNo)
  //     console.log("  this.benificiaryListForprefill " +   self.benificiaryListForprefill)
  //     var selectedAccount = self.payeeList.filter(item => item.accountNo ==  data.accNo )
  //     console.log("selectedAccount " + JSON.stringify(selectedAccount))
  //     // alert( this.paymentType)
  //   }



  // }


  favourite() {
    var param = this.favouritePayeeService.getFavouritePayee();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceNmae_GETFAVORITETRANSACTIONS).subscribe((data) => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.favroutelist = data.set['records'];
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })

  }

  changePaymentType
    (type) {
    this.invalidAmount = false
    this.paymentType = type;
    this.DataService.fundTransferTabType = type;
    if(this.DataService.isCordovaAvailable){
      this.showDetails = false;
    }
    switch (type) {
      case 'self':
        this.isUPIId = false;
        this.selfForm.reset();
        break;
      case 'within':
        this.isUPIId = false;
        this.withinBankForm.reset();
        break;
      case 'outside':
        this.isUPIId = false;

        this.outsideBankForm.reset();
        break;
      case 'vpa':
        this.isUPIId = true;
        // if(this.DataService.vpaAddressList.length == 0){
        //   this.showDetails = false;
        // }
        // // this.router.navigateByUrl('bhimUpiPay')
        break;
      case 'mmid':
        this.isUPIId = false;
        this.mmidSendMoneyForm.reset();
        break;
    }
    this.DataService.receiptBackPage = this.paymentType;

    this.selAccOfBenificiary = "";
    this.selBankOfBenificiary = "";

    this.payeeListOnPaymentType()

  }

  verifyVPA(){

  }


  OnInput(evn, form: FormGroup) {

    var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
    evn = evn.replace(regex, '$1');

    form.patchValue({
      amount: evn
    })

    if (Number(this.accBalance) >= Number((evn.trim().replace('₹', '')).replace(/,/g, ''))) {
      this.invalidAmount = false
    } else {
      this.invalidAmount = true
    }

  }

  buildForm() {

    this.fundTransfer = new FormGroup({
      fromAccount: new FormControl('', [Validators.required]),
      toAccount: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.accBalance)]),
      paymentMethod: new FormControl(''),
      remark: new FormControl('')
    });

    this.fundTransfer.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.fundTransfer, this.formErrors, true);
    });

    this.schedulePaymentForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      frequency: new FormControl('', []),
      noOfInstalment: new FormControl('', [])
    });

    this.schedulePaymentForm.valueChanges.subscribe((data) => {
      this.sechduleFormErrors = this.formValidation.validateForm(this.schedulePaymentForm, this.sechduleFormErrors, true);
    });

    //New Code

    this.selfForm = new FormGroup({
      sendTo: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.accBalance)]),
      remark: new FormControl(''),
      paymentType: new FormControl('', []),
      datepicker1: new FormControl('', []),
      frequencyType: new FormControl('', []),
      installmentNumber: new FormControl('', []),

    })

    this.withinBankForm = new FormGroup({
      sendTo: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.accBalance)]),
      remark: new FormControl(''),
      paymentType: new FormControl('', []),
      datepicker1: new FormControl('', []),
      frequencyType: new FormControl('', []),
      installmentNumber: new FormControl('', []),
    })

    this.outsideBankForm = new FormGroup({
      sendTo: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.accBalance)]),
      remark: new FormControl(''),
      paymentMethod: new FormControl('', [Validators.required]),
      datepicker1: new FormControl('', []),
      paymentType: new FormControl('', []),
      frequencyType: new FormControl('', []),
      installmentNumber: new FormControl('', []),
    })

    this.upiIdForm = new FormGroup({
      sendTo: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.accBalance)]),
      remark: new FormControl(''),
      datepicker1: new FormControl('', []),
      paymentType: new FormControl('', []),
      frequencyType: new FormControl('', []),
      installmentNumber: new FormControl('', []),
    })

    this.mmidSendMoneyForm = new FormGroup({
      sendTo: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1), , Validators.max(this.accBalance)]),
      radioboxdemo: new FormControl('', []),
      datepicker1: new FormControl('', []),
      paymentType: new FormControl('', []),
      frequencyType: new FormControl('', []),
      installmentNumber: new FormControl('', []),
      mmidRemark: new FormControl('', []),
    })
  };

  /**
   * Form Validation
   */
  validateForm() {
    this.isFormValid = false;
    //New Code
    switch (this.paymentType) {
      case "self":
        if (this.selfForm.invalid) {
          this.selfForm.get('sendTo').markAsTouched();
          this.selfForm.get('amount').markAsTouched();
          this.selfForm.get('remark').markAsTouched();
          this.selfForm.get('datepicker1').markAsTouched();
          this.selfForm.get('paymentType').markAsTouched();
          this.selfForm.get('frequencyType').markAsTouched();
          this.selfForm.get('installmentNumber').markAsTouched();
          return;
        }
        else {
          this.isFormValid = true;
        }
        break;
      case "within":
        if (this.withinBankForm.invalid) {
          this.withinBankForm.get('sendTo').markAsTouched();
          this.withinBankForm.get('amount').markAsTouched();
          this.withinBankForm.get('remark').markAsTouched();
          this.withinBankForm.get('datepicker1').markAsTouched();
          this.withinBankForm.get('paymentType').markAsTouched();
          this.withinBankForm.get('frequencyType').markAsTouched();
          this.withinBankForm.get('installmentNumber').markAsTouched();
          return;
        }
        else { this.isFormValid = true; }
        break;
      case "outside":
        if (this.outsideBankForm.invalid) {
          this.outsideBankForm.get('sendTo').markAsTouched();
          this.outsideBankForm.get('amount').markAsTouched();
          this.outsideBankForm.get('remark').markAsTouched();
          this.outsideBankForm.get('paymentMethod').markAsTouched();
          this.outsideBankForm.get('datepicker1').markAsTouched();
          this.outsideBankForm.get('paymentType').markAsTouched();
          this.outsideBankForm.get('frequencyType').markAsTouched();
          this.outsideBankForm.get('installmentNumber').markAsTouched();
          return;
        }
        else { this.isFormValid = true; }
        break;
      case "vpa":
        if (this.upiIdForm.invalid) {
          this.upiIdForm.get('sendTo').markAsTouched();
          this.upiIdForm.get('amount').markAsTouched();
          this.upiIdForm.get('remark').markAsTouched();
          this.upiIdForm.get('datepicker1').markAsTouched();
          this.upiIdForm.get('paymentType').markAsTouched();
          this.upiIdForm.get('frequencyType').markAsTouched();
          this.upiIdForm.get('installmentNumber').markAsTouched();
          return;
        }
        else { this.isFormValid = true; }
        break;
      case "mmid":
        if (this.mmidSendMoneyForm.invalid) {
          this.mmidSendMoneyForm.get('sendTo').markAsTouched();
          this.mmidSendMoneyForm.get('amount').markAsTouched();
          // this.mmidSendMoneyForm.get('radioboxdemo').markAsTouched();
          // this.mmidSendMoneyForm.get('mmidRemark').markAsTouched();
          this.mmidSendMoneyForm.get('datepicker1').markAsTouched();
          this.mmidSendMoneyForm.get('paymentType').markAsTouched();
          this.mmidSendMoneyForm.get('frequencyType').markAsTouched();
          this.mmidSendMoneyForm.get('installmentNumber').markAsTouched();
          return;
        }
        else { this.isFormValid = true; }
        break;

    }
  }

  /**
   * Function to set benificarylist on the basis of
   * self account , within bank , outside bank , upi Id and mmid
   */
  // getBenificiaryList(){
  //   this.payeeList = [];
  //   switch(this.paymentType){
  //     case 'self':
  //       this.payeeList = this.list.filter(obj => (obj.accountNo != this.selectedAccount && obj?.AGSStatus == 'Active'));
  //       break;
  //       case 'within':
  //       case 'outside':
  //       case 'vpa':
  //       case 'mmid':
  //         this.getBenefListAPICall()
  //       break;
  //     default:
  //   }

  //   this.payeeList = this.payeeList.filter(
  //     (obj) =>(obj.accountType!='CAPPI')
  //   );
  //   console.log(this.payeeList);
  //   this.tempSELFPayeeList= this.payeeList;
  //   console.log("payeelistsss",this.tempSELFPayeeList);
  // }

  getBenefListAPICall() {
    var param = this.otherBankService.benificiaryListParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BENIFICIARYLIST).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.benificiaryList = data.set.records;
        this.benificiaryListForprefill = data.set.records;

        this.payeeListOnPaymentType('onload')
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  payeeListOnPaymentType(isonLoad?) {

    switch (this.paymentType) {

      case 'self':
        if (isonLoad != 'onload') {
          this.payeeList = this.list.filter(obj => (obj.accountNo != this.selectedAccount && obj?.Status == 'Active'));
        }
        break;
      case 'within':
        this.payeeList = this.benificiaryList.filter(obj => (obj.statusId == '3' && obj.beneficiaryType == 'INTRA'));
        this.tempWITHINPayeeList = this.payeeList;
        break;
      case 'outside':
        this.payeeList = this.benificiaryList.filter(obj => (obj.statusId == '3' && obj.beneficiaryType == 'INTERBANK'));
        this.tempOUTSIDEPayeeList = this.payeeList;
        break;
      case 'vpa':
        this.payeeList = this.benificiaryList.filter(obj => (obj.statusId == '3' && obj.beneficiaryType == 'VPA'));
        break;
      case 'mmid':
        this.payeeList = this.benificiaryList.filter(obj => (obj.statusId == '3' && obj.beneficiaryType == 'MMID'));
        this.tempMMIDPayeeList = this.payeeList
        break;
    }

    this.payeeList = this.payeeList.filter(
      (obj) => (obj.accountType != 'CAPPI')
    );
    console.log(this.payeeList);
    this.tempSELFPayeeList = this.payeeList;

  }

  selectAccount(selectedBenfNo) {

    console.log(selectedBenfNo);

    this.selectedPayee = selectedBenfNo;
    if (this.paymentType != 'self') {

      this.selAccOfBenificiary = "" + selectedBenfNo?.benefName + "," + selectedBenfNo?.beneficiary_account_no;
      this.selBankOfBenificiary = "" + selectedBenfNo?.beneficiary_bank_name + "," + selectedBenfNo?.ifsc_code;

    }

    switch (this.paymentType) {
      case 'self':
        this.openSearchPayee('desktop', 'selfBank', '');
        this.selAccOfBenificiary = selectedBenfNo.accountNo;
        // this.selBankOfBenificiary = ""+selectedBenfNo?.beneficiary_bank_name+","+selectedBenfNo?.ifsc_code;
        this.selfForm.patchValue({ sendTo: selectedBenfNo.accountNo });
        this.payeeAccountNo = selectedBenfNo.accountNo;
        break;
      case 'within':
        this.openSearchPayee('desktop', 'withinBank', '');
        this.withinBankForm.patchValue({ sendTo: selectedBenfNo.beneficiary_account_no });
        this.payeeAccountNo = selectedBenfNo.beneficiary_account_no;
        break;
      case 'outside':
        this.openSearchPayee('desktop', 'outside', '');
        this.outsideBankForm.patchValue({ sendTo: selectedBenfNo.beneficiary_account_no });
        this.payeeAccountNo = selectedBenfNo.beneficiary_account_no;
        break;
      case 'upid':
        break;
      case 'mmid':
        this.openSearchPayee('desktop', 'mmid', '');
        this.mmidSendMoneyForm.patchValue({ sendTo: selectedBenfNo.MMID });
        this.payeeAccountNo = selectedBenfNo.MMID;
        break;
    }

    this.selBenificiary = selectedBenfNo;

  }


  selAccountMobile(payee) {
    this.showDetails = true
    this.selPayee = payee;
  }

  openSearchPayee(viewType, pageType, e) {
    if (e.stopPropagation) e.stopPropagation();
    this.pageType = pageType;
    switch (pageType) {
      case 'selfBank':
        if (this.constant.getPlatform()=="web") {
          $('#selfBankSelect').slideToggle();
          $('#selfBankSelect').parent().toggleClass('active')
        }
        else
          this.commonMethod.openPopup("div.popup-bottom.sel-account2")
        break;
      case 'withinBank':
        if (this.constant.getPlatform()=="web") {
          $('#withinBanlSelect').slideToggle();
          $('#withinBanlSelect').parent().toggleClass('active')
        }
        else
          this.commonMethod.openPopup("div.popup-bottom.sel-account2")
        break;
      case 'outside':
        if (this.constant.getPlatform()=="web") {
          $('#outsideBank').slideToggle();
          $('#outsideBank').parent().toggleClass('active')
        }
        else
          this.commonMethod.openPopup("div.popup-bottom.sel-account2")
        break;
      case 'upid':
        if (this.constant.getPlatform()=="web") {
          $('#upidBank').slideToggle();
          $('#upidBank').parent().toggleClass('active')
        }
        else
          this.commonMethod.openPopup("div.popup-bottom.sel-account2")
        break;
      case 'mmid':
        if (this.constant.getPlatform()=="web") {
          $('#mmidbankselect').slideToggle();
          $('#mmidbankselect').parent().toggleClass('active')
        }
        else
          this.commonMethod.openPopup("div.popup-bottom.sel-account2")
        break;
    }
  }

  /**
   * This function is called to make fund transfer
   */
  onFundTransfer() {
    console.log("onFundTransfer");
    this.isSelected = true;
    this.amountEnterError = false;
    this.amntErrMsg = "Max transaction limit 2,00,000"
    this.DataService.request = ""
    this.amntErrSelfMsg = "";
    this.amntErrMmidMsg = "";
    this.validateForm()

    if (this.invalidAmount) {
      return
    }

    if (this.isFormValid) {
      this.DataService.resetTransactionObj();
      var amount;
      switch (this.paymentType) {
        case "within":
          amount = this.withinBankForm.value.amount.trim().replace(/[^.0-9]+/g, '');
          if (parseFloat(amount) > parseFloat(this.selBenificiary.maxAmount)) {
            this.amntErrSelfMsg = "Entered amount is more than transaction limit set for the selected user";
            return;
          }
          break;
        case "outside":
          amount = this.outsideBankForm.value.amount.trim().replace(/[^.0-9]+/g, '');
          if (parseFloat(amount) > parseFloat(this.selBenificiary.maxAmount)) {
            this.amntErrMsg = "Entered amount is more than transaction limit set for the selected user";
            this.amountEnterError = true;
            return;
          }
          break;
        case "mmid":
          amount = this.mmidSendMoneyForm.value.amount.trim().replace(/[^.0-9]+/g, '');
          if (parseFloat(amount) > parseFloat(this.selBenificiary.maxAmount)) {
            this.amntErrMmidMsg = "Entered amount is more than transaction limit set for the selected user";
            return;
          }
          break;
        default:
      }

      if (this.paymentType == 'outside' && this.outsideBankForm.value.paymentMethod == "RTGS" && this.outsideBankForm.value.amount.trim().replace(/[^.0-9]+/g, '') < 200000) {
        this.amntErrMsg = "Min transaction limit is 2,00,000"
        this.amountEnterError = true;
        return;
      }
      else if (this.paymentType == 'outside' && this.outsideBankForm.value.paymentMethod != "RTGS" && this.outsideBankForm.value.amount.trim().replace(/[^.0-9]+/g, '') > 200000) {
        this.amntErrMsg = "Max transaction limit is 2,00,000"
        this.amountEnterError = true;
        return;
      }



      this.DataService.transactionReceiptObj.modeOfTransfer = "";


      switch (this.paymentType) {
        case "self":
          console.log('freq value: ', this.selfForm.value.frequencyType);
          /* Below code is added for installment limit validation */
          if (this.selfForm.value.frequencyType == 'DAILY' && this.selfForm.value.installmentNumber > 1825) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.selfForm.value.frequencyType == 'MONTHLY' && this.selfForm.value.installmentNumber > 60) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.selfForm.value.frequencyType == 'QUARTERLY' && this.selfForm.value.installmentNumber > 20) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.selfForm.value.frequencyType == 'HALFYEARLY' && this.selfForm.value.installmentNumber > 10) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.selfForm.value.frequencyType == 'YEARLY' && this.selfForm.value.installmentNumber > 5) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          // if(this.selfForm.value.frequencyType)

          if (this.isScheduleChecked) {
            this.setSchedulePayment(this.selfForm.value, this.selBenificiary, this.selectedAccount, 'self', this.payeeAccountNo);
            this.DataService.transactionReceiptObj.scheduledDate = this.selfForm.value.datepicker1;
            this.DataService.transactionReceiptObj.scheduledType = this.selfForm.value.paymentType
            this.DataService.transactionReceiptObj.isScheduled = this.isScheduleChecked
          } else {
            var selfReqParam = this.initiateSendMoneyService.getFundTransferParam(this.selfForm.value, this.selBenificiary, this.selectedAccount, 'self', this.payeeAccountNo);
            this.DataService.request = selfReqParam;
            this.DataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;
            this.DataService.transactionReceiptObj.isScheduled = false;
            this.DataService.transactionReceiptObj.from_acc = this.selectedAccount;
            this.DataService.transactionReceiptObj.to_acc = this.payeeAccountNo;
            this.DataService.transactionReceiptObj.payee_name = this.DataService.userDetails?.customerName;
            this.DataService.transactionReceiptObj.amount = this.selfForm.value.amount;
            this.DataService.transactionReceiptObj.remarks = this.selfForm.value.remark;
            this.DataService.transactionReceiptObj.date = new Date().toISOString();
          }

          break;
        case "within":

          /* Below code is added for installment limit validation */
          if (this.withinBankForm.value.frequencyType == 'DAILY' && this.withinBankForm.value.installmentNumber > 1825) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.withinBankForm.value.frequencyType == 'MONTHLY' && this.withinBankForm.value.installmentNumber > 60) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.withinBankForm.value.frequencyType == 'QUARTERLY' && this.withinBankForm.value.installmentNumber > 20) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.withinBankForm.value.frequencyType == 'HALFYEARLY' && this.withinBankForm.value.installmentNumber > 10) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.withinBankForm.value.frequencyType == 'YEARLY' && this.withinBankForm.value.installmentNumber > 5) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }

          if (this.isScheduleChecked) {
           
            this.setSchedulePayment(this.withinBankForm.value, this.selBenificiary, this.selectedAccount, 'within', this.payeeAccountNo);
            this.DataService.transactionReceiptObj.scheduledDate = this.withinBankForm.value.datepicker1;
            this.DataService.transactionReceiptObj.scheduledType = this.withinBankForm.value.paymentType
            this.DataService.transactionReceiptObj.isScheduled = this.isScheduleChecked
          } else {
            var ownReqParam = this.initiateSendMoneyService.getFundTransferParam(this.withinBankForm.value, this.selBenificiary, this.selectedAccount, 'within', this.payeeAccountNo);
            this.DataService.request = ownReqParam;
            this.DataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;
            this.DataService.transactionReceiptObj.isScheduled = false;
            this.DataService.transactionReceiptObj.from_acc = this.selectedAccount;
            this.DataService.transactionReceiptObj.to_acc = this.payeeAccountNo;
            this.DataService.transactionReceiptObj.payee_name = this.selBenificiary.benefName;
            this.DataService.transactionReceiptObj.amount = this.withinBankForm.value.amount;
            this.DataService.transactionReceiptObj.remarks = this.withinBankForm.value.remark != '' ? this.withinBankForm.value.remark : "-";
            this.DataService.transactionReceiptObj.date = new Date().toISOString();
          }
          break;
        case "outside":

          /* Below code is added for installment limit validation */
          if (this.outsideBankForm.value.frequencyType == 'DAILY' && this.outsideBankForm.value.installmentNumber > 1825) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.outsideBankForm.value.frequencyType == 'MONTHLY' && this.outsideBankForm.value.installmentNumber > 60) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.outsideBankForm.value.frequencyType == 'QUARTERLY' && this.outsideBankForm.value.installmentNumber > 20) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.outsideBankForm.value.frequencyType == 'HALFYEARLY' && this.outsideBankForm.value.installmentNumber > 10) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.outsideBankForm.value.frequencyType == 'YEARLY' && this.outsideBankForm.value.installmentNumber > 5) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }


          if (this.isScheduleChecked) {
            this.setSchedulePayment(this.outsideBankForm.value, this.selBenificiary, this.selectedAccount, 'outside', this.payeeAccountNo);
            this.DataService.transactionReceiptObj.scheduledDate = this.outsideBankForm.value.datepicker1;
            this.DataService.transactionReceiptObj.scheduledType = this.outsideBankForm.value.paymentType
            this.DataService.transactionReceiptObj.isScheduled = this.isScheduleChecked;

            this.DataService.transactionReceiptObj.modeOfTransfer = this.outsideBankForm.value.paymentMethod;
            this.DataService.transactionReceiptObj.benificaryBankName = this.selectedPayee.beneficiary_bank_name;
            this.DataService.transactionReceiptObj.ifscCode = this.selectedPayee.ifsc_code;

          } else {
            this.DataService.transactionReceiptObj.isScheduled = false;
            if (this.outsideBankForm.value.paymentMethod == "NEFT") {
              var neftReqParam = this.initiateSendMoneyService.getFundTransferParam(this.outsideBankForm.value, this.selBenificiary, this.selectedAccount, 'NEFT', this.payeeAccountNo);
              this.DataService.request = neftReqParam;
              this.DataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;
            }
            else if (this.outsideBankForm.value.paymentMethod == "RTGS") {
              var rtgsReqParam = this.initiateSendMoneyService.getFundTransferParam(this.outsideBankForm.value, this.selBenificiary, this.selectedAccount, 'RTGS', this.payeeAccountNo);
              this.DataService.request = rtgsReqParam;
              this.DataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;
            }
            else if (this.outsideBankForm.value.paymentMethod == "IMPS") {
              var mmidReqParam;
              if (this.favBenificiary != "") {
                mmidReqParam = this.initiateSendMoneyService.getIFSCFundTransferParam(this.outsideBankForm.value, this.favBenificiary, this.selectedAccount, this.payeeAccountNo, this.outsideBankForm.value.remark, 'fromFav');
              } else {
                mmidReqParam = this.initiateSendMoneyService.getIFSCFundTransferParam(this.outsideBankForm.value, this.selBenificiary, this.selectedAccount, this.payeeAccountNo, this.outsideBankForm.value.remark);

              }
              this.DataService.request = mmidReqParam;
              this.DataService.endPoint = this.constant.serviceName_PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER;
            }

            this.DataService.transactionReceiptObj.from_acc = this.selectedAccount;
            this.DataService.transactionReceiptObj.to_acc = this.payeeAccountNo;
            this.DataService.transactionReceiptObj.payee_name = this.selBenificiary.benefName;
            this.DataService.transactionReceiptObj.amount = this.outsideBankForm.value.amount;
            this.DataService.transactionReceiptObj.modeOfTransfer = this.outsideBankForm.value.paymentMethod;
            this.DataService.transactionReceiptObj.benificaryBankName = this.selectedPayee.beneficiary_bank_name;
            this.DataService.transactionReceiptObj.ifscCode = this.selectedPayee.ifsc_code;

            if (this.outsideBankForm.value.remark == null) {
              this.outsideBankForm.value.remark = "-"
            }
            this.DataService.transactionReceiptObj.remarks = this.outsideBankForm.value.remark;
            this.DataService.transactionReceiptObj.date = new Date().toISOString();
          }

          break;
        case "mmid":

          /* Below code is added for installment limit validation */
          if (this.mmidSendMoneyForm.value.frequencyType == 'DAILY' && this.mmidSendMoneyForm.value.installmentNumber > 1825) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.mmidSendMoneyForm.value.frequencyType == 'MONTHLY' && this.mmidSendMoneyForm.value.installmentNumber > 60) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.mmidSendMoneyForm.value.frequencyType == 'QUARTERLY' && this.mmidSendMoneyForm.value.installmentNumber > 20) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.mmidSendMoneyForm.value.frequencyType == 'HALFYEARLY' && this.mmidSendMoneyForm.value.installmentNumber > 10) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }
          else if (this.mmidSendMoneyForm.value.frequencyType == 'YEARLY' && this.mmidSendMoneyForm.value.installmentNumber > 5) {
            showToastMessage('Number of installments exceeds more than 5 years');
            return;
          }

          if (this.isScheduleChecked) {
            this.setSchedulePayment(this.mmidSendMoneyForm.value, this.selBenificiary, this.selectedAccount, 'mmid', this.payeeAccountNo);
            // this.setSchedulePayment(this.mmidSendMoneyForm.value,this.selectedAccount);
            this.DataService.transactionReceiptObj.scheduledDate = this.mmidSendMoneyForm.value.datepicker1;
            this.DataService.transactionReceiptObj.scheduledType = this.mmidSendMoneyForm.value.paymentType
            this.DataService.transactionReceiptObj.isScheduled = this.isScheduleChecked
          } else {
            var mmidReqParam;
            if (this.selBenificiary.MMID != 'null') {
              console.log(this.selectedAccount);
              mmidReqParam = this.initiateSendMoneyService.getMMIDFundTransferParam(this.mmidSendMoneyForm.value, this.selBenificiary, this.selectedAccount, this.payeeAccountNo);
              this.DataService.endPoint = this.constant.serviceName_MMID;
            }
            else {
              mmidReqParam = this.initiateSendMoneyService.getIFSCFundTransferParam(this.mmidSendMoneyForm.value, this.selBenificiary, this.selectedAccount, this.payeeAccountNo, this.mmidSendMoneyForm.value.mmidRemark);
              this.DataService.endPoint = this.constant.serviceName_PAYERTOPAYEEUSINGIFSCACCOUNTNUMBER;
            }
            this.DataService.transactionReceiptObj.isScheduled = false
            this.DataService.transactionReceiptObj.from_acc = this.selectedAccount;
            this.DataService.transactionReceiptObj.to_acc = this.payeeAccountNo;
            this.DataService.transactionReceiptObj.payee_name = this.selBenificiary?.benefName;
            this.DataService.transactionReceiptObj.amount = this.mmidSendMoneyForm.value.amount;
            this.DataService.transactionReceiptObj.remarks = this.mmidSendMoneyForm.value.mmidRemark;
            this.DataService.transactionReceiptObj.date = new Date().toISOString();

            this.DataService.request = mmidReqParam;
            console.log(mmidReqParam)
          }
          break;
        default:
      }

      this.DataService.authorizeHeader = "INITIATE SEND MONEY";
      this.DataService.screenType = 'fundTransfer';
      this.DataService.transactionReceiptObj.paymentType = this.paymentType;
      this.DataService.transactionReceiptObj.payee_id = this.selBenificiary.ID;
      this.DataService.recentTransData = {}; 
      this.router.navigate(['/otpSession']);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.fundTransfer, this.formErrors, true);
      this.sechduleFormErrors = this.formValidation.validateForm(this.schedulePaymentForm, this.sechduleFormErrors, true);
    }

  }

  /**
   * This function called to schedule payment on payment submit
   */
  setSchedulePayment(formDtl, selBenef, selectedAccount, type, payeeAccountNo) {

    var toDate = new Date(formDtl.datepicker1);
    if(this.typeOfFrequency == 'RECURRING'){
      switch(formDtl.frequencyType ){
        case 'DAILY':
          toDate.setDate(toDate.getDate()+parseInt(formDtl.installmentNumber));
          break;
        case 'MONTHLY':
          toDate.setDate(toDate.getDate()+(30*parseInt(formDtl.installmentNumber)));
          break;
        case 'QUARTERLY':
          toDate.setDate(toDate.getDate()+(90*parseInt(formDtl.installmentNumber)));
          break;
        case 'HALFYEARLY':
          toDate.setDate(toDate.getDate()+(180*parseInt(formDtl.installmentNumber)));
          break;
        case 'YEARLY':
          toDate.setDate(toDate.getDate()+(365 * parseInt(formDtl.installmentNumber)));
          break;
      }
    }


    var param = this.initiateSendMoneyService.schedulePaymentListParam(formDtl, selBenef, selectedAccount, type, payeeAccountNo,toDate);
    this.DataService.request = param;
    this.DataService.endPoint = this.constant.serviceName_SCHEDULARTRANSMASTER;

    this.DataService.transactionReceiptObj.from_acc = this.selectedAccount;
    this.DataService.transactionReceiptObj.to_acc = this.payeeAccountNo;
    this.DataService.transactionReceiptObj.payee_name = this.DataService.userDetails?.customerName;

    switch (this.paymentType) {
      case "self":
        this.DataService.transactionReceiptObj.amount = this.selfForm.value.amount;
        this.DataService.transactionReceiptObj.remarks = this.selfForm.value.remark;
        this.DataService.transactionReceiptObj.date = new Date(this.selfForm.value.datepicker1).toISOString();
        break;
      case "within":
        this.DataService.transactionReceiptObj.amount = this.withinBankForm.value.amount;
        this.DataService.transactionReceiptObj.remarks = this.withinBankForm.value.remark;
        this.DataService.transactionReceiptObj.date = new Date(this.withinBankForm.value.datepicker1).toISOString();
        break;
      case "outside":
        this.DataService.transactionReceiptObj.amount = this.outsideBankForm.value.amount;
        this.DataService.transactionReceiptObj.remarks = this.outsideBankForm.value.remark;
        this.DataService.transactionReceiptObj.date = new Date(this.outsideBankForm.value.datepicker1).toISOString();
        break;
      case "mmid":
        this.DataService.transactionReceiptObj.amount = this.mmidSendMoneyForm.value.amount;
        this.DataService.transactionReceiptObj.remarks = this.mmidSendMoneyForm.value.remark;
        this.DataService.transactionReceiptObj.date = new Date(this.mmidSendMoneyForm.value.datepicker1).toISOString();
        break;
      default:
    }

  }

  scheduleCheckbox(type) {
    this.isScheduleChecked = !this.isScheduleChecked
    switch (type) {
      case 'self':
        this.selfSchedulePayment = !this.selfSchedulePayment
        this.sendMoneyUpdateValueValidity(this.selfForm, this.selfSchedulePayment)
        break;
      case 'within':
        this.withinSchedulePayment = !this.withinSchedulePayment
        this.sendMoneyUpdateValueValidity(this.withinBankForm, this.withinSchedulePayment)
        break;
      case 'outsideBank':
        this.outsideSchedulePayment = !this.outsideSchedulePayment
        this.sendMoneyUpdateValueValidity(this.outsideBankForm, this.outsideSchedulePayment)
        break;
      case 'upid':
        this.upidPayment = !this.upidPayment
        this.sendMoneyUpdateValueValidity(this.upiIdForm, this.upidPayment)

        break;
      case 'mmid':
        this.openSection = !this.openSection
        this.sendMoneyUpdateValueValidity(this.mmidSendMoneyForm, this.openSection)
        break;
    }
  }

  sendMoneyUpdateValueValidity(sendMoneyForm, scheduledPayment) {
    if (scheduledPayment) {
      sendMoneyForm.controls['datepicker1'].setValidators([Validators.required])
      sendMoneyForm.controls['paymentType'].setValidators([Validators.required])
      sendMoneyForm.controls['frequencyType'].setValidators([])
      sendMoneyForm.controls['installmentNumber'].setValidators([])

    } else {
      sendMoneyForm.controls['datepicker1'].setValidators([])
      sendMoneyForm.controls['paymentType'].setValidators([])
      sendMoneyForm.controls['frequencyType'].setValidators([])
      sendMoneyForm.controls['installmentNumber'].setValidators([])
    }

    sendMoneyForm.controls['datepicker1'].updateValueAndValidity();
    sendMoneyForm.controls['paymentType'].updateValueAndValidity()
    sendMoneyForm.controls['frequencyType'].updateValueAndValidity()
    sendMoneyForm.controls['installmentNumber'].updateValueAndValidity()
  }



  /**
   * set update currency value
   * @param value
   */
  formatCurrency(value) {
    let amt = this.customCurrencyPipe.transform(value, 'decimal').replace(/[^.0-9]+/g, '');
    switch (this.paymentType) {
      case 'self':
        this.formValidation.formatCurrency(value, this.selfForm);
        break;
      case 'within':
        this.formValidation.formatCurrency(value, this.withinBankForm);
        break;
      case 'outside':
        this.formValidation.formatCurrency(value, this.outsideBankForm);
        break;
      case 'mmid':
        this.formValidation.formatCurrency(value, this.mmidSendMoneyForm);
        break;
      case 'vpa':
        break;
    }
  }

  /**
   * Function to be called when to account is selected
   * @value
   */
  getToAccValue(value) {
    console.log(value);
    $('#mmidbankselect').parent().removeClass('active');
    // this.selBenificiary = value;
    this.searchPayeeSection = !this.searchPayeeSection;
    if (value.beneficiary_account_no != undefined) {
      this.selAccOfBenificiary = value.benefName + "," + value.beneficiary_account_no
      this.mmidSendMoneyForm.patchValue({ sendTo: value.beneficiary_account_no });
      this.payeeAccountNo = value.beneficiary_account_no;
      this.selBenificiary = value;
      // to close the option box
      $('#mmidbankselect').slideUp();
      //  $('#mmidbankselect').parent().removeClass('active');

    }
    else {
      this.selAccOfBenificiary = value.benefName + "," + value.MMID
      this.mmidSendMoneyForm.patchValue({ sendTo: value.MMID });
      this.payeeAccountNo = value.MMID;
      this.selBenificiary = value;
      // to close the option box
      $('#mmidbankselect').slideUp();
    }
  }

  /**
   *To show hide Schedule payment this function is invoked
   * @param checked
   */
  schedule(checked) {
    if (checked) {
      $('.sp-body').slideDown();
      $('.sp-body').addClass('show-spbody');
      $('.schedule-payment').addClass('sp-active');
      this.isScheduleChecked = true;

    } else {
      $('.sp-body').slideUp()
      $('.sp-body').removeClass('show-spbody')
      $('.schedule-payment').removeClass('sp-active');
      //this.fundTransfer.controls['schedule'].setValue('');
      this.isScheduleChecked = false;
    }
  }

  /**
   * On account number change this function is invoked
   * @param account
   */
  onAccountNoChange(account) {
    // this.selectedAccount = "";
    console.log(account);
    this.selectedAccount = account.accountNo;
    this.SchemeCode = account.SchemeCode ;
    this.maskedSelectedAccount =  account.sbAccount
    console.log('selected from account: ', this.selectedAccount);
    // if (accountNumber != '') {
    //   this.isAccountSelected = true;
    //   this.selectedAccount = this.accountList.find(i => i.accountNo == accountNumber);
    //   this.selectedAccBal = this.selectedAccount.acctBalance;
    //   console.log(this.selectedAccount);
    // } else {
    //   this.isAccountSelected = false;
    // }
  }

  /**
   * This function is use to call api to fetch
   * payment type, frequency , no of iinstallation
   */

  getSchedulePaymentParam() {
    var param = this.initiateSendMoneyService.getScheduleParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETSCHEDULEPAYMENTPARAMETER).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        data.set.records.forEach(el => {
          if (el.type == "paymentType") {
            this.typeOfPayment.push(el);
          }
          if (el.type == "frequency") {
            this.frequency.push(el);
          }
          if (el.type == "NumberOfInstallment") {
            this.noOfInstallation.push(el);
          }
        });
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  /**
  * This function is use to call api to fetch
  * payment type, frequency , no of iinstallation
  */
  getScheduleFrequency(type) {
    var param = this.initiateSendMoneyService.getFrequencyParam(type);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CERTIFICATECONFIGS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log("Frequency" + resp)
        var dataSet = data.listofDataset[0].records;
        console.log('dataset: ', dataSet);
        if (type == "SI_FREQUENCY") {
          this.frequencyArraySet = dataSet;
        }
        else if (type == "SI_FREQUENCY_TYPE") {

          this.frequencyTypeArraySet = dataSet
        }
        else if (type === "SI_TENURE") {
          dataSet.sort((a, b) => a.configVal - b.configVal)
          this.installmentArraySet = dataSet
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  filterScheduleFrequency() {
    return this.frequencyArraySet.filter(x => x.configVal != 'WEEKLY')
  }

  /**
   * This function is invoked to get offer list on cards
   */
  getOfferOnCards() {
    var param = this.initiateSendMoneyService.offerOnCardListParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_OFFERONCARDS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        resp.imageName = "assets/images/slides/dashboard-banner.png";
        this.offersOnCard = resp;
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  /**
   * This function is invoked to get type of methods in payment with details
   * like IMPS,NEFT,RTGS
   */
  getPaymentMethods() {
    var param = this.initiateSendMoneyService.paymentMethodsListParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETPAYMENTMETHOD).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.set.records);
        this.paymentMethod = data.set.records;
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }
  /**
   * This function is invoked to get benificiary List
   */

  /**
   * This function is invoked to set the type of benifiiary  with respect to payment type
   * show and hide functionlity with respect to payment type
   */
  setBenificiaryList() {
    this.benificiaryList = [];
    if (this.paymentType == 'outside') {
      this.benificiaryList = this.outsideBenificiaryList;
      this.fundTransfer.get('paymentMethod').setValidators([Validators.required]);
      this.fundTransfer.get('paymentMethod').updateValueAndValidity();
    }
    else if (this.paymentType == 'mmid') {
      this.fundTransfer.get('paymentMethod').clearValidators();
      this.fundTransfer.get('paymentMethod').updateValueAndValidity();
      this.benificiaryList = this.mmidBenificiaryList;
    }
    else {
      this.fundTransfer.get('paymentMethod').clearValidators();
      this.fundTransfer.get('paymentMethod').updateValueAndValidity();
      if (this.paymentType == 'self') {
        this.benificiaryList = this.selfBenificiaryList;
      }
      else if (this.paymentType == 'within') {
        this.benificiaryList = this.withinBenificiaryList;
      }
    }
    this.fundTransfer.controls['toAccount'].reset();
    this.fundTransfer.controls['amount'].reset();
    this.fundTransfer.controls['paymentMethod'].reset();
    this.selBenificiary = "";
  }

  onBenificiaryChange(event) {
    console.log(event.target.value);
    this.selectedBenificiary = event.target.value;
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    console.log(subActionId);
    if (subActionId == "BENEFICIARYLIST") {
      //TODO: If any change required for later
    }
    else {
      //showToastMessage(resp.Result, "error");
    }
  }

  /**
   * on cancel click
   */
  cancel() {
    if (this.constant.getIsCordova() == "web") {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/dashboardMobile']);
    }
  }

  goBack() {
    if (this.constant.getIsCordova() == "cordova") {
      this.location.back();
    }
    else {
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * on add payee click this function is called
   */
  gotoAddPayee(code) {
    this.DataService.previousPageUrl = 'sendMoney';
    this.DataService.managePayeeToAddpayee = code;
    //this.router.navigateByUrl('/addPayee');

    this.DataService.isEditPayee = false;
    this.DataService.withinBankPayeeList  = [ ...this.withinBankPayeeDetailsList , ...this.withinBankPendingPayeeDetails ]
    this.DataService.outsideBankPayeeList  = [ ...this.outsideBankPayeeDetailsList , ...this.outsideBankPendingPayeeDetails ]
    this.DataService.mmidBankPayeeList  = [ ...this.mmidBankPayeeDetailsList , ...this.mmidBankPendingPayeeDetails ]
    this.DataService.vpainBankPayeeList  = [ ...this.vpaBankPayeeDetailsList , ...this.vpaBankPendingPayeeDetails ]
    this.DataService.isAddPayeeFrompage = "/sendMoney";
    this.router.navigate(['/addPayee']);

  }

  /**
   * clear records
   */
  clearRecords() {
    for (var key in this.DataService.transactionReceiptObj) {
      if (this.DataService.transactionReceiptObj.hasOwnProperty(key)) {
        this.DataService.transactionReceiptObj[key] = '';
      }
    }
  }

  onInput(value) {
    if (value == '0') {
      if (this.fundTransfer.contains('amount')) this.fundTransfer.get('amount').reset();
      return;
    }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
      this.fundTransfer.patchValue({ amount: "₹" + updatedCurrency });
      this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      this.amountInWords = "";
      this.fundTransfer.patchValue({ amount: "" })
    }
  }


  amountshowHide() {
    this.showAmount = !this.showAmount;
  }


  onBlur(value) {
    if (value == '0') {
      if (this.fundTransfer.contains('amount')) this.fundTransfer.get('amount').reset();
      this.amountInWords = "";
      return;
    }
    if (value != '') {
      let noWithComma = value.split(".");
      let updatedCurrency = this.customCurrencyPipe.transform(noWithComma[0].trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
      updatedCurrency = noWithComma.length == 2 ? updatedCurrency + "." + noWithComma[1] : updatedCurrency;
      this.fundTransfer.patchValue({ amount: "₹" + updatedCurrency });
      this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      this.amountInWords = "";
      this.fundTransfer.get('amount').reset();
    }
  }


  onFocus(value) {
    this.amountInWords = "";
    let _amount = value.replace(/[^0-9.]+/g, '');
    this.fundTransfer.patchValue({ amount: _amount });
  }


  getBeneficiaryList() {
    var param = this.otherBankService.benificiaryListParam();
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_BENIFICIARYLIST
      )
      .subscribe((data) => {
        console.log(data);

        let payeeDetailsListData = data.set['records'];
        console.log('Temp Manage beneficiary Data :: ', payeeDetailsListData);

        this.DataService.beneficiaryList.payeeAccNumber =
          payeeDetailsListData.ID;

        // Payee List Data Collection
        this.getBeneficiaryListData(payeeDetailsListData);

        var resp = data.responseParameter;
        if (resp.opstatus == '00') {

          console.log(this.ownBenificiaryList.length);
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

    //Collecting data for all beneficiary of different types mode
    getBeneficiaryListData(payeeDetailsListData) {
      this.withinBankPendingPayeeDetails = [];
      this.withinBankPayeeDetailsList = [];
      this.outsideBankPendingPayeeDetails = [];
      this.outsideBankPayeeDetailsList = [];
      this.mmidBankPendingPayeeDetails = [];
      this.mmidBankPayeeDetailsList = [];
      this.vpaBankPendingPayeeDetails = [];
      this.vpaBankPayeeDetailsList = [];

      for (let i = 0; i < payeeDetailsListData.length; i++) {
        //Within Bank
        if (
          payeeDetailsListData[i]['statusId'] == '8' &&
          payeeDetailsListData[i]['beneficiaryType'] == 'INTRA'
        ) {
          this.withinBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
        }
        if (
          payeeDetailsListData[i]['statusId'] == '3' &&
          payeeDetailsListData[i]['beneficiaryType'] == 'INTRA'
        ) {
          this.withinBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
        }

        //Outside Bank
        if (
          payeeDetailsListData[i]['statusId'] == '8' &&
          payeeDetailsListData[i]['beneficiaryType'] == 'INTERBANK'
        ) {
          this.outsideBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
        }
        if (
          payeeDetailsListData[i]['statusId'] == '3' &&
          payeeDetailsListData[i]['beneficiaryType'] == 'INTERBANK'
        ) {
          this.outsideBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
        }

        //mmid Bank
        if (
          payeeDetailsListData[i]['statusId'] == '8' &&
          payeeDetailsListData[i]['MMID'] != 'null'
        ) {
          this.mmidBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
        }
        if (
          payeeDetailsListData[i]['statusId'] == '3' &&
          payeeDetailsListData[i]['MMID'] != 'null'
        ) {
          this.mmidBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
        }
        //Vpa Bank
        if (
          payeeDetailsListData[i]['statusId'] == '8' &&
          payeeDetailsListData[i]['VPA'] != 'null'
        ) {
          this.vpaBankPendingPayeeDetails[i] = payeeDetailsListData[i]; //within pending list data
        }
        if (
          payeeDetailsListData[i]['statusId'] == '3' &&
          payeeDetailsListData[i]['VPA'] != 'null'
        ) {
          this.vpaBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
        }
      }

      this.withinBankPendingPayeeDetails =
        this.withinBankPendingPayeeDetails.filter(
          (obj) =>
            !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
        );
      this.withinBankPayeeDetailsList = this.withinBankPayeeDetailsList.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.outsideBankPendingPayeeDetails =
        this.outsideBankPendingPayeeDetails.filter(
          (obj) =>
            !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
        );
      this.outsideBankPayeeDetailsList = this.outsideBankPayeeDetailsList.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.mmidBankPendingPayeeDetails = this.mmidBankPendingPayeeDetails.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.mmidBankPayeeDetailsList = this.mmidBankPayeeDetailsList.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.vpaBankPendingPayeeDetails = this.vpaBankPendingPayeeDetails.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );
      this.vpaBankPayeeDetailsList = this.vpaBankPayeeDetailsList.filter(
        (obj) =>
          !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
      );

      console.log(
        'Within PendingPayeeList :: ',
        this.withinBankPendingPayeeDetails
      );
      console.log('Within PayeeDetailsList :: ', this.withinBankPayeeDetailsList);
      console.log(
        'Outside PendingPayeeList :: ',
        this.outsideBankPendingPayeeDetails
      );
      console.log(
        'Outside PayeeDetailsList :: ',
        this.outsideBankPayeeDetailsList
      );
      console.log(
        'mmid PendingPayeeDetailsList :: ',
        this.mmidBankPendingPayeeDetails
      );
      console.log('mmid PayeeDetailsList :: ', this.mmidBankPayeeDetailsList);
      console.log(
        'vpa PendingPayeeDetailsList :: ',
        this.vpaBankPendingPayeeDetails
      );
      console.log('vpa PayeeDetailsList :: ', this.vpaBankPayeeDetailsList);

      this.tempMMIDPayeeList = this.mmidBankPayeeDetailsList;
      this.tempVPAPayeeList = this.vpaBankPayeeDetailsList;
      this.tempWITHINPayeeList = this.withinBankPayeeDetailsList;
      this.tempOUTSIDEPayeeList = this.outsideBankPayeeDetailsList;

      // this.searchFilter();
    }


  /**
    * This function is use to call api to fetch
    * accounts balance
    */
  getAccountBalance(selectedAccount, isrefresh?) {
    this.withinBankForm.patchValue({
      amount: ''
    })

    if (selectedAccount == "") {
      showToastMessage("Please select account")
      return;
    }

    if (isrefresh == 'refresh') {
      var param = this.initiateSendMoneyService.getAccountBalanceParam(selectedAccount);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.accBalance = data.set.records[0].ledgerBalance
          this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      })
    } else {

      var param = this.initiateSendMoneyService.getAccountBalanceParam(selectedAccount);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.accBalance = data.set.records[0].ledgerBalance
          this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      })

      // this.list.forEach(el => {
      //   if(el.accountNo == selectedAccount){
      //     this.accBalance = el.acctBalance
      //     // this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
      //   }
      // })
    }

  }

  // openSendSearchPayee(type, e){
  //   e.stopPropagation();
  //   this.constant.getPlatform() == "web" ? 'desktop' : 'mobile';
  //     //$('#selfBankSelect').slideToggle();
  //     this.openSearchPayee(type,'selfBank', e);
  // }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  //New
  sendMoneySubmit(formValue, formType) {
    this.DataService.feedbackType = "fundTransfer";

    switch (formType) {
      case "selfAccount":
        if (this.selfForm.valid) {
          console.log("Self Form --> ", formValue)
        }
        else {
          this.validateForm()
        }
        break;
      case "withinBankAccount":
        if (this.withinBankForm.valid) {
          console.log("Within Bank Form --> ", formValue)
        }
        else {
          this.validateForm()
        }
        break;
      case "outsideBankAccount":
        if (this.outsideBankForm.valid) {
          console.log("Within Bank Form --> ", formValue)
        }
        else {
          this.validateForm()
        }
        break;
      case "upid":
        if (this.upiIdForm.valid) {
          console.log("Within Bank Form --> ", formValue)
        }
        else {
          this.validateForm()
        }
        break;
      case "mmid":
        if (this.mmidSendMoneyForm.valid) {
          console.log("MMID --> ", this.mmidSendMoneyForm.value);
          if (this.openSection == false)
            this.onFundTransfer();
          else {
            // alert(this.installType + this.frequencyType + this.payType)
          }
        }
        else {
          console.log(this.openSection)
          this.validateForm()
        }
    }
  }

  onAccountDropdownOpen() {
    if (window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  onFromAccountSelect(event) {
    console.log("onFromAccountSelect", event);
    this.selectedAccount = event;
    this.maskedSelectedAccount =  event
    this.DataService.transactionReceiptObj.upiOmnifromAcc = event;

    this.SchemeCode = this.DataService.customerOperativeAccList.filter((objs) => objs.accountNo == event)[0].SchemeCode;



    console.log(this.selectedAccount);
    this.getAccountBalance(event);
    this.changePaymentType(this.paymentType);


    // switch(this.paymentType){
    //   case 'self':
    //     this.openSearchPayee('desktop', 'selfBank', '');
    //     break;
    //   case 'within':
    //     this.openSearchPayee('desktop', 'withinBank', '');
    //     break;
    //   case 'outside':
    //     this.openSearchPayee('desktop', 'outside','');
    //     break;
    //   case 'upid':
    //     break;
    //   case 'mmid':
    //     this.openSearchPayee('desktop', 'mmid','');
    //     break;
    // }
  }

  searchAccount(event) {
    console.log("eventssssssssss", event.target.value);

    switch (this.paymentType) {
      case "self":
        if (event.target.value != '') {
          // var payeeArray = this.tempSELFPayeeList;
          // var filterArray = payeeArray.filter((x) =>
          //   x.schemeDescription.toLowerCase().includes(event.target.value.toLowerCase())
          // );

          var payeeArrays = this.tempSELFPayeeList;
          var filterArray = payeeArrays.filter((objs) =>
            objs.schemeDescription.toLowerCase().includes(event.target.value.toLowerCase())
          );

          this.payeeList = [];
          this.payeeList = filterArray;

        } else {
          this.payeeList = [];
          this.payeeList = this.tempSELFPayeeList;
        }
        break;
      case "within":
        if (event.target.value != '') {
          var payeeArrays = this.tempWITHINPayeeList;
          var filterArray = payeeArrays.filter((objs) =>
            objs.benefName.toLowerCase().includes(event.target.value.toLowerCase())
          );
          this.payeeList = [];
          this.payeeList = filterArray;
          console.log("payyyyyy", this.payeeList)
        } else {
          this.payeeList = [];
          this.payeeList = this.tempWITHINPayeeList;
        }
        break;
      case "outside":
        if (event.target.value != '') {
          var payeeArrays = this.tempOUTSIDEPayeeList;
          var filterArray = payeeArrays.filter((objs) =>
            objs.benefName.toLowerCase().includes(event.target.value.toLowerCase())
          );
          this.payeeList = [];
          this.payeeList = filterArray;
          console.log("payyyyyy", this.payeeList)
        } else {
          this.payeeList = [];
          this.payeeList = this.tempOUTSIDEPayeeList;
        }
        break;
      case "mmid":
        if (event.target.value != '') {
          var payeeArrays = this.tempMMIDPayeeList;
          var filterArray = payeeArrays.filter((objs) =>
            objs.benefName.toLowerCase().includes(event.target.value.toLowerCase())
          );
          this.payeeList = [];
          this.payeeList = filterArray;
          console.log("payyyyyy", this.payeeList)
        } else {
          this.payeeList = [];
          this.payeeList = this.tempMMIDPayeeList;
        }
    }

  }


  clickedOut(event) {
    console.log("page type ====> ", this.pageType)
    // console.log("page type2 ====> ", event)

    switch (this.pageType) {
      case 'selfBank':
          $('#selfBankSelect').slideUp();
          $('#selfBankSelect').parent().removeClass('active')
        break;

      case 'withinBank':
        $('#withinBanlSelect').slideUp();
        $('#withinBanlSelect').parent().removeClass('active')
        break;

      case 'outside':
        $('#outsideBank').slideUp();
        $('#outsideBank').parent().removeClass('active')
        break;

      case 'upid':
        $('#upidBank').slideUp();
        $('#upidBank').parent().removeClass('active')
        break;

      case 'mmid':
        $('#mmidbankselect').slideUp();
        $('#mmidbankselect').parent().removeClass('active')
        break;
    }
  }

  searchListDrop(value, e){
    if (e.stopPropagation) e.stopPropagation();
    switch(value){
      case 'selfBank':
        $('#selfBankSelect').parent().addClass('active')
        break;

      case 'withinBank':
        $('#withinBanlSelect').parent().addClass('active')
        break;

      case 'outside':
        $('#outsideBank').parent().addClass('active')
        break;

      case 'upid':
        $('#upidBank').parent().addClass('active')
        break;

      case 'mmid':
        $('#mmidbankselect').parent().addClass('active')
        break;


    }
  }

  onFrequencyChange(event) {
    this.typeOfFrequency = event.target.value;
    console.log("event.target.value" + event.target.value);
  }

  goToSendMoneyPayee(outputDtl) {
    var payee = outputDtl.output;
    if(outputDtl.payeeType == "recent"){
      this.DataService.recentTransData = {
          "benefName": payee.benefName,
          "txn_amount": payee.txn_amount,
          "DestinationType": payee.DestinationType,
          // "color": this.frequentTransactionColor[Math.floor(Math.random() * 3) + 1],
          "TransactionDate" : payee.TransactionDate,
          "TransactionMonth" : payee.TransactionMonth,
          "transType" : payee.TransactionType,
          "accNo": payee.accountNo,
          "fromAccNumber": payee.fromAccNumber,
          "toAccNumber": payee.toAccNumber,
          "beneficiary_bank_name": payee.beneficiary_bank_name,
          "ifsc_code": payee.ifsc_code,
          "transactionType" : payee.RechargeType
        }
      this.isFromResentPayee();
    }
    else{
      this.selBenificiary = payee;
      this.favBenificiary = payee;
      if (!payee?.accountNo) payee.accountNo = payee.beneficiary_account_no;

      switch (payee.beneficiaryType) {
        case "INTRA":
        case "WITHIN":
          this.paymentType = "within"
          this.selAccOfBenificiary = payee.benefName + "," + payee.accountNo;
          this.selBankOfBenificiary = "" + payee?.beneficiary_bank_name + "," + payee?.ifsc_code;
          this.payeeAccountNo = payee.accountNo;
          this.withinBankForm.patchValue({ sendTo: this.selAccOfBenificiary })
          break;
        case "INTERBANK":
        case "OUTSIDE":
          this.paymentType = "outside"
          this.selAccOfBenificiary = payee.benefName + "," + payee.accountNo;
          var bankName = payee?.beneficiary_bank_name != undefined ? payee?.beneficiary_bank_name : "-";
          this.selBankOfBenificiary = "" + bankName + "," + payee?.ifsc_code;
          this.payeeAccountNo = payee.accountNo;
          this.outsideBankForm.patchValue({ sendTo: this.selAccOfBenificiary })
          break;
        case "VPA":
          this.paymentType = "vpa"
          this.selAccOfBenificiary = payee.benefName + "," + payee.VPA;
          var bankName = payee?.beneficiary_bank_name != undefined ? payee?.beneficiary_bank_name : "-";
          this.selBankOfBenificiary = "" + bankName + "," + payee?.ifsc_code;
          this.payeeAccountNo = payee.VPA;
          this.upiIdForm.patchValue({ sendTo: this.selAccOfBenificiary })
          break;
        case "MMID":
          this.paymentType = "mmid"
          this.selAccOfBenificiary = payee.benefName + "," + payee.MMID;  //payee.MMID
          this.payeeAccountNo = payee.MMID;
          this.mmidSendMoneyForm.patchValue({ sendTo: this.selAccOfBenificiary })
          break;
      }

      this.payeeListOnPaymentType()
    }
    
    // this.changePaymentType(this.paymentType)
  }


  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

  comingSoon() {
    this.commonMethod.openPopup('div.popup-bottom.commingsoon');
  }

  _closePopup(popup){
    this.commonMethod.closePopup(popup);
  }


  ngOnDestroy(){
    this.DataService.isFromAccountDetails = false;
    this.DataService.recentTransData = ''
  }


}
