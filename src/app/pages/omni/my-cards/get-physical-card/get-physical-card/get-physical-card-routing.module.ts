import { GetPhysicalCardComponent } from './get-physical-card.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component : GetPhysicalCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetPhysicalCardRoutingModule { }
