import { RaiseComplaintDurationComponent } from './raise-complaint-duration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'' , component : RaiseComplaintDurationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseComplaintDurationRoutingModule { }
