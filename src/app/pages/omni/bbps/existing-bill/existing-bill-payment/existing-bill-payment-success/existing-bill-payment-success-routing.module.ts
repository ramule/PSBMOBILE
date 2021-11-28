import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExistingBillPaymentSuccessComponent } from './existing-bill-payment-success.component';

const routes: Routes = [
  { path: '' , component : ExistingBillPaymentSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingBillPaymentSuccessRoutingModule { }
