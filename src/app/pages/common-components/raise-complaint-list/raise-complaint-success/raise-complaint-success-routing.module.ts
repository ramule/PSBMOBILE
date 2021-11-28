import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaiseComplaintSuccessComponent } from './raise-complaint-success.component';

const routes: Routes = [
  {path: '', component: RaiseComplaintSuccessComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseComplaintSuccessRoutingModule { }
