import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetNewMpinComponent } from './set-new-mpin.component';

const routes: Routes = [
  {path: '', component: SetNewMpinComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetNewMpinRoutingModule { }
