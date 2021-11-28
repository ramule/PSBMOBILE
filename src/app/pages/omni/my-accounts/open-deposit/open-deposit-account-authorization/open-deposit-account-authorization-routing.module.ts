import { OpenDepositAccountAuthorizationComponent } from './open-deposit-account-authorization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : OpenDepositAccountAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenDepositAccountAuthorizationRoutingModule { }
