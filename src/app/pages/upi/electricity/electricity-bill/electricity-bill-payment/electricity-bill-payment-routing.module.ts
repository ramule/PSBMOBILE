import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectricityBillPaymentComponent } from './electricity-bill-payment.component';

const routes: Routes = [
  {path:'' , component: ElectricityBillPaymentComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectricityBillPaymentRoutingModule { }
