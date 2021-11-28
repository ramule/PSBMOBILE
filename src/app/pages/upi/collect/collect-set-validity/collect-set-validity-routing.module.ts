import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectSetValidityComponent } from './collect-set-validity.component';

const routes: Routes = [
  {path: '', component: CollectSetValidityComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectSetValidityRoutingModule { }
