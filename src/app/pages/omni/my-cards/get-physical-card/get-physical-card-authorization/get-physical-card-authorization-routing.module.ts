import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetPhysicalCardAuthorizationComponent } from './get-physical-card-authorization.component';

const routes: Routes = [
  {path: '', component : GetPhysicalCardAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetPhysicalCardAuthorizationRoutingModule { }
