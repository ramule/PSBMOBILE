import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotlistCardComponent } from './hotlist-card.component';

const routes: Routes = [
  {path: '', component : HotlistCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotlistCardRoutingModule { }
