import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingUpiIdBlockSuccessComponent } from './pending-upi-id-block-success.component';

const routes: Routes = [
  {path: '', component: PendingUpiIdBlockSuccessComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingUpiIdBlockSuccessRoutingModule { }
