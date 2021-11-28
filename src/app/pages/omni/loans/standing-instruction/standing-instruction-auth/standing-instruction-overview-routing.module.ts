import { StandingInstructionOverviewComponent } from './standing-instruction-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : StandingInstructionOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingInstructionOverviewRoutingModule { }
