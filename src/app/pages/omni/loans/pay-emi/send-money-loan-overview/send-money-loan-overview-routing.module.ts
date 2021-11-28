import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendMoneyLoanOverviewComponent } from './send-money-loan-overview.component';

const routes: Routes = [
  {path : '', component : SendMoneyLoanOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendMoneyLoanOverviewRoutingModule { }
