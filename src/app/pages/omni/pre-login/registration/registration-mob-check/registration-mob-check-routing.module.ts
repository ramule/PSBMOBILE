
import { RegistrationMobCheckComponent } from './registration-mob-check.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: RegistrationMobCheckComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationMobCheckRoutingModule { }
