import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GasBillPaymentSuccessComponent } from './gas-bill-payment-success.component';

const routes: Routes = [
  {
    path: '', component: GasBillPaymentSuccessComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasBillPaymentSuccessRoutingModule { }
