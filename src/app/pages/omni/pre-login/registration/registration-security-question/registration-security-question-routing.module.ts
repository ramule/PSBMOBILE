
import { RegistrationSecurityQuestionComponent } from './registration-security-question.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: RegistrationSecurityQuestionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationSecurityQuestionRoutingModule { }
