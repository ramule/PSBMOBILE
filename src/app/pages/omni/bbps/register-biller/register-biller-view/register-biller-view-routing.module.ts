import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterBillerViewComponent} from './register-biller-view.component'
const routes: Routes = [
  { path : '', component : RegisterBillerViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterBillerViewRoutingModule { }
