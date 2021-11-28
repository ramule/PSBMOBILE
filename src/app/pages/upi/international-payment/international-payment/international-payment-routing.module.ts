import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternationalPaymentComponent } from './international-payment.component';

const routes: Routes = [{
    path: '', component: InternationalPaymentComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternationalPaymentRoutingModule { }
