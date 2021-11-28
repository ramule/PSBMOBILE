import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentHistoryComponent } from './payment-history.component';

const routes: Routes = [
  { path : '', component : PaymentHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentHistoryRoutingModule { }
