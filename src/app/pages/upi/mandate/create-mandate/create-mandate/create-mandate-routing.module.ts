import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMandateComponent } from './create-mandate.component';

const routes: Routes = [
  {path: '', component: CreateMandateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateMandateRoutingModule { }
