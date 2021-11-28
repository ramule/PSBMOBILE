import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfTransferPaymentRoutingModule } from './self-transfer-payment-routing.module';
import { SelfTransferPaymentComponent } from './self-transfer-payment.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SelfTransferPaymentComponent],
  imports: [
    CommonModule,
    SelfTransferPaymentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SelfTransferPaymentModule { }
