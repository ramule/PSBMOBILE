import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasBillPaymentRoutingModule } from './gas-bill-payment-routing.module';
import { GasBillPaymentComponent } from './gas-bill-payment.component';


@NgModule({
  declarations: [GasBillPaymentComponent],
  imports: [
    CommonModule,
    GasBillPaymentRoutingModule
  ]
})
export class GasBillPaymentModule { }
