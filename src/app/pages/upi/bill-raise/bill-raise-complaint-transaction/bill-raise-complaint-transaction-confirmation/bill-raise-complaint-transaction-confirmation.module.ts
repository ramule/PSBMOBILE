import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRaiseComplaintTransactionConfirmationRoutingModule } from './bill-raise-complaint-transaction-confirmation-routing.module';
import { BillRaiseComplaintTransactionConfirmationComponent } from './bill-raise-complaint-transaction-confirmation.component';


@NgModule({
  declarations: [BillRaiseComplaintTransactionConfirmationComponent],
  imports: [
    CommonModule,
    BillRaiseComplaintTransactionConfirmationRoutingModule
  ]
})
export class BillRaiseComplaintTransactionConfirmationModule { }
