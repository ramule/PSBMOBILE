import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayBankListComponent } from './pay-bank-list.component';

const routes: Routes = [{path:'', component:PayBankListComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayBankListRoutingModule { }
