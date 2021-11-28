import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewRegisterBillerSuccessComponent } from './add-new-register-biller-success.component';

const routes: Routes = [
  {path:'' , component: AddNewRegisterBillerSuccessComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewRegisterBillerSuccessRoutingModule { }
