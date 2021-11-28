import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteBillReminderSuccessRoutingModule } from './delete-bill-reminder-success-routing.module';
import { DeleteBillReminderSuccessComponent } from './delete-bill-reminder-success.component';


@NgModule({
  declarations: [DeleteBillReminderSuccessComponent],
  imports: [
    CommonModule,
    DeleteBillReminderSuccessRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DeleteBillReminderSuccessModule { }
