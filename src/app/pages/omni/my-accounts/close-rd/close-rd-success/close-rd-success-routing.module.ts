import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CloseRDSuccessComponent } from './close-rd-success.component';

const routes: Routes = [
  {path : '', component : CloseRDSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloseRDSuccessRoutingModule { }
