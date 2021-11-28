import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintComponent } from './complaint.component';

const routes: Routes = [
  {path: '', component: ComplaintComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintRoutingModule { }
