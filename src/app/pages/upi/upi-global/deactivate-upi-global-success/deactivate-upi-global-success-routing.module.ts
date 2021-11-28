import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeactivateUpiGlobalSuccessComponent } from './deactivate-upi-global-success.component';

const routes: Routes = [
  {path:'' , component: DeactivateUpiGlobalSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeactivateUpiGlobalSuccessRoutingModule { }
