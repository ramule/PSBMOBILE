import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintTransactionConfirmationRoutingModule } from './raise-complaint-transaction-confirmation-routing.module';
import { RaiseComplaintTransactionConfirmationComponent } from './raise-complaint-transaction-confirmation.component';


@NgModule({
  declarations: [RaiseComplaintTransactionConfirmationComponent],
  imports: [
    CommonModule,
    RaiseComplaintTransactionConfirmationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RaiseComplaintTransactionConfirmationModule { }
