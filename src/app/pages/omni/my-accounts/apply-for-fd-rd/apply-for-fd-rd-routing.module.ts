import { ApplyForFdRdComponent } from './apply-for-fd-rd.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : ApplyForFdRdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyForFdRdRoutingModule { }
