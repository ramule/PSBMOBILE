import { PendingBillPayNowComponent } from './pending-bill-pay-now.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : PendingBillPayNowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingBillPayNowRoutingModule { }
