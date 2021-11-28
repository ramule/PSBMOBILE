import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NomineeOverviewComponent } from './nominee-overview.component';

const routes: Routes = [
  { path : '', component : NomineeOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomineeOverviewRoutingModule { }
