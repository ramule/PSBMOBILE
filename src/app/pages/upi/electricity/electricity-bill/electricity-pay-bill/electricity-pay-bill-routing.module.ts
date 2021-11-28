import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectricityPayBillComponent } from './electricity-pay-bill.component';

const routes: Routes = [
  {path:'' , component: ElectricityPayBillComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectricityPayBillRoutingModule { }
