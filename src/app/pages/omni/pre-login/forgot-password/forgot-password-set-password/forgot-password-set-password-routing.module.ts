import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForgotPasswordSetPasswordComponent} from './forgot-password-set-password.component'


const routes: Routes = [{path:'',component:ForgotPasswordSetPasswordComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
