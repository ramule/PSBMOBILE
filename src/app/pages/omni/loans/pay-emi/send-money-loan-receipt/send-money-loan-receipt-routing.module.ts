import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendMoneyLoanReceiptComponent } from './send-money-loan-receipt.component';

const routes: Routes = [
  {path : '', component : SendMoneyLoanReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendMoneyLoanReceiptRoutingModule { }
