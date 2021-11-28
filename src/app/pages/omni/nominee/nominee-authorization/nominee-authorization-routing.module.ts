import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NomineeAuthorizationComponent } from './nominee-authorization.component';

const routes: Routes = [
  { path : '', component: NomineeAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomineeAuthorizationRoutingModule { }
