import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NomineeDetailsComponent } from './nominee-details.component';

const routes: Routes = [
  { path : '', component : NomineeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomineeDetailsRoutingModule { }
