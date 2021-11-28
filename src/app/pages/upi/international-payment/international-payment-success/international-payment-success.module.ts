import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternationalPaymentSuccessRoutingModule } from './international-payment-success-routing.module';
import { InternationalPaymentSuccessComponent } from './international-payment-success.component';


@NgModule({
  declarations: [InternationalPaymentSuccessComponent],
  imports: [
    CommonModule,
    InternationalPaymentSuccessRoutingModule
  ]
})
export class InternationalPaymentSuccessModule { }
