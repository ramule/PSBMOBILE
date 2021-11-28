import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormFifteenGhSuccessComponent } from './form-fifteen-gh-success.component';

const routes: Routes = [
  { path : '', component : FormFifteenGhSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormFifteenGhSuccessRoutingModule { }
