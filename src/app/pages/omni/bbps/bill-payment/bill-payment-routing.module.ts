import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillPaymentComponent } from './bill-payment.component';

const routes: Routes = [
  { path : '',  component : BillPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillPaymentRoutingModule { }
