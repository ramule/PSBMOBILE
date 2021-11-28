import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NliLandingPageComponent } from './nli-landing-page.component';

const routes: Routes = [
  {path : '', component: NliLandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NliLandingPageRoutingModule { }
