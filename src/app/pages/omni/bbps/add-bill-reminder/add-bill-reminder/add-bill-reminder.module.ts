import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBillReminderRoutingModule } from './add-bill-reminder-routing.module';
import { AddBillReminderComponent } from './add-bill-reminder.component';


@NgModule({
  declarations: [AddBillReminderComponent],
  imports: [
    CommonModule,
    AddBillReminderRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class AddBillReminderModule { }
