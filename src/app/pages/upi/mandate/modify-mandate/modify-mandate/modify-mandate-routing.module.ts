import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyMandateComponent } from './modify-mandate.component';

const routes: Routes = [
  {path: '', component: ModifyMandateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyMandateRoutingModule { }
