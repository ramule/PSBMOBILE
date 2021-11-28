import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandingInstructionComponent } from './standing-instruction.component';

const routes: Routes = [
  {path : '', component : StandingInstructionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingInstructionRoutingModule { }
