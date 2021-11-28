import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestMandateComponent } from './request-mandate.component';

const routes: Routes = [
  {path: '', component: RequestMandateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMandateRoutingModule { }
