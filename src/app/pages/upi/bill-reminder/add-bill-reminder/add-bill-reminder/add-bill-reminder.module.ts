import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBillReminderRoutingModule } from './add-bill-reminder-routing.module';
import { AddBillReminderComponent } from './add-bill-reminder.component';


@NgModule({
  declarations: [AddBillReminderComponent],
  imports: [
    CommonModule,
    AddBillReminderRoutingModule
  ]
})
export class AddBillReminderModule { }
