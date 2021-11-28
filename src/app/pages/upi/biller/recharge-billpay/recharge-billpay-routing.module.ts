import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechargeBillpayComponent } from './recharge-billpay.component';

const routes: Routes = [
  {path:'' , component: RechargeBillpayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RechargeBillpayRoutingModule { }
