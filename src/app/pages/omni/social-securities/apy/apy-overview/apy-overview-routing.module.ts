import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApyOverviewComponent } from './apy-overview.component';

const routes: Routes = [
  {path : '', component : ApyOverviewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApyOverviewRoutingModule { }
