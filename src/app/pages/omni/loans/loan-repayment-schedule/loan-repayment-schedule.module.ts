import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRepaymentScheduleRoutingModule } from './loan-repayment-schedule-routing.module';
import { LoanRepaymentScheduleComponent } from './loan-repayment-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LoanRepaymentScheduleComponent],
  imports: [
    CommonModule,
    LoanRepaymentScheduleRoutingModule,
    SharedModule
  ]
})
export class LoanRepaymentScheduleModule { }
