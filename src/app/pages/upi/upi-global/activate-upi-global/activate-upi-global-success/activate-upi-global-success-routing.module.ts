import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateUpiGlobalSuccessComponent } from './activate-upi-global-success.component';

const routes: Routes = [
  {path:'' , component: ActivateUpiGlobalSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateUpiGlobalSuccessRoutingModule { }
