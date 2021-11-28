import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPaymentReminderConfirmationRoutingModule } from './set-payment-reminder-confirmation-routing.module';
import { SetPaymentReminderConfirmationComponent } from './set-payment-reminder-confirmation.component';


@NgModule({
  declarations: [SetPaymentReminderConfirmationComponent],
  imports: [
    CommonModule,
    SetPaymentReminderConfirmationRoutingModule
  ]
})
export class SetPaymentReminderConfirmationModule { }
