import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NreDepositeComponent } from './nre-deposite.component';

const routes: Routes = [
  { path : '', component : NreDepositeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NreDepositeRoutingModule { }
