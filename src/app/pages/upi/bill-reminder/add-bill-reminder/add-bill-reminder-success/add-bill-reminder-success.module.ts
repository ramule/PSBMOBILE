import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBillReminderSuccessRoutingModule } from './add-bill-reminder-success-routing.module';
import { AddBillReminderSuccessComponent } from './add-bill-reminder-success.component';


@NgModule({
  declarations: [AddBillReminderSuccessComponent],
  imports: [
    CommonModule,
    AddBillReminderSuccessRoutingModule
  ]
})
export class AddBillReminderSuccessModule { }
