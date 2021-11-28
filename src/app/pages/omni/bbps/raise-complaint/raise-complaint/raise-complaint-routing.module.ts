import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaiseComplaintComponent } from './raise-complaint.component';

const routes: Routes = [
  { path :'', component : RaiseComplaintComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseComplaintRoutingModule { }
