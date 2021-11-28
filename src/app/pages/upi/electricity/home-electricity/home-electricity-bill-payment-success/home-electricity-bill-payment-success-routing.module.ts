import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeElectricityBillPaymentSuccessComponent } from './home-electricity-bill-payment-success.component';

const routes: Routes = [
  {path:'' , component: HomeElectricityBillPaymentSuccessComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeElectricityBillPaymentSuccessRoutingModule { }
