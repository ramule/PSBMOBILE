import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpiDashboardComponent} from './upi-dashboard.component'

const routes: Routes = [
  {path: '', component: UpiDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiDashboardRoutingModule { }
