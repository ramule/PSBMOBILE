import { DatePipe, Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { CollectEnterAmountService } from '../collect-enter-amount/collect-enter-amount.service';
import * as moment from 'moment';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';

declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-collect-enter-amount',
  templateUrl: './collect-enter-amount.component.html',
  styleUrls: ['./collect-enter-amount.component.scss']
})
export class CollectEnterAmountComponent implements OnInit {
  collectAmountForm: FormGroup;
  collectDate: any;
  collectTime: any;
  selectedVpa: any;
  vpaAddressList = [];
  showDetails = false;
  information="";
  mbebaFlag:any;
  currentDate = moment().format('YYYY-MM-DD');
  currentTime = moment.duration(moment().format('hh:mm'), "minutes");
  headerdata = {
    'headerType': 'backUpiIdHeader',
    'titleName': 'COLLECT',
    'footertype': 'none'
  }
  constructor(private router: Router, public DataService: DataService, private constant: AppConstants, private http: HttpRestApiService, private localStorage: LocalStorageService, private formValidation: FormValidationService, private customCurrencyPipe: CustomCurrencyPipe, private collectAmtService: CollectEnterAmountService, private translate: TranslatePipe, private pluginService: PluginService,private location: Location,private commonMethod:CommonMethods, private ngZone: NgZone) { }

  ngOnInit(): void {
    // this.DataService.setPageSettings('Collect');
    $('#amt').autoNumeric('init', {aSign: "₹ "});
    this.DataService.changeMessage(this.headerdata);
    this.DataService.backURLCollectVPAList = this.router.url;
    createGlobalNavMore();
    this.initialize();
  }

  initialize() {
    this.buildForm();
    this.collectDate = moment(this.DataService.upiCollectRequest.date).format('DD/MM/yyyy');
    this.collectTime = moment(this.DataService.upiCollectRequest.time).format('hh:mm A');
    // history.pushState({}, this.DataService.previousPageUrl == 'transactionDetails' ? 'transactionList' :'collectRecentRequest', this.location.prepareExternalUrl(this.DataService.previousPageUrl == 'transactionDetails' ? 'transactionList' :'collectRecentRequest'));
    let prevPageurl = "";
    if(this.DataService.previousPageUrl == 'transactionDetails' && this.DataService.baseStartUrl == 'recentTransaction') {
      prevPageurl = 'recentTransaction';
    } else if(this.DataService.previousPageUrl == 'transactionDetails') {
      prevPageurl = 'transactionList';
    } else if (this.DataService.previousPageUrl == 'recentTransaction') {
      prevPageurl = 'recentTransaction';
    } else {
      prevPageurl = 'collectRecentRequest';
    }
    history.pushState({}, prevPageurl, this.location.prepareExternalUrl(prevPageurl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    // this.selectedVpa = this.DataService.upiCollectSelectedVpa;
    let vpaAddressList = JSON.parse(JSON.stringify(this.DataService.vpaAddressList));
    if (this.DataService.upiCollectVpaList.length == 0) {
      this.DataService.upiCollectVpaList = vpaAddressList.map((vpaAddress: any) => {
        vpaAddress.isSelected || vpaAddress.default == "Y" ? vpaAddress.isSelected = true : vpaAddress.isSelected = false;
        vpaAddress.accounts.map((account: any) => {
          account.isSelected || account.isDefaultAccount == "Y" ? account.isSelected = true : account.isSelected = false;
          return account;
        })
        return vpaAddress;
      });
    }
    this.DataService.selectedVpaDetailsCollect = this.getSelectedVpaAccountDetails();


    // this.showDetails = true;

    if (this.DataService.upiCollectRequest.remarks) {
      this.collectAmountForm.get('remarks').setValue(this.DataService.upiCollectRequest.remarks);
    }
    if (this.DataService.upiCollectRequest.amount) {
      // let amount = this.customCurrencyPipe.transform(this.DataService.upiCollectRequest.amount, 'decimal').replace(/[^.0-9]+/g,'');
      this.collectAmountForm.get('amount').setValue(this.DataService.upiCollectRequest.amount);
    }

    if (this.DataService.fromRecentTransaction && this.DataService.upiTransactionSelected) {
      this.collectAmountForm.get('amount').setValue(this.DataService.upiTransactionSelected.AMOUNT);
    }
    
    this.mbebaFlag = this.DataService.selectedVpaDetailsCollect.accountDetails.mbeba;
    
  }

  buildForm() {
    this.collectAmountForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl('', Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)),
    });

  };


  /**
   * set update currency value
   * @param value 
   */
   formatCurrency(value) {
   this.formValidation.formatDynamicCurrency('amt',this.collectAmountForm);
  }

  /**
   * collect amount
   */
  collectAmount($event) {
    $event.target[1].blur();
    this.formValidation.markFormGroupTouched(this.collectAmountForm);
    if (this.collectAmountForm.valid) {
      let amt = this.collectAmountForm.get('amount').value.trim().replace(/[^.0-9]+/g,'');
      if(Number(amt) > 2000){
        this.ngZone.run(()=>{
          this.DataService.information = this.translate.transform('AMOUNT_LIMIT_EXCEEDED_UPI');
          this.DataService.informationLabel = this.translate.transform('INFORMATION');
          this.DataService.primaryBtnText = this.translate.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        })
        return;
      }
      var currentDate = moment().format('YYYY-MM-DD');
      // var currentTime = moment.duration(moment().format('hh:mm'),"minutes");
      var currentTime = moment(new Date(),"DD/MM/YYYY HH:mm:ss");
      var expiryTime = moment(this.DataService.upiCollectRequest.time,"DD/MM/YYYY HH:mm:ss")
      // var expiryTime = moment.duration(moment(this.DataService.upiCollectRequest.time).format('hh:mm'),"minutes");
      var expiryDate = moment(this.DataService.upiCollectRequest.date).format('YYYY-MM-DD');
      var actualExpDateDiffInMins = moment(expiryDate).diff(currentDate,'minutes');
      var expirationMin = actualExpDateDiffInMins + actualTimeDiffInMins;
      var ms = expiryTime.diff(currentTime);
      var d = moment.duration(ms);
      // var expiryTime = moment.duration(time, "minutes");
      var actualTimeDiffInMins =d.minutes();
      this.DataService.upiCollectRequest.expiryTime = expirationMin.toString();
      if (expirationMin < 1) {
        this.ngZone.run(()=>{
          this.DataService.information = this.translate.transform('EXPIRY_TIME_ERROR');
          this.DataService.informationLabel = this.translate.transform('INFORMATION');
          this.DataService.primaryBtnText = this.translate.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        })
        return;
      }
      if (expirationMin > 64800) {
        this.ngZone.run(()=>{
          this.DataService.information = this.translate.transform('EXPIRY_MAX_VALUE_EXCEEDED_ERROR');
          this.DataService.informationLabel = this.translate.transform('INFORMATION');
          this.DataService.primaryBtnText = this.translate.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        })
        return;
      }
      let selectedVpa = this.getSelectedVpaAccountDetails();
      this.pluginService.getTransactionId().subscribe((transactionID) => {
        var reqParams = this.collectAmtService.setCollectRequest(this.collectAmountForm.value, this.DataService.upiCollectRequest, selectedVpa, transactionID,false);
        this.UpiApiCall(reqParams);
      });
    }
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.upiCallTransactionHistoryApi = true;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_FUNDSTRANSFER:
            this.DataService.collectReceiptObj = response;
            let { remarks, amount } = this.collectAmountForm.value;
            this.DataService.collectReceiptObj.remarks = remarks;
            this.DataService.collectReceiptObj.amount = amount;
            this.DataService.collectReceiptObj.collectFrom = this.DataService.validateAddressResp.MASKNAME;
            this.DataService.collectReceiptObj.vpaAddress = this.DataService.validateAddressResp.validatedVpa;
            this.DataService.collectReceiptObj.selectedVpa = this.DataService.selectedVpaDetailsCollect;
            // this.DataService.collectReceiptObj.debitFrom = ;
            // this.router.navigate(['/collectSuccess']);
            this.DataService.routeWithNgZone("collectSuccess");
            break;

          default:
            break;
        }
      } else {
        // if (response.status == "01") {
        //   showToastMessage(response.msg, "error");
        // }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }


  routePage(url) {
    this.DataService.upiCollectRequest.amount = this.collectAmountForm.get('amount').value;
    this.DataService.upiCollectRequest.remarks = this.collectAmountForm.get('remarks').value;
    this.router.navigateByUrl(url);
  }

  /**
   * Get Selected Vpa Adress/Account Details
   */
  getSelectedVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.upiCollectVpaList.find((vpaAddress) => { return vpaAddress.isSelected == true });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getSelectedAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    }
  }

  /**
   * Get Selected Vpa AccountNo Details
   * @param array 
   */
  getSelectedAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isSelected == true });
    }
  }

  /**
     * Show Toast message with multilingual
     * @param msgKey 
     * @param toastColor 
     */
  showCommonToastMsgWithKey(msgKey, toastColor) {
    showToastMessage(this.translate.transform(msgKey), toastColor)
  }

}
