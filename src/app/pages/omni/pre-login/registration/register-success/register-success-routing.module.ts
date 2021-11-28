import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterSuccessComponent } from './register-success.component';

const routes: Routes = [{path: '', component: RegisterSuccessComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationSuccessRoutingModule { } 
