import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionDetailsRoutingModule } from './transaction-details-routing.module';
import { TransactionDetailsComponent } from './transaction-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModules } from 'src/app/pages/common-ui/common.module';


@NgModule({
  declarations: [TransactionDetailsComponent],
  imports: [
    CommonModule,
    TransactionDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class TransactionDetailsModule { }
