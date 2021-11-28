import { OpenRdAccountAuthorizationComponent } from './open-rd-account-authorization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : OpenRdAccountAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenRdAccountAuthorizationRoutingModule { }
