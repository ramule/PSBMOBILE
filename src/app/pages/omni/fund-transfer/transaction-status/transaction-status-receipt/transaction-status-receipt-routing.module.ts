import { TransactionStatusReceiptComponent } from './transaction-status-receipt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : TransactionStatusReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionStatusReceiptRoutingModule { }
