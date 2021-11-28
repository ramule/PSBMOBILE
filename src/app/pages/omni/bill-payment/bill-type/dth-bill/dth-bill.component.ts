import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, RoutesRecognized, ParamMap, NavigationStart, NavigationEnd } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { DTHBillService } from './dth-bill.service';

@Component({
  selector: 'app-dth-bill',
  templateUrl: './dth-bill.component.html',
  styleUrls: ['./dth-bill.component.scss']
})
export class DthBillComponent implements OnInit {
  dthForm: FormGroup;
  amountInWords: string = "";
  accountList = [];
  labelName="";
  showDetails:boolean=false;
  constructor(private router: Router, private form: FormBuilder, public DataService: DataService, private formValidation: FormValidationService, private customCurrencyPipe: CustomCurrencyPipe, private commonMethod: CommonMethods, private dataService: DataService,private DTHBillService : DTHBillService,private constant: AppConstants) { }
  operatorlist: any
  ngOnInit(): void {
    this.buildForm()
    this.initialize()
  }
  dthFormErrors = {
    operator: "",
    dynamicID: "",
    transferFrom: "",
    amount: ""
  }
  DTH_BILL_INVALID_ERR_MSG="";
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelected: boolean = false;

  initialize() {
    this.operatorlist = this.constant.operatorList;
    this.accountList = this.DataService.customerCanTransferAccountList;
    this.DataService.otpSessionPreviousPage = this.router.url;
  }

  buildForm() {
    this.dthForm = new FormGroup({
      operator: new FormControl('', [Validators.required]),
      dynamicID: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(this.constant.NUMERIC_REGEX)]),
      transferFrom: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });

    this.dthForm.valueChanges.subscribe((data) => {
      this.dthFormErrors = this.formValidation.validateForm(this.dthForm, this.dthFormErrors, true);
    });
    // this.DTH_BILL_INVALID_ERR_MSG = "DTH_BILL_INVALID_SUBSID_MOB_NO"
  }

  validateForm() {
    if (this.dthForm.invalid) {
      this.dthForm.get('operator').markAsTouched();
      this.dthForm.get('dynamicID').markAsTouched();
      this.dthForm.get('transferFrom').markAsTouched();
      this.dthForm.get('amount').markAsTouched();
      return;
    }
  }

  selectOperator(id) {
    // Registered Mobile No./Subscriber ID
    this.dthForm.get('transferFrom').reset('');
    this.dthForm.get('amount').reset();
    this.isAccountSelected = false;
    switch (id) {
      case '0':
        this.labelName = "Customer Id";
        this.dthForm.get('dynamicID').reset();
        this.dthForm.get('dynamicID').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(this.constant.NUMERIC_REGEX)]);
        this.DTH_BILL_INVALID_ERR_MSG = "DTH_BILL_INVALID_CUST_ID";
        this.showDetails = true;
        break;
      case '1':
        this.labelName = "Registered Mobile No./Viewing Card No.";
        this.dthForm.get('dynamicID').reset();
        this.dthForm.get('dynamicID').setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.required,Validators.pattern(this.constant.NUMERIC_REGEX)]);
        this.DTH_BILL_INVALID_ERR_MSG = "DTH_BILL_INVALID_REG_MOB_NO_VIEW_CARD_NO";
        this.showDetails = true;
        break;
      case '2':
        this.labelName = "Smart Card Number";
        this.dthForm.get('dynamicID').reset();
        this.dthForm.get('dynamicID').setValidators([Validators.required,Validators.minLength(11), Validators.maxLength(11),Validators.pattern(this.constant.NUMERIC_REGEX)]);
        this.DTH_BILL_INVALID_ERR_MSG = "DTH_BILL_INVALID_SMART_CARD_NO";
        this.showDetails = true;
        break;
      case '3':
        this.labelName = "Registered Mobile No./Subscriber ID";
        this.dthForm.get('dynamicID').reset();
        this.dthForm.get('dynamicID').setValidators([Validators.minLength(10),Validators.maxLength(10),Validators.required,Validators.pattern(this.constant.NUMERIC_REGEX)]);
        this.DTH_BILL_INVALID_ERR_MSG = "DTH_BILL_INVALID_REG_MOB_NO_SUBS_ID";
        this.showDetails = true;
        break;
      case '4':
        this.labelName = "Registered Mobile No./Subscriber ID";
        this.dthForm.get('dynamicID').reset();
        this.dthForm.get('dynamicID').setValidators([Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern(this.constant.NUMERIC_REGEX)]);
        this.DTH_BILL_INVALID_ERR_MSG = "DTH_BILL_INVALID_REG_MOB_NO_SUBS_ID";
        this.showDetails = true;
        break;

      //TODO : Add other labels depends on bank requirement

      default:
        break;
    }
  }

  submitForm() {
    this.validateForm()
    if (this.dthForm.valid) {
      console.log(this.dthForm.value)
      var rtgsReqParam = this.DTHBillService.getDTHPayRequest(this.dthForm.value);
      this.DataService.request = rtgsReqParam;
      this.DataService.endPoint = this.constant.serviceName_RECHARGEMOBILEDTHDATACARD;
      this.DataService.screenType = 'DTHBillPay';
      this.dataService.authorizeHeader = "Recharge and bill pay";
      this.dataService.billPayObj = {};
      this.dataService.billPayObj.accountno = this.dthForm.get('transferFrom').value;
      this.dataService.billPayObj.operatorName = this.getOperatorName(this.dthForm.get('operator').value);
      this.dataService.billPayObj.dynamicID = this.dthForm.get('dynamicID').value ;
      this.dataService.billPayObj.labelName = this.labelName ;
      this.dataService.billPayObj.amount=  this.dthForm.get('amount').value.trim().replace(/[^0-9]+/g,'');
      this.router.navigate(['/otpSession']);
    }
    else {
      this.dthFormErrors = this.formValidation.validateForm(this.dthForm, this.dthFormErrors, true);
    }

  }

  onInput(value) {
    if(value == '0'){
      if(this.dthForm.contains('amount')) this.dthForm.get('amount').reset();
      this.amountInWords = "";
      return;
    }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
      this.dthForm.patchValue({ amount: updatedCurrency });
      this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      this.amountInWords = "";
      this.dthForm.patchValue({ amount: "" })
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
    } else {
      // $("#transferFrom").val('');
      this.dthForm.get('transferFrom').reset();
      this.isAccountSelected = false;
    }
  }

  getOperatorName(id) {
    return this.constant.operatorList.filter(obj => obj.id == id)[0].operatorName;
  }

  addBillerClick(){
    this.router.navigate(['/addBiller']);
  }
}
