import { SharedModule } from './../../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingBillPaymentRoutingModule } from './existing-bill-payment-routing.module';
import { ExistingBillPaymentComponent } from './existing-bill-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExistingBillPaymentComponent],
  imports: [
    CommonModule,
    ExistingBillPaymentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ExistingBillPaymentModule { }
