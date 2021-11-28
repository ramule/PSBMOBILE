import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReissueCardComponent } from './reissue-card.component';

const routes: Routes = [
  {path : '', component : ReissueCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReissueCardRoutingModule { }
