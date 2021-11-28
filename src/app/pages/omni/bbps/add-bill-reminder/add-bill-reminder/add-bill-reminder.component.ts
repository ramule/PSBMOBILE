import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-add-bill-reminder',
  templateUrl: './add-bill-reminder.component.html',
  styleUrls: ['./add-bill-reminder.component.scss']
})
export class AddBillReminderComponent implements OnInit {

  constructor( private router:Router, public DataService: DataService) { }

  addBillReminderForm : FormGroup

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setPageSettings('ADD_BILL_REMINDER');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('ADD_BILL_REMINDER' , this.router.url)
  }

  buildForm(){
    this.addBillReminderForm = new FormGroup({
      billerCategory: new FormControl('', [Validators.required]),
      billerName: new FormControl('', [Validators.required]),
      consumerName: new FormControl('', [Validators.required]),
      billerMonth: new FormControl('', [Validators.required]),
      nickName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),
      terms : new FormControl('', [Validators.required])
    });
  }

  validateForm(){
    if(this.addBillReminderForm.invalid){
      this.addBillReminderForm.get('billerCategory').markAsTouched();
      this.addBillReminderForm.get('billerName').markAsTouched();
      this.addBillReminderForm.get('consumerName').markAsTouched();
      this.addBillReminderForm.get('billerMonth').markAsTouched();
      this.addBillReminderForm.get('nickName').markAsTouched();
      this.addBillReminderForm.get('terms').markAsTouched();
      return;
     }
  }

  addBillReminderSubmit(){
    if(this.addBillReminderForm.valid){
      this.goToPage('retailAddBillReminderConfirmation') ;
    }
    else{
      this.validateForm() ;
    }
  }
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

}
