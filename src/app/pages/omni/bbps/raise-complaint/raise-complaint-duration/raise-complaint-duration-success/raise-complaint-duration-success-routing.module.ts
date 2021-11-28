import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaiseComplaintDurationSuccessComponent } from './raise-complaint-duration-success.component';

const routes: Routes = [
  { path :'', component : RaiseComplaintDurationSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseComplaintDurationSuccessRoutingModule { }
