import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestMandatePaymentComponent } from './request-mandate-payment.component';

const routes: Routes = [
  {path: '', component: RequestMandatePaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMandatePaymentRoutingModule { }
