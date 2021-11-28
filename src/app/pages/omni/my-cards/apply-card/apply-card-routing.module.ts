import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyCardComponent } from './apply-card.component';

const routes: Routes = [
  { path: '', component : ApplyCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyCardRoutingModule { }
