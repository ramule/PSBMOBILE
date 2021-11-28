import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PluginService } from 'src/app/services/plugin-service';
import { DataService } from '../../../../../services/data.service';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Mandate } from 'src/app/models/mandate-model';
import { FormatDatePipe } from 'src/app/pipes/date-formatter.pipe';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormValidationService } from 'src/app/services/form-validation.service';
declare var $: any;

@Component({
  selector: 'app-modify-mandate',
  templateUrl: './modify-mandate.component.html',
  styleUrls: ['./modify-mandate.component.scss']
})
export class ModifyMandateComponent implements OnInit {
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'MODIFY_MANDATE',
    'footertype':'none'
  } 
  minDate :any;
  maxDate: any;
  modifyMandateForm : FormGroup;
  mandateDetails: Mandate;
  constructor( private router:Router, public DataService: DataService, private location : Location, private pluginService : PluginService,private dateFormatter : FormatDatePipe, private customCurrencyPipe : CustomCurrencyPipe, private commonMethod : CommonMethods,private formValidation:FormValidationService) { }
  isAmountLimitExceeded = false;
  ngOnInit(): void {
    $('#amt').autoNumeric('init', {aSign: "₹ "});
    this.DataService.changeMessage(this.headerdata);
    this.mandateDetails =this.DataService.pendingMandateWithPayer;
    history.pushState({}, this.DataService.upiModifyMandateCommonURL, this.location.prepareExternalUrl(this.DataService.upiModifyMandateCommonURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
  }

  /**
   * Form Group
   */
  buildForm() {
    let amount = this.customCurrencyPipe.transform(this.mandateDetails.amount,  'decimal').replace(/[^.0-9]+/g,'');

    this.modifyMandateForm = new FormGroup({
      amount: new FormControl(amount, [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl({value:this.mandateDetails.remarks,disabled:true}, [Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
      startDate: new FormControl({value:this.dateFormatter.transform(this.mandateDetails.validityStart), disabled:true}, [Validators.required]),
      endDate: new FormControl(this.mandateDetails.validityEnd ? this.dateFormatter.transform(this.mandateDetails.validityEnd): '', [Validators.required]),
    });
    
    this.minDate = moment(this.dateFormatter.transform(this.mandateDetails.validityStart),'DD/MM/YYYY').toDate();
    this.maxDate = moment(this.dateFormatter.transform(this.mandateDetails.validityStart),'DD/MM/YYYY').add(90, 'days').toDate();
  }


  goToPage(routeName){
    let {amount,endDate} = this.modifyMandateForm.value;
    this.DataService.modifyMandateDetails.amount = amount.replace(/[^.0-9]+/g,'');
    this.DataService.modifyMandateDetails.validyEndDate = endDate;
    this.router.navigateByUrl('/'+routeName);
  } 


  /**
   * Open Native Date Picker
   */
  openDatePicker() {
    var date;
    if(this.mandateDetails.validityEnd){
      date =  moment(this.dateFormatter.transform(this.mandateDetails.validityEnd),'DD/MM/YYYY').toDate();
    }else{
      date = new Date()
    }
  
// month is 0-based, that's why we need dataParts[1] - 1

    this.pluginService.openDatePicker('date', date, this.minDate, this.maxDate).subscribe((date) => {
        this.modifyMandateForm.controls.endDate.setValue(moment(date).format('DD/MM/YYYY'));
      }
    );
  }

  

  /**
   * set update currency value
   * @param value 
   */
   formatCurrency(value) {
    let amt = $('#amt').val().replace(/[^.0-9]+/g,'');
    if(Number(amt) > 2000){
      this.isAmountLimitExceeded = true;
    }else{
      this.isAmountLimitExceeded = false;
    }
    this.formValidation.formatDynamicCurrency('amt',this.modifyMandateForm);
   }

  openPopup(popupName){
    this.commonMethod.openPopup('div.popup-bottom.' +popupName);
  }

  
  closePopup(popupName){
    this.commonMethod.closePopup('div.popup-bottom.' +popupName);
  }
}
