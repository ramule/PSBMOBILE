import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfTransferPaymentComponent } from './self-transfer-payment.component';

const routes: Routes = [
  {path: '', component: SelfTransferPaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfTransferPaymentRoutingModule { }
