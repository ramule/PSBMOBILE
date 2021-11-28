import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMandateSuccessComponent } from './create-mandate-success.component';

const routes: Routes = [
  {path: '', component: CreateMandateSuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateMandateSuccessRoutingModule { }
