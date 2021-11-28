
import { RegistrationMpinComponent } from './registration-mpin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: '', component: RegistrationMpinComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationMpinRoutingModule { }
