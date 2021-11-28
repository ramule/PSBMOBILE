import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendMoneyLoanAuthComponent } from './send-money-loan-auth.component';

const routes: Routes = [
  {path : '', component : SendMoneyLoanAuthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendMoneyLoanAuthRoutingModule { }
