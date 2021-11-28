import { ApyAuthorizationComponent } from './apy-authorization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : ApyAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApyAuthorizationRoutingModule { }
