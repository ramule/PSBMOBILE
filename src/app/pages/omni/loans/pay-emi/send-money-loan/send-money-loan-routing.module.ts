import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendMoneyLoanComponent } from './send-money-loan.component';

const routes: Routes = [
  {path : '', component : SendMoneyLoanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendMoneyLoanRoutingModule { }
