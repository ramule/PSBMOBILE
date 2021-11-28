import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAccountsInfoComponent } from './my-accounts-info.component';

const routes: Routes = [{path: '', component: MyAccountsInfoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountsInfoRoutingModule { }
