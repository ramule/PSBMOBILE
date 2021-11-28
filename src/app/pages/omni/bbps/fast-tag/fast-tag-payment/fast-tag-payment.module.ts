import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FastTagPaymentRoutingModule } from './fast-tag-payment-routing.module';
import { FastTagPaymentComponent } from './fast-tag-payment.component';


@NgModule({
  declarations: [
    FastTagPaymentComponent
  ],
  imports: [
    CommonModule,
    FastTagPaymentRoutingModule
  ]
})
export class FastTagPaymentModule { }
