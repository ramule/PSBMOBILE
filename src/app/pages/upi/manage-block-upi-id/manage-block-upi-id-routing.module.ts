import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBlockUpiIdComponent } from './manage-block-upi-id.component';

const routes: Routes = [
  {path:'' , component: ManageBlockUpiIdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBlockUpiIdRoutingModule { }
