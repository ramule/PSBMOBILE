import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentReminderRoutingModule } from './payment-reminder-routing.module';
import { PaymentReminderComponent } from './payment-reminder.component';


@NgModule({
  declarations: [PaymentReminderComponent],
  imports: [
    CommonModule,
    PaymentReminderRoutingModule
  ]
})
export class PaymentReminderModule { }
