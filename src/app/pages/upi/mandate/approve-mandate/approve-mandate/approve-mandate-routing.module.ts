import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveMandateComponent } from './approve-mandate.component';

const routes: Routes = [
  {path: '', component: ApproveMandateComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveMandateRoutingModule { }
