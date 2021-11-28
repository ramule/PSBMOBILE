import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewRegisterBillerConfirmationComponent } from './add-new-register-biller-confirmation.component';

const routes: Routes = [
  {path:'' , component: AddNewRegisterBillerConfirmationComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewRegisterBillerConfirmationRoutingModule { }
