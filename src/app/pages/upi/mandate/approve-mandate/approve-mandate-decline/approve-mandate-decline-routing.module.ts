import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveMandateDeclineComponent } from './approve-mandate-decline.component';

const routes: Routes = [
  {path: '', component: ApproveMandateDeclineComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveMandateDeclineRoutingModule { }
