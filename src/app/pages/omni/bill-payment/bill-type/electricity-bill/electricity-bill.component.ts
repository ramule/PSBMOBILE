import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, RoutesRecognized, ParamMap, NavigationStart, NavigationEnd } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { ElectricityBillService } from './electricity-bill.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-electricity-bill',
  templateUrl: './electricity-bill.component.html',
  styleUrls: ['./electricity-bill.component.scss']
})
export class ElectricityBillComponent implements OnInit {
  electricityForm: FormGroup;
  paybillForm: FormGroup;
  billDetails: any;
  accountList = [];
  boardName = "";
  constructor(private router: Router, private form: FormBuilder, public DataService: DataService, private formValidation: FormValidationService, private constant: AppConstants, private http: HttpRestApiService, private storage: LocalStorageService, private billService: ElectricityBillService, private dataService: DataService) { }
  statelist: any;
  electricityBoardlist: any;
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelected: boolean = false;
  showbilldetails: boolean = false;
  showConsumerNo: boolean = false;
  ngOnInit(): void {
    this.initialize()
  }

  payFormErrors = {
    transferFrom: "",
  }
  electricityFormErrors = {
    state: "",
    board: "",
    consumerNo: ""
  };
  labelName = "";
  ELECTRICITY_BILL_ERR_MSG = "";
  showBoard: boolean = false;
  /**
   * Initialization
   */
  initialize() {
    this.statelist = [
      "Maharashtra",
    ]

    this.electricityBoardlist = this.constant.electricityBoardlist;
    this.accountList = this.DataService.customerCanTransferAccountList;
    this.buildForm();
    this.DataService.otpSessionPreviousPage = this.router.url;
  }

  /**
   * Form Build
   */
  buildForm() {
    this.electricityForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      board: new FormControl('', [Validators.required]),
      consumerNo: new FormControl('', [Validators.required]),
    });

    this.electricityForm.valueChanges.subscribe((data) => {
      this.electricityFormErrors = this.formValidation.validateForm(this.electricityForm, this.electricityFormErrors, true);
    });

    this.paybillForm = new FormGroup({
      transferFrom: new FormControl('', [Validators.required]),
    });
    this.paybillForm.valueChanges.subscribe((data) => {
      this.payFormErrors = this.formValidation.validateForm(this.paybillForm, this.payFormErrors, true);
    });
  }

  validateForm() {
    if (this.electricityForm.invalid) {
      this.electricityForm.get('state').markAsTouched();
      this.electricityForm.get('board').markAsTouched();
      this.electricityForm.get('consumerNo').markAsTouched();
      return;
    }
  }

  selectState(value) {
    if (value != '') {
      this.showBoard = true;
      this.electricityForm.patchValue({ board: '' });
    }else{
      this.showBoard = false;
    }
  }

  selectBoard(value) {
    this.paybillForm.get('transferFrom').reset('');
    this.isAccountSelected = false;
    if(value == ""){
      this.showConsumerNo = false;
      this.showBoard = false;
      this.showbilldetails = false;
      return;
    }
    let selectedBoard = this.constant.electricityBoardlist.find(i => i.id == value);
    this.labelName = selectedBoard.label;
    this.boardName = selectedBoard.name;
    this.ELECTRICITY_BILL_ERR_MSG = selectedBoard.errMsg;
    this.electricityForm.get('consumerNo').setValidators([Validators.required, Validators.minLength(selectedBoard.minLength),Validators.maxLength(selectedBoard.maxLength),Validators.pattern(selectedBoard.pattern)]);
    this.electricityForm.get('consumerNo').updateValueAndValidity();
    this.electricityForm.get('consumerNo').reset('');
    this.showConsumerNo = true;
    this.showbilldetails = false;
  }

  getBillDetails() {
    this.validateForm();
    if (this.electricityForm.valid) {
      //TODO : After getting banking services change below request to get electricity bill details
      let req = this.billService.getElectricityBillRequest(this.electricityForm.value);
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
      this.electricityFormErrors = this.formValidation.validateForm(this.electricityForm, this.electricityFormErrors, true);
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



  submitForm() {
    this.formValidation.markFormGroupTouched(this.paybillForm);
    if(this.electricityForm.valid){
      if (this.paybillForm.valid) {
        // console.log('this.waterBillForm: ' + this.waterBillForm)
        //TODO : Change servicename to electricity payment when we get api from backend team
        let req = this.billService.getElectricBillPayRequest(this.electricityForm.value, this.billDetails.txn_amount, this.paybillForm.value);
        this.dataService.request = req;
        //TODO : Change servicename to electricity payment when we get api from backend team
        this.dataService.endPoint = this.constant.serviceName_WATERBILLPAYMENT;
        this.dataService.screenType = 'electricityBillPay';
        this.dataService.authorizeHeader = "Recharge and bill pay";
        this.dataService.billPayObj = {};
        this.dataService.billPayObj.accountno = this.paybillForm.get('transferFrom').value;
        this.dataService.billPayObj.boardName = this.boardName;
        this.dataService.billPayObj.labelName = this.labelName;
        this.dataService.billPayObj.consumerNo = this.electricityForm.get('consumerNo').value;
        this.dataService.billPayObj.amount = this.billDetails.txn_amount;
        this.router.navigate(['/otpSession']);
      } else {
        this.payFormErrors = this.formValidation.validateForm(this.paybillForm, this.payFormErrors, false)
      }
    }else {
      this.electricityFormErrors = this.formValidation.validateForm(this.electricityForm, this.electricityFormErrors, false)
    }
   

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

  addBillerClick(){
    this.router.navigate(['/addBiller']);
  }


}
