import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendMoneyLoanOverviewRoutingModule } from './send-money-loan-overview-routing.module';
import { SendMoneyLoanOverviewComponent } from './send-money-loan-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SendMoneyLoanOverviewComponent],
  imports: [
    CommonModule,
    SendMoneyLoanOverviewRoutingModule,
    SharedModule,
  ]
})
export class SendMoneyLoanOverviewModule { }
