import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingRequestRejectedComponent } from './pending-request-rejected.component';

const routes: Routes = [
  {path: '', component: PendingRequestRejectedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingRequestRejectedRoutingModule { }
