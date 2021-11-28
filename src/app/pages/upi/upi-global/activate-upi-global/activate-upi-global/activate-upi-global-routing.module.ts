import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateUpiGlobalComponent } from './activate-upi-global.component';

const routes: Routes = [
  {path:'' , component: ActivateUpiGlobalComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateUpiGlobalRoutingModule { }
