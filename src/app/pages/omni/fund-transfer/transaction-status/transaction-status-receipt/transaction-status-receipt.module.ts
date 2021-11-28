import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionStatusReceiptRoutingModule } from './transaction-status-receipt-routing.module';
import { TransactionStatusReceiptComponent } from './transaction-status-receipt.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TransactionStatusReceiptComponent],
  imports: [
    CommonModule,
    TransactionStatusReceiptRoutingModule,
    SharedModule
  ]
})
export class TransactionStatusReceiptModule { }
