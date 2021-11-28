import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpgradeCardComponent } from './upgrade-card.component';

const routes: Routes = [
  { path: '', component : UpgradeCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UgradeCardRoutingModule { }
