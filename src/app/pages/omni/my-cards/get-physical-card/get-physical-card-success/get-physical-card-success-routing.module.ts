import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetPhysicalCardSuccessComponent } from './get-physical-card-success.component';

const routes: Routes = [
  {path: '', component : GetPhysicalCardSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetPhysicalCardSuccessRoutingModule { }
