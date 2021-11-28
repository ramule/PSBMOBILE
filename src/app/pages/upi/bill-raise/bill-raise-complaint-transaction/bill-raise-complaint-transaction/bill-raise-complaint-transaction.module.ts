import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRaiseComplaintTransactionRoutingModule } from './bill-raise-complaint-transaction-routing.module';
import { BillRaiseComplaintTransactionComponent } from './bill-raise-complaint-transaction.component';


@NgModule({
  declarations: [BillRaiseComplaintTransactionComponent],
  imports: [
    CommonModule,
    BillRaiseComplaintTransactionRoutingModule
  ]
})
export class BillRaiseComplaintTransactionModule { }
