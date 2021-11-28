import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DthBillComponent } from './dth-bill.component';

const routes: Routes = [
  { path : '', component : DthBillComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DthBillRoutingModule { }
