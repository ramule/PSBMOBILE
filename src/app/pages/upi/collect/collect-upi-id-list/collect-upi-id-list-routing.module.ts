import { CollectUpiIdListComponent } from './collect-upi-id-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: CollectUpiIdListComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectUpiIdListRoutingModule { }
