import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotTpinUserAuthenticationComponent } from './forgot-tpin-user-authentication.component';

const routes: Routes = [
  {path: '', component: ForgotTpinUserAuthenticationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotTpinUserAuthenticationRoutingModule { }
