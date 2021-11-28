import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { WaterBillService } from '../water-bill/water-bill-service';
declare var showToastMessage: any;

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
  corporationLists: any;
  type: '';
  showCustomer: boolean = false;
  taxBillForm: FormGroup;
  paybillForm: FormGroup;
  public formErrorstaxBillForm = {
    corporationType: '',
    dynamicID: ''
  };
  payFormErrors = {
    transferFrom: "",
  }
  billDetails: any;
  accountList = [];
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelected: boolean = false;

  labelName = "";
  showDetails = false;
  showbilldetails: boolean = false;
  TAX_BILL_ERR_MSG = "";
  constructor(private router: Router, private formBuilder: FormBuilder, public dataService: DataService, private formValidation: FormValidationService, private constant: AppConstants, private http: HttpRestApiService, private storage: LocalStorageService, private waterBillService: WaterBillService) { }

  ngOnInit(): void {
    this.initialize()
  }


  buildform() {
    this.taxBillForm = new FormGroup({
      corporationType: new FormControl('', [Validators.required,]),
      dynamicID: new FormControl('', [Validators.required]),
    });
    this.taxBillForm.valueChanges.subscribe((data) => {
      this.formErrorstaxBillForm = this.formValidation.validateForm(this.taxBillForm, this.formErrorstaxBillForm, true);
    });
    this.paybillForm = new FormGroup({
      transferFrom: new FormControl('', [Validators.required]),

    });
    this.paybillForm.valueChanges.subscribe((data) => {
      this.payFormErrors = this.formValidation.validateForm(this.paybillForm, this.payFormErrors, true);
    });
  }



  initialize() {
    this.corporationLists = this.constant.corporationLists;
    this.accountList = this.dataService.customerCanTransferAccountList;
    this.buildform();
    this.dataService.otpSessionPreviousPage = this.router.url;
  }

  submitClick() {
    if (this.taxBillForm.valid) {
      if (this.paybillForm.valid) {
        //TODO: change the below request to actual request after getting the api 
        let req = this.waterBillService.getWaterBillPayRequest(this.taxBillForm.value, this.billDetails.txn_amount, this.paybillForm.value);
        this.dataService.request = req;
        this.dataService.endPoint = this.constant.serviceName_WATERBILLPAYMENT;
        this.dataService.screenType = 'taxBillPay';
        this.dataService.authorizeHeader = "Recharge and bill pay";
        this.dataService.billPayObj = {};
        this.dataService.billPayObj.accountno = this.paybillForm.get('transferFrom').value;
        this.dataService.billPayObj.boardName = this.getBoardNameById(this.taxBillForm.get('corporationType').value);
        this.dataService.billPayObj.labelName = this.labelName;
        this.dataService.billPayObj.dynamicID = this.taxBillForm.get('dynamicID').value;
        this.dataService.billPayObj.amount = this.billDetails.txn_amount;

        this.router.navigate(['/otpSession']);
      } else {
        this.payFormErrors = this.formValidation.validateForm(this.paybillForm, this.payFormErrors, false)
      }
    } else {
      this.formErrorstaxBillForm = this.formValidation.validateForm(this.taxBillForm, this.formErrorstaxBillForm, false)
    }
  }

  selectCorporation(id) {
    this.paybillForm.get('transferFrom').reset('');
    this.isAccountSelected = false;
    this.type = id;
    if (id == "") {
      this.showDetails = false;
      this.showbilldetails = false;
      return;
    }
    let selectedCoorporator = this.constant.corporationLists.find(i => i.id == id);
    this.labelName = selectedCoorporator.label;
    this.TAX_BILL_ERR_MSG = selectedCoorporator.errMsg;
    this.taxBillForm.get('dynamicID').setValidators([Validators.required, Validators.minLength(selectedCoorporator.minLength), Validators.maxLength(selectedCoorporator.maxLength), Validators.pattern(selectedCoorporator.pattern)]);
    this.taxBillForm.get('dynamicID').updateValueAndValidity();
    this.taxBillForm.get('dynamicID').reset('')
    this.showDetails = true;
    this.showbilldetails = false;
  }

  getBillDetails() {
    if (this.taxBillForm.valid) {
      console.log('this.taxBillForm: ' + this.taxBillForm.value);
      //TODO: change the below request to actual request after getting the api 
      let req = this.waterBillService.getWaterBillRequest(this.taxBillForm.value);
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
    } else {
      this.formErrorstaxBillForm = this.formValidation.validateForm(this.taxBillForm, this.formErrorstaxBillForm, false)
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
    // this.selectedAccount = accountNumber;
    if (accountNumber != '') {
      this.isAccountSelected = true;
      this.selectedAccount = this.accountList.find(i => i.accountNumber == accountNumber);
      this.selectedAccBal = this.selectedAccount.sbBalance;
    } else {
      this.paybillForm.get('transferFrom').reset();
      this.isAccountSelected = false;
    }
  }

  getBoardNameById(id) {
    return this.constant.corporationLists.filter(obj => obj.id == id)[0].name;
  }


  addBillerClick() {
    this.router.navigate(['/addBiller']);
  }
}
