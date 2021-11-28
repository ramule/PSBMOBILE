import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForgotUsernameComponent} from '../forgot-username/forgot-username.component'


const routes: Routes = [{path:'',component:ForgotUsernameComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotUsernameRoutingModule { }
