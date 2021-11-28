import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordSuccessComponent } from './forgot-password-success.component';

const routes: Routes = [
  { path : '', component : ForgotPasswordSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordSuccessRoutingModule { }
