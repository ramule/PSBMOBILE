import { ModifyStandingInstructionComponent } from './modify-standing-instruction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path :'', component :ModifyStandingInstructionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyStandingInstructionRoutingModule { }
