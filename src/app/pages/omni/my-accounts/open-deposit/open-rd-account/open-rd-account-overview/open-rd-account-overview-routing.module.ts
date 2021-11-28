import { OpenRdAccountOverviewComponent } from './open-rd-account-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : OpenRdAccountOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenRdAccountOverviewRoutingModule { }
