import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectricityComponent } from './electricity.component';

const routes: Routes = [
  {path:'' , component: ElectricityComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectricityRoutingModule { }
