import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionListRoutingModule } from './transaction-list-routing.module';
import { TransactionListComponent } from './transaction-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModules } from 'src/app/pages/common-ui/common.module';


@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    TransactionListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class TransactionListModule { }
