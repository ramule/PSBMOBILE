import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { PluginService } from '../../../../../services/plugin-service';
import { AppConstants } from 'src/app/app.constant';


import * as moment from 'moment';
// declare var activeGlobalUpi : any ;

@Component({
  selector: 'app-activate-upi-global',
  templateUrl: './activate-upi-global.component.html',
  styleUrls: ['./activate-upi-global.component.scss']
})

export class ActivateUpiGlobalComponent implements OnInit {
  globalUpiForm: FormGroup;
  globalUpiAccountData: any;
  isToggleOn: boolean = false;
  disableAllFields: boolean = false;
  isGlobalUpiActive: boolean = false;
  currentDate = moment().toDate();
  maxDate = moment().add(90, 'days').toDate();

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName':'Activate UPI Global',
    'footertype':'none'
  } 

  constructor(private router:Router, 
    private dataService: DataService,
    private pluginService: PluginService,
    private constants: AppConstants) { }

  ngOnInit(): void {
    this.dataService.changeMessage(this.headerdata);
    // activeGlobalUpi();
    this.globalUpiAccountData = this.dataService.globalUpiAccountData;
    console.log("globalUpiAccountData:", this.globalUpiAccountData);
    if (this.globalUpiAccountData.isUpiGlobalActive == 'Y') {
      //deactivate or update
      this.headerdata.titleName = "Update UPI Global Settings";
      this.isGlobalUpiActive = true;
    } else {
      //activate
      this.headerdata.titleName = "Activate UPI Global";
      this.isGlobalUpiActive = false;
    }

    this.isToggleOn = true;
    this.buildForm();
  }

  buildForm() {
    this.globalUpiForm = new FormGroup({
      statusToggle : new FormControl(true, [Validators.required]),
      startDate : new FormControl(moment(this.currentDate).format('DD/MM/YYYY'), [Validators.required]),
      endDate : new FormControl(moment(this.maxDate).format('DD/MM/YYYY'), [Validators.required]),
      perTransactionLimit : new FormControl("", [Validators.required, Validators.pattern(/(^[0-9]*$)/)]),
      perDayLimit : new FormControl("", [Validators.required, Validators.pattern(/(^[0-9]*$)/)]),
      activateCheck : new FormControl("", [Validators.required])
    });

    console.log("startDate.value = ", this.globalUpiForm.controls.startDate.value)
  }

  onToggle() {
    this.isToggleOn = !this.isToggleOn;
    if(!this.isToggleOn) {
      this.disableAllFields = true;
      this.globalUpiForm.controls.endDate.disable();
      this.globalUpiForm.controls.perTransactionLimit.disable();
      this.globalUpiForm.controls.perDayLimit.disable();
      this.globalUpiForm.controls.activateCheck.disable();
    } else {
      this.disableAllFields = false;
      this.globalUpiForm.controls.endDate.enable();
      this.globalUpiForm.controls.perTransactionLimit.enable();
      this.globalUpiForm.controls.perDayLimit.enable();
      this.globalUpiForm.controls.activateCheck.enable();
    }

    this.globalUpiForm.controls.statusToggle.setValue(this.isToggleOn);
    console.log('this.isToggleOn => ', this.isToggleOn);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

  openDatePicker() {
    this.pluginService.openDatePicker('date', this.currentDate, this.currentDate, this.maxDate).subscribe((date)=>{
      this.globalUpiForm.controls.endDate.setValue(moment(date).format('DD/MM/YYYY'));
    });
  }

  confirmAction() {
    console.log("Confirming Global UPI Form Data...");
    this.dataService.globalUpiFormData.bankName = this.globalUpiAccountData.bankName;
    this.dataService.globalUpiFormData.maskedAccountNumber = this.globalUpiAccountData.maskedAccountNumber;
    this.dataService.globalUpiFormData.upiGlobalStatus = this.isToggleOn ? "Activate" : "De-activate";
    this.dataService.globalUpiFormData.startDate = this.globalUpiForm.value.startDate;
    this.dataService.globalUpiFormData.endDate = this.globalUpiForm.value.endDate;
    this.dataService.globalUpiFormData.perTransactionLimit = this.globalUpiForm.value.perTransactionLimit;
    this.dataService.globalUpiFormData.perDayLimit = this.globalUpiForm.value.perDayLimit;
    this.dataService.globalUpiFormData.accType = this.globalUpiAccountData.accType;
    this.dataService.routeWithNgZone('activateUpiGlobalConfirmation');
  }

  disableGlobalUpi() {
    console.log("Disable Global UPI...");
  }

}
