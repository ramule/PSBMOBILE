import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';

@Component({
  selector: 'app-set-payment-reminder',
  templateUrl: './set-payment-reminder.component.html',
  styleUrls: ['./set-payment-reminder.component.scss']
})
export class SetPaymentReminderComponent implements OnInit {

  constructor(
    public DataService: DataService,
    private router : Router,
    private constant : AppConstants
  ) { }

  upidModel : true ;
  upidForm : FormGroup;
  accountIfscForm : FormGroup ;

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Set Payment Reminder',
    'footertype': 'none'
  }
  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.buildForm();
  }

  buildForm(){
    this.upidForm = new FormGroup({
      upId : new FormControl('', [Validators.required, Validators.pattern(this.constant.email_regex)]),
    })

    this.accountIfscForm = new FormGroup({
      accountNum : new FormControl('', [Validators.required]),
      ifsc : new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9]*$")]),
      payeeName : new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),

    })
  }

  validateForm(paymentType){
    switch(paymentType){
      case 'upid':
        if(this.upidForm.invalid){
          this.upidForm.get('upId').markAsTouched();
        }
        break ;

      case 'account':
        if(this.accountIfscForm.invalid){
          this.accountIfscForm.get('accountNum').markAsTouched();
          this.accountIfscForm.get('ifsc').markAsTouched();
          this.accountIfscForm.get('payeeName').markAsTouched();
        }
        break ;
    }
   
  }


  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  setPaymentReminderSubmit(paymentType){
    this.DataService.paymentReminderType = paymentType;

    switch(paymentType){
      case 'upid' : 
        if(this.upidForm.valid){
          console.log('upid :', this.upidModel);
          this.goToPage('setPaymentReminderDetails') ;
        }
        else{
          this.validateForm(paymentType);
        }
      break ;

      case 'account':
        if(this.accountIfscForm.valid){
          console.log('account :', this.accountIfscForm.value);
          this.goToPage('setPaymentReminderDetails') ;

        }
        else{
          this.validateForm(paymentType);
        }
        break;
    }
  }

}
