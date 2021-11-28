import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillRaiseComplaintTransactionConfirmationComponent } from './bill-raise-complaint-transaction-confirmation.component';

const routes: Routes = [
  {path:'' , component: BillRaiseComplaintTransactionConfirmationComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRaiseComplaintTransactionConfirmationRoutingModule { }
