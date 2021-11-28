import { ExistingBillerPaymentComponent } from './existing-biller-payment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '' , component : ExistingBillerPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExistingBillerPaymentRoutingModule { }
