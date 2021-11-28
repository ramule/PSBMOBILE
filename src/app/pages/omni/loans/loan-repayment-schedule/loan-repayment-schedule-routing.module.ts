import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanRepaymentScheduleComponent } from './loan-repayment-schedule.component';

const routes: Routes = [
  {path : '', component : LoanRepaymentScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRepaymentScheduleRoutingModule { }
