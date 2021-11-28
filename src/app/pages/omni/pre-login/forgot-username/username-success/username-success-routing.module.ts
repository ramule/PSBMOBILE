import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsernameSuccessComponent} from '../username-success/username-success.component'



const routes: Routes = [{path:'',component:UsernameSuccessComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsernameSuccessRoutingModule { }
