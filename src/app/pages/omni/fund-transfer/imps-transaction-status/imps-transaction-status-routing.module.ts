import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsTransactionStatusComponent } from './imps-transaction-status.component';

const routes: Routes = [
  {path: '', component : ImpsTransactionStatusComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTransactionStatusRoutingModule { }
