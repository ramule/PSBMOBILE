import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintViewDetailsComponent } from './complaint-view-details.component';

const routes: Routes = [
  {path: '', component: ComplaintViewDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintViewDetailsRoutingModule { }
