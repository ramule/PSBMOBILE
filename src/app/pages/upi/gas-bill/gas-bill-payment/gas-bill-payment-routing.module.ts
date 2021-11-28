import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GasBillPaymentComponent } from './gas-bill-payment.component';

const routes: Routes = [
  {
    path: '', component: GasBillPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasBillPaymentRoutingModule { }
