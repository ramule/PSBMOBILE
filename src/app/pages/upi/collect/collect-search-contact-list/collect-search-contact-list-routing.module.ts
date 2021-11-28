import { CollectSearchContactListComponent } from './collect-search-contact-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{path:'' , component:CollectSearchContactListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectSearchContactListRoutingModule { }
