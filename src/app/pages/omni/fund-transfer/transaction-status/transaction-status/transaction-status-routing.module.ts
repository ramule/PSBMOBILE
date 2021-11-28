import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionStatusComponent } from './transaction-status.component';

const routes: Routes = [{
  path: '' , component : TransactionStatusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionStatusRoutingModule { }
