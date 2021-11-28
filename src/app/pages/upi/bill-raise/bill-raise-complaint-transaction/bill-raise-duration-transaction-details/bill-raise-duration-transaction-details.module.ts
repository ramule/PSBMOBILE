import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRaiseDurationTransactionDetailsRoutingModule } from './bill-raise-duration-transaction-details-routing.module';
import { BillRaiseDurationTransactionDetailsComponent } from './bill-raise-duration-transaction-details.component';


@NgModule({
  declarations: [BillRaiseDurationTransactionDetailsComponent],
  imports: [
    CommonModule,
    BillRaiseDurationTransactionDetailsRoutingModule
  ]
})
export class BillRaiseDurationTransactionDetailsModule { }
