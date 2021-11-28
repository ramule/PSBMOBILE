import { ResetNewTpinComponent } from './reset-new-tpin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : ResetNewTpinComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetNewTpinRoutingModule { }
