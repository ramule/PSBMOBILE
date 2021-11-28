import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountOpeningSuccessComponent} from './account-opening-success.component';
const routes: Routes = [{path:'',component:AccountOpeningSuccessComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOpeningSuccessRoutingModule { }
