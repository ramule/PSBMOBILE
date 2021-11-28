import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FastTagComponent } from './fast-tag.component';

const routes: Routes = [
  { path : '', component: FastTagComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FastTagRoutingModule { }
