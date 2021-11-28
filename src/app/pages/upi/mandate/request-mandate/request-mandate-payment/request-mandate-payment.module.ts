import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestMandatePaymentRoutingModule } from './request-mandate-payment-routing.module';
import { RequestMandatePaymentComponent } from './request-mandate-payment.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RequestMandatePaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RequestMandatePaymentRoutingModule
  ]
})
export class RequestMandatePaymentModule { }
