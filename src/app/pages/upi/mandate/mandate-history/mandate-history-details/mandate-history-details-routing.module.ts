import { MandateHistoryDetailsComponent } from './mandate-history-details.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   {
    path: '', component: MandateHistoryDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MandateHistoryDetailsRoutingModule { }
