import { PkiEnrollmentComponent } from './pki-enrollment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component: PkiEnrollmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PkiEnrollmentRoutingModule { }
