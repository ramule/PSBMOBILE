import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanQrPaymentRoutingModule } from './scan-qr-payment-routing.module';
import { ScanQrPaymentComponent } from './scan-qr-payment.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ScanQrPaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ScanQrPaymentRoutingModule
  ]
})
export class ScanQrPaymentModule { }
