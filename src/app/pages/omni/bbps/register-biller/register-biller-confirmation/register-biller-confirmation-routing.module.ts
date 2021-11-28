import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterBillerConfirmationComponent } from './register-biller-confirmation.component';

const routes: Routes = [
  { path :'', component : RegisterBillerConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterBillerConfirmationRoutingModule { }
