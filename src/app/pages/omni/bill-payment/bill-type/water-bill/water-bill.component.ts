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
  selector: 'app-water-bill',
  templateUrl: './water-bill.component.html',
  styleUrls: ['./water-bill.component.scss']
})
export class WaterBillComponent implements OnInit {
  boardLists: any;
  type: '';
  boardName='';
  showCustomer: boolean = false;
  waterBillForm: FormGroup;
  paybillForm: FormGroup;
  public formErrorsWaterBillForm = {
    boardType: '',
    billNo: ''
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
  WATER_BILL_ERR_MSG = "";
  constructor(private router: Router, private formBuilder: FormBuilder, public dataService: DataService, private formValidation: FormValidationService, private constant: AppConstants, private http: HttpRestApiService, private storage: LocalStorageService, private waterBillService: WaterBillService) { }

  ngOnInit(): void {
    this.initialize()
  }


  buildform() {
    this.waterBillForm = new FormGroup({
      boardType: new FormControl('', [Validators.required,]),
      billNo: new FormControl('', [Validators.required]),
    });
    this.waterBillForm.valueChanges.subscribe((data) => {
      this.formErrorsWaterBillForm = this.formValidation.validateForm(this.waterBillForm, this.formErrorsWaterBillForm, true);
    });
    this.paybillForm = new FormGroup({
      transferFrom: new FormControl('', [Validators.required]),

    });
    this.paybillForm.valueChanges.subscribe((data) => {
      this.payFormErrors = this.formValidation.validateForm(this.paybillForm, this.payFormErrors, true);
    });

  }



  initialize() {
    this.boardLists = this.constant.waterSupplyBoardList;
    this.accountList = this.dataService.customerCanTransferAccountList;
    this.buildform();
    this.dataService.otpSessionPreviousPage = this.router.url;
  }

  submitClick() {
    this.formValidation.markFormGroupTouched(this.waterBillForm);
    this.formValidation.markFormGroupTouched(this.paybillForm);
    if (this.waterBillForm.valid) {
      if (this.paybillForm.valid) {
        // console.log('this.waterBillForm: ' + this.waterBillForm)
        let req = this.waterBillService.getWaterBillPayRequest(this.waterBillForm.value, this.billDetails.txn_amount, this.paybillForm.value);
        this.dataService.request = req;
        this.dataService.endPoint = this.constant.serviceName_WATERBILLPAYMENT;
        this.dataService.screenType = 'waterBillPay';
        this.dataService.authorizeHeader = "Recharge and bill pay";
        this.dataService.billPayObj = {};
        this.dataService.billPayObj.accountno = this.paybillForm.get('transferFrom').value;
        this.dataService.billPayObj.boardName = this.boardName;
        this.dataService.billPayObj.labelName = this.labelName;
        this.dataService.billPayObj.billNo = this.waterBillForm.get('billNo').value;
        this.dataService.billPayObj.amount = this.billDetails.txn_amount;
        this.router.navigate(['/otpSession']);
      } else {
        this.payFormErrors = this.formValidation.validateForm(this.paybillForm, this.payFormErrors, false)
      }
    } else {
      this.formErrorsWaterBillForm = this.formValidation.validateForm(this.waterBillForm, this.formErrorsWaterBillForm, false)
    }
  }

  selectBoard(id) {
    this.paybillForm.get('transferFrom').reset('');
    this.isAccountSelected = false;
    this.type = id;
    if(id == ""){
      this.showDetails = false;
      this.showbilldetails = false;
      return;
    }
    let selectedBoard = this.constant.waterSupplyBoardList.find(i => i.id == id);
    this.labelName = selectedBoard.label;
    this.boardName = selectedBoard.boardName;
    this.WATER_BILL_ERR_MSG = selectedBoard.errMsg;
    if(id == '2'){
      this.waterBillForm.get('billNo').setValidators([Validators.required,Validators.pattern(selectedBoard.pattern)]);
    }else{
      this.waterBillForm.get('billNo').setValidators([Validators.required, Validators.minLength(selectedBoard.minLength),Validators.maxLength(selectedBoard.maxLength),Validators.pattern(selectedBoard.pattern)]);
    }
    this.waterBillForm.get('billNo').updateValueAndValidity();
    this.waterBillForm.get('billNo').reset('');
    this.showDetails = true;
    this.showbilldetails = false;
  }

  getBillDetails() {
    if (this.waterBillForm.valid) {
      console.log('this.waterBillForm: ' + this.waterBillForm)
      let req = this.waterBillService.getWaterBillRequest(this.waterBillForm.value);
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
      this.formErrorsWaterBillForm = this.formValidation.validateForm(this.waterBillForm, this.formErrorsWaterBillForm, false)
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
    return this.constant.waterSupplyBoardList.filter(obj => obj.id == id)[0].boardName;
  }


  addBillerClick() {
    this.router.navigate(['/addBiller']);
  }
}
