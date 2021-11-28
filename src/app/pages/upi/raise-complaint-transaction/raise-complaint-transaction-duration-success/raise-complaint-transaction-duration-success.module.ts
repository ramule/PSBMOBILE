import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintTransactionDurationSuccessRoutingModule } from './raise-complaint-transaction-duration-success-routing.module';
import { RaiseComplaintTransactionDurationSuccessComponent } from './raise-complaint-transaction-duration-success.component';


@NgModule({
  declarations: [RaiseComplaintTransactionDurationSuccessComponent],
  imports: [
    CommonModule,
    RaiseComplaintTransactionDurationSuccessRoutingModule
  ]
})
export class RaiseComplaintTransactionDurationSuccessModule { }
