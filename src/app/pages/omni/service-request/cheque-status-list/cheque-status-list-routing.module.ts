import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChequeStatusListComponent} from './cheque-status-list.component'


const routes: Routes = [{path:'', component:ChequeStatusListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeStatusListRoutingModule { }
