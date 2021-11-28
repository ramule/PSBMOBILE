import { PmjjbyOverviewComponent } from './pmjjby-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : PmjjbyOverviewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmjjbyOverviewRoutingModule { }
