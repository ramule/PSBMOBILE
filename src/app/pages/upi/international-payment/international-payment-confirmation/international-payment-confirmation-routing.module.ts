import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternationalPaymentConfirmationComponent } from './international-payment-confirmation.component';

const routes: Routes = [{
  path: '', component: InternationalPaymentConfirmationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternationalPaymentConfirmationRoutingModule { }
