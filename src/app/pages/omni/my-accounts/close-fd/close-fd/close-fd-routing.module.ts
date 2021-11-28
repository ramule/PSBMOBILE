import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CloseFdComponent } from './close-fd.component';

const routes: Routes = [
  {path : '', component : CloseFdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloseFdRoutingModule { }
