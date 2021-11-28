import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBillReminderConfirmationRoutingModule } from './edit-bill-reminder-confirmation-routing.module';
import { EditBillReminderConfirmationComponent } from './edit-bill-reminder-confirmation.component';


@NgModule({
  declarations: [EditBillReminderConfirmationComponent],
  imports: [
    CommonModule,
    EditBillReminderConfirmationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class EditBillReminderConfirmationModule { }
