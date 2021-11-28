import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchComponent } from './launch.component';

const routes: Routes = [
  {path : '', component: LaunchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaunchRoutingModule { }
