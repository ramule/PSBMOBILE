import { Component, OnInit } from '@angular/core';
import { AnimationPlayer } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { FormValidationService } from '../../../../services/form-validation.service';
import { OwnBankService } from './own-bank.service';
import { OtherBankService } from '../other-bank/other-bank.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';

declare var showToastMessage: any;

@Component({
  selector: 'app-own-bank',
  templateUrl: './own-bank.component.html',
  styleUrls: ['./own-bank.component.scss']
})
export class OwnBankComponent implements OnInit {
  paymentMethod: any;
  fundTransfer: FormGroup;
  schedulecheck: boolean = false;
  accountList = []; 
  benificiaryList: any = [];
  withinBenificiaryList:any = [];
  outsideBenificiaryList:any = [];
  selfBenificiaryList:any = [];
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelected: boolean = false;
  selectedBenificiary: any;
  amountInWords:string="";
  paymentType:any ='self';
  onAccountSel:boolean = false;
  selBenificiary:any ;

  public formErrors = {
    fromAccount: '',
    toAccount: '',
    amount: '',
    paymentMethod: '',
    remark: ''
  };

  constructor(
    private router: Router,
    private form: FormBuilder,
    public DataService: DataService,
    private ownBankService: OwnBankService,
    private otherBankService: OtherBankService,
    private constant: AppConstants,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private formValidation: FormValidationService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private commonMethod : CommonMethods
  ) { }

  ngOnInit(): void {
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.getBreadcrumb('OWN_BANK' , this.router.url)
    this.initialize();
  }

  buildForm() {
    this.fundTransfer = new FormGroup({
      fromAccount: new FormControl('', [Validators.required]),
      toAccount: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl(''),
      remark: new FormControl('')
    });

    this.fundTransfer.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.fundTransfer, this.formErrors, true);
    });
  };

  /**
   * Form Validation
   */
  validateForm() {
    if (this.fundTransfer.invalid) {
      this.fundTransfer.get('fromAccount').markAsTouched();
      this.fundTransfer.get('toAccount').markAsTouched();
      this.fundTransfer.get('amount').markAsTouched();
      this.fundTransfer.get('paymentMethod').markAsTouched();
      return;
    }
  }


  /**
   * This function is called to make fund transfer
   */
  onFundTransfer() {
    if(this.paymentType == "mmid" || this.paymentType == "vpa" ){
      return;
    }
    this.validateForm()
    console.log(this.fundTransfer.value)
    if (this.fundTransfer.valid) {
      this.DataService.resetTransactionObj();
      switch (this.paymentType) {
        case "self":
          var ownReqParam = this.ownBankService.getOwnFundTransferParam(this.fundTransfer.value, this.selBenificiary);
          this.DataService.request = ownReqParam;
          this.DataService.endPoint = this.constant.serviceName_OWNFUNDTRANSFER;
          break;
        case "within" || "outside":
          if(this.fundTransfer.value.paymentMethod == "NEFT"){
            var neftReqParam = this.otherBankService.getNEFTFundTransferParam(this.fundTransfer.value, this.selBenificiary);
            this.DataService.request = neftReqParam;
            this.DataService.endPoint = this.constant.serviceName_NEFTFUNDTRANSFER;
          }
          else if(this.fundTransfer.value.paymentMethod == "RTGS"){
            var rtgsReqParam = this.otherBankService.getRTGSFundTransferParam(this.fundTransfer.value, this.selBenificiary, this.selectedAccount);
            this.DataService.request = rtgsReqParam;
            this.DataService.endPoint = this.constant.serviceName_RTGSFUNDTRANSFER;
          }
          break;
        default:
      }

      //On selected type of fund transfer respective api is called
      
      
      if(this.fundTransfer.value.paymentMethod == "IMPS"){
        return;
      }
      this.DataService.authorizeHeader = "Own Account";
      this.DataService.transactionReceiptObj.from_acc = this.fundTransfer.value.fromAccount;
      this.DataService.transactionReceiptObj.to_acc = this.fundTransfer.value.toAccount;
      this.DataService.transactionReceiptObj.payee_name = this.selBenificiary.benefName;
      this.DataService.transactionReceiptObj.amount = this.fundTransfer.value.amount;
      this.DataService.transactionReceiptObj.remarks = this.fundTransfer.value.remark;
      this.DataService.screenType = 'fundTransfer';

      this.router.navigate(['/otpSession']);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.fundTransfer, this.formErrors, true);
    }
  }

  /**
   * On particular account select this function is called
   */
  selectAccount(selectedBenfNo) {
    this.accountList = JSON.parse(JSON.stringify(this.DataService.customerCanTransferAccountList));//assign copy of object instead of memory reference
    if (this.fundTransfer.value.transferTo != '') {
      $("#transferFrom").val('');
      this.isAccountSelected = false;
      this.fundTransfer.patchValue({ transferFrom: '' });
      this.selectedBenificiary = this.benificiaryList.find(i => i.value == selectedBenfNo);;
      $('#selectAccount').slideDown();
      //remove the selected account from "Transfer from" list
      //money cannot transfer to same account
      let index = this.accountList.findIndex(x => x.beneficiary_nick_name + "-" + this.commonMethod.maskAccNo(x.accountNumber) + "/Own Bank" === selectedBenfNo)
      if (index != -1) this.accountList.splice(index, 1);

    } else {
      this.fundTransfer.reset();
      this.isAccountSelected = false;
      $("#transferTo").val('');
      $("#transferFrom").val('');
      $('#selectAccount').slideUp();
    }
  }

  /**
   * Function to be called when to account is selected
   * @value
   */
  getToAccValue(value){
    console.log(value);
    this.fundTransfer.patchValue({ toAccount: value.beneficiary_account_no });
    this.selBenificiary = value;
  }

  /**
   *To show hide Schedule payment this function is invoked 
   * @param checked 
   */
  schedule(checked) {
    if (checked) {
      $('#paymentSchedule').slideDown();
    } else {
      $('#paymentSchedule').slideUp()
      this.fundTransfer.controls['schedule'].setValue('')
    }
  }

  /**
   * On account number change this function is invoked
   * @param account 
   */
  onAccountNoChange(accountNumber) {
    // this.selectedAccount = accountNumber;
    if (accountNumber != '') {
      this.isAccountSelected = true;
      this.selectedAccount = this.accountList.find(i => i.accountNumber == accountNumber);
      this.selectedAccBal = this.selectedAccount.sbBalance;
      console.log(this.selectedAccount);
    } else {
      this.isAccountSelected = false;
    }
  }

  /**
   * Initialization functionality
   */
  initialize() {
    this.paymentMethod = [
      {
        'type': 'IMPS',
        'desc': '(Instant transfer upto 2lakh, available 24x7 365 days)',
        'checked': true
      },
      {
        'type': 'NEFT',
        'desc': '(Regular transfer upto 2lakh, available 24x7 365 days)',
        'checked': false
      },
      {
        'type': 'RTGS',
        'desc': '(Min 2 lakh, available 7AM - 6PM on RBI working days)',
        'checked': false
      }
    ]
    this.DataService.setPageSettings('SAME_BANK');
    this.buildForm();
    this.accountList = JSON.parse(JSON.stringify(this.DataService.customerCanTransferAccountList));//assign copy of object instead of memory reference
    console.log(this.accountList);
    this.DataService.otpSessionPreviousPage = '/ownBanks';
    //selected account on load
    this.selectedAccount = this.accountList[0];
    this.fundTransfer.patchValue({ fromAccount: this.selectedAccount.accountNumber });
    this.selBenificiary = '';


    
    this.getBenificaryList();
    this.clearRecords();
  }


  /**
   * This function is invoked to get benificiary List
   */
  getBenificaryList() {
    

    //account list for self
    this.DataService.customerCanTransferAccountList.forEach(el => {
      let value = {
        ID: "",
        IFSC: "",
        amount: el.sbBalance,
        benefName: el.accountHolderName,
        beneficiaryType: "INTRA",
        beneficiary_account_no: el.accountNumber,
        beneficiary_bank_name: "Own Bank",
        beneficiary_nick_name: el.beneficiary_nick_name,
        beneficiary_status: "8",
        branch_name: "",
        city: "",
        coolingPeriodCheck: "N",
        currency: el.currency
      }
      this.selfBenificiaryList.push(value);
    });
    this.DataService.customerCanTransferAccountList.forEach(el => {
      let value = {
        ID: "",
        IFSC: "",
        amount: el.sbBalance,
        benefName: el.accountHolderName,
        beneficiaryType: "INTRA",
        beneficiary_account_no: el.accountNumber,
        beneficiary_bank_name: "Own Bank",
        beneficiary_nick_name: el.beneficiary_nick_name,
        beneficiary_status: "8",
        branch_name: "",
        city: "",
        coolingPeriodCheck: "N",
        currency: el.currency
      }
      this.selfBenificiaryList.push(value);
    });
    this.DataService.customerLoanAccountList.forEach(el => {
      let value = {
        ID: "",
        IFSC: "",
        amount: el.sbBalance,
        benefName: el.accountHolderName,
        beneficiaryType: "INTRA",
        beneficiary_account_no: el.accountNumber,
        beneficiary_bank_name: "Own Bank",
        beneficiary_nick_name: el.beneficiary_nick_name,
        beneficiary_status: "8",
        branch_name: "",
        city: "",
        coolingPeriodCheck: "N",
        currency: el.currency
      }
      this.selfBenificiaryList.push(value);
    });

    if(this.paymentType == 'self'){
      this.benificiaryList = this.selfBenificiaryList;
    }

    // benificiary list for within and other account
    var param = this.otherBankService.benificiaryListParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BENIFICIARYLIST).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        data.set.records.forEach(el => {
          if (el.beneficiaryType == "INTRA") {
            this.withinBenificiaryList.push(el);
          }
          if (el.beneficiaryType == "INTER" || el.beneficiaryType == "INTERBANK") {
            this.outsideBenificiaryList.push(el);
          }
        });

        if(this.paymentType == 'within'){
          this.benificiaryList = this.withinBenificiaryList;
        }
        else if(this.paymentType == 'outside'){
          this.benificiaryList = this.outsideBenificiaryList;
        }
        /********* set value of the beneficiary if commin from manage payee **********/
        //this.setBeneficiary();
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })

  }

  /**
   * This function is invoked to set the type of benifiiary  with respect to payment type
   */
  setBenificiaryList(){
    this.benificiaryList = [];
    if(this.paymentType == 'self'){
      this.benificiaryList = this.selfBenificiaryList;
      this.fundTransfer.get('paymentMethod').clearValidators();
      this.fundTransfer.get('paymentMethod').updateValueAndValidity();
    }
    else if(this.paymentType == 'within'){
      this.benificiaryList = this.withinBenificiaryList;
      this.fundTransfer.get('paymentMethod').setValidators([Validators.required]);
      this.fundTransfer.get('paymentMethod').updateValueAndValidity();
    }
    else if(this.paymentType == 'outside'){
      this.benificiaryList = this.outsideBenificiaryList;
      this.fundTransfer.get('paymentMethod').setValidators([Validators.required]);
      this.fundTransfer.get('paymentMethod').updateValueAndValidity();
    }
  }

  /**
   * set beneficiary is already details is available
   */
  setBeneficiary() {
    console.log("get previous url==========>");
    if (this.DataService.fromManagePayee.isfromMangepayee && this.DataService.fromManagePayee.valuefromMagepayee != '') {
      var beneficiaryDtls = this.DataService.fromManagePayee.valuefromMagepayee;
      console.log(beneficiaryDtls);
      this.fundTransfer.patchValue({ "transferTo": beneficiaryDtls });
      this.selectAccount(beneficiaryDtls);
      this.DataService.fromManagePayee = {
        isfromMangepayee: false,
        valuefromMagepayee: ''
      }
    }
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  /**
   * on cancel click
   */
  cancel() {
    this.router.navigate(['/dashboard']);
  }

  /**
   * on add payee click this function is called
   */
  gotoAddPayee(code) {
    var selCode
    if(code == 'within' ) selCode = 1;
    else selCode = 3;
    // 'outside'
    this.DataService.bankTypeCode = selCode;
    this.router.navigateByUrl('/addPayee');
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
    if(value == '0'){
      if(this.fundTransfer.contains('amount'))this.fundTransfer.get('amount').reset();
       return;
     }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
      this.fundTransfer.patchValue({ amount: "₹" + updatedCurrency });
      this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      this.amountInWords ="";
      this.fundTransfer.patchValue({ amount: "" })
    }
  }


}
