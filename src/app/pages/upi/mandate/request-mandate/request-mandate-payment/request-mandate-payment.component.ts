import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import * as moment from 'moment';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common';
import { MandateRequest } from 'src/app/models/mandate-model';
import { PluginService } from 'src/app/services/plugin-service';
import { FormValidationService } from 'src/app/services/form-validation.service';
declare var $: any;

@Component({
  selector: 'app-request-mandate-payment',
  templateUrl: './request-mandate-payment.component.html',
  styleUrls: ['./request-mandate-payment.component.scss']
})
export class RequestMandatePaymentComponent implements OnInit {
  requestMandateForm: FormGroup;
  minDate: any;
  maxDate: any;
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'REQUEST_MANDATE',
    'footertype': 'none'
  }
  showDebitDay = false;
  isAmountLimitExceeded = false;
  upiFrequencyList = [];
  debitDayList = [];
  mbebaFlag: any;
  startEndDateDiff: any;
  popupData: any = {};
  dayLimit: any;

  constructor(private router: Router, public DataService: DataService, private http: HttpRestApiService, private constant: AppConstants, private localStorage: LocalStorageService, private customCurrencyPipe: CustomCurrencyPipe, private commonMethod: CommonMethods, private location: Location, private pluginService: PluginService, private formValidation: FormValidationService, private ngZone: NgZone, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    $('#amt').autoNumeric('init', { aSign: "₹ " });
    this.DataService.changeMessage(this.headerdata);
    this.buildForm();
    history.pushState({}, 'requestMandate', this.location.prepareExternalUrl("requestMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.upiFrequencyList = this.constant.upiFrequencyList;
    this.debitDayList = this.constant.debitDayList;
    this.getVPAList();
    this.DataService.selectedVpaDetailsMandate = this.getSelectedVpaAccountDetails();
    this.mbebaFlag = this.DataService.selectedVpaDetailsMandate.accountDetails.mbeba;
  }

  buildForm() {
    this.requestMandateForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl(this.DataService.requestMandateObj.remarks, [Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
      frequency: new FormControl(this.DataService.requestMandateObj.frequency ? this.DataService.requestMandateObj.frequency : 'ONETIME', [Validators.required]),
      // notifyPayee:new FormControl(false),
      debitDay: new FormControl(this.DataService.requestMandateObj.debitDay),
      startDate: new FormControl(moment(this.DataService.requestMandateObj.startDate).format('DD/MM/YYYY'), [Validators.required]),
      endDate: new FormControl(this.DataService.requestMandateObj.endDate ? moment(this.DataService.requestMandateObj.endDate).format('DD/MM/YYYY') : '', [Validators.required]),
    });
    this.minDate = moment().toDate();
    this.maxDate = moment().add(45, 'days').toDate();
    if (this.DataService.requestMandateObj.amount) {
      let amount = this.customCurrencyPipe.transform(this.DataService.requestMandateObj.amount, 'decimal').replace(/[^.0-9]+/g, '');
      this.requestMandateForm.get('amount').setValue( amount);
    }
    // this.initDatePicker();
    // if(!this.DataService.isCordovaAvailable){
    // this.requestMandateForm.controls.endDate.setValue(moment().format('DD/MM/YYYY'));
    // }
  }

  initDatePicker() {
    var self = this;
    $("#datepickerStartDate").datepicker({
      maxDate: self.maxDate,
      dateFormat: 'dd/mm/yy', minDate: self.minDate, onSelect: function (date) {
        self.requestMandateForm.patchValue({ startDate: date });
      }
    });

    $("#datepickerEndDate").datepicker({
      maxDate: self.maxDate,
      dateFormat: 'dd/mm/yy', minDate: self.minDate, onSelect: function (date) {
        self.requestMandateForm.patchValue({ endDate: date });
      }
    });
  }

  goToPage(routeName) {
    this.navigatePage(routeName);
  }

  /**
   * Open Native Date Picker
   */
  // openDatePicker(type) {
  //   let date = type == 'startDate' ? this.DataService.requestMandateObj.startDate : this.DataService.requestMandateObj.endDate;
  //   this.pluginService.openDatePicker('date', date, this.minDate, this.maxDate).subscribe((selectedDate) => {
  //     if (type == 'startDate') {
  //       this.DataService.requestMandateObj.startDate = selectedDate;
  //       this.requestMandateForm.controls.startDate.setValue(moment(selectedDate).format('DD/MM/YYYY'));
  //     } else {
  //       this.DataService.requestMandateObj.endDate = selectedDate;
  //       this.requestMandateForm.controls.endDate.setValue(moment(selectedDate).format('DD/MM/YYYY'));
  //     }
  //   });
  // }


  /**
   * Open Native Date Picker
   */
  openDatePicker(type) {
    let date = type == 'startDate' ? this.DataService.requestMandateObj.startDate : this.DataService.requestMandateObj.endDate;
    if (this.requestMandateForm.get('frequency').value != 'ONETIME') {
      if (type == 'startDate') {
        this.minDate = moment().toDate();
        this.maxDate = null;
      } else {
        this.minDate = moment(this.DataService.requestMandateObj.startDate).toDate();
        this.minDate = moment(this.DataService.requestMandateObj.startDate).add(this.dayLimit, 'days').toDate();
        this.maxDate = null;
      }
    } else {
      if (type == 'startDate') {
        this.minDate = moment().toDate();
        this.maxDate = moment().add(90, 'days').toDate();
      } else {
        this.minDate = moment(this.DataService.requestMandateObj.startDate).toDate();
        this.maxDate = moment(this.DataService.requestMandateObj.startDate).add(90, 'days').toDate();
      }
    }

    this.pluginService.openDatePicker('date', date, this.minDate, this.maxDate).subscribe((selectedDate) => {
      this.ngZone.run(() => {
        if (type == 'startDate') {
          this.DataService.requestMandateObj.startDate = selectedDate;
          this.requestMandateForm.controls.startDate.setValue(moment(selectedDate).format('DD/MM/YYYY'));
          this.requestMandateForm.controls.endDate.setValue(moment(this.DataService.requestMandateObj.startDate).format('DD/MM/YYYY'));
        } else {
          this.DataService.requestMandateObj.endDate = selectedDate;
          this.requestMandateForm.controls.endDate.setValue(moment(selectedDate).format('DD/MM/YYYY'));
        }
        if (this.DataService.requestMandateObj.startDate < this.DataService.requestMandateObj.endDate && this.requestMandateForm.get('frequency').value) {
          this.getStartEndDateDiff()
          // this.constant.upiFrequencyList.forEach((freq, index) => {
          //   if (freq.name == this.createMandatePayForm.get('frequency').value) {
          //     this.dayLimit =  freq.dayLimit
          //     alert(this.dayLimit )
          //   }
          // })
          // var admission = moment(this.DataService.requestMandateObj.startDate, 'DD-MM-YYYY');
          // var discharge = moment(this.DataService.requestMandateObj.endDate, 'DD-MM-YYYY');
          // this.startEndDateDiff = discharge.diff(admission, 'days');
          // if (this.dayLimit > this.startEndDateDiff) {
          //   this.openPopup('div.popup-bottom.dayLimitValidation', this.dayLimit);
          // }
        }
      });
    });
    // this.ref.detectChanges();
  }

  getStartEndDateDiff() {
    this.ngZone.run(() => {
      if (this.DataService.requestMandateObj.startDate && this.DataService.requestMandateObj.endDate) {
        this.constant.upiFrequencyList.forEach((freq, index) => {
          if (freq.name == this.requestMandateForm.get('frequency').value) {
            this.dayLimit = freq.dayLimit;
            // alert(this.dayLimit)
          }
        })
        var admission = moment(this.DataService.requestMandateObj.startDate, 'DD-MM-YYYY');
        var discharge = moment(this.DataService.requestMandateObj.endDate, 'DD-MM-YYYY');
        this.startEndDateDiff = discharge.diff(admission, 'days');
        if (this.dayLimit > this.startEndDateDiff) {
          this.requestMandateForm.controls.endDate.setValue('');
          this.openPopup('div.popup-bottom.dayLimitValidation', this.dayLimit);
        }
      }
    });
  }

  /**
   * Get Upi id List 
   */
  getVPAList() {
    let vpaAddressList = JSON.parse(JSON.stringify(this.DataService.vpaAddressList));
    if (this.DataService.upiMandateVpaList.length == 0) {
      this.DataService.upiMandateVpaList = vpaAddressList.map((vpaAddress: any) => {
        vpaAddress.isSelected || vpaAddress.default == "Y" ? vpaAddress.isSelected = true : vpaAddress.isSelected = false;
        vpaAddress.accounts.map((account: any) => {
          account.isSelected || account.isDefaultAccount == "Y" ? account.isSelected = true : account.isSelected = false;
          return account;
        })
        return vpaAddress;
      });
    }
  }

  /**
   * Create payment
   */
  requestMandate() {
    this.requestMandateForm.markAllAsTouched();
    console.log('create Payment value ', this.requestMandateForm.value)
    if (this.requestMandateForm.valid) {
      let selectedVpa = this.DataService.getSelectedVpaAccountDetails(this.DataService.upiMandateVpaList);
      let { amount, remarks, frequency, debitDay, startDate, endDate } = this.requestMandateForm.value;
      this.DataService.requestMandate = new MandateRequest().deserialize({ requestedFromUPIId: this.DataService.validateAddressResp.validatedVpa, payerName: this.DataService.validateAddressResp.MASKNAME, depositToUPIId: selectedVpa.vpaDetails.paymentAddress, amount: amount.replace(/[^.0-9]+/g, ''), frequency: frequency, validityStartDate: startDate, validityEndDate: endDate, debitDay: debitDay, remarks: remarks, selectedVpa: selectedVpa });
      if (this.isAmountLimitExceeded) {
        this.openPopup('div.popup-bottom.createMandatePaymentInfo');
      } else {
        // this.router.navigateByUrl('/requestMandateConfirmation');
        this.goToPage('requestMandateConfirmation');
      }
    }
  }

  /**
   * set update currency value
   * @param value 
   */
  /**
     * set update currency value
     * @param value 
     */
  formatCurrency(value) {
    this.formValidation.formatDynamicCurrency('amt', this.requestMandateForm);
  }

  /**
   * update debit day value if frequency changes
   */
  onFrequencyChange(value) {
    if (value == 'ONETIME' || value == 'DAILY' || value == "ASPRESENTED") {
      if (value == 'ONETIME') {
        this.requestMandateForm.controls.startDate.setValue(moment().format('DD/MM/YYYY'));
        this.requestMandateForm.controls.endDate.setValue(moment().format('DD/MM/YYYY'));
        this.DataService.createMandateObj.startDate = moment().toDate();
        this.DataService.createMandateObj.endDate = moment().toDate();
      }
      this.DataService.createMandateObj.startDate = moment().toDate();
      this.DataService.createMandateObj.endDate = moment().toDate();
      this.DataService.requestMandateObj.showDebitDay = false;
      this.requestMandateForm.get('debitDay').setValue('ON');
    } else {
      this.DataService.requestMandateObj.showDebitDay = true;
      //setting default value
      this.requestMandateForm.get('debitDay').setValue('BEFORE');
      this.getStartEndDateDiff();
    }
  }

  openPopup(popupName, data?) {
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
    this.commonMethod.openPopup(popupName);
  }


  closePopup(popupName) {
    this.commonMethod.closePopup(popupName);
  }

  navigatePage(routeName) {
    let { amount, remarks, debitDay, frequency, notifyPayee } = this.requestMandateForm.value;
    this.DataService.requestMandateObj.amount = amount;
    this.DataService.requestMandateObj.remarks = remarks;
    this.DataService.requestMandateObj.debitDay = debitDay;
    this.DataService.requestMandateObj.frequency = frequency;
    this.DataService.requestMandateObj.notifyPayee = notifyPayee;
    this.DataService.mandateTypeRouteName = this.router.url;
    this.router.navigateByUrl('/' + routeName);
  }


  getSelectedVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.upiMandateVpaList.find((vpaAddress) => { return vpaAddress.isSelected == true });
    if (defaultVpaAccountArr) {
      let accountDetails = this.DataService.getSelectedAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    }
  }
}
