import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FastTagPaymentComponent } from './fast-tag-payment.component';

const routes: Routes = [
  { path : '', component: FastTagPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FastTagPaymentRoutingModule { }
