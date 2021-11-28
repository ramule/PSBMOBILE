import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPaymentReminderRoutingModule } from './set-payment-reminder-routing.module';
import { SetPaymentReminderComponent } from './set-payment-reminder.component';


@NgModule({
  declarations: [SetPaymentReminderComponent],
  imports: [
    CommonModule,
    SetPaymentReminderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SetPaymentReminderModule { }
