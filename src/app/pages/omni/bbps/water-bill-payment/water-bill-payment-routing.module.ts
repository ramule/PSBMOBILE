import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterBillPaymentComponent } from './water-bill-payment.component';

const routes: Routes = [
  { path : '', component : WaterBillPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterBillPaymentRoutingModule { }
