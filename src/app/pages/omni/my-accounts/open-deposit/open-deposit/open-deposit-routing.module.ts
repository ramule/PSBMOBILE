import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenDepositComponent } from './open-deposit.component';

const routes: Routes = [
  {path : '', component : OpenDepositComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenDepositRoutingModule { }
