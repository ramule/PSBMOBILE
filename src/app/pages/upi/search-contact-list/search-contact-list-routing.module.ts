import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchContactListComponent } from './search-contact-list.component';

const routes: Routes = [{path:'', component:SearchContactListComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchContactListRoutingModule { }
