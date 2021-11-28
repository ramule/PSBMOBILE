import { PayUpiPaymentComponent } from './pay-upi-payment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: PayUpiPaymentComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayUpiPaymentRoutingModule { }
