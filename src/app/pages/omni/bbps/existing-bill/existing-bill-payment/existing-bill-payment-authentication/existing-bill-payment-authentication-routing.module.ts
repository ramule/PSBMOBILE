import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExistingBillPaymentAuthenticationComponent } from './existing-bill-payment-authentication.component';

const routes: Routes = [
  { path: '' , component : ExistingBillPaymentAuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingBillPaymentAuthenticationRoutingModule { }
