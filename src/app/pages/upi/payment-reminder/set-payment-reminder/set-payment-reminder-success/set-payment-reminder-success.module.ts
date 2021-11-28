import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPaymentReminderSuccessRoutingModule } from './set-payment-reminder-success-routing.module';
import { SetPaymentReminderSuccessComponent } from './set-payment-reminder-success.component';


@NgModule({
  declarations: [SetPaymentReminderSuccessComponent],
  imports: [
    CommonModule,
    SetPaymentReminderSuccessRoutingModule
  ]
})
export class SetPaymentReminderSuccessModule { }
