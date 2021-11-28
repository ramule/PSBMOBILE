import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaiseComplaintTransactionSuccessRoutingModule } from './raise-complaint-transaction-success-routing.module';
import { RaiseComplaintTransactionSuccessComponent } from './raise-complaint-transaction-success.component';


@NgModule({
  declarations: [RaiseComplaintTransactionSuccessComponent],
  imports: [
    CommonModule,
    RaiseComplaintTransactionSuccessRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RaiseComplaintTransactionSuccessModule { }
