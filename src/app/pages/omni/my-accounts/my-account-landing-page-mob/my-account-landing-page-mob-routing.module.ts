import { MyAccountLandingPageMobComponent } from './my-account-landing-page-mob.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : MyAccountLandingPageMobComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountLandingPageMobRoutingModule { }
