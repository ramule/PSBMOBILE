import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, RoutesRecognized, ParamMap, NavigationStart, NavigationEnd } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { LandLineBillService } from './landline-bill.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-landline-bill',
  templateUrl: './landline-bill.component.html',
  styleUrls: ['./landline-bill.component.scss']
})
export class LandlineBillComponent implements OnInit {
  landlineForm: FormGroup;
  paybillForm: FormGroup;
  showbilldetails: boolean = false;
  showDynamicID: boolean = false;
  showSTDCode: boolean = false;
  billDetails: any;
  labelName = "";
  labelName1 = "";
  operatorName = "";
  LANDLINE_BILL_ERR_MSG = "";
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelected: boolean = false;
  accountList = [];
  landlineFormErrors = {
    operator: "",
    accNumber: "",
    dynamicID: ""
  }
  payFormErrors = {
    transferFrom: "",
  }
  operatorlist: any


  constructor(private router: Router, private form: FormBuilder, public DataService: DataService, private formValidation: FormValidationService, private http: HttpRestApiService, private storage: LocalStorageService, private constant: AppConstants, private billService: LandLineBillService, private dataService: DataService) { }

  ngOnInit(): void {
    this.buildForm()
    this.initialize()
  }

  initialize() {
    this.showbilldetails = false;
    this.operatorlist = this.constant.landLineOperatorList;
    this.accountList = this.DataService.customerCanTransferAccountList;
    this.dataService.otpSessionPreviousPage = this.router.url;

  }


  buildForm() {
    this.landlineForm = new FormGroup({
      operator: new FormControl('', [Validators.required]),
      accNumber: new FormControl('', [Validators.required]),
      dynamicID: new FormControl('', [Validators.required]),
    });

    this.landlineForm.valueChanges.subscribe((data) => {
      this.landlineFormErrors = this.formValidation.validateForm(this.landlineForm, this.landlineFormErrors, true);
    });

    this.paybillForm = new FormGroup({
      transferFrom: new FormControl('', [Validators.required]),

    });
    this.paybillForm.valueChanges.subscribe((data) => {
      this.payFormErrors = this.formValidation.validateForm(this.paybillForm, this.payFormErrors, true);
    });

  }

  validateForm(types) {
    if (types == "fetch") {
      if (this.landlineForm.invalid) {
        this.landlineForm.get('operator').markAsTouched();
        if (this.landlineForm.contains('accNumber')) this.landlineForm.get('accNumber').markAsTouched();
        this.landlineForm.get('dynamicID').markAsTouched();
        return;
      }
    }
    if (types == "pay") {
      if (this.paybillForm.invalid) {
        this.paybillForm.get('transferFrom').markAsTouched();
        return;
      }
    }
  }



  /**
   * Setting dynamic field based on select value of operator
   * @param value 
   */
  selectOperator(value) {
    if (value != '') {
      this.operatorName = this.getOperatorNameById(value);
      this.showDynamicID = true;
      this.showSTDCode = false;
      this.landlineForm.get('dynamicID').reset();
      this.paybillForm.get('transferFrom').reset('');
      this.landlineForm.removeControl('accNumber');
      switch (value) {
        case '0':
          this.labelName = "Number without STD Code";
          this.labelName1 = "Account Number";
          this.landlineForm.addControl('accNumber', new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.constant.NUMERIC_REGEX)]));
          this.landlineForm.get('dynamicID').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(this.constant.NUMERIC_REGEX)]);
          this.landlineForm.updateValueAndValidity();
          this.LANDLINE_BILL_ERR_MSG = "LANDLINE_INVALID_NUMBER_WITHOUT_STD_CODE";
          this.showbilldetails = false;
          this.showSTDCode = true;
          break;
        case '1':
          this.labelName = "Number without STD Code";
          this.labelName1 = "Account Number";
          this.landlineForm.addControl('accNumber', new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.constant.NUMERIC_REGEX)]));
          this.landlineForm.get('dynamicID').setValidators([Validators.minLength(8), Validators.maxLength(8), Validators.required, Validators.pattern(this.constant.NUMERIC_REGEX)]);
          this.landlineForm.updateValueAndValidity();
          this.LANDLINE_BILL_ERR_MSG = "LANDLINE_INVALID_NUMBER_WITHOUT_STD_CODE";
          this.showbilldetails = false;
          this.showSTDCode = true;
          break;
        case '2':
          this.labelName = "Number with STD Code";
          this.landlineForm.get('dynamicID').setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.constant.NUMERIC_REGEX)]);
          this.landlineForm.updateValueAndValidity();
          this.LANDLINE_BILL_ERR_MSG = "LANDLINE_INVALID_NUMBER_STD_CODE";
          this.showbilldetails = false;
          this.showSTDCode = false;
          break;

        case '3':
          this.labelName = "Account Number";
          this.landlineForm.get('dynamicID').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.constant.NUMERIC_REGEX)]);
          this.landlineForm.updateValueAndValidity();
          this.LANDLINE_BILL_ERR_MSG = "LANDLINE_INVALID_ACC_NO";
          this.showbilldetails = false;
          this.showSTDCode = false;
          break;
        default:
          break;
      }
    }
  }

  getBillDetails() {
    this.validateForm('fetch')
    if (this.landlineForm.valid) {
      console.log(this.landlineForm.value)
      let req = this.billService.getLandlineBillRequest(this.landlineForm.value);
      this.http.callBankingAPIService(req, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_WATERBILLPAYMENT).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          this.showbilldetails = true;
          this.billDetails = resp;
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
    }
    else {
      this.landlineFormErrors = this.formValidation.validateForm(this.landlineForm, this.landlineFormErrors, true);
    }
  }

  /**
   * pay bill function call for landline bill payment
   */
  payLandlineBill() {
    this.validateForm("pay");
    this.validateForm("fetch");
    if (this.landlineForm.valid) {
      if (this.paybillForm.valid) {
        //TODO : Change servicename to landline payment when we get api from backend team
        let req = this.billService.getLandlineBillPayRequest(this.paybillForm.value, this.billDetails.txn_amount, this.paybillForm.value);
        this.dataService.request = req;
        //TODO : Change servicename to landline payment when we get api from backend team
        this.dataService.endPoint = this.constant.serviceName_WATERBILLPAYMENT;
        this.dataService.screenType = 'landlineBillPay';
        this.dataService.authorizeHeader = "Recharge and bill pay";
        this.dataService.billPayObj = {};
        this.dataService.billPayObj.accountno = this.paybillForm.get('transferFrom').value;
        this.dataService.billPayObj.operatorName = this.getOperatorNameById(this.landlineForm.get('operator').value);
        this.dataService.billPayObj.labelName = this.labelName;
        this.dataService.billPayObj.dynamicID = this.landlineForm.get('dynamicID').value;
        // if(this.paybillForm.contains('accNumber')) this.dataService.billPayObj.accNumber = this.landlineForm.get('accNumber');
        this.dataService.billPayObj.amount = this.billDetails.txn_amount;
        this.router.navigate(['/otpSession']);
      }
      else {
        this.payFormErrors = this.formValidation.validateForm(this.paybillForm, this.payFormErrors, true);
      }
    } else {
      this.landlineFormErrors = this.formValidation.validateForm(this.landlineForm, this.landlineFormErrors, true);
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
* On account number change this function is invoked
* @param account 
*/
  onAccountNoChange(accountNumber) {
    if (accountNumber != '') {
      this.isAccountSelected = true;
      this.selectedAccount = this.accountList.find(i => i.accountNumber == accountNumber);
      this.selectedAccBal = this.selectedAccount.sbBalance;
    } else {
      this.paybillForm.get('transferFrom').reset();
      this.isAccountSelected = false;
    }
  }


  /**
   * Function to get boardName by board id
   * @param id 
   */
  getOperatorNameById(id) {
    return this.operatorlist.filter(obj => obj.id == id)[0].name;
  }


  addBillerClick() {
    this.router.navigate(['/addBiller']);
  }
}
