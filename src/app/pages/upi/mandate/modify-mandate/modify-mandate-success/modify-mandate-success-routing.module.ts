import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyMandateSuccessComponent } from './modify-mandate-success.component';

const routes: Routes = [
  {path: '', component: ModifyMandateSuccessComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyMandateSuccessRoutingModule { }
