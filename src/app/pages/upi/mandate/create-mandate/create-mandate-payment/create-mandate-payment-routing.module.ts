import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMandatePaymentComponent } from './create-mandate-payment.component';

const routes: Routes = [
  {path: '', component: CreateMandatePaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateMandatePaymentRoutingModule { }
