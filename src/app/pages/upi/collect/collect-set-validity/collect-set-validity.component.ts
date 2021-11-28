import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { CollectSetValidityService } from '../collect-set-validity/collect-set-validity.service';
import * as moment from 'moment';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { PluginService } from 'src/app/services/plugin-service';
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-collect-set-validity',
  templateUrl: './collect-set-validity.component.html',
  styleUrls: ['./collect-set-validity.component.scss']
})
export class CollectSetValidityComponent implements OnInit {
  setValidityForm : FormGroup;
  minDate:any;
  maxDate:any;
  disableTime:boolean = false;
  currentDate = moment().toDate();
  currentTime = moment.duration(moment().format('hh:mm'),"minutes");
  information="";
  constructor(private router:Router, public DataService: DataService,private customCurrencyPipe : CustomCurrencyPipe,private formValidation : FormValidationService,private http : HttpRestApiService, private constant : AppConstants,private localStorage : LocalStorageService, private setValidityService : CollectSetValidityService,private commonMethod : CommonMethods,private translate : TranslatePipe,private pluginService:PluginService,private location: Location) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('COLLECT');
    history.pushState({}, 'collectAmount', this.location.prepareExternalUrl("collectAmount"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
    $('#amtValidity').autoNumeric('init', {aSign: "₹ "});
  }


  buildForm() {
    this.setValidityForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl('', Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)),
      date: new FormControl(this.DataService.upiCollectRequest.date, [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
      this.minDate = moment().toDate();
      this.maxDate = moment().add(45, 'days').toDate();     
      this.setValidityForm.controls.date.setValue(moment(this.DataService.upiCollectRequest.date).format('DD/MM/YYYY'));
      this.setValidityForm.controls.time.setValue(moment(this.DataService.upiCollectRequest.time).format('hh:mm A'));
      // this.disableTimeIfFutureDateSelected();
    if(this.DataService.upiCollectRequest.amount){
      // let amount = this.customCurrencyPipe.transform(this.DataService.upiCollectRequest.amount, 'decimal').replace(/[^.0-9]+/g,'');
      this.setValidityForm.get('amount').setValue(this.DataService.upiCollectRequest.amount);
    } 
    if(this.DataService.upiCollectRequest.remarks){
      this.setValidityForm.get('remarks').setValue(this.DataService.upiCollectRequest.remarks);
    } 
  };

  /**
   * set update currency value
   * @param value 
   */
  formatCurrency(value) {
    this.formValidation.formatDynamicCurrency('amtValidity',this.setValidityForm);
    let amount = this.setValidityForm.get('amount').value;
    this.DataService.upiCollectRequest.amount = amount;
  }
  // toggleCategoriesSelection(event){
  //   $('.popup-bottom').removeClass('popup-active')
   
  // }
  // focusOutFunction(){
  //   $('.popup-bottom').addClass('popup-active')
  // }
  /**
   * Set update Validity
   */
  updateSetValidity(){
    this.formValidation.markFormGroupTouched(this.setValidityForm);
    if(this.setValidityForm.valid){
      var currentDate = moment().format('YYYY-MM-DD');
      // var currentTime = moment.duration(moment().format('hh:mm'),"minutes");
      var currentTime = moment(new Date(),"DD/MM/YYYY HH:mm:ss");
      var expiryTime = moment(this.DataService.upiCollectRequest.time,"DD/MM/YYYY HH:mm:ss")
      // var expiryTime = moment.duration(moment(this.DataService.upiCollectRequest.time).format('hh:mm'),"minutes");
      var expiryDate = moment(this.DataService.upiCollectRequest.date).format('YYYY-MM-DD');
      var actualExpDateDiffInMins = moment(expiryDate).diff(currentDate,'minutes');
      var ms = expiryTime.diff(currentTime);
      var d = moment.duration(ms);
      // var expiryTime = moment.duration(time, "minutes");
      var actualTimeDiffInMins =d.minutes();
      var expirationMin = actualExpDateDiffInMins + actualTimeDiffInMins;
      this.DataService.upiCollectRequest.expiryTime = expirationMin.toString();
      // var now = moment(new Date(),"DD/MM/YYYY HH:mm:ss");
      // var then = moment(this.DataService.upiCollectRequest.time,"DD/MM/YYYY HH:mm:ss")
      // var ms = then.diff(now);
      // var d = moment.duration(ms);
      if(expirationMin < 1){
        // this.showCommonToastMsgWithKey('EXPIRY_TIME_ERROR','error');
        this.information = this.translate.transform("EXPIRY_TIME_ERROR");
        this.commonMethod.openPopup('div.popup-bottom.collect-setValidity');
        return;
      }

      if(expirationMin > 64800){
        // this.showCommonToastMsgWithKey('EXPIRY_MAX_VALUE_EXCEEDED_ERROR','error');
        this.information = this.translate.transform("EXPIRY_MAX_VALUE_EXCEEDED_ERROR");
        this.commonMethod.openPopup('div.popup-bottom.collect-setValidity');
        return;
      }
      let{ remarks, amount}= this.setValidityForm.value;
      this.DataService.upiCollectRequest.remarks = remarks;
      this.DataService.upiCollectRequest.amount = amount;
      this.router.navigateByUrl('/collectAmount');

    //   var reqParams = this.setValidityService.getSetValidityUpdateReq();
    // //TODO : add endpoint if given by backend team
    // this.http.callBankingAPIService(reqParams, this.localStorage.getLocalStorage(this.constant.key_deviceId), '').subscribe(data => {
    //   console.log(data);
    //   var resp = data.responseParameter;
    //   if (resp.opstatus == "00") {
    //   };
    // });
    }
  }

  // onDateChange(event){
  //   // alert(event.target.valueAsDate)
  //   // alert(new Date(event.target.valueAsDate).toUTCString())
  //   this.setValidityForm.controls.date.setValue(moment(new Date(event.target.valueAsDate)).format('YYYY-MM-DD'));
  //   this.DataService.upiCollectRequest.date = new Date(event.target.valueAsDate);
  //   this.disableTimeIfFutureDateSelected();
  //   // alert(JSON.stringify(e))
  // }

  // onTimeChange(event){
  //   // alert(event.target.valueAsDate)
  //   this.setValidityForm.controls.time.setValue(moment(new Date(event.target.valueAsNumber)).format('HH:mm'));
  //   this.DataService.upiCollectRequest.time = new Date(event.target.valueAsNumber);
  // }

  disableTimeIfFutureDateSelected(){
    if(this.commonMethod.isToday(this.DataService.upiCollectRequest.date)){
      this.setValidityForm.get('time').enable();
    }else{
      this.setValidityForm.get('time').disable();
    }
  }

  /**
   * Open Native Date Picker
   */
  openDatePicker(){
    this.pluginService.openDatePicker('date',this.DataService.upiCollectRequest.date,this.minDate,this.maxDate).subscribe((date)=>{
      this.DataService.upiCollectRequest.date = date;
      this.setValidityForm.controls.date.setValue(moment(this.DataService.upiCollectRequest.date).format('DD/MM/YYYY'));
      // this.disableTimeIfFutureDateSelected();
    });
  }

 /**
   * Open Native Time Picker
   */
  openTimePicker(){
    if(!this.setValidityForm.get('time').disabled){
      this.pluginService.openDatePicker('time',this.currentDate).subscribe((date)=>{
        this.DataService.upiCollectRequest.time = date;
        this.setValidityForm.controls.time.setValue(moment(this.DataService.upiCollectRequest.time).format('hh:mm A'));
      })
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

  OnChange(value){
    this.DataService.upiCollectRequest.remarks = value;
  }

  closePopup(popupName) {
    this.commonMethod.closePopup(popupName);
  }
}
