import { MobQuickAccessLandingComponent } from './mob-quick-access-landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '' , component : MobQuickAccessLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobQuickAccessLandingRoutingModule { }
