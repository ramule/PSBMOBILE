import { ReissueCardAuthorizationComponent } from './reissue-card-authorization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : ReissueCardAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReissueCardAuthorizationRoutingModule { }
