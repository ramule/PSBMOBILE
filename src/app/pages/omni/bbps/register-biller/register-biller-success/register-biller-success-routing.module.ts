import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterBillerSuccessComponent } from './register-biller-success.component';

const routes: Routes = [
  { path : '', component : RegisterBillerSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterBillerSuccessRoutingModule { }
