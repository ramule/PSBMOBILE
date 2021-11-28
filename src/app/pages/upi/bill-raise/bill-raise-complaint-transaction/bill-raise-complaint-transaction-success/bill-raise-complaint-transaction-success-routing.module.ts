import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillRaiseComplaintTransactionSuccessComponent } from './bill-raise-complaint-transaction-success.component';

const routes: Routes = [
  {path:'' , component: BillRaiseComplaintTransactionSuccessComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRaiseComplaintTransactionSuccessRoutingModule { }
