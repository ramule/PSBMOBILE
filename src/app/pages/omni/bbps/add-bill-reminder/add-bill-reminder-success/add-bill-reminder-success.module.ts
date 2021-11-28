import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBillReminderSuccessRoutingModule } from './add-bill-reminder-success-routing.module';
import { AddBillReminderSuccessComponent } from './add-bill-reminder-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddBillReminderSuccessComponent],
  imports: [
    CommonModule,
    AddBillReminderSuccessRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddBillReminderSuccessModule { }
