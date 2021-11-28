import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBillReminderConfirmationRoutingModule } from './add-bill-reminder-confirmation-routing.module';
import { AddBillReminderConfirmationComponent } from './add-bill-reminder-confirmation.component';


@NgModule({
  declarations: [AddBillReminderConfirmationComponent],
  imports: [
    CommonModule,
    AddBillReminderConfirmationRoutingModule
  ]
})
export class AddBillReminderConfirmationModule { }
