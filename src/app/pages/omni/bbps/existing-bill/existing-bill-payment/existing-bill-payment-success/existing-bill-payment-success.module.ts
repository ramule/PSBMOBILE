import { SharedModule } from './../../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingBillPaymentSuccessRoutingModule } from './existing-bill-payment-success-routing.module';
import { ExistingBillPaymentSuccessComponent } from './existing-bill-payment-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExistingBillPaymentSuccessComponent],
  imports: [
    CommonModule,
    ExistingBillPaymentSuccessRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class ExistingBillPaymentSuccessModule { }
