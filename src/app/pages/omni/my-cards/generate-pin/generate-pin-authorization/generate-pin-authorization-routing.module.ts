import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePinAuthorizationComponent } from './generate-pin-authorization.component';

const routes: Routes = [
  {path : '', component : GeneratePinAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratePinAuthorizationRoutingModule { }
