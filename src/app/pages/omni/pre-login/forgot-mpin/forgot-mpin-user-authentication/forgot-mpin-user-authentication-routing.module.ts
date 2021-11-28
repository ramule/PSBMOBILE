import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotMpinUserAuthenticationComponent } from './forgot-mpin-user-authentication.component';

const routes: Routes = [
  {path: '', component: ForgotMpinUserAuthenticationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotMpinUserAuthenticationRoutingModule { }
