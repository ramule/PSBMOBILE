import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestMandateViewDetailsComponent } from './request-mandate-view-details.component';

const routes: Routes = [
  {path: '', component: RequestMandateViewDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMandateViewDetailsRoutingModule { }
