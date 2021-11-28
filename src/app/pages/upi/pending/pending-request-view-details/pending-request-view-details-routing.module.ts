import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingRequestViewDetailsComponent } from './pending-request-view-details.component';

const routes: Routes = [
  {path: '', component: PendingRequestViewDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRequestViewDetailsRoutingModule { }
