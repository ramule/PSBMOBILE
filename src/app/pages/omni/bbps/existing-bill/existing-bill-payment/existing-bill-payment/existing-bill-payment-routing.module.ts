import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExistingBillPaymentComponent } from './existing-bill-payment.component';

const routes: Routes = [
  { path: '' , component : ExistingBillPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingBillPaymentRoutingModule { }
