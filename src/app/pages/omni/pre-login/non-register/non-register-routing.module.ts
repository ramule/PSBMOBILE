import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonRegisterComponent } from './non-register.component';

const routes: Routes = [{path: '', component: NonRegisterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonRegisterRoutingModule { }
