import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionStatusRoutingModule } from './transaction-status-routing.module';
import { TransactionStatusComponent } from './transaction-status.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [TransactionStatusComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    TransactionStatusRoutingModule,
    NgxPaginationModule,
    DataTablesModule,
  ]
})
export class TransactionStatusModule { }
