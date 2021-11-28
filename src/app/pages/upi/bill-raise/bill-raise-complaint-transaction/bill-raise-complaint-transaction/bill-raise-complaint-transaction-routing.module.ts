import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillRaiseComplaintTransactionComponent } from './bill-raise-complaint-transaction.component';

const routes: Routes = [
  {path:'' , component: BillRaiseComplaintTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRaiseComplaintTransactionRoutingModule { }
