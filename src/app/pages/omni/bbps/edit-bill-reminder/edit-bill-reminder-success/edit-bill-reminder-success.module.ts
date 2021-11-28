import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBillReminderSuccessRoutingModule } from './edit-bill-reminder-success-routing.module';
import { EditBillReminderSuccessComponent } from './edit-bill-reminder-success.component';


@NgModule({
  declarations: [EditBillReminderSuccessComponent],
  imports: [
    CommonModule,
    EditBillReminderSuccessRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditBillReminderSuccessModule { }
