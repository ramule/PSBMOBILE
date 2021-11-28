import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Component({
  selector: 'app-edit-bill-reminder',
  templateUrl: './edit-bill-reminder.component.html',
  styleUrls: ['./edit-bill-reminder.component.scss']
})
export class EditBillReminderComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods) { }

  editBillReminderForm: FormGroup

  ngOnInit(): void {
    this.buildForm();
    this.DataService.setPageSettings('EDIT_BILL_REMINDER');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('EDIT_BILL_REMINDER', this.router.url)
  }

  buildForm() {
    this.editBillReminderForm = new FormGroup({
      nickName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),
      reminderDate: new FormControl('', [Validators.required]),
    })
  }

  validateForm() {
    if (this.editBillReminderForm.invalid) {
      this.editBillReminderForm.get('nickName').markAsTouched();
      this.editBillReminderForm.get('reminderDate').markAsTouched();
    }
  }

  editBillReminderSubmit(routeName){
    if(this.editBillReminderForm.valid){
      this.goToPage(routeName) ;
    } else{
      this.validateForm() ;
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

}
