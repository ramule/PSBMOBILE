import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingBillerPaymentRoutingModule } from './existing-biller-payment-routing.module';
import { ExistingBillerPaymentComponent } from './existing-biller-payment.component';


@NgModule({
  declarations: [ExistingBillerPaymentComponent],
  imports: [
    CommonModule,
    ExistingBillerPaymentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ExistingBillerPaymentModule { }
