import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

import { BillPaymentRoutingModule } from './bill-payment-routing.module';
import { BillPaymentComponent } from './bill-payment.component';


@NgModule({
  declarations: [
    BillPaymentComponent
  ],
  imports: [
    CommonModule,
    BillPaymentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BillPaymentModule { }
