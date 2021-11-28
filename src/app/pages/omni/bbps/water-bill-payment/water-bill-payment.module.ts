import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterBillPaymentRoutingModule } from './water-bill-payment-routing.module';
import { WaterBillPaymentComponent } from './water-bill-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WaterBillPaymentComponent
  ],
  imports: [
    CommonModule,
    WaterBillPaymentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class WaterBillPaymentModule { }
