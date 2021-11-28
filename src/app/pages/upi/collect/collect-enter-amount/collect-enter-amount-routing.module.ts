import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectEnterAmountComponent } from './collect-enter-amount.component';

const routes: Routes = [{path:'' , component:CollectEnterAmountComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectEnterAmountRoutingModule { }
