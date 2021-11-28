import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestMandateSuccessComponent } from './request-mandate-success.component';

const routes: Routes = [
  {path: '', component: RequestMandateSuccessComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMandateSuccessRoutingModule { }
