import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpsTransactionStatusRoutingModule } from './imps-transaction-status-routing.module';
import { ImpsTransactionStatusComponent } from './imps-transaction-status.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ImpsTransactionStatusComponent],
  imports: [
    CommonModule,
    ImpsTransactionStatusRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ImpsTransactionStatusModule { }
