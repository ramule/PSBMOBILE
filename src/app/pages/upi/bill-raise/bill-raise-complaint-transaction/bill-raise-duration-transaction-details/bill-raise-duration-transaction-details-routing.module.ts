import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillRaiseDurationTransactionDetailsComponent } from './bill-raise-duration-transaction-details.component';

const routes: Routes = [
  {path:'' , component: BillRaiseDurationTransactionDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRaiseDurationTransactionDetailsRoutingModule { }
