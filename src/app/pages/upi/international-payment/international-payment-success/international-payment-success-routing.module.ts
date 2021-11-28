import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternationalPaymentSuccessComponent } from './international-payment-success.component';

const routes: Routes = [{
  path: '', component: InternationalPaymentSuccessComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternationalPaymentSuccessRoutingModule { }
