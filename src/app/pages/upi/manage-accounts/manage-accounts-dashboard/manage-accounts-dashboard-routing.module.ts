import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAccountsDashboardComponent } from './manage-accounts-dashboard.component';

const routes: Routes = [
  {path: '', component: ManageAccountsDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccountsDashboardRoutingModule { }
