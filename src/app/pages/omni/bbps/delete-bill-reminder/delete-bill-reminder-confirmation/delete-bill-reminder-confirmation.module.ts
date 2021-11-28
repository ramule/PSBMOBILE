import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteBillReminderConfirmationRoutingModule } from './delete-bill-reminder-confirmation-routing.module';
import { DeleteBillReminderConfirmationComponent } from './delete-bill-reminder-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DeleteBillReminderConfirmationComponent],
  imports: [
    CommonModule,
    DeleteBillReminderConfirmationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DeleteBillReminderConfirmationModule { }
