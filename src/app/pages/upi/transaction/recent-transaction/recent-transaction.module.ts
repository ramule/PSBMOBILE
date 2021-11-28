import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentTransactionRoutingModule } from './recent-transaction-routing.module';
import { RecentTransactionComponent } from './recent-transaction.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RecentTransactionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RecentTransactionRoutingModule
  ]
})
export class RecentTransactionModule { }
