import { StopChequeAuthorizationComponent } from './stop-cheque-authorization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : StopChequeAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopChequeAuthorizationRoutingModule { }
