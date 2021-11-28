
import {RegistrationCreateUpiComponent} from '../registration-create-upi/registration-create-upi.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: RegistrationCreateUpiComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationCreateUpiRoutingModule { }
