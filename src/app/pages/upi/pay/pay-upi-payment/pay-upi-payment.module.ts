import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayUpiPaymentRoutingModule } from './pay-upi-payment-routing.module';
import { PayUpiPaymentComponent } from './pay-upi-payment.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PayUpiPaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PayUpiPaymentRoutingModule
  ]
})
export class PayUpiPaymentModule { }
