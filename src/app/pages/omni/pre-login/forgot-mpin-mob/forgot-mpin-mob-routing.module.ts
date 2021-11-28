import { ForgotMpinMobComponent } from './forgot-mpin-mob.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : ForgotMpinMobComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotMpinMobRoutingModule { }
