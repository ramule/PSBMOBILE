

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectOtherBankComponent } from './select-other-bank.component'

const routes: Routes = [
   {path: '', component: SelectOtherBankComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectOtherBankRoutingModule { }
