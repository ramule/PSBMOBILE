import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingBillReminderRoutingModule } from './pending-bill-reminder-routing.module';
import { PendingBillReminderComponent } from './pending-bill-reminder.component';


@NgModule({
  declarations: [PendingBillReminderComponent],
  imports: [
    CommonModule,
    PendingBillReminderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PendingBillReminderModule { }
