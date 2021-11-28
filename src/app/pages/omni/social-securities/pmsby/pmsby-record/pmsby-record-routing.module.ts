import { PmsbyRecordComponent } from './pmsby-record.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : PmsbyRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsbyRecordRoutingModule { }
