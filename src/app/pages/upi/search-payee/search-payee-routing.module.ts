import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchPayeeComponent} from './search-payee.component'

const routes: Routes = [{path:'', component:SearchPayeeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPayeeRoutingModule { }
