import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayUpiConfirmationComponent } from './pay-upi-confirmation.component';

const routes: Routes = [
  {path: '', component: PayUpiConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayUpiConfirmationRoutingModule { }
