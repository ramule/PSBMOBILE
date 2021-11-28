import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectTaxPaymentHistoryComponent } from './direct-tax-payment-history.component';

const routes: Routes = [
  {path:'' , component: DirectTaxPaymentHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectTaxPaymentHistoryRoutingModule { }
