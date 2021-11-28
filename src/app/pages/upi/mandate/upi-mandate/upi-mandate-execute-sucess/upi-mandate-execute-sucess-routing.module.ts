import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExecuteMandateSuccessComponent } from './upi-mandate-execute-sucess.component';

const routes: Routes = [
  {path: '', component: ExecuteMandateSuccessComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecuteMandateSuccessRoutingModule { }
