import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeElectricityComponent } from './home-electricity.component';

const routes: Routes = [
  {path:'' , component: HomeElectricityComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeElectricityRoutingModule { }
