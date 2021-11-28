import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillReminderDeleteSuccessRoutingModule } from './bill-reminder-delete-success-routing.module';
import { BillReminderDeleteSuccessComponent } from './bill-reminder-delete-success.component';


@NgModule({
  declarations: [BillReminderDeleteSuccessComponent],
  imports: [
    CommonModule,
    BillReminderDeleteSuccessRoutingModule
  ]
})
export class BillReminderDeleteSuccessModule { }
