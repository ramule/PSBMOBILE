import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateUpiGlobalConfirmationComponent } from './update-upi-global-confirmation.component';

const routes: Routes = [
  {path:'' , component: UpdateUpiGlobalConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUpiGlobalConfirmationRoutingModule { }
