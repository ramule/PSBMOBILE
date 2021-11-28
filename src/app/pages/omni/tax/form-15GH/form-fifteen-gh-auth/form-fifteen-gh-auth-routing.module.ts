import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormFifteenGhAuthComponent } from './form-fifteen-gh-auth.component';

const routes: Routes = [
  { path : '', component : FormFifteenGhAuthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormFifteenGhAuthRoutingModule { }
