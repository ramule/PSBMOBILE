import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPaymentReminderDetailsRoutingModule } from './set-payment-reminder-details-routing.module';
import { SetPaymentReminderDetailsComponent } from './set-payment-reminder-details.component';


@NgModule({
  declarations: [SetPaymentReminderDetailsComponent],
  imports: [
    CommonModule,
    SetPaymentReminderDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SetPaymentReminderDetailsModule { }
