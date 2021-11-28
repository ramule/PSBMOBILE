import { MobChequebookLandingComponent } from './mob-chequebook-landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '' , component :MobChequebookLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobChequebookLandingRoutingModule { }
