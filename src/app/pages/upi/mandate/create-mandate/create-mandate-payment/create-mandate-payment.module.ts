import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMandatePaymentRoutingModule } from './create-mandate-payment-routing.module';
import { CreateMandatePaymentComponent } from './create-mandate-payment.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateMandatePaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CreateMandatePaymentRoutingModule
  ]
})
export class CreateMandatePaymentModule { }
