import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeElectricityBillDetailsComponent } from './home-electricity-bill-details.component';

const routes: Routes = [
  {path:'' , component: HomeElectricityBillDetailsComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeElectricityBillDetailsRoutingModule { }
