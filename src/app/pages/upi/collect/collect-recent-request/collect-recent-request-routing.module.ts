import { CollectRecentRequestComponent } from './collect-recent-request.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{path:'' , component:CollectRecentRequestComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectRecentRequestRoutingModule { }
