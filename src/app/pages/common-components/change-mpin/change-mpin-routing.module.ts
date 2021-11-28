import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeMpinComponent } from './change-mpin.component';

const routes: Routes = [
  {path: '', component: ChangeMpinComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeMpinRoutingModule { }
