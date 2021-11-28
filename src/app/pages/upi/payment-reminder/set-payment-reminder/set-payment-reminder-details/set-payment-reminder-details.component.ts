import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-payment-reminder-details',
  templateUrl: './set-payment-reminder-details.component.html',
  styleUrls: ['./set-payment-reminder-details.component.scss']
})
export class SetPaymentReminderDetailsComponent implements OnInit {

  constructor(
    public DataService: DataService,
    private router : Router
  ) { }

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Set Payment Reminder',
    'footertype': 'none'
  }
  activePaymentCard : any ;
  setPaymentReminderDetailsForm : FormGroup
  
  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.activePaymentCard = this.DataService.paymentReminderType ;
    this.buildForm();
  }

  buildForm(){
    this.setPaymentReminderDetailsForm = new FormGroup({
      amount : new FormControl('', [Validators.required]),
      startDate : new FormControl('', [Validators.required]),
      endDate : new FormControl('', [Validators.required]),
      setFrequency: new FormControl('', [Validators.required]),
      remark : new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),

    })
  }

  validateForm(){
    if(this.setPaymentReminderDetailsForm.invalid){
      this.setPaymentReminderDetailsForm.get('amount').markAsTouched();
      this.setPaymentReminderDetailsForm.get('startDate').markAsTouched();
      this.setPaymentReminderDetailsForm.get('endDate').markAsTouched();
      this.setPaymentReminderDetailsForm.get('setFrequency').markAsTouched();
      this.setPaymentReminderDetailsForm.get('remark').markAsTouched();
      return;
    }

  }
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  setPaymentReminderDetailSubmit(value){
    if(this.setPaymentReminderDetailsForm.valid){
      this.goToPage(value)
    }
    else{
      this.validateForm() ;
    }

  }

}
