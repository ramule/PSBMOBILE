import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterBillerComponent } from './register-biller.component';

const routes: Routes = [
  {path:'' , component: RegisterBillerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterBillerRoutingModule { }
