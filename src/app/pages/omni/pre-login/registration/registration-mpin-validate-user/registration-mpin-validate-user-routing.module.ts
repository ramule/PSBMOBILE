import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationMpinValidateUserComponent } from './registration-mpin-validate-user.component';

const routes: Routes = [
  {path: '', component: RegistrationMpinValidateUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationMpinValidateUserRoutingModule { }
