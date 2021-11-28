import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotMpinSuccessComponent } from './forgot-mpin-success.component';

const routes: Routes = [
  {path: '', component: ForgotMpinSuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotMpinSuccessRoutingModule { }
