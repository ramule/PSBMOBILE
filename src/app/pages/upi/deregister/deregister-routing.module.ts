import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeregisterComponent } from './deregister.component';

const routes: Routes = [
  {path: '', component: DeregisterComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeregisterRoutingModule { }
