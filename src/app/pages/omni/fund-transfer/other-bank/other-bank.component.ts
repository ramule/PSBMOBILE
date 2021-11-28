import { Component, OnInit } from '@angular/core';
import { AnimationPlayer } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, RoutesRecognized, ParamMap, NavigationStart, NavigationEnd } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { OtherBankService } from '../../fund-transfer/other-bank/other-bank.service';
import { AppConstants } from '../../../../app.constant';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { FormValidationService } from '../../../../services/form-validation.service';
import { Location } from '@angular/common';
import { filter, pairwise } from 'rxjs/operators';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';

declare var showToastMessage: any;

@Component({
  selector: 'app-other-bank',
  templateUrl: './other-bank.component.html',
  styleUrls: ['./other-bank.component.scss']
})
export class OtherBankComponent implements OnInit {
  paymentMethod: any;
  transferFund: FormGroup;
  schedulecheck: boolean = false;
  accountList = [];
  benificiaryList: any = [];
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelected: boolean = false;
  selectedBenificiary: any;
  amountInWords:string="";

  public formErrors = {
    transferTo: '',
    transferFrom: '',
    amount: '',
    paymentType: '',
    remark: '',
    schedule: '',
  };

  constructor(public location: Location, private router: Router, private form: FormBuilder, public DataService: DataService, private otherBankService: OtherBankService, private constant: AppConstants, private http: HttpRestApiService, private storage: LocalStorageService, private formValidation: FormValidationService, private customCurrencyPipe: CustomCurrencyPipe,private commonMethod : CommonMethods) { }

  ngOnInit(): void {
    this.initialize();
  }

  buildForm() {
    this.transferFund = new FormGroup({
      transferTo: new FormControl('', [Validators.required]),
      transferFrom: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      remark: new FormControl(''),
      schedule: new FormControl(''),
    });

    this.transferFund.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.transferFund, this.formErrors, true);
    });
  };

  /**
   * Form Validation
   */
  validateForm() {
    if (this.transferFund.invalid) {
      this.transferFund.get('transferTo').markAsTouched();
      this.transferFund.get('transferFrom').markAsTouched();
      this.transferFund.get('amount').markAsTouched();
      this.transferFund.get('paymentType').markAsTouched();
      return;
    }
  }

  /**
   * This function is called to make fund transfer
   */
  fundTransfer() {
    this.validateForm()
    console.log(this.transferFund.value)
    if (this.transferFund.valid) {
      this.DataService.resetTransactionObj();
      let paymentType = this.transferFund.get('paymentType').value
      if (paymentType == "RTGS") {
        var rtgsReqParam = this.otherBankService.getRTGSFundTransferParam(this.transferFund.value, this.selectedBenificiary, this.selectedAccount);
        this.DataService.request = rtgsReqParam;
        this.DataService.endPoint = this.constant.serviceName_RTGSFUNDTRANSFER;
      }
      else if (paymentType == "NEFT") {
        var neftReqParam = this.otherBankService.getNEFTFundTransferParam(this.transferFund.value, this.selectedBenificiary);
        this.DataService.request = neftReqParam;
        this.DataService.endPoint = this.constant.serviceName_NEFTFUNDTRANSFER;
      }
      else {
        return;
      }
      let amount =this.transferFund.get('amount').value;
      this.DataService.authorizeHeader = "Other Account";
      this.DataService.transactionReceiptObj.from_acc = this.selectedAccount.accountNumber;
      this.DataService.transactionReceiptObj.to_acc = this.selectedBenificiary.beneficiary_account_no;
      this.DataService.transactionReceiptObj.payee_name = this.selectedBenificiary.benefName;
      this.DataService.transactionReceiptObj.amount = amount;
      this.DataService.transactionReceiptObj.remarks = this.transferFund.get('remark').value;
      this.DataService.screenType = 'fundTransfer';

      this.router.navigate(['/otpSession']);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.transferFund, this.formErrors, true);
    }
  }

  /**
   * On particular account select this function is called
   */
  selectAccount(selectedBenfNo) {
    console.log(selectedBenfNo);
    if (this.transferFund.value.transferTo != '') {
      $("#transferFrom").val('');
      this.isAccountSelected = false;
      this.transferFund.patchValue({ transferFrom: '' });
      this.selectedBenificiary = this.benificiaryList.find(i => i.value == selectedBenfNo);;
      $('#selectAccount').slideDown();
    } else {
      this.transferFund.reset();
      this.isAccountSelected = false;
      $("#transferTo").val('');
      $("#transferFrom").val('');
      $('#selectAccount').slideUp();
    }
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
      this.transferFund.controls['schedule'].setValue('')
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
      $("#transferFrom").val('');
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
        'desc': '(Instant Transfer upto 2 Lakh, Available 24X7 365 Days)',
        'checked': true
      },
      {
        'type': 'NEFT',
        'desc': '(Regular Transfer, Available 24X7 365 Days*)',
        'checked': false
      },
      {
        'type': 'RTGS',
        'desc': '(Minimum 2 lakh, Available 7 AM - 6 PM on RBI Working Days)',
        'checked': false
      }
    ]
    this.DataService.setPageSettings('OTHER_BANK');
    this.buildForm();
    this.accountList = this.DataService.customerCanTransferAccountList;
    this.DataService.otpSessionPreviousPage = '/otherBanks';
    this.getBenificaryList();
    this.clearRecords();
  }


  /**
   * This function is invoked to get benificiary List
   */
  getBenificaryList() {
    var param = this.otherBankService.benificiaryListParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BENIFICIARYLIST).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        // this.benificiaryList = data.set.records;
        // this.benificiaryList.forEach(el => {
        //   el.value = el.benefName+"-"+el.beneficiary_account_no+"/"+el.beneficiary_bank_name
        // });

        data.set.records.forEach(el => {
          if (el.beneficiaryType == "INTER" || el.beneficiaryType == "INTERBANK") {
            // this.benificiaryList = data.set.records;
            this.benificiaryList.push(el);
          }
        });
        this.benificiaryList.forEach(el => {
          el.value = el.benefName + "-" +this.commonMethod.maskAccNo(el.beneficiary_account_no) + "/" + el.beneficiary_bank_name
        });
        /********* set value of the beneficiary if commin from manage payee **********/

        this.setBeneficiary();

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == "02" || resp.opstatus == "01") {
      showToastMessage(resp.Result, "error");
    }
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
  addPayee(code) {
    this.DataService.bankTypeCode = code;
    this.router.navigateByUrl('/addPayee');
  }

  /**
   * set beneficiary is already details is available
   */
  setBeneficiary() {
    console.log("get previous url==========>");
    if (this.DataService.fromManagePayee.isfromMangepayee && this.DataService.fromManagePayee.valuefromMagepayee != '') {
      var beneficiaryDtls = this.DataService.fromManagePayee.valuefromMagepayee;
      console.log(beneficiaryDtls);
      this.transferFund.patchValue({ "transferTo": beneficiaryDtls });
      this.selectAccount(beneficiaryDtls);
      this.DataService.fromManagePayee = {
        isfromMangepayee: false,
        valuefromMagepayee: ''
      }
    }
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
      if(this.transferFund.contains('amount'))this.transferFund.get('amount').reset();
       return;
     }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
      this.transferFund.patchValue({ amount: "₹" + updatedCurrency });
      this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      this.amountInWords ="";
      this.transferFund.patchValue({ amount: "" })
    }
  }
}
