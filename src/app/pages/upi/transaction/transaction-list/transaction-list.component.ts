import { DatePipe, Location } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { TransactionListService } from './transaction-list.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { PluginService } from 'src/app/services/plugin-service';
import * as moment from 'moment';
import { BenificiaryService } from '../../benificiary/benificiary.service';

declare var createGlobalNavMore: any;
declare var hideFilterModal: any;
declare var showToastMessage: any;
declare var transactionFilter: any;
declare var showFilterModal: any;

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {

  headerdata = {
    'headerType': '',
    'titleName': '',
    'footertype': 'none'
  }
  transactions: any = [];
  transactionsListFilter: any = [];
  vpaAddressList: any = [];
  _vpaAddressList: any = [];
  FilterForm: FormGroup;
  currentDate: any;
  minStopDate: any;
  filterStartDate: any;
  filterEndDate: any;
  earliestTxnDate: any;
  public formErrors = {
    upiId: '',
    startDate: '',
    stopDate: '',
    tranType: ''
  };

  constructor(
    private router: Router,
    public DataService: DataService,
    public transactionListService: TransactionListService,
    public http: HttpRestApiService,
    public storage: LocalStorageService,
    public constant: AppConstants,
    public formValidation: FormValidationService,
    private location: Location,
    private translate: TranslatePipe,
    private ngZone: NgZone,
    private pluginService: PluginService,
    private beneficiaryService: BenificiaryService
  ) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    // this.DataService.setPageSettings('Transaction');
    // createGlobalNavMore();
    this.beneficiaryService.getBenificiaryList();

    var datePipe = new DatePipe("en-US");
    this.currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log('this.currentDate', this.currentDate);
    if (this.DataService.navigationFromDashboard) {
      this.getParamTransactionListBankingService();
    } else {
      this.setTranscationList(this.DataService.upiTransactionList)
    }
    this.buildForm();
    // transactionFilter();
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  goToPage(routeName) {
    this.DataService.routeWithNgZone(routeName);
  }

  closeFilterModal() {
    hideFilterModal();
  }

  filterHeader() {
    // this.FilterForm.reset();
    // this.FilterForm.get('tranType').setValue('ALL');
    // this.FilterForm.get('searchby').setValue('all-upi-id')
    // createGlobalNavMore();
    showFilterModal()
  }

  getParamTransactionListBankingService() {
    var param = this.transactionListService.getParamTransactionList()
    this.callTransactionListBankingService(param);
  }

  callTransactionListBankingService(param) {
    console.log(param);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICE, true).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        var respJson = resp.upiResponse;
        var transactions = respJson.responseParameter.transactions;
        if (transactions.length > 0) {
          this.setTranscationList(transactions)
        }
      }
      else {

        // this.errorCallBack(data.subActionId, resp);
      }
    });

  }

  setTranscationList(transactions) {
    this.transactions = transactions;
    this.transactionsListFilter = this.transactions;
    let userAddress;
    this.transactions.forEach(el => {
      let userDtl = { "paymentAddress": el.TYPE == 'DR' ? el.PAYEEADDR : el.PAYERADDR }
      let index = this._vpaAddressList.findIndex(x => x.paymentAddress == userDtl.paymentAddress);
      index === -1 ? this._vpaAddressList.push(userDtl) : console.log("object already exists");
      el.FORMATTEDDATETIME = moment(el.DATETIME).format('DD MMM yyyy hh:mm a');
      el.FILTERDATETIME = moment(el.DATETIME).format('yyyy-MM-DD');
    });

    this.DataService.upiTransactionList = this.transactions;
    console.log('FORMATTED = this.transactions');
    console.log(this.transactions);
    console.log('this.transactions.length', this.transactions.length);
    let earliestTxn;

    for (let i = 0; i <= this.transactions.length; i++) {
      if (i == this.transactions.length - 1) {
        earliestTxn = this.transactions[this.transactions.length - 1];
        this.earliestTxnDate = moment(earliestTxn.FORMATTEDDATETIME).toDate();
        console.log('this.earliestTxnDate', this.earliestTxnDate);
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

  applyFilter() {
    this.validateForm();
    if (this.FilterForm.valid) {
      if ((this.FilterForm.value.minAmt && this.FilterForm.value.maxAmt) && (this.FilterForm.value.minAmt > this.FilterForm.value.maxAmt)) {
        showToastMessage(this.translate.transform("VALID_AMOUNT_ERROR"), "error");
        this.FilterForm.patchValue({
          minAmt: '',
          maxAmt: ''
        });
        return;
      }
      let filter = {
        searchby: this.FilterForm.value.searchby,
        TYPE: this.FilterForm.value.tranType,
        STATUS: this.FilterForm.value.tranStatus,
        // STARTDATETIME: this.FilterForm.value.startDate,
        // ENDDATETIME: this.FilterForm.value.stopDate,
        STARTDATETIME: this.filterStartDate,
        ENDDATETIME: this.filterEndDate,
        UPIID: this.FilterForm.value.upiId,
        fromAmt: this.FilterForm.value.minAmt ? this.FilterForm.value.minAmt.replace(/[^.0-9]+/g, '') : '',
        toAmt: this.FilterForm.value.maxAmt ? this.FilterForm.value.maxAmt.replace(/[^.0-9]+/g, '') : ''
      };
      console.log("FILTER OBJ => ");
      console.log(filter);

      this.transactions = this.filterTransaction(this.transactions, filter);

      this.closeFilterModal();

    } else {
      this.formErrors = this.formValidation.validateForm(this.FilterForm, this.formErrors, true);
    }
  }

  buildForm() {
    this.FilterForm = new FormGroup({
      upiId: new FormControl(''),
      startDate: new FormControl(''),
      stopDate: new FormControl(''),
      tranType: new FormControl('ALL'),
      tranStatus: new FormControl('ALL'),
      // minAmt: new FormControl('', [Validators.pattern(/(^[0-9.]*$)/)]),
      minAmt: new FormControl(''),
      // maxAmt: new FormControl('', [Validators.pattern(/(^[0-9.]*$)/)]),
      maxAmt: new FormControl(''),
      searchby: new FormControl('all-upi-id')
    });

    this.FilterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.FilterForm, this.formErrors, true);
    });
  }

  onStartDateSelected(val) {
    this.ngZone.run(() => {
      if (val == 0) {
        this.FilterForm.get('startDate').setValidators([Validators.required]);
        this.FilterForm.get('startDate').updateValueAndValidity();
        this.FilterForm.get('stopDate').updateValueAndValidity();
        this.FilterForm.setValidators(this.validaDate);
        this.FilterForm.updateValueAndValidity();
      } else {
        this.FilterForm.get('startDate').setValidators([Validators.nullValidator]);
        this.FilterForm.get('stopDate').setValidators([Validators.nullValidator]);
        this.FilterForm.get('startDate').updateValueAndValidity();
        this.FilterForm.get('stopDate').updateValueAndValidity();
        this.FilterForm.setValidators(Validators.nullValidator);
        this.FilterForm.updateValueAndValidity();
      }
    });
  }

  onStopDateSelected(val) {
    this.ngZone.run(() => {
      if (val == 0) {
        this.FilterForm.get('startDate').setValidators([Validators.required])
        this.FilterForm.get('startDate').updateValueAndValidity();
        this.FilterForm.get('stopDate').setValidators([Validators.required]);
        this.FilterForm.get('stopDate').updateValueAndValidity();
        this.FilterForm.setValidators(this.validaDate);
        this.FilterForm.updateValueAndValidity();
      } else {
        this.FilterForm.get('startDate').setValidators([Validators.nullValidator]);
        this.FilterForm.get('stopDate').setValidators([Validators.nullValidator]);
        this.FilterForm.get('startDate').updateValueAndValidity();
        this.FilterForm.get('stopDate').updateValueAndValidity();
        this.FilterForm.setValidators(Validators.nullValidator);
        this.FilterForm.updateValueAndValidity();
      }
    });
  }

  onMinAmtEntered() {
    if (this.FilterForm.value.minAmt && this.FilterForm.value.maxAmt) {
      this.FilterForm.setValidators(this.validateAmt);
      this.FilterForm.updateValueAndValidity();
    }
    else {
      this.FilterForm.setValidators(Validators.nullValidator);
      this.FilterForm.updateValueAndValidity();
    }
  }

  onMaxAmtEntered() {
    if (this.FilterForm.value.minAmt && this.FilterForm.value.maxAmt) {
      this.FilterForm.setValidators(this.validateAmt);
      this.FilterForm.updateValueAndValidity();
    }
    else {
      this.FilterForm.setValidators(Validators.nullValidator);
      this.FilterForm.updateValueAndValidity();
    }
  }

  /**
  * Validation if tpin & confirm tpin doesn't match
  * @param formGroup 
  */
  validaDate(formGroup: FormGroup) {
    let validDate = true;
    console.log(formGroup);

    const { value: startDate } = formGroup.get('startDate');
    const { value: stopDate } = formGroup.get('stopDate');

    if (new Date(startDate) > new Date(stopDate)) {
      validDate = false;
    }
    return validDate ? null : { invalidDate: true };
  }

  validateAmt(formGroup: FormGroup) {
    let validAmt = true;
    console.log(formGroup);

    const { value: minAmt } = formGroup.get('minAmt');
    const { value: maxAmt } = formGroup.get('maxAmt');
    var _minAmt = minAmt.replace(/[^.0-9]+/g, '')
    var _maxAmt = maxAmt.replace(/[^.0-9]+/g, '')
    console.log(_minAmt, _maxAmt);
    if (parseFloat(_minAmt) > parseFloat(_maxAmt)) {
      validAmt = false;
    }

    return validAmt ? null : { invalidAmt: true };
  }

  clearValidationValue() {
    this.FilterForm.reset();
    this.onStopDateSelected(1); // Reset Validation
    this.onStartDateSelected(1); // Reset Validation
    this.FilterForm.patchValue({ searchby: 'all-upi-id', tranType: 'ALL' });
    this.transactions = this.transactionsListFilter;
    console.log('length ', this.transactions.length)
  }

  validateForm() {
    if (this.FilterForm.invalid) {
      this.formValidation.markFormGroupTouched(this.FilterForm);
      return;
    }
  }

  goToTranDetail(data) {
    this.DataService.selectedUPITranForFurtherProcess(data);
    this.DataService.baseStartUrl = this.DataService.currentPageUrl;
    if (this.DataService.isRaiseComplaint) {
      this.raiseComplaint(data)
    } else {
      // this.router.navigateByUrl('/transactionDetails');
      this.DataService.routeWithNgZone('transactionDetails');
    }
  }

  raiseComplaint(upiTrans) {
    this.DataService.isRaiseComplaint = true;
    this.DataService.raiseComplaint = new RaiseComplaint().deserialize({ rrn: upiTrans.RRN, transactionID: upiTrans.TXNID, complaintType: 'TRANSACTION', txnAmount: upiTrans.AMOUNT, payerAddress: upiTrans.PAYERADDR, payeeAddress: upiTrans.PAYEEADDR, transactionDate: upiTrans.DATETIME, refID: upiTrans.TXNID, transactionType: upiTrans.TYPE, payeeCode: upiTrans.payeeCode, initiationMode: upiTrans.INITIATION_MODE });
    this.router.navigateByUrl('/raiseComplaint');
  }

  filterTransaction(transactions, filter) {
    let f = filter;

    let filteredTransactions = this.transactionsListFilter.filter(o => {
      // console.log(o);
      if (f.searchby != 'all-upi-id' && (f.UPIID.toLowerCase() == o.PAYERADDR.toLowerCase() || f.UPIID.toLowerCase() == o.PAYEEADDR.toLowerCase())) {
        return true;
      }
      if (f.searchby == 'all-upi-id') {
        return true;
      }
      return false;

    })
      .filter((ob) => {
        if (f.TYPE != 'ALL' && f.TYPE == ob.TYPE) {
          return true
        }
        if (f.TYPE == 'ALL') {
          return true
        }
        if (f.TYPE == ob.INITIATION_MODE) {
          return true
        }
        return false
      })
      .filter((ob) => {
        if (f.STATUS != 'ALL' && f.STATUS == ob.TRNSTATUS) {
          return true
        }
        if (f.STATUS == 'ALL') {
          return true
        }
        return false
      })
      .filter((obj) => {
        if (f.fromAmt && f.toAmt) {
          if (Number(f.fromAmt) <= Number(obj.AMOUNT) && Number(obj.AMOUNT) <= Number(f.toAmt)) {
            console.log('amount ', obj.AMOUNT)
            return true;
          } else {
            return false;
          }
        } else if (f.fromAmt) {
          if (Number(obj.AMOUNT) >= Number(f.fromAmt)) {
            console.log('amount ', obj.AMOUNT)
            return true;
          } else {
            return false;
          }
        } else if (f.toAmt) {
          if (Number(obj.AMOUNT) <= Number(f.toAmt)) {
            console.log('amount ', obj.AMOUNT)
            return true;
          } else {
            return false;
          }
        }
        else {
          return true
        }
      })
      .filter((obj) => {
        obj.FILTERDATETIME = new Date(obj.FILTERDATETIME).setHours(0, 0, 0, 0);
        // console.log('f.STARTDATETIME', f.STARTDATETIME);
        // console.log('f.ENDDATETIME', f.ENDDATETIME);
        // console.log('new Date(f.STARTDATETIME)', (new Date(f.STARTDATETIME)));
        // console.log('new Date(f.ENDDATETIME))', new Date(f.ENDDATETIME));
        // console.log('new Date(obj.FILTERDATETIME)', new Date(obj.FILTERDATETIME));
        // console.log('(new Date(f.STARTDATETIME) <= new Date(obj.FILTERDATETIME))', (new Date(f.STARTDATETIME) <= new Date(obj.FILTERDATETIME)));
        // console.log('(new Date(obj.FILTERDATETIME) <= new Date(f.ENDDATETIME))', (new Date(obj.FILTERDATETIME) <= new Date(f.ENDDATETIME)));

        if (f.STARTDATETIME || f.ENDDATETIME) {
          if ((new Date(f.STARTDATETIME) <= new Date(obj.FILTERDATETIME)) && (new Date(obj.FILTERDATETIME) <= new Date(f.ENDDATETIME))) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      });

    console.log('FINAL filteredTransactions');
    console.log(filteredTransactions);
    return filteredTransactions;
  }


  /**
   * set update currency value
   * @param value 
   */
  formatCurrency(value, type) {
    this.formValidation.formatAmtCurrency(value, this.FilterForm, type);
  }

  backbtnClick() {
    this.location.back()
  }

  ngOnDestroy() {
    this.DataService.navigationFromDashboard = false;
    // this.DataService.raiseComplaint = new RaiseComplaint();
  }

  openStartDatePicker() {
    let dateParam = this.minStopDate || moment().toDate();
    console.log("Start => ", this.FilterForm.value.startDate);
    this.pluginService.openDatePicker('date', dateParam, this.earliestTxnDate, moment().toDate()).subscribe((date) => {
      console.log('start date', date);
      if (date) {
        this.minStopDate = date;
        this.FilterForm.get('startDate').setValue(moment(date).format('DD/MM/YYYY'));
        this.filterStartDate = moment(date).format('MM/DD/YYYY');
        this.FilterForm.get('startDate').setValidators([Validators.required]);
        this.FilterForm.get('startDate').updateValueAndValidity();
        this.FilterForm.get('stopDate').setValue('');
        this.FilterForm.get('stopDate').updateValueAndValidity();
        this.FilterForm.setValidators(this.validaDate);
        this.FilterForm.updateValueAndValidity();
      } else {
        this.FilterForm.get('startDate').setValidators([Validators.nullValidator]);
        this.FilterForm.get('startDate').updateValueAndValidity();
        this.FilterForm.get('stopDate').setValidators([Validators.nullValidator]);
        this.FilterForm.get('stopDate').updateValueAndValidity();
        this.FilterForm.setValidators(Validators.nullValidator);
        this.FilterForm.updateValueAndValidity();
      }
    });
  }

  openStopDatePicker() {
    let dateParam = moment().toDate();
    let startDate = this.minStopDate || '';
    console.log("Start => ", this.FilterForm.value.startDate);
    console.log("Stop => ", this.FilterForm.value.stopDate);
    this.pluginService.openDatePicker('date', dateParam, startDate, moment().toDate()).subscribe((date) => {
      console.log('stop date', date);
      if (date) {
        this.FilterForm.get('stopDate').setValue(moment(date).format('DD/MM/YYYY'));
        this.filterEndDate = moment(date).format('MM/DD/YYYY');
        this.FilterForm.get('startDate').setValidators([Validators.required])
        this.FilterForm.get('startDate').updateValueAndValidity();
        this.FilterForm.get('stopDate').setValidators([Validators.required]);
        this.FilterForm.get('stopDate').updateValueAndValidity();
        this.FilterForm.setValidators(this.validaDate);
        this.FilterForm.updateValueAndValidity();
      } else {
        this.FilterForm.get('startDate').setValidators([Validators.nullValidator]);
        this.FilterForm.get('startDate').updateValueAndValidity();
        this.FilterForm.get('stopDate').setValidators([Validators.nullValidator]);
        this.FilterForm.get('stopDate').updateValueAndValidity();
        this.FilterForm.setValidators(Validators.nullValidator);
        this.FilterForm.updateValueAndValidity();
      }
    });
  }

  getPaymentTypeNValue(value) {
    var paymentDtl = [];
    let paymentValue = value;
    if (value.indexOf("ifsc") != -1) {
      paymentDtl[0] = "ifsc"
      paymentValue = paymentValue.replace(".", "@");
      paymentValue = paymentValue.split("@");
      paymentDtl[1] = paymentValue[0];
      paymentDtl[2] = paymentValue[1];
    }
    else if (value.indexOf("mmid") != -1) {
      paymentDtl[0] = "mmid"
      paymentValue = paymentValue.replace(".", "@");
      paymentValue = paymentValue.split("@");
      paymentDtl[1] = paymentValue[0];
      paymentDtl[2] = paymentValue[1];
    }
    else {
      paymentDtl[0] = "vpa"
      paymentDtl[1] = paymentValue;
    }
    return paymentDtl
  }
}