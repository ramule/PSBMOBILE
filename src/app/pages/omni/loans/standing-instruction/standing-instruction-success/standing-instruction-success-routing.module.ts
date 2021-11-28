import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandingInstructionSuccessComponent } from './standing-instruction-success.component';

const routes: Routes = [
  {path : '', component : StandingInstructionSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingInstructionSuccessRoutingModule { }
