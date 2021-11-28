import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotlistCardSuccessComponent } from './hotlist-card-success.component';

const routes: Routes = [
  {path : '', component : HotlistCardSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotlistCardSuccessRoutingModule { }
