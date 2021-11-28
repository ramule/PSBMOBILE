import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlreadyRegisteredComponent} from './already-registered.component'


const routes: Routes = [
  {path: '', component: AlreadyRegisteredComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlreadyRegisteredRoutingModule { }
