import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateUpiGlobalConfirmationComponent } from './activate-upi-global-confirmation.component';

const routes: Routes = [
  {path:'' , component: ActivateUpiGlobalConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateUpiGlobalConfirmationRoutingModule { }
