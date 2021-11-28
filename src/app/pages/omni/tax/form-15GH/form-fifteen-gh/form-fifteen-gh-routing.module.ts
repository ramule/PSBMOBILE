import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormFifteenGhComponent } from './form-fifteen-gh.component';

const routes: Routes = [
  { path : '', component : FormFifteenGhComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormFifteenGhRoutingModule { }
