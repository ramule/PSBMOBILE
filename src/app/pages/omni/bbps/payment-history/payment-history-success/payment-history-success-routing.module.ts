import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentHistorySuccessComponent } from './payment-history-success.component';

const routes: Routes = [
  { path : '', component : PaymentHistorySuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentHistorySuccessRoutingModule { }
