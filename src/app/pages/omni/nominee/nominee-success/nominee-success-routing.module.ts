import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NomineeSuccessComponent } from './nominee-success.component';

const routes: Routes = [
  { path : '', component : NomineeSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomineeSuccessRoutingModule { }
