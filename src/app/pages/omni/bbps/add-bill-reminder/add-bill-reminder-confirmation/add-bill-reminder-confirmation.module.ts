import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBillReminderConfirmationRoutingModule } from './add-bill-reminder-confirmation-routing.module';
import { AddBillReminderConfirmationComponent } from './add-bill-reminder-confirmation.component';


@NgModule({
  declarations: [AddBillReminderConfirmationComponent],
  imports: [
    CommonModule,
    AddBillReminderConfirmationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddBillReminderConfirmationModule { }
