import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewRegisterBillerComponent } from './add-new-register-biller.component';

const routes: Routes = [
  {path:'' , component: AddNewRegisterBillerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewRegisterBillerRoutingModule { }
