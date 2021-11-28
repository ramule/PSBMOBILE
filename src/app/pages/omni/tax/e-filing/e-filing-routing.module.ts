import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EFilingComponent } from './e-filing.component';

const routes: Routes = [
  { path : '', component : EFilingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EFilingRoutingModule { }
