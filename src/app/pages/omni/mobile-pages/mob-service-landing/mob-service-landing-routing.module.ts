import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobServiceLandingComponent } from './mob-service-landing.component';

const routes: Routes = [
  {path : '', component : MobServiceLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobServiceLandingRoutingModule { }
