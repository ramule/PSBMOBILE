import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
import { PaymentHistoryComponent } from './payment-history.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';


@NgModule({
  declarations: [PaymentHistoryComponent],
  imports: [
    CommonModule,
    PaymentHistoryRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PaymentHistoryModule { }
