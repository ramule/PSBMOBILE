import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAllRecentPayeeComponent } from './dashboard-all-recent-payee.component';
const routes: Routes = [{path:'' , component:DashboardAllRecentPayeeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAllRecentPayeeRoutingModule { }
