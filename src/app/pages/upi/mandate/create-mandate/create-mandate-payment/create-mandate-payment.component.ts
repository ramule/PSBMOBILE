import { Location } from '@angular/common';
import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PluginService } from 'src/app/services/plugin-service';
import { DataService } from '../../../../../services/data.service';
import * as moment from 'moment';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { MandatePayment } from 'src/app/models/mandate-model';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormValidationService } from 'src/app/services/form-validation.service';
declare var $: any;

@Component({
  selector: 'app-create-mandate-payment',
  templateUrl: './create-mandate-payment.component.html',
  styleUrls: ['./create-mandate-payment.component.scss']
})
export class CreateMandatePaymentComponent implements OnInit {
  createMandatePayForm: FormGroup;
  minDate: any;
  maxDate: any;
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'CREATE_MANDATE',
    'footertype': 'none'
  }
  upiFrequencyList = [];
  debitDayList = [];
  isAmountLimitExceeded = false;
  startDateEditable = true;
  endDateEditable = true;
  amountEditable = true;
  freqEditable = true;
  mbebaFlag: any;
  startEndDateDiff: any;
  popupData: any = {};
  dayLimit: any;

  constructor(private router: Router, public DataService: DataService, private location: Location, private pluginService: PluginService, private localStorage: LocalStorageService, private http: HttpRestApiService, private constant: AppConstants, private customCurrencyPipe: CustomCurrencyPipe, private commonMethod: CommonMethods, private formValidation: FormValidationService, private ngZone: NgZone, private ref: ChangeDetectorRef) { }
  ngOnInit(): void {
    $('#amt').autoNumeric('init', { aSign: "₹ " });
    this.minDate = moment().toDate();
    this.maxDate = moment().add(90, 'days').toDate();
    this.buildForm();
    this.upiFrequencyList = this.constant.upiFrequencyList;
    this.debitDayList = this.constant.debitDayList;
    history.pushState({}, this.DataService.previousPageUrl == 'upiDashboard' ? 'upiDashboard' : 'createMandate', this.location.prepareExternalUrl(this.DataService.previousPageUrl == 'upiDashboard' ? 'upiDashboard' : 'createMandate'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    this.getUpiIdList();
    this.DataService.selectedVpaDetailsMandate = this.getSelectedVpaAccountDetails();
    this.mbebaFlag = this.DataService.selectedVpaDetailsMandate.accountDetails.mbeba;
  }

  goToPage(routeName) {
    this.closePopup('div.popup-bottom.createMandatePaymentInfo');
    this.navigatePage(routeName);
  }


  buildForm() {
    this.createMandatePayForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl(this.DataService.createMandateObj.remarks, [Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
      frequency: new FormControl(this.DataService.createMandateObj.frequency ? this.DataService.createMandateObj.frequency : 'ONETIME', [Validators.required]),
      notifyPayee: new FormControl(this.DataService.createMandateObj.notifyPayee ? this.DataService.createMandateObj.notifyPayee : true),
      debitDay: new FormControl(this.DataService.createMandateObj.debitDay),
      startDate: new FormControl(moment(this.DataService.createMandateObj.startDate).format('DD/MM/YYYY'), [Validators.required]),
      endDate: new FormControl(this.DataService.createMandateObj.endDate ? moment(this.DataService.createMandateObj.endDate).format('DD/MM/YYYY') : '', [Validators.required]),
    });
    // this.startDateEditable = this.DataService.ScanQrCodeData.validitystart ? false : true;
    // this.endDateEditable = this.DataService.ScanQrCodeData.validityend ? false : true;
    // this.amountEditable = this.DataService.ScanQrCodeData.am ? false : true;
    // this.freqEditable = this.DataService.ScanQrCodeData.recur ? false : true;
    this.minDate = moment().toDate();
    this.maxDate = moment().add(45, 'days').toDate();
    if (this.DataService.createMandateObj.amount) {
      // let amount = this.customCurrencyPipe.transform(this.DataService.createMandateObj.amount, 'decimal').replace(/[^.0-9]+/g, '');
      this.createMandatePayForm.get('amount').setValue("₹ " + this.DataService.createMandateObj.amount);
    } 
    // if(!this.DataService.isCordovaAvailable){
    // this.createMandatePayForm.controls.endDate.setValue(moment().format('DD/MM/YYYY'));
    // }
  }

  /**
   * Get Upi id List 
   */
  getUpiIdList() {
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

  /**
   * Open Native Date Picker
   */
  openDatePicker(type) {
    let date = type == 'startDate' ? this.DataService.createMandateObj.startDate : this.DataService.createMandateObj.endDate;
    if (this.createMandatePayForm.get('frequency').value != 'ONETIME') {
      if (type == 'startDate') {
        this.minDate = moment().toDate();
        this.maxDate = null;
      } else {
        // this.minDate = moment(this.DataService.createMandateObj.startDate).toDate();
        this.minDate = moment(this.DataService.createMandateObj.startDate).add(this.dayLimit, 'days').toDate();
        this.maxDate = null;
      }
    } else {
      if (type == 'startDate') {
        this.minDate = moment().toDate();
        this.maxDate = moment().add(90, 'days').toDate();
      } else {
        this.minDate = moment(this.DataService.createMandateObj.startDate).toDate();
        this.maxDate = moment(this.DataService.createMandateObj.startDate).add(90, 'days').toDate();
      }
    }

    this.pluginService.openDatePicker('date', date, this.minDate, this.maxDate).subscribe((selectedDate) => {
      this.ngZone.run(() => {
        if (type == 'startDate') {
          this.DataService.createMandateObj.startDate = selectedDate;
          this.createMandatePayForm.controls.startDate.setValue(moment(selectedDate).format('DD/MM/YYYY'));
          this.createMandatePayForm.controls.endDate.setValue(moment(this.DataService.createMandateObj.startDate).format('DD/MM/YYYY'));
        } else {
          this.DataService.createMandateObj.endDate = selectedDate;
          this.createMandatePayForm.controls.endDate.setValue(moment(selectedDate).format('DD/MM/YYYY'));
        }

        if (this.DataService.createMandateObj.startDate < this.DataService.createMandateObj.endDate && this.createMandatePayForm.get('frequency').value) {
          this.getStartEndDateDiff()
          // this.constant.upiFrequencyList.forEach((freq, index) => {
          //   if (freq.name == this.createMandatePayForm.get('frequency').value) {
          //     this.dayLimit =  freq.dayLimit
          //     alert(this.dayLimit )
          //   }
          // })
          // var admission = moment(this.DataService.createMandateObj.startDate, 'DD-MM-YYYY');
          // var discharge = moment(this.DataService.createMandateObj.endDate, 'DD-MM-YYYY');
          // this.startEndDateDiff = discharge.diff(admission, 'days');
          // if (this.dayLimit > this.startEndDateDiff) {
          //   this.openPopup('div.popup-bottom.dayLimitValidation', this.dayLimit);
          // }
        }
      });
    });
    this.ref.detectChanges();
  }

  getStartEndDateDiff() {
    this.ngZone.run(() => {
      if (this.DataService.createMandateObj.startDate && this.DataService.createMandateObj.endDate) {
        this.constant.upiFrequencyList.forEach((freq, index) => {
          if (freq.name == this.createMandatePayForm.get('frequency').value) {
            this.dayLimit = freq.dayLimit
            // alert(this.dayLimit)
          }
        })
        var admission = moment(this.DataService.createMandateObj.startDate, 'DD-MM-YYYY');
        var discharge = moment(this.DataService.createMandateObj.endDate, 'DD-MM-YYYY');
        this.startEndDateDiff = discharge.diff(admission, 'days');
        if (this.dayLimit > this.startEndDateDiff) {
          this.createMandatePayForm.controls.endDate.setValue('');
          this.openPopup('div.popup-bottom.dayLimitValidation', this.dayLimit);
        }
      }
    });
  }

  /**
   * Create payment
   */
  createPayment() {
    this.createMandatePayForm.markAllAsTouched();
    console.log('create Payment value ', this.createMandatePayForm.value)
    if (this.createMandatePayForm.valid) {

      let selectedVpa = this.DataService.getSelectedVpaAccountDetails(this.DataService.upiMandateVpaList);
      let { amount, remarks, frequency, notifyPayee, debitDay, startDate, endDate } = this.createMandatePayForm.value;
      this.DataService.createMandatePayment = new MandatePayment().deserialize({ fromUPIId: selectedVpa.vpaDetails.paymentAddress, payeeName: this.DataService.validateAddressResp.MASKNAME, toPayee: this.DataService.validateAddressResp.validatedVpa, amount: amount.replace(/[^.0-9]+/g, ''), frequency: frequency, validityStartDate: startDate, validityEndDate: endDate, debitDay: debitDay, remarks: remarks, notifyPayee: notifyPayee || this.createMandatePayForm.get('frequency').value != 'ONETIME' ? 'Y' : 'N', selectedVpa: selectedVpa });
      if (this.isAmountLimitExceeded) {
        this.openPopup('div.popup-bottom.createMandatePaymentInfo');
      } else {
        // this.router.navigateByUrl('/createMandateConfirmation');
        this.goToPage('createMandateConfirmation');
      }
    }
  }


  /**
    * set update currency value
    * @param value 
    */
  formatCurrency(value) {
    let amt = $('#amt').val().replace(/[^.0-9]+/g, '');
    if (Number(amt) > 2000) {
      this.isAmountLimitExceeded = true;
    } else {
      this.isAmountLimitExceeded = false;
    }
    this.formValidation.formatDynamicCurrency('amt', this.createMandatePayForm);
  }

  /**
   * update debit day value if frequency changes
   */
  onFrequencyChange(value) {
    this.createMandatePayForm.get('notifyPayee').reset(false)
    if (value == 'ONETIME' || value == 'DAILY' || value == "ASPRESENTED") {
      if (value == 'ONETIME') {
        this.createMandatePayForm.controls.startDate.setValue(moment().format('DD/MM/YYYY'));
        this.createMandatePayForm.controls.endDate.setValue(moment().format('DD/MM/YYYY'));
        this.DataService.createMandateObj.startDate = moment().toDate();
        this.DataService.createMandateObj.endDate = moment().toDate();
      }
      this.DataService.createMandateObj.startDate = moment().toDate();
      this.DataService.createMandateObj.endDate = moment().toDate();
      this.DataService.createMandateObj.showDebitDay = false;
      this.createMandatePayForm.get('debitDay').setValue('ON');
    } else {
      this.DataService.createMandateObj.showDebitDay = true;
      //setting default value
      this.createMandatePayForm.get('debitDay').setValue('BEFORE');
      this.getStartEndDateDiff();
    }
  }

  navigatePage(routeName) {
    let selectedVpa = this.DataService.getSelectedVpaAccountDetails(this.DataService.upiMandateVpaList);
    let { amount, remarks, frequency, notifyPayee, debitDay, startDate, endDate } = this.createMandatePayForm.value;
    this.DataService.createMandateObj.amount = amount;
    this.DataService.createMandateObj.remarks = remarks;
    this.DataService.createMandateObj.debitDay = debitDay;
    this.DataService.createMandateObj.frequency = frequency;
    this.DataService.createMandateObj.notifyPayee = notifyPayee;
    this.DataService.createMandatePayment = new MandatePayment().deserialize({ fromUPIId: selectedVpa.vpaDetails.paymentAddress, payeeName: this.DataService.validateAddressResp.MASKNAME, toPayee: this.DataService.validateAddressResp.validatedVpa, amount: amount.replace(/[^.0-9]+/g, ''), frequency: frequency, validityStartDate: startDate, validityEndDate: endDate, debitDay: debitDay, remarks: remarks, notifyPayee: notifyPayee || this.createMandatePayForm.get('frequency').value != 'ONETIME' ? 'Y' : 'N', selectedVpa: selectedVpa });
    this.DataService.mandateTypeRouteName = this.router.url;
    this.router.navigateByUrl('/' + routeName);
  }


  openPopup(popupName, data?) {
    this.commonMethod.openPopup(popupName);
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
  }

  closePopup(popupName) {
    this.commonMethod.closePopup(popupName);
  }
}
