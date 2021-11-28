import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveMandateViewDetailsComponent } from './approve-mandate-view-details.component';

const routes: Routes = [
  {path: '', component: ApproveMandateViewDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveMandateViewDetailsRoutingModule { }
