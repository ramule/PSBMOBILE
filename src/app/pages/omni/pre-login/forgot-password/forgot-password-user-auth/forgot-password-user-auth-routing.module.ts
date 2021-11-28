import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForgotPasswordUserAuthComponent} from './forgot-password-user-auth.component'


const routes: Routes = [{path:'',component:ForgotPasswordUserAuthComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
