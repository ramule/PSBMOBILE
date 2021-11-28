import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeElectricityBillPaymentComponent } from './home-electricity-bill-payment.component';

const routes: Routes = [
  {path:'' , component: HomeElectricityBillPaymentComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeElectricityBillPaymentRoutingModule { }
