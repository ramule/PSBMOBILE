import { AddPayeeAuthorizationComponent } from './add-payee-authorization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: AddPayeeAuthorizationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPayeeAuthorizationRoutingModule { }
