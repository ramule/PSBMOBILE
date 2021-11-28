import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectricityBillPaymentSuccessComponent } from './electricity-bill-payment-success.component';

const routes: Routes = [
  {path:'' , component: ElectricityBillPaymentSuccessComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectricityBillPaymentSuccessRoutingModule { }
