import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternationalPaymentRoutingModule } from './international-payment-routing.module';
import { InternationalPaymentComponent } from './international-payment.component';


@NgModule({
  declarations: [InternationalPaymentComponent],
  imports: [
    CommonModule,
    InternationalPaymentRoutingModule
  ]
})
export class InternationalPaymentModule { }
