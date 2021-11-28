import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingInstructionViewComponent } from './standing-instruction-view.component';

const routes: Routes = [
  { path : '', component :StandingInstructionViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingInstructionViewRoutingModule { }
